import { tag } from "@/dom"
import { inscribed } from "@/function"

const Heading = inscribed("Heading", ({ as = "h1", ...rest }, children) =>
  tag(as, rest, children),
)

export default Heading
