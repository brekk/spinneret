const Debug = (x) => elx("pre", {}, [elx("code", {}, safeStringify(x))])
import { svgx, elx, svg } from "@/document"
import { inscribe } from "@/function"
import { safeStringify } from "@/json"

//*

// EXAMPLE USAGE:
window.onload = () => {
  const shapes = document.getElementById("shapes")
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
      ],
    ),
  ])

  shapes.append(App)
}
