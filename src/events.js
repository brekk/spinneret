import { inscribe } from "@/function"

export const listenTo = inscribe("listenTo", (name, fn, x) => {
  x.addEventListener(name, fn)
  return x
})

export const onClick = listenTo("click")

export const captureListeners = inscribe("listenToElement", (newEl, [k, v]) => {
  if (k === "onClick" && v) {
    onClick(v, newEl)
  }
  return [k, v]
})
