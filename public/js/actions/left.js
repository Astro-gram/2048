import { addNewTile, checkLoss } from "../grid.js";

function leftAction(grid, tiles) {
    let score = 0;
    let addTile = false;
    let tileStateChangePoses = [];

    for (let y = tiles - 1; y >= 0; y--) {
        for (let x = tiles - 1; x >= 0; x--) {
            let currentTile = grid[x][y];

            for (let i = x; i > 0; i--) {
                let xPos = (i - 1);
                let otherTile = grid[xPos][y];

                if (currentTile === otherTile && otherTile !== 0) {
                    grid[x][y] = 0;
                    grid[xPos][y] = 0;
                    grid[xPos - furthestPush(grid, xPos, y)][y] = currentTile * 2;
                    tileStateChangePoses.push([xPos - furthestPush(grid, xPos, y), y]);
                    score += currentTile * 2;
                    addTile = true;
                    x -= 1;
                    break;
                }
                else if (otherTile !== 0) {
                    break;
                }
            }
        }

        //Check if you can push again

        for (let checkX = tiles - 1; checkX > 0; checkX--) {
            if (grid[checkX][y] !== 0) {
                let pushAmount = furthestPush(grid, checkX, y);

                if (pushAmount > 0) {
                    let currentTileCheckValue = grid[checkX][y];

                    grid[checkX][y] = 0;
                    grid[checkX - pushAmount][y] = currentTileCheckValue;
                    addTile = true;
                    checkX = tiles;

                    if (tileStateChangePoses.length - 1 >= checkX) {
                        tileStateChangePoses[checkX][0] = checkX - pushAmount;
                    }
                }
            }
        }
    }

    if (addTile) {
        addNewTile(grid, tiles);
        checkLoss(grid, tiles);
    }

    return [score, tileStateChangePoses];
}

function furthestPush(grid, otherTileX, otherTileY) {
    let pushCount = 0;

    for (let i = otherTileX; i > 0; i--) {
        if (grid[i - 1][otherTileY] === 0) {
            pushCount++;
        }
        else {
            break;
        }
    }

    return pushCount;
}

export {leftAction};