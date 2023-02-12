import './index.css';
import { useState } from 'react';
import { useUniverse } from './hooks/useUniverse';
import { Canvas } from './components/canvas.jsx';

function App() {
  const { universe, h, w } = useUniverse();
  const [isPlaying, setIsPlaying] = useState(true);
  const dimension = `${h}x${w}`;
  return (
    <div id="playground">
      <Canvas
        key={dimension}
        universe={universe}
        dimension={dimension}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  )
}

export default App
