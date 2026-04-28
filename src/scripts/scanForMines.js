export function scanForMines(x, y, tileStates) {
    let indicator = 0;
    console.log(`Clicked tile ${x}, ${y}`)
    // Scan for surrounding tiles on x and y axis
    for (let i=-1; i <= 1; i++) {
        for (let j=-1; j <= 1; j++) {
            let currentTile = tileStates.find((tile) => {
                return tile.x === x + i && tile.y === y + j;
            })
            // If tile exists and there is mine, increase by 1
            if (currentTile?.mine) {
                indicator += 1;
            }
        }
    }
    return indicator;
}