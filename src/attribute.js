import { pipe, cond, equals, always, identity, map, join } from "ramda"
import { styleAttr } from "@/style"
import { inscribe } from "@/function"

// TODO: not clear to me that there's a reason to use this
// alternative API, remove this in a couple commits if it's still around
// if (k.startsWith("data-")) {
//   const raw = k.slice(5)
//   console.log("setting...", raw)
//   el.dataset[raw] = v
// } else {

export const _attr = inscribe("createAttribute", (el, k, v) => {
  el.setAttribute(k, v)
  return el
})

export const attr = inscribe("createAttributeTuple", (el, [k, v]) =>
  // resilient™ to bad data
  k && v ? _attr(el, k, v) : el,
)

export const remap = ([k, v]) => [
  cond([
    [equals("className"), always("class")],
    [() => true, identity],
  ])(k),
  cond([
    [(vv) => typeof vv !== "string" && k === "style", styleAttr],
    [() => true, identity],
  ])(v),
]
