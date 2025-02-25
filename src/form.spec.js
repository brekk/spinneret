import { test, expect } from "vitest"
import { formValues, handleForm } from "@/form"

test("handleForm", () => {
  const SHIM_ELEMENT = {
    preventDefault: () => {},
    target: {
      elements: [
        { name: "a", value: "one" },
        { name: "b", value: "two" },
        { name: "c", value: false },
        { name: "d", value: "three" },
      ],
    },
  }
  expect(handleForm(SHIM_ELEMENT)).toEqual({
    a: "one",
    b: "two",
    d: "three",
  })
})
