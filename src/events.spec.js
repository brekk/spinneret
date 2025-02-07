import { test, expect } from "vitest"
import { listenTo, onClick, onSubmit, captureListeners } from "@/events"

test("listenTo", () => {
  const fx = () => {}
  listenTo("me", fx, {
    addEventListener: (n, f) => {
      expect(n).toEqual("me")
      expect(f.name).toEqual("fx")
    },
  })
})

test("captureListeners", () => {
  const shim = { addEventListener: (a, b) => {} }
  expect(captureListeners(shim, ["onClick", () => {}])).toEqual([
    "onClick",
    null,
  ])
  expect(captureListeners(shim, ["onSubmit", () => {}])).toEqual([
    "onSubmit",
    null,
  ])
  const shout = () => "shout"
  expect(captureListeners(shim, ["onDance", shout])).toEqual(["onDance", shout])
})
