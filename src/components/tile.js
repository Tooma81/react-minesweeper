import './tile.css';
import { useState, useImperativeHandle, forwardRef } from 'react';

const Tile = forwardRef(({ x, y, mine }, ref) => {
    const [status, setStatus] = useState('closed');

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

    useImperativeHandle(ref, () => ({
        reset: onResetField
    }));

    return(
        <div 
            className={`tile ${status} ${mine}`} 
            onClick={() => handleTileClick()}
            //onClick={() => 
            //    (status === 'closed' ? handleTileClick() : onResetField())
            //}
        >
        </div>
    )
});

export default Tile;