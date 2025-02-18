import { inscribe } from "@/function"
import blem from "blem"
import { pipe } from "ramda"
import { trace } from "@/side-effect"

const selector = inscribe("querySelector", (bem, em) => {
  const sel = bem(...em)
  const el = document.querySelector("." + sel)
  return el
})

export default selector
