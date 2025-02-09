import { inscribe } from "@/function"

export const xtrace = inscribe("trace", (fn, msg, x) => {
  fn(msg, x)
  return x
})

export const trace = xtrace(console.log)
