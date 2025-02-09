import blem from "blem"
import { pipe, map } from "ramda"
import { setupCounter } from "@/counter"
import { toString } from "@/object"
import { tag, svg, svgTag } from "@/dom"
import { htmlTags } from "@/tag"
import Debug from "@/components/Debug"
import Disclosable from "@/components/Disclosable"
import Heading from "@/components/Heading"
import Flex from "@/components/Flex"
import Logo from "@/components/LogoWithSpider"
import Section from "@/components/Section"
import { inscribe, $ } from "@/function"
import { slugify } from "@/string"
import * as transform from "@/transform"
import { styled, base } from "@/style"

import "./page.scss"

const { div, header, ul, li, p } = htmlTags
const bem = blem("App")
const stag = base("App")

const para = stag("p", { em: "paragraph" })

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
    Disclosable(
      { className: "nice" },
      tag("span", { className: "divvular" }, "totally divular!"),
      tag("strong", {}, "whoa"),
    ),
    "We can mix Debug and Disclosable",
    Disclosable(
      { className: bem("toggle") },
      tag("strong", {}, "Click to debug!"),
      Debug({
        className: bem("debug-disclose"),
        this: { is: { detailed: { cool: { data: "so there" } } } },
      }),
    ),
  ],
)
const FPIsCool = Section({ title: "FP is cool", className: bem("section") }, [
  para("Here's an example of why FP is awesome"),
  ul(
    { className: bem("list") },
    map(li({ className: bem("list-item") }), ["alpha", "beta", "gamma"]),
  ),
  para("This is the same as this longer-to-express version:"),
  ul({ className: bem("list") }, [
    li({ className: bem("list-item") }, "alpha"),
    li({ className: bem("list-item") }, "beta"),
    li({ className: bem("list-item") }, "gamma"),
  ]),
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
      { em: "list" },
      map(
        pipe(
          (x) => stag("a", { em: "link", href: "#" + slugify(x) }, x),
          stag("li", { em: "list-item" }),
        ),
        ["Debug and Disclosable", "FP is cool"],
      ),
    ),
  ]),
  DebugAndDisclose,
  FPIsCool,
])

document.querySelector("#app").append(App)
// document.querySelector("#app").innerHTML = App.outerHTML

//setupCounter(document.querySelector("#counter"))
