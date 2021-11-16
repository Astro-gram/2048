import { addNewTile, checkLoss } from "../grid.js";

function downAction(grid, tiles) {
    let score = 0;
    let addTile = false;
    let tileStateChangePoses = {};

    for (let x = 0; x < tiles; x++) {
        for (let y = 0; y < tiles; y++) {
            let currentTile = grid[x][y];

            for (let i = 0; i < ((tiles - y) - 1); i++) {
                let yPos = (y + i + 1);
                let otherTile = grid[x][yPos];

                if (currentTile === otherTile && otherTile !== 0) {
                    grid[x][y] = 0;
                    grid[x][yPos] = 0;
                    grid[x][yPos + furthestPush(grid, yPos, x, tiles)] = currentTile * 2;
                    tileStateChangePoses[yPos + furthestPush(grid, yPos, x, tiles)] = [x, yPos + furthestPush(grid, yPos, x, tiles)];
                    score += currentTile * 2;
                    addTile = true;
                    y += 1;
                    break;
                }
                else if (otherTile !== 0) {
                    break;
                }
            }
        }

        for (let checkY = 0; checkY < tiles; checkY++) {
            if (grid[x][checkY] !== 0) {
                let pushAmount = furthestPush(grid, checkY, x, tiles);

                if (pushAmount > 0) {
                    let currentTileCheckValue = grid[x][checkY];

                    grid[x][checkY] = 0;
                    grid[x][checkY + pushAmount] = currentTileCheckValue;

                    if (tileStateChangePoses[checkY] !== undefined) {
                        tileStateChangePoses[checkY][1] = checkY + pushAmount;
                    }

                    addTile = true;
                    checkY = -1;
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

function furthestPush(grid, otherTileY, otherTileX, tiles) {
    let pushCount = 0;

    for (let i = 0; i < (tiles - otherTileY - 1); i++) {
        if (grid[otherTileX][otherTileY + i + 1] === 0) {
            pushCount++;
        }
        else {
            break;
        }
    }

    return pushCount;
}

export {downAction};