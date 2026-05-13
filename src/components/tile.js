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
        flagged,
        onTileClick 
    }) => {
    const [state, setState] = useState('closed'); //Visual state of tile
    const [hasFlag, setHasFlag] = useState(false); // Is flag placed?

    useEffect(()=>{
        setState(status);
        setHasFlag(flagged);
    }, [status, flagged]) 

    

    return(
        <div 
            className={`tile ${state} ${mine}`} 
            onClick={onTileClick}
        >
            <p className="indicator">{indicator}</p>
            {hasFlag &&
                <img src={flag} alt="Flag" className={"flag"}/>
            }
        </div>
    )
};

export default Tile;