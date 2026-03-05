import './minefield.css';
import Tile from './tile';

function Minefield({mines, width, height}) {
    const tileRows = []; //Rows of tiles

    for (let y=1; y <= height; y++) {
        const tiles = []; //Tiles in row
        for (let x=1; x <= width; x++) {
            tiles.push(<Tile 
                key={x}
                x={x}
                y={y}
            />)
        }
        tileRows.push(
            <div className="tile-row" key={y}>
                {tiles}
            </div>
        );
    };

    return(
        <div className="minefield">
            <p>Width: {width}, Height: {height}, Mines: {mines}</p> 
            <div className="minefield-container">
                {tileRows}
            </div>
        </div>
    )
};

export default Minefield;