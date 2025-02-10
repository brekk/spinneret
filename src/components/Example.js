import { svgTag, tag } from "@/dom"
import { inscribe, $ } from "@/function"
import { base } from "@/decorators/styled"

export const forExample = inscribe(
  "forExample",
  ({ title, ...props }, [explanation, example, rendering]) => {
    const stag = base("Example")

    return stag("article", { em: "" }, [
      stag("strong", { em: "title" }, title),
      explanation,
      stag("pre", { em: "summary" }, [stag("code", { em: "code" }, example)]),
      stag("div", { em: "rendered" }, rendering),
    ])
  },
)
