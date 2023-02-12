# Game of life
### [View Deployment on GitHub Pages](https://arpitjp.github.io/wasm-game-of-life/)
Click on cells to toggle state
## Local Setup
- Install `node`, `npm`, `rust`, `wasm-pack`
- `npm run wasm`
- `npm run i`

To deploy to GitHub pages, run
`chmod 777 ./deploy.sh && ./deploy.sh`
## Stack
- UI - React, Vite
- Game renderer - Rust compiled to WASM

## To do
- [] Stabilize frame rate
- [] Frame rate control
- [] Average frame rate info
- Enable clear button when the render is paused
