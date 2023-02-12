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
      if (canvasRef.current) {
        // await pause(100);
        universe.tick();
        setGenCount((prev) => prev + 1);
        const ctx = canvasRef.current.getContext('2d');

        // REFER: canvas resolution fix trick: https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
        const widthSize = (CELL_SIZE + 1) * width + 1;
        const heightSize = (CELL_SIZE + 1) * height + 1;
        // first set in css in pixels
        canvasRef.current.style.height = `${heightSize}px`;
        canvasRef.current.style.width = `${widthSize}px`;
        const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        // then set again in device aspect ratio
        canvasRef.current.height = Math.floor(heightSize * scale);
        canvasRef.current.width = Math.floor(widthSize * scale);
        // Normalize coordinate system to use css pixels.
        ctx.scale(scale, scale);

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