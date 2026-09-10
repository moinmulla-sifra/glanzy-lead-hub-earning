import { i as e, n as t, t as n } from "./jsx-runtime-Cltr0gcK.js";
import { n as r, r as i } from "./link-CKQMLqzL.js";
import { r as a } from "./useMatch-CU29MQY4.js";
import { t as o } from "./useRouter-CwjitLz4.js";
function s(e) {
  return e?.isNotFound === !0;
}
var c = e(t(), 1),
  l = n(),
  u = class extends c.Component {
    constructor(...e) {
      (super(...e),
        (this.state = { error: 0 }),
        (this.reset = () => {
          this.setState({ error: 0 });
        }));
    }
    static getDerivedStateFromProps(e, t) {
      let n = e.getResetKey();
      return t.error && t.resetKey !== n
        ? { resetKey: n, error: 0 }
        : { resetKey: n };
    }
    static getDerivedStateFromError(e) {
      return { error: [e] };
    }
    componentDidCatch(e, t) {
      this.props.onCatch?.(e, t);
    }
    render() {
      let e = this.state.error;
      return e
        ? c.createElement(this.props.errorComponent ?? d, {
            error: e[0],
            reset: this.reset,
          })
        : this.props.children;
    }
  };
function d({ error: e }) {
  let [t, n] = c.useState(!1);
  return (0, l.jsxs)(`div`, {
    style: { padding: `.5rem`, maxWidth: `100%` },
    children: [
      (0, l.jsxs)(`div`, {
        style: { display: `flex`, alignItems: `center`, gap: `.5rem` },
        children: [
          (0, l.jsx)(`strong`, {
            style: { fontSize: `1rem` },
            children: `Something went wrong!`,
          }),
          (0, l.jsx)(`button`, {
            style: {
              appearance: `none`,
              fontSize: `.6em`,
              border: `1px solid currentColor`,
              padding: `.1rem .2rem`,
              fontWeight: `bold`,
              borderRadius: `.25rem`,
            },
            onClick: () => n((e) => !e),
            children: t ? `Hide Error` : `Show Error`,
          }),
        ],
      }),
      (0, l.jsx)(`div`, { style: { height: `.25rem` } }),
      t
        ? (0, l.jsx)(`div`, {
            children: (0, l.jsx)(`pre`, {
              style: {
                fontSize: `.7em`,
                border: `1px solid red`,
                borderRadius: `.25rem`,
                padding: `.3rem`,
                color: `red`,
                overflow: `auto`,
              },
              children: e?.message
                ? (0, l.jsx)(`code`, { children: e.message })
                : null,
            }),
          })
        : null,
    ],
  });
}
function f(e) {
  let t = o(),
    n = `not-found-${r(t.stores.location, (e) => e.pathname)}-${r(t.stores.status, (e) => e)}`;
  return (0, l.jsx)(u, {
    getResetKey: () => n,
    onCatch: (t, n) => {
      if (s(t)) e.onCatch?.(t, n);
      else throw t;
    },
    errorComponent: ({ error: t }) => {
      if (s(t)) return e.fallback?.(t);
      throw t;
    },
    children: e.children,
  });
}
function p() {
  return (0, l.jsx)(`p`, { children: `Not Found` });
}
function m(e) {
  return (0, l.jsx)(l.Fragment, { children: e.children });
}
function h(e, t, n) {
  return t.options.notFoundComponent
    ? (0, l.jsx)(t.options.notFoundComponent, { ...n })
    : e.options.defaultNotFoundComponent
      ? (0, l.jsx)(e.options.defaultNotFoundComponent, { ...n })
      : (0, l.jsx)(p, {});
}
function g(e, t) {
  let n = t?.options.pendingComponent ?? e.options.defaultPendingComponent;
  return n ? (0, l.jsx)(n, {}) : null;
}
var _ = (e, t) => e[0] === t[0] && e[1] === t[1],
  v = (e, t, n) =>
    !t.isRoot ||
    t.options.shellComponent ||
    t.options.wrapInSuspense ||
    n === !1 ||
    n === `data-only` ||
    !e.ssr,
  y = c.memo(function ({ routeId: e }) {
    let t = o();
    return (0, l.jsx)(b, {
      router: t,
      match: r(t.stores.getMatchStore(e), (e) => e),
    });
  });
