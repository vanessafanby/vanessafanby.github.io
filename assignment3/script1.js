/**
 * Handles the click animation on the "Start to Play" button.
 * After the animation, it redirects the user to the character selection page.
 */
const startBtn = document.querySelector("#start-button");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    startBtn.classList.add("clicked");

    setTimeout(() => {
      window.location.href = "character.html";
    }, 500);
  });
}

/**
 * Creates a sparkle image at the mouse position and removes it after 1.5 seconds.
 * This gives a magical sparkle trail effect on the landing page.
 *
 * @param {MouseEvent} e - The mousemove event object
 */
document.addEventListener("mousemove", (e) => {
  const sparkle = document.createElement("img");
  sparkle.src = "assets/sparkle.png";
  sparkle.className = "sparkle";
  sparkle.style.left = `${e.pageX}px`;
  sparkle.style.top = `${e.pageY}px`;
  document.body.appendChild(sparkle);

  setTimeout(() => {
    sparkle.remove();
  }, 1500);
});

/**
 * @typedef {Object} FloatingElementData
 * @property {HTMLElement} el - The DOM element to animate
 * @property {number} angle - The current angle used in sine wave movement
 * @property {number} speed - How fast the angle increases
 * @property {number} amplitude - How far the element moves vertically
 */

/** @type {FloatingElementData[]} */
const floatData = [
  {
    el: document.querySelector(".floating-left"),
    angle: Math.random() * 360,
    speed: 0.03,
    amplitude: 10,
  },
  {
    el: document.querySelector(".floating-middle"),
    angle: Math.random() * 360,
    speed: 0.035,
    amplitude: 12,
  },
  {
    el: document.querySelector(".floating-right"),
    angle: Math.random() * 360,
    speed: 0.04,
    amplitude: 10,
  },
];

/**
 * Animates all characters on the start page to float gently up and down.
 * Uses a sine wave calculation for natural-looking movement.
 * This function keeps looping using requestAnimationFrame.
 */
const animateFloating = () => {
  floatData.forEach(({ el, angle, speed, amplitude }, i) => {
    floatData[i].angle += speed;
    const offset = Math.sin(floatData[i].angle) * amplitude;
    if (el) el.style.top = `${offset}px`;
  });

  requestAnimationFrame(animateFloating);
};

// Start the floating animation loop
animateFloating();
