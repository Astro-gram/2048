import { addNewTile, checkLoss } from "../grid.js";

function upAction(grid, tiles) {
    let score = 0;
    let addTile = false;
    let tileStateChangePoses = [];

    for (let x = tiles - 1; x >= 0; x--) {
        for (let y = tiles - 1; y >= 0; y--) {
            let currentTile = grid[x][y];

            for (let i = y; i > 0; i--) {
                let yPos = (i - 1);
                let otherTile = grid[x][yPos];

                if (currentTile === otherTile && otherTile !== 0) {
                    grid[x][y] = 0;
                    grid[x][yPos] = 0;
                    grid[x][yPos - furthestPush(grid, x, yPos)] = currentTile * 2;
                    tileStateChangePoses.push([x, yPos - furthestPush(grid, x, yPos)]);
                    score += currentTile * 2;
                    addTile = true;
                    y -= 1;
                    break;
                }
                else if (otherTile !== 0) {
                    break;
                }
            }
        }

        //Check if you can push again

        for (let checkY = tiles - 1; checkY > 0; checkY--) {
            if (grid[x][checkY] !== 0) {
                let pushAmount = furthestPush(grid, x, checkY);

                if (pushAmount > 0) {
                    let currentTileCheckValue = grid[x][checkY];

                    grid[x][checkY] = 0;
                    grid[x][checkY - pushAmount] = currentTileCheckValue;

                    if (tileStateChangePoses.length - 1 >= checkY) {
                        tileStateChangePoses[checkY][1] = checkY - pushAmount;
                    }

                    addTile = true;
                    checkY = tiles;
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

    for (let i = otherTileY; i > 0; i--) {
        if (grid[otherTileX][i - 1] === 0) {
            pushCount++;
        }
        else {
            break;
        }
    }

    return pushCount;
}

export {upAction};