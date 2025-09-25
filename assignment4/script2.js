const characterPreview = document.querySelector("#character-preview");

const characterName = document.querySelector("#character-name");

const characters = [
  { name: "Furry Bear", img: "assets/characters/bear.png" },
  { name: "Little Meow", img: "assets/characters/cat.png" },
  { name: "Bamboo Panda", img: "assets/characters/panda.png" },
  { name: "Roar Tiger", img: "assets/characters/tiger.png" },
  { name: "Rainbow Unicorn", img: "assets/characters/unicorn.png" },
];

let current = 0;

const updatePreview = () => {
  characterPreview.src = characters[current].img;
  characterName.innerText = characters[current].name;
};

/**
 * Navigates to the previous character in the list.
 * Wraps around to the end if at the beginning.
 */
document.querySelector("#prev-button").addEventListener("click", () => {
  current = (current - 1 + characters.length) % characters.length;
  updatePreview();
});

/**
 * Navigates to the next character in the list.
 * Wraps around to the start if at the end.
 */
document.querySelector("#next-button").addEventListener("click", () => {
  current = (current + 1) % characters.length;
  updatePreview();
});

/**
 * Saves the selected character to localStorage and navigates to the dress-up page.
 */
document.querySelector("#confirm-button").addEventListener("click", () => {
  const selected = characters[current];
  localStorage.setItem("selectedCharacter", JSON.stringify(selected));
  window.location.href = "dressup.html";
});

updatePreview();
// I wrote this character selection script to create a smooth, carousel-style browsing experience that lets users cycle through available characters before committing to their choice. The circular navigation logic using modulo operations ensures users can seamlessly browse in both directions without hitting dead ends, which improves the overall user experience. I implemented immediate visual feedback through the `updatePreview()` function so users can see both the character image and name change instantly as they navigate. The localStorage persistence ensures the selected character carries over to the dress-up page, maintaining continuity between the selection and customization phases. This approach separates the character choice from the dress-up functionality, allowing me to focus each interface on its specific purpose while creating a clear, logical user flow. The simple array-based data structure makes it easy to add new characters in the future without restructuring the navigation logic.
