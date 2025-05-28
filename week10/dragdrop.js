const card = document.querySelector(".card");
console.log(card);

let draggedCard = null;

card.addEventListener("dragstart", function () {
  draggedCard = card;
  console.log(draggedCard);
});

const dropBox = document.querySelector(".dropbox");
console.log(dropbox);

dropBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropBox.addEventListener("drop", function () {
  const clone = draggedCard;
  //   dropbox.innerHTML = draggedCard;
  dropbox.appendChild(draggedCard);
  draggedCard = null;

  clone.addEventListener("click", function () {
    clone.classList.toggle("flip");
  });
  dropBox.appendChild(clone);
});
