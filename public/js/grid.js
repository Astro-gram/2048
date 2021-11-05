function setupGrid(tiles) {
    let tilesX = 0;
    let tilesY = 0;
    let grid = {};

    for (let i = 0; i < tiles; i++) {
        for (let y = 0; y < tiles; y++) {
            grid[(tilesX.toString() + tilesY.toString())] = 0;
            tilesY++;
        }

        tilesY = 0;
        tilesX++;
    }

    console.log(grid)

    return grid;
}

function updateGrid(grid, event, tiles) {
    let dirHorizontal = 0;
    let dirVertical = 0;

    if (event.key === "ArrowUp") {
        dirVertical = -1;

    }
    else if (event.key === "ArrowDown") {
        dirVertical = 1;

    }
    else if (event.key === "ArrowLeft") {
        dirHorizontal = -1;

    }
    else if (event.key === "ArrowRight") {
        dirHorizontal = 1;
    }

    for (let x = 0; x < tiles; x++) {
        for (let y = 0; y < tiles; y++) {
            let currentTile = grid[(x).toString() + y.toString()];
            let besideCurrentTile = grid[(x + dirHorizontal).toString() + (y + dirVertical).toString()];

            if (currentTile === besideCurrentTile && currentTile !== 0) {
                grid[x.toString() + y.toString()] = 0;
                grid[(x + dirHorizontal).toString() + (y + dirVertical).toString()] = currentTile * 2;
            }
        }
    }

}

export {setupGrid, updateGrid};