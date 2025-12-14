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
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').textContent = 'Pause';
    
    if (gameLoop) clearInterval(gameLoop);
    gameLoop = setInterval(update, 100);
}

function togglePause() {
    if (!gameRunning) return;
    
    gamePaused = !gamePaused;
    document.getElementById('pauseBtn').textContent = gamePaused ? 'Resume' : 'Pause';
    
    if (gamePaused) {
        clearInterval(gameLoop);
        document.getElementById('gameStatus').textContent = '⏸ PAUSED';
    } else {
        document.getElementById('gameStatus').textContent = '';
        gameLoop = setInterval(update, 100);
    }
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
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= tileCount; i++) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
    
    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.fillStyle = '#00FF00';
        } else {
            ctx.fillStyle = '#00CC00';
        }
        ctx.fillRect(segment.x * gridSize + 1, segment.y * gridSize + 1, gridSize - 2, gridSize - 2);
    });
    
    // Draw food
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(food.x * gridSize + 1, food.y * gridSize + 1, gridSize - 2, gridSize - 2);
}

function endGame() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        document.getElementById('highScore').textContent = highScore;
        document.getElementById('gameStatus').textContent = `🎉 GAME OVER! New High Score: ${score}`;
    } else {
        document.getElementById('gameStatus').textContent = `💀 GAME OVER! Score: ${score}`;
    }
    
    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
}

// Initial draw
draw();



