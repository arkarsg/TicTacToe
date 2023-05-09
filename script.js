import { winCheck, drawCheck } from './utils.js';
import { getBestMove } from './ai.js';

const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", ""];

let hasAI = false;
const humanPlayer = "X";
const botPlayer = "O";
const opponentDisplay = document.querySelector('.opponent--status');
const botMessage = () => "Playing against bot";
const playerMessage = () => "Playing against another player";

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => "Game ended in a draw!";
const currentPlayerTurn = () => `It is ${currentPlayer}'s turn.`;

statusDisplay.innerHTML = currentPlayerTurn();
opponentDisplay.innerHTML = playerMessage();

/**
 * Updates the game state based on the clicked cell, then updates the UI
 * @param clickedCell HTML element of cell that is clicked
 * @param clickedCellIndex Integer index of the cell that is clicked
 */
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;

    clickedCell.innerHTML = currentPlayer;
}

/**
 * Changes the player turn and updates the status of the game.
 */
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

/**
 * Checks if the game state is a win state or a draw state.
 */
function handleResultValidation() {
    let roundWon = winCheck(gameState, currentPlayer);

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = drawCheck(gameState);

    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

/** 
 * Checks if the cell has already been clicked and continues if otherwise
 * @param clickedCellEvent cell that is clicked by the player
 */
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();

    if (hasAI && currentPlayer === botPlayer && gameActive) {
        const botMove = getBestMove(gameState);
        const cell = document.querySelector(`[data-cell-index="${botMove}"]`);
        handleCellPlayed(cell, botMove);
        handleResultValidation();
    }
}

/**
 * Resets the game to default and clear all cells.
 */
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

function removeAI() {
    hasAI = false;
    opponentDisplay.innerHTML = playerMessage();
}

function initialiseAI() {
    if (hasAI) {
        removeAI();
        return;
    }
    hasAI = true;
    opponentDisplay.innerHTML = botMessage();
}

document.querySelectorAll('.cell').forEach(cell =>
    cell.addEventListener('click', handleCellClick));

document.querySelector('.game--restart').addEventListener('click',
    handleRestartGame);

document.querySelector('.game--bot').addEventListener('click',
    initialiseAI);