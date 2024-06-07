const boxes = document.querySelectorAll('.box');
const chooseSelect = document.getElementById('choose');
const h1 = document.querySelector('h1');
const button = document.getElementById('restart');
const chooseLabel = document.querySelector('label');
let gameOver = false;

let currentPlayer = chooseSelect.value;
let gameStarted = false;

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5], 
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boxes[a].textContent !== '' &&
            boxes[a].textContent === boxes[b].textContent &&
            boxes[a].textContent === boxes[c].textContent) {
            return { winner: boxes[a].textContent, combination: combination };
        }
    }
    let filledBoxes = 0;
    for (let box of boxes) {
        if (box.textContent !== '') {
            filledBoxes++;
        }
    }
    if (filledBoxes === 9) {
        return { winner: null, combination: []}; 
    }

    return null;
}

function addWinningLine(combination) {
    if (combination[0] === 0 && combination[1] === 1 && combination[2] === 2) {
        container.classList.add('horizontal');
    } else if (combination[0] === 3 && combination[1] === 4 && combination[2] === 5) {
        container.classList.add('horizontal');
    } else if (combination[0] === 6 && combination[1] === 7 && combination[2] === 8) {
        container.classList.add('horizontal');
    } else if (combination[0] === 0 && combination[1] === 3 && combination[2] === 6) {
        container.classList.add('vertical');
    } else if (combination[0] === 1 && combination[1] === 4 && combination[2] === 7) {
        container.classList.add('vertical');
    } else if (combination[0] === 2 && combination[1] === 5 && combination[2] === 8) {
        container.classList.add('vertical');
    } else if (combination[0] === 0 && combination[1] === 4 && combination[2] === 8) {
        container.classList.add('diagonal-left');
    } else if (combination[0] === 2 && combination[1] === 4 && combination[2] === 6) {
        container.classList.add('diagonal-right');
    }
}

function resetGame() {
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('winning-box');
    });
    h1.textContent = 'TIC TAC TOE';
    button.style.display = 'none';
    chooseSelect.style.display = 'inline-block';
    chooseLabel.style.display = 'inline-block';
    currentPlayer = chooseSelect.value;
    gameStarted = false;
    gameOver = false;
    container.classList.remove('horizontal', 'vertical', 'diagonal-left', 'diagonal-right');
}

chooseSelect.addEventListener('change', function() {
    currentPlayer = chooseSelect.value;
});

document.querySelector('.container').addEventListener('click', (event) => {
    const box = event.target;
    if (gameOver || !box.classList.contains('box') || box.textContent !== '') {
        return;
    } 
    if (!gameStarted) {
        chooseSelect.style.display = 'none';
        chooseLabel.style.display = 'none';
        h1.textContent = `You are playing as ${currentPlayer}`;
        gameStarted = true;
    }

    box.textContent = currentPlayer;
    const winnerInfo = checkWinner();
    if (winnerInfo) {
        const { winner, combination } = winnerInfo;
        if (combination.length > 0) {
            addWinningLine(combination);
        }
        h1.textContent = winner ? `Player ${winner} wins!` : 'It\'s a draw!';
        button.style.display = 'inline-block';
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        h1.textContent = `Current Player: ${currentPlayer}`;
    }
});

button.addEventListener('click', resetGame);





