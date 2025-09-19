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
    rollupOptions: {
      output: {
        //   exports: "named",
        globals: { ramda: "R", blem: "blem" },
      },
      external: ["ramda", "blem"],
    },
    lib: {
      entry: [
        "src/spinneret.js",
        "src/decorators.js",
        "src/canvas.js",
        "src/form.js",
      ].map((z) => local(z)),
      name: "Spinneret",
      fileName: (f, e) =>
        // console.log({ f, e }, "<><>") ||
        `${f === "es" ? "js" : "cjs"}/${e}.${f === "es" ? "js" : "cjs"}`,
    },
  },
})
