// This is the "Start to Play" button. After pressing this button, it redirects the user to the character selection page.//
const startBtn = document.querySelector("#start-button");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    startBtn.classList.add("clicked");

    setTimeout(() => {
      window.location.href = "character.html";
    }, 500);
  });
}
