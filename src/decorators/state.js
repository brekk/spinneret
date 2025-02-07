import { pipe, map, join } from "ramda"
import blem from "blem"
import { inscribe, $ } from "@/function"
import { spin } from "@/dom"

export const withState = inscribe("tagWithState", ([key, initial], scope) => {
  if (!key) {
    return scope
  }
  let $STATE = initial
  const dynamicScope = scope.dynamic || {}
  const setters = scope.setters || {}
  if (!dynamicScope[key]) {
    // we're effectively writing a proxy here
    Object.defineProperty(dynamicScope, key, {
      get: () => $STATE,
    })
    setters[key] = (x) => {
      $STATE = x
      return $STATE
    }
  }
  const val = {
    ...scope,
    setters,
    dynamic: dynamicScope,
  }
  return val
})
