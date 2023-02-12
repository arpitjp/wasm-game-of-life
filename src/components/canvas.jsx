import { useState } from "react";
import { useAnimation } from "../hooks/useAnimation";

const buttonStyle = {
  height: "20px",
  fontSize: '12px',
  margin: "8px",
  border: "none",
  backgroundColor: "transparent",
  outline: "1px solid grey",
  borderRadius: "15px",
};

export const Canvas = ({ universe, dimension, isPlaying, setIsPlaying }) => {
  const [genCount, setGenCount] = useState(0);
  const [avgFps, setAvgFps] = useState(0);
  const [fps, setFps] = useState(30);
  const canvasRef = useAnimation({
    universe,
    setGenCount,
    isPlaying,
    setIsPlaying,
    setAvgFps,
    fps,
  });

  return (
    <>
      <h3 style={{ margin: "0px 0px 5px 0px" }}>Game of Life</h3>
      <i style={{ margin: "0px 0px 10px 0px", fontSize: "10px" }}>
        Dimension: {dimension} | Generation: {genCount} | Average FPS: {avgFps}
      </i>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <button style={buttonStyle} onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? "Pause ⏸" : "Play ▶"}
        </button>
        <button
            style={buttonStyle}
            onClick={isPlaying ? () => {
              // setIsPlaying(true);
              universe.clear_all();
              setGenCount(0);
              setAvgFps(0);
              setIsPlaying(false);
            } : () => window.location.reload()}
          >
            {isPlaying ? 'Clear' : 'Reload ↻'}
          </button>
        <select
          style={buttonStyle}
          value={fps}
          onChange={(event) => setFps(parseInt(event.target.value))}
        >
          <option value="1">1 fps</option>
          <option value="5">5 fps</option>
          <option value="10">10 fps</option>
          <option value="20">20 fps</option>
          <option value="30">30 fps</option>
          <option value="60">60 fps</option>
          <option value="10000">Max fps</option>
        </select>
      </div>
      <canvas ref={canvasRef} />
    </>
  );
};
