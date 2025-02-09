import { htmlTags } from "@/tag"
import { inscribe } from "@/function"
import { slugify } from "@/string"
import Heading from "@/components/Heading"

const Section = inscribe("Section", ({ title, hLevel = "h1", ...rest }, kids) =>
  htmlTags.section({ ...rest, id: slugify(title) }, [
    Heading({ as: hLevel }, title),
    ...kids,
  ]),
)

export default Section
