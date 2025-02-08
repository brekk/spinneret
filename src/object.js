export const getSignature = (x) => x.signature

export const toString = (x) => {
  const raw = Object.prototype.toString.call(x)
  if (typeof x === "function" && x.signature) {
    return `${x.name}(${x.length}) :: ${x.signature}`
  }
  return raw
}
