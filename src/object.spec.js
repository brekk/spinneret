import { test, expect } from "vitest"
import { toString } from "@/object"
import { inscribe } from "@/function"

test("toString", () => {
  const yo = inscribe("yo", (a, b, c) => a + b / c)
  expect(toString(yo)).toEqual("⧗yo(3) :: ? -> ? -> ?")
  expect(toString(yo(2))).toEqual("⧗yo(3) :: Number -> ? -> ?")
  expect(toString({})).toEqual("[object Object]")
})
