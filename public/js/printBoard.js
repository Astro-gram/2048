function printBoard(ctx, tiles, boardSize, offset, spacing, grid) {
    let xPos = (offset - spacing * 1.5);
    let yPos = (offset - spacing * 1.5);

    let tileSizeX = boardSize.x / tiles;
    let tileSizeY = boardSize.y / tiles;

    ctx.font = "30px Arial";

    for (let x = 0; x < tiles; x++) {
        for (let y = 0; y < tiles; y++) {
            ctx.fillStyle = colorize(grid[x.toString() + y.toString()]);
            ctx.fillRect(xPos, yPos, tileSizeX, tileSizeY);
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
        2048: "red"
    }

    return values[value];
}

export {printBoard};