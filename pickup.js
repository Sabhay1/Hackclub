document.addEventListener("DOMContentLoaded", function () {
  const pickupLineElement = document.getElementById("pickup-line");
  const generateButton = document.getElementById("generate-btn");
  const backButton = document.getElementById("back-btn");

  // Array of bad pickup lines
  const pickupLines = [
    "Are you a parking ticket? Because you've got FINE written all over you.",
    "Do you have a map? I keep getting lost in your eyes.",
    "Is your name Google? Because you have everything I've been searching for.",
    "Are you made of copper and tellurium? Because you're Cu-Te.",
    "Do you like science? Because I've got my ion you.",
    "Are you a camera? Because every time I look at you, I smile.",
    "Is your dad a boxer? Because you're a knockout!",
    "Do you like raisins? How about a date?",
    "If you were a vegetable, you'd be a cute-cumber.",
    "Are you a bank loan? Because you have my interest.",
    "Are you a time traveler? Because I can see you in my future.",
    "If you were a fruit, you'd be a fine-apple.",
    "I'm no photographer, but I can picture us together.",
    "Are you French? Because Eiffel for you.",
    "Is your name Wi-Fi? Because I'm feeling a connection.",
    "I'm learning about important dates in history. Wanna be one of them?",
    "Are you a campfire? Because you're hot and I want s'more.",
    "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
    "Are you a magician? Because whenever I look at you, everyone else disappears.",
    "Is this the Hogwarts Express? Because it feels like you and I are headed somewhere magical.",
  ];

  // Generate random pickup line
  function generatePickupLine() {
    const randomIndex = Math.floor(Math.random() * pickupLines.length);
    pickupLineElement.textContent = pickupLines[randomIndex];
  }

  // Add event listeners
  generateButton.addEventListener("click", generatePickupLine);

  backButton.addEventListener("click", function () {
    // Navigate back to popup.html
    window.location.href = "popup.html";
  });

  // Generate pickup line on initial load
  generatePickupLine();
});