function b({ router: e, match: t }) {
  let n = e.routesById[t.routeId],
    r = g(e, n),
    o = n.options.errorComponent ?? e.options.defaultErrorComponent,
    d = n.options.onCatch ?? e.options.defaultOnCatch,
    p = n.isRoot
      ? (n.options.notFoundComponent ??
        e.options.notFoundRoute?.options.component)
      : n.options.notFoundComponent,
    h = t.ssr === !1 || t.ssr === `data-only`,
    _ =
      v(e, n, t.ssr) &&
      (n.options.wrapInSuspense ??
        r ??
        (n.options.errorComponent?.preload || h))
        ? c.Suspense
        : m,
    y = o ? u : m,
    b = p ? f : m;
  return (0, l.jsxs)(n.isRoot ? (n.options.shellComponent ?? m) : m, {
    children: [
      (0, l.jsx)(a.Provider, {
        value: t.routeId,
        children: (0, l.jsx)(_, {
          fallback: r,
          children: (0, l.jsx)(y, {
            getResetKey: () => t,
            errorComponent: o,
            onCatch: (e, n) => {
              if (s(e)) throw ((e.routeId ??= t.routeId), e);
              d?.(e, n);
            },
            children: (0, l.jsx)(b, {
              fallback: (e) => {
                if (((e.routeId ??= t.routeId), e.routeId !== t.routeId))
                  throw e;
                return c.createElement(p, e);
              },
              children: h
                ? (0, l.jsx)(i, {
                    fallback: r,
                    children: (0, l.jsx)(x, { match: t }),
                  })
                : (0, l.jsx)(x, { match: t }),
            }),
          }),
        }),
      }),
      null,
    ],
  });
}
var x = c.memo(function ({ match: e }) {
    let t = o(),
      n = e.routeId,
      r = t.routesById[n],
      i = c.useMemo(() => {
        let i = (r.options.remountDeps ?? t.options.defaultRemountDeps)?.({
          routeId: n,
          loaderDeps: e.loaderDeps,
          params: e._strictParams,
          search: e._strictSearch,
        });
        return i ? JSON.stringify(i) : void 0;
      }, [
        n,
        e.loaderDeps,
        e._strictParams,
        e._strictSearch,
        r.options.remountDeps,
        t.options.defaultRemountDeps,
      ]),
      a = c.useMemo(() => {
        let e = r.options.component ?? t.options.defaultComponent;
        return e ? (0, l.jsx)(e, {}, i) : (0, l.jsx)(S, {});
      }, [i, r.options.component, t.options.defaultComponent]);
    if (e.status === `pending`) {
      if (t.ssr && !v(t, r, e.ssr)) return a;
      if (t._tx) throw t._tx[5];
      return g(t, r);
    }
    if (e.status === `notFound`) return h(t, r, e.error);
    if (e.status === `error`) throw e.error;
    return a;
  }),
  S = c.memo(function () {
    let e = o(),
      t = c.useContext(a),
      n,
      i,
      s;
    {
      let a = e.stores.getMatchStore(t);
      (([n, i] = r(a, (e) => [!!e._notFound, e.error], _)),
        (s = r(e.stores.ids, (e) => e[e.indexOf(t) + 1])));
    }
    if (n) return h(e, e.routesById[t], i);
    if (!s) return null;
    let u = (0, l.jsx)(y, { routeId: s });
    return t === `__root__`
      ? (0, l.jsx)(c.Suspense, { fallback: g(e), children: u })
      : u;
  }),
  C = `branzly-theme`;
function w() {
  if (typeof window > `u`) return `system`;
  let e = window.localStorage.getItem(C);
  return e === `dark` || e === `light` ? e : `system`;
}
function T(e) {
  if (!(typeof document > `u`)) {
    if ((window.localStorage.setItem(C, e), e === `system`)) {
      let e = window.matchMedia(`(prefers-color-scheme: dark)`).matches;
      document.documentElement.setAttribute(`data-theme`, e ? `dark` : `light`);
    } else document.documentElement.setAttribute(`data-theme`, e);
    window.dispatchEvent(new CustomEvent(`theme-change`, { detail: e }));
  }
}
var E = `
try {
  var t = localStorage.getItem('${C}');
  if (t === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else if (t === 'system') {
    var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', sysDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
`;
export {
  S as a,
  u as c,
  y as i,
  s as l,
  T as n,
  g as o,
  w as r,
  m as s,
  E as t,
};
