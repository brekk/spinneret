import blem from "blem"
import { pipe, last } from "ramda"
import { inscribe } from "@/function"
import { trace } from "@/side-effect"

export const makeSelector = inscribe("queryConstructor", (bem, em) => {
  const sels = bem(...em).split(" ")
  const sel = last(sels)
  return "." + sel
})

export const selector = inscribe("querySelector", (bem, em) =>
  pipe(makeSelector(bem), document.querySelector)(em),
)
