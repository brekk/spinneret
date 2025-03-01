import globals from "globals"
import importables from "eslint-plugin-import"
import prettier from "eslint-plugin-prettier"
import pluginJs from "@eslint/js"
//import pkg from "./package.json" with { type: "json" }

export default [
  //pluginJs.configs.recommended,
  {
    plugins: { prettier },
    rules: {
      "prettier/prettier": [2, { semi: false }],
    },
  },
  {
    ignores: ["*.config.mjs", ".pnp*", "dist/*"],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },

  {
    plugins: { import: importables },
    rules: {
      "import/named": 2,
      "import/no-mutable-exports": 2,
      "import/order": 2,
    },
  },
  {
    rules: {
      "no-extra-semi": 2,
      "no-var": 2,
      eqeqeq: [2, "smart"],
      "arrow-parens": [2, "always"],
      "consistent-this": 0,
      "func-names": [2],
      "generator-star-spacing": [2, "after"],
      indent: [1, 2],
      "jsx-quotes": [1, "prefer-double"],
      "max-len": [1, 100, 2],
      "new-cap": [2, { capIsNew: false }],
      "no-trailing-spaces": [2, { skipBlankLines: true }],
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "object-curly-spacing": 0,
      "one-var": 0,
      "prefer-reflect": 0,
      "space-before-function-paren": [2, "never"],
      strict: 0,
      "no-shadow": [2, { builtinGlobals: false, hoist: "all" }],
    },
  },
]
