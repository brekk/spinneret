export const toString = (x) => Object.prototype.toString.call(x);

export const def = (what, as, suchThat) =>
  Object.defineProperty(what, as, suchThat);
