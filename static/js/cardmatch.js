// script.js

const cards = [
    '🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍓', '🍓', 
    '🍉', '🍉', '🍍', '🍍', '🍊', '🍊', '🍋', '🍋'
];

let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(cardValue) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = cardValue;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.textContent === secondCard.textContent) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCards.push(firstCard, secondCard);
    }

    setTimeout(() => {
        flippedCards.forEach(card => card.classList.remove('flipped'));
        flippedCards = [];
    }, 1000);

    if (matchedCards.length === cards.length) {
        setTimeout(() => alert('You won!'), 500);
    }
}

function initGame() {
    shuffle(cards);
    const gameBoard = document.getElementById('game-board');
    cards.forEach(cardValue => {
        const card = createCard(cardValue);
        gameBoard.appendChild(card);
    });
}

initGame();
