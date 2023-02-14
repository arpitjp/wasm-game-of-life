import "./index.css";
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import lightImage from "./assets/github-mark.png";
import darkImage from "./assets/github-mark-white.png";
import { useUniverse } from "./hooks/useUniverse";
import { Canvas } from "./components/canvas.jsx";
import { useTheme } from "./hooks/useTheme";
import vibrate from "./utils/vibrate";

document.head.appendChild(Object.assign(document.createElement("link"), {rel: "icon", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧩</text></svg>"}))

function App() {
  const { universe, h, w } = useUniverse();
  const [isPlaying, setIsPlaying] = useState(true);
  const { theme, setTheme, isDarkMode } = useTheme();

  const dimension = `${h}x${w}`;

  return (
    <div id="playground" style={{backgroundColor: theme.backgroundColor}}>
      <div
        className="prevent-select"
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
          onClick={() => vibrate()}
          rel="noopener noreferrer"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          style={{ color: "black", textDecoration: "none", marginBottom: '6px', marginRight: '8px' }}
        >
          <strong
            title="Open Wikipedia article"
            style={{
              color: theme.font.main,
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
          onClick={() => vibrate()}
          rel="noopener noreferrer"
          href="https://github.com/arpitjp/wasm-game-of-life#readme"
        >
          <img
            src={isDarkMode ? darkImage : lightImage}
            title="Check code on GitHub"
            width="22"
            alt="GitHub Repo"
          />
        </a>
        <div title="Change theme">
        <DarkModeSwitch
          style={{marginLeft: '14px'}}
          checked={isDarkMode}
          onChange={setTheme}
          size={25}
        />
        </div>
      </div>
      <Canvas
        key={dimension}
        universe={universe}
        dimension={dimension}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        theme={theme}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;
