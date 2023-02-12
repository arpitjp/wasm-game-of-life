import { useState } from "react";
import { useAnimation } from "../hooks/useAnimation";

const buttonStyle = {
  height: '25px',
  margin: '5px',
  border: 'none',
  backgroundColor: 'transparent',
  outline: '1px solid grey',
  borderRadius: '5px',
};

export const Canvas = ({ universe, dimension, isPlaying, setIsPlaying }) => {
  const [genCount, setGenCount] = useState(0);
  const [avgFps, setAvgFps] = useState(0);
  const [fps, setFps] = useState(30);
  const canvasRef = useAnimation({ universe, setGenCount, isPlaying, setAvgFps, fps });

  return <>
    <h3 style={{ margin: '0px 0px 5px 0px' }}>Game of Life</h3>
    <p style={{ margin: '0px 0px 15px 0px', fontSize: '11px' }}>Dimension: {dimension} | Generation: {genCount} | Average FPS: {avgFps}</p>
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    }}>
      <button
      style={buttonStyle}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      {isPlaying ? 'Pause ⏸' : 'Play ▶'}
    </button>
    {isPlaying && <button style={buttonStyle}
        onClick={() => {
          setIsPlaying(true);
          universe.clear_all();
          setGenCount(0);
          setIsPlaying(false);
      }}>
      Clear
      </button>}
      <select style={buttonStyle} value={fps} onChange={(event) => setFps(parseInt(event.target.value))}>
        <option value="1">1 FPS</option>
        <option value="5">5 FPS</option>
        <option value="10">10 FPS</option>
        <option value="20">20 FPS</option>
        <option value="30">30 FPS</option>
        <option value="60">60 FPS</option>
      </select>
    </div>
    <canvas ref={canvasRef} />
  </>
}