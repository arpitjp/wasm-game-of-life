import "./index.css";
import { useState } from "react";
import image from "./assets/github-mark.png";
import { useUniverse } from "./hooks/useUniverse";
import { Canvas } from "./components/canvas.jsx";

document.head.appendChild(Object.assign(document.createElement("link"), {rel: "icon", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧩</text></svg>"}))

function App() {
  const { universe, h, w } = useUniverse();
  const [isPlaying, setIsPlaying] = useState(true);
  const dimension = `${h}x${w}`;
  return (
    <div id="playground">
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          border: "0",
          zIndex: "1000",
          margin: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        <a
          id="github-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          style={{ color: "black", textDecoration: "none", marginBottom: '6px' }}
        >
          <span
            title="Open Wikipedia article"
            style={{
              // outline: "1px solid black",
              borderRadius: "15px",
              fontSize: "12px",
              padding: "4px 6px",
              marginRight: "12px",
            }}
          >
            Check Rules
          </span>
        </a>

        <a
          id="github-link"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/arpitjp/wasm-game-of-life#readme"
        >
          <img
            src={image}
            title="Check code on GitHub"
            width="25"
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
  );
}

export default App;
