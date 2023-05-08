/**
 * AI player for Tic Tac Toe.
 * 
 * Uses mini-max with alpha-beta pruning to decide on the next best move given a game state.
 * 
 * A move should be returned within a 1 seconds time constraint.
 * Else, AI will return a random move.
 */

function minimax(gameState, depth, alpha, beta, currentPlayer) {
    let possibleMoves = getPossibleMoves(gameState);
}

function getPossibleMoves(gameState) {
    let possibleMoves = []
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] == "") {
            possibleMoves.push(i);
        }
    }
    return possibleMoves;
}
