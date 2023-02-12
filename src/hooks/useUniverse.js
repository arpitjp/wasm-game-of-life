import { useEffect, useState } from 'react';
import init, { Universe, Cell } from 'rust-wasm';
import { CELL_SIZE } from '../constants';

const getDimensions = () => {
  const vw = window.innerWidth*0.8;
  const vh = window.innerHeight*0.7;
  const h = Math.max(3, Math.floor(vh / CELL_SIZE));
  const w = Math.max(3, Math.floor(vw / CELL_SIZE));
  return {h, w};
}

const raw = await init();

export const useUniverse = () => {
  const { h, w } = getDimensions();
  const [universe, setUniverse] = useState(Universe.new(h, w, true));

  useEffect(() => {
    const resize = () => {
      const { h, w } = getDimensions();
      setUniverse(Universe.new(h, w, true));
    }
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return { universe, Cell, memory: raw.memory };
}