const DEFAULT_REDIRECTS = {
  "mail.google.com": "youtube.com/gaming",
  "udemy.com": "skribbl.io",
  "drive.google.com": "www.youtube.com/shorts",
  "notion.so": "krunker.io",
  "docs.google.com": "twitch.tv",
  "calendar.google.com": "netflix.com",
  "classroom.google.com": "discord.com/channels/@me",
  "github.com": "steamcommunity.com",
  "stackoverflow.com": "reddit.com/r/gaming",
  "chat.openai.com": "instagram.com/reels",
  "figma.com": "epicgames.com",
  "leetcode.com": "chess.com/play",
  "wikipedia.org": "roblox.com",
  "medium.com": "imdb.com",
  "colab.research.google.com": "coolmathgames.com",
  "overleaf.com": "chess.com/puzzles",
  "translate.google.com": "skribbl.io",
  "grammarly.com": "memedroid.com",
  "mathway.com": "agar.io",
  "wolframalpha.com": "slither.io",
  "geogebra.org": "zombsroyale.io",
  "desmos.com": "mope.io",
  "jstor.org": "archiveofourown.org",
  "springernature.com": "webtoons.com",
  "duolingo.com": "wordle.unlimited",
  "coursera.org": "pokemonshowdown.com",
  "brilliant.org": "hex.frvr.com",
  "datacamp.com": "spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
  "hackerrank.com": "dota2.com",
  "codechef.com": "mtgarena.com",
  "sciencedirect.com": "boredpanda.com",
  "nature.com": "thispersondoesnotexist.com",
  "ieee.org": "findtheinvisiblecow.com",
  "researchgate.net": "quickdraw.withgoogle.com",
  "zotero.org": "gamedesigning.org",
  "mindmeister.com": "funnyordie.com",
  "taskade.com": "snapchat.com",
  "monday.com": "icq.com",
  "toggl.com": "runescape.com",
  "rescuetime.com": "osu.ppy.sh",
  "timecamp.com": "vrchat.com",
  "clockify.me": "rumble.com",
  "evernote.com": "storygames.com",
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get("redirects", (data) => {
    if (!data.redirects) {
      chrome.storage.local.set({ redirects: DEFAULT_REDIRECTS });
    }
  });
});

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) return;

  const url = new URL(details.url);
  const hostname = url.hostname;

  chrome.storage.local.get("redirects", (data) => {
    const redirects = data.redirects || {};

    for (const source in redirects) {
      if (hostname === source || hostname.includes(source)) {
        const destination = redirects[source];

        const redirectUrl = destination.startsWith("http")
          ? destination
          : `https://${destination}`;

        chrome.tabs.update(details.tabId, { url: redirectUrl });
        break;
      }
    }
  });
});
