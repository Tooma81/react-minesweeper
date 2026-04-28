export function scanForMines(x, y, tileStates) {
    let indicator = 0;
    console.log(`Clicked tile ${x}, ${y}`)
    let currentTile = tileStates.find((tile) => {
        return tile.x === x - 1 && tile.y === y - 1;
    })
    if (currentTile.mine) {
        indicator += 1;
    }
    console.log(currentTile)
    return indicator;
}