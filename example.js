import blem from "blem"
import {
  always,
  pipe,
  includes,
  split,
  ifElse,
  when,
  join,
  map,
  last,
  replace,
  slice,
  indexOf,
} from "ramda"
import { base } from "@/decorators/styled"
import { slugify } from "@/string"
import { spin } from "@/dom"
import { trace } from "@/side-effect"
import Logo from "@/spider"
import { literalTag } from "@/decorators/literal"
import "./example.scss"

const tag = base("Spinneret")

const Section = (title, children) => {
  const header = tag("h2", { em: "section-heading" }, title)
  return tag(
    "section",
    { em: ["section", "motivation"], id: slugify(title) },
    Array.isArray(children) ? [header, ...children] : [header, children],
  )
}

const span = tag("span", { em: "text" })

const p = tag("p", { em: "paragraph" })
const code = tag("code", { em: ["code", "inline"] })

const br = () => tag("br", {}, [])
const localLink = (k) => tag("a", { href: "#" + slugify(k) }, k)
const Example = (title, description, rawCode, rendered) =>
  tag(
    "figure",
    {
      em: ["figure", "code"],
      title: description,
      id: "example-" + slugify(title),
    },
    [
      tag("div", { em: "example-wrapper" }, [
        tag(
          "pre",
          { em: ["example", "code"] },
          tag("code", { em: ["code", "multiline"] }, rawCode),
        ),
        tag("div", { em: "render-wrapper" }, rendered),
      ]),
      tag("figcaption", { em: ["caption", "code"] }, description),
    ],
  )

const exampleCodeAsString = (fn) => {
  const fun = fn.toString().slice(`() => `.length)
  const hasNoNewlines = includes("\n", fun)
  if (!hasNoNewlines) {
    return fun
  }
  const hasCurlies = fun.trim().startsWith("{")
  const parts = pipe(
    when(always(hasCurlies), (z) => slice(z.indexOf("{") + 1, Infinity, z)),
    split("\n"),
    map(
      pipe(
        replace(/\s{8}/, "    "),
        replace(/\s{4}/, "  "),
        replace(/;$/g, ""),
      ),
    ),
    (pz) => {
      const z = last(pz)
      return [...pz.slice(0, -1), z.trim()]
    },
    join("\n"),
    when(always(hasCurlies), (z) => z.slice(0, z.lastIndexOf("}"))),
    (z) => z + "\n",
  )(fun.trim())
  return parts
}

const Pen = (id, description, exampleFn) =>
  tag("div", { em: ["pen", id] }, [
    Example(id, description, exampleCodeAsString(exampleFn), exampleFn()),
  ])

const LINKS = {
  motivation: "Motivation",
  usage: "Usage",
  explanation: "Explanation",
  domChildrenAreIndependentArguments: `children and props are independent`,
}

const EXAMPLES = {
  spinBasic: () => spin({}, "div", { className: "info" }, ["Hello, web"]),
  list:
    /////////////////////
    () =>
      tag(
        "ul",
        { className: "example-list" },
        ["alpha", "beta", "gamma", "delta"]
          .map(tag("a", { href: "#" }))
          .map(tag("li", {})),
      ),
  listWithNamedMorphism: () => {
    const liA = pipe(tag("a", { href: "#" }), tag("li", {}))
    return tag(
      "ul",
      { className: "example-list" },
      map(liA, ["alpha", "beta", "gamma", "delta"]),
    )
  },

  tacitListWithNamedMorphism: () => {
    const exampleList = pipe(
      map(pipe(tag("a", { href: "#" }), tag("li", {}))),
      tag("ul", { className: "example-list" }),
    )
    return exampleList(["alpha", "beta", "gamma", "delta"])
  },
}

