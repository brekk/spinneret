import { pipe, map, join } from "ramda"
import blem from "blem"
import { inscribe, $ } from "@/function"
import { spin } from "@/dom"
import { NAMESPACES } from "@/constants"
import { safeStringifyWithIndent } from "@/json"

const renderConfigToString = ({ ns, scope, kind, props, children }) => {
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
    literal: rendered.literal,
  }
}

export const literalWithScope = inscribe("renderAsString", (n, s, t, p, k) => {
  const newScope = {
    ...s,
    eject: {
      check: ({ literal, children }) => literal || children.literal,
      process: ({ literal, children }) => children.literal || literal,
    },
    onChild: function literalChild(scope, parent, child) {
      return renderConfigToString({
        ns: n,
        scope,
        kind: t,
        props: p,
        children: child,
      })
    },

    configure: ({ ns, scope, kind, props, children }) => {
      return renderConfigToString({
        ns,
        scope: { ...s, ...scope, literal: true },
        kind,
        props,
        children,
      })
    },
  }
  if (p.important) {
    console.log("RAW SCOPE INITIAL", { newScope, s, t, p, k })
  }
  return spin(newScope, t, p, k)
})
// this can eventually be cleaner ?
export const literalTagWithScope = literalWithScope(NAMESPACES.XHTML)
export const literalSvgWithScope = literalWithScope(NAMESPACES.SVG)
export const literalTag = literalTagWithScope({})
export const literalSvg = literalSvgWithScope({})
