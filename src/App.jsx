import React from 'react';
import './index.css';
import init, { greet } from 'rust-wasm';

const raw = await init();

function App() {
  return (
    <div id="playground">
      <h2>React Playground</h2>
      <button onClick={() => greet("World!")}>
        Click Me
      </button>
    </div>
  )
}

export default App
