import './App.css';
import Minefield from './components/minefield';
import { useState } from 'react';

function App() {
  const [mines, setMines] = useState(20);
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);

  return (
    <div className="App">
      <Minefield  
        mines={mines}
        width={width}
        height={height}  
      />
    </div>
  );
}

export default App;
