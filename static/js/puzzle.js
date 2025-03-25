const emojis = ["😀", "😢", "😎", "🤔", "🤣", "😜", "🥰", "😤"];
let shuffledEmojis = [];
let flippedCards = [];
let matchedPairs = 0;
let timer = 0;
let timerInterval;

const emojiGrid = document.getElementById("emojiGrid");
const timerDisplay = document.getElementById("timer");
const resultMessage = document.getElementById("resultMessage");
const bubbleContainer = document.getElementById("bubbleContainer");

let bubblesCreated = false; // Track if bubbles should appear

// Function to generate bubbles
function createBubbles() {
  if (!bubblesCreated) return;  // Prevent bubbles from appearing before the game is completed

  const bubbleCount = 30;  // Number of bubbles to appear
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.top = `${Math.random() * 100}%`;
    bubbleContainer.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2000); // Remove bubble after animation
  }
}

// Start Game
function startGame() {
  $('#instructionModal').modal('hide');
  shuffledEmojis = shuffle([...emojis, ...emojis]);
  createEmojiGrid();
  matchedPairs = 0;
  timer = 0;
  timerDisplay.textContent = timer;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timer++;
    timerDisplay.textContent = timer;
  }, 1000);

  document.getElementById("gameContainer").style.display = "block";
  bubblesCreated = false; // Reset the bubble creation on new game start
  bubbleContainer.innerHTML = ""; // Clear any remaining bubbles from previous game
}

// Create Emoji Grid
function createEmojiGrid() {
  emojiGrid.innerHTML = "";
  shuffledEmojis.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("emoji-card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.addEventListener("click", flipCard);
    emojiGrid.appendChild(card);
  });
}

// Flip Card
function flipCard() {
  if (flippedCards.length === 2 || this.classList.contains("flipped")) return;

  this.textContent = this.dataset.emoji;
  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Check Match
function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.emoji === card2.dataset.emoji) {
    matchedPairs++;
    flippedCards = [];
    if (matchedPairs === emojis.length) {
      endGame();
    }
  } else {
    setTimeout(() => {
      card1.textContent = "";
      card2.textContent = "";
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// End Game and Show Result
function endGame() {
  clearInterval(timerInterval);
  let levelMessage = "";
  if (timer <= 60) {
    levelMessage = "Gold Level - Congratulations!";
  } else if (timer <= 120) {
    levelMessage = "Silver Level - Great Job!";
  } else if (timer <= 180) {
    levelMessage = "Bronze Level - Well Done!";
  } else {
    levelMessage = "Fail - Try Again!";
  }
  resultMessage.textContent = `${levelMessage} Time: ${timer} seconds`;
  $('#resultModal').modal('show');

  // Allow bubbles to appear after the game is over
  bubblesCreated = true;
  setTimeout(createBubbles, 500); // Call the bubble creation function once after completion
}

// Restart Game
function restartGame() {
  // Reset game state and hide result modal
  document.getElementById("gameContainer").style.display = "none";
  $('#resultModal').modal('hide'); // Hide result modal
  startGame(); // Start a new game
}

// Shuffle Array
function shuffle(array) {
  let shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

// Start Game on Button Click
document.getElementById("puzzleButton").addEventListener("click", () => {
  $('#instructionModal').modal('show');
});

// "Play Again" button click
document.getElementById("playAgainButton").addEventListener("click", () => {
  restartGame();
});
