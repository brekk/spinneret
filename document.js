import { inscribe } from "@/function";

export const _attr = inscribe("createAttribute", (el, k, v) => {
  const a = document.createAttribute(k);
  a.value = v;
  el.setAttributeNode(a);
  return el;
});

export const attr = inscribe("createAttributeTuple", (el, [k, v]) =>
  // resilient™ to bad data
  k && v ? _attr(el, k, v) : el,
);

export const text = document.createTextNode.bind(document);

const dialect = inscribe(
  "createElementOfNamespace",
  function $__dialect(ns, kind, props, children) {
    try {
      const make =
        ns === NAMESPACES.XHTML
          ? (_k) => document.createElement(_k)
          : (_k) => document.createElementNS(ns, _k);
      const newEl = make(kind);

      const newContent =
        typeof children === "string" ? text(children) : children;

      if (children) {
        if (children instanceof Array) {
          // closure needed
          children.forEach(function appendChildToHelement(_kid) {
            try {
              const kid =
                typeof _kid === "function"
                  ? text(
                      `Unable to render function as node ${
                        _kid.toString() || "<???>"
                      }`,
                    )
                  : typeof _kid === "string"
                  ? text(_kid)
                  : _kid;

              newEl.appendChild(kid);
            } catch (e) {
              console.warn("Error rendering child", e);
              newEl.appendChild(text("Error rendering child: " + e.toString()));
            }
          });
        } else {
          newEl.appendChild(newContent);
        }
      }
      if (props) {
        pipe(
          Object.entries,
          map(([k, v]) => {
            if (k === "className") {
              return ["class", v];
            }
            return [k, v];
          }),
          forEach(attr(newEl)),
        )(props);
      }

      return newEl;
    } catch (e) {
      console.warn("Error rendering helement", e);
      return text("Error rendering helement");
    }
  },
);

const elx = dialect(NAMESPACES.XHTML);
const svgx = dialect(NAMESPACES.SVG);

const svg = inscribe(
  "svg",
  (
    { className, height = "500", width = "500", points, style, ...rest },
    children,
  ) =>
    svgx(
      "svg",
      {
        xmlns: NAMESPACES.SVG,
        height,
        width,
        className,
        ...rest,
      },
      children,
    ),
);
