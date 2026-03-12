import './tile.css';
import { useState } from 'react';

const Tile = ({ 
        id, 
        x, 
        y, 
        status,
        mine, 
        onTileClick 
    }) => {

    /** 
    function handleTileClick() {
        console.log(`Clicked tile: x=${x}, y=${y}`)
        setStatus('open')
        if (mine) {
            console.log("Boom!!")
        };
    };

    function onResetField() {
        setStatus('closed')
    };

    function onMineReveal() {
        mine && setStatus('open')
    };
    **/

    return(
        <div 
            className={`tile ${status} ${mine}`} 
            onClick={() => onTileClick(id, x, y, mine)}
            //onClick={() => 
            //    (status === 'closed' ? handleTileClick() : onResetField())
            //}
        >
        </div>
    )
};

export default Tile;