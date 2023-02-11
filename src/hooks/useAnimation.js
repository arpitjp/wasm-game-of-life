import { useEffect, useRef, useState } from "react";
import { CELL_SIZE } from "../constants";
import { drawCells, drawGrid, pause } from "../utils";

export const useAnimation = ({universe, width, height, memory, Cell}) => {
  const animationRef = useRef(0);
  const canvasRef = useRef(null);
  const [genCount, setGenCount] = useState(0);

  const renderLoop = async () => {
    // await pause(100);
    universe.tick();
    setGenCount((prev) => prev + 1);

    if (canvasRef.current) {
      canvasRef.current.height = (CELL_SIZE + 1) * height + 1;
      canvasRef.current.width = (CELL_SIZE + 1) * width + 1;
      const ctx = canvasRef.current.getContext('2d');
      drawGrid({ctx, width, height});
      drawCells({ctx, universe, memory, height, width, Cell});
    }

    animationRef.current = requestAnimationFrame(renderLoop);
  }

  useEffect(() => {
    animationRef.current = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationRef.current);
  }, [])

  return { genCount, canvasRef };
}