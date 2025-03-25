// script.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Variables
let score = 0;
let level = 1;
let timeRemaining = 30; // Seconds
let gameOver = false;

// Player spaceship
const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 40,
    height: 40,
    speed: 5,
    color: 'lime',
    dx: 0
};

// Bullet
const bullet = {
    width: 5,
    height: 10,
    color: 'red',
    speed: 4,
    active: false,
    x: player.x,
    y: player.y
};

// Enemy
let enemies = [];
const enemyWidth = 40;
const enemyHeight = 40;
let enemySpeed = 2;
const enemySpawnInterval = 1000; // Milliseconds to spawn new enemies
let enemiesHit = 0; // To track how many enemies the player has hit

// Draw Player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw Bullet
function drawBullet() {
    if (bullet.active) {
        ctx.fillStyle = bullet.color;
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    }
}

// Draw Enemies
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemy.x, enemy.y, enemyWidth, enemyHeight);
    });
}

// Draw Score and Timer
function drawScoreAndTime() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
    ctx.fillText('Time: ' + timeRemaining, canvas.width - 100, 30);
    ctx.fillText('Level: ' + level, canvas.width - 100, 50);
}

// Draw Game Over Message
function drawGameOver() {
    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.fillText('GAME OVER', canvas.width / 2 - 100, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillText('Press R to Restart', canvas.width / 2 - 70, canvas.height / 2 + 40);
}

// Draw Next Level Message
function drawNextLevel() {
    ctx.fillStyle = 'white';
    ctx.font = '40px Arial';
    ctx.fillText('LEVEL ' + level + ' COMPLETE!', canvas.width / 2 - 150, canvas.height / 2);
    ctx.font = '20px Arial';
    ctx.fillText('Press Space to Start Next Level', canvas.width / 2 - 130, canvas.height / 2 + 40);
}

// Move player
function movePlayer() {
    player.x += player.dx;

    // Prevent player from moving outside the screen
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
}

// Shoot Bullet
function shootBullet() {
    if (!bullet.active) {
        bullet.active = true;
        bullet.x = player.x + player.width / 2 - bullet.width / 2;
        bullet.y = player.y;
    }
}

// Move Bullet
function moveBullet() {
    if (bullet.active) {
        bullet.y -= bullet.speed;
        if (bullet.y < 0) {
            bullet.active = false;
        }
    }
}

// Move Enemies
function moveEnemies() {
    enemies.forEach(enemy => {
        enemy.y += enemySpeed;
    });

    // Remove enemies that have fallen off screen
    enemies = enemies.filter(enemy => enemy.y < canvas.height);
}

// Collision Detection
function checkCollision() {
    if (bullet.active) {
        enemies.forEach((enemy, index) => {
            if (bullet.x < enemy.x + enemyWidth && bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemyHeight && bullet.y + bullet.height > enemy.y) {
                // Collision Detected
                bullet.active = false;
                enemies.splice(index, 1); // Remove enemy from array
                score += 10; // Increase score
                enemiesHit++;

                // Check if the level is completed
                if (enemiesHit >= 10) {
                    level++;
                    enemiesHit = 0;
                    enemySpeed += 1; // Increase difficulty
                    spawnEnemiesForLevel(); // Spawn new enemies for the next level
                    drawNextLevel();
                    setTimeout(startNextLevel, 2000);
                }
            }
        });
    }
}

// Spawn Enemy
function spawnEnemy() {
    const enemyX = Math.random() * (canvas.width - enemyWidth);
    const enemyY = 0; // Start at the top
    enemies.push({ x: enemyX, y: enemyY });
}

// Spawn Enemies for New Level
function spawnEnemiesForLevel() {
    for (let i = 0; i < level * 5; i++) { // Increase the number of enemies based on the level
        spawnEnemy();
    }
}

// Game Loop
function gameLoop() {
    if (gameOver) {
        drawGameOver();
        return;
    }

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw All Elements
    drawPlayer();
    drawBullet();
    drawEnemies();
    drawScoreAndTime();

    // Move Elements
    movePlayer();
    moveBullet();
    moveEnemies();
    checkCollision();

    // Countdown Timer
    if (timeRemaining > 0) {
        timeRemaining -= 0.02; // Decrease timer by a fraction for smoother countdown
    } else {
        gameOver = true;
    }

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Start Next Level
function startNextLevel() {
    level++;
    timeRemaining = 30; // Reset time for the next level
    gameOver = false; // Reset gameOver flag
    enemies = []; // Clear existing enemies
    spawnEnemiesForLevel();
    gameLoop();
}

// Keyboard Input
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a') {
        player.dx = -player.speed;
    }
    if (e.key === 'ArrowRight' || e.key === 'd') {
        player.dx = player.speed;
    }
    if (e.key === ' ' || e.key === 'Enter') {
        shootBullet();
    }
    if (e.key === 'r' && gameOver) {
        resetGame();
    }
});

// Reset Game
function resetGame() {
    score = 0;
    level = 1;
    timeRemaining = 30;
    enemies = [];
    enemiesHit = 0;
    enemySpeed = 2;
    gameOver = false;
    spawnEnemiesForLevel();
    gameLoop();
}

// Initialize Game
setInterval(spawnEnemy, enemySpawnInterval); // Spawn enemies at regular intervals
spawnEnemiesForLevel();
gameLoop();
