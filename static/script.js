const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];
let food = { x: 15, y: 15 };
let dx = 1;
let dy = 0;
let nextDx = 1;
let nextDy = 0;
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameRunning = false;
let gamePaused = false;
let gameLoop;

document.getElementById('highScore').textContent = highScore;

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (dy === 0) { nextDx = 0; nextDy = -1; }
            e.preventDefault();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (dy === 0) { nextDx = 0; nextDy = 1; }
            e.preventDefault();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (dx === 0) { nextDx = -1; nextDy = 0; }
            e.preventDefault();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (dx === 0) { nextDx = 1; nextDy = 0; }
            e.preventDefault();
            break;
    }
});

function startGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    dx = 1;
    dy = 0;
    nextDx = 1;
    nextDy = 0;
    score = 0;
    gameRunning = true;
    gamePaused = false;
    
    document.getElementById('score').textContent = score;
    document.getElementById('gameStatus').textContent = '';
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-flex';
    document.getElementById('pauseText').textContent = '⏸ Pause';
    
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, 100);
}

function togglePause() {
    if (!gameRunning) return;
    
    gamePaused = !gamePaused;
    const pauseBtn = document.getElementById('pauseBtn');
    const pauseText = document.getElementById('pauseText');
    pauseText.textContent = gamePaused ? '▶ Resume' : '⏸ Pause';
    
    if (gamePaused) {
        clearInterval(gameLoop);
        document.getElementById('gameStatus').textContent = '⏸ GAME PAUSED';
    } else {
        document.getElementById('gameStatus').textContent = '';
        gameLoop = setInterval(update, 100);
    }
}

function resetGame() {
    clearInterval(gameLoop);
    gameRunning = false;
    gamePaused = false;
    
    document.getElementById('score').textContent = '0';
    document.getElementById('gameStatus').textContent = '';
    document.getElementById('startBtn').style.display = 'inline-flex';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('pauseText').textContent = '⏸ Pause';
    
    score = 0;
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 1;
    dy = 0;
    nextDx = 1;
    nextDy = 0;
    
    draw();
}

function update() {
    dx = nextDx;
    dy = nextDy;
    
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    
    // Check wall collision
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        endGame();
        return;
    }
    
    // Check self collision
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        endGame();
        return;
    }
    
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }
    
    draw();
}

function draw() {
    // Clear canvas with light background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f5f5f5');
    gradient.addColorStop(1, '#fafafa');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw snake with green color
    snake.forEach((segment, index) => {
        const x = segment.x * gridSize;
        const y = segment.y * gridSize;
        const size = gridSize - 2;
        
        if (index === 0) {
            // Head - bright green
            ctx.fillStyle = '#10b981';
            ctx.shadowColor = 'rgba(16, 185, 129, 0.4)';
            ctx.shadowBlur = 6;
        } else {
            // Body - lighter green
            ctx.fillStyle = '#34d399';
            ctx.shadowColor = 'none';
            ctx.shadowBlur = 0;
        }
        
        // Draw rounded rectangles
        ctx.beginPath();
        ctx.roundRect(x + 1, y + 1, size, size, 3);
        ctx.fill();
    });
    
    // Draw snake head eye
    if (snake.length > 0) {
        const head = snake[0];
        const hx = head.x * gridSize + gridSize / 2;
        const hy = head.y * gridSize + gridSize / 2;
        
        // Calculate eye position based on direction
        let eyeOffsetX = 0, eyeOffsetY = 0;
        if (dx === 1) eyeOffsetX = 6;      // moving right
        else if (dx === -1) eyeOffsetX = -6; // moving left
        else if (dy === 1) eyeOffsetY = 6;   // moving down
        else if (dy === -1) eyeOffsetY = -6; // moving up
        
        // Draw eye
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(hx + eyeOffsetX, hy + eyeOffsetY, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Draw food as a circle with glow
    ctx.shadowColor = 'rgba(239, 68, 68, 0.6)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(food.x * gridSize + gridSize / 2, food.y * gridSize + gridSize / 2, gridSize / 2 - 1, 0, Math.PI * 2);
    ctx.fill();
    
    // Reset shadow
    ctx.shadowColor = 'none';
    ctx.shadowBlur = 0;
}

function endGame() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        document.getElementById('highScore').textContent = highScore;
        document.getElementById('gameStatus').textContent = `🎉 New High Score: ${score}!`;
    } else {
        document.getElementById('gameStatus').textContent = `Game Over! Final Score: ${score}`;
    }
    
    document.getElementById('startBtn').style.display = 'inline-flex';
    document.getElementById('pauseBtn').style.display = 'none';
}

// Initial draw
draw();

// Toggle instructions visibility
function toggleInstructions() {
    const instructions = document.getElementById('instructions');
    instructions.classList.toggle('hidden');
}



