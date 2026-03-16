import './App.css';
import Minefield from './components/minefield';
import { useState, useEffect } from 'react';
import { shuffle } from './scripts/shuffleArray';

function App() {
  const [mines, setMines] = useState(20); // Number of mines
  const [width, setWidth] = useState(10); // Width of the field in tiles
  const [height, setHeight] = useState(10); // Height of the field in tiles
  const [minePos, setMinePos] = useState([]); //Mines position array
  const [tileStates, setTileStates] = useState([]) // Tile states and positions 

  // Create and randomize mines
  const onPlaceMines = () => {
    let newMinePos = [];
    for (let i=0; i < height * width; i++) {
      i < mines ? newMinePos.push(1) : newMinePos.push(0);
    };
    shuffle(newMinePos);
    setMinePos(newMinePos);
  }  

  for (let y=0; y < height; y++) {
    for (let x=0; x < width; x++) {
      const tileIndex = y ? `${y}${x}` : `${x}`
      // Create entry in tileStates array
      tileStates.push(
        {
          id: tileIndex,
          x: x,
          y: y,
          status: 'open',
          mine: minePos[tileIndex]
        }
      );
    }      
  };
  

  useEffect(()=>{
    onPlaceMines();
  }, []);

  return (
    <div className="App">
      <p>Width: {width}, Height: {height}, Mines: {mines}</p> 
      <Minefield  
        minePos={minePos}
        tileStates={tileStates} 
        width={width}
        height={height} 
      />
      <div className="controls">
        <button onClick={() => onPlaceMines()}>{"Place Mines"}</button>
        <button>{"Reset"}</button>
        <button>{"(Debug) Reveal mines"}</button>
      </div>
    </div>
  );
}

export default App;
