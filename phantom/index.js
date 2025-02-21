import { spin } from "@/dom"
import { pipe } from "ramda"
import blem from "blem"
import { inscribe, $ } from "@/function"
import { styledTag } from "@/decorators/styled"
import { BASES } from "#/phantom/constants"
import CoverPage from "#/phantom/cover"
import TableOfContents from "#/phantom/table-of-contents"
import MapImage from "#/phantom/images/02.jpg"
import Ch01 from "#/phantom/chapter-01"
import Ch02 from "#/phantom/chapter-02"
import "#/phantom/style.scss"

const bem = blem(BASES.PH)

const tag = styledTag(bem)

const PhantomTollbooth = tag("div", { em: "" }, [
  CoverPage,
  TableOfContents,
  tag("img", { em: ["image", "map"], src: MapImage }, []),
  Ch01,
  Ch02,
])

export default PhantomTollbooth
