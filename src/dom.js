import {
  when,
  join,
  equals,
  always,
  is,
  pipe,
  cond,
  map,
  identity,
  defaultTo,
  forEach,
} from "ramda"
import { inscribe } from "@/function"
import { toString } from "@/object"
import { NAMESPACES } from "@/constants"

import { remap, attr } from "@/attribute"

export const text = (x) => document.createTextNode(x)
export const _textify = when(is(String), text)

export const _processChildren = cond([
  [is(Function), pipe(toString, defaultTo("<???>"))],
  [is(String), text],
  [() => true, identity],
])

export const _dialect = inscribe(
  "createElementOfNamespace",
  function $__dialect(ns, kind, props, children) {
    const make =
      ns === NAMESPACES.XHTML
        ? (_k) => document.createElement(_k)
        : (_k) => document.createElementNS(ns, _k)
    const newEl = make(kind)

    const newContent = _textify(children)

    if (children) {
      if (Array.isArray(children)) {
        // closure needed
        children.forEach(function appendChildToWeb(_kid) {
          newEl.append(_processChildren(_kid))
        })
      } else {
        newEl.append(_processChildren(newContent))
      }
    }
    if (props) {
      pipe(Object.entries, map(remap), forEach(attr(newEl)))(props)
    }

    return newEl
  },
)

export const tag = _dialect(NAMESPACES.XHTML)
export const svgTag = _dialect(NAMESPACES.SVG)

export const svg = inscribe("svg", ({ className, ...rest }, children) =>
  svgTag(
    "svg",
    {
      xmlns: NAMESPACES.SVG,
      className,
      ...rest,
    },
    children,
  ),
)

export const mount = (x) => {
  const div = tag("div", {}, [])
  div.innerHTML = x.outerHTML
  return div
}
