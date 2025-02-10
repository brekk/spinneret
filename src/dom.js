import {
  reduce,
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
import { inscribe, $ } from "@/function"
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

const elOfSpace = inscribe("createElementOfNamespace", (ns, elName) =>
  ns === NAMESPACES.XHTML
    ? document.createElement(elName)
    : document.createElementNS(ns, elName),
)

export const spin = inscribe(
  "createElementOfNamespace",
  function $__dialect(_ns, _scope, _kind, _props, _children) {
    const {
      __manual__ = identity,
      __balloon__ = [() => false, identity],
      childEffects = [],
      effects = [],
    } = _scope || {}
    const firstProcessing = __manual__({
      ns: _ns,
      scope: _scope,
      kind: _kind,
      props: _props,
      children: _children,
    })
    const [balloonCheck, balloonProcess] = __balloon__
    if (balloonCheck(firstProcessing)) {
      return balloonProcess(firstProcessing)
    }
    const { ns, scope, kind, props, children } = firstProcessing
    const make = elOfSpace(ns)
    const newEl = make(kind)
    console.log(">>>", newEl, "<><>", children)

    if (children) {
      const kids = Array.isArray(children) ? children : [children]
      kids.forEach(
        // closure needed
        function appendChildToWeb(_kid) {
          newEl.append(_processChildren(_kid))
        },
      )
    }
    if (props) {
      // so we wanna reduce over the effects
      pipe(
        reduce(
          function processEffect(agg, step) {
            const [effectName, fn] = step || []
            if (effectName && fn) {
              //console.log("calling", effectName)
              return fn(agg)
            }
            return agg
          },
          $,
          scope.effects,
        ),
        Object.entries,
        map(remap),
        forEach(attr(newEl)),
      )(props)
    }
    return newEl
  },
)

export const tagWithScope = spin(NAMESPACES.XHTML)
export const svgTagWithScope = spin(NAMESPACES.SVG)

export const tag = tagWithScope({})
export const svgTag = svgTagWithScope({})

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
