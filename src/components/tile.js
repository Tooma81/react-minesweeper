import './tile.css';
import { useState, useEffect } from 'react';

const Tile = ({ 
        id, 
        x, 
        y, 
        status,
        mine, 
        indicator,
        onTileClick 
    }) => {
    const [state, setState] = useState('closed'); //Visual state of tile

    useEffect(()=>{
        setState(status)
    }, [status]) 

    

    return(
        <div 
            className={`tile ${state} ${mine}`} 
            onClick={onTileClick}
        >
            <p className="indicator">{indicator}</p>
        </div>
    )
};

export default Tile;