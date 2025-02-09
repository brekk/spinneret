import * as Spinneret from "@/spinneret"
import { expect, test } from "vitest"
import { keys } from "ramda"

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
