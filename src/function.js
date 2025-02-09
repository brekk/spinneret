import { __, pipe, repeat, join } from "ramda"
import { SYMBOL, MARKED } from "@/constants"
import { capitalize } from "@/string"

export const $ = __

// NB: a number of functions here are full functions rather than
// arrow functions, this is done to try to improve the stacktrace
// downstream from these functions, functions should be automagically "named"

export const stamp = (x) =>
  Object.defineProperty(x, MARKED, {
    value: true,
    enumerable: true,
    writable: false,
    configurable: false,
  })

export const placeholderToString = (z) =>
  isPlaceholder(z) ? "__" : capitalize(typeof z)

// curry a function!
// now with a .toString and a Symbol.toStringTag hook!
// taken almost verbatim from ramda
export function schonfinkel(name, len, received, fn) {
  const FUN = function finkeled() {
    const argLen = arguments.length
    let combined = []
    let argsIdx = 0
    let left = len
    let combinedIdx = 0
    let hasPlaceholder = false
    while (combinedIdx < received.length || argsIdx < argLen) {
      let result
      if (
        combinedIdx < received.length &&
        (!isPlaceholder(received[combinedIdx]) || argsIdx >= argLen)
      ) {
        result = received[combinedIdx]
      } else {
        result = arguments[argsIdx]
        argsIdx += 1
      }
      combined[combinedIdx] = result
      if (!isPlaceholder(result)) {
        left -= 1
      } else {
        hasPlaceholder = true
      }
      combinedIdx += 1
    }
    if (!hasPlaceholder && left <= 0) {
      return fn.apply(this, combined)
    } else {
      const newLen = Math.max(0, left)
      const funk = schonfinkel(name, len, combined, fn)
      const _combined = combined.map(placeholderToString).join(" -> ")
      const remaining = pipe(repeat("?"), join(" -> "))(newLen)
      const signature = `${_combined} -> ${remaining}`
      const st = () => name
      funk.toString = st
      Object.defineProperty(funk, "name", {
        value: name,
      })
      Object.defineProperty(funk, Symbol.toStringTag, {
        get: st,
      })
      stamp(funk)
      Object.defineProperty(funk, "signature", {
        value: signature,
        enumerable: false,
        configurable: true,
        writable: false,
      })
      return funk
    }
  }
  Object.defineProperty(FUN, "name", {
    value: name,
  })
  Object.defineProperty(FUN, "length", {
    get: () => len,
  })
  stamp(FUN)
  return FUN
}

// call schonfinkel / curry and add a specific typographic marker (used for debugging / searching)
export function inscribe(msg, fn) {
  const len = fn.length
  const str = SYMBOL + msg
  const inscribed = schonfinkel(str, len, [], fn)
  return inscribed
}

// compatible with ramda
export function isPlaceholder(a) {
  return a && a["@@functional/placeholder"] === true
}

export const getSignature = (x) => x.signature

export const isMarked = (x) => x[MARKED]
