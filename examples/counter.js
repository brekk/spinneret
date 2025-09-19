import { identity, times, pipe, map } from "ramda"
import Unusual from "unusual"

import blem from "blem"
import {
  trace,
  handleForm,
  inscribe,
  spin,
  $,
  processChildren,
  string,
} from "@/spinneret"
import { styled } from "@/decorators"
import { makeSelector } from "@/selector"
const { slugify } = string

// console.log("SPINNERET", Spinneret, Object.keys(Spinneret));

// const tag = decorators.styled.base("App")

const { withScope: styledWithScope } = styled

const bem = blem("App")

const stagWithScope = inscribe("styledWithBemAndState", (s, t, p, k) =>
  pipe(styledWithScope(bem), spin($, t, p, k))(s),
)

const tag = stagWithScope({})

const nav = pipe(
  map(
    pipe(
      (z) => tag("a", { em: "link", href: "#" + slugify(z) }, z),
      tag("li", { em: "list-item" }),
    ),
  ),
  tag("ul", { em: "list" }),
)

const selector = inscribe("querySelector", (_bem, em) =>
  pipe(makeSelector(_bem), (x) => document.querySelector(x))(em),
)

const sel = selector(bem)

const button = (onClick, kids) =>
  tag(
    "button",
    {
      ["data-testid"]: kids,
      em: ["button", "counter"],
      onClick,
    },
    kids,
  )

const App = () => {
  let prior = 0
  const go = inscribe("clickcount", (fn, e) => {
    e.preventDefault()
    const next = fn(prior)
    prior = next
    pipe(sel, (x) => {
      if (x) {
        x.innerText = next
      }
    })(["section"])
  })
  return tag("main", { em: "" }, [
    nav(["uno", "dos", "tres", "cuatro", "cinco"]),
    button(
      go((z) => z - 1),
      "down",
    ),
    tag(
      "span",
      { ["data-testid"]: "counter", id: "counter", em: "section" },
      "0",
    ),
    button(
      go((z) => z + 1),
      "up",
    ),
  ])
}
document.querySelector("#app").append(App())
