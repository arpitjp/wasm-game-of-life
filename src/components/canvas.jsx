import { useState } from "react";
import { useAnimation } from "../hooks/useAnimation";

export const Canvas = ({ universe, dimension, isPlaying, setIsPlaying }) => {
  const [genCount, setGenCount] = useState(0);
  const canvasRef = useAnimation({ universe, setGenCount, isPlaying });

  return <>
    <h3 style={{ margin: '0px 0px 15px 0px' }}>Dimension: {dimension} | Generation: {genCount}</h3>
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
          setIsPlaying(false);
      }}>
      Clear
    </button>}
    </div>
    <canvas ref={canvasRef} />
  </>
}