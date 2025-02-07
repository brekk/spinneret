const Debug = (x) => elx("pre", {}, [elx("code", {}, safeStringify(x))])
import { svgx, elx, svg } from "@/document"
import { inscribe } from "@/function"
import { safeStringify } from "@/json"

//*

// EXAMPLE USAGE:
window.onload = () => {
  const shapes = document.getElementById("shapes")
  const badKid = svgx("polygon", {
    points: "0,0 500,0 250,400",
    style: `fill:red;stroke:black;stroke-width:3;`,
  })
  /* test some shit */
  const nullary = inscribe("nullary dullary", function () {
    return "cool"
  })
  console.log("inscribe nullary", nullary.toString(), ">>>>", toString(nullary))
  const unary = inscribe("unary dairy", (x) => x * 2)
  console.log("inscribe unary", unary.toString(), ">>>>", toString(unary))
  const binary = inscribe("binary nary", (one, two) => two / one)
  console.log("inscribe binary", binary.toString(), ">>>>", toString(binary))
  console.log("badkid", badKid, toString(badKid), badKid.toString())
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

  shapes.appendChild(App)
}
