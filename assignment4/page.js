document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const cfg = {
    src: body.dataset.src,
    correct: body.dataset.correct, // "ai" or "real"
    head: body.dataset.head || "Is this video real or AI-generated?",
    next: body.dataset.next || "",
    progress: parseFloat(body.dataset.progress || "0"),
    fbAiOk: body.dataset.fbAiOk || "",
    fbAiNo: body.dataset.fbAiNo || "",
    fbRealOk: body.dataset.fbRealOk || "",
    fbRealNo: body.dataset.fbRealNo || "",
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

  // Next button & progress
  if (!cfg.next && nextBtn) nextBtn.style.display = "none";
  if (pbar) pbar.style.width = Math.max(0, Math.min(100, cfg.progress)) + "%";
  if (nextBtn) nextBtn.disabled = true;

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

  // Fallback messages
  const fallback = {
    aiOk: "Correct! Clues include lip-sync mismatches, odd blinking, or lighting inconsistencies.",
    aiNo: "Incorrect. This was AI-generated — look for lip-sync mismatches or unnatural micro-expressions.",
    realOk:
      "Correct! Natural expressions, consistent lighting, and aligned audio suggest authenticity.",
    realNo:
      "Not quite — this is real. Notice the smooth, natural movement and audio alignment.",
  };

  function onChoice(choice) {
    lock();
    const isCorrect = choice === cfg.correct;
    const clicked = choice === "ai" ? btnAI : btnReal;

    if (isCorrect) {
      clicked.classList.add("correct");
      const msg =
        choice === "ai"
          ? cfg.fbAiOk || fallback.aiOk
          : cfg.fbRealOk || fallback.realOk;
      showFeedback(msg, true);
    } else {
      clicked.classList.add("incorrect");
      (cfg.correct === "ai" ? btnAI : btnReal).classList.add("correct");
      const msg =
        choice === "ai"
          ? cfg.fbAiNo || fallback.aiNo
          : cfg.fbRealNo || fallback.realNo;
      showFeedback(msg, false);
    }
    if (nextBtn && cfg.next) nextBtn.disabled = false;
  }

  btnAI.addEventListener("click", () => onChoice("ai"));
  btnReal.addEventListener("click", () => onChoice("real"));
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      if (cfg.next) window.location.href = cfg.next;
    });
});
