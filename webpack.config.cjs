module.exports = function config() {
  return {
    entry: "./example.js",
    resolve: {
      alias: {
        "@": "./src",
        "#": ".",
      },
    },
  }
}
