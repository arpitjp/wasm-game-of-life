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
      <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          border: '0',
          zIndex: '1000',
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'

      }}>
        <a
        id="github-link"
        target="_blank"
        rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          style={{color: 'black', textDecoration: 'none'}}
        
      >
        <span 
        title='Open Wikipedia article' style={{ outline: '1px solid black', borderRadius: '15px', fontSize: '12px', padding: '4px 6px', marginRight: '15px'}}>Game Rules</span>
      </a>
        
        <a
        id="github-link"
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/arpitjp/wasm-game-of-life#readme"
        
      >
        <img
            src={image}
            
        title='Check code on GitHub'
          width="30"
          alt="GitHub Repo"
        />
      </a>
      </div>
      
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
