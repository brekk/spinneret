const Debug = (x) => tag("pre", {}, [tag("code", {}, safeStringify(x))])
import { svgTag, tag, svg } from "@/dom"
import { inscribe } from "@/function"
import { safeStringify } from "@/json"

//*

// EXAMPLE USAGE:
window.onload = () => {
  const shapes = document.getElementById("shapes")
  const App = tag("main", {}, [
    Debug({ cool: { nice: { great: { job: { yes: true } } } } }),
    svg(
      {
        className: "polygonical",
      },
      [
        svgTag(
          "polygon",
          {
            points: "0,0 500,0 250,400",
            style: `fill:red;stroke:black;stroke-width:3;`,
          },
          [],
        ),
      ],
    ),
  ])

  shapes.append(App)
}
