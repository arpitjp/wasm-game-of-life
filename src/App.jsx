import './index.css';
import { useState } from 'react';
import image from './assets/github-mark.png';
import { useUniverse } from './hooks/useUniverse';
import { Canvas } from './components/canvas.jsx';

function App() {
  const { universe, h, w } = useUniverse();
  const [isPlaying, setIsPlaying] = useState(true);
  const dimension = `${h}x${w}`;
  return (
    <div id="playground">
      <a
        id="github-link"
        target="_blank"
        rel="noopener noreferrer"
        title='Check code on GitHub'
        href="https://github.com/arpitjp/wasm-game-of-life#readme"
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          border: '0',
          zIndex: '1000',
          margin: '10px'
        }}
      >
        <img
          src={image}
          width="30"
          alt="GitHub Repo"
        />
      </a>
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
