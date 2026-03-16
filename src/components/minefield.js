import './minefield.css';
import Tile from './tile';
import { useState, useEffect } from 'react';

const Minefield = ({ minePos, tileStates, width, height }) => {
    const tileRows = []; //Rows of tiles
    
    useEffect(()=>{
        createMinefield();
    }, []);

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
        // setTileStates(nextTileStates);
        if (mine) {
            console.log("Boom!!")
        };
    }

    console.log(tileStates)

    // Create Minefield
    const createMinefield = () => {
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
                    mine={tile.mine ? ' mine' : ''}
                    onTileClick={handleTileClick}
                />);
            };
            tileRows.push(
                <div className="tile-row" key={y}>
                    {tiles}
                </div>
            );
        };
    };


    return(
        <div className="minefield">
            <div className="minefield-container">
                {tileRows}
            </div>
        </div>
    )
};

export default Minefield;