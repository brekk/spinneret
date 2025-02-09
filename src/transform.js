import { pipe, map } from "ramda"
import { tag, svgTag } from "@/dom"
import { inscribe, $ } from "@/function"

export const props = inscribe("manipulation", (str, fn, kids) =>
  pipe(fn, tag(str, $, kids)),
)
