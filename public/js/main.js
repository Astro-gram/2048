let board = document.querySelector(".main__board");
let ctx = board.getContext("2d");

import { printBoard } from "./printBoard.js";
import { setupGrid, updateGrid } from "./grid.js";

let boardSize = {
    x: 750,
    y: 750
}

let tiles = 4;
let offset = 25;
let spacing = 10;

let grid = setupGrid(tiles);

grid["00"] = 2;
grid["01"] = 2;

window.addEventListener("keyup", (e) => {
    updateGrid(grid, e, tiles);
})

function update() {
    printBoard(ctx, tiles, boardSize, offset, spacing, grid);

    setTimeout(function() {update()}, 50);
}

function setup() {
    update();
}

setup();