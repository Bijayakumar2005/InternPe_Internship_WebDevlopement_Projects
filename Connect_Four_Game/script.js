document.addEventListener('DOMContentLoaded', () => {
    // Game constants
    const ROWS = 6;
    const COLS = 7;
    const PLAYER_1 = 1;
    const PLAYER_2 = 2;
    
    // Game state
    let board = [];
    let currentPlayer = PLAYER_1;
    let gameOver = false;
    let scores = { player1: 0, player2: 0 };
    let hoverTokens = Array(COLS).fill(null); // Track hover tokens for each column
    
    // DOM elements
    const gameBoard = document.getElementById('gameBoard');
    const gameStatus = document.getElementById('gameStatus');
    const playerIndicator = document.querySelector('.player-token');
    const player1Score = document.querySelector('.player-1-score .score-value');
    const player2Score = document.querySelector('.player-2-score .score-value');
    const restartBtn = document.getElementById('restartBtn');
    const winModal = document.getElementById('winModal');
    const winMessage = document.getElementById('winMessage');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const winTokens = document.querySelectorAll('.win-token');
    
    // Initialize the game
    function initGame() {
        // Create empty board
        board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
        
        // Clear the game board UI
        gameBoard.innerHTML = '';
        
        // Create cells
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener('click', () => handleCellClick(col));
                
                // Add column hover events to the top row only
                if (row === 0) {
                    cell.addEventListener('mouseenter', () => handleColumnHover(col));
                    cell.addEventListener('mouseleave', () => handleColumnHoverLeave(col));
                }
                
                gameBoard.appendChild(cell);
            }
        }
        
        // Reset game state
        currentPlayer = PLAYER_1;
        gameOver = false;
        hoverTokens = Array(COLS).fill(null);
        updateGameStatus();
    }
    
    // Handle column hover
    function handleColumnHover(col) {
        if (gameOver) return;
        
        // Remove any existing hover token for this column
        if (hoverTokens[col]) {
            hoverTokens[col].remove();
            hoverTokens[col] = null;
        }
        
        // Find the lowest empty row in the column
        const row = getLowestEmptyRow(col);
        if (row === -1) return; // Column is full
        
        // Create hover token
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        const hoverToken = document.createElement('div');
        hoverToken.classList.add('token', `player-${currentPlayer}`, 'hover-token');
        hoverToken.style.opacity = '0.6';
        hoverToken.style.transform = 'translateY(0)';
        cell.appendChild(hoverToken);
        
        // Store reference to hover token
        hoverTokens[col] = hoverToken;
    }
    
    // Handle column hover leave
    function handleColumnHoverLeave(col) {
        if (hoverTokens[col]) {
            hoverTokens[col].remove();
            hoverTokens[col] = null;
        }
    }
    
    // Handle cell click
    function handleCellClick(col) {
        if (gameOver) return;
        
        // Remove hover token for this column
        if (hoverTokens[col]) {
            hoverTokens[col].remove();
            hoverTokens[col] = null;
        }
        
        // Find the lowest empty row in the column
        const row = getLowestEmptyRow(col);
        if (row === -1) return; // Column is full
        
        // Update board state
        board[row][col] = currentPlayer;
        
        // Create and animate the token
        const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        const token = document.createElement('div');
        token.classList.add('token', `player-${currentPlayer}`);
        cell.appendChild(token);
        
        // Trigger the drop animation
        setTimeout(() => {
            token.classList.add('placed');
            
            // Check for win or draw
            if (checkWin(row, col)) {
                handleWin();
            } else if (checkDraw()) {
                handleDraw();
            } else {
                // Switch player
                currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
                updateGameStatus();
                
                // Update hover tokens for the new player
                updateAllHoverTokens();
            }
        }, 10);
    }
    
    // Update all hover tokens when player changes
    function updateAllHoverTokens() {
        for (let col = 0; col < COLS; col++) {
            if (hoverTokens[col]) {
                hoverTokens[col].classList.remove(`player-${currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1}`);
                hoverTokens[col].classList.add(`player-${currentPlayer}`);
            }
        }
    }
    
    // Get the lowest empty row in a column
    function getLowestEmptyRow(col) {
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[row][col] === 0) {
                return row;
            }
        }
        return -1; // Column is full
    }
    
    // Check for a win
    function checkWin(row, col) {
        const directions = [
            [0, 1],   // Horizontal
            [1, 0],   // Vertical
            [1, 1],   // Diagonal down-right
            [1, -1]   // Diagonal down-left
        ];
        
        const player = board[row][col];
        
        for (const [dx, dy] of directions) {
            let count = 1;
            
            // Check in positive direction
            count += countInDirection(row, col, dx, dy, player);
            
            // Check in negative direction
            count += countInDirection(row, col, -dx, -dy, player);
            
            if (count >= 4) {
                highlightWinningCells(row, col, dx, dy, player);
                highlightWinningCells(row, col, -dx, -dy, player);
                return true;
            }
        }
        
        return false;
    }
    
    // Count consecutive tokens in a direction
    function countInDirection(row, col, dx, dy, player) {
        let count = 0;
        let r = row + dx;
        let c = col + dy;
        
        while (
            r >= 0 && r < ROWS &&
            c >= 0 && c < COLS &&
            board[r][c] === player
        ) {
            count++;
            r += dx;
            c += dy;
        }
        
        return count;
    }
    
    // Highlight winning cells
    function highlightWinningCells(row, col, dx, dy, player) {
        let r = row;
        let c = col;
        
        while (
            r >= 0 && r < ROWS &&
            c >= 0 && c < COLS &&
            board[r][c] === player
        ) {
            const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);
            const token = cell.querySelector('.token');
            if (token) {
                token.classList.add('win');
            }
            r += dx;
            c += dy;
        }
    }
    
    // Check for a draw
    function checkDraw() {
        return board.every(row => row.every(cell => cell !== 0));
    }
    
    // Handle win
    function handleWin() {
        gameOver = true;
        
        // Update scores
        if (currentPlayer === PLAYER_1) {
            scores.player1++;
            player1Score.textContent = scores.player1;
        } else {
            scores.player2++;
            player2Score.textContent = scores.player2;
        }
        
        // Show win modal
        winMessage.textContent = `Player ${currentPlayer} Wins!`;
        winTokens.forEach(token => {
            token.className = 'win-token';
            token.classList.add(`player-${currentPlayer}`);
            token.style.display = 'block';
        });
        
        setTimeout(() => {
            winModal.classList.add('active');
        }, 1000);
    }
    
    // Handle draw
    function handleDraw() {
        gameOver = true;
        winMessage.textContent = "It's a Draw!";
        winTokens.forEach(token => {
            token.style.display = 'none';
        });
        
        setTimeout(() => {
            winModal.classList.add('active');
        }, 1000);
    }
    
    // Update game status display
    function updateGameStatus() {
        gameStatus.textContent = `Player ${currentPlayer}'s Turn`;
        playerIndicator.className = 'player-token';
        playerIndicator.classList.add(`player-${currentPlayer}`);
    }
    
    // Restart game
    function restartGame() {
        // Remove all hover tokens
        hoverTokens.forEach(token => {
            if (token) token.remove();
        });
        hoverTokens = Array(COLS).fill(null);
        
        winModal.classList.remove('active');
        initGame();
    }
    
    // Event listeners
    restartBtn.addEventListener('click', restartGame);
    playAgainBtn.addEventListener('click', restartGame);
    
    // Initialize the game
    initGame();
});