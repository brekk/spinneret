import { setupCounter } from "@/counter.js"
import { toString } from "@/object"
import { elx, svg, svgx } from "@/document"
import { Debug } from "@/components/Debug"

const badKid = svgx("polygon", {
  points: "0,0 500,0 250,400",
  style: `fill:red;stroke:black;stroke-width:3;`,
})

const App = elx("main", {}, [
  Debug({ cool: { nice: { great: { job: { yes: true } } } } }),
  svg(
    {
      className: "polygonical",
    },
    [
      svgx(
        "polygon",
        {
          points: "0,425 500,425 250,0",
          fill: "red",
          stroke: "black",
          "stroke-width": 3,
        },
        [],
      ),
    ],
  ),
])

document.querySelector("#app").append(App)
//document.querySelector("#app").innerHTML = toString(App)

//setupCounter(document.querySelector("#counter"))
