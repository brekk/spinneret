import { pipe, map, join } from "ramda"
import blem from "blem"
import { inscribe, $ } from "@/function"
import { tag } from "@/dom"

export const styleAttr = pipe(Object.entries, map(join(": ")), join("; "))

export const styled = inscribe("bemTag", (fn, _tag, { em, ...props }, kids) =>
  tag(
    _tag,
    {
      ...props,
      className: Array.isArray(em) ? fn(...em) : fn(em),
    },
    kids,
  ),
)

export const base = pipe(blem, styled)
