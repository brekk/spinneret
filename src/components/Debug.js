import blem from "blem"
import { tag } from "@/dom"
import { safeStringify } from "@/json"
import { base } from "@/decorators/styled"

export default function Debug(x) {
  const stag = base("Debug")
  return stag("pre", { em: "" }, [
    stag("code", { em: "code" }, safeStringify(x)),
  ])
}
