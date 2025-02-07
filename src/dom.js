import {
  reduce,
  ifElse,
  includes,
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
import { autobox } from "@/array"
import { inscribe, $ } from "@/function"
import { toString } from "@/object"
import { NAMESPACES } from "@/constants"

import { captureListeners } from "@/events"
import { remap, attr } from "@/attribute"
import { trace } from "@/side-effect"

export const text = (x) => document.createTextNode(x)
export const _textify = when(is(String), text)
export const htmlText = (txt) => {
  const el = document.createElement("div")
  el.innerHTML = txt
  return el.textContent
}

export const processChildren = cond([
  [is(Function), pipe(trace("YO"), toString, defaultTo("<???>"))],
  [
    is(String),
    // not sure if we want to include this, but for now it seems ok
    ifElse(includes("&"), htmlText, text),
  ],
  [(x) => x instanceof HTMLElement || x instanceof SVGElement, identity],
  [() => true, () => ""],
])
/*
const nsCreateElement = inscribe("createElementOfNamespace", (ns, elName) =>
  ns === NAMESPACES.XHTML
    ? document.createElement(elName)
    : document.createElementNS(ns, elName),
)
*/

// ok, scopes have gotten rather large and we need better names for shit
// our core goals
//  1. provide an escape hatch for relating a component (esp. scope) with its children
//  2. don't break the existing stuff
//  3. refactor literal so a literalTag can have non-literal children and still render correctly

/*
const defaultScope = {
  // override all the values (1)
  configure: ({ scope, kind, props, children }) => ({
    scope,
    kind,
    props,
    children,
  }),

  // what do we do when the baby is on board?
  eject: [], // [checkEject, processEjection],


  // effects provide behavior on props, resolved at render time
  effects: [
    //["effectName", (oldProps) => newProps]
  ],

  // side-effects do stuff as elements are added to the web
  sideEffects: [
    // ["sideEffectname", ({element, ns, scope, kind, props, children}) => void ]
  ]
}
*/

// TOMORROW TASK
//
// patch appendOnChild so that the processChildren function takes outside inputs for conditions
// make the conditions factor in the parent when processing

// though we could curry this, that would require the user also curry /
// closure their function, so we will eschew that for now
const appendOnChild = (scope, parent, child) => {
  //console.log("WHAT IS PARENT", scope, "><", parent, child)
  parent.append(processChildren(child))
}

export const nsFromString = (x) =>
  x.toLowerCase() === "svg" ? NAMESPACES.SVG : NAMESPACES.XHTML

export const createElementNS = inscribe("createElementNS", (_ns, elName) => {
  if (!_ns || _ns === NAMESPACES.XHTML) {
    return document.createElement(elName)
  }
  return document.createElementNS(_ns, elName)
})

export const spin = inscribe(
  "createElementOfNamespace",
  function $__dialect(_scope, _kind, _props, _children) {
    const {
      configure = identity,
      eject,
      onChild = appendOnChild,
      effects = [],
    } = _scope
    const firstProcessing = configure({
      ns: NAMESPACES.XHTML,
      scope: _scope,
      kind: _kind,
      props: _props,
      children: _children,
    })
    if (eject && eject.check && eject.process) {
      if (eject.check(firstProcessing)) {
        return eject.process(firstProcessing)
      }
    }
    const {
      ns,
      onCreate: __onCreate,
      scope,
      kind,
      props,
      children,
      createStrand = createElementNS,
    } = firstProcessing
    //const redraw = () => $__dialect(scope, kind, props, children)
    const { state = {} } = scope
    const newEl = createStrand(ns, kind)
    // we need to do more to wire the scope to the children, so that we can override what happens below
    // for something like the decorator literal
    if (children) {
      pipe(
        autobox,
        forEach(
          // closure needed
          function appendChildToWeb(_kid) {
            onChild(firstProcessing, newEl, _kid)
          },
        ),
      )(children)
    }
    if (props) {
      // TODO: replace this with a transduce
      const propscessed =
        typeof props === "function"
          ? props(firstProcessing, newEl, { spin })
          : props
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
        map(captureListeners(newEl)),
        forEach(attr(newEl)),
      )(propscessed)
    }
    if (scope.post) {
      return scope.post(newEl, scope)
    }
    return newEl
  },
)

export const tag = spin({})
export const svgTag = spin({
  configure: (ext) => ({ ...ext, ns: NAMESPACES.SVG }),
})
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
