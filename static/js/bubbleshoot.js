const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan'];
const rows = 5;
const cols = 10;
const grid = document.getElementById('bubble-grid');
const restartButton = document.getElementById('restart-button');
const scoreText = document.getElementById('score');

let bubbles = [];
let score = 0;
let activeBubble = null;

function createBubble(color) {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble', color);
    bubble.addEventListener('click', () => shootBubble(bubble));
    return bubble;
}

function generateGrid() {
    grid.innerHTML = '';
    bubbles = [];
    for (let row = 0; row < rows; row++) {
        const rowBubbles = [];
        for (let col = 0; col < cols; col++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const bubble = createBubble(color);
            rowBubbles.push(bubble);
            grid.appendChild(bubble);
        }
        bubbles.push(rowBubbles);
    }
}

function shootBubble(bubble) {
    if (activeBubble) {
        const color = activeBubble.classList[1]; // Get the color of the active bubble
        bubble.style.backgroundColor = color;
        bubble.classList.remove('red', 'green', 'blue', 'yellow', 'purple', 'orange', 'cyan');
        bubble.classList.add(color);
        checkMatch();
        activeBubble = null;
    } else {
        activeBubble = bubble;
    }
}

function checkMatch() {
    // Simple match logic: 3 or more consecutive bubbles of the same color in a row
    let matched = false;
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 2; col++) {
            const color = bubbles[row][col].style.backgroundColor;
            if (color === bubbles[row][col + 1].style.backgroundColor && color === bubbles[row][col + 2].style.backgroundColor) {
                matched = true;
                break;
            }
        }
    }
    if (matched) {
        score += 10; // Increase score
        updateScore();
        alert('Match found! Removing bubbles...');
        generateGrid(); // Regenerate grid after match
    }
}

function updateScore() {
    scoreText.textContent = `Score: ${score}`;
}

restartButton.addEventListener('click', () => {
    score = 0; // Reset score
    updateScore();
    generateGrid();
});

generateGrid(); // Start the game when the page loads
