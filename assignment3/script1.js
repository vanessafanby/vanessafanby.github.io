const startBtn = document.querySelector("#start-button");
const music = document.getElementById("start-music");

startBtn.addEventListener("click", () => {
  music.play().catch(() => {}); // prevents browser errors
  window.location.href = "character.html";
});
