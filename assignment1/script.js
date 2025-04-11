document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("musicTab");
  const audio = document.getElementById("backgroundMusic");

  button.addEventListener("click", () => {
    audio.play();
    button.textContent = "Click to Enable Sound";
  });
});
