import { useState } from "react";
import { useAnimation } from "../hooks/useAnimation";

const frameStyle = {
  fontSize: "1.5vh",
  position: "absolute",
  top: "0",
  left: '0',
  margin: "1vh",
}

export const Canvas = ({ universe, dimension, isPlaying, setIsPlaying, theme, isDarkMode }) => {
  const [genCount, setGenCount] = useState(0);
  const [avgFps, setAvgFps] = useState(0);
  const [fps, setFps] = useState(window.localStorage.getItem('fps') || 30);
  const canvasRef = useAnimation({
    universe,
    setGenCount,
    isPlaying,
    setIsPlaying,
    setAvgFps,
    fps,
    theme
  });

  const classes = `controls-${isDarkMode ? 'dark' : 'light'} controls`;

  return (
    <>
      {isPlaying && <span className="prevent-select" style={{...frameStyle, color: theme.font.light}}>{avgFps} / {fps == 100000 ? 'Max' : fps}</span>}
      <h3 style={{ margin: "0px 0px 5px 0px", color: theme.font.main }}>Game of Life</h3>
      <i style={{ margin: "0px 0px 10px 0px", fontSize: "9px", color: theme.font.main }}>
        Dimension: {dimension} | Generation: {genCount}
      </i>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <button className={classes} onClick={() => {
          setIsPlaying(!isPlaying)
          window.navigator.vibrate(1);
        }}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button
            className={classes}
            onClick={isPlaying ? () => {
              // setIsPlaying(true);
              universe.clear_all();
              setGenCount(0);
              setIsPlaying(false);
              window.navigator.vibrate(1);
            } : () => {
              window.location.reload();
              window.navigator.vibrate(1);
            }}
          >
            {isPlaying ? 'Clear' : 'Random'}
          </button>
        <select
          className={classes}
          value={fps}
          onChange={(event) => {
            const val = parseInt(event.target.value);
            setFps(val);
            window.localStorage.setItem('fps', val);
          }}
        >
          <option value="1">1 fps</option>
          <option value="5">5 fps</option>
          <option value="10">10 fps</option>
          <option value="20">20 fps</option>
          <option value="30">30 fps</option>
          <option value="60">60 fps</option>
          <option value="100000">Max fps</option>
        </select>
      </div>
      <canvas ref={canvasRef} />
    </>
  );
};
