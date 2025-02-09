export const toString = (x) => {
  const raw = Object.prototype.toString.call(x)
  if (typeof x === "function") {
    const head = `${x.name}(${x.length})`
    return x.signature
      ? `${head} :: ${x.signature}`
      : head + " :: " + Array(x.length).fill("?").join(" -> ")
  }
  return raw
}
