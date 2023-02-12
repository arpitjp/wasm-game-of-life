# Game of life
### [View Deployment on GitHub Pages](https://arpitjp.github.io/wasm-game-of-life/)
Click on cells to toggle state
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

## To do
- [ ] Auto pause incase of zero alive cells

## Reference / Credits
https://rustwasm.github.io/docs/book/game-of-life
