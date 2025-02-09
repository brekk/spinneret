import { test, expect } from "vitest"
import { safeStringify } from "@/json"

test("safeStringify", () => {
  const two = { a: { b: { c: { d: "yo" } } } }
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
