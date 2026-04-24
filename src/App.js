import './App.css';
import Minefield from './components/minefield';
import { useState, useEffect } from 'react';
import { shuffle } from './scripts/shuffleArray';

function App() {
  const [mines, setMines] = useState(20); // Number of mines
  const [width, setWidth] = useState(10); // Width of the field in tiles
  const [height, setHeight] = useState(10); // Height of the field in tiles
  const [tileStates, setTileStates] = useState([]) // Tile states and positions 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    onCreateTileStates()
  }, []);

  // Create and randomize mines
  function placeMines() {
    let newMinePos = [];
    for (let i=0; i < height * width; i++) {
      i < mines ? newMinePos.push(1) : newMinePos.push(0);
    };
    shuffle(newMinePos);
    return newMinePos;
  }; 

  // Create tile states array
  const onCreateTileStates = () => {
    let newTileStates = [];
    let minePos = placeMines()
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
              mine: minePos[tileIndex]
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
  };

  //Handle click on specific tile
  const handleTileClick = (id) => {
    console.log(`Clicked tile: id=${id}`)
    const nextTileStates = tileStates.map((tile) => {
      if (id === tile.id) {
        if (tile.mine) {
          console.log("Boom!!")
        };
        return {...tile, status: 'open'}
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
      return {...tile, status: 'closed'}
    });
    setTileStates(nextTileStates);
  }
    

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
          <p>Width: {width}, Height: {height}, Mines: {mines}</p> 
          <Minefield  
            tileStates={tileStates} 
            width={width}
            height={height} 
            handleTileClick={handleTileClick}
          />
          <div className="controls">
            <button onClick={handleReset}>{"Reset"}</button>
            <button>{"(Debug) Reveal mines"}</button>
          </div>
        </>
      } 
    </div>
  );
}

export default App;
