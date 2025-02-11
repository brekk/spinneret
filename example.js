import blem from "blem"
import {
  range,
  equals,
  lt,
  gt,
  both,
  append,
  cond,
  identity,
  complement,
  transduce,
  reduced,
  filter,
  reject,
  reduce,
  pipe,
  map,
} from "ramda"
import { setupCounter } from "@/counter"
import { toString } from "@/object"
import { tag, svg, svgTag, tagWithScope } from "@/dom"
import Debug from "@/components/Debug"
import Code from "@/components/Code"
import Disclosable from "@/components/Disclosable"
import Heading from "@/components/Heading"
import Flex from "@/components/Flex"
import Logo from "@/components/LogoWithSpider"
import Section from "@/components/Section"
import { inscribe, $ } from "@/function"
import { slugify } from "@/string"
import * as transform from "@/transform"
import { styled, base } from "@/decorators/styled"
import { safeStringify } from "@/json"
import { literalTag, literalSvg, literalWithScope } from "@/decorators/literal"

import { forExample } from "@/components/Example"

import "./page.scss"

const bem = blem("App")
const stag = base("App")
const [div, header] = map(stag, ["div", "header"])

const para = stag("p", { em: "paragraph" })

const transducer = map((x) => console.log("transduce!", x) || Math.floor(x * 2))
const iter = (agg, x) => {
  console.log("iter!", x)
  if (x > 28) {
    return reduced(agg)
  }
  return append(x, agg)
}
const initial = []
const arr = range(10, 30)

const value = transduce(transducer, iter, initial, arr)

// LET'S LEARN TRANSDUCE!
const TransduceExercise = Section(
  { title: "Learning how transduce works", className: bem("section") },
  [
    para(
      `Ok, I will now attempt to learn about transduce over my lunch break.`,
    ),
    Code(
      {
        id: "transduce-one",
        className: bem("transduce", ["example", "one"]),
      },
      [
        `const transducer = identity
const iter = (agg, x) => [...agg, x]
const initial = []
const arr = range(10, 30)

const value = transduce(
  transducer,
  iter,
  initial,
  arr
)\n\n`,
        safeStringify(value),
      ],
    ),
    stag("p", { em: "para" }, [
      stag("code", { em: "code-inline" }, "transduce"),
      stag(
        "span",
        { em: "text" },
        "provides a way to separate out iteration from transformation.",
      ),
    ]),
  ],
)

const DebugAndDisclose = Section(
  { title: "Debug and Disclosable", className: bem("section") },
  [
    para(
      "This is a reusable debugging component, it simply prints whatever props it is given",
    ),
    Debug({ cool: { nice: { great: { job: { yes: true } } } } }),
    para([
      "This is a disclosable component, and it's written in a way where we can apply the values",
      " we need, but because things are curried, you can apply the values separately as well.",
    ]),
    Disclosable({}, [
      tag("span", { className: "divvular" }, "totally divular!"),
      tag("strong", {}, "whoa"),
    ]),
    "We can mix Debug and Disclosable",
    Disclosable({}, [
      tag("strong", {}, "Click to debug!"),
      Debug({
        className: bem("debug-disclose"),
        this: { is: { detailed: { cool: { data: "so there" } } } },
      }),
    ]),
  ],
)
const FPIsCool = Section({ title: "FP is cool", className: bem("section") }, [
  para("Here's an example of why FP is awesome"),
  Code(
    { className: "example" },
    literalTag(
      "ul",
      { className: bem("list") },
      map(literalTag("li", { className: bem("list-item") }), [
        "alpha",
        "beta",
        "gamma",
      ]),
    ),
  ),
  para("This is identical to the longer to express form:"),
  Code({ className: "example" }, [
    literalTag("ul", { important: true, className: bem("list") }, [
      literalTag("li", { className: bem("list-item") }, "alpha"),
      literalTag("li", { className: bem("list-item") }, "beta"),
      literalTag("li", { className: bem("list-item") }, "gamma"),
      // this currently fails, it'd be cool to have this work
      //li({ important: true, className: bem("list-item") }, "delta"),
    ]),
  ]),
  para(
    "NB: We're working on our literal render, which renders both of the above as the same, which proves the point, but in a roundabout way. Both examples above will render this:",
  ),
  tagWithScope(
    { post: (x) => x.outerHTML },
    "ul",
    { className: bem("list") },
    map(tag("li", { className: bem("list-item") }), ["alpha", "beta", "gamma"]),
  ),
])

const App = stag("main", { em: "" }, [
  header({ className: bem("header") }, [
    Logo,
    Flex({ className: bem("header-content") }, []),
  ]),
  Section({ title: "Examples", className: bem("section") }, [
    para(
      "Here we can see some simple examples that frame how to use Spinneret effectively",
    ),
    stag(
      "ul",
      { em: "toc" },
      map(
        pipe(
          (x) => stag("a", { em: "toc-link", href: "#" + slugify(x) }, x),
          stag("li", { em: "toc-item" }),
        ),
        ["Debug and Disclosable", "FP is cool"],
      ),
    ),
  ]),
  DebugAndDisclose,
  FPIsCool,
  TransduceExercise,
])

document.querySelector("#app").append(App)
// document.querySelector("#app").innerHTML = App.outerHTML

//setupCounter(document.querySelector("#counter"))
