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
    //console.log("WE NEED TO WIRE THIS TO SOMETHING", [key, $STATE, _scope], el)
    λ.on(key, (action, x) => {
      console.log("ACTION", action, "<><><X", x)
    })
    return el
  }
  // const state = { ...(scope.state || {}), [key]: [initial }
  const dynKey = {
    get: () => $STATE,
    set: (z) => {
      λ.signal(key, ["set", z])
      $STATE = z
      return $STATE
    },
  }
  const prevDyn = scope.dynamic || {}
  scope = {
    ...scope,
    λ,
    dynamic: prevDyn[key]
      ? prevDyn
      : {
          ...prevDyn,
          [key]: dynKey,
        },
  }
  return {
    ...scope,
    post: scope.post ? pipe(scope.post, stateHandler) : stateHandler,
  }
})
