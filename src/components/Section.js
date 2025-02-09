import { tag } from "@/dom"
import { inscribe } from "@/function"
import { slugify } from "@/string"
import Heading from "@/components/Heading"

const Section = inscribe(
  "Section",
  ({ title, hLevel = "h1", ...rest }, kids) => {
    const id = slugify(title)
    return tag("section", { ...rest, id }, [
      tag(
        "a",
        { className: "head-link", href: "#" + id },
        Heading({ as: hLevel, className: "heading" }, title),
      ),
      tag("div", { className: "content" }, kids),
    ])
  },
)

export default Section
