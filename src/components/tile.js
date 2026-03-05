import './tile.css';

function Tile({x, y}) {
    function handleTileClick() {
        console.log(`Clicked tile: x=${x}, y=${y}`)
    }

    return(
        <div className="tile" onClick={handleTileClick}>
        </div>
    )
};

export default Tile;