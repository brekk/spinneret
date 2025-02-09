import { HTML_TAGS, SVG_TAGS } from "@/constants"
import { tag, svgTag } from "@/dom"
import { pipe, map } from "ramda"

export const htmlTags = pipe(
  map((x) => [x, tag(x)]),
  Object.fromEntries,
)(HTML_TAGS)

export const svgTags = pipe(
  map((x) => [x, svgTag(x)]),
  Object.fromEntries,
)(SVG_TAGS)
