import { identity, times, pipe, map } from "ramda"
import Unusual from "unusual"

import blem from "blem"
import {
  trace,
  handleForm,
  inscribe,
  spin,
  $,
  slugify,
  processChildren,
  makeSelector,
} from "@/spinneret"
import Spinneret from "@/spinneret"

// console.log("SPINNERET", Spinneret, Object.keys(Spinneret));

const { decorators } = Spinneret

// const tag = decorators.styled.base("App")

const { styled, state } = decorators
const { withScope: styledWithScope } = styled
const { withState } = state

const bem = blem("App")

const xyz = (scope, parent, child) => {
  if (parent?.attributes?.id === "counter") {
    console.log("YOYOYOYO", parent, child)
  }
  parent.append(processChildren(child))
}

const stagWithScope = inscribe("styledWithBemAndState", (s, t, p, k) =>
  pipe(
    //////
    styledWithScope(bem),
    ////////
    withState(["section", 0]),
    spin($, t, p, k),
  )({ ...s, onChild: xyz }),
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
    (prev, el, actions) => {
      console.log("Object!", JSON.stringify(prev, null, 2))
      const propObj = typeof prev.props !== "function"
      return {
        ...(propObj ? prev.props : {}),
        ["data-testid"]: kids,
        em: ["button", "counter"],
        onClick: onClick(prev),
      }
    },
    kids,
  )

const App = () =>
  tag("main", { em: "" }, [
    nav(["uno", "dos", "tres", "cuatro", "cinco"]),
    button(
      (prev) => (e) => {
        e.preventDefault()
        const prior = parseInt(prev?.scope?.dynamic?.section ?? "0")
        const next = prior - 1
        console.log(
          "CLICKO, YOU SICKO",
          prev?.scope?.dynamic?.section,
          "<><>",
          prior,
          "@>",
          next,
        )
        const set = prev?.scope?.setters?.section ?? identity
        set(next)
        pipe(sel, (x) => {
          if (x) {
            console.log("HHUH", x)
            x.innerText = next
          }
        })(["section"])
      },
      "down",
    ),
    tag(
      "span",
      { ["data-testid"]: "counter", id: "counter", em: "section" },
      "0",
    ),
    button(
      (prev) => (e) => {
        e.preventDefault()
        const prior = parseInt(prev.scope.dynamic.section)
        const next = prior + 1
        console.log(
          "TICKO, YOU PRICKO",
          prev?.scope?.dynamic?.section,
          "!>!>",
          prior,
          "<@",
          next,
        )
        prev.scope.setters.section(next)
        pipe(sel, (x) => {
          x.innerText = next
        })(["section"])
      },
      "up",
    ),
  ])

document.querySelector("#app").append(App())
