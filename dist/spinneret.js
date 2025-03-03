const jt = (t) => Array.isArray(t) ? t : [t], _t = {
  "@@functional/placeholder": !0
};
function p(t) {
  return t != null && typeof t == "object" && t["@@functional/placeholder"] === !0;
}
function m(t) {
  return function e(r) {
    return arguments.length === 0 || p(r) ? e : t.apply(this, arguments);
  };
}
function h(t) {
  return function e(r, n) {
    switch (arguments.length) {
      case 0:
        return e;
      case 1:
        return p(r) ? e : m(function(u) {
          return t(r, u);
        });
      default:
        return p(r) && p(n) ? e : p(r) ? m(function(u) {
          return t(u, n);
        }) : p(n) ? m(function(u) {
          return t(r, u);
        }) : t(r, n);
    }
  };
}
function F(t, e) {
  switch (t) {
    case 0:
      return function() {
        return e.apply(this, arguments);
      };
    case 1:
      return function(r) {
        return e.apply(this, arguments);
      };
    case 2:
      return function(r, n) {
        return e.apply(this, arguments);
      };
    case 3:
      return function(r, n, u) {
        return e.apply(this, arguments);
      };
    case 4:
      return function(r, n, u, a) {
        return e.apply(this, arguments);
      };
    case 5:
      return function(r, n, u, a, i) {
        return e.apply(this, arguments);
      };
    case 6:
      return function(r, n, u, a, i, o) {
        return e.apply(this, arguments);
      };
    case 7:
      return function(r, n, u, a, i, o, s) {
        return e.apply(this, arguments);
      };
    case 8:
      return function(r, n, u, a, i, o, s, l) {
        return e.apply(this, arguments);
      };
    case 9:
      return function(r, n, u, a, i, o, s, l, j) {
        return e.apply(this, arguments);
      };
    case 10:
      return function(r, n, u, a, i, o, s, l, j, f) {
        return e.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}
function Ke(t, e, r) {
  return function() {
    for (var n = [], u = 0, a = t, i = 0, o = !1; i < e.length || u < arguments.length; ) {
      var s;
      i < e.length && (!p(e[i]) || u >= arguments.length) ? s = e[i] : (s = arguments[u], u += 1), n[i] = s, p(s) ? o = !0 : a -= 1, i += 1;
    }
    return !o && a <= 0 ? r.apply(this, n) : F(Math.max(0, a), Ke(t, n, r));
  };
}
var H = /* @__PURE__ */ h(function(e, r) {
  return e === 1 ? m(r) : F(e, Ke(e, [], r));
});
function L(t) {
  return function e(r, n, u) {
    switch (arguments.length) {
      case 0:
        return e;
      case 1:
        return p(r) ? e : h(function(a, i) {
          return t(r, a, i);
        });
      case 2:
        return p(r) && p(n) ? e : p(r) ? h(function(a, i) {
          return t(a, n, i);
        }) : p(n) ? h(function(a, i) {
          return t(r, a, i);
        }) : m(function(a) {
          return t(r, n, a);
        });
      default:
        return p(r) && p(n) && p(u) ? e : p(r) && p(n) ? h(function(a, i) {
          return t(a, i, u);
        }) : p(r) && p(u) ? h(function(a, i) {
          return t(a, n, i);
        }) : p(n) && p(u) ? h(function(a, i) {
          return t(r, a, i);
        }) : p(r) ? m(function(a) {
          return t(a, n, u);
        }) : p(n) ? m(function(a) {
          return t(r, a, u);
        }) : p(u) ? m(function(a) {
          return t(r, n, a);
        }) : t(r, n, u);
    }
  };
}
const ge = Array.isArray || function(e) {
  return e != null && e.length >= 0 && Object.prototype.toString.call(e) === "[object Array]";
};
function bt(t) {
  return t != null && typeof t["@@transducer/step"] == "function";
}
function Ye(t, e, r) {
  return function() {
    if (arguments.length === 0)
      return r();
    var n = arguments[arguments.length - 1];
    if (!ge(n)) {
      for (var u = 0; u < t.length; ) {
        if (typeof n[t[u]] == "function")
          return n[t[u]].apply(n, Array.prototype.slice.call(arguments, 0, -1));
        u += 1;
      }
      if (bt(n)) {
        var a = e.apply(null, Array.prototype.slice.call(arguments, 0, -1));
        return a(n);
      }
    }
    return r.apply(this, arguments);
  };
}
const z = {
  init: function() {
    return this.xf["@@transducer/init"]();
  },
  result: function(t) {
    return this.xf["@@transducer/result"](t);
  }
};
function Ee(t) {
  for (var e = [], r; !(r = t.next()).done; )
    e.push(r.value);
  return e;
}
function Me(t, e, r) {
  for (var n = 0, u = r.length; n < u; ) {
    if (t(e, r[n]))
      return !0;
    n += 1;
  }
  return !1;
}
function Ot(t) {
  var e = String(t).match(/^function (\w*)/);
  return e == null ? "" : e[1];
}
function X(t, e) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function At(t, e) {
  return t === e ? t !== 0 || 1 / t === 1 / e : t !== t && e !== e;
}
const x = typeof Object.is == "function" ? Object.is : At;
var Te = Object.prototype.toString, $t = /* @__PURE__ */ function() {
  return Te.call(arguments) === "[object Arguments]" ? function(e) {
    return Te.call(e) === "[object Arguments]";
  } : function(e) {
    return X("callee", e);
  };
}(), Et = !/* @__PURE__ */ {
  toString: null
}.propertyIsEnumerable("toString"), qe = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"], Ce = /* @__PURE__ */ function() {
  return arguments.propertyIsEnumerable("length");
}(), Mt = function(e, r) {
  for (var n = 0; n < e.length; ) {
    if (e[n] === r)
      return !0;
    n += 1;
  }
  return !1;
}, $ = /* @__PURE__ */ m(typeof Object.keys == "function" && !Ce ? function(e) {
  return Object(e) !== e ? [] : Object.keys(e);
} : function(e) {
  if (Object(e) !== e)
    return [];
  var r, n, u = [], a = Ce && $t(e);
  for (r in e)
    X(r, e) && (!a || r !== "length") && (u[u.length] = r);
  if (Et)
    for (n = qe.length - 1; n >= 0; )
      r = qe[n], X(r, e) && !Mt(u, r) && (u[u.length] = r), n -= 1;
  return u;
}), Ie = /* @__PURE__ */ m(function(e) {
  return e === null ? "Null" : e === void 0 ? "Undefined" : Object.prototype.toString.call(e).slice(8, -1);
});
function Ne(t, e, r, n) {
  var u = Ee(t), a = Ee(e);
  function i(o, s) {
    return ye(o, s, r.slice(), n.slice());
  }
  return !Me(function(o, s) {
    return !Me(i, s, o);
  }, a, u);
}
function ye(t, e, r, n) {
  if (x(t, e))
    return !0;
  var u = Ie(t);
  if (u !== Ie(e))
    return !1;
  if (typeof t["fantasy-land/equals"] == "function" || typeof e["fantasy-land/equals"] == "function")
    return typeof t["fantasy-land/equals"] == "function" && t["fantasy-land/equals"](e) && typeof e["fantasy-land/equals"] == "function" && e["fantasy-land/equals"](t);
  if (typeof t.equals == "function" || typeof e.equals == "function")
    return typeof t.equals == "function" && t.equals(e) && typeof e.equals == "function" && e.equals(t);
  switch (u) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof t.constructor == "function" && Ot(t.constructor) === "Promise")
        return t === e;
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof t == typeof e && x(t.valueOf(), e.valueOf())))
        return !1;
      break;
    case "Date":
      if (!x(t.valueOf(), e.valueOf()))
        return !1;
      break;
    case "Error":
      return t.name === e.name && t.message === e.message;
    case "RegExp":
      if (!(t.source === e.source && t.global === e.global && t.ignoreCase === e.ignoreCase && t.multiline === e.multiline && t.sticky === e.sticky && t.unicode === e.unicode))
        return !1;
      break;
  }
  for (var a = r.length - 1; a >= 0; ) {
    if (r[a] === t)
      return n[a] === e;
    a -= 1;
  }
  switch (u) {
    case "Map":
      return t.size !== e.size ? !1 : Ne(t.entries(), e.entries(), r.concat([t]), n.concat([e]));
    case "Set":
      return t.size !== e.size ? !1 : Ne(t.values(), e.values(), r.concat([t]), n.concat([e]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return !1;
  }
  var i = $(t);
  if (i.length !== $(e).length)
    return !1;
  var o = r.concat([t]), s = n.concat([e]);
  for (a = i.length - 1; a >= 0; ) {
    var l = i[a];
    if (!(X(l, e) && ye(e[l], t[l], o, s)))
      return !1;
    a -= 1;
  }
  return !0;
}
var Je = /* @__PURE__ */ h(function(e, r) {
  return ye(e, r, [], []);
});
function Tt(t, e, r) {
  var n, u;
  if (typeof t.indexOf == "function")
    switch (typeof e) {
      case "number":
        if (e === 0) {
          for (n = 1 / e; r < t.length; ) {
            if (u = t[r], u === 0 && 1 / u === n)
              return r;
            r += 1;
          }
          return -1;
        } else if (e !== e) {
          for (; r < t.length; ) {
            if (u = t[r], typeof u == "number" && u !== u)
              return r;
            r += 1;
          }
          return -1;
        }
        return t.indexOf(e, r);
      // all these types can utilise Set
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return t.indexOf(e, r);
      case "object":
        if (e === null)
          return t.indexOf(e, r);
    }
  for (; r < t.length; ) {
    if (Je(t[r], e))
      return r;
    r += 1;
  }
  return -1;
}
function Qe(t, e) {
  return Tt(e, t, 0) >= 0;
}
function D(t, e) {
  for (var r = 0, n = e.length, u = Array(n); r < n; )
    u[r] = t(e[r]), r += 1;
  return u;
}
function ee(t) {
  var e = t.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
  return '"' + e.replace(/"/g, '\\"') + '"';
}
var C = function(e) {
  return (e < 10 ? "0" : "") + e;
}, qt = typeof Date.prototype.toISOString == "function" ? function(e) {
  return e.toISOString();
} : function(e) {
  return e.getUTCFullYear() + "-" + C(e.getUTCMonth() + 1) + "-" + C(e.getUTCDate()) + "T" + C(e.getUTCHours()) + ":" + C(e.getUTCMinutes()) + ":" + C(e.getUTCSeconds()) + "." + (e.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};
function Ct(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
function xe(t, e, r) {
  for (var n = 0, u = r.length; n < u; )
    e = t(e, r[n]), n += 1;
  return e;
}
function It(t, e) {
  for (var r = 0, n = e.length, u = []; r < n; )
    t(e[r]) && (u[u.length] = e[r]), r += 1;
  return u;
}
function Nt(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
var kt = /* @__PURE__ */ function() {
  function t(e, r) {
    this.xf = r, this.f = e;
  }
  return t.prototype["@@transducer/init"] = z.init, t.prototype["@@transducer/result"] = z.result, t.prototype["@@transducer/step"] = function(e, r) {
    return this.f(r) ? this.xf["@@transducer/step"](e, r) : e;
  }, t;
}();
function Pt(t) {
  return function(e) {
    return new kt(t, e);
  };
}
var et = /* @__PURE__ */ h(
  /* @__PURE__ */ Ye(["fantasy-land/filter", "filter"], Pt, function(t, e) {
    return Nt(e) ? xe(function(r, n) {
      return t(e[n]) && (r[n] = e[n]), r;
    }, {}, $(e)) : (
      // else
      It(t, e)
    );
  })
), Ft = /* @__PURE__ */ h(function(e, r) {
  return et(Ct(e), r);
});
function tt(t, e) {
  var r = function(i) {
    var o = e.concat([t]);
    return Qe(i, o) ? "<Circular>" : tt(i, o);
  }, n = function(a, i) {
    return D(function(o) {
      return ee(o) + ": " + r(a[o]);
    }, i.slice().sort());
  };
  switch (Object.prototype.toString.call(t)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + D(r, t).join(", ") + "))";
    case "[object Array]":
      return "[" + D(r, t).concat(n(t, Ft(function(a) {
        return /^\d+$/.test(a);
      }, $(t)))).join(", ") + "]";
    case "[object Boolean]":
      return typeof t == "object" ? "new Boolean(" + r(t.valueOf()) + ")" : t.toString();
    case "[object Date]":
      return "new Date(" + (isNaN(t.valueOf()) ? r(NaN) : ee(qt(t))) + ")";
    case "[object Map]":
      return "new Map(" + r(Array.from(t)) + ")";
    case "[object Null]":
      return "null";
    case "[object Number]":
      return typeof t == "object" ? "new Number(" + r(t.valueOf()) + ")" : 1 / t === -1 / 0 ? "-0" : t.toString(10);
    case "[object Set]":
      return "new Set(" + r(Array.from(t).sort()) + ")";
    case "[object String]":
      return typeof t == "object" ? "new String(" + r(t.valueOf()) + ")" : ee(t);
    case "[object Undefined]":
      return "undefined";
    default:
      if (typeof t.toString == "function") {
        var u = t.toString();
        if (u !== "[object Object]")
          return u;
      }
      return "{" + n(t, $(t)).join(", ") + "}";
  }
}
var ae = /* @__PURE__ */ m(function(e) {
  return tt(e, []);
}), Lt = /* @__PURE__ */ h(function(e, r) {
  if (e === r)
    return r;
  function n(s, l) {
    if (s > l != l > s)
      return l > s ? l : s;
  }
  var u = n(e, r);
  if (u !== void 0)
    return u;
  var a = n(typeof e, typeof r);
  if (a !== void 0)
    return a === typeof e ? e : r;
  var i = ae(e), o = n(i, ae(r));
  return o !== void 0 && o === i ? e : r;
}), Ut = /* @__PURE__ */ function() {
  function t(e, r) {
    this.xf = r, this.f = e;
  }
  return t.prototype["@@transducer/init"] = z.init, t.prototype["@@transducer/result"] = z.result, t.prototype["@@transducer/step"] = function(e, r) {
    return this.xf["@@transducer/step"](e, this.f(r));
  }, t;
}(), Zt = function(e) {
  return function(r) {
    return new Ut(e, r);
  };
}, E = /* @__PURE__ */ h(
  /* @__PURE__ */ Ye(["fantasy-land/map", "map"], Zt, function(e, r) {
    switch (Object.prototype.toString.call(r)) {
      case "[object Function]":
        return H(r.length, function() {
          return e.call(this, r.apply(this, arguments));
        });
      case "[object Object]":
        return xe(function(n, u) {
          return n[u] = e(r[u]), n;
        }, {}, $(r));
      default:
        return D(e, r);
    }
  })
);
function rt(t) {
  return Object.prototype.toString.call(t) === "[object String]";
}
var Dt = /* @__PURE__ */ h(function(e, r) {
  var n = e < 0 ? r.length + e : e;
  return rt(r) ? r.charAt(n) : r[n];
}), Rt = /* @__PURE__ */ m(function(e) {
  return ge(e) ? !0 : !e || typeof e != "object" || rt(e) ? !1 : e.length === 0 ? !0 : e.length > 0 ? e.hasOwnProperty(0) && e.hasOwnProperty(e.length - 1) : !1;
}), ke = typeof Symbol < "u" ? Symbol.iterator : "@@iterator";
function Bt(t, e, r) {
  return function(u, a, i) {
    if (Rt(i))
      return t(u, a, i);
    if (i == null)
      return a;
    if (typeof i["fantasy-land/reduce"] == "function")
      return e(u, a, i, "fantasy-land/reduce");
    if (i[ke] != null)
      return r(u, a, i[ke]());
    if (typeof i.next == "function")
      return r(u, a, i);
    if (typeof i.reduce == "function")
      return e(u, a, i, "reduce");
    throw new TypeError("reduce: list must be array or iterable");
  };
}
function zt(t, e, r) {
  for (var n = 0, u = r.length; n < u; ) {
    if (e = t["@@transducer/step"](e, r[n]), e && e["@@transducer/reduced"]) {
      e = e["@@transducer/value"];
      break;
    }
    n += 1;
  }
  return t["@@transducer/result"](e);
}
var Xt = /* @__PURE__ */ h(function(e, r) {
  return F(e.length, function() {
    return e.apply(r, arguments);
  });
});
function Wt(t, e, r) {
  for (var n = r.next(); !n.done; ) {
    if (e = t["@@transducer/step"](e, n.value), e && e["@@transducer/reduced"]) {
      e = e["@@transducer/value"];
      break;
    }
    n = r.next();
  }
  return t["@@transducer/result"](e);
}
function Gt(t, e, r, n) {
  return t["@@transducer/result"](r[n](Xt(t["@@transducer/step"], t), e));
}
var Ht = /* @__PURE__ */ Bt(zt, Gt, Wt), Vt = /* @__PURE__ */ function() {
  function t(e) {
    this.f = e;
  }
  return t.prototype["@@transducer/init"] = function() {
    throw new Error("init not implemented on XWrap");
  }, t.prototype["@@transducer/result"] = function(e) {
    return e;
  }, t.prototype["@@transducer/step"] = function(e, r) {
    return this.f(e, r);
  }, t;
}();
function Kt(t) {
  return new Vt(t);
}
var he = /* @__PURE__ */ L(function(t, e, r) {
  return Ht(typeof t == "function" ? Kt(t) : t, e, r);
}), nt = /* @__PURE__ */ m(function(e) {
  return function() {
    return e;
  };
});
function Yt(t) {
  var e = Object.prototype.toString.call(t);
  return e === "[object Function]" || e === "[object AsyncFunction]" || e === "[object GeneratorFunction]" || e === "[object AsyncGeneratorFunction]";
}
function Jt(t, e) {
  return function() {
    return e.call(this, t.apply(this, arguments));
  };
}
function me(t, e) {
  return function() {
    var r = arguments.length;
    if (r === 0)
      return e();
    var n = arguments[r - 1];
    return ge(n) || typeof n[t] != "function" ? e.apply(this, arguments) : n[t].apply(n, Array.prototype.slice.call(arguments, 0, r - 1));
  };
}
var Qt = /* @__PURE__ */ L(
  /* @__PURE__ */ me("slice", function(e, r, n) {
    return Array.prototype.slice.call(n, e, r);
  })
), xt = /* @__PURE__ */ m(
  /* @__PURE__ */ me(
    "tail",
    /* @__PURE__ */ Qt(1, 1 / 0)
  )
);
function O() {
  if (arguments.length === 0)
    throw new Error("pipe requires at least one argument");
  return F(arguments[0].length, he(Jt, arguments[0], xt(arguments)));
}
function er(t) {
  return t;
}
var k = /* @__PURE__ */ m(er), ie = /* @__PURE__ */ m(function(e) {
  var r = he(Lt, 0, E(function(n) {
    return n[0].length;
  }, e));
  return F(r, function() {
    for (var n = 0; n < e.length; ) {
      if (e[n][0].apply(this, arguments))
        return e[n][1].apply(this, arguments);
      n += 1;
    }
  });
}), tr = /* @__PURE__ */ h(function(e, r) {
  return r == null || r !== r ? e : r;
}), rr = /* @__PURE__ */ Dt(-1), Pe = /* @__PURE__ */ h(
  /* @__PURE__ */ me("forEach", function(e, r) {
    for (var n = r.length, u = 0; u < n; )
      e(r[u]), u += 1;
    return r;
  })
), nr = /* @__PURE__ */ m(function(e) {
  for (var r = {}, n = 0; n < e.length; )
    r[e[n][0]] = e[n][1], n += 1;
  return r;
}), ur = /* @__PURE__ */ L(function(e, r, n) {
  return H(Math.max(e.length, r.length, n.length), function() {
    return e.apply(this, arguments) ? r.apply(this, arguments) : n.apply(this, arguments);
  });
}), ar = /* @__PURE__ */ h(Qe), ut = /* @__PURE__ */ h(function(e, r) {
  return H(e + 1, function() {
    var n = arguments[e];
    if (n != null && Yt(n[r]))
      return n[r].apply(n, Array.prototype.slice.call(arguments, 0, e));
    throw new TypeError(ae(n) + ' does not have a method named "' + r + '"');
  });
}), oe = /* @__PURE__ */ h(function(e, r) {
  return r instanceof e || r != null && (r.constructor === e || e.name === "Object" && typeof r == "object");
}), ce = /* @__PURE__ */ ut(1, "join"), ir = /* @__PURE__ */ h(function(e, r) {
  var n = Number(r), u = 0, a;
  if (n < 0 || isNaN(n))
    throw new RangeError("n must be a non-negative number");
  for (a = []; u < n; )
    a.push(e(u)), u += 1;
  return a;
}), or = /* @__PURE__ */ h(function(e, r) {
  return ir(nt(e), r);
}), te = /* @__PURE__ */ L(function(e, r, n) {
  return n.replace(e, r);
}), cr = /* @__PURE__ */ ut(0, "toLowerCase"), I = `	
\v\f\r                　\u2028\u2029\uFEFF`, sr = "​", lr = typeof String.prototype.trim == "function", fr = /* @__PURE__ */ m(!lr || /* @__PURE__ */ I.trim() || !/* @__PURE__ */ sr.trim() ? function(e) {
  var r = new RegExp("^[" + I + "][" + I + "]*"), n = new RegExp("[" + I + "][" + I + "]*$");
  return e.replace(r, "").replace(n, "");
} : function(e) {
  return e.trim();
}), pr = /* @__PURE__ */ L(function(e, r, n) {
  return e(n) ? r(n) : n;
});
const gr = O(Object.entries, E(ce(": ")), ce("; ")), yr = "⧗", at = "@@spinneret", M = {
  XHTML: "http://www.w3.org/1999/xhtml",
  SVG: "http://www.w3.org/2000/svg"
}, Pn = [
  "a",
  "abbr",
  "acronym",
  "address",
  "applet",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "basefont",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "center",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "font",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1 to h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noframes",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strike",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "tt",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
], Fn = [
  "a",
  "animate",
  "animateMotion",
  "animateTransform",
  "circle",
  "clipPath",
  "defs",
  "desc",
  "ellipse",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "filter",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "marker",
  "mask",
  "metadata",
  "mpath",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "script",
  "set",
  "stop",
  "style",
  "svg",
  "switch",
  "symbol",
  "text",
  "textPath",
  "title",
  "tspan",
  "use",
  "view"
], hr = (t) => t[0].toUpperCase() + t.slice(1), Ln = O(
  fr,
  cr,
  te(/['"`]/g, ""),
  te(/\s/g, "-"),
  te(/[!@#$%^&*()[]]/g, "")
), Un = H(2, (t, e) => t + e), mr = _t, Fe = (t) => Object.defineProperty(t, at, {
  value: !0,
  enumerable: !0,
  writable: !1,
  configurable: !1
}), dr = (t) => se(t) ? "__" : hr(typeof t);
function it(t, e, r, n) {
  const u = function() {
    const i = arguments.length;
    let o = [], s = 0, l = e, j = 0, f = !1;
    for (; j < r.length || s < i; ) {
      let c;
      j < r.length && (!se(r[j]) || s >= i) ? c = r[j] : (c = arguments[s], s += 1), o[j] = c, se(c) ? f = !0 : l -= 1, j += 1;
    }
    if (!f && l <= 0)
      return n.apply(this, o);
    {
      const c = Math.max(0, l), y = it(t, e, o, n), d = o.map(dr).join(" -> "), _ = O(or("?"), ce(" -> "))(c), b = `${d} -> ${_}`, Q = () => t;
      return y.toString = Q, Object.defineProperty(y, "name", {
        value: t
      }), Object.defineProperty(y, Symbol.toStringTag, {
        get: Q
      }), Fe(y), Object.defineProperty(y, "signature", {
        value: b,
        enumerable: !1,
        configurable: !0,
        writable: !1
      }), y;
    }
  };
  return Object.defineProperty(u, "name", {
    value: t
  }), Object.defineProperty(u, "length", {
    get: () => e
  }), Fe(u), u;
}
function v(t, e) {
  const r = e.length, n = yr + t;
  return it(n, r, [], e);
}
function se(t) {
  return t && t["@@functional/placeholder"] === !0;
}
const Zn = (t) => t.signature, Dn = (t) => t[at], vr = v("createAttribute", (t, e, r) => (t.setAttribute(e, r), t)), Sr = v(
  "createAttributeTuple",
  (t, [e, r]) => (
    // resilient™ to bad data
    e && r ? vr(t, e, r) : t
  )
), wr = ([t, e]) => [
  ie([
    [Je("className"), nt("class")],
    [() => !0, k]
  ])(t),
  ie([
    [(r) => typeof r != "string" && t === "style", gr],
    [() => !0, k]
  ])(e)
], jr = v("getContext", (t, e, r) => r.getContext(e, t)), _r = jr(void 0), Rn = _r("2d"), Bn = v("set", (t, e, r) => (r[t] = e, r)), zn = v(
  "clearRect",
  (t, e, r, n, u) => t.clearRect(e, r, n, u)
), br = (t) => {
  const e = Object.prototype.toString.call(t);
  if (typeof t == "function") {
    const r = `${t.name}(${t.length})`;
    return t.signature ? `${r} :: ${t.signature}` : r + " :: " + Array(t.length).fill("?").join(" -> ");
  }
  return e;
}, ot = v("listenTo", (t, e, r) => (r.addEventListener(t, e), r)), Or = ot("click"), Ar = ot("submit"), $r = v("listenToElement", (t, [e, r]) => {
  if (r) {
    if (e === "onClick")
      return Or(r, t), [e, null];
    if (e === "onSubmit")
      return Ar(r, t), [e, null];
  }
  return [e, r];
}), Er = v("trace", (t, e, r) => (t(e, r), r)), Mr = Er(console.log), ct = (t) => document.createTextNode(t), Xn = pr(oe(String), ct), Tr = (t) => {
  const e = document.createElement("div");
  return e.innerHTML = t, e.textContent;
}, qr = ie([
  [oe(Function), O(Mr("YO"), br, tr("<???>"))],
  [
    oe(String),
    // not sure if we want to include this, but for now it seems ok
    ur(ar("&"), Tr, ct)
  ],
  [(t) => t instanceof HTMLElement || t instanceof SVGElement, k],
  [() => !0, () => ""]
]), Cr = (t, e, r) => {
  e.append(qr(r));
}, Wn = (t) => t.toLowerCase() === "svg" ? M.SVG : M.XHTML, Ir = v("createElementNS", (t, e) => !t || t === M.XHTML ? document.createElement(e) : document.createElementNS(t, e)), de = v(
  "createElementOfNamespace",
  function(e, r, n, u) {
    const {
      configure: a = k,
      eject: i,
      onChild: o = Cr,
      effects: s = []
    } = e, l = a({
      ns: M.XHTML,
      scope: e,
      kind: r,
      props: n,
      children: u
    });
    if (i && i.check && i.process && i.check(l))
      return i.process(l);
    const {
      ns: j,
      onCreate: f,
      scope: c,
      kind: y,
      props: d,
      children: _,
      createStrand: b = Ir
    } = l, { state: Q = {} } = c, A = b(j, y);
    if (_ && O(
      jt,
      Pe(
        // closure needed
        function(be) {
          o(l, A, be);
        }
      )
    )(_), d) {
      const _e = typeof d == "function" ? d(l, A, { spin: de }) : d;
      O(
        he(
          function(Oe, wt) {
            const [Ae, $e] = wt || [];
            return Ae && $e ? $e(Oe, Ae) : Oe;
          },
          mr,
          c.effects
        ),
        Object.entries,
        E(wr),
        E($r(A)),
        Pe(Sr(A))
      )(_e);
    }
    return c.post ? c.post(A, c) : A;
  }
), V = de({}), st = de({
  configure: (t) => ({ ...t, ns: M.SVG })
}), Nr = v(
  "svg",
  ({ className: t, ...e }, r) => st(
    "svg",
    {
      xmlns: M.SVG,
      className: t,
      ...e
    },
    r
  )
), Gn = (t) => {
  const e = V("div", {}, []);
  return e.innerHTML = t.outerHTML, e;
}, kr = O(
  E(({ name: t, value: e }) => t && e ? [t, e] : !1),
  et(k),
  nr
), Hn = (t) => (t.preventDefault(), kr(t.target.elements)), Pr = v(
  "safeStringifyWithIndent",
  (t, e) => {
    try {
      return JSON.stringify(e, null, t);
    } catch {
      return '{"invalid-json": true}';
    }
  }
), Vn = Pr(2);
function Fr(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Z = { exports: {} }, Le;
function Lr() {
  if (Le) return Z.exports;
  Le = 1;
  function t(f, c) {
    var y = c && c.cache ? c.cache : j, d = c && c.serializer ? c.serializer : s, _ = c && c.strategy ? c.strategy : a;
    return _(f, {
      cache: y,
      serializer: d
    });
  }
  function e(f) {
    return f == null || typeof f == "number" || typeof f == "boolean";
  }
  function r(f, c, y, d) {
    var _ = e(d) ? d : y(d), b = c.get(_);
    return typeof b > "u" && (b = f.call(this, d), c.set(_, b)), b;
  }
  function n(f, c, y) {
    var d = Array.prototype.slice.call(arguments, 3), _ = y(d), b = c.get(_);
    return typeof b > "u" && (b = f.apply(this, d), c.set(_, b)), b;
  }
  function u(f, c, y, d, _) {
    return y.bind(
      c,
      f,
      d,
      _
    );
  }
  function a(f, c) {
    var y = f.length === 1 ? r : n;
    return u(
      f,
      this,
      y,
      c.cache.create(),
      c.serializer
    );
  }
  function i(f, c) {
    var y = n;
    return u(
      f,
      this,
      y,
      c.cache.create(),
      c.serializer
    );
  }
  function o(f, c) {
    var y = r;
    return u(
      f,
      this,
      y,
      c.cache.create(),
      c.serializer
    );
  }
  function s() {
    return JSON.stringify(arguments);
  }
  function l() {
    this.cache = /* @__PURE__ */ Object.create(null);
  }
  l.prototype.has = function(f) {
    return f in this.cache;
  }, l.prototype.get = function(f) {
    return this.cache[f];
  }, l.prototype.set = function(f, c) {
    this.cache[f] = c;
  };
  var j = {
    create: function() {
      return new l();
    }
  };
  return Z.exports = t, Z.exports.strategies = {
    variadic: i,
    monadic: o
  }, Z.exports;
}
var Ur = Lr();
const le = /* @__PURE__ */ Fr(Ur);
function g(t) {
  return t != null && typeof t == "object" && t["@@functional/placeholder"] === !0;
}
function w(t) {
  return function e(r) {
    return arguments.length === 0 || g(r) ? e : t.apply(this, arguments);
  };
}
function S(t) {
  return function e(r, n) {
    switch (arguments.length) {
      case 0:
        return e;
      case 1:
        return g(r) ? e : w(function(u) {
          return t(r, u);
        });
      default:
        return g(r) && g(n) ? e : g(r) ? w(function(u) {
          return t(u, n);
        }) : g(n) ? w(function(u) {
          return t(r, u);
        }) : t(r, n);
    }
  };
}
function K(t, e) {
  switch (t) {
    case 0:
      return function() {
        return e.apply(this, arguments);
      };
    case 1:
      return function(r) {
        return e.apply(this, arguments);
      };
    case 2:
      return function(r, n) {
        return e.apply(this, arguments);
      };
    case 3:
      return function(r, n, u) {
        return e.apply(this, arguments);
      };
    case 4:
      return function(r, n, u, a) {
        return e.apply(this, arguments);
      };
    case 5:
      return function(r, n, u, a, i) {
        return e.apply(this, arguments);
      };
    case 6:
      return function(r, n, u, a, i, o) {
        return e.apply(this, arguments);
      };
    case 7:
      return function(r, n, u, a, i, o, s) {
        return e.apply(this, arguments);
      };
    case 8:
      return function(r, n, u, a, i, o, s, l) {
        return e.apply(this, arguments);
      };
    case 9:
      return function(r, n, u, a, i, o, s, l, j) {
        return e.apply(this, arguments);
      };
    case 10:
      return function(r, n, u, a, i, o, s, l, j, f) {
        return e.apply(this, arguments);
      };
    default:
      throw new Error("First argument to _arity must be a non-negative integer no greater than ten");
  }
}
function lt(t, e, r) {
  return function() {
    for (var n = [], u = 0, a = t, i = 0; i < e.length || u < arguments.length; ) {
      var o;
      i < e.length && (!g(e[i]) || u >= arguments.length) ? o = e[i] : (o = arguments[u], u += 1), n[i] = o, g(o) || (a -= 1), i += 1;
    }
    return a <= 0 ? r.apply(this, n) : K(a, lt(t, n, r));
  };
}
var ve = /* @__PURE__ */ S(function(e, r) {
  return e === 1 ? w(r) : K(e, lt(e, [], r));
});
function ft(t) {
  return function e(r, n, u) {
    switch (arguments.length) {
      case 0:
        return e;
      case 1:
        return g(r) ? e : S(function(a, i) {
          return t(r, a, i);
        });
      case 2:
        return g(r) && g(n) ? e : g(r) ? S(function(a, i) {
          return t(a, n, i);
        }) : g(n) ? S(function(a, i) {
          return t(r, a, i);
        }) : w(function(a) {
          return t(r, n, a);
        });
      default:
        return g(r) && g(n) && g(u) ? e : g(r) && g(n) ? S(function(a, i) {
          return t(a, i, u);
        }) : g(r) && g(u) ? S(function(a, i) {
          return t(a, n, i);
        }) : g(n) && g(u) ? S(function(a, i) {
          return t(r, a, i);
        }) : g(r) ? w(function(a) {
          return t(a, n, u);
        }) : g(n) ? w(function(a) {
          return t(r, a, u);
        }) : g(u) ? w(function(a) {
          return t(r, n, a);
        }) : t(r, n, u);
    }
  };
}
const P = Array.isArray || function(e) {
  return e != null && e.length >= 0 && Object.prototype.toString.call(e) === "[object Array]";
};
function Zr(t) {
  return t != null && typeof t["@@transducer/step"] == "function";
}
function pt(t, e, r) {
  return function() {
    if (arguments.length === 0)
      return r();
    var n = Array.prototype.slice.call(arguments, 0), u = n.pop();
    if (!P(u)) {
      for (var a = 0; a < t.length; ) {
        if (typeof u[t[a]] == "function")
          return u[t[a]].apply(u, n);
        a += 1;
      }
      if (Zr(u)) {
        var i = e.apply(null, n);
        return i(u);
      }
    }
    return r.apply(this, arguments);
  };
}
const W = {
  init: function() {
    return this.xf["@@transducer/init"]();
  },
  result: function(t) {
    return this.xf["@@transducer/result"](t);
  }
};
function R(t, e) {
  for (var r = 0, n = e.length, u = Array(n); r < n; )
    u[r] = t(e[r]), r += 1;
  return u;
}
function fe(t) {
  return Object.prototype.toString.call(t) === "[object String]";
}
var Dr = /* @__PURE__ */ w(function(e) {
  return P(e) ? !0 : !e || typeof e != "object" || fe(e) ? !1 : e.nodeType === 1 ? !!e.length : e.length === 0 ? !0 : e.length > 0 ? e.hasOwnProperty(0) && e.hasOwnProperty(e.length - 1) : !1;
}), Rr = /* @__PURE__ */ function() {
  function t(e) {
    this.f = e;
  }
  return t.prototype["@@transducer/init"] = function() {
    throw new Error("init not implemented on XWrap");
  }, t.prototype["@@transducer/result"] = function(e) {
    return e;
  }, t.prototype["@@transducer/step"] = function(e, r) {
    return this.f(e, r);
  }, t;
}();
function Br(t) {
  return new Rr(t);
}
var zr = /* @__PURE__ */ S(function(e, r) {
  return K(e.length, function() {
    return e.apply(r, arguments);
  });
});
function Xr(t, e, r) {
  for (var n = 0, u = r.length; n < u; ) {
    if (e = t["@@transducer/step"](e, r[n]), e && e["@@transducer/reduced"]) {
      e = e["@@transducer/value"];
      break;
    }
    n += 1;
  }
  return t["@@transducer/result"](e);
}
function Ue(t, e, r) {
  for (var n = r.next(); !n.done; ) {
    if (e = t["@@transducer/step"](e, n.value), e && e["@@transducer/reduced"]) {
      e = e["@@transducer/value"];
      break;
    }
    n = r.next();
  }
  return t["@@transducer/result"](e);
}
function Ze(t, e, r, n) {
  return t["@@transducer/result"](r[n](zr(t["@@transducer/step"], t), e));
}
var De = typeof Symbol < "u" ? Symbol.iterator : "@@iterator";
function Se(t, e, r) {
  if (typeof t == "function" && (t = Br(t)), Dr(r))
    return Xr(t, e, r);
  if (typeof r["fantasy-land/reduce"] == "function")
    return Ze(t, e, r, "fantasy-land/reduce");
  if (r[De] != null)
    return Ue(t, e, r[De]());
  if (typeof r.next == "function")
    return Ue(t, e, r);
  if (typeof r.reduce == "function")
    return Ze(t, e, r, "reduce");
  throw new TypeError("reduce: list must be array or iterable");
}
var Wr = /* @__PURE__ */ function() {
  function t(e, r) {
    this.xf = r, this.f = e;
  }
  return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = W.result, t.prototype["@@transducer/step"] = function(e, r) {
    return this.xf["@@transducer/step"](e, this.f(r));
  }, t;
}(), Gr = /* @__PURE__ */ S(function(e, r) {
  return new Wr(e, r);
});
function G(t, e) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
var Re = Object.prototype.toString, Hr = /* @__PURE__ */ function() {
  return Re.call(arguments) === "[object Arguments]" ? function(e) {
    return Re.call(e) === "[object Arguments]";
  } : function(e) {
    return G("callee", e);
  };
}(), Vr = !/* @__PURE__ */ { toString: null }.propertyIsEnumerable("toString"), Be = ["constructor", "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"], ze = /* @__PURE__ */ function() {
  return arguments.propertyIsEnumerable("length");
}(), Kr = function(e, r) {
  for (var n = 0; n < e.length; ) {
    if (e[n] === r)
      return !0;
    n += 1;
  }
  return !1;
}, T = /* @__PURE__ */ w(typeof Object.keys == "function" && !ze ? function(e) {
  return Object(e) !== e ? [] : Object.keys(e);
} : function(e) {
  if (Object(e) !== e)
    return [];
  var r, n, u = [], a = ze && Hr(e);
  for (r in e)
    G(r, e) && (!a || r !== "length") && (u[u.length] = r);
  if (Vr)
    for (n = Be.length - 1; n >= 0; )
      r = Be[n], G(r, e) && !Kr(u, r) && (u[u.length] = r), n -= 1;
  return u;
}), Yr = /* @__PURE__ */ S(/* @__PURE__ */ pt(["fantasy-land/map", "map"], Gr, function(e, r) {
  switch (Object.prototype.toString.call(r)) {
    case "[object Function]":
      return ve(r.length, function() {
        return e.call(this, r.apply(this, arguments));
      });
    case "[object Object]":
      return Se(function(n, u) {
        return n[u] = e(r[u]), n;
      }, {}, T(r));
    default:
      return R(e, r);
  }
})), gt = /* @__PURE__ */ ft(Se);
function pe(t) {
  return Object.prototype.toString.call(t) === "[object Function]";
}
var Y = /* @__PURE__ */ w(function(e) {
  return ve(e.length, e);
}), Xe = /* @__PURE__ */ w(function(e) {
  return e === null ? "Null" : e === void 0 ? "Undefined" : Object.prototype.toString.call(e).slice(8, -1);
});
function Jr(t, e) {
  return function() {
    return e.call(this, t.apply(this, arguments));
  };
}
function yt(t, e) {
  return function() {
    var r = arguments.length;
    if (r === 0)
      return e();
    var n = arguments[r - 1];
    return P(n) || typeof n[t] != "function" ? e.apply(this, arguments) : n[t].apply(n, Array.prototype.slice.call(arguments, 0, r - 1));
  };
}
var Qr = /* @__PURE__ */ ft(/* @__PURE__ */ yt("slice", function(e, r, n) {
  return Array.prototype.slice.call(n, e, r);
})), xr = /* @__PURE__ */ w(/* @__PURE__ */ yt("tail", /* @__PURE__ */ Qr(1, 1 / 0)));
function we() {
  if (arguments.length === 0)
    throw new Error("pipe requires at least one argument");
  return K(arguments[0].length, gt(Jr, arguments[0], xr(arguments)));
}
function We(t) {
  for (var e = [], r; !(r = t.next()).done; )
    e.push(r.value);
  return e;
}
function Ge(t, e, r) {
  for (var n = 0, u = r.length; n < u; ) {
    if (t(e, r[n]))
      return !0;
    n += 1;
  }
  return !1;
}
function en(t) {
  var e = String(t).match(/^function (\w*)/);
  return e == null ? "" : e[1];
}
function tn(t, e) {
  return t === e ? t !== 0 || 1 / t === 1 / e : t !== t && e !== e;
}
const re = typeof Object.is == "function" ? Object.is : tn;
function He(t, e, r, n) {
  var u = We(t), a = We(e);
  function i(o, s) {
    return je(o, s, r.slice(), n.slice());
  }
  return !Ge(function(o, s) {
    return !Ge(i, s, o);
  }, a, u);
}
function je(t, e, r, n) {
  if (re(t, e))
    return !0;
  var u = Xe(t);
  if (u !== Xe(e) || t == null || e == null)
    return !1;
  if (typeof t["fantasy-land/equals"] == "function" || typeof e["fantasy-land/equals"] == "function")
    return typeof t["fantasy-land/equals"] == "function" && t["fantasy-land/equals"](e) && typeof e["fantasy-land/equals"] == "function" && e["fantasy-land/equals"](t);
  if (typeof t.equals == "function" || typeof e.equals == "function")
    return typeof t.equals == "function" && t.equals(e) && typeof e.equals == "function" && e.equals(t);
  switch (u) {
    case "Arguments":
    case "Array":
    case "Object":
      if (typeof t.constructor == "function" && en(t.constructor) === "Promise")
        return t === e;
      break;
    case "Boolean":
    case "Number":
    case "String":
      if (!(typeof t == typeof e && re(t.valueOf(), e.valueOf())))
        return !1;
      break;
    case "Date":
      if (!re(t.valueOf(), e.valueOf()))
        return !1;
      break;
    case "Error":
      return t.name === e.name && t.message === e.message;
    case "RegExp":
      if (!(t.source === e.source && t.global === e.global && t.ignoreCase === e.ignoreCase && t.multiline === e.multiline && t.sticky === e.sticky && t.unicode === e.unicode))
        return !1;
      break;
  }
  for (var a = r.length - 1; a >= 0; ) {
    if (r[a] === t)
      return n[a] === e;
    a -= 1;
  }
  switch (u) {
    case "Map":
      return t.size !== e.size ? !1 : He(t.entries(), e.entries(), r.concat([t]), n.concat([e]));
    case "Set":
      return t.size !== e.size ? !1 : He(t.values(), e.values(), r.concat([t]), n.concat([e]));
    case "Arguments":
    case "Array":
    case "Object":
    case "Boolean":
    case "Number":
    case "String":
    case "Date":
    case "Error":
    case "RegExp":
    case "Int8Array":
    case "Uint8Array":
    case "Uint8ClampedArray":
    case "Int16Array":
    case "Uint16Array":
    case "Int32Array":
    case "Uint32Array":
    case "Float32Array":
    case "Float64Array":
    case "ArrayBuffer":
      break;
    default:
      return !1;
  }
  var i = T(t);
  if (i.length !== T(e).length)
    return !1;
  var o = r.concat([t]), s = n.concat([e]);
  for (a = i.length - 1; a >= 0; ) {
    var l = i[a];
    if (!(G(l, e) && je(e[l], t[l], o, s)))
      return !1;
    a -= 1;
  }
  return !0;
}
var rn = /* @__PURE__ */ S(function(e, r) {
  return je(e, r, [], []);
});
function nn(t, e, r) {
  var n, u;
  if (typeof t.indexOf == "function")
    switch (typeof e) {
      case "number":
        if (e === 0) {
          for (n = 1 / e; r < t.length; ) {
            if (u = t[r], u === 0 && 1 / u === n)
              return r;
            r += 1;
          }
          return -1;
        } else if (e !== e) {
          for (; r < t.length; ) {
            if (u = t[r], typeof u == "number" && u !== u)
              return r;
            r += 1;
          }
          return -1;
        }
        return t.indexOf(e, r);
      // all these types can utilise Set
      case "string":
      case "boolean":
      case "function":
      case "undefined":
        return t.indexOf(e, r);
      case "object":
        if (e === null)
          return t.indexOf(e, r);
    }
  for (; r < t.length; ) {
    if (rn(t[r], e))
      return r;
    r += 1;
  }
  return -1;
}
function un(t, e) {
  return nn(e, t, 0) >= 0;
}
function ne(t) {
  var e = t.replace(/\\/g, "\\\\").replace(/[\b]/g, "\\b").replace(/\f/g, "\\f").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/\v/g, "\\v").replace(/\0/g, "\\0");
  return '"' + e.replace(/"/g, '\\"') + '"';
}
var N = function(e) {
  return (e < 10 ? "0" : "") + e;
}, an = typeof Date.prototype.toISOString == "function" ? function(e) {
  return e.toISOString();
} : function(e) {
  return e.getUTCFullYear() + "-" + N(e.getUTCMonth() + 1) + "-" + N(e.getUTCDate()) + "T" + N(e.getUTCHours()) + ":" + N(e.getUTCMinutes()) + ":" + N(e.getUTCSeconds()) + "." + (e.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z";
};
function on(t) {
  return function() {
    return !t.apply(this, arguments);
  };
}
function cn(t, e) {
  for (var r = 0, n = e.length, u = []; r < n; )
    t(e[r]) && (u[u.length] = e[r]), r += 1;
  return u;
}
function sn(t) {
  return Object.prototype.toString.call(t) === "[object Object]";
}
var ln = /* @__PURE__ */ function() {
  function t(e, r) {
    this.xf = r, this.f = e;
  }
  return t.prototype["@@transducer/init"] = W.init, t.prototype["@@transducer/result"] = W.result, t.prototype["@@transducer/step"] = function(e, r) {
    return this.f(r) ? this.xf["@@transducer/step"](e, r) : e;
  }, t;
}(), fn = /* @__PURE__ */ S(function(e, r) {
  return new ln(e, r);
}), pn = /* @__PURE__ */ S(/* @__PURE__ */ pt(["filter"], fn, function(t, e) {
  return sn(e) ? Se(function(r, n) {
    return t(e[n]) && (r[n] = e[n]), r;
  }, {}, T(e)) : (
    // else
    cn(t, e)
  );
})), gn = /* @__PURE__ */ S(function(e, r) {
  return pn(on(e), r);
});
function ht(t, e) {
  var r = function(i) {
    var o = e.concat([t]);
    return un(i, o) ? "<Circular>" : ht(i, o);
  }, n = function(a, i) {
    return R(function(o) {
      return ne(o) + ": " + r(a[o]);
    }, i.slice().sort());
  };
  switch (Object.prototype.toString.call(t)) {
    case "[object Arguments]":
      return "(function() { return arguments; }(" + R(r, t).join(", ") + "))";
    case "[object Array]":
      return "[" + R(r, t).concat(n(t, gn(function(a) {
        return /^\d+$/.test(a);
      }, T(t)))).join(", ") + "]";
    case "[object Boolean]":
      return typeof t == "object" ? "new Boolean(" + r(t.valueOf()) + ")" : t.toString();
    case "[object Date]":
      return "new Date(" + (isNaN(t.valueOf()) ? r(NaN) : ne(an(t))) + ")";
    case "[object Null]":
      return "null";
    case "[object Number]":
      return typeof t == "object" ? "new Number(" + r(t.valueOf()) + ")" : 1 / t === -1 / 0 ? "-0" : t.toString(10);
    case "[object String]":
      return typeof t == "object" ? "new String(" + r(t.valueOf()) + ")" : ne(t);
    case "[object Undefined]":
      return "undefined";
    default:
      if (typeof t.toString == "function") {
        var u = t.toString();
        if (u !== "[object Object]")
          return u;
      }
      return "{" + n(t, T(t)).join(", ") + "}";
  }
}
var B = /* @__PURE__ */ w(function(e) {
  return ht(e, []);
}), yn = /* @__PURE__ */ S(function(e, r) {
  if (P(e)) {
    if (P(r))
      return e.concat(r);
    throw new TypeError(B(r) + " is not an array");
  }
  if (fe(e)) {
    if (fe(r))
      return e + r;
    throw new TypeError(B(r) + " is not a string");
  }
  if (e != null && pe(e["fantasy-land/concat"]))
    return e["fantasy-land/concat"](r);
  if (e != null && pe(e.concat))
    return e.concat(r);
  throw new TypeError(B(e) + ' does not have a method named "concat" or "fantasy-land/concat"');
}), hn = /* @__PURE__ */ S(function(e, r) {
  return ve(e + 1, function() {
    var n = arguments[e];
    if (n != null && pe(n[r]))
      return n[r].apply(n, Array.prototype.slice.call(arguments, 0, e));
    throw new TypeError(B(n) + ' does not have a method named "' + r + '"');
  });
}), mt = /* @__PURE__ */ hn(1, "join");
function mn(t) {
  return dn(t) || vn(t) || Sn();
}
function dn(t) {
  if (Array.isArray(t)) {
    for (var e = 0, r = new Array(t.length); e < t.length; e++) r[e] = t[e];
    return r;
  }
}
function vn(t) {
  if (Symbol.iterator in Object(t) || Object.prototype.toString.call(t) === "[object Arguments]") return Array.from(t);
}
function Sn() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
var dt = function(e) {
  return typeof e == "string";
}, wn = Array.isArray, jn = Y(function(t, e, r, n) {
  return t(n) ? r(n) : e(n);
}), q = {
  modifier: "--",
  element: "__",
  space: " ",
  empty: ""
}, _n = function(e) {
  return mn(new Set(e));
}, vt = function(e) {
  return [].concat(e);
}, bn = Y(function(t, e) {
  return "".concat(t).concat(e);
}), St = Y(function(t, e) {
  return e ? "".concat(t).concat(e) : q.empty;
}), On = Y(function(t, e) {
  return t ? [e, "".concat(e).concat(St(q.modifier, t))] : e;
}), ue = function(e) {
  return dt(e) ? e : q.empty;
}, Ve = le(function(e, r, n) {
  return we(ue, vt, mt(q.element), St(q.element), bn(ue(e)), On(ue(n)))(r);
}), An = function(e) {
  return wn(e) && !dt(e[0]);
}, $n = function(e) {
  return e && e[0];
}, En = we(gt(yn, []), _n, function(t) {
  return t.sort();
}, mt(q.space)), Mn = le(function(e) {
  return le(function(n, u) {
    return u ? we(vt, Yr(function(a) {
      return Ve(e, n, a);
    }), jn(An, $n, En))(u) : Ve(e, n);
  });
}), Tn = Mn;
const qn = v("queryConstructor", (t, e) => {
  const r = t(...e).split(" ");
  return "." + rr(r);
}), Kn = v(
  "querySelector",
  (t, e) => O(qn(t), document.querySelector)(e)
), U = Tn("Logo"), J = st("path"), Cn = J(
  {
    className: U("text"),
    d: "M138.852 193.889c-2.375 2.545-6.769 2.868-9.806.72-3.038-2.148-3.576-5.959-1.201-8.505 0 0 27.879-29.823 39.774-57.795 2.968-6.98 4.944-13.821 5.012-19.989.085-7.606-3.015-14.046-11.886-17.548-3.652-1.442-7.659-1.252-11.766-.012-5.133 1.551-10.332 4.68-15.373 8.919-25.637 21.56-46.362 71.048-25.323 111.657 34.266 66.141 25.581 106.05-21.543 119.409-12.36 3.504-25.802 1.722-38.255-4.516-17.295-8.663-32.781-26.172-39.657-49.258-7.375-24.763-4.928-56.052 16.137-89.14 1.828-2.872 6.068-3.833 9.463-2.145 3.395 1.688 4.666 5.389 2.838 8.261-28.333 44.505-20.083 85.303.458 108.306 12.416 13.904 29.246 21.253 44.217 17.009 40.497-11.481 43.072-46.501 13.624-103.341-23.552-45.46-.594-100.908 28.106-125.043 14.073-11.835 29.738-16.085 42.484-11.053 18.132 7.158 22.826 21.292 19.453 37.94-6.653 32.836-46.756 76.124-46.756 76.124ZM173.665 277.725l-23.507 126.251c-.608 3.267-4.193 5.394-8.001 4.746-3.807-.648-6.404-3.827-5.796-7.094l28.414-152.603a72.1 72.1 0 0 1 1.153-6.192l14.203-76.282c.608-3.267 4.193-5.394 8-4.746 3.808.648 6.405 3.827 5.796 7.094l-5.5 29.543c12.858-15.711 30.274-28.633 50.61-32.977a8.004 8.004 0 0 1 2.411-.137s28.776 2.163 4.808 50.5c-12.349 24.905-23.568 46.486-35.779 57.379-10.329 9.216-21.484 11.821-34.106 6.03a19.22 19.22 0 0 1-2.706-1.512Zm4.774-25.64c-.495 4.34-.366 8.236.562 11.43.672 2.31 1.614 4.216 3.558 5.107 6.645 3.049 12.269.874 17.708-3.977 11.433-10.2 21.551-30.596 33.114-53.916 7.256-14.634 9.169-23.598 8.496-29.175a7.802 7.802 0 0 0-1.524-3.77c-12.987 3.372-24.353 11.003-33.726 20.427-13.551 13.623-22.96 31.05-26.693 45.844l-1.495 8.03ZM482.829 171.658c-3.083 6.864-6.263 13.36-9.182 18.259-3.552 5.961-7.36 9.768-9.967 10.882-6.587 2.814-11.584 2.14-15.152.202-3.359-1.825-6.035-5.33-7.146-10.484-2.181-10.118 1.64-28.984 5.634-44.877-.449.691-.899 1.392-1.35 2.101-17.175 26.951-34.458 65.865-34.458 65.865-1.267 2.852-4.863 4.332-8.325 3.428-3.462-.905-5.669-3.901-5.109-6.937l5.269-28.586c-6.223 11.923-13.176 23.493-19.241 31.399-2.998 3.908-5.878 6.978-8.434 8.946-2.653 2.042-5.251 3.091-7.463 3.409l-3.942.052-2.068-.434-1.981-.784c-3.599-1.809-6.506-6.01-6.824-12.492-.52-10.617 5.076-29.782 10.148-45.545a296.104 296.104 0 0 0-2.997 4.307c-18.908 27.658-38.222 68.555-38.222 68.555-1.333 2.82-4.953 4.237-8.392 3.282-3.438-.954-5.584-3.971-4.973-6.992l8.812-43.603c-10.87 18.405-24.01 38.625-34.534 49.713-4.804 5.061-9.385 8.353-13.025 9.589l-3.738.771-2.151-.022-2.238-.414-1.603-.627-1.303-.825-1.117-1.049-.998-1.432c-.95-1.746-1.538-6.061-.922-12.047 2.296-22.324 16.538-75.737 16.538-75.737.86-3.217 4.609-5.128 8.368-4.265 3.758.863 6.112 4.176 5.252 7.393 0 0-13.501 50.432-16.11 72.929 3.218-3.055 6.743-7.235 10.433-12.09 21-27.634 46.358-76.409 46.358-76.409 1.427-2.74 5.036-4.055 8.414-3.064 3.377.992 5.462 3.977 4.86 6.96l-7.88 38.988c5.072-8.929 10.596-18.017 16.072-26.026 9.041-13.226 18.407-23.444 25.545-26.49l1.606-.491 1.564-.149 1.58.151 1.64.498 2.507 1.712 1.429 2.307.333 2.819c-.102 1.372-.773 4.126-1.918 7.82-3.619 11.675-12.047 34.663-14.666 50.685-.468 2.864-.47 6.2-.383 8.57.075-.069.147-.138.217-.206 3.333-3.284 7.069-8.469 10.965-14.605 16.061-25.293 34.054-66.191 34.054-66.191 1.258-2.859 4.855-4.348 8.322-3.447 3.467.901 5.68 3.899 5.119 6.939l-5.464 29.639a331.655 331.655 0 0 1 12.775-21.888c8.156-12.798 16.619-22.942 23.209-26.435l2.34-.78 2.638.005 2.369.778 1.742 1.238 1.198 1.555.688 2.084c.135.991-.492 4.793-1.988 10.256-3.468 12.673-10.789 37.164-10.92 52.562-.022 2.569.147 4.836.672 6.658.077.267.213.592.342.876.354-.094.776-.218 1.153-.357.254-.258 1.103-1.133 1.652-1.862 2.032-2.695 4.285-6.688 6.62-11.318 9.648-19.129 20.241-48.673 20.241-48.673.187-.52.449-.999.773-1.432 2.07-5.677 4.63-10.665 7.358-14.794 4.733-7.164 10.18-11.854 14.566-13.758a16.845 16.845 0 0 1 3.211-1.038l3.766-.294 2.742.464 2.624 1.099c3.396 1.932 6.864 6.751 6.232 15.733-2.105 29.898-24.746 45.078-31.077 48.759a77.167 77.167 0 0 0 3.229 15.429c.545 1.716 1.292 3.101 2.661 3.749 1.308.62 2.931.378 4.785-.228 4.121-1.346 8.674-4.6 13.539-9.813 7.4-7.929 15.091-20.116 22.159-37.381l-.708-.999c-.885-1.556-1.415-4.422-.58-8.163 2.615-11.727 18.047-39.267 18.047-39.267 1.665-2.949 5.84-4.085 9.318-2.536 3.477 1.55 4.949 5.201 3.285 8.15 0 0-11.195 19.789-15.636 32.123-.097.271-.192.553-.283.84.51.327.963.706 1.353 1.126 5.761-.772 12.993-3.073 19.524-6.508l2.657-.808 2.811.173 2.472 1.062 1.795 1.703.844 1.665.255 1.604-.303 1.797-.774 1.574c-1.533 2.58-8.299 12.437-11.538 22.733-1.738 5.526-2.797 11.191.016 15.373.246.367 1.554 2.694 4.104 3.05 2.168.303 4.534-1.003 7.816-4.033 7.915-7.306 17.443-23.042 28.602-54.09 2.261-9.217 5.901-17.125 9.904-23.183 4.733-7.163 10.18-11.853 14.566-13.758a16.93 16.93 0 0 1 3.21-1.038l3.767-.294 2.742.464 2.624 1.099c3.396 1.932 6.864 6.751 6.232 15.733-2.105 29.898-24.746 45.078-31.077 48.759a77.153 77.153 0 0 0 3.229 15.429c.545 1.716 1.292 3.101 2.661 3.749 1.308.62 2.931.378 4.785-.228 4.121-1.346 8.674-4.6 13.539-9.813 8.374-8.972 17.12-23.397 24.915-44.462.082-.222.178-.437.287-.643 4.319-14.783 11.179-30.24 18.372-44.232-173.04-21.934-259.608-11.645-302.894 4.659-39.379 14.833-39.833 33.978-39.833 33.978.103 3.331-2.942 6.007-6.796 5.972-3.855-.035-7.068-2.768-7.171-6.099 0 0-1.887-26.222 47.819-44.945 44.733-16.85 134.546-28.169 314.946-4.925 12.12-21.87 23.433-37.899 23.433-37.899 1.98-2.792 6.274-3.585 9.582-1.768 3.308 1.816 4.387 5.557 2.406 8.349 0 0-9.834 13.8-20.824 33.079 17.035 1.703 31.403 1.419 43.827-4.009 3.387-1.48 7.632-.259 9.473 2.725 1.841 2.985.585 6.609-2.803 8.089-15.836 6.919-34.342 7.18-56.771 4.613-10.817 20.476-21.181 44.653-23.105 64.872-1.56 16.405 2.384 30.148 19.662 34.773 8.966 2.399 20.386-1.059 32.165-8.373 19.938-12.381 40.088-36.126 51.077-67.925 1.091-3.157 4.979-4.859 8.677-3.797 3.698 1.061 5.815 4.486 4.723 7.643-11.995 34.709-34.284 60.456-56.047 73.97-16.027 9.951-32.072 13.266-44.271 10-17.435-4.666-26.405-15.444-29.243-29.697-3.553 5.523-7.12 10.109-10.601 13.838-6.778 7.262-13.44 11.463-19.181 13.338-6.369 2.081-12.013 1.581-16.507-.547-4.435-2.1-8.003-5.942-9.767-11.501a89.018 89.018 0 0 1-2.355-9.018c-6.555 12.857-12.488 20.804-17.613 25.535-7.812 7.212-14.746 8.247-19.908 7.526-8.436-1.179-13.58-7.985-14.395-9.197-4.517-6.719-4.284-15.832-1.492-24.707 1.181-3.753 2.776-7.458 4.442-10.836-3.506.796-6.862 1.297-9.882 1.51-7.845 19.414-16.543 32.987-24.76 41.79-6.778 7.262-13.44 11.463-19.181 13.338-6.369 2.081-12.012 1.581-16.507-.547-4.434-2.1-8.003-5.942-9.767-11.501a88.913 88.913 0 0 1-2.453-9.501Zm12.788-24.808c7.062-6.283 15.868-17.311 17.031-33.842.063-.884.018-1.818-.064-2.647-.144.104-.282.21-.411.316-1.991 1.633-4.042 3.958-6.02 6.835-4.857 7.064-9.125 17.263-10.536 29.338Zm132.842-32.015a71.862 71.862 0 0 0-1.424 8.122c7.062-6.283 15.868-17.311 17.031-33.842.062-.884.018-1.818-.064-2.647-.144.104-.282.21-.411.316-1.991 1.633-4.042 3.958-6.02 6.835-1.689 2.457-3.306 5.292-4.758 8.453a5.262 5.262 0 0 1-.16.603 489.403 489.403 0 0 1-4.194 12.16ZM289.338 136.023c-1.007 3.18-4.846 4.96-8.568 3.971-3.722-.989-5.926-4.374-4.92-7.555l8.058-25.465c1.007-3.181 4.846-4.96 8.568-3.972 3.722.989 5.926 4.375 4.92 7.555l-8.058 25.466Z"
  },
  []
), In = E(
  (t) => J(
    {
      d: t,
      className: U("web-line"),
      style: "fill:none;stroke:#b4b4b4;stroke-width:.45px"
    },
    []
  ),
  [
    "m90.163 201.42-19.722 72.651 1.332 2.407-1.459 1.667-1.982-1.204-.944-2.009 1.667-1.209 1.386.348M71.804 276.465l40.91-18.525M67.599 274.93l-52.836-15.538M70.356 278.141l22.823 38.912M68.391 276.947l-31.525 26.074",
    "M63.188 266.734s5.185 3.128 9.59-1.077c.191-.299-1.173 8.616 2.207 9.276.251-.007-3.089 3.831-2.123 7.208-.037.581-2.473-2.827-4.222.732-.027-.018-.808-4.504-3.541-3.092.044-.109 2.491-4.204-2.9-6.488-.041-.081 3.977-.406.989-6.559ZM22.675 212.885l45.889 61.362M69.387 277.816l-8.171 43.762",
    "M74.78 258.666s-.19 12.811 4.243 14.552c.028.087-5.238 7.182-3.34 13.868.036.198-5.341-4.51-7.903.626-.071.123-1.065-7.971-6.416-4.849-.056.007 3.804-6.082-2.066-10.434.029-.134 3.09-3.054-.949-12.012-.122-.076 9.057 9.202 16.431-1.751Z",
    "M77.048 250.24s-.233 16.408 5.779 21.441c.031.036-5.243 11.19-3.294 21.907.037.152-7.302-5.903-13.065.079.022.096-.358-10.985-9.024-7.633-.118-.015 3.61-7.961-2.378-14.825.09-.01 2.418-8.074-.41-15.597.244.125 13.499 9.129 22.392-5.372Z",
    "M78.576 244.525s1.78 18.442 10.75 24.012c.102-.026-8.3 16.687-5.1 32.927.158.138-11.829-9.775-18.935-.481.163-.002-3.892-14.73-11.764-11.606-.057.089 3.725-12.978-5.404-20.227.082.016 6.701-5.2-.008-22.445-.071.027 16.138 13.592 30.461-2.18Z",
    "M80.728 236.888s4.305 23.759 16.121 28.387c.003.188-8.435 13.367-8.994 42.611-.233-.094-15.646-5.762-24.268 1.776.027.206-4.241-15.786-16.777-14.792-.109-.032 8.487-16.021-7.825-28.469.164.003 8.818-6.156 5.076-25.084-.084.19 24.089 13.221 36.667-4.429Z",
    "M83.763 225.683s1.896 23.28 20.546 36.254c-.073-.017-13.494 37.777-12.291 53.005-.011.178-18.373-6.854-29.776 1.195.052.071-7.454-16.04-21.369-16.483.087-.002 3.825-24.401-16.056-37.382.042-.148 14.368-11.19 9.497-33.896.056.156 27.02 17.401 49.449-2.693Z"
  ]
), Nn = J(
  {
    className: U("spidro"),
    d: "M80.132 309.687c.214.175 1.805 1.723 1.805 1.723s-1.649-.904-2.311-1.242a.489.489 0 0 1-.203-.161c-.03.023-.075.032-.152.017-.301-.055-.604-.347-1.099-.705-.494-.358-2.128-1.48-2.442-2.069-.313-.59.981-.273.981-.273 1.751 1.867 3.229 2.315 3.448 2.539.123.125.089.157-.027.171Zm-21.419-16.288a.462.462 0 0 0-.016.015c-.028-.059-.016-.061.016-.015Zm-.552 6.194c.12-.045.26-.054.26-.054.232.034.68.072 1.024.093.131-.147.59-.213 1.923.083 1.493.332 2.247.285 2.502.25l-.732-.551-.469-.426-.631-.021-.096-.612-.206-.512.237-.765c-1.002-.694-1.995-1.679-2.241-1.919-.148-.144-.177-.249-.157-.324-.256.023-.479-.088-.53-.458-.072-.516-.257-.873-.332-.978.033-.028.111-.094.212-.168-.369.078-.53-.149-.658-.46-1.09-2.635-1.216-3.66-1.037-3.968-.155-1.572.859-4.367.859-4.367-.019 1.43-.426 3.054-.169 4.346.019.095.034.186.047.272a.657.657 0 0 1 .023.033c.325.479 1.727 3.794 1.727 3.794l-.104.051a.275.275 0 0 1 .241.15c.265.478.804 1.067.446 1.402l-.005.006.131-.045s.426.218.431.266a30.04 30.04 0 0 1 1.495 1.148l.145-.468.76-.952.686-.446.816-.668.928-.454 1.131-.456s.402-.135.964-.188a6.414 6.414 0 0 1 1.159.016l.382.296.627.34.467.327.646.418.432.525.26.699.343.357.194.237.061.228c.599-.632 1.22-1.262 1.522-1.606 0 0 .064-.001.153.01.017-.313.069-.759.076-1.354 0 0 .047-.013.12-.03l-.002-.006c-.12-.264.124-.487.405-2.163.28-1.676-.125-1.136.213-1.49 0 0 .123-.029.281-.046-.067-.378-.089-1.29-.177-3.469-.205-.39-.082-1.463-.082-1.463.282.706.408 1.14.437 1.386.086.419.593 2.961.424 3.641a.197.197 0 0 1 .049.158 10.52 10.52 0 0 1-.334 1.853c-.199.712.157 1.241-.265 1.421-.095.041-.19.085-.28.126.143.029.241.106.214.268-.078.472.081 1.438-.51 1.679-.001.35-.264.946-1.954 2.063l.05.155.039.96-.293.416-.183.473-.607.586c1.117-.207 2.293-.396 2.54-.463.356-.096.365-.104.406.047l1.216-.508s.005.031.02.078c.779-.345 1.685-1.055 1.685-1.055a.807.807 0 0 1 .342-.041.636.636 0 0 0-.026-.044c-.26-.395 3.086-2.264 3.086-2.264-1.476 1.778-2.183 2.449-2.553 2.624l-.003.006c-.136.205-1.404.882-2.044 1.201a.906.906 0 0 0 .054.002c.473-.001-.059.138-.692.382a7.903 7.903 0 0 1-.945.316c-.023.022-.049.047-.08.074-.286.258-3.013.554-4.373.687l-.266.336-.043.429-.166.056 1.747.88s-.07.127-.167.28c.16-.129.319-.222.319-.222.592.256 3.03 2.468 3.363 2.77.315.284.371.392.392.624.08-.031.136-.046.136-.046s1.107.757 1.153 1.193c.047.436-.075.375-.473.225-.399-.151-.716.361-.763.259-.268-.581-.323-.472-.545-.96a.406.406 0 0 1-.031-.093 1.36 1.36 0 0 1-.286-.099c-.744-.342-3.295-2.786-3.548-3.08a.181.181 0 0 1-.046-.133c-.069.067-.132.103-.176.082-.135-.065-.889-.381-1.669-.793a.56.56 0 0 1-.068.154c.679.273 1.852.784 1.729 1.019a1.759 1.759 0 0 1-.218.325c.223-.074.447-.117.447-.117.149.11 1.063 1.14 1.279 1.512.216.371.792.9.94 1.121.123.184.312.513.209.708.475.331.423.572.423.572l-.123.035c.445.258.883 1.003.898 1.29.019.346-.097.218-.51.113-.413-.105-.603.346-.658.212-.242-.589-.378-1.386-.378-1.386s-.006-.015-.011-.037l-.128.037a2.285 2.285 0 0 1-.452-.516l-.08.014c-.291.052-.227-.274-.67-.81-.444-.536-1.745-2.3-1.604-2.513l.001-.002a.292.292 0 0 1-.121-.044c-.175-.11-.897-.393-1.436-.71v.23a.262.262 0 0 1-.069.178c.387-.067.995.754 1.033 1.02.043.304-1.487.169-1.793.117-.212-.036-.13-.529-.06-.827a.708.708 0 0 1-.046.002h-.836a.39.39 0 0 1-.059-.004c.07.298.153.793-.059.829-.306.052-1.836.187-1.793-.117.038-.266.646-1.087 1.033-1.02a.262.262 0 0 1-.069-.178v-.524c0-.016.001-.032.004-.047-.537.461-1.305 1.004-1.41 1.269-.034.085-.112.127-.213.137l-.001.008c-.051.557-1.806 3.171-2.041 3.452-.064.076-.182.077-.32.038.052.523-.11 1.43-.204 1.584.121.343.186.736.185.944-.002.489-.083.76.041 1.957.123 1.196.038 1.282-.152.989-.05-.078-.132-.085-.225-.059.543.244.457.93.649 1.247.228.375.973.862 1.572 1.064 1.237-.015 1.166.034.679.115-.488.081-.912.128-1.297-.085-.385-.212-1.765-1.243-2.012-1.735a.8.8 0 0 1-.098-.371c-.083.024-.146.014-.171-.071-.094-.314-.019-.566-.071-1.019-.052-.453-.004-1.814-.121-2.176-.061-.187.007-.538.085-.832-.059-.002-.105-.019-.133-.06-.155-.231-.157-.614.08-1.382.093-.305.285-.438.481-.486-.097-.066-.161-.115-.167-.119.059.035 1.822-3.034 2.161-3.4l.036-.035c-.043-.045-.069-.087-.073-.122-.014-.113.409-.546.877-.987-.407.123-.772.236-.889.335a.191.191 0 0 1-.126.045c-.084.101-.221.22-.431.361-1.08.72-2.02 1.921-2.589 1.81a2.285 2.285 0 0 1-.227-.056c.131.331-.414.594-.533.99-.094.314-.266.596-.416.711l-.017.024c-.52.723-1.789 1.8-2.307 2.305-.518.505-.603.445-.956.456a4.61 4.61 0 0 0-.185.013.187.187 0 0 1-.008.044c-.087.295-.866 1.198-1.274 1.496-.408.299-.361.504-.885.645 0 0 1.296-2.13 1.42-2.236a.576.576 0 0 1 .244-.085.3.3 0 0 1-.01-.032c-.067-.271.535-.678 1.191-1.128.614-.421 1.656-1.65 1.788-1.807a1.53 1.53 0 0 0 .009-.243c-.01-.286.234-.573.565-.97.236-.282.577-.468.753-.551-.06-.06-.116-.123-.174-.188 0 0 2.347-2.143 3.306-2.359a.397.397 0 0 1-.011-.098c.011-.248 1.971-.791 2.798-1.008v-.203l-.071-.042a.845.845 0 0 1-.241.067c-.942.145-1.058.022-2.891-.124s-1.71-.089-2.044-.221a.839.839 0 0 1-.164-.085c-.375.03-.985-.004-1.251.003-.207.006-.265-.055-.305-.16-.195.042-.502.008-.74-.004-.483-.024-1.184-.283-1.717-.539-.534-.256-4.469-1.397-4.469-1.397s5.07.848 6.274 1.15c.318.08.518.14.639.185Zm8.044 2.817.021-.001h-.02l-.001.001Zm.334 1.047h-.313a.263.263 0 0 1-.049-.004l.004.004c.258.287.335.23.453.123a.44.44 0 0 1-.095-.123Zm1.93-.004a.263.263 0 0 1-.049.004h-.301a.421.421 0 0 1-.101.128c.115.104.193.155.447-.128l.004-.004Zm-7.365 3.58v-.001.001Zm14.991 5.473c.036.11-1.054.349-1.03.125.024-.224-.421-1.036-.802-1.858-.382-.822-.807-1.852-.315-1.98.493-.127.795.143 1.109 1.252.313 1.109 1.038 2.461 1.038 2.461Zm-1.364 2.914c1.208-.812.538-2.357.488-2.556-.051-.199.388-.092.54-.141.524-.168.363-.04.337.157-.348 2.605-1.365 2.54-1.365 2.54Z"
  },
  []
), kn = J(
  {
    d: "m67.682 297.112.054.062c.899.97 1.305 1.821 1.304 2.499-.001.496-.202.929-.623 1.275-.279.229-.647.305-1.043.223-.513-.107-1.082-.489-1.501-1.12-.432-.65-.714-1.571-.571-2.704l.023-.101.04-.087.052-.069.06-.054.143-.063h.164l.086.026.082.045.076.061.067.079.055.092.038.105.019.112-.003.111c-.147 1.164.303 2.018.854 2.391.276.187.575.261.768.103.183-.15.29-.318.301-.524.012-.22-.078-.466-.241-.745a5.686 5.686 0 0 0-.74-.957c-1.034-1.117-1.091-2.921-.673-3.866.237-.536.627-.805 1.034-.763.314.033.549.175.724.379.169.196.283.459.342.767.183.966-.267 2.5-.267 2.5v.001l-.038.091-.051.073-.128.097-.151.036-.082-.005-.086-.024-.084-.043-.004-.003Zm-.246-.36-.015-.077-.001-.11.021-.104s.283-.915.269-1.673a1.385 1.385 0 0 0-.058-.418c-.022-.059-.06-.101-.126-.108-.025-.003-.044.016-.064.033a.696.696 0 0 0-.164.247c-.236.534-.263 1.473.138 2.21Z",
    style: "fill:red",
    className: U("letter", "s")
  },
  []
);
Nr(
  {
    "xml:space": "preserve",
    viewBox: "0 0 809 416",
    className: U(""),
    style: {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      "stroke-linejoin": "round",
      "stroke-miterlimit": 1.5
    }
  },
  [Cn, ...In, Nn, kn]
);
const Yn = v(
  "modifyTag",
  (t, e, r, n) => V(t(e), r, n)
), Jn = v(
  "modifyProps",
  (t, e, r, n) => V(e, t(r), n)
), Qn = v(
  "modifyKids",
  (t, e, r, n) => V(e, r, t(n))
);
export {
  mr as $,
  Pn as HTML_TAGS,
  at as MARKED,
  M as NAMESPACES,
  Fn as SVG_TAGS,
  yr as SYMBOL,
  vr as _attr,
  Xn as _textify,
  Sr as attr,
  jt as autobox,
  hr as capitalize,
  $r as captureListeners,
  zn as clearRect,
  Ir as createElementNS,
  kr as formValues,
  Rn as get2dContext,
  _r as getContext,
  jr as getContextWithOptions,
  Zn as getSignature,
  Hn as handleForm,
  Tr as htmlText,
  v as inscribe,
  Dn as isMarked,
  se as isPlaceholder,
  ot as listenTo,
  qn as makeSelector,
  Qn as mapKids,
  Jn as mapProps,
  Yn as mapTag,
  Gn as mount,
  Wn as nsFromString,
  Or as onClick,
  Ar as onSubmit,
  dr as placeholderToString,
  Un as prependString,
  qr as processChildren,
  wr as remap,
  Vn as safeStringify,
  Pr as safeStringifyWithIndent,
  it as schonfinkel,
  Kn as selector,
  Bn as set,
  Ln as slugify,
  de as spin,
  Fe as stamp,
  gr as styleAttr,
  Nr as svg,
  st as svgTag,
  V as tag,
  ct as text,
  br as toString,
  Mr as trace,
  Er as xtrace
};
