import './minefield.css';
import Tile from './tile';
import { shuffle } from '../scripts/shuffleArray';
import { useRef, useState } from 'react';

const Minefield = ({mines, width, height}) => {
    const tileRows = []; //Rows of tiles
    const minePos = []; //Mines array
    
    // Array of tiles
    let [tileStates, setTileStates] = useState([])

    // Create and randomize bombs
    for (let i=0; i < height * width; i++) {
        i < mines ? minePos.push(1) : minePos.push(0);
    };
    shuffle(minePos);
    //console.log(minePos)

    const handleTileClick = (id, x, y, mine) => {
        console.log("Tile clicked")
        console.log(`Clicked tile: x=${x}, y=${y}`)
        const nextTileStates = tileStates.map((tile, i) => {
            if (i === tile.id) {
                return {status: 'open'}
            } else {
                return tile
            };
        });
        setTileStates(nextTileStates);
        if (mine) {
            console.log("Boom!!")
        };
    }

    tileStates = [];

    // Create Minefield
    for (let y=0; y < height; y++) {
        for (let x=0; x < width; x++) {
            const tileIndex = y ? `${y}${x}` : `${x}`
            // Create entry in tileStates array
            tileStates.push(
                {
                    id: tileIndex,
                    x: x,
                    y: y,
                    status: 'open',
                    mine: minePos[tileIndex]
                }
            );
        }      
    };
    console.log(tileStates)

    for (let y=0; y < height; y++) {
        const tiles = []; //Tiles in row
        for (let x=0; x < width; x++) {
            let tile = tileStates[y ? `${y}${x}` : `${x}`];
            tiles.push(<Tile 
                key={tile.id}
                id={tile.id}
                x={tile.x}
                y={tile.y}
                status={tile.status}
                // Check for mines from mine array
                mine={tile.mine && 'mine'}
                onTileClick={handleTileClick}
            />);
        };
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
                <button>{"Reset"}</button>
                <button>{"(Debug) Reveal mines"}</button>
            </div>
        </div>
    )
};

export default Minefield;