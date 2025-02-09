import { safeStringify } from "@/json"
import { test, expect } from "vitest"

test("safeStringify", () => {
  const two = { a: { b: { c: { d: "yo" } } } }
  const one = { two }
  const three = { two: { ...two, two } }
  three.three = three
  expect(safeStringify(two)).toEqual(`{
  "a": {
    "b": {
      "c": {
        "d": "yo"
      }
    }
  }
}`)
  expect(safeStringify(three)).toEqual('{"invalid-json": true}')
})
