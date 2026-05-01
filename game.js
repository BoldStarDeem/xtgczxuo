(function () {
    const WIN_COMBOS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let gameOver = false;
    let scores = { X: 0, O: 0, draw: 0 };

    const cells = document.querySelectorAll(".cell");
    const statusEl = document.getElementById("status");
    const restartBtn = document.getElementById("restart");
    const scoreX = document.getElementById("score-x");
    const scoreO = document.getElementById("score-o");
    const scoreDraw = document.getElementById("score-draw");

    function handleClick(e) {
        const idx = +e.target.dataset.index;
        if (board[idx] || gameOver) return;

        board[idx] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.classList.add("taken", currentPlayer.toLowerCase());

        const winCombo = checkWin(currentPlayer);
        if (winCombo) {
            gameOver = true;
            statusEl.textContent = `Победил ${currentPlayer}!`;
            statusEl.className = "status winner";
            scores[currentPlayer]++;
            updateScoreboard();
            highlightWin(winCombo);
            return;
        }

        if (board.every(Boolean)) {
            gameOver = true;
            statusEl.textContent = "Ничья!";
            statusEl.className = "status draw";
            scores.draw++;
            updateScoreboard();
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusEl.textContent = `Ход: ${currentPlayer}`;
    }

    function checkWin(player) {
        return WIN_COMBOS.find(combo =>
            combo.every(i => board[i] === player)
        ) || null;
    }

    function highlightWin(combo) {
        combo.forEach(i => cells[i].classList.add("win-cell"));
    }

    function updateScoreboard() {
        scoreX.textContent = scores.X;
        scoreO.textContent = scores.O;
        scoreDraw.textContent = scores.draw;
    }

    function restart() {
        board = Array(9).fill(null);
        currentPlayer = "X";
        gameOver = false;
        statusEl.textContent = "Ход: X";
        statusEl.className = "status";
        cells.forEach(cell => {
            cell.textContent = "";
            cell.className = "cell";
        });
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    restartBtn.addEventListener("click", restart);
})();
