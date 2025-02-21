import { pipe, replace } from "ramda"

export const entities = pipe(
  replace(/\s"(\S)/g, ` &ldquo;$1`),
  replace(/^"(\S)/g, `&ldquo;$1`),
  replace(/(\S)"\s/g, `$1&rdquo; `),
  replace(/(\S)"$/g, `$1&rdquo;`),
  replace(/\.\.\./g, `&hellip;`),
)
