import { makeSelector } from "@/selector"
import blem from "blem"
const bem = blem("test")

import { test, expect } from "vitest"

test("makeSelector", () => {
  expect(makeSelector(bem, ["yo", "cool"])).toEqual(".test__yo--cool")
})
