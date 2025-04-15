document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("musicTab");
  const audio = document.getElementById("backgroundMusic");

  button.addEventListener("click", () => {
    audio.play();
    button.textContent = "Click to Enable Sound";
  });
});
// I had trouble adding the EventListener, therefore I used ChatGPT to assit me Javascript. It assited me by entering 'getElementByID'. I decided to include this music since it is classic and calm.
