import { pipe, map, join } from "ramda"
import blem from "blem"
import { NAMESPACES } from "@/constants"
import { inscribe, $ } from "@/function"
import { spin } from "@/dom"

export const styledWithScope = inscribe("bemTag", (fn, scope) => ({
  ...scope,
  effects: [
    ...(scope.effects || []),
    [
      "bem",
      ({ em, ..._props }) => ({
        ..._props,
        className: Array.isArray(em) ? fn(...em) : fn(...[em]),
        //className: fn(...em),
      }),
    ],
  ],
}))
export const styled = styledWithScope($, {})

export const base = pipe(blem, styled, spin)
