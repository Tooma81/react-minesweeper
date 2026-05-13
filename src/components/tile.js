import './tile.css';
import { useState, useEffect } from 'react';
import flag from '../assets/flag.png'

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
            <img src={flag} alt="Flag" className={"flag"}/>
        </div>
    )
};

export default Tile;