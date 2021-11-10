let board = document.querySelector(".main__board");
let scoreText = document.querySelector(".header__score");
let bestScoreText = document.querySelector(".header__best-score");
let resetBtn = document.querySelector(".header__reset");
let ctx = board.getContext("2d");

import { printBoard } from "./printBoard.js";
import { setupGrid, addNewTile } from "./grid.js";

import { setupStates, updateStates } from "./tileStates.js";

//Actions for when person clicks the movement keys
import { actionController } from "./actions/actionController.js";

let boardSize = {
    x: 750,
    y: 750
}

let tiles = 4;
let offset = 25;
let spacing = 10;

let currentScore = 0;

let grid = setupGrid(tiles);
let tileStates = setupStates(tiles);

let bestScore = localStorage.getItem("best-score") || 0;

bestScoreText.innerHTML = `Best Score: ${bestScore}`;

resetBtn.addEventListener(("click"), (e) => {
    e.preventDefault();

    grid = setupGrid(tiles);
    currentScore = 0;
    updateScoreBoard(currentScore);
    setup();
})

window.addEventListener("keyup", (e) => {
    if (e.key === "ArrowUp" || e.key === "w") {
        let scoreAndTileStates = actionController("up", grid, tiles);
        updateScoreBoard(scoreAndTileStates[0]);
        //updateStates(tileStates, scoreAndTileStates[1]);
    }
    else if (e.key === "ArrowDown" || e.key === "s") {
        let scoreAndTileStates = actionController("down", grid, tiles);
        updateScoreBoard(scoreAndTileStates[0]);
        //updateStates(tileStates, scoreAndTileStates[1]);
    }
    else if (e.key === "ArrowRight" || e.key === "d") {
        let scoreAndTileStates = actionController("right", grid, tiles);
        updateScoreBoard(scoreAndTileStates[0]);
        //updateStates(tileStates, scoreAndTileStates[1]);
    }
    else if (e.key === "ArrowLeft" || e.key === "a") {
        let scoreAndTileStates = actionController("left", grid, tiles);
        updateScoreBoard(scoreAndTileStates[0]);
        //updateStates(tileStates, scoreAndTileStates[1]);
    }
})

function update() {
    printBoard(ctx, tiles, boardSize, offset, spacing, grid, tileStates);

    setTimeout(function() {update()}, 50);
}

function setup() {
    grid[0][0] = 2;
    grid[0][1] = 2;
    grid[0][3] = 2;

    update();

    addNewTile(grid, tiles);
}

function updateScoreBoard(score) {
    let totalScore = (currentScore + score);

    scoreText.innerHTML = `Score: ${totalScore}`;

    if (totalScore > localStorage.getItem("best-score")) {
        localStorage.setItem("best-score", totalScore);
        bestScoreText.innerHTML = `Best Score: ${totalScore}`;
    }

    currentScore += score;
} 

setup();