document.addEventListener("DOMContentLoaded", function () {
  // Elements from popup.html
  const procrastinationToggle = document.getElementById(
    "procrastination-toggle"
  );
  const gameDevice = document.getElementById("game-device");
  const flameElement = document.getElementById("flame-element");
  const fragmentsElement = document.getElementById("fragments-element");
  const timerDisplay = document.getElementById("timer-display");
  const durationInput = document.getElementById("procrastination-duration");
  const addButton = document.getElementById("add-row");
  const saveButton = document.getElementById("save-btn");
  const redirectContainer = document.getElementById("redirects-container");
  const websiteRedirectSection = document.getElementById(
    "website-redirect-section"
  );
  const redirectToggle = document.getElementById("redirect-toggle");

  let timerInterval;
  let remainingTime = 60 * 60; // Default 60 minutes

  // Initialize the UI based on stored settings
  initializeUI();

  // Toggle show/hide website redirect section
  if (redirectToggle) {
    redirectToggle.addEventListener("click", function () {
      websiteRedirectSection.classList.toggle("show-hidden");
      this.textContent = websiteRedirectSection.classList.contains(
        "show-hidden"
      )
        ? "Hide Website Redirect Section"
        : "Show Website Redirect Section";
    });
  }

  // Toggle procrastination mode
  if (procrastinationToggle) {
    procrastinationToggle.addEventListener("change", function () {
      if (this.checked) {
        // Start procrastination mode
        startProcrastination();
      } else {
        // Stop procrastination mode
        stopProcrastination(false);
      }
    });
  }

  // Add new redirect row button
  if (addButton) {
    addButton.addEventListener("click", function () {
      addRedirectRow("", "");
    });
  }

  // Save redirects button
  if (saveButton) {
    saveButton.addEventListener("click", function () {
      saveRedirects();
    });
  }

  // Initialize UI based on stored settings
  function initializeUI() {
    // Update timer display initially
    updateTimerDisplay(remainingTime);

    // Load redirects if container exists
    if (redirectContainer) {
      loadRedirects();
    }
  }

  // Update timer display
  function updateTimerDisplay(seconds) {
    if (timerDisplay) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      timerDisplay.textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    }
  }

  // Start procrastination mode
  function startProcrastination() {
    // Get duration
    const duration = parseInt(durationInput.value) || 60;
    remainingTime = duration * 60;
    updateTimerDisplay(remainingTime);

    // Start burning animation
    if (flameElement) {
      flameElement.classList.add("active");
      flameElement.style.animation = "flicker 1.5s infinite";
    }

    if (gameDevice) {
      gameDevice.classList.add("burning");
      gameDevice.style.animation = "burn 5s forwards";
    }

    // Start countdown
    timerInterval = setInterval(function () {
      remainingTime--;
      updateTimerDisplay(remainingTime);

      // When timer completes
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        completeProcrastination();
      }
    }, 1000);
  }

  // Complete procrastination
  function completeProcrastination() {
    // Show burned device
    if (gameDevice) {
      gameDevice.style.opacity = "0";
    }

    if (flameElement) {
      flameElement.classList.remove("active");
      flameElement.style.animation = "";
    }

    if (fragmentsElement) {
      fragmentsElement.classList.add("active");
    }

    // Show completion message
    const duration = parseInt(durationInput.value) || 60;
    alert(
      `Congratulations! You successfully burned your mind by procrastinating for ${duration} minutes!`
    );

    // Reset toggle
    if (procrastinationToggle) {
      procrastinationToggle.checked = false;
    }
  }

  // Stop procrastination mode (if canceled)
  function stopProcrastination(completed) {
    clearInterval(timerInterval);

    if (flameElement) {
      flameElement.classList.remove("active");
      flameElement.style.animation = "";
    }

    if (gameDevice) {
      gameDevice.classList.remove("burning");
      gameDevice.style.animation = "";
      gameDevice.style.opacity = "1";
    }

    if (fragmentsElement) {
      fragmentsElement.classList.remove("active");
    }

    // Reset timer display
    const duration = parseInt(durationInput.value) || 60;
    updateTimerDisplay(duration * 60);
  }

  // Load redirects from storage
  function loadRedirects() {
    chrome.storage.local.get("redirects", (data) => {
      const redirects = data.redirects || {};
      redirectContainer.innerHTML = "";

      if (Object.keys(redirects).length === 0) {
        addRedirectRow("", "");
        return;
      }

      for (const source in redirects) {
        addRedirectRow(source, redirects[source]);
      }
    });
  }

  // Add a new redirect row to the UI
  function addRedirectRow(source, destination) {
    const row = document.createElement("div");
    row.className = "redirect-item";

    const sourceInput = document.createElement("input");
    sourceInput.className = "source";
    sourceInput.placeholder = "Source (e.g., mail.google.com)";
    sourceInput.value = source;

    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "→";

    const destinationInput = document.createElement("input");
    destinationInput.className = "destination";
    destinationInput.placeholder = "Destination (e.g., youtube.com)";
    destinationInput.value = destination;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
      redirectContainer.removeChild(row);
    });

    row.appendChild(sourceInput);
    row.appendChild(arrow);
    row.appendChild(destinationInput);
    row.appendChild(deleteButton);

    redirectContainer.appendChild(row);
  }

  // Save redirects to storage
  function saveRedirects() {
    const redirects = {};
    const rows = redirectContainer.querySelectorAll(".redirect-item");

    rows.forEach((row) => {
      const source = row.querySelector(".source").value.trim();
      const destination = row.querySelector(".destination").value.trim();

      if (source && destination) {
        redirects[source] = destination;
      }
    });

    chrome.storage.local.set({ redirects }, function () {
      saveButton.textContent = "Saved!";
      setTimeout(() => {
        saveButton.textContent = "Save Changes";
      }, 1500);
    });
  }
});
