import { tag } from "@/dom"
import { inscribe } from "@/function"

const Heading = inscribe("Heading", ({ as = "h1", ...rest }, children) =>
  tag(as, rest, children),
)

export default Heading
