import { test, expect } from "vitest"
import {
  getContextWithOptions,
  getContext,
  get2dContext,
  set,
  clearRect,
} from "@/canvas"

test("getContextWithOptions", () => {
  getContextWithOptions("blah", "test", {
    getContext: (a, b) => expect([a, b]).toEqual(["test", "blah"]),
  })
})

test("set", () => {
  expect(set("a", "b", {})).toEqual({ a: "b" })
})
