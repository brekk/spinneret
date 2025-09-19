import { expect, test } from "vitest"
import { keys } from "ramda"
import Spinneret from "@/spinneret"
import * as raw from "@/spinneret"

test("default import", () => {
  expect(keys(Spinneret).sort()).toEqual([])
})

test("wildcard import", () => {
  expect(keys(raw).sort()).toEqual([
    "$",
    "attr",
    "constants",
    "createElementNS",
    "events",
    "htmlText",
    "inscribe",
    "json",
    "mount",
    "nsFromString",
    "object",
    "processChildren",
    "remapAttribute",
    "selector",
    "spin",
    "string",
    "styleAttr",
    "svg",
    "svgTag",
    "tag",
    "text",
    "textify",
    "trace",
    "transform",
    "xtrace",
  ])
})
