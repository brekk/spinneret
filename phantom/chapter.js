import blem from "blem"
import { inscribe, $ } from "@/function"
import { map, pipe, replace } from "ramda"
import { styledTag } from "@/decorators/styled"
import { entities } from "#/phantom/shared"

const bem = blem("Chapter")
export const tag = styledTag(bem)
export const p = pipe(entities, tag("p", { em: "paragraph" }))
export const img = inscribe("image", (src, alt) =>
  tag("img", { em: "image", src, alt }, []),
)
