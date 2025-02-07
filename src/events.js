import { inscribe } from "@/function"

export const listenTo = inscribe("listenTo", (name, fn, x) => {
  x.addEventListener(name, fn)
  return x
})

export const onClick = listenTo("click")
export const onSubmit = listenTo("submit")

export const captureListeners = inscribe("listenToElement", (newEl, [k, v]) => {
  if (v) {
    if (k === "onClick") {
      onClick(v, newEl)
      return [k, null]
    } else if (k === "onSubmit") {
      onSubmit(v, newEl)
      return [k, null]
    }
  }
  return [k, v]
})
