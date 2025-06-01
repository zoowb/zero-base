const quoteDisplay = document.querySelector(".quote");
const inputArea = document.querySelector(".input_area");
const restartBtn = document.querySelector(".restart_btn");

const timerText = document.querySelector(".curr_time");
const errorsText = document.querySelector(".curr_errors");
const accuracyText = document.querySelector(".curr_accuracy");
const cpmText = document.querySelector(".curr_cpm");
const wpmText = document.querySelector(".curr_wpm");

const wpmBox = document.querySelector(".wpm");
const cpmBox = document.querySelector(".cpm");

let TIME_LIMIT = 60;
let timeLeft = TIME_LIMIT;
let timer = null;
let totalErrors = 0;
let errors = 0;
let totalTyped = 0;
let gameRunning = false;

let quotes = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing fast and accurately is a valuable skill.",
  "Practice makes perfect when it comes to typing.",
  "JavaScript is a versatile programming language.",
  "Stay focused and keep your hands on the keyboard.",
];

let currentQuote = "";

function updateQuote() {
  currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteDisplay.innerHTML = "";

  currentQuote.split("").forEach((char) => {
    const charSpan = document.createElement("span");
    charSpan.innerText = char;
    quoteDisplay.appendChild(charSpan);
  });
}

function processInput() {
  const input = inputArea.value;
  const quoteSpans = quoteDisplay.querySelectorAll("span");

  errors = 0;
  totalTyped++;

  quoteSpans.forEach((span, index) => {
    const char = input[index];

    if (char == null) {
      span.classList.remove("correct_char", "incorrect_char");
    } else if (char === span.innerText) {
      span.classList.add("correct_char");
      span.classList.remove("incorrect_char");
    } else {
      span.classList.add("incorrect_char");
      span.classList.remove("correct_char");
      errors++;
    }
  });

  errorsText.innerText = totalErrors + errors;

  let correctChars = totalTyped - (totalErrors + errors);
  let accuracy = (correctChars / totalTyped) * 100;
  accuracyText.innerText = Math.round(accuracy);

  if (input.length === currentQuote.length) {
    totalErrors += errors;
    inputArea.value = "";
    updateQuote();
  }
}

function startGame() {
  resetValues();
  updateQuote();
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
  gameRunning = true;
  restartBtn.style.display = "none"; // 버튼 숨김
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  totalErrors = 0;
  errors = 0;
  totalTyped = 0;
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();

  timerText.innerText = `${timeLeft}s`;
  errorsText.innerText = 0;
  accuracyText.innerText = 100;
  cpmText.innerText = 0;
  wpmText.innerText = 0;

  wpmBox.style.display = "none";
  cpmBox.style.display = "none";
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerText.innerText = `${timeLeft}s`;
  } else {
    finishGame();
  }
}

function finishGame() {
  clearInterval(timer);
  inputArea.disabled = true;
  gameRunning = false;
  restartBtn.style.display = "block"; // 버튼 다시 표시

  const cpm = Math.round((totalTyped / TIME_LIMIT) * 60);
  const wpm = Math.round((totalTyped / 5 / TIME_LIMIT) * 60);

  cpmText.innerText = cpm;
  wpmText.innerText = wpm;

  wpmBox.style.display = "block";
  cpmBox.style.display = "block";
  quoteDisplay.innerText = "측정이 완료되었습니다.";
}

inputArea.addEventListener("input", processInput);
restartBtn.addEventListener("click", () => {
  if (!gameRunning) startGame();
});
quoteDisplay.addEventListener("click", () => {
  if (!gameRunning) startGame();
});
