import { pipe, map, join } from "ramda"
import blem from "blem"
import { inscribe, $ } from "@/function"
import { spin } from "@/dom"

export const withState = inscribe(
  "tagWithState",
  ([key, initial], scope, t, p, k) => {
    console.log("HOHO", { key, initial, scope })
    const stateHandler = (el) => el
    return spin(
      {
        ...scope,
        post: scope.post ? pipe(scope.post, stateHandler) : stateHandler,
      },
      t,
      p,
      k,
    )
  },
)
