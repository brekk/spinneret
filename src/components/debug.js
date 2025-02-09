import { tag } from "@/dom"
import { safeStringify } from "@/json"

export const Debug = (x) => tag("pre", {}, [tag("code", {}, safeStringify(x))])
