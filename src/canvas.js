import { inscribe } from "@/function"

export const getContextWithOptions = inscribe("getContext", (o, d, x) => {
  return x.getContext(d, o)
})
export const getContext = getContextWithOptions(undefined)
export const get2dContext = getContext("2d")

export const set = inscribe("set", (k, v, x) => {
  x[k] = v
  return x
})

export const clearRect = inscribe("clearRect", (ctx, x, y, w, h) =>
  ctx.clearRect(x, y, w, h),
)
