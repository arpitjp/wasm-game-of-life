import { useEffect, useRef } from "react";
import init, { Cell } from "rust-wasm";
import { CELL_SIZE } from "../constants";
import { drawCells, drawGrid, pause } from "../utils";

const { memory } = await init();

export const useAnimation = ({ universe, setGenCount, isPlaying }) => {
  const animationRef = useRef(0);
  const canvasRef = useRef(null);

  useEffect(() => {
    const height = universe.height();
    const width = universe.width();

    const renderCanvas = async (time, keepRendering = true) => {
      console.log('from inside', isPlaying, canvasRef.current)
      if (canvasRef.current) {
        // await pause(100);
        universe.tick();
        setGenCount((prev) => prev + 1);
        canvasRef.current.height = (CELL_SIZE + 1) * height + 1;
        canvasRef.current.width = (CELL_SIZE + 1) * width + 1;
        const ctx = canvasRef.current.getContext('2d');
        drawGrid({ctx, width, height});
        drawCells({ctx, universe, memory, height, width, Cell});
      }
      if (keepRendering) {
        animationRef.current = requestAnimationFrame((time) => renderCanvas(time));
      }
    }

    if (isPlaying) { 
      animationRef.current = requestAnimationFrame((time) => renderCanvas(time));
    } else {
      // at-least render once
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame((time) => renderCanvas(time, false));
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, setGenCount, universe])

  return canvasRef;
}