import { pipe, map } from "ramda"
import { tag, svgTag } from "@/dom"
import { inscribe, $ } from "@/function"

//export const props = inscribe("manipulation", (str, fn, kids) =>
//  pipe(fn, tag(str, $, kids)),
//)

// so, the problem with this is that `tag` ends up being a side-effect
// shortly we'll pull that in as an argument, but we need a real side-effect channel and then a means of encoding a bunch of manipulations and thread them through

export const mapTag = inscribe("modifyTag", (fn, _tag, props, kids) =>
  tag(fn(_tag), props, kids),
)

export const mapProps = inscribe("modifyProps", (fn, _tag, props, kids) =>
  tag(_tag, fn(props), kids),
)

export const mapKids = inscribe("modifyKids", (fn, _tag, props, kids) =>
  tag(_tag, props, fn(kids)),
)
