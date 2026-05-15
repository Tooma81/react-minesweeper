import './minefield.css';
import Tile from './tile';
import { useState, useEffect } from 'react';

const Minefield = ({ tileStates, width, height, handleTileClick, handleFlag }) => {
    const [tileRows, setTileRows] = useState([]); //Rows of tiles
    
    // Render minefield
    useEffect(()=>{
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
                    flagged={tile.flagged}
                    indicator={tile.indicator}
                    onTileClick={() => handleTileClick(tile.id)}
                    onRightClick={() => handleFlag(tile.id)}
                />);
            };
            newTileRows.push(
                <div className="tile-row" key={y}>
                    {tiles}
                </div>
            );
        };
        setTileRows(newTileRows)
    }, [tileStates, handleTileClick, handleFlag, width, height]);

    return(
        <div className="minefield">
            <div className="minefield-container">
                {tileRows}
            </div>
        </div>
    )
};

export default Minefield;