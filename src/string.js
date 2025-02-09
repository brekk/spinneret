import { trim, pipe, toLower, replace } from "ramda"

export const capitalize = (x) => x[0].toUpperCase() + x.slice(1)
export const slugify = pipe(
  trim,
  toLower,
  replace(/\s/g, "-"),
  replace(/[!@#$%^&*()[]]/g, ""),
)
