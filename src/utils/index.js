import { CELL_SIZE } from "../constants";

const getIndex = (row, col, width) => row * width + col;

export const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const drawGrid = ({ ctx, width, height, theme }) => {
  ctx.beginPath();
  ctx.strokeStyle = theme.grid.lines;

  // Vertical lines.
  for (let i = 1; i < width; i++) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
  }

  // Horizontal lines.
  for (let j = 1; j < height; j++) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
  }

  ctx.stroke();
};

export const drawCells = ({ ctx, universe, memory, height, width, Cell, theme }) => {
  const cellsPtr = universe.cells();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);
  ctx.beginPath();
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col, width);
      ctx.fillStyle = cells[idx] === Cell.Dead ? theme.grid.dead : theme.grid.alive;
      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1.5,
        row * (CELL_SIZE + 1) + 1.5,
        CELL_SIZE+0.5,
        CELL_SIZE+0.5
      );
    }
  }

  ctx.stroke();
};
