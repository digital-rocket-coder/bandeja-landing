import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { viteSingleFile } from "vite-plugin-singlefile"

// `npm run build`        → dist/ for Vercel / GitHub Pages (BASE_PATH sets the sub-path)
// `npm run build:single` → dist-single/index.html, one self-contained file to send around
export default defineConfig(({ mode }) => ({
  base: mode === "single" ? "./" : process.env.BASE_PATH ?? "/",
  plugins: [react(), tailwindcss(), ...(mode === "single" ? [viteSingleFile()] : [])],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    outDir: mode === "single" ? "dist-single" : "dist",
    copyPublicDir: true,
    ...(mode === "single" ? { assetsInlineLimit: 100_000_000 } : {}),
  },
}))
