import { winCheck } from "./utils.js";

/**
 * AI player for Tic Tac Toe.
 *
 * Uses mini-max with alpha-beta pruning to decide on the next best move given a game state.
 *
 * A move should be returned within a 1 seconds time constraint.
 * Else, AI will return a random move.
 *
 * AI is always the min player. 
 */

const Player = {
    "MAX": "X",
    "MIN": "O"
}

const MIN_VALUE = -50;
const MAX_VALUE = 50;
const TIE_VALUE = 0;

export function getBestMove(gameState) {
    return miniMax(gameState, 0, -10000, 10000, true).index;
}

function miniMax(gameState, depth, alpha, beta, isMin=true) {
    let possibleMoves = getPossibleMoves(gameState);

    if (winCheck(gameState, Player["MAX"])) {
        return { score: MIN_VALUE + depth };
    } else if (winCheck(gameState, Player["MIN"])) {
        return { score: MAX_VALUE - depth };
    } else if (possibleMoves.length === 0) {
        return { score: TIE_VALUE };
    }

    if (isMin) {
        let bestScore = Infinity;
        let bestMove = {};

        for (let i = 0; i < possibleMoves.length; i++) {
            gameState[possibleMoves[i]] = Player["MIN"];

            let value = miniMax(gameState, depth+1, alpha, beta, isMin=false);
            if (value.score < bestScore) {
                bestScore = value.score;
                bestMove.index = possibleMoves[i];
                bestMove.score = bestScore;
            }

            gameState[possibleMoves[i]] = "";

            beta = Math.min(beta, bestScore);
            if (beta <= alpha) {
                break;
            }
        }
        return bestMove;
    } else {
        let bestScore = -Infinity;
        let bestMove = {};

        for (let i = 0; i < possibleMoves.length; i++) {
            gameState[possibleMoves[i]] = Player["MAX"];

            let value = miniMax(gameState, depth+1, alpha, beta, isMin=true);

            if (value.score > bestScore) {
                bestScore = value.score;
                bestMove.index = possibleMoves[i];
                bestMove.score = bestScore;
            }

            gameState[possibleMoves[i]] = "";

            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) {
                break;
            }
        }
        return bestMove;
    }
}

function getPossibleMoves(gameState) {
    let possibleMoves = [];

    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] == "") {
            possibleMoves.push(i);
        }
    }
    return possibleMoves;
}
