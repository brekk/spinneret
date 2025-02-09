import blem from "blem"
import { tag } from "@/dom"
import { inscribe } from "@/function"

const Disclosable = inscribe(
  "Disclosable",
  ({ className = "Disclosable" }, a, b) => {
    const bem = blem(className)
    return tag("details", { className: bem("") }, [
      tag("summary", { className: bem("summary") }, a),
      b,
    ])
  },
)

export default Disclosable
