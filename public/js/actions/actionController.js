import { rightAction } from "./right.js";
import { leftAction } from "./left.js";
import { downAction } from "./down.js";
import { upAction } from "./up.js";

function actionController(action, grid, tiles) {
    if (action === "up") {
        return upAction(grid, tiles);
    }

    else if (action === "down") {
        return downAction(grid, tiles);
    }

    else if (action === "left") {
        return leftAction(grid, tiles);
    }

    else if (action === "right") {
        return rightAction(grid, tiles);
    }

    else if (action === "all") {
        let total = 0;

        total += upAction(grid, tiles)[0];
        total += downAction(grid, tiles)[0];
        total += leftAction(grid, tiles)[0];
        total += rightAction(grid, tiles)[0];

        return total;
    }
    
    else {
        console.error("Unknown Action.");
        return -1;
    }
}

export { actionController };