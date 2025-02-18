import { pipe, map, join } from "ramda"
import blem from "blem"
import { inscribe, $ } from "@/function"
import { spin } from "@/dom"

export const withState = inscribe("tagWithState", ([key, initial], scope) => {
  if (!key) {
    return scope
  }
  let $STATE = initial

  const dynKey = {
    get: () => $STATE,
    set: (z) => {
      $STATE = z
      return $STATE
    },
  }
  const prevDyn = scope.dynamic || {}
  return {
    ...scope,
    dynamic: prevDyn[key]
      ? prevDyn
      : {
          ...prevDyn,
          [key]: dynKey,
        },
  }
})
