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
  const a = document.createAttribute(k)
  a.value = v
  el.setAttributeNode(a)
  return el
})

export const attr = inscribe("createAttributeTuple", (el, [k, v]) =>
  // resilient™ to bad data
  k && v ? _attr(el, k, v) : el,
)

export const text = document.createTextNode.bind(document)
const textify = when(is(String), text)

const remapAttributes = ([k, v]) => [
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

const dialect = inscribe(
  "createElementOfNamespace",
  function $__dialect(ns, kind, props, children) {
    try {
      const make =
        ns === NAMESPACES.XHTML
          ? (_k) => document.createElement(_k)
          : (_k) => document.createElementNS(ns, _k)
      const newEl = make(kind)

      const newContent = textify(children)

      if (children) {
        if (Array.isArray(children)) {
          // closure needed
          children.forEach(function appendChildToWeb(_kid) {
            try {
              const kid = cond([
                [is(Function), pipe(toString, defaultTo("<???>"))],
                [is(String), text],
                [() => true, identity],
              ])(_kid)

              newEl.append(kid)
            } catch (e) {
              console.warn("Error rendering child", e)
              newEl.append(text("Error rendering child: " + e.toString()))
            }
          })
        } else {
          newEl.append(newContent)
        }
      }
      if (props) {
        pipe(
          Object.entries,
          trace("hey!"),
          map(remapAttributes),
          trace("postRemap"),
          forEach(attr(newEl)),
        )(props)
      }

      return newEl
    } catch (e) {
      console.warn("Error rendering element", e)
      return text("Error rendering element")
    }
  },
)

export const elx = dialect(NAMESPACES.XHTML)
export const svgx = dialect(NAMESPACES.SVG)

export const svg = inscribe(
  "svg",
  ({ className, height = "500", width = "500", ...rest }, children) =>
    svgx(
      "svg",
      {
        xmlns: NAMESPACES.SVG,
        height,
        width,
        className,
        ...rest,
      },
      children,
    ),
)
