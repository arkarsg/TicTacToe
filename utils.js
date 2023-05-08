/**
 * Common util functions
 */

/**
 * Checks if the game is won by a player given a board state
 * @param gameState 1D array representation of the board
 * @param currentPlayer Player to make the move
 */
export function winCheck(gameState, currentPlayer) {
    let roundWon = false;

    // row check
    for (let i = 0; i < 3; i++) {
        if (gameState[i * 3] === currentPlayer &&
            gameState[i * 3 + 1] === currentPlayer &&
            gameState[i * 3 + 2] === currentPlayer) {
                roundWon = true;
            }
    }

    // col check
    for (let i = 0; i < 3; i++) {
        if (gameState[i] === currentPlayer &&
            gameState[i + 3] === currentPlayer &&
            gameState[i + 6] === currentPlayer) {
                roundWon = true;
            }
    }

    // diag check
    if (gameState[0] === currentPlayer &&
        gameState[4] === currentPlayer &&
        gameState[8] === currentPlayer) {
            roundWon = true;
        }

    if (gameState[2] === currentPlayer &&
        gameState[4] === currentPlayer &&
        gameState[6] === currentPlayer) {
            roundWon = true;
        }

    return roundWon;
}

/**
 * Checks if the game is drawn based on the given game state.
 * @param gameState 1D array representation of the board
 */
export function drawCheck(gameState) {
    return (!gameState.includes(""));
}