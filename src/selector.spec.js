import blem from "blem"
import { test, expect } from "vitest"
import { makeSelector } from "@/selector"
const bem = blem("test")

test("makeSelector", () => {
  expect(makeSelector(bem, ["yo", "cool"])).toEqual(".test__yo--cool")
})
