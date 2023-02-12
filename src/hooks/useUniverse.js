import { useEffect, useState } from "react";
import { Universe } from "rust-wasm";
import { CELL_SIZE } from "../constants";

const getDimensions = () => {
  const vw = window.innerWidth * 0.8;
  const vh = window.innerHeight - 200;
  const h = Math.max(3, Math.floor(vh / CELL_SIZE));
  const w = Math.max(3, Math.floor(vw / CELL_SIZE));
  return { h, w };
};

export const useUniverse = () => {
  const { h, w } = getDimensions();
  const [thing, setThing] = useState({
    universe: Universe.new(h, w, true),
    h,
    w,
  });

  useEffect(() => {
    const resize = () => {
      const { h, w } = getDimensions();
      setThing({ universe: Universe.new(h, w, true), h, w });
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return thing;
};
