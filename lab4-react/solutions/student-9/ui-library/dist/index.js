import se from "react";
var w = { exports: {} }, h = {};
var W;
function oe() {
  if (W) return h;
  W = 1;
  var t = /* @__PURE__ */ Symbol.for("react.transitional.element"), f = /* @__PURE__ */ Symbol.for("react.fragment");
  function i(a, u, o) {
    var m = null;
    if (o !== void 0 && (m = "" + o), u.key !== void 0 && (m = "" + u.key), "key" in u) {
      o = {};
      for (var R in u)
        R !== "key" && (o[R] = u[R]);
    } else o = u;
    return u = o.ref, {
      $$typeof: t,
      type: a,
      key: m,
      ref: u !== void 0 ? u : null,
      props: o
    };
  }
  return h.Fragment = f, h.jsx = i, h.jsxs = i, h;
}
var x = {};
var U;
function le() {
  return U || (U = 1, process.env.NODE_ENV !== "production" && (function() {
    function t(e) {
      if (e == null) return null;
      if (typeof e == "function")
        return e.$$typeof === te ? null : e.displayName || e.name || null;
      if (typeof e == "string") return e;
      switch (e) {
        case S:
          return "Fragment";
        case G:
          return "Profiler";
        case z:
          return "StrictMode";
        case Z:
          return "Suspense";
        case Q:
          return "SuspenseList";
        case ee:
          return "Activity";
        case re:
          return "ViewTransition";
      }
      if (typeof e == "object")
        switch (typeof e.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), e.$$typeof) {
          case J:
            return "Portal";
          case H:
            return e.displayName || "Context";
          case X:
            return (e._context.displayName || "Context") + ".Consumer";
          case B:
            var r = e.render;
            return e = e.displayName, e || (e = r.displayName || r.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
          case K:
            return r = e.displayName || null, r !== null ? r : t(e.type) || "Memo";
          case A:
            r = e._payload, e = e._init;
            try {
              return t(e(r));
            } catch {
            }
        }
      return null;
    }
    function f(e) {
      return "" + e;
    }
    function i(e) {
      try {
        f(e);
        var r = !1;
      } catch {
        r = !0;
      }
      if (r) {
        r = console;
        var n = r.error, l = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n.call(
          r,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          l
        ), f(e);
      }
    }
    function a(e) {
      if (e === S) return "<>";
      if (typeof e == "object" && e !== null && e.$$typeof === A)
        return "<...>";
      try {
        var r = t(e);
        return r ? "<" + r + ">" : "<...>";
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
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning) return !1;
      }
      return e.key !== void 0;
    }
    function R(e, r) {
      function n() {
        Y || (Y = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          r
        ));
      }
      n.isReactWarning = !0, Object.defineProperty(e, "key", {
        get: n,
        configurable: !0
      });
    }
    function j() {
      var e = t(this.type);
      return I[e] || (I[e] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), e = this.props.ref, e !== void 0 ? e : null;
    }
    function O(e, r, n, l, g, p) {
      var c = n.ref;
      return e = {
        $$typeof: N,
        type: e,
        key: r,
        props: n,
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
        value: p
      }), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
    }
    function y(e, r, n, l, g, p) {
      var c = r.children;
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
      if (L.call(r, "key")) {
        c = t(e);
        var T = Object.keys(r).filter(function(ne) {
          return ne !== "key";
        });
        l = 0 < T.length ? "{key: someKey, " + T.join(": ..., ") + ": ...}" : "{key: someKey}", V[c + l] || (T = 0 < T.length ? "{" + T.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          l,
          c,
          T,
          c
        ), V[c + l] = !0);
      }
      if (c = null, n !== void 0 && (i(n), c = "" + n), m(r) && (i(r.key), c = "" + r.key), "key" in r) {
        n = {};
        for (var $ in r)
          $ !== "key" && (n[$] = r[$]);
      } else n = r;
      return c && R(
        n,
        typeof e == "function" ? e.displayName || e.name || "Unknown" : e
      ), O(
        e,
        c,
        n,
        u(),
        g,
        p
      );
    }
    function d(e) {
      E(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e !== null && e.$$typeof === A && (e._payload.status === "fulfilled" ? E(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
    }
    function E(e) {
      return typeof e == "object" && e !== null && e.$$typeof === N;
    }
    var b = se, N = /* @__PURE__ */ Symbol.for("react.transitional.element"), J = /* @__PURE__ */ Symbol.for("react.portal"), S = /* @__PURE__ */ Symbol.for("react.fragment"), z = /* @__PURE__ */ Symbol.for("react.strict_mode"), G = /* @__PURE__ */ Symbol.for("react.profiler"), X = /* @__PURE__ */ Symbol.for("react.consumer"), H = /* @__PURE__ */ Symbol.for("react.context"), B = /* @__PURE__ */ Symbol.for("react.forward_ref"), Z = /* @__PURE__ */ Symbol.for("react.suspense"), Q = /* @__PURE__ */ Symbol.for("react.suspense_list"), K = /* @__PURE__ */ Symbol.for("react.memo"), A = /* @__PURE__ */ Symbol.for("react.lazy"), ee = /* @__PURE__ */ Symbol.for("react.activity"), re = /* @__PURE__ */ Symbol.for("react.view_transition"), te = /* @__PURE__ */ Symbol.for("react.client.reference"), P = b.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, L = Object.prototype.hasOwnProperty, ae = Array.isArray, C = console.createTask ? console.createTask : function() {
      return null;
    };
    b = {
      react_stack_bottom_frame: function(e) {
        return e();
      }
    };
    var Y, I = {}, F = b.react_stack_bottom_frame.bind(
      b,
      o
    )(), M = C(a(o)), V = {};
    x.Fragment = S, x.jsx = function(e, r, n) {
      var l = 1e4 > P.recentlyCreatedOwnerStacks++;
      if (l) {
        var g = Error.stackTraceLimit;
        Error.stackTraceLimit = 10;
        var p = Error("react-stack-top-frame");
        Error.stackTraceLimit = g;
      } else p = F;
      return y(
        e,
        r,
        n,
        !1,
        p,
        l ? C(a(e)) : M
      );
    }, x.jsxs = function(e, r, n) {
      var l = 1e4 > P.recentlyCreatedOwnerStacks++;
      if (l) {
        var g = Error.stackTraceLimit;
        Error.stackTraceLimit = 10;
        var p = Error("react-stack-top-frame");
        Error.stackTraceLimit = g;
      } else p = F;
      return y(
        e,
        r,
        n,
        !0,
        p,
        l ? C(a(e)) : M
      );
    };
  })()), x;
}
var q;
function ce() {
  return q || (q = 1, process.env.NODE_ENV === "production" ? w.exports = oe() : w.exports = le()), w.exports;
}
var s = ce();
const ie = "_card_1dreg_1", ue = "_title_1dreg_14", de = "_stats_1dreg_22", fe = "_stat_1dreg_22", me = "_statLabel_1dreg_33", _e = "_statValue_1dreg_39", be = "_button_1dreg_45", ve = "_buttonPrimary_1dreg_65", pe = "_buttonCompleted_1dreg_74", _ = {
  card: ie,
  title: ue,
  stats: de,
  stat: fe,
  statLabel: me,
  statValue: _e,
  button: be,
  buttonPrimary: ve,
  buttonCompleted: pe
}, Ne = ({
  name: t,
  currentStreak: f,
  bestStreak: i,
  isCompletedToday: a = !1,
  onMarkComplete: u,
  className: o = ""
}) => {
  const m = () => {
    !a && u && u();
  };
  return /* @__PURE__ */ s.jsxs("article", { className: `${_.card} ${o}`, "data-testid": "habit-card", children: [
    /* @__PURE__ */ s.jsx("h3", { className: _.title, children: t }),
    /* @__PURE__ */ s.jsxs("div", { className: _.stats, children: [
      /* @__PURE__ */ s.jsxs("div", { className: _.stat, children: [
        /* @__PURE__ */ s.jsx("span", { className: _.statLabel, children: "Текущая серия" }),
        /* @__PURE__ */ s.jsx("span", { className: _.statValue, "data-testid": "current-streak", children: f })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: _.stat, children: [
        /* @__PURE__ */ s.jsx("span", { className: _.statLabel, children: "Лучшая серия" }),
        /* @__PURE__ */ s.jsx("span", { className: _.statValue, "data-testid": "best-streak", children: i })
      ] })
    ] }),
    /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        className: `${_.button} ${a ? _.buttonCompleted : _.buttonPrimary}`,
        onClick: m,
        disabled: a,
        "aria-label": a ? "Уже выполнено сегодня" : "Отметить выполненным",
        "data-testid": "mark-button",
        children: a ? "Выполнено ✓" : "Отметить выполненным"
      }
    )
  ] });
}, Ee = "_container_1vvea_1", ge = "_grid_1vvea_8", Re = "_cell_1vvea_15", Te = "_cellEmpty_1vvea_22", ke = "_legend_1vvea_28", he = "_legendCell_1vvea_36", v = {
  container: Ee,
  grid: ge,
  cell: Re,
  cellEmpty: Te,
  legend: ke,
  legendCell: he
};
function k(t) {
  return t <= 0 ? "#ebedf0" : t === 1 ? "#9be9a8" : t === 2 ? "#40c463" : t === 3 ? "#30a14e" : "#216e39";
}
function D(t) {
  const [f, i, a] = t.split("-").map(Number);
  return new Date(f, i - 1, a);
}
function xe(t) {
  const f = t.getFullYear(), i = String(t.getMonth() + 1).padStart(2, "0"), a = String(t.getDate()).padStart(2, "0");
  return `${f}-${i}-${a}`;
}
function je(t, f) {
  const i = [], a = new Date(t);
  for (; a <= f; )
    i.push(xe(a)), a.setDate(a.getDate() + 1);
  return i;
}
const we = ({
  data: t,
  startDate: f,
  endDate: i,
  className: a = ""
}) => {
  const u = /* @__PURE__ */ new Map();
  t.forEach((d) => {
    u.set(d.date, d.completed);
  });
  let o, m;
  if (f && i)
    o = D(f), m = D(i);
  else if (t.length > 0) {
    const d = t.map((E) => D(E.date)).sort((E, b) => E.getTime() - b.getTime());
    o = d[0], m = d[d.length - 1];
  } else
    m = /* @__PURE__ */ new Date(), o = /* @__PURE__ */ new Date(), o.setDate(o.getDate() - 27);
  const R = je(o, m), j = o.getDay(), O = j === 0 ? 6 : j - 1, y = Array(O).fill(null).concat(R);
  return /* @__PURE__ */ s.jsxs("div", { className: `${v.container} ${a}`, "data-testid": "heatmap", children: [
    /* @__PURE__ */ s.jsx("div", { className: v.grid, role: "grid", "aria-label": "Тепловая карта отметок", children: y.map((d, E) => {
      if (d === null)
        return /* @__PURE__ */ s.jsx(
          "div",
          {
            className: v.cellEmpty,
            "aria-hidden": "true"
          },
          `empty-${E}`
        );
      const b = u.get(d) === !0, N = b ? 3 : 0;
      return /* @__PURE__ */ s.jsx(
        "div",
        {
          className: v.cell,
          style: {
            backgroundColor: k(N),
            borderColor: b ? "#216e39" : "#d1d5db"
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
    /* @__PURE__ */ s.jsxs("div", { className: v.legend, children: [
      /* @__PURE__ */ s.jsx("span", { children: "Меньше" }),
      /* @__PURE__ */ s.jsx("div", { className: v.legendCell, style: { backgroundColor: k(0) } }),
      /* @__PURE__ */ s.jsx("div", { className: v.legendCell, style: { backgroundColor: k(1) } }),
      /* @__PURE__ */ s.jsx("div", { className: v.legendCell, style: { backgroundColor: k(2) } }),
      /* @__PURE__ */ s.jsx("div", { className: v.legendCell, style: { backgroundColor: k(3) } }),
      /* @__PURE__ */ s.jsx("div", { className: v.legendCell, style: { backgroundColor: k(4) } }),
      /* @__PURE__ */ s.jsx("span", { children: "Больше" })
    ] })
  ] });
};
export {
  Ne as HabitCard,
  we as Heatmap
};
