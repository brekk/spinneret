import { times } from "ramda"
import { test, expect } from "vitest"
import Unusual from "unusual"

import { getByTestId } from "@testing-library/dom"
import { mount, nsFromString, htmlText, tag, svgTag, svg, spin } from "@/dom"
import { NAMESPACES } from "@/constants"
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
  expect(rendered).toHaveTextContent("")
  const stag = base("Spin")
  const container2 = mount(stag("em", { em: "test" }, "this is an output"))
  expect(container2.outerHTML).toEqual(
    `<div><em class="Spin__test">this is an output</em></div>`,
  )
  const ejectable = spin(
    { eject: { check: () => true, process: () => "ejected!" } },
    "details",
    {},
    "oh hey",
  )
  expect(ejectable).toEqual("ejected!")
  const finalized = spin(
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

test("basic with function props", () => {
  const raw = mount(
    tag(
      "div",
      (x, el, actions) => {
        expect(x.children).toEqual("test")
        expect(x.kind).toEqual("div")
        expect(x.ns).toEqual(NAMESPACES.XHTML)
        expect(x.scope).toEqual({})
        expect(el.outerHTML).toEqual("<div>test</div>")
        expect(Object.keys(actions)).toEqual(["spin"])
        // expect(actions.redx().outerHTML).toEqual("")
        return { className: "test", "data-testid": "yoyoyo" }
      },
      "test",
    ),
  )
  const rendered = getByTestId(raw, "yoyoyo")
  expect(rendered).toHaveTextContent("test")
})

test("htmlText", () => {
  const raw = mount(
    tag("div", { "data-testid": "yoyoyo" }, htmlText("High &amp; Mighty")),
  )
  const rendered = getByTestId(raw, "yoyoyo")
  expect(rendered).toHaveTextContent("High & Mighty")
})

test("nsFromString", () => {
  expect(nsFromString("SVG")).toEqual(NAMESPACES.SVG)
  expect(nsFromString("HTML")).toEqual(NAMESPACES.XHTML)
})
