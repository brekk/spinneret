//import { complextrace } from "envtrace"

//export const log = complextrace(`spinneret`, [
//  `help`,
//  `fn`,
//  `object`,
//  `verbose`,
//])

import { inscribe } from "@/function"

export const trace = inscribe("trace", (msg, x) => {
  console.log(msg, x)
  return x
})
