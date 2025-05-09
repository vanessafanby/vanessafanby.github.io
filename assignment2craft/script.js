const video = document.getElementById("tutorialVideo");
const markers = document.querySelectorAll(".marker");
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");
const fastForwardButton = document.querySelector("#fast-forward-button");
const rewindButton = document.querySelector("#rewind-button");
const playPauseButton = document.querySelector("#play-pause-button");
const playPauseImg = document.querySelector("#play-pause-img");
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
const muteUnmuteImg = document.querySelector("#mute-unmute-img");
const fullscreenButton = document.querySelector("#fullscreen-button");
const heartButton = document.querySelector("#heart-button");
const likesContainer = document.querySelector("#likes");
const steps = document.querySelectorAll(".step");
const nextBtn = document.querySelector("#next-button");
const prevBtn = document.querySelector("#prev-button");
const commentForm = document.getElementById("commentForm");
const commentInput = document.getElementById("commentInput");
const commentsContainer = document.getElementById("commentsContainer");

let currentStep = 0;
let likes = 0;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

// Play / Pause
playPauseButton.addEventListener("click", () => {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
  }
});

// Mute / Unmute
muteUnmuteButton.addEventListener("click", () => {
  video.muted = !video.muted;
  muteUnmuteImg.src = video.muted
    ? "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png"
    : "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
});

// Fullscreen
fullscreenButton.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Fast Forward 5 secs
fastForwardButton.addEventListener("click", () => {
  video.currentTime = Math.min(video.duration, video.currentTime + 5);
});

// Rewind 5 seconds
rewindButton.addEventListener("click", () => {
  video.currentTime = Math.max(0, video.currentTime - 5);
});

// Like Button
heartButton.addEventListener("click", () => {
  likes++;
  likesContainer.textContent = likes;
});

// Update Time Display
video.addEventListener("timeupdate", () => {
  currentTimeDisplay.textContent = formatTime(video.currentTime);

  // Highlight current step
  steps.forEach((step, index) => {
    const stepTime = parseFloat(step.dataset.time);
    if (video.currentTime >= stepTime) {
      step.classList.add("active");
      currentStep = index;
    } else {
      step.classList.remove("active");
    }
  });
});

// Load Total Time
video.addEventListener("loadedmetadata", () => {
  totalTimeDisplay.textContent = formatTime(video.duration);
});

// Marker Navigation
markers.forEach((marker) => {
  marker.addEventListener("click", () => {
    const time = parseFloat(marker.dataset.time);
    video.currentTime = time;
  });
});

// Step Navigation
steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    const time = parseFloat(step.dataset.time);
    video.currentTime = time;
    currentStep = index;
  });
});

// Next / Previous Step Buttons
nextBtn.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    video.currentTime = parseFloat(steps[currentStep].dataset.time);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    video.currentTime = parseFloat(steps[currentStep].dataset.time);
  }
});

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
