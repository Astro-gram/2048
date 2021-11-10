import { actionController } from "./actions/actionController.js";

function setupGrid(tiles) {
    let grid = [];

    for (let x = 0; x < tiles; x++) {
        let column = [];

        for (let y = 0; y < tiles; y++) {
            column.push(0);
        }

        grid.push(column);
    }

    return grid;
}

function addNewTile(grid, tiles) {
    let spots = [];

    for (let x = 0; x < tiles; x++) {
        for (let y = 0; y < tiles; y++) {
            if (grid[x][y] === 0) {
                let cord = [x, y];
                spots.push(cord);
            }
        }
    }

    let spot = spots[Math.floor((Math.random() * spots.length) + 0)];

    if (spot !== undefined) {
        grid[spot[0]][spot[1]] = 2;
    }
}

function checkLoss(grid, tiles) {
    if (boardFull(grid, tiles)) {
        if (actionController("all", grid, tiles) === 0) {
            console.log("you lost!");
        }
    }
}

function boardFull(grid, tiles) {
    for (let x = 0; x < tiles; x++) {
        for (let y = 0; y < tiles; y++) {
            if (grid[x][y] === 0) {
                return false;
            }
        }
    }

    return true;
}

export {setupGrid, addNewTile, checkLoss};