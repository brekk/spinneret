import { pipe, map, join } from "ramda"
import blem from "blem"
import { inscribe, $ } from "@/function"
import { spin } from "@/dom"
import Electric from "@/event-system"

export const withState = inscribe("tagWithState", ([key, initial], scope) => {
  if (!key) {
    return scope
  }
  let $STATE = initial

  const λ = Electric([[key, initial]])
  const stateHandler = (el, _scope) => {
    console.log("WE NEED TO WIRE THIS TO SOMETHING", [key, $STATE, _scope], el)
    λ.on(key, (action, x) => {
      console.log("ACTION", action, "<><><X", x)
    })
    return el
  }
  // const state = { ...(scope.state || {}), [key]: [initial }
  scope = {
    ...scope,
    configure: ({ props, ...rest }) => ({
      ...rest,
      props: {
        ...props,
        dynamic: {
          ...(props.dynamic || {}),
          [key]: {
            get: () => $STATE,
            set: (z) => {
              λ.signal(key, ["set", z])
              $STATE = z
              return $STATE
            },
          },
        },
      },
    }),
  }
  console.log("something is gonna happen soon", scope, key)

  // Object.defineProperty(scope.state, key, {
  //   configurable: false,
  //   writable: false,
  //   enumerable: true,
  //   get: () => $STATE,
  // })
  // Object.defineProperty(scope.state, `strand::${key}`, {
  //   configurable: false,
  //   writable: false,
  //   enumerable: true,
  //   get: () => () => $STATE,
  // })
  console.log("HOHO", { key, initial, scope, λ })
  return {
    ...scope,
    post: scope.post ? pipe(scope.post, stateHandler) : stateHandler,
  }
})
