document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('start-game');
    const gameArea = document.getElementById('game-area');
    const player = document.getElementById('player');
    const instructions = document.getElementById('instructions');
    let playerPosition = { x: 50, y: 0 };
    let obstacles = [];
    let gameInterval;

    // Game settings
    const gameSpeed = 30; // Speed of obstacles
    const obstacleInterval = 2000; // Time between obstacles

    // Function to play sound feedback
    function playSound(sound) {
        const audio = new Audio(`sounds/${sound}.mp3`);
        audio.play();
    }

    // Game start function
    function startGame() {
        instructions.textContent = 'Use the arrow keys to move left, right, or jump. Avoid obstacles!';
        playerPosition = { x: 50, y: 0 }; // Reset player position
        player.style.left = `${playerPosition.x}%`;
        player.style.bottom = `${playerPosition.y}px`;

        // Create obstacles periodically
        gameInterval = setInterval(() => {
            createObstacle();
        }, obstacleInterval);

        // Announce the start of the game
        const startMessage = new SpeechSynthesisUtterance('The game has started. Use the arrow keys to move.');
        window.speechSynthesis.speak(startMessage);
    }

    // Function to create obstacles
    function createObstacle() {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left = `${Math.random() * 100}%`;
        gameArea.appendChild(obstacle);

        // Play sound cue for the appearance of a new obstacle
        playSound('obstacle-sound'); // Make sure you have this sound file

        // Remove obstacle after animation completes
        setTimeout(() => {
            gameArea.removeChild(obstacle);
        }, 3000);
    }

    // Function to move player
    function movePlayer(direction) {
        const playerSpeed = 5; // Player movement speed

        if (direction === 'left') {
            playerPosition.x -= playerSpeed;
            if (playerPosition.x < 0) playerPosition.x = 0;
        } else if (direction === 'right') {
            playerPosition.x += playerSpeed;
            if (playerPosition.x > 100) playerPosition.x = 100;
        } else if (direction === 'up') {
            playerPosition.y += 50; // Jump height
            setTimeout(() => {
                playerPosition.y -= 50; // Fall back down
                player.style.bottom = `${playerPosition.y}px`;
            }, 500);
        }

        player.style.left = `${playerPosition.x}%`;
        player.style.bottom = `${playerPosition.y}px`;

        // Announce player movement
        const moveMessage = new SpeechSynthesisUtterance(`Player moved ${direction}`);
        window.speechSynthesis.speak(moveMessage);
    }

    // Function to check for collisions
    function checkCollisions() {
        const obstacles = document.querySelectorAll('.obstacle');
        obstacles.forEach(obstacle => {
            const obstaclePosition = obstacle.getBoundingClientRect();
            const playerPosition = player.getBoundingClientRect();
            if (playerPosition.left < obstaclePosition.left + obstaclePosition.width &&
                playerPosition.left + playerPosition.width > obstaclePosition.left &&
                playerPosition.top < obstaclePosition.top + obstaclePosition.height &&
                playerPosition.top + playerPosition.height > obstaclePosition.top) {
                gameOver();
            }
        });
    }

    // Game over function
    function gameOver() {
        clearInterval(gameInterval);
        instructions.textContent = 'Game Over. Press Start to play again.';
        const gameOverMessage = new SpeechSynthesisUtterance('Game Over. You collided with an obstacle.');
        window.speechSynthesis.speak(gameOverMessage);
    }

    // Keyboard events for player movement
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            movePlayer('left');
        } else if (event.key === 'ArrowRight') {
            movePlayer('right');
        } else if (event.key === 'ArrowUp') {
            movePlayer('up');
        }
    });

    // Start the game when the "Start Game" button is clicked
    startGameButton.addEventListener('click', startGame);
    
    // Game loop for checking collisions
    setInterval(checkCollisions, 100);
});
