import { setupCounter } from "./counter.js"
import { elx, svg, svgx } from "./document.js"
import { Debug } from "./components/Debug"

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
          points: "0,0 500,0 250,400",
          style: `fill:red;stroke:black;stroke-width:3;`,
        },
        [],
      ),
      // this should fail in some way or use toString to make it clear it's wrong (missing children)
      badKid,
    ],
  ),
])

document.querySelector("#app").appendChild(App)

//setupCounter(document.querySelector("#counter"))
