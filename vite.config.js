import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

const dirname = path.dirname(fileURLToPath(import.meta.url))
const local = (x) => path.resolve(dirname, x)

export default defineConfig({
  base: "/spinneret/",
  resolve: {
    alias: {
      "@": local("src"),
      "#": local("."),
    },
  },
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: local("index.html"),
      },
    },
    // lib: {
    //   entry: local("src/spinneret.js"),
    //   name: "Spinneret",
    //   fileName: "spinneret",
    // },
  },
})
