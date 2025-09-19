import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import terser from "@rollup/plugin-terser"

const dirname = path.dirname(fileURLToPath(import.meta.url))
const local = (x) => path.resolve(dirname, x)

export default defineConfig({
  resolve: {
    alias: {
      "@": local("src"),
    },
  },
  build: {
    minify: "terser",
    lib: {
      entry: local("src/browser.js"),
      name: "Spinneret",
      formats: ["umd"],
      fileName: (f, e) => `spinneret.browser.js`,
    },
  },
})
