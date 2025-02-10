import { pipe, map, join } from "ramda"
import blem from "blem"
import { inscribe, $ } from "@/function"
import { tag, tagWithScope, spin } from "@/dom"
import { NAMESPACES } from "@/constants"
import { safeStringify } from "@/json"

const renderToString = ({ ns, scope, kind, props, children }) => {
  const _ns = ns === NAMESPACES.SVG ? "svgTag" : "tag"
  const _scope = "{}"
  const _props = safeStringify(props)
  const kids =
    typeof children === "string" ? `"${children}"` : `[${children.join(", ")}]`
  const rendered = {
    literal: `${_ns}(${_scope}, "${kind}", ${_props}, ${kids})`,
  }
  console.log(
    "how can we stringify the children?",
    children,
    ">>",
    kids,
    rendered,
  )
  return {
    ns,
    scope,
    kind,
    props,
    children: rendered,
    //processor: (k) => {
    //  console.log("WHAT IS K?", k)
    //  return renderToString({ ns, scope, kind, props, children: k })
    //},
  }
}

export const literalWithScope = inscribe("renderAsString", (n, s, t, p, k) =>
  spin(
    n,
    {
      ...s,
      __balloon__: [
        ({ children }) => children.literal,
        ({ children }) => children.literal,
      ],
      __manual__: ({ ns, scope, kind, props, children }) => {
        return renderToString({
          ns,
          scope: { ...scope, ...s },
          kind,
          props,
          children,
        })
      },
    },
    t,
    p,
    k,
  ),
)
// this can eventually be cleaner ?
export const literalTagWithScope = literalWithScope(NAMESPACES.XHTML)
export const literalSvgWithScope = literalWithScope(NAMESPACES.SVG)
export const literalTag = literalTagWithScope({})
export const literalSvg = literalSvgWithScope({})
