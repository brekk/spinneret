import { test, expect } from "vitest"

import { $, stamp, inscribe, isMarked, getSignature } from "@/function"

test("stamp", () => {
  const blah = { cool: "yes" }
  expect(isMarked(stamp(blah))).toBeTruthy()
})

test("inscribe", () => {
  const i = inscribe("wow", (a, b, c, d) => a + b + c / d)
  expect(i.name).toEqual("⧗wow")
  expect(i(2).signature).toEqual("Number -> ? -> ? -> ?")
  expect(i(2, $, 2).signature).toEqual("Number -> __ -> Number -> ? -> ?")
  expect(i(1, $, 3, 4)(2)).toEqual(3.75)
  expect(i(1, 2, 3, 4)).toEqual(3.75)
  expect(i($, $, 3, 4)(1, 2)).toEqual(3.75)
})

test("getSignature", () => {
  const signed = { signature: "hey" }
  expect(getSignature(signed)).toEqual("hey")
})
