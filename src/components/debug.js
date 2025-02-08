import { elx } from "@/document.js"
import { safeStringify } from "@/json.js"
export const Debug = (x) => elx("pre", {}, [elx("code", {}, safeStringify(x))])
