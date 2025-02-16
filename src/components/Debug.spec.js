import { test, expect } from "vitest"
import Debug from "@/components/Debug"
import { mount } from "@/dom"

test("Debug", () => {
  const container = mount(
    Debug({ cool: { nested: { data: { rules: "yes" } } } }),
  )
  expect(container.outerHTML).toEqual(
    `<div><pre class="Debug"><code class="Debug__code">{
  "cool": {
    "nested": {
      "data": {
        "rules": "yes"
      }
    }
  }
}</code></pre></div>`,
  )
})
