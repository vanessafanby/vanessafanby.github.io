const myVideo = document.getElementById("tutorialVideo");
console.log(myVideo);

myVideo.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  const duration = (myVideo.currentTime / myVideo.duration) * 100;
  // progressBar.style.width = duration + "%";  // Removed as per request
}

const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

playPauseButton.addEventListener("click", togglePlayback);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

function togglePlayback() {
  if (myVideo.paused || myVideo.ended) {
    myVideo.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  } else {
    myVideo.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  }
}

const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

muteUnmuteButton.addEventListener("click", toggleAudio);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);

function toggleAudio() {
  if (myVideo.muted) {
    myVideo.muted = false;
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
  } else {
    myVideo.muted = true;
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
  }
}

const fastForwardButton = document.querySelector("#fast-forward-button");
console.log(fastForwardButton);

fastForwardButton.addEventListener("click", () => {
  myVideo.currentTime = Math.min(myVideo.duration, myVideo.currentTime + 5);
});

const rewindButton = document.querySelector("#rewind-button");
console.log(rewindButton);

rewindButton.addEventListener("click", () => {
  myVideo.currentTime = Math.max(0, myVideo.currentTime - 5);
});

const fullscreenButton = document.querySelector("#fullscreen-button");
console.log(fullscreenButton);

fullscreenButton.addEventListener("click", toggleFullscreen);

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

heartButton.addEventListener("click", updateLikes);

const likesContainer = document.querySelector("#likes");
let likes = 0;

function updateLikes() {
  likes++;
  likesContainer.textContent = likes;
}

const markers = document.querySelectorAll(".marker");
console.log(markers);

markers.forEach((marker) => {
  marker.addEventListener("click", () => {
    const time = parseFloat(marker.dataset.time);
    myVideo.currentTime = time;
  });
});

const steps = document.querySelectorAll(".step");
console.log(steps);

steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    const time = parseFloat(step.dataset.time);
    myVideo.currentTime = time;
  });
});

let currentStep = 0; // Declare currentStep before it's used

const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const commentsContainer = document.getElementById("commentsContainer");

commentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = commentInput.value.trim();

  if (text) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");

    commentDiv.innerHTML = `
      <div class="text">${text}</div>
    `;

    commentsContainer.prepend(commentDiv); // Show newest comment on top
    commentForm.reset();
  }
});
