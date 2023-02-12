import { useState } from "react";
import { useAnimation } from "../hooks/useAnimation";

export const Canvas = ({ universe, dimension, isPlaying, setIsPlaying }) => {
  const [genCount, setGenCount] = useState(0);
  const canvasRef = useAnimation({ universe, setGenCount, isPlaying });

  return <>
    <h3 style={{ margin: '0px 0px 5px 0px' }}>Game of Life</h3>
    <p style={{ margin: '0px 0px 15px 0px', fontSize: '11px' }}>Dimension: {dimension} | Generation: {genCount}</p>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    }}>
    <button
      style={{ height: '25px', margin: '5px' }}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {isPlaying ? 'Pause ⏸' : 'Play ▶'}
    </button>
    {isPlaying && <button
      style={{ height: '25px', margin: '5px' }}
        onClick={() => {
          setIsPlaying(true);
          universe.clear_all();
          setGenCount(0);
          setIsPlaying(false);
      }}>
      Clear
    </button>}
    </div>
    <canvas ref={canvasRef} />
  </>
}