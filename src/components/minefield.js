import './minefield.css';
import Tile from './tile';
import { useState, useEffect, useCallback } from 'react';

const Minefield = ({ tileStates, width, height, handleTileClick }) => {
    const [tileRows, setTileRows] = useState([]); //Rows of tiles
    
    useEffect(()=>{
        renderMinefield();
    }, [tileStates]);

    console.log(tileStates);

    // Render Minefield
    const renderMinefield = () => {
        let newTileRows = [];
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
                    mine={tile.mine ? ' mine' : ''}
                    indicator={tile.indicator}
                    onTileClick={() => handleTileClick(tile.id)}
                />);
            };
            newTileRows.push(
                <div className="tile-row" key={y}>
                    {tiles}
                </div>
            );
        };
        setTileRows(newTileRows)
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