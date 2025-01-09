function toggleMirror() {
    const video = document.querySelector("video");
    if (video) {
      const isMirrored = video.style.transform === "scaleX(-1)";
      video.style.transform = isMirrored ? "none" : "scaleX(-1)";
    }
  }
  
function addMirrorButton() {
    const controlsCenter = document.querySelector('.ytp-right-controls');
    if (!controlsCenter || document.querySelector('#mirror-button')) return;

    const mirrorButton = document.createElement("button");
    mirrorButton.id = "mirror-button";
    mirrorButton.innerText = "Mirror";
    mirrorButton.style.cursor = "pointer";
    mirrorButton.style.padding = "8px";
    mirrorButton.style.margin = "10px 0px";

    mirrorButton.addEventListener('click', toggleMirror);
    controlsCenter.appendChild(mirrorButton);
}

const observer = new MutationObserver(() => {
    addMirrorButton();
});

observer.observe(document.body, { childList: true, subtree: true });

console.log("YouTube Mirroring Extension script loaded");
