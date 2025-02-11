import { pipe, map, join } from "ramda"
import blem from "blem"
import { NAMESPACES } from "@/constants"
import { inscribe, $ } from "@/function"
import { spin } from "@/dom"

export const styledWithScope = inscribe(
  "bemTag",
  (fn, ns, scope, _tag, props, kids) =>
    spin(
      ns,
      {
        ...scope,
        effects: [
          ...(scope.effects || []),
          [
            "bem",
            ({ em, ..._props }) => ({
              ..._props,
              className: Array.isArray(em) ? fn(...em) : fn(em),
            }),
          ],
        ],
      },
      _tag,
      props,
      kids,
    ),
)
export const styled = styledWithScope($, $, {})
export const styledTag = styled($, NAMESPACES.XHTML)
export const styledSvgTag = styled($, NAMESPACES.SVG)

export const base = pipe(blem, styledTag)
