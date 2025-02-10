import { pipe, map, join } from "ramda"
import blem from "blem"
import { inscribe, $ } from "@/function"
import { tag, tagWithScope, spin } from "@/dom"
import { NAMESPACES } from "@/constants"
import { safeStringifyWithIndent } from "@/json"

const renderToString = ({ ns, scope, kind, props, children }) => {
  const _ns = ns === NAMESPACES.SVG ? "svgTag" : "tag"
  const _scope = "{}"
  const _props = safeStringifyWithIndent(0, props)
  const kids =
    typeof children === "string"
      ? `"${children}"`
      : `[\n  ${children.join(",\n  ")}\n]`
  const rendered = {
    literal: `${_ns}(${_scope}, "${kind}", ${_props}, ${kids})`,
  }
  return {
    ns,
    scope,
    kind,
    props,
    children: rendered,
  }
}

export const literalWithScope = inscribe("renderAsString", (n, s, t, p, k) => {
  const newScope = {
    ...s,
    eject: [
      ({ literal, children }) => children.literal,
      ({ literal, children }) => children.literal,
    ],
    onChild: function literalChild(scope, parent, child) {
      console.log("huh", { scope, parent, child })
      return renderToString({
        ns: n,
        scope,
        kind: t,
        props: p,
        children: child,
      })
    },

    configure: ({ ns, scope, kind, props, children }) =>
      renderToString({
        ns,
        scope: { ...s, ...scope },
        kind,
        props,
        children,
      }),
  }
  console.log("RAW SCOPE INITIAL", s, newScope)
  return spin(n, newScope, t, p, k)
})
// this can eventually be cleaner ?
export const literalTagWithScope = literalWithScope(NAMESPACES.XHTML)
export const literalSvgWithScope = literalWithScope(NAMESPACES.SVG)
export const literalTag = literalTagWithScope({})
export const literalSvg = literalSvgWithScope({})
