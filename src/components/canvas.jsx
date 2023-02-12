import { useState } from "react";
import { useAnimation } from "../hooks/useAnimation";

export const Canvas = ({ universe, dimension, isPlaying, setIsPlaying }) => {
  const [genCount, setGenCount] = useState(0);
  const canvasRef = useAnimation({ universe, setGenCount, isPlaying });

  return <>
    <h3 style={{ margin: '0px 0px 20px 0px' }}>Dimension: {dimension} | Generation: {genCount}</h3>
    <button
      style={{ height: '25px', marginBottom: '5px' }}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {isPlaying ? 'Pause ⏸' : 'Play ▶'}
    </button>
    <canvas
      style={{
        outline: '1px solid lightgrey'
      }} ref={canvasRef}
    />
  </>
}