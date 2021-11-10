function setupStates(tiles) {
    let states = [];

    for (let x = 0; x < tiles; x++) {
        let rowState = [];

        for (let y = 0; y < tiles; y++) {
            let tileState = [0, 0];
            rowState.push(tileState);

            //tileState[0] is the current state
            //tileState[1] is if the animation is finished or not
        }

        states.push(rowState);
    }

    return states;
}

function updateStates(tileStates, poses) {
    console.log(tileStates, poses);

    for (let pos in poses) {
        console.log(pos)
        
        let x = poses[pos][0];
        let y = poses[pos][1];

        tileStates[x][y][0] = 1;
    }

    console.log(tileStates, poses);
}

export { setupStates, updateStates };
