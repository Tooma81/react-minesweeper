import './tile.css';
import { useState } from 'react';

function Tile({x, y}) {
    // 0=closed tile, 1=open tile
    const [status, setStatus] = useState(0)

    function handleTileClick() {
        console.log(`Clicked tile: x=${x}, y=${y}`)
        setStatus(1)
    }

    return(
        <div 
            className={`tile ${status}`} 
            onClick={handleTileClick}
        >
        </div>
    )
};

export default Tile;