/**
 * Restore background image from localStorage
 */
const savedBg = localStorage.getItem("mirror-background");
if (savedBg) {
  const bg = document.getElementById("mirror-bg");
  if (bg) bg.src = savedBg;
}

/**
 * Load base character from localStorage
 */
const characterData = JSON.parse(localStorage.getItem("selectedCharacter"));
if (characterData) {
  document.getElementById("base-character").src = characterData.img;
}

/**
 * Maps accessory types to image layer IDs.
 * @type {Object.<string, string>}
 */
const idMap = {
  headwear: "headwear-layer",
  neckwear: "neckwear-layer",
  decoration: "decoration-layer",
};

/**
 * Image paths for accessories in each category
 * @type {Object.<string, string[]>}
 */
const accessories = {
  headwear: [
    "assets/accessories/headwear/hat1.png",
    "assets/accessories/headwear/hat2.png",
    "assets/accessories/headwear/hat3.png",
    "assets/accessories/headwear/hat4.png",
    "assets/accessories/headwear/hat5.png",
    "assets/accessories/headwear/6.png",
    "assets/accessories/headwear/7.png",
    "assets/accessories/headwear/8.png",
    "assets/accessories/headwear/9.png",
    "assets/accessories/headwear/10.png",
  ],
  neckwear: [
    "assets/accessories/neckwear/1.png",
    "assets/accessories/neckwear/2.png",
    "assets/accessories/neckwear/3.png",
    "assets/accessories/neckwear/4.png",
    "assets/accessories/neckwear/5.png",
  ],
  decoration: [
    "assets/accessories/decoration/1.png",
    "assets/accessories/decoration/2.png",
    "assets/accessories/decoration/3.png",
    "assets/accessories/decoration/4.png",
    "assets/accessories/decoration/5.png",
  ],
};

/**
 * Create accessory buttons and bind click handlers.
 */
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

/**
 * Updates accessory layer and saves to localStorage
 * @param {string} type
 * @param {string} src
 */
const changeDecoration = (type, src) => {
  const layerId = idMap[type];
  const layer = document.getElementById(layerId);
  layer.src = src;
  localStorage.setItem(`${type}-accessory`, src);
};

/**
 * Restore previous accessories and their drag positions
 */
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
 *
 * @param {HTMLElement} element - The element to be made draggable
 * @param {string} type - The accessory type (used for localStorage key)
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

/**
 * Set the current mirror background and store it
 * @param {string} src
 */
const setMirrorBackground = (src) => {
  const bg = document.getElementById("mirror-bg");
  if (bg) {
    bg.src = src;
    localStorage.setItem("mirror-background", src);
  }
};

/**
 * Capture the current styled mirror and download as PNG
 */
const saveSnapshot = () => {
  const target = document.querySelector(".mirror-frame");
  if (!target) return;

  html2canvas(target, {
    useCORS: true,
    backgroundColor: null,
    scale: 2,
  }).then((canvas) => {
    const link = document.createElement("a");
    link.download = "my-character-look.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
};
