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

// ok, scopes have gotten rather large and we need better names for shit
// our core goals
//  1. provide an escape hatch for relating a component (esp. scope) with its children
//  2. don't break the existing stuff
//  3. refactor literal so a literalTag can have non-literal children and still render correctly

const defaultScope = {
  // override all the values
  configure: identity,
  /*
  ({ ns, scope, kind, props, children }) => ({
    ns,
    scope,
    kind,
    props,
    children,
  }),
  */
  // what do we do when the baby is on board?
  onChild: (scope, parent, child) => parent.append(_processChildren(child)),
  eject: [], // [checkEject, processEjection],
  // effects provide behavior on props, resolved at render time
  effects: [
    //["effectName", (oldProps) => newProps]
  ],
}

export const spin = inscribe(
  "createElementOfNamespace",
  function $__dialect(_ns, _scope, _kind, _props, _children) {
    const {
      configure,
      eject,
      onChild,
      effects = [],
    } = { ...defaultScope, _scope }
    const firstProcessing = configure({
      ns: _ns,
      scope: _scope,
      kind: _kind,
      props: _props,
      children: _children,
    })
    if (eject && eject.length) {
      const [balloonCheck, balloonProcess] = eject
      if (balloonCheck(firstProcessing)) {
        return balloonProcess(firstProcessing)
      }
    }
    const { ns, scope, kind, props, children } = firstProcessing
    const make = elOfSpace(ns)
    const newEl = make(kind)
    // we need to do more to wire the scope to the children, so that we can override what happens below
    // for something like the decorator literal
    if (children) {
      const kids = Array.isArray(children) ? children : [children]
      kids.forEach(
        // closure needed
        function appendChildToWeb(_kid) {
          onChild(scope, newEl, _kid)
        },
      )
    }
    if (props) {
      // so we wanna reduce over the effects but later we can do that
      // trickier whatchamacallitfold -- trampoline? magic compose thing
      // TODO: look that up
      pipe(
        reduce(
          function processEffect(agg, step) {
            const [effectName, fn] = step || []
            if (effectName && fn) {
              //console.log("calling", effectName)
              return fn(agg, effectName)
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
    if (scope.post) {
      return scope.post(newEl)
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