const SpinneretHomePage = tag("main", { em: "" }, [
  tag("header", { em: "header" }, Logo),
  tag(
    "nav",
    { em: "nav" },
    tag(
      "ul",
      { em: "nav-items" },
      map(pipe(localLink, tag("li", { href: "nav-item" })))([
        LINKS.motivation,
        LINKS.usage,
        LINKS.explanation,
        "See More",
      ]),
    ),
  ),
  Section("Motivation", [
    p([
      `Spinneret is an attempt at creating a simple web framework that is largely a functional wrapper around native DOM behavior. It uses easy-to-reason-about patterns to make simple and reusable building blocks to construct a webpage with. It is performant, accessible and has a tiny footprint (20k gzipped). This page is created entirely with Spinneret, see the source code `,
      tag(
        "a",
        {
          em: "source",
          href: "https://github.com/brekk/spinneret/blob/main/example.js",
        },
        "directly",
      ),
      " and follow along with the examples below.",
    ]),
    p([
      span(`If you're familiar with React, it uses a basic formula of `),
      code(`(props) => view`),
      span(
        ` for its general pattern. Props are the only input, and it returns something that represents a view (but is secretly a much more complicated reactive object).`,
      ),
    ]),
    p(
      `This is a perfectly fine paradigm, but I wanted to do more to make things easier to slice apart functionally. I'll illustrate this further down below.`,
    ),
    p([
      span(`Spinneret views have a basic formula of `),
      code(`(scope, tagName, props, children) => view`),
      span(` where `),
      code("view"),
      span(` is fundamentally`),
      tag(
        "a",
        { href: "#fundamentally-dom-nodes", em: ["footnote", "asterisk"] },
        "*",
      ),
      span(
        ` a DOM node. Additionally, all exported functions of Spinneret are curried. Here's a dead-simple example in code:`,
      ),
    ]),
    Pen(
      "first-example-on-page",
      [span("Calling "), code("spin"), " for the first time"],
      EXAMPLES.spinBasic,
    ),
    p(
      `Now, clearly the basic formula is more complicated for Spinneret, but it also affords some really elegant patterns, while eschewing some of the complexity that more popular frameworks come with.`,
    ),
  ]),
  Section("Explanation", [
    p([
      `Let's break down what those are and walk through each part of the `,
      code(`spin`),
      ` function does in depth.`,
    ]),
    tag(
      "ul",
      { em: "spin-breakdown" },
      map(pipe(localLink, tag("li", { em: "pattern" })))([
        LINKS.domChildrenAreIndependentArguments,
      ]),
    ),
  ]),
  Section(LINKS.domChildrenAreIndependentArguments, [
    p([
      code(`props`),
      " and ",
      code(`children`),
      " are independent from one another, and that's intentional.",
    ]),
    p([
      "This allows us to use partially-applied functions to trivially ",
      code(`map`),
      " across the values. ",
      "As ",
      code(`children`),
      " are resolved before the parent node, this eschews any of the &ldquo;reactive&rdquo; patterns that other view libraries use.",
      " Reactivity is still possible in Spinneret, but it is opt-in. This makes reasoning about ",
      tag("em", {}, "most"),
      " things in the ecosystem much easier.",
      br(),
      br(),
      " Each of the next three examples are identical in output:",
    ]),
    Pen(
      "list-transformation",
      "Transform a list of strings into a list of wrapped DOM nodes",
      EXAMPLES.list,
    ),
    p([
      "Additionally, because all of the functions of Spinneret are curried, we can name the above function simply, and reuse it as needed.",
    ]),
    Pen(
      "list-transformation-with-named-morphism",
      "Transform a list of strings into a list of wrapped DOM nodes, using a named function",
      EXAMPLES.listWithNamedMorphism,
    ),
    p([
      "And because curried functions support composition so well, we can rearrange this to be fully tacit as well:",
    ]),
    Pen(
      "tacit-list-transformation-with-named-morphism",
      "Convert everything to a pipe",
      EXAMPLES.tacitListWithNamedMorphism,
    ),
  ]),
])

document.querySelector("#app").append(SpinneretHomePage)

window.onload = () => {}
