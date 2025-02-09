import { tag } from "@/dom"
import { inscribe, $ } from "@/function"

const Flex = inscribe("Flex", ({ row = false, className, ...rest }, children) =>
  tag(
    "div",
    {
      className,
      style: {
        display: "flex",
        "flex-direction": row ? "row" : "column",
        ...rest.style,
      },
      ...rest,
    },
    children,
  ),
)

export default Flex
