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
import { trace } from "@/log"
import { inscribe } from "@/function"
import { toString } from "@/object"
import { NAMESPACES } from "@/constants"

export const _attr = inscribe("createAttribute", (el, k, v) => {
  // if (k.startsWith("data-")) {
  //   const raw = k.slice(5)
  //   console.log("setting...", raw)
  //   el.dataset[raw] = v
  // } else {
  el.setAttribute(k, v)
  // }
  return el
})

export const attr = inscribe("createAttributeTuple", (el, [k, v]) =>
  // resilient™ to bad data
  k && typeof v !== "undefined" ? _attr(el, k, v) : el,
)

export const text = (x) => document.createTextNode(x)
export const _textify = when(is(String), text)

export const _remapAttributes = ([k, v]) => [
  cond([
    [equals("className"), always("class")],
    [() => true, identity],
  ])(k),
  cond([
    [
      (vv) => typeof vv !== "string" && k === "style",
      pipe(
        Object.entries,
        map(([k, v]) => `${k}: ${v}`),
        join("; "),
      ),
    ],
    [() => true, identity],
  ])(v),
]

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
      pipe(Object.entries, map(_remapAttributes), forEach(attr(newEl)))(props)
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
