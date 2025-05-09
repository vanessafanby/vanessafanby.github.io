const myVideo = document.getElementById("tutorialVideo");
console.log(myVideo);

const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);
// I decided to add the basic play/pause and mute/unmute buttons to control the video. By making the icons change, such as play to pause and mute to unmute, the button icons dynamically provides immediate visual feedback to users, making interaction more intuitive.

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
// These icons used for play/pause and mute/unmute were all from 'Icons8'. Since they are clean and high-quality images, it allows the users to know what the icon is about and also aligns with the aesthetic of the page.

const fastForwardButton = document.querySelector("#fast-forward-button");
console.log(fastForwardButton);

fastForwardButton.addEventListener("click", () => {
  myVideo.currentTime = Math.min(myVideo.duration, myVideo.currentTime + 5);
});

const rewindButton = document.querySelector("#rewind-button");
console.log(rewindButton);

// I decided to use fast forward/rewind for 5 seconds buttons instead of faster speeds (like 2x or 3x) to prioritise user control. I want it to offer a smoother and less disorienting experience. Furthermore, I thought that by allowing users to skip in smaller, manageable increments (5 seconds), they will be able to control it more with precise navigations. Which allow users to skip forward/backward to a specific point in the tutorial without feeling like they've missed content.

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
// I decided to add in a fullscreen button to allow users view the video in full-screen mode, to have a better viewing experience in a larger and clearer display, especially in craft and DIY making.

const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

heartButton.addEventListener("click", updateLikes);

const likesContainer = document.querySelector("#likes");
let likes = 0;

// to display updated like count
function updateLikes() {
  likes++;
  likesContainer.textContent = likes;
}
// I decided to add in like button icons for user engagement. By adding in comment and liking interaction, I wanted it to help the content creator improve the tutorial experience based on feedback.

// Clickable markers to jump to specific key points of tutorial
const markers = document.querySelectorAll(".marker");
console.log(markers);

markers.forEach((marker) => {
  marker.addEventListener("click", () => {
    const time = parseFloat(marker.dataset.time);
    myVideo.currentTime = time; // this allow users jump to specific time in video when marker is clicked
  });
});

// Clickable tutorial steps
const steps = document.querySelectorAll(".step");
console.log(steps); // Jump to specific tutorial step when clicked

steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    const time = parseFloat(step.dataset.time);
    myVideo.currentTime = time;
  });
});
// By adding in markers and clickable steps, it allow users to navigate to specific tutorial content more efficiently by jumping to key moments. I thought that this would be useful for crafting tutorials, where users may want to jump to specific sections that are most relevant to them. To add on, I thought that by adding this will be more user-friendly since it saves time, enhances clarity and reduces frustration.

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
    // I decided to add a comment section to allow users to share feedback, ask questions, or give tips. Furthermore, I also wanted to provide a sense of community in this interactive feature to support user engagement and collaboration.

    commentsContainer.prepend(commentDiv); // Display new comment at the top and reseting the form after submitting
  }
  commentForm.reset();
});
// Since I am unfamiliar with commenting systems, I have used ChatGPT and YouTube to assist me. This is the YouTube link i have used: https://www.youtube.com/watch?v=Ty3hW8UPg0Q
