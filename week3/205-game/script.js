document.addEventListener("DOMContentLoaded", () => {
  const choices = ["가위", "바위", "보"];
  const buttons = document.querySelectorAll(".options button");
  const pCount = document.querySelector(".p-count");
  const cCount = document.querySelector(".c-count");
  const movesLeft = document.querySelector(".movesleft");
  const result = document.querySelector(".result");
  const reloadBtn = document.querySelector(".reload");

  const moveText = document.querySelector(".move");
  const optionsBox = document.querySelector(".options");

  let playerScore = 0;
  let computerScore = 0;
  let moves = 10;

  // 승부 판단
  const winner = (player, computer) => {
    if (player === computer) return "draw";

    if (
      (player === "가위" && computer === "보") ||
      (player === "바위" && computer === "가위") ||
      (player === "보" && computer === "바위")
    ) {
      return "player";
    } else {
      return "computer";
    }
  };

  // 버튼 클릭 이벤트
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      if (moves <= 0) return;

      const playerChoice = this.innerText;
      const computerChoice = choices[Math.floor(Math.random() * 3)];

      const outcome = winner(playerChoice, computerChoice);

      if (outcome === "player") {
        playerScore++;
        pCount.textContent = playerScore;
        result.textContent = `플레이어 승! (${playerChoice} vs ${computerChoice})`;
      } else if (outcome === "computer") {
        computerScore++;
        cCount.textContent = computerScore;
        result.textContent = `컴퓨터 승! (${playerChoice} vs ${computerChoice})`;
      } else {
        result.textContent = `무승부! (${playerChoice} vs ${computerChoice})`;
      }

      moves--;
      movesLeft.textContent = `남은 횟수: ${moves}`;

      if (moves === 0) endGame();
    });
  });

  // 게임 종료 처리
  const endGame = () => {
    buttons.forEach((btn) => (btn.disabled = true));

    // 요소 숨기기
    optionsBox.style.display = "none";
    movesLeft.style.display = "none";

    // 최종 결과 표시
    moveText.innerText = "게임 종료";
    if (playerScore > computerScore) {
      result.textContent = "🎉 최종 결과: 플레이어 승리!";
    } else if (playerScore < computerScore) {
      result.textContent = "😈 최종 결과: 컴퓨터 승리!";
    } else {
      result.textContent = "🤝 최종 결과: 무승부입니다.";
    }

    // 다시시작 버튼 표시
    reloadBtn.style.display = "block";
    reloadBtn.textContent = "다시 시작";
    reloadBtn.addEventListener("click", () => {
      location.reload();
    });
  };

  // reload 버튼 처음엔 숨김
  reloadBtn.style.display = "none";
});
