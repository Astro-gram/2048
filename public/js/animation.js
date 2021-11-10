async function mergeAnimation(grid, x, y, ctx, xPos, yPos, tileSizeX, tileSizeY, color) {
    let newTileSizeX = tileSizeX / 2;
    let newTileSizeY = tileSizeY / 2;

    let timeBetweenFrames = 2;

    if (grid[x][y] !== 0) {
      for (let i = 1; i <= newTileSizeX; i++) {
        setTimeout(function() {
          ctx.fillStyle = color;
          ctx.fillRect((xPos + (tileSizeX / 4)) - (i / 2), (yPos + (tileSizeY / 4)) - (i / 2), newTileSizeX + i, newTileSizeY + i);
          ctx.fillStyle = "black";
          ctx.fillText(grid[x][y].toString(), (xPos + (tileSizeX / 2)), (yPos + (tileSizeY / 2)));
        }, i * timeBetweenFrames);
      }
    }

    return finished(0, (newTileSizeX * timeBetweenFrames) + 75);
}


function finished(status, length) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(status);
      }, length);
    });
}

export { mergeAnimation };