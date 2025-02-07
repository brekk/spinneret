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
      ({ em, ..._props }) =>
        // empty string is _essential_
        // but otherwise anything non-empty
        // (so coerce nullish away)
        em === "" || em
          ? {
              ..._props,
              className: Array.isArray(em) ? fn(...em) : fn(...[em]),
            }
          : _props,
    ],
  ],
}))
export const styled = styledWithScope($, {})

export const base = pipe(blem, styled, spin)
