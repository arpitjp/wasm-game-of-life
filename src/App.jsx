import "./index.css";
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import image from "./assets/github-mark.png";
import { useUniverse } from "./hooks/useUniverse";
import { Canvas } from "./components/canvas.jsx";

document.head.appendChild(Object.assign(document.createElement("link"), {rel: "icon", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧩</text></svg>"}))

function App() {
  const { universe, h, w } = useUniverse();
  const [isDarkMode, setIsDarkMode] = useState(window.localStorage.getItem('theme') === 'dark' ? true : false);
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
          target="_blank"
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          style={{ color: "black", textDecoration: "none", marginBottom: '6px', marginRight: '8px' }}
        >
          <strong
            title="Open Wikipedia article"
            style={{
              // outline: "1px solid black",
              borderRadius: "15px",
              fontSize: "12px",
              padding: "4px 6px",
            }}
          >
            RULES
          </strong>
        </a>

        <a
          style={{marginRight: "12px", margin: '0px 8px'}}
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/arpitjp/wasm-game-of-life#readme"
        >
          <img
            src={image}
            title="Check code on GitHub"
            width="22"
            alt="GitHub Repo"
          />
        </a>
        <div title="Change theme">
        <DarkModeSwitch
          style={{marginLeft: '12px'}}
          checked={isDarkMode}
          onChange={() => {
            setIsDarkMode(!isDarkMode);
            window.localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
            window.navigator.vibrate(1);
          }}
          size={25}
          moonColor='black'
        />
        </div>
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
