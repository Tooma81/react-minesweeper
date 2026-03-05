import './minefield.css';
import Tile from './tile';

function Minefield({mines, width, height}) {
    const tileRows = []; //Rows of tiles

    for (let i=0; i < height; i++) {
        const tiles = []; //Tiles in row
        for (let i=0; i < width; i++) {
            tiles.push(<Tile />)
        }
        tileRows.push(
            <div classname>
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