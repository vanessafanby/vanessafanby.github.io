document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const cfg = {
    src: body.dataset.src,
    correct: body.dataset.correct, // "ai" or "real"
    head: body.dataset.head || "Is this video real or AI-generated?",
    next: body.dataset.next || "",
    prev: body.dataset.prev || "",
    results: body.dataset.results || "results.html",
    progress: parseFloat(body.dataset.progress || "0"),
    fbAiOk: body.dataset.fbAiOk || "",
    fbAiNo: body.dataset.fbAiNo || "",
    fbRealOk: body.dataset.fbRealOk || "",
    fbRealNo: body.dataset.fbRealNo || "",
    total: parseInt(body.dataset.total || "5", 10),
  };

  const titleEl = document.querySelector(".title");
  const videoEl = document.getElementById("videoEl");
  const srcEl = document.getElementById("videoSrc");
  const btnAI = document.getElementById("btnAI");
  const btnReal = document.getElementById("btnReal");
  const feedback = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const pbar = document.getElementById("progressBar");

  titleEl.textContent = cfg.head;
  if (srcEl) {
    srcEl.src = cfg.src;
  }
  if (videoEl) {
    videoEl.load();
  }

  // Prev/Next setup
  if (!cfg.prev && prevBtn) prevBtn.style.display = "none";
  if (prevBtn && cfg.prev)
    prevBtn.addEventListener("click", () => {
      window.location.href = cfg.prev;
    });

  if (!cfg.next && nextBtn) nextBtn.style.display = "none";
  if (nextBtn) nextBtn.disabled = true;

  if (pbar) pbar.style.width = Math.max(0, Math.min(100, cfg.progress)) + "%";

  // Score storage
  const KEY_SCORE = "quizScore";
  const KEY_TOTAL = "quizTotal";
  const pageKey = "answered:" + window.location.pathname;

  if (!localStorage.getItem(KEY_TOTAL)) {
    localStorage.setItem(KEY_TOTAL, String(cfg.total));
  }

  const alreadyAnswered = localStorage.getItem(pageKey) === "true";

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

  const fallback = {
    aiOk: "Correct! Clues include lip-sync mismatches, odd blinking, or lighting inconsistencies.",
    aiNo: "Incorrect. This was AI-generated — look for lip-sync mismatches or unnatural micro-expressions.",
    realOk:
      "Correct! Natural expressions, consistent lighting, and aligned audio suggest authenticity.",
    realNo:
      "Not quite — this is real. Notice the smooth, natural movement and audio alignment.",
  };

  function awardScoreIfFirstTime(isCorrect) {
    if (alreadyAnswered) return;
    const prev = parseInt(localStorage.getItem(KEY_SCORE) || "0", 10);
    const next = isCorrect ? prev + 1 : prev;
    localStorage.setItem(KEY_SCORE, String(next));
    localStorage.setItem(pageKey, "true");
  }

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

    awardScoreIfFirstTime(isCorrect);

    if (nextBtn && cfg.next) nextBtn.disabled = false;
    if (!cfg.next) createResultsButton(); // on last page
  }

  function createResultsButton() {
    if (document.getElementById("resultsBtn")) return;
    const btn = document.createElement("button");
    btn.id = "resultsBtn";
    btn.className = "fab fab-next";
    btn.title = "View results";
    btn.setAttribute("aria-label", "View results");
    btn.textContent = "★";
    btn.addEventListener("click", () => {
      window.location.href = cfg.results;
    });
    document.body.appendChild(btn);
  }

  btnAI.addEventListener("click", () => onChoice("ai"));
  btnReal.addEventListener("click", () => onChoice("real"));
  if (nextBtn && cfg.next)
    nextBtn.addEventListener("click", () => {
      window.location.href = cfg.next;
    });
});
