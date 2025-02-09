import { tag, svgTag } from "@/dom"
import { inscribe, $ } from "@/function"
import { pipe, map } from "ramda"

export const props = inscribe("manipulation", (str, fn, kids) =>
  pipe(fn, tag(str, $, kids)),
)
