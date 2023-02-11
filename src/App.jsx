import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import init, { Universe, Cell } from 'rust-wasm';
import { useAnimation } from './hooks/useAnimation';

const raw = await init();
const universe = Universe.new(64, 64);
const width = universe.width();
const height = universe.height();

function App() {
  const {genCount, canvasRef} = useAnimation({universe, width, height, memory: raw.memory, Cell});

  return (
    <div id="playground">
      <h1>Generation {genCount}</h1>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default App
