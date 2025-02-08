import { tag } from "@/document.js"
import { safeStringify } from "@/json.js"

export const Debug = (x) => tag("pre", {}, [tag("code", {}, safeStringify(x))])
