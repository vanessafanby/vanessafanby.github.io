const myVideo = document.querySelector("#my-video");
console.log(myVideo);
// play pause logic
// fetch the right button to play and pause video
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

// listen to click on this button
playPauseButton.addEventListener("click", togglePlay);

// fetch the image so that we can change the icon
const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

// run this function when click happens
function togglePlay() {
  if (myVideo.paused || myVideo.ended) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v2.png";
    myVideo.play();
  } else {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
    myVideo.pause();
  }
}
// -------------------------------------------

// mute unmute logic
// fetch the right button t mute and unmute video
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

// listen to click on this button
muteUnmuteButton.addEventListener("click", togglePlay);

// fetch the image so that we can change the icon
const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);

// run this function when click happens
function togglePlay() {
  if (myVideo.muted) {
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
    myVideo.muted = false;
  } else {
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
    myVideo.muted = true;
  }
}
// -----------------------------------------
// myVideo.muted => myVideo.muted === true
//!myVideo.muted => myVideo.muted === flase
// = assigning values name = "vanessa" id = 4
// === comparison of values and type a = 4 true and a ===6 false

// mute unmute logic
// fetch the right button t mute and unmute video
const fastForwardButton = document.querySelector("#fast-forward-button");
console.log(fastForwardButton);

// listen to click on this button
fastForwardButton.addEventListener("click", fastForward);

// run this function when click happens
function fastForward() {
  if (myVideo.playBackRate === 1.0) {
    myVideo.playBackRate = 2.0;
  } else {
    myVideo.playBackRate = 1.0;
  }
}
// -----------------------------------------

// stepping logic
// fetch the right button to step video
const step1Button = document.querySelector("#step1-button");
console.log(step1Button);

// listen to click on this button
step1Button.addEventListener("click", gotoStep1);

// run this function when click happens
function gotoStep1() {
  myVideo.currentTime = 17.0;
}

const step2Button = document.querySelector("#step2-button");
console.log(step2Button);

// listen to click on this button
step2Button.addEventListener("click", gotoStep2);

// run this function when click happens
function gotoStep2() {
  myVideo.currentTime = 43.56;
}
// ----------------------------------------------------------

// stepping logic
// fetch the right button to step video
const fullscreenButton = document.querySelector("#fullscreen-button");
console.log(fullscreenButton);

myVideo.addEventListener("dbclick", goFullScreen);

// listen to click on this button
fullscreenButton.addEventListener("click", goFullScreen);

// run this function when click happens
function goFullScreen() {
  if (!document.fullscreenElement) {
    myVideo.requestFullscreen();
  } else {
    document.exitFullscreen;
  }
}
// ----------------------------------------------

// likes logic
// fetch the right button to step video
const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

let likes = 0;

const likesContainer = document.querySelector("#likes");
console.log(likesContainer);
// listen to click on this button
heartButton.addEventListener("click", updateLikes);

// run this function when click happens
function updateLikes() {
  likes++;
  likesContainer.textContent = likes;
}
// -------------------------------------------

const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);

myVideo.addEventListener("timeupdate", updateProgess);
function updateProgess() {
  let progress = (myVideo.currentTime / myVideo.duration) * 100;
  // console.log(progress);
  progressBar.style.width = progress + "%";
  // % is the percentage sign, which is shift 5
}

// Playlist

const playlist = [
    {
        id:1
        sr: "stardust.mp4",
        name:"stardust",
    },
    {
        id:2
        sr: "zenscape.mp4",
        name:"zenscaoe"
    },
    {
        id:3
        sr: "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/miac.mp4",
        name:"Music video",
    },
];


// stepping logic
// fetch the right button to step video
const stardustButton = document.querySelector("#stardust-vid-button");
console.log(stardustButton);

// listen to click on this button
stardustButton.addEventListener("click", function chooseStardust(){
    chooseVideo(0);
});

const zenscapeButton = document.querySelector("#zenscape-vid-button");
console.log(zenscapeButton);

// listen to click on this button
zenscapeButton.addEventListener("click", function chooseZenscape(){
    chooseVideo(0);
});

const musicvidButton = document.querySelector("#musicvideo-vid-button");
console.log(musicvidButton);

// listen to click on this button
musicvidButton.addEventListener("click", function chooseMusicvid(){
    // chooseVideo(2);
    chooseSrc(
    "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/miac.mp4"
    );
});

function chooseVideo(no) {
    myVideo.src = playlist(no).src;
    myVideo.load();
    myVideo.play();
  } 

  function chooseSrc(src) {
    myVideo.src = src;
    myVideo.load();
    myVideo.play();
  }