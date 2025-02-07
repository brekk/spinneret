export const safeStringifyWithIndent = curry((indent, x) => {
  try {
    return JSON.stringify(x, null, indent);
  } catch (e) {
    console.warn("Error stringifying", e.toString());
    return `{"invalid-json": true}`;
  }
});
export const safeStringify = safeStringifyWithIndent(2);
