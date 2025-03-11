import Spinneret from "@/spinneret"
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

import { identity, times, pipe, map } from "ramda"
import { test, expect } from "vitest"
import Unusual from "unusual"

import {
  waitFor,
  render,
  screen,
  fireEvent,
  getByTestId,
} from "@testing-library/dom"
import { mount, nsFromString, htmlText, tag, svgTag, svg, spin } from "@/dom"
import blem from "blem"

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
        console.log("CLICKO, YOU SICKO", prev)
        e.preventDefault()
        const prior = parseInt(prev?.scope?.dynamic?.section ?? "0")
        const next = prior - 1
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
        prev.scope.setters.section(next)
        pipe(sel, (x) => {
          x.innerText = next
        })(["section"])
      },
      "up",
    ),
  ])

test("withState", async () => {
  const container = App()
  expect(container.outerHTML).toMatchSnapshot()
  const count = getByTestId(container, "counter")
  expect(count).toHaveTextContent(0)
  getByTestId(container, "down").click()

  await waitFor(() =>
    expect(getByTestId(container, "counter")).toHaveTextContent("-1"),
  )
  // getByTestId(container, "down")
})
/*
  const renderedPostDown = getByTestId(container, "counter")
  expect(renderedPostDown).toHaveTextContent("-1")
  fireEvent(
    getByTestId(container, "down"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    }),
  )
  const renderedPostDown2 = getByTestId(container, "counter")
  expect(renderedPostDown2).toHaveTextContent("-2")
  fireEvent(
    getByTestId(container, "up"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    }),
  )
})

/*
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
*/
