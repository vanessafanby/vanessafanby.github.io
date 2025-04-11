document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("musicTab");
  const audio = document.getElementById("backgroundMusic");

  button.addEventListener("click", () => {
    audio.play();
    button.textContent = "Click to Enable Sound";
  });
});
I used ChatGPT to assit me Javascript. I decided to include this music since it is classic and calm.