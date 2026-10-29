import se from "react";
var w = { exports: {} }, T = {};
var M;
function oe() {
  if (M) return T;
  M = 1;
  var r = /* @__PURE__ */ Symbol.for("react.transitional.element"), _ = /* @__PURE__ */ Symbol.for("react.fragment");
  function i(a, u, o) {
    var m = null;
    if (o !== void 0 && (m = "" + o), u.key !== void 0 && (m = "" + u.key), "key" in u) {
      o = {};
      for (var R in u)
        R !== "key" && (o[R] = u[R]);
    } else o = u;
    return u = o.ref, {
      $$typeof: r,
      type: a,
      key: m,
      ref: u !== void 0 ? u : null,
      props: o
    };
  }
  return T.Fragment = _, T.jsx = i, T.jsxs = i, T;
}
var x = {};
var V;
function le() {
  return V || (V = 1, process.env.NODE_ENV !== "production" && (function() {
    function r(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === re ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case S:
          return "Fragment";
        case G:
          return "Profiler";
        case J:
          return "StrictMode";
        case Z:
          return "Suspense";
        case Q:
          return "SuspenseList";
        case ee:
          return "Activity";
        case te:
          return "ViewTransition";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case q:
            return "Portal";
          case H:
            return e.displayName || "Context";
          case X:
            return (e._context.displayName || "Context") + ".Consumer";
          case B:
            var t = e.render;
            return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case K:
            return t = e.displayName || null, t !== null ? t : r(e.type) || "Memo";
          case A:
            t = e._payload, e = e._init;
            try {
              return r(e(t));
            } catch {
            }
        }
      return null;
    }
    function _(e) {
      return "" + e;
    }
    function i(e) {
      try {
        _(e);
        var t = !1;
      } catch {
        t = !0;
      }
      if (t) {
        t = console;
        var s = t.error, l = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return s.call(
          t,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          l
        ), _(e);
      }
    }
    function a(e) {
      if (e === S) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === A)
        return "<...>";
      try {
        var t = r(e);
        return t ? "<" + t + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function u() {
      var e = P.A;
      return e === null ? null : e.getOwner();
    }
    function o() {
      return Error("react-stack-top-frame");
    }
    function m(e) {
      if (L.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function R(e, t) {
      function s() {
        Y || (Y = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          t
        ));
      }
      s.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: s,
        configurable: !0
      });
    }
    function j() {
      var e = r(this.type);
      return z[e] || (z[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function O(e, t, s, l, g, E) {
      var c = s.ref;
      return e = {
        $$typeof: y,
        type: e,
        key: t,
        props: s,
        _owner: l
      }, (c !== void 0 ? c : null) !== null ? Object.defineProperty(e, "ref", {
        enumerable: !1,
        get: j
      }) : Object.defineProperty(e, "ref", { enumerable: !1, value: null }), e._store = {}, Object.defineProperty(e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(e, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(e, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: g
      }), Object.defineProperty(e, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: E
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function N(e, t, s, l, g, E) {
      var c = t.children;
      if (c !== void 0)
        if (l)
          if (ae(c)) {
            for (l = 0; l < c.length; l++)
              d(c[l]);
            Object.freeze && Object.freeze(c);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else d(c);
      if (L.call(t, "key")) {
        c = r(e);
        var k = Object.keys(t).filter(function(ne) {
          return ne !== "key";
        });
        l = 0 < k.length ? "{key: someKey, " + k.join(": ..., ") + ": ...}" : "{key: someKey}", F[c + l] || (k = 0 < k.length ? "{" + k.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          l,
          c,
          k,
          c
        ), F[c + l] = !0);
      }
      if (c = null, s !== void 0 && (i(s), c = "" + s), m(t) && (i(t.key), c = "" + t.key), "key" in t) {
        s = {};
        for (var $ in t)
          $ !== "key" && (s[$] = t[$]);
      } else s = t;
      return c && R(
        s,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), O(
        e,
        c,
        s,
        u(),
        g,
        E
      );
    }
    function d(e) {
      v(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === A && (e._payload.status === "fulfilled" ? v(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
    }
    function v(e) {
      return typeof e == "object" && e !== null && e.$$typeof === y;
    }
    var b = se, y = /* @__PURE__ */ Symbol.for("react.transitional.element"), q = /* @__PURE__ */ Symbol.for("react.portal"), S = /* @__PURE__ */ Symbol.for("react.fragment"), J = /* @__PURE__ */ Symbol.for("react.strict_mode"), G = /* @__PURE__ */ Symbol.for("react.profiler"), X = /* @__PURE__ */ Symbol.for("react.consumer"), H = /* @__PURE__ */ Symbol.for("react.context"), B = /* @__PURE__ */ Symbol.for("react.forward_ref"), Z = /* @__PURE__ */ Symbol.for("react.suspense"), Q = /* @__PURE__ */ Symbol.for("react.suspense_list"), K = /* @__PURE__ */ Symbol.for("react.memo"), A = /* @__PURE__ */ Symbol.for("react.lazy"), ee = /* @__PURE__ */ Symbol.for("react.activity"), te = /* @__PURE__ */ Symbol.for("react.view_transition"), re = /* @__PURE__ */ Symbol.for("react.client.reference"), P = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = Object.prototype.hasOwnProperty, ae = Array.isArray, C = console.createTask ? console.createTask : function() {
      return null;
    };
    b = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var Y, z = {}, I = b.react_stack_bottom_frame.bind(
      b,
      o
    )(), W = C(a(o)), F = {};
    x.Fragment = S, x.jsx = function(e, t, s) {
      var l = 1e4 > P.recentlyCreatedOwnerStacks++;
      if (l) {
        var g = Error.stackTraceLimit;
        Error.stackTraceLimit = 10;
        var E = Error("react-stack-top-frame");
        Error.stackTraceLimit = g;
      } else E = I;
      return N(
        e,
        t,
        s,
        !1,
        E,
        l ? C(a(e)) : W
      );
    }, x.jsxs = function(e, t, s) {
      var l = 1e4 > P.recentlyCreatedOwnerStacks++;
      if (l) {
        var g = Error.stackTraceLimit;
        Error.stackTraceLimit = 10;
        var E = Error("react-stack-top-frame");
        Error.stackTraceLimit = g;
      } else E = I;
      return N(
        e,
        t,
        s,
        !0,
        E,
        l ? C(a(e)) : W
      );
    };
  })()), x;
}
var U;
function ce() {
  return U || (U = 1, process.env.NODE_ENV === "production" ? w.exports = oe() : w.exports = le()), w.exports;
}
var n = ce();
const ie = "_card_bi9pz_1", ue = "_header_bi9pz_15", de = "_title_bi9pz_22", fe = "_status_bi9pz_30", _e = "_statusDone_bi9pz_39", me = "_statusWait_bi9pz_44", be = "_stats_bi9pz_49", pe = "_stat_bi9pz_30", Ee = "_statLabel_bi9pz_64", ve = "_statValue_bi9pz_72", ge = "_button_bi9pz_80", Re = "_buttonPrimary_bi9pz_100", ke = "_buttonCompleted_bi9pz_109", f = {
  card: ie,
  header: ue,
  title: de,
  status: fe,
  statusDone: _e,
  statusWait: me,
  stats: be,
  stat: pe,
  statLabel: Ee,
  statValue: ve,
  button: ge,
  buttonPrimary: Re,
  buttonCompleted: ke
}, Ae = ({
  name: r,
  currentStreak: _,
  bestStreak: i,
  isCompletedToday: a = !1,
  onMarkComplete: u,
  className: o = ""
}) => {
  const m = () => {
    !a && u && u();
  };
  return /* @__PURE__ */ n.jsxs("article", { className: `${f.card} ${o}`, "data-testid": "habit-card", children: [
    /* @__PURE__ */ n.jsxs("div", { className: f.header, children: [
      /* @__PURE__ */ n.jsx("h3", { className: f.title, children: r }),
      /* @__PURE__ */ n.jsx(
        "span",
        {
          className: `${f.status} ${a ? f.statusDone : f.statusWait}`,
          children: a ? "Сегодня готово" : "Ждёт отметки"
        }
      )
    ] }),
    /* @__PURE__ */ n.jsxs("div", { className: f.stats, children: [
      /* @__PURE__ */ n.jsxs("div", { className: f.stat, children: [
        /* @__PURE__ */ n.jsx("span", { className: f.statLabel, children: "Текущая серия" }),
        /* @__PURE__ */ n.jsx("span", { className: f.statValue, "data-testid": "current-streak", children: _ })
      ] }),
      /* @__PURE__ */ n.jsxs("div", { className: f.stat, children: [
        /* @__PURE__ */ n.jsx("span", { className: f.statLabel, children: "Лучшая серия" }),
        /* @__PURE__ */ n.jsx("span", { className: f.statValue, "data-testid": "best-streak", children: i })
      ] })
    ] }),
    /* @__PURE__ */ n.jsx(
      "button",
      {
        type: "button",
        className: `${f.button} ${a ? f.buttonCompleted : f.buttonPrimary}`,
        onClick: m,
        disabled: a,
        "aria-label": a ? "Уже выполнено сегодня" : "Отметить выполненным",
        "data-testid": "mark-button",
        children: a ? "Выполнено ✓" : "Отметить выполненным"
      }
    )
  ] });
}, he = "_container_1ked7_1", Te = "_grid_1ked7_9", xe = "_cell_1ked7_18", je = "_cellEmpty_1ked7_25", Ne = "_legend_1ked7_31", ye = "_legendCell_1ked7_40", p = {
  container: he,
  grid: Te,
  cell: xe,
  cellEmpty: je,
  legend: Ne,
  legendCell: ye
};
function h(r) {
  return r <= 0 ? "#eceaf3" : r === 1 ? "#c4b5fd" : r === 2 ? "#a78bfa" : r === 3 ? "#7c6bf5" : "#5b45d6";
}
function D(r) {
  const [_, i, a] = r.split("-").map(Number);
  return new Date(_, i - 1, a);
}
function we(r) {
  const _ = r.getFullYear(), i = String(r.getMonth() + 1).padStart(2, "0"), a = String(r.getDate()).padStart(2, "0");
  return `${_}-${i}-${a}`;
}
function Oe(r, _) {
  const i = [], a = new Date(r);
  for (; a <= _; )
    i.push(we(a)), a.setDate(a.getDate() + 1);
  return i;
}
const Pe = ({
  data: r,
  startDate: _,
  endDate: i,
  className: a = ""
}) => {
  const u = /* @__PURE__ */ new Map();
  r.forEach((d) => {
    u.set(d.date, d.completed);
  });
  let o, m;
  if (_ && i)
    o = D(_), m = D(i);
  else if (r.length > 0) {
    const d = r.map((v) => D(v.date)).sort((v, b) => v.getTime() - b.getTime());
    o = d[0], m = d[d.length - 1];
  } else
    m = /* @__PURE__ */ new Date(), o = /* @__PURE__ */ new Date(), o.setDate(o.getDate() - 27);
  const R = Oe(o, m), j = o.getDay(), O = j === 0 ? 6 : j - 1, N = Array(O).fill(null).concat(R);
  return /* @__PURE__ */ n.jsxs("div", { className: `${p.container} ${a}`, "data-testid": "heatmap", children: [
    /* @__PURE__ */ n.jsx("div", { className: p.grid, role: "grid", "aria-label": "Тепловая карта отметок", children: N.map((d, v) => {
      if (d === null)
        return /* @__PURE__ */ n.jsx(
          "div",
          {
            className: p.cellEmpty,
            "aria-hidden": "true"
          },
          `empty-${v}`
        );
      const b = u.get(d) === !0, y = b ? 3 : 0;
      return /* @__PURE__ */ n.jsx(
        "div",
        {
          className: p.cell,
          style: {
            backgroundColor: h(y),
            borderColor: b ? "#5b45d6" : "#e6e1f2"
          },
          role: "gridcell",
          title: `${d}: ${b ? "выполнено" : "не выполнено"}`,
          "data-date": d,
          "data-completed": b ? "true" : "false",
          "data-testid": `heatmap-cell-${d}`
        },
        d
      );
    }) }),
    /* @__PURE__ */ n.jsxs("div", { className: p.legend, children: [
      /* @__PURE__ */ n.jsx("span", { children: "Меньше" }),
      /* @__PURE__ */ n.jsx("div", { className: p.legendCell, style: { backgroundColor: h(0) } }),
      /* @__PURE__ */ n.jsx("div", { className: p.legendCell, style: { backgroundColor: h(1) } }),
      /* @__PURE__ */ n.jsx("div", { className: p.legendCell, style: { backgroundColor: h(2) } }),
      /* @__PURE__ */ n.jsx("div", { className: p.legendCell, style: { backgroundColor: h(3) } }),
      /* @__PURE__ */ n.jsx("div", { className: p.legendCell, style: { backgroundColor: h(4) } }),
      /* @__PURE__ */ n.jsx("span", { children: "Больше" })
    ] })
  ] });
};
export {
  Ae as HabitCard,
  Pe as Heatmap
};
