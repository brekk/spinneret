import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

const dirname = path.dirname(fileURLToPath(import.meta.url))
const local = (x) => path.resolve(dirname, x)

export default defineConfig({
  resolve: {
    alias: {
      "@": local("src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        exports: "named",
      },
    },
    lib: {
      entry: local("src/spinneret.js"),
      name: "Spinneret",
      fileName: "spinneret",
    },
  },
})
