// Initialize game variables
let selectedColor = 'black';
let isGameComplete = false;
let currentScore = 0;  // To track the score

// Predefined design pattern (16x16 grid)
const predefinedDesign = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

// Initialize canvas
const pixelCanvas = document.getElementById('pixelCanvas');

// Create grid of pixels (16x16)
for (let i = 0; i < 256; i++) {
  let pixel = document.createElement('div');
  pixel.setAttribute('data-index', i);
  pixelCanvas.appendChild(pixel);
}

// Select color for drawing
function selectColor(color) {
  selectedColor = color;
}

// Clear canvas
function clearCanvas() {
  const pixels = pixelCanvas.querySelectorAll('div');
  pixels.forEach(pixel => {
    pixel.style.backgroundColor = 'white';
  });
  document.getElementById('scoreMessage').innerHTML = '';
  document.getElementById('currentScore').innerHTML = '';
  isGameComplete = false;
  currentScore = 0;
  updateScore();
}

// Check if the game is complete
function checkCompletion() {
  const pixels = pixelCanvas.querySelectorAll('div');
  let matchedPixels = 0;

  pixels.forEach((pixel, index) => {
    const x = index % 16;
    const y = Math.floor(index / 16);
    if (pixel.style.backgroundColor === getColor(predefinedDesign[y][x])) {
      matchedPixels++;
    }
  });

  if (matchedPixels === 256) {
    showScore();
  } else {
    updateScore();
  }
}

// Get the color corresponding to a value (0 = white, 1 = color)
function getColor(value) {
  switch(value) {
    case 1:
      return selectedColor;
    default:
      return 'white';
  }
}

// On clicking a pixel, apply the selected color
pixelCanvas.addEventListener('click', function(event) {
  if (isGameComplete) return;  // Prevent drawing after completion

  const pixel = event.target;
  pixel.style.backgroundColor = selectedColor;
  checkCompletion();
});

// Show score when game is complete
function showScore() {
  isGameComplete = true;
  document.getElementById('scoreMessage').innerHTML = 'Congratulations! You completed the design!';
  document.getElementById('currentScore').innerHTML = `Your score is: ${currentScore}`;
}

// Update score
function updateScore() {
  currentScore++;
  document.getElementById('currentScore').innerHTML = `Current Score: ${currentScore}`;
}

// Reset the game
function resetGame() {
  clearCanvas();
  isGameComplete = false;
  document.getElementById('scoreMessage').innerHTML = '';
  document.getElementById('currentScore').innerHTML = '';
}
