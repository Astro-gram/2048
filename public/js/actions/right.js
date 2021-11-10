import { addNewTile, checkLoss } from "../grid.js";

function rightAction(grid, tiles) {
    let score = 0;
    let addTile = false;
    let tileStateChangePoses = [];

    for (let y = 0; y < tiles; y++) {
        for (let x = 0; x < tiles; x++) {
            let currentTile = grid[x][y];
            
            for (let i = 0; i < ((tiles - x) - 1); i++) {
                let xPos = (x + i + 1);
                let otherTile = grid[xPos][y];

                if (currentTile === otherTile && otherTile !== 0) {
                    grid[x][y] = 0;
                    grid[xPos][y] = 0;
                    grid[xPos + furthestPush(grid, xPos, y, tiles)][y] = currentTile * 2;
                    tileStateChangePoses.push([xPos + furthestPush(grid, xPos, y, tiles), y]);
                    score += currentTile * 2;
                    addTile = true;
                    x += 1;
                    break;
                }
                else if (otherTile !== 0) {
                    break;
                }
            }
        }

        //Check if you can push again

        for (let checkX = 0; checkX < tiles; checkX++) {
            if (grid[checkX][y] !== 0) {
                let pushAmount = furthestPush(grid, checkX, y, tiles);

                if (pushAmount > 0) {
                    let currentTileCheckValue = grid[checkX][y];

                    grid[checkX][y] = 0;
                    grid[checkX + pushAmount][y] = currentTileCheckValue;

                    if (tileStateChangePoses.length - 1 >= checkX) {
                        tileStateChangePoses[checkX][0] = checkX + pushAmount;
                    }

                    addTile = true;
                    checkX = -1;
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

function furthestPush(grid, otherTileX, otherTileY, tiles) {
    let pushCount = 0;

    for (let i = 0; i < ((tiles - otherTileX) - 1); i++) {
        if (grid[otherTileX + i + 1][otherTileY] === 0) {
            pushCount++;
        }
        else {
            break;
        }
    }

    return pushCount;
}

export {rightAction};