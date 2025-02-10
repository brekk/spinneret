import blem from "blem"
import { tag } from "@/dom"
import { safeStringify } from "@/json"
import { base } from "@/decorators/styled"
import { inscribe } from "@/function"

export default inscribe("Code", ({ className = "Code", ...props }, kids) => {
  const stag = base(className)
  return stag("pre", { em: "", ...props }, [stag("code", { em: "code" }, kids)])
})
