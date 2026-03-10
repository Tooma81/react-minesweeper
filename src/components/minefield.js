import './minefield.css';
import Tile from './tile';
import { shuffle } from '../scripts/shuffleArray';
import { useRef } from 'react';

function Minefield({mines, width, height}) {
    const tileRows = []; //Rows of tiles
    const minePos = []; //Mines array
    const tileRefs = useRef([]);

    // Create and randomize bombs
    for (let i=0; i < height * width; i++) {
        i < mines ? minePos.push(1) : minePos.push(0);
    };
    shuffle(minePos);
    console.log(minePos)

    // Resetting the field
    const handleFieldReset = () => {
        tileRefs.current.forEach(tile => {
            if (tile) tile.reset();
        });
    };

    // Create Minefield
    for (let y=0; y < height; y++) {
        const tiles = []; //Tiles in row
        for (let x=0; x < width; x++) {
            const tileIndex = y ? `${y}${x}` : `${x}`
            tiles.push(<Tile 
                key={tileIndex}
                x={x}
                y={y}
                // Check for mines from mine array
                mine={minePos[tileIndex] ? 'mine' : ''}
                ref={(tile) => (tileRefs.current[tileIndex] = tile)}
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
            <div className="controls">
                <button onClick={() => handleFieldReset()}>{"Reset"}</button>
                <button>{"(Debug) Reveal mines"}</button>
            </div>
        </div>
    )
};

export default Minefield;