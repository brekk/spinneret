import { test, expect, vi } from "vitest"
import ElectricWeb from "@/event-system"

test("smoke test", () => {
  const e = ElectricWeb()
  const mock = vi.fn()
  expect(Object.keys(e)).toEqual(["on", "once", "off", "signal", "stop"])
  e.once("yo", (v) => expect(v).toEqual("hello there"))
  e.on("hey", mock)
  e.signal("yo", ["hello there"])
  // one
  e.signal("hey", ["hey"])

  expect(mock).toHaveBeenCalledWith("hey")
  // two
  e.signal("hey", ["what up"])
  expect(mock).toHaveBeenCalledWith("what up")
  e.off("hey", mock)
  // three
  e.signal("hey", ["what up"])
  expect(mock).toHaveBeenCalledTimes(3)
  e.stop()
})

test("autolisten", () => {
  const callable = vi.fn()
  const callableOnce = vi.fn()
  const e = ElectricWeb([["hey", callable]], [["yo", callableOnce]])
  e.signal("hey", ["dope"])
  e.signal("yo", ["yo"])
  e.signal("hey", ["ex"])
  e.signal("yo", ["not called again"])
  expect(callable).toHaveBeenCalledTimes(2)
  expect(callableOnce).toHaveBeenCalledTimes(1)
  e.stop()
})
