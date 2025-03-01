import { trim, pipe, toLower, replace, curryN } from "ramda"

export const capitalize = (x) => x[0].toUpperCase() + x.slice(1)
export const slugify = pipe(
  trim,
  toLower,
  replace(/['"`]/g, ""),
  replace(/\s/g, "-"),
  replace(/[!@#$%^&*()[]]/g, ""),
)

export const prependString = curryN(2, (pre, x) => pre + x)
