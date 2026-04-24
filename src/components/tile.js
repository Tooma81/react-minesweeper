import './tile.css';
import { useState, useEffect } from 'react';

const Tile = ({ 
        id, 
        x, 
        y, 
        status,
        mine, 
        onTileClick 
    }) => {
    const [state, setState] = useState(''); //Visual state of tile
    

    useEffect(()=>{
        setState(status)
    }, [status]) 
    console.log(status)
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
            className={`tile ${state} ${mine}`} 
            onClick={onTileClick}
            //onClick={() => 
            //    (status === 'closed' ? handleTileClick() : onResetField())
            //}
        >
        </div>
    )
};

export default Tile;