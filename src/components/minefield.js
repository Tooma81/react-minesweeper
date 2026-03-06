import './minefield.css';
import Tile from './tile';
import { shuffle } from '../scripts/shuffleArray';

function Minefield({mines, width, height}) {
    const tileRows = []; //Rows of tiles
    const minePos = []; //Mines array

    // Create and randomize bombs
    for (let i=0; i < height * width; i++) {
        i < mines ? minePos.push(1) : minePos.push(0);
    };
    shuffle(minePos);
    console.log(minePos)

    // Create Minefield
    for (let y=0; y < height; y++) {
        const tiles = []; //Tiles in row
        for (let x=0; x < width; x++) {
            tiles.push(<Tile 
                key={x}
                x={x}
                y={y}
                // Check for mines from mine array
                mine={minePos[y ? `${y}${x}` : `${x}`] ? 'mine' : ''}
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