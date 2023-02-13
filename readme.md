# Game of life
Conway's game of life build using Rust, WASM & React.

<p align="center"><img src="src/assets/thumbnail.png" width="280"></p>

**🔗 [View Deployment on GitHub Pages](https://arpitjp.github.io/wasm-game-of-life/)**

- Fixed size periodic universe and wraps around
- Dark mode
- Click on cells in grid to toggle their state
- Grid size is responsive, based on viewport
- Metrics like frame rate, generation, dimensions

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

## Reference / Credits
https://rustwasm.github.io/docs/book/game-of-life
