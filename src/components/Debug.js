import blem from "blem"
import { tag } from "@/dom"
import { safeStringify } from "@/json"

export default function Debug(x) {
  const bem = blem("Debug")
  return tag("pre", { className: bem("") }, [
    tag("code", { className: bem("code") }, safeStringify(x)),
  ])
}
