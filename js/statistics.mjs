// Save the game progress to localStorage
function saveGameProgress(attempt, gameWon, currentWord) {
    const gameState = {
        attempt: attempt,
        gameWon: gameWon,
        currentWord: currentWord,
    };

    // Save the gameState object to localStorage
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Load the game state from localStorage
function loadGameProgress() {
    const savedState = localStorage.getItem('gameState');
    
    if (savedState) {
        const gameState = JSON.parse(savedState);
        // Now you can use the saved state (attempt, gameWon, currentWord) to resume the game
        return gameState;
    } else {
        // No saved game state, start a new game
        return {
            attempt: 1,
            gameWon: false,
            currentWord: '',  // You might want to generate a new word here
        };
    }
}

// Clear the saved game state after the game is over
function clearGameState() {
    localStorage.removeItem('gameState');
}
