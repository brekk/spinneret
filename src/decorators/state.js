import { pipe, map, join } from "ramda"
import blem from "blem"
import { inscribe, $ } from "@/function"
import { spin } from "@/dom"

export const withState = inscribe("tagWithState", ([key, initial], scope) => {
  console.log("HOHO", { key, initial, scope })
  const stateHandler = (el) => el
  return {
    ...scope,
    post: scope.post ? pipe(scope.post, stateHandler) : stateHandler,
  }
})
