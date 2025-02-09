import { tag } from "@/dom"
import { safeStringify } from "@/json"
import blem from "blem"

export default function Debug(x) {
  const bem = blem("Debug")
  return tag("pre", { className: bem("") }, [
    tag("code", { className: bem("code") }, safeStringify(x)),
  ])
}
