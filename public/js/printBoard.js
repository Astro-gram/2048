import { mergeAnimation } from "./animation.js";

function printBoard(ctx, tiles, boardSize, offset, spacing, grid, tileStates) {
    let xPos = (offset - spacing * 1.5);
    let yPos = (offset - spacing * 1.5);

    let tileSizeX = boardSize.x / tiles;
    let tileSizeY = boardSize.y / tiles;

    ctx.font = "700 45px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = 'middle';

    for (let x = 0; x < tiles; x++) {
        for (let y = 0; y < tiles; y++) {

            ctx.fillStyle = colorize(grid[x][y]) || "white";

            if (tileStates[x][y][0] === 1) {
                tileStates[x][y][0] = 0;
                tileStates[x][y][1] = 1;

                mergeAnimation(grid, x, y, ctx, xPos, yPos, tileSizeX, tileSizeY, colorize(grid[x][y]) || "white").then((tileStatus) => {
                    tileStates[x][y][1] = tileStatus;
                })
            }

            else if (tileStates[x][y][0] === 0 && tileStates[x][y][1] !== 1) {
                ctx.clearRect(xPos, yPos, tileSizeX, tileSizeY);
                ctx.fillRect(xPos, yPos, tileSizeX, tileSizeY);
            }
            
            if (grid[x][y] !== 0 && tileStates[x][y][1] !== 1) {
                ctx.fillStyle = "black";
                ctx.fillText(grid[x][y].toString(), (xPos + (tileSizeX / 2)), (yPos + (tileSizeY / 2)));
            }

            yPos += tileSizeY + spacing;
        }

        yPos = (offset - spacing * 1.5);
        xPos += tileSizeX + spacing;
    }
}

function colorize(value) {
    let values = {
        0: "gray",
        2: "lightblue",
        4: "blue",
        8: "royalblue",
        16: "darkblue",
        32: "lightgreen",
        64: "greenyellow",
        128: "green",
        256: "yellow",
        512: "gold",
        1024: "orange",
        2048: "red",
    }

    return values[value];
}

export {printBoard};