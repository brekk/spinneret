import { expect, test } from "vitest"
import { keys } from "ramda"
import * as Spinneret from "@/spinneret"

test("base exports", () => {
  expect(keys(Spinneret).sort()).toEqual([
    "$",
    "attr",
    "components",
    "getSignature",
    "inscribe",
    "isMarked",
    "isPlaceholder",
    "svg",
    "svgTag",
    "tag",
  ])
})
