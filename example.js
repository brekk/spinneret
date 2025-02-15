import blem from "blem"
import {
  mergeRight,
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
  prepend,
  filter,
  reject,
  reduce,
  objOf,
  pipe,
  map,
} from "ramda"
import { get2dContext, clearRect } from "@/canvas"
import { listenTo } from "@/events"
import { toString } from "@/object"
import { spin, tag, svg, svgTag } from "@/dom"
import Debug from "@/components/Debug"
import Code from "@/components/Code"
import Disclosable from "@/components/Disclosable"
import Heading from "@/components/Heading"
import Flex from "@/components/Flex"
import Logo from "@/components/LogoWithSpider"
import Section from "@/components/Section"
import { inscribe, $ } from "@/function"
import { slugify, prependString } from "@/string"
import * as transform from "@/transform"
import { styled, base } from "@/decorators/styled"
import { safeStringify } from "@/json"
import { trace } from "@/side-effect"
import { literalTag, literalSvg, literalWithScope } from "@/decorators/literal"

import { forExample } from "@/components/Example"

import "./page.scss"

const bem = blem("App")
const stag = base("App")
const [div, header, nav, ul, li, link, span] = map(stag, [
  "div",
  "header",
  "nav",
  "ul",
  "li",
  "a",
  "span",
])

const para = stag("p", { em: "paragraph" })

const actionCanvasWipe = (_) =>
  pipe(get2dContext, (x) =>
    clearRect(x, 0, 0, x.canvas.width, x.canvas.height),
  )(document.getElementById("canvas"))

const App = stag("main", { em: "" }, [
  header({ em: "header" }, [
    Logo,
    Flex(
      { em: "header-content" },
      ul(
        { em: "header-items" },
        map(([action, icon, onClick]) =>
          pipe(
            prependString("#"),
            objOf("href"),
            mergeRight({
              em: ["header-link", onClick ? "" : "disabled"],
              onClick,
            }),
            link($, [span({ em: "header-icon" }, icon), action]),
            li({ em: "header-item" }),
          )(action),
        )([
          ["new", "🆕", actionCanvasWipe],
          ["save", "💾"],
          ["load", "📂"],
          ["duplicate", "👬"],
        ]),
      ),
    ),
    stag(
      "canvas",
      { em: "canvas", width: "800", height: "600", id: "canvas" },
      [],
    ),
  ]),
])
window.onload = () => {
  const canvasEl = document.getElementById("canvas")
  const ctx = get2dContext(canvasEl)
  //ctx.imageSmoothingEnabled = false

  const cursor = { x: 0, y: 0 }

  const relativePoint = (e) => {
    const { offsetX: x, offsetY: y } = e
    //const x2 = (x * ctx.canvas.width) / ctx.canvas.clientWidth
    //const y2 = (y * ctx.canvas.height) / ctx.canvas.clientHeight
    //return { x: x2, y: y2 }
    return { x, y }
  }

  const onPosition = (event) => {
    console.log("EV", event)
    const { x, y } = event
    cursor.x = x
    cursor.y = y
  }

  const onResize = () => {}

  const onMove = (e) => {
    const { buttons } = e
    if (buttons !== 1) return

    const pos = relativePoint(e)
    console.log(">>>", cursor, pos)
    ctx.closePath()
    ctx.beginPath()
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.strokeStyle = "#000"
    console.log(">>>", ctx.canvas.offsetLeft, "<><", cursor, "@@@", e)
    ctx.moveTo(
      cursor.x,
      cursor.y,
      //(cursor.x * ctx.canvas.width) / ctx.canvas.clientWidth,
      //(cursor.y * ctx.canvas.height) / ctx.canvas.clientHeight,
      //cursor.x - ctx.canvas.offsetLeft / 2,
      //cursor.y - ctx.canvas.offsetTop / 2,
    )
    onPosition(pos)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    //ctx.endPath()
  }

  //listenTo("resize", onResize, window)
  listenTo("mousemove", onMove, canvasEl)
  listenTo("mousedown", onPosition, canvasEl)
  listenTo("mouseenter", onPosition, canvasEl)
}

document.querySelector("#app").append(App)
// document.querySelector("#app").innerHTML = App.outerHTML

//setupCounter(document.querySelector("#counter"))
