import { defineConfig } from 'vite'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/wasm-game-of-life/",
  plugins: [
    react(),
    wasm(),
    topLevelAwait()
  ],
})
