import { def, toString } from "@/object"
import { SYMBOL, MARKED } from "@/constants"

// NB: a number of functions here are full functions rather than arrow functions, this is done to try to improve the stacktrace
// downstream from these functions, functions should be automagically "named"

// ensure a function has a specific arity
export function arity(n, fn) {
  /* eslint-disable no-unused-vars */
  switch (n) {
    case 0:
      return function nullary() {
        return fn.apply(this, arguments)
      }
    case 1:
      return function unary(a0) {
        return fn.apply(this, arguments)
      }
    case 2:
      return function binary(a0, a1) {
        return fn.apply(this, arguments)
      }
    case 3:
      return function ternary(a0, a1, a2) {
        return fn.apply(this, arguments)
      }
    case 4:
      return function quaternary(a0, a1, a2, a3) {
        return fn.apply(this, arguments)
      }
    case 5:
      return function quinary(a0, a1, a2, a3, a4) {
        return fn.apply(this, arguments)
      }
    case 6:
      return function senary(a0, a1, a2, a3, a4, a5) {
        return fn.apply(this, arguments)
      }
    case 7:
      return function septenary(a0, a1, a2, a3, a4, a5, a6) {
        return fn.apply(this, arguments)
      }
    case 8:
      return function octonary(a0, a1, a2, a3, a4, a5, a6, a7) {
        return fn.apply(this, arguments)
      }
    case 9:
      return function nonary(a0, a1, a2, a3, a4, a5, a6, a7, a8) {
        return fn.apply(this, arguments)
      }
    case 10:
      return function denary(a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        return fn.apply(this, arguments)
      }
    default:
      throw new Error(
        "First argument to arity must be a non-negative integer no greater than ten",
      )
  }
}

// curry a function!
// now with a .toString and a Symbol.toStringTag hook!
// taken almost verbatim from ramda
export function schonfinkel(desc, len, received, fn) {
  return function finkeled() {
    let combined = []
    let argsIdx = 0
    let left = len
    let combinedIdx = 0
    let hasPlaceholder = false
    while (combinedIdx < received.length || argsIdx < arguments.length) {
      let result
      if (
        combinedIdx < received.length &&
        (!_isPlaceholder(received[combinedIdx]) || argsIdx >= arguments.length)
      ) {
        result = received[combinedIdx]
      } else {
        result = arguments[argsIdx]
        argsIdx += 1
      }
      combined[combinedIdx] = result
      if (!_isPlaceholder(result)) {
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
      const funk = arity(newLen, currywurst(desc, len, combined, fn))
      const st = () => desc + `(${newLen})`
      funk.toString = st
      def(funk, Symbol.toStringTag, {
        get: st,
      })
      def(funk, MARKED, {
        value: true,
        enumerable: true,
      })
      return funk
    }
  }
}

// call schonfinkel / curry and add a specific typographic marker (used for debugging / searching)
export function inscribe(msg, fn) {
  const len = fn.length
  const str = SYMBOL + " " + msg
  const inscribed = arity(len, schonfinkel(str, len, [], fn))
  if (!inscribed[MARKED]) {
    const st = () => str + `(${len})`
    inscribed.toString = st
    def(inscribed, Symbol.toStringTag, {
      get: st,
    })
    def(inscribed, "name", {
      value: msg,
    })
    return inscribed
  }
}

// compatible with ramda
export function isPlaceholder(a) {
  return a && typeof a === "object" && a["@@functional/placeholder"] === true
}

export default isPlaceholder
