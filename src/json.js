import { inscribe } from "@/function"

export const safeStringifyWithIndent = inscribe(
  "safeStringifyWithIndent",
  (indent, x) => {
    try {
      return JSON.stringify(x, null, indent)
    } catch (_) {
      return `{"invalid-json": true}`
    }
  },
)
export const safeStringify = safeStringifyWithIndent(2)
