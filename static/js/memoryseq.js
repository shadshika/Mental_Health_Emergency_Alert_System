let score = 0;
let timeLeft = 60;
let gameInterval;
let bubbleInterval;
let gameStarted = false;
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");

// Start the game
function startGame() {
  if (gameStarted) return;  // Prevent starting the game again

  gameStarted = true;
  score = 0;
  timeLeft = 60;
  scoreDisplay.textContent = `Score: ${score}`;
  timerDisplay.textContent = `Time Remaining: ${timeLeft}`;
  gameArea.innerHTML = '';
  startBtn.classList.add('hidden');

  // Start the timer
  gameInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = `Time Remaining: ${timeLeft}`;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  // Start generating bubbles
  bubbleInterval = setInterval(generateBubble, 1000);
}

// Generate a bubble in a random position
function generateBubble() {
  const bubble = document.createElement("div");
  const randomPosition = Math.floor(Math.random() * 4); // 4 columns of bubbles
  const randomColor = getRandomColor();
  
  bubble.classList.add("bubble");
  bubble.style.backgroundColor = randomColor;
  bubble.setAttribute("data-color", randomColor);
  
  // Set random position of the bubble in the game area
  bubble.style.position = "absolute";
  bubble.style.left = `${randomPosition * 100 + 10}px`; // Position horizontally
  bubble.style.top = `${Math.random() * 400 + 50}px`; // Position vertically
  
  bubble.addEventListener("click", popBubble);

  gameArea.appendChild(bubble);
}

// Pop the bubble when clicked
function popBubble(event) {
  const clickedBubble = event.target;
  if (clickedBubble.classList.contains("bubble")) {
    clickedBubble.remove();
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
  }
}

// Get a random color for the bubble
function getRandomColor() {
  const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  clearInterval(bubbleInterval);
  gameStarted = false;
  alert(`Game Over! Your final score is: ${score}`);
  
  // Send score to Flask backend
  fetch('/submit_score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ score: score })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data.message);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  startBtn.classList.remove('hidden');
}
