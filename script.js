// Grab HTML elements
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');

// Game variables
let score = 0;
let timeLeft = 60;
let gameInterval;
let targetTimeout;
let isPlaying = false;

// Function to start the game
function startGame() {
    if (isPlaying) return;
    
    isPlaying = true;
    score = 0;
    timeLeft = 60;
    scoreDisplay.innerText = score;
    timeDisplay.innerText = timeLeft;
    gameArea.innerHTML = ''; // Clear previous targets
    
    // Start the countdown timer
    gameInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
    
    spawnTarget();
}

// Function to spawn a new target
function spawnTarget() {
    if (!isPlaying) return;

    // Create a new div element for the target
    const target = document.createElement('div');
    target.classList.add('target');
    
    // Calculate random position within the game area
    const maxX = gameArea.clientWidth - 40; // 40 is target width
    const maxY = gameArea.clientHeight - 40;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    target.style.left = `${randomX}px`;
    target.style.top = `${randomY}px`;
    
    // Add click event to the target
    target.addEventListener('mousedown', () => {
        score++;
        scoreDisplay.innerText = score;
        target.remove();
        clearTimeout(targetTimeout); // Cancel the despawn timer
        spawnTarget(); // Immediately spawn a new one
    });
    
    gameArea.appendChild(target);
    
    // Target disappears if not clicked fast enough (e.g., 1.5 seconds)
    targetTimeout = setTimeout(() => {
        target.remove();
        spawnTarget();
    }, 1000); 
}

// Function to end the game
function endGame() {
    isPlaying = false;
    clearInterval(gameInterval);
    clearTimeout(targetTimeout);
    gameArea.innerHTML = ''; // Clear the board
    alert(`Drill Complete! Your final score: ${score}`);
}

// Attach start function to button
startBtn.addEventListener('click', startGame);