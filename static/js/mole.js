// script.js

let score = 0;
let moleTimeout;
let gameStarted = false;

const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

// Function to randomly choose a hole and show the mole
function showMole() {
    const randomHole = holes[Math.floor(Math.random() * holes.length)];
    const mole = document.createElement('div');
    mole.classList.add('mole');
    randomHole.appendChild(mole);

    mole.addEventListener('click', () => {
        score++;
        scoreDisplay.textContent = score;
        mole.remove();
    });

    // Remove the mole after a random time
    setTimeout(() => {
        mole.remove();
    }, 800);
}

// Function to start the game
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        score = 0;
        scoreDisplay.textContent = score;

        // Show moles at random intervals
        moleTimeout = setInterval(showMole, 1000);

        // Disable the start button once the game starts
        startBtn.disabled = true;
        startBtn.textContent = 'Game in Progress...';
    }
}

// Function to stop the game
function stopGame() {
    clearInterval(moleTimeout);
    gameStarted = false;
    startBtn.disabled = false;
    startBtn.textContent = 'Start Game';
    alert(`Game Over! Your final score is: ${score}`);
}

// Add event listener to the start button
startBtn.addEventListener('click', () => {
    if (!gameStarted) {
        startGame();
    } else {
        stopGame();
    }
});
