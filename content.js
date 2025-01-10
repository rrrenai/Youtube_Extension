function toggleMenu() {
  const menu = document.querySelector("#mirror-menu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
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
  menu.style.position = "absolute";
  menu.style.top = "50px"; // Adjust as needed
  menu.style.right = "10px";
  menu.style.zIndex = "1000";
  menu.style.backgroundColor = "rgba(42, 42, 42, 0.8)";
  menu.style.color = "white";
  menu.style.padding = "10px";
  menu.style.borderRadius = "5px";
  menu.style.boxShadow = "0 4px 6px rgba(65, 65, 65, 0.2)";
  menu.style.display = "none"; // Initially hidden

  // Menu options
  const mirrorOption = document.createElement("button");
  mirrorOption.innerText = "Mirror Video";
  mirrorOption.style.marginBottom = "5px";
  mirrorOption.style.display = "block";
  mirrorOption.addEventListener("click", () => {
    const video = document.querySelector("video");
    if (video) {
      const isMirrored = video.style.transform === "scaleX(-1)";
      video.style.transform = isMirrored ? "none" : "scaleX(-1)";
    }
  });

  const resetOption = document.createElement("button");
  resetOption.innerText = "Reset Video";
  resetOption.addEventListener("click", () => {
    const video = document.querySelector("video");
    if (video) video.style.transform = "none";
  });

  const startInput = document.createElement("input");
  startInput.type = "text";
  startInput.placeholder = "Start (seconds)";
  startInput.style.marginBottom = "5px";
  startInput.style.display = "block";

  const endInput = document.createElement("input");
  endInput.type = "text";
  endInput.placeholder = "End (seconds)";
  endInput.style.marginBottom = "5px";
  endInput.style.display = "block";  

  const loopButton = document.createElement("button");
  loopButton.innerText = "Set loop";
  loopButton.style.display = "block";
  loopButton.addEventListener("click", () => {
    const startTime = parseFloat(startInput.value);
    const endTime = parseFloat(endInput.value);

    if(isNaN(startTime) || isNaN(endTime)) {
      alert("Please enter valid timestamps.");
      return;
    }

    setVideoLoop(startTime, endTime);
  });

  const clearLoopButton = document.createElement("button");
  clearLoopButton.innerText = "Clear Loop";
  clearLoopButton.style.marginBottom = "5px";
  clearLoopButton.style.display = "block";
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
  mirrorButton.innerText = "Menu";
  mirrorButton.style.cursor = "pointer";
  mirrorButton.style.padding = "8px";
  mirrorButton.style.margin = "10px 0px";

  mirrorButton.addEventListener("click", () => {
    createMenu(); // Ensure the menu exists
    toggleMenu(); // Show or hide the menu
  });

  controlsCenter.appendChild(mirrorButton);
}

// Observe for changes in the DOM to ensure the button is added
const observer = new MutationObserver(() => {
  addMirrorButton();
});

observer.observe(document.body, { childList: true, subtree: true });

console.log("YouTube Mirroring Extension script loaded");
