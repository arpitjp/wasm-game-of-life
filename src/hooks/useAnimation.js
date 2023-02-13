import { useEffect, useRef } from "react";
import { useSnackbar } from "react-simple-snackbar";
import init, { Cell } from "rust-wasm";
import { CELL_SIZE } from "../constants";
import { drawCells, drawGrid, pause } from "../utils";

// measure average fps
var times = [];
const measureFps = (now) => {
  while (times.length > 0 && times[0] <= now - 1000) {
    times.shift();
  }
  times.push(now);
  return times.length;
};

// frame rate
let prevTick = 0;

const { memory } = await init();

export const useAnimation = ({
  universe,
  setGenCount,
  isPlaying,
  setIsPlaying,
  setAvgFps,
  fps,
  theme
}) => {
  const animationRef = useRef(0);
  const canvasRef = useRef(null);
  const [openSnackbar, closeSnackBar] = useSnackbar({style: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
  }})

  const height = universe.height();
  const width = universe.width();

  // this handles play/pause and next gen animation
  useEffect(() => {
    const renderCanvas = async (time, keepRendering = true) => {
      if (canvasRef.current) {
        // frame rate things
        const now = Math.round((fps * performance.now()) / 1000);
        if (now !== prevTick || !keepRendering) {
          prevTick = now;
          setAvgFps(measureFps(performance.now()));

          // await pause(100);
          if (!universe.tick()) {
            keepRendering && openSnackbar('All cells are dead 🙁. Try drawing some pattern on grid...', 3000);
            setIsPlaying(false);
            setGenCount(0);
          };
          setGenCount((prev) => prev + 1);
          const ctx = canvasRef.current.getContext("2d");

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

          drawGrid({ ctx, width, height, theme });
          drawCells({ ctx, universe, memory, height, width, Cell, theme });
        }
      }
      if (keepRendering) {
        animationRef.current = requestAnimationFrame((time) =>
          renderCanvas(time)
        );
      }
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame((time) =>
        renderCanvas(time)
      );
    } else {
      // at-least render once
      cancelAnimationFrame(animationRef.current);
      animationRef.current = requestAnimationFrame((time) =>
        renderCanvas(time, false)
      );
    }
    return () => cancelAnimationFrame(animationRef.current);
  }, [height, isPlaying, setGenCount, universe, width, fps, setAvgFps, setIsPlaying, theme]);

  // touch event listener
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener(
      "click",
      (event) => {
        event.stopImmediatePropagation();

        const scale = window.devicePixelRatio;
        const ctx = canvas.getContext("2d");
        const boundingRect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / boundingRect.width;
        const scaleY = canvas.height / boundingRect.height;

        const canvasLeft =
          ((event.clientX - boundingRect.left) * scaleX) / scale;
        const canvasTop = ((event.clientY - boundingRect.top) * scaleY) / scale;

        const row = Math.min(
          Math.floor(canvasTop / (CELL_SIZE + 1)),
          height - 1
        );
        const col = Math.min(
          Math.floor(canvasLeft / (CELL_SIZE + 1)),
          width - 1
        );
        window.navigator.vibrate(1);
        universe.toggle_cell(row, col);

        drawGrid({ ctx, width, height, theme: window.theme });
        drawCells({ ctx, universe, memory, height, width, Cell, theme: window.theme, deadColor: window.theme.grid.deadOnToggle });
      },
      false
    );
    return () => canvas.removeEventListener("click", () => {});
  }, [height, universe, width]);
  return canvasRef;
};
