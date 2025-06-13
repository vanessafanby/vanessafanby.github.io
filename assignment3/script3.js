function setMirrorBackground(src) {
  const mirrorBg = document.getElementById("mirror-bg");

  if (mirrorBg) {
    mirrorBg.src = src;
    localStorage.setItem("mirror-background", src);
  }
}
// Seamless character continuity from selection screen
//  * This restores the previously selected character, maintaining user context
//  * and eliminating the need to re-select characters when returning to the game
const characterData = JSON.parse(localStorage.getItem("selectedCharacter"));
if (characterData) {
  document.getElementById("base-character").src = characterData.img;
}

const idMap = {
  headwear: "headwear-layer",
  neckwear: "neckwear-layer",
  decoration: "decoration-layer",
};

const accessories = {
  headwear: [
    "assets/accessories/headwear/beanie.png",
    "assets/accessories/headwear/bow.png",
    "assets/accessories/headwear/crown.png",
    "assets/accessories/headwear/hairclip.png",
    "assets/accessories/headwear/sunhat.png",
  ],
  neckwear: [
    "assets/accessories/neckwear/necklaceheart.png",
    "assets/accessories/neckwear/necklace.png",
    "assets/accessories/neckwear/collar.png",
    "assets/accessories/neckwear/winter.png",
    "assets/accessories/neckwear/tie.png",
  ],
  decoration: [
    "assets/accessories/decoration/handbag.png",
    "assets/accessories/decoration/mic.png",
    "assets/accessories/decoration/scarf.png",
    "assets/accessories/decoration/sunglasses.png",
    "assets/accessories/decoration/teddybear.png",
  ],
};

for (const type in accessories) {
  const container = document.getElementById(`${type}-container`);
  accessories[type].forEach((imgPath) => {
    const button = document.createElement("button");
    const img = document.createElement("img");
    img.src = imgPath;
    img.alt = imgPath;
    button.appendChild(img);
    button.onclick = () => changeDecoration(type, imgPath);
    container.appendChild(button);
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.onclick = () => changeDecoration(type, "");
  container.appendChild(removeBtn);
}

const changeDecoration = (type, src) => {
  const layerId = idMap[type];
  const layer = document.getElementById(layerId);
  layer.src = src;
  localStorage.setItem(`${type}-accessory`, src);
};

for (const type in idMap) {
  const layer = document.getElementById(idMap[type]);
  const savedSrc = localStorage.getItem(`${type}-accessory`);
  if (savedSrc) {
    layer.src = savedSrc;
  }
  const savedPosition = JSON.parse(localStorage.getItem(`${type}-position`));
  if (savedPosition) {
    layer.style.left = savedPosition.left;
    layer.style.top = savedPosition.top;
  }

  makeDraggable(layer, type);
}

/**
 * Enables drag-and-drop functionality for a given element.
 * Keeps the element inside its parent container while dragging.
 * Saves the final position to localStorage when dropped.
 */
function makeDraggable(element, type) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  element.style.position = "absolute";
  element.style.cursor = "grab";

  /**
   * Starts dragging the element by setting the drag flag
   * and calculating the mouse offset from the element’s top-left corner.
   *
   * @param {MouseEvent} e - The mouse down event on the element
   */
  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    element.style.cursor = "grabbing";
  });
  /**
   * Updates the element’s position as the mouse moves,
   * constrained within the parent container.
   *
   * @param {MouseEvent} e - The mouse move event while dragging
   */
  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const container = element.parentElement.getBoundingClientRect();
      const elemWidth = element.offsetWidth;
      const elemHeight = element.offsetHeight;

      let newLeft = e.clientX - container.left - offsetX;
      let newTop = e.clientY - container.top - offsetY;

      newLeft = Math.max(0, Math.min(newLeft, container.width - elemWidth));
      newTop = Math.max(0, Math.min(newTop, container.height - elemHeight));

      element.style.left = `${newLeft}px`;
      element.style.top = `${newTop}px`;
    }
  });
  /**
   * Ends the drag operation and saves the current position
   * of the accessory to localStorage.
   */
  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      element.style.cursor = "grab";
      localStorage.setItem(
        `${type}-position`,
        JSON.stringify({
          left: element.style.left,
          top: element.style.top,
        })
      );
    }
  });
}
// My dress-up game evolved from click-based to drag-and-drop interactions after receiving feedback about positioning difficulties during my presentation. This change directly addressed users' struggles with precise accessory placement, making the interface more intuitive by mimicking physical item placement.
