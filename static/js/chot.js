let score = 0;
let gameInterval;
let balloonInterval;
let bullets = [];
let shooting = false;

const scoreElement = document.getElementById('score');
const gameArea = document.getElementById('gameArea');
const startBtn = document.getElementById('startBtn');
const message = document.getElementById('message');
const shootBtn = document.getElementById('shootBtn');

function startGame() {
  score = 0;
  scoreElement.textContent = score;
  startBtn.style.display = 'none';
  message.textContent = "Shoot the balloons!";
  gameArea.innerHTML = '';  // Clear previous game
  
  // Generate balloons every 2 seconds
  balloonInterval = setInterval(createBalloon, 2000);

  // End game after 30 seconds
  gameInterval = setTimeout(endGame, 30000);
}

// Handle shooting logic when user clicks the shoot button
shootBtn.addEventListener('click', () => {
  if (!shooting) {
    shootBullet();
  }
});

function createBalloon() {
  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = Math.random() * 90 + '%'; // Random horizontal position
  
  // When the balloon is clicked, shoot it
  balloon.addEventListener('click', () => shootBalloon(balloon));

  gameArea.appendChild(balloon);
}

function shootBalloon(balloon) {
  score++;
  scoreElement.textContent = score;
  gameArea.removeChild(balloon);  // Remove the balloon from the game area
}

function shootBullet() {
  // Create bullet at the center of the game area
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');
  bullet.style.left = gameArea.offsetWidth / 2 - 7 + 'px';  // Center bullet horizontally
  bullet.style.top = gameArea.offsetHeight - 30 + 'px'; // Place at the bottom center
  gameArea.appendChild(bullet);

  // Animate the bullet and check for hit
  bullet.classList.add('active');

  let bulletInterval = setInterval(() => {
    // Check for collision with balloons
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
      const bulletRect = bullet.getBoundingClientRect();
      const balloonRect = balloon.getBoundingClientRect();

      if (isCollision(bulletRect, balloonRect)) {
        shootBalloon(balloon);  // Hit balloon
        gameArea.removeChild(bullet);
        clearInterval(bulletInterval);
      }
    });

    // Bullet reached the top, remove it
    if (bullet.getBoundingClientRect().top < 0) {
      gameArea.removeChild(bullet);
      clearInterval(bulletInterval);
    }
  }, 10);
}

function isCollision(bulletRect, balloonRect) {
  return !(bulletRect.right < balloonRect.left || 
           bulletRect.left > balloonRect.right || 
           bulletRect.bottom < balloonRect.top || 
           bulletRect.top > balloonRect.bottom);
}

function endGame() {
  clearInterval(balloonInterval);
  message.textContent = `Game Over! Your final score is: ${score}`;
  startBtn.style.display = 'inline-block';  // Show start button again
}
