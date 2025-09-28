document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const cfg = {
    src: body.dataset.src,
    correct: body.dataset.correct, // "ai" or "real"
    head: body.dataset.head || "Is this video real or AI-generated?",
    next: body.dataset.next || "", // q2.html, etc. leave blank on last page
    fbAiOk: body.dataset.fbAiOk || "",
    fbAiNo: body.dataset.fbAiNo || "",
    fbRealOk: body.dataset.fbRealOk || "",
    fbRealNo: body.dataset.fbRealNo || "",
    progress: parseFloat(body.dataset.progress || "0"), // 0-100
  };

  const titleEl = document.querySelector(".title");
  const videoEl = document.getElementById("videoEl");
  const srcEl = document.getElementById("videoSrc");
  const btnAI = document.getElementById("btnAI");
  const btnReal = document.getElementById("btnReal");
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");
  const pbar = document.getElementById("progressBar");

  titleEl.textContent = cfg.head;
  srcEl.src = cfg.src;
  videoEl.load();
  nextBtn.disabled = true;
  if (!cfg.next) nextBtn.style.display = "none";
  if (pbar) pbar.style.width = Math.max(0, Math.min(100, cfg.progress)) + "%";

  const lock = () => {
    [btnAI, btnReal].forEach((b) => {
      b.disabled = true;
      b.classList.add("disabled");
    });
  };
  const showFeedback = (text, ok) => {
    feedback.textContent = text;
    feedback.className = "feedback show " + (ok ? "ok" : "no");
  };

  function onChoice(choice) {
    lock();
    const isCorrect = choice === cfg.correct;
    const clicked = choice === "ai" ? btnAI : btnReal;

    if (isCorrect) {
      clicked.classList.add("correct");
      showFeedback(choice === "ai" ? cfg.fbAiOk : cfg.fbRealOk, true);
    } else {
      clicked.classList.add("incorrect");
      (cfg.correct === "ai" ? btnAI : btnReal).classList.add("correct");
      showFeedback(choice === "ai" ? cfg.fbAiNo : cfg.fbRealNo, false);
    }
    if (cfg.next) nextBtn.disabled = false;
  }

  btnAI.addEventListener("click", () => onChoice("ai"));
  btnReal.addEventListener("click", () => onChoice("real"));
  nextBtn.addEventListener("click", () => {
    if (cfg.next) window.location.href = cfg.next;
  });
});
