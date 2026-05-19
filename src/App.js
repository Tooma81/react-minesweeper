import './App.css';
import Minefield from './components/minefield';
import { useState, useEffect, useCallback } from 'react';
import { shuffle } from './scripts/shuffleArray';
import { scanForMines } from './scripts/scanForMines';

function App() {
  const [mines, setMines] = useState(30); // Number of mines
  const [width, setWidth] = useState(10); // Width of the field in tiles
  const [height, setHeight] = useState(4); // Height of the field in tiles
  const [flagsPlaced, setFlagsPlaced] = useState(0); // Number of flags placed
  const [tilesOpen, setTilesOpen] = useState(0); // Number of tiles open
  const [tileStates, setTileStates] = useState([]) // Tile states and positions 
  const [gameWon, setGameWon] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Create and randomize mines
  const placeMines = useCallback(() => {
    let newMinePos = [];
    for (let i=0; i < height * width; i++) {
      i < mines ? newMinePos.push(1) : newMinePos.push(0);
    };
    shuffle(newMinePos);
    return newMinePos;
  }, [height, width, mines]); 

  // Create tile states
  useEffect(() => {
    let newTileStates = [];
    let minePos = placeMines();
    console.log(minePos)
    try {
      for (let y=0; y < height; y++) {
        for (let x=0; x < width; x++) {
          const tileIndex = y ? `${y}${x}` : `${x}`
          // Create entry in tileStates array
          newTileStates.push(
            {
              id: tileIndex,
              x: x,
              y: y,
              status: 'closed',
              mine: minePos[tileIndex],
              flagged: false,
              indicator: 0, // Mine indicator
            }
          );
        };      
      };
      setTileStates(newTileStates)
    } catch(err) {
      setError(true)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [height, width, placeMines]);

  //Handle click on specific tile
  const handleTileClick = (id) => {
    console.log(`Clicked tile: id=${id}`)
    const nextTileStates = tileStates.map((tile) => {
      if (id === tile.id && !tile.flagged) {
        let indicator = scanForMines(tile.x, tile.y, tileStates);
        if (tile.mine) {
          console.log("Boom!!")
        };
        return {...tile, status: 'open', indicator: indicator}
      } else {
        return tile
      };
    });
    setTileStates(nextTileStates);
  }

  //Reset all tiles to 'closed' state
  const handleReset = () => {
    console.log(`Tiles reset`)
    const nextTileStates = tileStates.map((tile) => {
      return {...tile, status: 'closed', flagged: false}
    });
    setTileStates(nextTileStates);
  }
   
  //Reveal all mines (debug)
  const revealMines = () => {
    console.log(`All mines revealed`)
    const nextTileStates = tileStates.map((tile) => {
      if (tile.mine) {
        return {...tile, status: 'open'}
      } else {
        return tile
      };
    });
    setTileStates(nextTileStates);
  }

  //Flag all mines (debug)
  const flagMines = () => {
    console.log(`All mines flagged`)
    const nextTileStates = tileStates.map((tile) => {
      if (tile.mine) {
        return {...tile, flagged: true, status: 'closed'}
      } else {
        return tile
      };
    });
    setTileStates(nextTileStates);
  }


  const handleFlag = (id) => {
    console.log(`Flagged tile ${id}`)
    const nextTileStates = tileStates.map((tile) => {
      if (id === tile.id && tile.status === 'closed') {
        return {...tile, flagged: !tile.flagged}
      } else {
        return tile
      };
    });
    console.log(nextTileStates)
    setTileStates(nextTileStates);
  }

  // Updates counters on tilestates 
  useEffect(() => {
    setTilesOpen(tileStates.filter(tile => tile.status === 'open').length);
    setFlagsPlaced(tileStates.filter(tile => tile.flagged).length);
    // Check win condition
    // Check that there are no mines without flags or safe tiles unopened
    if (!tileStates.find(tile => (tile.mine && !tile.flagged) || (!tile.mine && tile.status === 'closed'))) {
      setGameWon(true)
    } else {
      setGameWon(false)
    };
    console.log(gameWon)
  }, [tileStates, gameWon])

  return (
    <div className="App">
      {loading || error ?
        <>
          {loading ? 
            <p>Loading...</p>
          :
            <p>Something went wrong.</p>
          }
        </>
      :
        <>
          <p>Width: {width}, Height: {height}, Mines: {mines}, Flags placed: {flagsPlaced}, Tiles open: {tilesOpen}</p>
          {gameWon &&
            <p className="winner-text">YOU'RE WINNER</p>
          }
          <Minefield  
            tileStates={tileStates} 
            width={width}
            height={height} 
            handleTileClick={handleTileClick}
            handleFlag={handleFlag}
          />
          <div className="controls">
            <button onClick={handleReset}>{"Reset"}</button>
            <button onClick={revealMines}>{"(Debug) Reveal mines"}</button>
            <button onClick={flagMines}>{"(Debug) Flag mines"}</button>
          </div>
        </>
      } 
    </div>
  );
}

export default App;
