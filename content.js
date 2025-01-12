function toggleMenu() {
  const menu = document.querySelector("#mirror-menu");
  if (menu) {
    menu.style.display = menu.style.display === "inline-block" ? "none" : "inline-block";

    if (menu.style.display === "inline-block") {
      // Reposition the menu relative to the button when it's shown
      const button = document.querySelector("#mirror-button");
      const buttonRect = button.getBoundingClientRect();
      menu.style.top = `${buttonRect.top - menu.offsetHeight - 10}px`; // 10px above the button
      menu.style.left = `${buttonRect.left}px`;
    }
  }
}

let loopInterval;

function setVideoLoop(startTime, endTime) {
  const video = document.querySelector("video");
  if (!video) {
    alert("No video found.");
    return;
  }

  if (loopInterval) {
    clearInterval(loopInterval);
  }

  loopInterval = setInterval(() => {
    if (video.currentTime >= endTime) {
      video.currentTime = startTime;
    }
  }, 100);
}

function createMenu() {
  if (document.querySelector("#mirror-menu")) return; // Avoid duplicates

  const menu = document.createElement("div");
  menu.id = "mirror-menu";

  // Menu options
  const mirrorOption = document.createElement("button");
  mirrorOption.className = "menu-button";
  mirrorOption.innerText = "Mirror Video";
  mirrorOption.addEventListener("click", () => {
    const video = document.querySelector("video");
    if (video) {
      const isMirrored = video.style.transform === "scaleX(-1)";
      video.style.transform = isMirrored ? "none" : "scaleX(-1)";
    }
  });

  const resetOption = document.createElement("button");
  resetOption.className = "menu-button";
  resetOption.innerText = "Reset Video";
  resetOption.addEventListener("click", () => {
    const video = document.querySelector("video");
    if (video) video.style.transform = "none";
  });

  const startInput = document.createElement("input");
  startInput.type = "text";
  startInput.className = "menu-input";
  startInput.placeholder = "Start (seconds)";

  const endInput = document.createElement("input");
  endInput.type = "text";
  endInput.className = "menu-input";
  endInput.placeholder = "End (seconds)";

  const loopButton = document.createElement("button");
  loopButton.className = "menu-button";
  loopButton.innerText = "Set loop";
  loopButton.addEventListener("click", () => {
    const startTime = parseFloat(startInput.value);
    const endTime = parseFloat(endInput.value);

    if (isNaN(startTime) || isNaN(endTime)) {
      alert("Please enter valid timestamps.");
      return;
    }

    setVideoLoop(startTime, endTime);
  });

  const clearLoopButton = document.createElement("button");
  clearLoopButton.className = "menu-button";
  clearLoopButton.innerText = "Clear Loop";
  clearLoopButton.addEventListener("click", () => {
    if (loopInterval) {
      clearInterval(loopInterval);
      loopInterval = null;
      alert("Loop cleared.");
    }
  });

  // Add options to menu
  menu.appendChild(mirrorOption);
  menu.appendChild(resetOption);
  menu.appendChild(startInput);
  menu.appendChild(endInput);
  menu.appendChild(loopButton);
  menu.appendChild(clearLoopButton);

  document.body.appendChild(menu);
}

function addMirrorButton() {
  const controlsCenter = document.querySelector(".ytp-right-controls");
  if (!controlsCenter || document.querySelector("#mirror-button")) return;

  const mirrorButton = document.createElement("button");
  mirrorButton.id = "mirror-button";
  mirrorButton.className = "ytp-button";
  mirrorButton.title = "Toggle menu";

  // Add SVG icon
  mirrorButton.innerHTML = `
    <img src="https://cloud-ivtz9imsn-hack-club-bot.vercel.app/0flip.png" alt="Menu Icon" width="100%" height="100%">
  `;

  mirrorButton.addEventListener("click", () => {
    createMenu(); // Ensure the menu exists
    toggleMenu(); // Show or hide the menu
  });

  controlsCenter.appendChild(mirrorButton);
}

// Inject styles dynamically
function injectStyles() {
  if (document.querySelector("#custom-styles")) return; // Avoid duplicates

  const style = document.createElement("style");
  style.id = "custom-styles";
  style.textContent = `
    #mirror-menu {
      font-family: "Roboto","Arial",sans-serif;
      font-weight: 500;
      position: absolute;
      z-index: 1000;
      background-color: rgba(42, 42, 42, 0.9);
      color: white;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      display: none; /* Initially hidden */
    }

    .menu-button {
      font-family: "Roboto","Arial",sans-serif;
      font-weight: 500;
      margin-bottom: 5px;
      display: block;
      background-color: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      padding: 8px;
      border-radius: 3px;
      cursor: pointer;
    }

    .menu-button:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .menu-input {
      font-family: "Roboto","Arial",sans-serif";
      font-weight: 500;
      margin-bottom: 5px;
      display: block;
      width: 100%;
      padding: 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      border-radius: 3px;
      background-color: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .menu-input::placeholder {
      font-family: "Roboto","Arial",sans-serif";
      font-weight: 500;
      color: rgba(255, 255, 255, 0.5);
    }
  `;
  document.head.appendChild(style);
}

// Observe for changes in the DOM to ensure the button is added
const observer = new MutationObserver(() => {
  addMirrorButton();
});

observer.observe(document.body, { childList: true, subtree: true });
injectStyles();

console.log("YouTube Mirroring Extension script loaded");
