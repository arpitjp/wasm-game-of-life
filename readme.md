# Game of life
Implementation of Conway's game of life in WASM + React.
- Fixed size periodic universe and wraps around
- Click on cells in grid to toggle their state
- Grid size is responsive, based on viewport
- Metrics like frame rate, generation, dimensions
#### [View Deployment on GitHub Pages](https://arpitjp.github.io/wasm-game-of-life/)
## Local Setup
- Install `node`, `npm`, `rust`, `wasm-pack`
- `npm run wasm`
- `npm run i`
- `npm run dev`

To deploy to GitHub pages, run
`chmod 777 ./deploy.sh && ./deploy.sh`
## Stack
- UI - React, Vite
- Game renderer - Rust compiled to WASM

## Todo
- [ ] Dark mode
- [ ] Thumbnail preview
- [ ] Time profiling
- [ ] Decrease WASM size

## Reference / Credits
https://rustwasm.github.io/docs/book/game-of-life
