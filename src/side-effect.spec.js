import { vi, test, expect } from "vitest"
import { xtrace } from "@/side-effect"

test("xtrace", () => {
  const mock = vi.fn()
  const testlog = xtrace(mock)
  expect(testlog("yo", "huh")).toEqual("huh")
  expect(mock).toHaveBeenCalledWith("yo", "huh")
})
