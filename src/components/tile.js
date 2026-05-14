import './tile.css';
import { useState, useEffect } from 'react';
import flagSprite from '../assets/sprites/flag.png'
import mineSprite from '../assets/sprites/mine.png'

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
    const [hasMine, setHasMine] = useState(false); // Is open and has mine?

    useEffect(()=>{
        setState(status);
        setHasFlag(flagged);
        if (mine && status === 'open') {
            setHasMine(true);
        } else {
            setHasMine(false);
        }
    }, [status, flagged, mine]) 

    

    return(
        <div 
            className={`tile ${state} ${mine}`} 
            onClick={onTileClick}
        >
            <p className="indicator">{indicator}</p>
            {hasFlag &&
                <img src={flagSprite} alt="Flag" className={"tile-sprite"}/>
            }
            {hasMine && 
                <img src={mineSprite} alt="Mine" className={"tile-sprite"}/>
            }
        </div>
    )
};

export default Tile;