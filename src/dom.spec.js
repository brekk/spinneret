import { times } from "ramda"
import { test, expect } from "vitest"
import Unusual from "unusual"

import { getByTestId } from "@testing-library/dom"
import { mount, tag, svgTag, svg } from "@/dom"

const rawtag = (raw) =>
  tag(
    "div",
    { invalid: undefined, className: "test", "data-testid": "yoyoyo" },
    [raw],
  )

const makeSVG = () =>
  svg(
    {
      "xml:space": "preserve",
      viewBox: "0 0 809 416",
      className: "logo",
      style: {
        "fill-rule": "evenodd",
        "clip-rule": "evenodd",
        "stroke-linejoin": "round",
        "stroke-miterlimit": 2,
      },
    },
    [
      svgTag(
        "path",
        {
          d: "",
        },
        [],
      ),
    ],
  )

test("tag", () => {
  const u = Unusual("test")
  const raw = times(
    () => u.pick("abcdefghijklmnopqrstuvwxyz".split("")),
    10,
  ).join("")
  const container = mount(rawtag(raw))

  const rendered = getByTestId(container, "yoyoyo")
  expect(rendered).toHaveTextContent(raw)
})

test("dialect", () => {
  const container = mount(rawtag([svgTag("huh")]))
  const rendered = getByTestId(container, "yoyoyo")
  expect(rendered).toHaveTextContent("⧗createElementOfNamespace")
})

test("svg", () => {
  const logo = mount(makeSVG())
  expect(logo.children.length).toEqual(1)
})
test("basic", () => {
  const raw = mount(
    tag("div", { className: "test", "data-testid": "yoyoyo" }, "test"),
  )
  const rendered = getByTestId(raw, "yoyoyo")
  expect(rendered).toHaveTextContent("test")
})
