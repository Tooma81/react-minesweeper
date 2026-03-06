import './tile.css';
import { useState } from 'react';

function Tile({x, y, mine}) {
    const [status, setStatus] = useState('closed');

    function handleTileClick() {
        console.log(`Clicked tile: x=${x}, y=${y}`)
        setStatus('open')
    };

    return(
        <div 
            className={`tile ${status} ${mine}`} 
            onClick={handleTileClick}
        >
        </div>
    )
};

export default Tile;