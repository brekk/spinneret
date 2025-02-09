import Disclosable from "@/components/Disclosable"
import { mount } from "@/dom"
import { test, expect } from "vitest"

test("Disclosable", () => {
  const container = mount(
    Disclosable({ className: "cool" }, "title", "super-mega-details"),
  )
  expect(container.innerHTML).toEqual(
    `<details class="cool"><summary class="cool__summary">title</summary>super-mega-details</details>`,
  )
})
