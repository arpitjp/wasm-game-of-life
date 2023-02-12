import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import init, { Universe, Cell } from 'rust-wasm';
import { useAnimation } from './hooks/useAnimation';

const raw = await init();
const universe = Universe.new(64, 64, true);
const width = universe.width();
const height = universe.height();

function App() {
  const {genCount, canvasRef} = useAnimation({universe, width, height, memory: raw.memory, Cell});

  return (
    <div id="playground">
      <h3 style={{margin: '10px'}}>Generation {genCount}</h3>
      <canvas style={{outline: '1px solid grey'}} ref={canvasRef}></canvas>
    </div>
  )
}

export default App
