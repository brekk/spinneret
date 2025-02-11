import { times } from "ramda"
import { test, expect } from "vitest"
import Unusual from "unusual"

import { getByTestId } from "@testing-library/dom"
import { mount, tag, tagWithScope, svgTag, svg } from "@/dom"
import { styledTag, base } from "@/decorators/styled"

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

test("spin", () => {
  const container = mount(rawtag([svgTag("huh")]))
  const rendered = getByTestId(container, "yoyoyo")
  expect(rendered).toHaveTextContent("⧗createElementOfNamespace")
  const stag = base("Spin")
  const container2 = mount(stag("em", { em: "test" }, "this is an output"))
  expect(container2.outerHTML).toEqual(
    `<div><em class="Spin__test">this is an output</em></div>`,
  )
  const ejectable = tagWithScope(
    { eject: { check: () => true, process: () => "ejected!" } },
    "details",
    {},
    "oh hey",
  )
  expect(ejectable).toEqual("ejected!")
  const finalized = tagWithScope(
    {
      configure: ({ ...raw }) => ({
        ...raw,
        props: { ...raw.props, className: "pew" + raw.props.className },
        kind: "em",
      }),
      // bad effects
      effects: [false],
      post: (z) => z.outerHTML,
    },
    "div",
    { className: "pew" },
    ["pew2furious"],
  )
  expect(finalized).toEqual(`<em class="pewpew">pew2furious</em>`)
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
