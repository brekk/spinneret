import { Debug } from "@/components/Debug"
import { mount } from "@/document"
import { test, expect } from "vitest"

test("Debug", () => {
  expect(mount(Debug({ cool: { nested: { data: { rules: "yes" } } } }))).toHaveTextContent("")
})
