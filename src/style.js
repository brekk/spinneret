import { pipe, map, join } from "ramda"

export const styleAttr = pipe(Object.entries, map(join(": ")), join("; "))
