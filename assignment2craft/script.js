const video = document.getElementById("tutorialVideo");
const progressBar = document.getElementById("progressBar");
const markers = document.querySelectorAll(".marker");
const steps = document.querySelectorAll("#instructionSteps li");
const nextBtn = document.getElementById("nextStep");
const prevBtn = document.getElementById("prevStep");
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");

let currentStep = 0;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

// Update current time during video playback
video.addEventListener("timeupdate", () => {
  currentTimeDisplay.textContent = formatTime(video.currentTime);
});

// When video metadata loads, set total time
video.addEventListener("loadedmetadata", () => {
  totalTimeDisplay.textContent = formatTime(video.duration);
});

video.addEventListener("timeupdate", () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + "%";

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

// Marker click navigation
markers.forEach((marker) => {
  marker.addEventListener("click", () => {
    const time = parseFloat(marker.dataset.time);
    video.currentTime = time;
  });
});

// Step click navigation
steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    const time = parseFloat(step.dataset.time);
    video.currentTime = time;
    currentStep = index;
  });
});

// Button navigation
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
