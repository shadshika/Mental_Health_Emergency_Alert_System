const suits = ['♣', '♦', '♥', '♠']; // Card suits
const gameBoard = document.getElementById("gameBoard");
const messageDisplay = document.getElementById("message");
const startBtn = document.getElementById("startBtn");

let cards = [];
let flippedCards = [];
let matchedCards = 0;

// Sound effects
const flipSound = new Audio('sounds/flip.mp3');
const matchSound = new Audio('sounds/match.mp3');

// Function to initialize the game
function startGame() {
  startBtn.classList.add('hidden');
  messageDisplay.textContent = "Find the matching pairs!";
  cards = [];
  flippedCards = [];
  matchedCards = 0;

  // Create cards array with pairs
  let cardValues = [...suits, ...suits];
  shuffle(cardValues);

  // Generate cards on the board
  for (let i = 0; i < cardValues.length; i++) {
    const card = createCard(cardValues[i]);
    gameBoard.appendChild(card);
  }
}

// Shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to create each card element
function createCard(value) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.value = value;

  // Card back
  const back = document.createElement("div");
  back.classList.add("back");
  back.innerText = value;
  card.appendChild(back);

  // Card front (image of card)
  const front = document.createElement("img");
  front.classList.add("hidden");
  front.src = getCardImage(value);
  card.appendChild(front);

  // Add click event to flip the card
  card.addEventListener("click", () => flipCard(card));

  return card;
}

// Function to flip the card
function flipCard(card) {
  if (flippedCards.length < 2 && !card.classList.contains("flipped") && flippedCards.indexOf(card) === -1) {
    card.classList.add("flipped");
    flippedCards.push(card);

    // Play flip sound
    flipSound.play();

    // Check if two cards are flipped
    if (flippedCards.length === 2) {
      setTimeout(checkMatch, 1000);
    }
  }
}

// Function to check if two flipped cards match
function checkMatch() {
  const [card1, card2] = flippedCards;
  const value1 = card1.dataset.value;
  const value2 = card2.dataset.value;

  if (value1 === value2) {
    matchedCards++;
    messageDisplay.textContent = `Matched! Pairs found: ${matchedCards}`;
    matchSound.play(); // Play match sound

    // Add pop bubble animation
    popBubble(card1);
    popBubble(card2);

    if (matchedCards === suits.length) {
      messageDisplay.textContent = `Game Over! You matched all the cards!`;
      setTimeout(() => {
        startBtn.classList.remove('hidden');
        messageDisplay.textContent = "Click start to play again.";
      }, 1500);
    }
  } else {
    messageDisplay.textContent = "Try again!";
    card1.classList.remove("flipped");
    card2.classList.remove("flipped");
  }

  flippedCards = [];
}

// Function to create a pop bubble animation effect
function popBubble(card) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  card.appendChild(bubble);

  // Remove bubble after animation ends
  setTimeout(() => {
    bubble.remove();
  }, 1000);
}

function getCardImage(suit) {
  const suitMap = {
    '♣': 'club.png',
    '♦': 'diamond.png',
    '♥': 'heart.png',
    '♠': 'spade.png'
  };
  return `images/${suitMap[suit]}`; // Image link is formed here
}
