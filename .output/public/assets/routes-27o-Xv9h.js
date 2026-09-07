import { n as e } from "./rolldown-runtime-Bh1tDfsg.js";
import { c as t, i as n, s as r } from "./theme-DjMA5HfB.js";
import {
  C as i,
  E as a,
  O as o,
  S as s,
  T as c,
  b as l,
  c as u,
  d,
  h as f,
  i as p,
  l as m,
  n as h,
  u as g,
  v as _,
  x as v,
} from "./dist-CzUwd2eM.js";
import { n as y, t as b } from "./ThemeToggle-D-R7hces.js";
var x = class extends g {
  #e;
  #t = void 0;
  #n = void 0;
  #r = void 0;
  #i;
  #a;
  #o;
  #s;
  #c;
  #l;
  #u;
  #d;
  #f;
  #p = new Set();
  constructor(e, t) {
    (super(),
      (this.options = t),
      (this.#e = e),
      (this.#o = null),
      this.bindMethods(),
      this.setOptions(t));
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.#t.addObserver(this),
      C(this.#t, this.options) ? this.#m() : this.updateResult(),
      this.#y());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return w(this.#t, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return w(this.#t, this.options, this.options.refetchOnWindowFocus);
  }
  destroy() {
    ((this.listeners = new Set()),
      this.#b(),
      this.#x(),
      this.#t.removeObserver(this));
  }
  setOptions(e) {
    let t = this.options,
      n = this.#t;
    if (
      ((this.options = this.#e.defaultQueryOptions(e)),
      this.options.enabled !== void 0 &&
        typeof this.options.enabled != `boolean` &&
        typeof this.options.enabled != `function` &&
        typeof v(this.options.enabled, this.#t) != `boolean`)
    )
      throw Error(
        `Expected enabled to be a boolean or a callback that returns a boolean`,
      );
    (this.#S(),
      this.#t.setOptions(this.options),
      t._defaulted &&
        !s(this.options, t) &&
        this.#e
          .getQueryCache()
          .notify({
            type: `observerOptionsUpdated`,
            query: this.#t,
            observer: this,
          }));
    let r = this.hasListeners();
    (r && T(this.#t, n, this.options, t) && this.#m(),
      this.updateResult(),
      r &&
        (this.#t !== n ||
          v(this.options.enabled, this.#t) !== v(t.enabled, this.#t) ||
          v(this.options.staleTime, this.#t) !== v(t.staleTime, this.#t)) &&
        this.#g());
    let i = this.#_();
    r &&
      (this.#t !== n ||
        v(this.options.enabled, this.#t) !== v(t.enabled, this.#t) ||
        i !== this.#f) &&
      this.#v(i);
  }
  getOptimisticResult(e) {
    let t = this.#e.getQueryCache().build(this.#e, e),
      n = this.createResult(t, e);
    return (
      s(this.getCurrentResult(), n) ||
        ((this.#r = n), (this.#a = this.options), (this.#i = this.#t.state)),
      n
    );
  }
  getCurrentResult() {
    return this.#r;
  }
  trackResult(e, t) {
    return new Proxy(e, {
      get: (e, n) => (this.trackProp(n), t?.(n), Reflect.get(e, n)),
    });
  }
  trackProp(e) {
    this.#p.add(e);
  }
  getCurrentQuery() {
    return this.#t;
  }
  refetch({ ...e } = {}) {
    return this.fetch({ ...e });
  }
  fetchOptimistic(e) {
    let t = this.#e.defaultQueryOptions(e),
      n = this.#e.getQueryCache().build(this.#e, t),
      r = () => {},
      i,
      a = new Promise((e) => {
        ((i = e),
          (r = this.#e.getQueryCache().subscribe((i) => {
            i.type === `updated` &&
              i.query.queryHash === n.queryHash &&
              n.state.data !== void 0 &&
              (r(), e(this.createResult(n, t)));
          })));
      });
    return Promise.race([
      n
        .fetch()
        .then(() => {
          let e = this.createResult(n, t);
          return (i?.(e), e);
        })
        .finally(() => {
          r();
        }),
      a,
    ]);
  }
  fetch(e) {
    return this.#m({ ...e, cancelRefetch: e.cancelRefetch ?? !0 }).then(
      () => (this.updateResult(), this.#r),
    );
  }
  #m(e) {
    this.#S();
    let t = this.#t.fetch(this.options, e);
    return (e?.throwOnError || (t = t.catch(_)), t);
  }
  #h(e) {
    return !d() && v(this.options.enabled, this.#t) !== !1 && f(e);
  }
  #g() {
    this.#b();
    let e = v(this.options.staleTime, this.#t);
    if (this.#r.isStale || !this.#h(e)) return;
    let t = c(this.#r.dataUpdatedAt, e) + 1;
    this.#u = a.setTimeout(() => {
      this.#r.isStale || this.updateResult();
    }, t);
  }
  #_() {
    return (
      (typeof this.options.refetchInterval == `function`
        ? this.options.refetchInterval(this.#t)
        : this.options.refetchInterval) ?? !1
    );
  }
  #v(e) {
    (this.#x(),
      (this.#f = e),
      !(this.#f === 0 || !this.#h(this.#f)) &&
        (this.#d = a.setInterval(() => {
          (this.options.refetchIntervalInBackground || m.isFocused()) &&
            this.#m();
        }, this.#f)));
  }
  #y() {
    (this.#g(), this.#v(this.#_()));
  }
  #b() {
    this.#u !== void 0 && (a.clearTimeout(this.#u), (this.#u = void 0));
  }
  #x() {
    this.#d !== void 0 && (a.clearInterval(this.#d), (this.#d = void 0));
  }
  createResult(e, t) {
    let n = this.#t,
      r = this.options,
      i = this.#r,
      a = this.#i,
      o = this.#a,
      s = e === n ? this.#n : e.state,
      { state: c } = e,
      u = { ...c },
      d = !1,
      f;
    if (t._optimisticResults) {
      let i = this.hasListeners(),
        a = !i && C(e, t),
        o = i && T(e, n, t, r);
      ((a || o) && (u = { ...u, ...p(c.data, e.options) }),
        t._optimisticResults === `isRestoring` && (u.fetchStatus = `idle`));
    }
    let { error: m, errorUpdatedAt: h, status: g } = u;
    f = u.data;
    let _ = !1;
    if (t.placeholderData !== void 0 && f === void 0 && g === `pending`) {
      let e;
      (i?.isPlaceholderData && t.placeholderData === o?.placeholderData
        ? ((e = i.data), (_ = !0))
        : (e =
            typeof t.placeholderData == `function`
              ? t.placeholderData(this.#l?.state.data, this.#l)
              : t.placeholderData),
        e !== void 0 && ((g = `success`), (f = l(i?.data, e, t)), (d = !0)));
    }
    if (t.select && f !== void 0 && !_)
      if (i && f === a?.data && t.select === this.#s) f = this.#c;
      else
        try {
          ((this.#s = t.select),
            (f = t.select(f)),
            (f = l(i?.data, f, t)),
            (this.#c = f),
            (this.#o = null));
        } catch (e) {
          this.#o = e;
        }
    else f === void 0 && (this.#o = null);
    this.#o &&
      ((m = this.#o), (f = this.#c), (h = Date.now()), (g = `error`), (d = !1));
    let y = u.fetchStatus === `fetching`,
      b = g === `pending`,
      x = g === `error`,
      S = b && y,
      w = f !== void 0;
    return {
      status: g,
      fetchStatus: u.fetchStatus,
      isPending: b,
      isSuccess: g === `success`,
      isError: x,
      isInitialLoading: S,
      isLoading: S,
      data: f,
      dataUpdatedAt: u.dataUpdatedAt,
      error: m,
      errorUpdatedAt: h,
      failureCount: u.fetchFailureCount,
      failureReason: u.fetchFailureReason,
      errorUpdateCount: u.errorUpdateCount,
      isFetched: e.isFetched(),
      isFetchedAfterMount:
        u.dataUpdateCount > s.dataUpdateCount ||
        u.errorUpdateCount > s.errorUpdateCount,
      isFetching: y,
      isRefetching: y && !b,
      isLoadingError: x && !w,
      isPaused: u.fetchStatus === `paused`,
      isPlaceholderData: d,
      isRefetchError: x && w,
      isStale: E(e, t),
      refetch: this.refetch,
      isEnabled: v(t.enabled, e) !== !1,
    };
  }
  updateResult() {
    let e = this.#r,
      t = this.createResult(this.#t, this.options);
    if (
      ((this.#i = this.#t.state),
      (this.#a = this.options),
      this.#i.data !== void 0 && (this.#l = this.#t),
      s(t, e))
    )
      return;
    this.#r = t;
    let n = (() => {
      if (!e) return !0;
      let { notifyOnChangeProps: t } = this.options,
        n = typeof t == `function` ? t() : t;
      if (n === `all` || (!n && !this.#p.size)) return !0;
      let r = new Set(n ?? this.#p);
      return (
        this.options.throwOnError && r.add(`error`),
        Object.keys(this.#r).some((t) => {
          let n = t;
          return this.#r[n] !== e[n] && r.has(n);
        })
      );
    })();
    u.batch(() => {
      (n &&
        this.listeners.forEach((e) => {
          e(this.#r);
        }),
        this.#e
          .getQueryCache()
          .notify({ query: this.#t, type: `observerResultsUpdated` }));
    });
  }
  #S() {
    let e = this.#e.getQueryCache().build(this.#e, this.options);
    if (e === this.#t) return;
    let t = this.#t;
    ((this.#t = e),
      (this.#n = e.state),
      this.hasListeners() && (t?.removeObserver(this), e.addObserver(this)));
  }
  onQueryUpdate() {
    (this.updateResult(), this.hasListeners() && this.#y());
  }
};
function S(e, t) {
  return (
    v(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === `error` && v(t.retryOnMount, e) === !1)
  );
}
function C(e, t) {
  return S(e, t) || (e.state.data !== void 0 && w(e, t, t.refetchOnMount));
}
function w(e, t, n) {
  if (v(t.enabled, e) !== !1 && v(t.staleTime, e) !== `static`) {
    let r = typeof n == `function` ? n(e) : n;
    return r === `always` || (r !== !1 && E(e, t));
  }
  return !1;
}
function T(e, t, n, r) {
  return (
    (e !== t || v(r.enabled, e) === !1) &&
    (!n.suspense || e.state.status !== `error`) &&
    E(e, n)
  );
}
function E(e, t) {
  return v(t.enabled, e) !== !1 && e.isStaleByTime(v(t.staleTime, e));
}
var D = e(t(), 1),
  O = D.createContext(!1),
  k = () => D.useContext(O);
O.Provider;
var A = r();
function ee() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var te = D.createContext(ee()),
  j = () => D.useContext(te),
  M = (e, t, n) => {
    let r =
      n?.state.error && typeof e.throwOnError == `function`
        ? i(e.throwOnError, [n.state.error, n])
        : e.throwOnError;
    (e.suspense || r) && (t.isReset() || (e.retryOnMount = !1));
  },
  ne = (e) => {
    D.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  re = ({
    result: e,
    errorResetBoundary: t,
    throwOnError: n,
    query: r,
    suspense: a,
  }) =>
    e.isError &&
    !t.isReset() &&
    !e.isFetching &&
    r &&
    ((a && e.data === void 0) || i(n, [e.error, r])),
  ie = (e) => {
    if (e.suspense) {
      let t = 1e3,
        n = (e) => (e === `static` ? e : Math.max(e ?? t, t)),
        r = e.staleTime;
      ((e.staleTime = typeof r == `function` ? (...e) => n(r(...e)) : n(r)),
        typeof e.gcTime == `number` && (e.gcTime = Math.max(e.gcTime, t)));
    }
  },
  ae = (e, t) => e?.suspense && t.isPending,
  oe = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function se(e, t, n) {
  let r = k(),
    i = j(),
    a = o(n),
    s = a.defaultQueryOptions(e),
    c = a.getQueryCache().get(s.queryHash),
    l = e.subscribed !== !1;
  ((s._optimisticResults = r ? `isRestoring` : l ? `optimistic` : void 0),
    ie(s),
    M(s, i, c),
    ne(i));
  let [d] = D.useState(() => new t(a, s)),
    f = d.getOptimisticResult(s),
    p = !r && l;
  if (
    (D.useSyncExternalStore(
      D.useCallback(
        (e) => {
          let t = p ? d.subscribe(u.batchCalls(e)) : _;
          return (d.updateResult(), t);
        },
        [d, p],
      ),
      () => d.getCurrentResult(),
      () => d.getCurrentResult(),
    ),
    D.useEffect(() => {
      d.setOptions(s);
    }, [s, d]),
    ae(s, f))
  )
    throw oe(s, d, i);
  if (
    re({
      result: f,
      errorResetBoundary: i,
      throwOnError: s.throwOnError,
      query: c,
      suspense: s.suspense,
    })
  )
    throw f.error;
  return s.notifyOnChangeProps ? f : d.trackResult(f);
}
function N(e, t) {
  return se(e, x, t);
}
var P = (...e) =>
    e
      .filter((e, t, n) => !!e && e.trim() !== `` && n.indexOf(e) === t)
      .join(` `)
      .trim(),
  F = (e) => e.replace(/([a-z0-9])([A-Z])/g, `$1-$2`).toLowerCase(),
  ce = (e) =>
    e.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, t, n) =>
      n ? n.toUpperCase() : t.toLowerCase(),
    ),
  I = (e) => {
    let t = ce(e);
    return t.charAt(0).toUpperCase() + t.slice(1);
  },
  le = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 2,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  ue = (e) => {
    for (let t in e)
      if (t.startsWith(`aria-`) || t === `role` || t === `title`) return !0;
    return !1;
  },
  L = (0, D.forwardRef)(
    (
      {
        color: e = `currentColor`,
        size: t = 24,
        strokeWidth: n = 2,
        absoluteStrokeWidth: r,
        className: i = ``,
        children: a,
        iconNode: o,
        ...s
      },
      c,
    ) =>
      (0, D.createElement)(
        `svg`,
        {
          ref: c,
          ...le,
          width: t,
          height: t,
          stroke: e,
          strokeWidth: r ? (Number(n) * 24) / Number(t) : n,
          className: P(`lucide`, i),
          ...(!a && !ue(s) && { "aria-hidden": `true` }),
          ...s,
        },
        [
          ...o.map(([e, t]) => (0, D.createElement)(e, t)),
          ...(Array.isArray(a) ? a : [a]),
        ],
      ),
  ),
  R = (e, t) => {
    let n = (0, D.forwardRef)(({ className: n, ...r }, i) =>
      (0, D.createElement)(L, {
        ref: i,
        iconNode: t,
        className: P(`lucide-${F(I(e))}`, `lucide-${e}`, n),
        ...r,
      }),
    );
    return ((n.displayName = I(e)), n);
  },
  z = R(`arrow-left`, [
    [`path`, { d: `m12 19-7-7 7-7`, key: `1l729n` }],
    [`path`, { d: `M19 12H5`, key: `x3x0zl` }],
  ]),
  B = R(`chevron-right`, [[`path`, { d: `m9 18 6-6-6-6`, key: `mthhwq` }]]),
  V = R(`copy`, [
    [
      `rect`,
      {
        width: `14`,
        height: `14`,
        x: `8`,
        y: `8`,
        rx: `2`,
        ry: `2`,
        key: `17jyea`,
      },
    ],
    [
      `path`,
      {
        d: `M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2`,
        key: `zix9uf`,
      },
    ],
  ]),
  H = R(`earth`, [
    [`path`, { d: `M21.54 15H17a2 2 0 0 0-2 2v4.54`, key: `1djwo0` }],
    [
      `path`,
      {
        d: `M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17`,
        key: `1tzkfa`,
      },
    ],
    [
      `path`,
      {
        d: `M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05`,
        key: `14pb5j`,
      },
    ],
    [`circle`, { cx: `12`, cy: `12`, r: `10`, key: `1mglay` }],
  ]),
  de = R(`funnel`, [
    [
      `path`,
      {
        d: `M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z`,
        key: `sc7q7i`,
      },
    ],
  ]),
  fe = R(`linkedin`, [
    [
      `path`,
      {
        d: `M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z`,
        key: `c2jq9f`,
      },
    ],
    [`rect`, { width: `4`, height: `12`, x: `2`, y: `9`, key: `mk3on5` }],
    [`circle`, { cx: `4`, cy: `4`, r: `2`, key: `bt5ra8` }],
  ]),
  pe = R(`log-out`, [
    [`path`, { d: `m16 17 5-5-5-5`, key: `1bji2h` }],
    [`path`, { d: `M21 12H9`, key: `dn1m92` }],
    [`path`, { d: `M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4`, key: `1uf3rs` }],
  ]),
  me = R(`mail`, [
    [`path`, { d: `m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7`, key: `132q7q` }],
    [
      `rect`,
      { x: `2`, y: `4`, width: `20`, height: `16`, rx: `2`, key: `izxlao` },
    ],
  ]),
  he = R(`pencil`, [
    [
      `path`,
      {
        d: `M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z`,
        key: `1a8usu`,
      },
    ],
    [`path`, { d: `m15 5 4 4`, key: `1mk7zo` }],
  ]),
  ge = R(`refresh-cw`, [
    [
      `path`,
      {
        d: `M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8`,
        key: `v9h5vc`,
      },
    ],
    [`path`, { d: `M21 3v5h-5`, key: `1q7to0` }],
    [
      `path`,
      {
        d: `M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16`,
        key: `3uifl3`,
      },
    ],
    [`path`, { d: `M8 16H3v5`, key: `1cv678` }],
  ]),
  _e = R(`search`, [
    [`path`, { d: `m21 21-4.34-4.34`, key: `14j7rj` }],
    [`circle`, { cx: `11`, cy: `11`, r: `8`, key: `4ej97u` }],
  ]),
  ve = [`Pending`, `Complete`, `Success`];
function U(e) {
  return e === `Pending`
    ? `pending`
    : e === `Complete`
      ? `complete`
      : e === `Success`
        ? `success`
        : `priority`;
}
function W(e) {
  return e == null || e === `` ? `—` : String(e);
}
function G(e) {
  return /^https?:\/\//i.test(e) ? e : `https://${e}`;
}
async function K(e, t) {
  try {
    (await navigator.clipboard.writeText(e), h.success(`${t} copied`));
  } catch {
    h.error(`Could not copy ${t.toLowerCase()}`);
  }
}
function ye({ lead: e, onChanged: t, mobileOpen: n = !1, onMobileClose: r }) {
  let [i, a] = (0, D.useState)(`Pending`),
    [o, s] = (0, D.useState)(!1),
    [c, l] = (0, D.useState)(!1),
    [u, d] = (0, D.useState)(``),
    [f, p] = (0, D.useState)(``),
    [m, g] = (0, D.useState)(!1);
  if (
    ((0, D.useEffect)(() => {
      (a(e?.mail ?? `Pending`),
        d(e?.email_subject ?? ``),
        p(e?.email_body ?? ``),
        l(!1));
    }, [e?.id, e?.mail, e?.email_subject, e?.email_body]),
    (0, D.useEffect)(() => {
      if (n)
        return (
          document.body.classList.add(`mobile-details-active`),
          () => document.body.classList.remove(`mobile-details-active`)
        );
    }, [n]),
    !e)
  )
    return (0, A.jsx)(`aside`, {
      className: `details-panel`,
      "aria-label": `Lead details`,
      children: (0, A.jsxs)(`div`, {
        className: `empty-state`,
        children: [
          (0, A.jsx)(`div`, { className: `empty-icon`, children: `✦` }),
          (0, A.jsx)(`h3`, { children: `Select a brand` }),
          (0, A.jsx)(`p`, {
            children: `Click any lead to view its full details and change the mail status.`,
          }),
        ],
      }),
    });
  async function _() {
    if (!e) return;
    s(!0);
    let { error: n } = await y
      .from(`brand_leads`)
      .update({ mail: i, updated_at: new Date().toISOString() })
      .eq(`id`, e.id);
    if ((s(!1), n)) {
      h.error(n.message);
      return;
    }
    (h.success(`Mail status: ${e.mail ?? `—`} → ${i}`), t());
  }
  async function v() {
    if (!e) return;
    g(!0);
    let { error: n } = await y
      .from(`brand_leads`)
      .update({
        email_subject: u,
        email_body: f,
        updated_at: new Date().toISOString(),
      })
      .eq(`id`, e.id);
    if ((g(!1), n)) {
      h.error(n.message);
      return;
    }
    (l(!1), h.success(`Email draft saved`), t());
  }
  return (0, A.jsxs)(`aside`, {
    className: `details-panel${n ? ` mobile-open` : ``}`,
    "aria-label": `${W(e.company_name)} details`,
    children: [
      (0, A.jsxs)(`div`, {
        className: `mobile-details-nav`,
        children: [
          (0, A.jsxs)(`button`, {
            className: `mobile-back-btn`,
            type: `button`,
            onClick: r,
            children: [
              (0, A.jsx)(z, { "aria-hidden": `true` }),
              (0, A.jsx)(`span`, { children: `Leads` }),
            ],
          }),
          (0, A.jsx)(`span`, { children: `Lead details` }),
        ],
      }),
      (0, A.jsx)(`div`, {
        className: `details-header`,
        children: (0, A.jsxs)(`div`, {
          className: `details-title`,
          children: [
            (0, A.jsxs)(`div`, {
              children: [
                (0, A.jsx)(`h2`, { children: W(e.company_name) }),
                (0, A.jsxs)(`p`, {
                  children: [W(e.industry), ` · `, W(e.company_stage)],
                }),
              ],
            }),
            (0, A.jsx)(`span`, {
              className: `badge ${U(e.mail)}`,
              children: W(e.mail),
            }),
          ],
        }),
      }),
      (0, A.jsxs)(`div`, {
        className: `details-body`,
        children: [
          (0, A.jsxs)(`div`, {
            className: `detail-section`,
            children: [
              (0, A.jsx)(`h4`, { children: `Mail status` }),
              (0, A.jsxs)(`div`, {
                className: `status-editor`,
                children: [
                  (0, A.jsx)(`select`, {
                    className: `control`,
                    value: i,
                    onChange: (e) => a(e.target.value),
                    children: ve.map((e) =>
                      (0, A.jsx)(`option`, { value: e, children: e }, e),
                    ),
                  }),
                  (0, A.jsx)(`button`, {
                    className: `btn primary`,
                    onClick: _,
                    disabled: o,
                    children: o ? `Saving…` : `Save`,
                  }),
                ],
              }),
              (0, A.jsx)(`div`, {
                className: `muted status-help`,
                children: `Pending → Complete → Success. The Supabase trigger keeps the corresponding tables synchronized.`,
              }),
            ],
          }),
          (0, A.jsxs)(`div`, {
            className: `detail-section`,
            children: [
              (0, A.jsxs)(`div`, {
                className: `section-head`,
                children: [
                  (0, A.jsx)(`h4`, { children: `Email draft` }),
                  (0, A.jsxs)(`div`, {
                    className: `section-actions`,
                    children: [
                      (0, A.jsxs)(`button`, {
                        className: `btn small secondary`,
                        onClick: () => K(u ?? ``, `Subject`),
                        disabled: !u,
                        children: [
                          (0, A.jsx)(V, { "aria-hidden": `true` }),
                          ` `,
                          (0, A.jsx)(`span`, { children: `Subject` }),
                        ],
                      }),
                      (0, A.jsxs)(`button`, {
                        className: `btn small secondary`,
                        onClick: () => K(f ?? ``, `Body`),
                        disabled: !f,
                        children: [
                          (0, A.jsx)(V, { "aria-hidden": `true` }),
                          ` `,
                          (0, A.jsx)(`span`, { children: `Body` }),
                        ],
                      }),
                      (0, A.jsxs)(`button`, {
                        className: `btn small secondary`,
                        onClick: () =>
                          K(`${u ?? ``}\n\n${f ?? ``}`.trim(), `Email`),
                        disabled: !u && !f,
                        children: [
                          (0, A.jsx)(V, { "aria-hidden": `true` }),
                          ` `,
                          (0, A.jsx)(`span`, { children: `Both` }),
                        ],
                      }),
                      (0, A.jsxs)(`button`, {
                        className: `btn small secondary`,
                        onClick: () => {
                          (c &&
                            (d(e.email_subject ?? ``), p(e.email_body ?? ``)),
                            l(!c));
                        },
                        children: [
                          c ? null : (0, A.jsx)(he, { "aria-hidden": `true` }),
                          ` `,
                          (0, A.jsx)(`span`, {
                            children: c ? `Cancel` : `Edit`,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              c
                ? (0, A.jsxs)(A.Fragment, {
                    children: [
                      (0, A.jsxs)(`div`, {
                        className: `field full email-subject-field`,
                        children: [
                          (0, A.jsx)(`label`, {
                            htmlFor: `emailSubject`,
                            children: `Subject`,
                          }),
                          (0, A.jsx)(`input`, {
                            id: `emailSubject`,
                            className: `email-input`,
                            value: u,
                            onChange: (e) => d(e.target.value),
                          }),
                        ],
                      }),
                      (0, A.jsxs)(`div`, {
                        className: `field full`,
                        children: [
                          (0, A.jsx)(`label`, {
                            htmlFor: `emailBody`,
                            children: `Body`,
                          }),
                          (0, A.jsx)(`textarea`, {
                            id: `emailBody`,
                            className: `email-area`,
                            value: f,
                            onChange: (e) => p(e.target.value),
                          }),
                        ],
                      }),
                      (0, A.jsx)(`div`, {
                        className: `section-actions email-save-actions`,
                        children: (0, A.jsx)(`button`, {
                          className: `btn primary small`,
                          onClick: v,
                          disabled: m,
                          children: m ? `Saving…` : `Save email`,
                        }),
                      }),
                    ],
                  })
                : (0, A.jsxs)(`div`, {
                    className: `field-grid`,
                    children: [
                      (0, A.jsxs)(`div`, {
                        className: `field full`,
                        children: [
                          (0, A.jsx)(`label`, { children: `Subject` }),
                          (0, A.jsx)(`div`, {
                            className: `value pre`,
                            children: W(e.email_subject),
                          }),
                        ],
                      }),
                      (0, A.jsxs)(`div`, {
                        className: `field full`,
                        children: [
                          (0, A.jsx)(`label`, { children: `Body` }),
                          (0, A.jsx)(`div`, {
                            className: `value pre`,
                            children: W(e.email_body),
                          }),
                        ],
                      }),
                    ],
                  }),
            ],
          }),
          (0, A.jsxs)(`div`, {
            className: `detail-section`,
            children: [
              (0, A.jsx)(`h4`, { children: `Quick links` }),
              (0, A.jsxs)(`div`, {
                className: `link-row`,
                children: [
                  e.website
                    ? (0, A.jsxs)(`a`, {
                        className: `link`,
                        href: G(e.website),
                        target: `_blank`,
                        rel: `noopener noreferrer`,
                        children: [
                          (0, A.jsx)(H, { "aria-hidden": `true` }),
                          ` Website`,
                        ],
                      })
                    : null,
                  e.linkedin
                    ? (0, A.jsxs)(`a`, {
                        className: `link`,
                        href: G(e.linkedin),
                        target: `_blank`,
                        rel: `noopener noreferrer`,
                        children: [
                          (0, A.jsx)(fe, { "aria-hidden": `true` }),
                          ` LinkedIn`,
                        ],
                      })
                    : null,
                  e.email
                    ? (0, A.jsxs)(`a`, {
                        className: `link`,
                        href: `mailto:${e.email}`,
                        children: [
                          (0, A.jsx)(me, { "aria-hidden": `true` }),
                          ` Email`,
                        ],
                      })
                    : null,
                ],
              }),
            ],
          }),
          (0, A.jsxs)(`div`, {
            className: `detail-section`,
            children: [
              (0, A.jsx)(`h4`, { children: `Lead signals` }),
              (0, A.jsxs)(`div`, {
                className: `field-grid`,
                children: [
                  (0, A.jsx)(q, { label: `Lead score`, value: e.lead_score }),
                  (0, A.jsx)(q, {
                    label: `Influencer fit`,
                    value: e.influencer_fit_score,
                  }),
                  (0, A.jsx)(q, { label: `Priority`, value: e.priority }),
                  (0, A.jsx)(q, {
                    label: `Budget potential`,
                    value: e.budget_potential,
                  }),
                ],
              }),
            ],
          }),
          (0, A.jsxs)(`div`, {
            className: `detail-section`,
            children: [
              (0, A.jsx)(`h4`, { children: `Company` }),
              (0, A.jsxs)(`div`, {
                className: `field-grid`,
                children: [
                  (0, A.jsx)(q, { label: `Contact`, value: e.contact_person }),
                  (0, A.jsx)(q, { label: `Role`, value: e.contact_role }),
                  (0, A.jsx)(q, { label: `Email`, value: e.email }),
                  (0, A.jsx)(q, { label: `Phone`, value: e.phone }),
                  (0, A.jsx)(q, {
                    label: `Product`,
                    value: e.product,
                    full: !0,
                  }),
                ],
              }),
            ],
          }),
          (0, A.jsxs)(`div`, {
            className: `detail-section`,
            children: [
              (0, A.jsx)(`h4`, { children: `Why now` }),
              (0, A.jsx)(`div`, {
                className: `field`,
                children: (0, A.jsx)(`div`, {
                  className: `value pre`,
                  children: W(e.why_now),
                }),
              }),
            ],
          }),
          (0, A.jsxs)(`div`, {
            className: `detail-section`,
            children: [
              (0, A.jsx)(`h4`, { children: `Growth signals` }),
              (0, A.jsxs)(`div`, {
                className: `field-grid`,
                children: [
                  (0, A.jsx)(q, {
                    label: `Recent funding`,
                    value: e.recent_funding,
                    full: !0,
                  }),
                  (0, A.jsx)(q, {
                    label: `Recent launch`,
                    value: e.recent_launch,
                    full: !0,
                  }),
                  (0, A.jsx)(q, {
                    label: `Marketing activity`,
                    value: e.marketing_activity,
                    full: !0,
                  }),
                  (0, A.jsx)(q, {
                    label: `Creator activity`,
                    value: e.existing_creator_activity,
                    full: !0,
                  }),
                  (0, A.jsx)(q, {
                    label: `Next action`,
                    value: e.next_action,
                    full: !0,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function q({ label: e, value: t, full: n }) {
  return (0, A.jsxs)(`div`, {
    className: n ? `field full` : `field`,
    children: [
      (0, A.jsx)(`label`, { children: e }),
      (0, A.jsx)(`div`, { className: `value pre`, children: W(t) }),
    ],
  });
}
var J = 50,
  be = [
    `company_name`,
    `industry`,
    `product`,
    `email`,
    `contact_person`,
    `contact_role`,
    `website`,
    `recent_funding`,
    `recent_launch`,
    `marketing_activity`,
    `existing_creator_activity`,
    `why_now`,
    `next_action`,
    `email_subject`,
    `email_body`,
  ],
  Y = {
    lead_desc: { column: `lead_score`, ascending: !1 },
    fit_desc: { column: `influencer_fit_score`, ascending: !1 },
    updated_desc: { column: `updated_at`, ascending: !1 },
    verified_desc: { column: `verified_at`, ascending: !1 },
    name_asc: { column: `company_name`, ascending: !0 },
  };
function xe() {
  let e = n(),
    t = o(),
    [r, i] = (0, D.useState)(!1),
    [a, s] = (0, D.useState)(null),
    [c, l] = (0, D.useState)({
      search: ``,
      mail: `all`,
      priority: `all`,
      budget: `all`,
      industry: `all`,
      stage: `all`,
      sort: `lead_desc`,
      page: 0,
    }),
    [u, d] = (0, D.useState)(``),
    [f, p] = (0, D.useState)(null),
    [m, h] = (0, D.useState)(!1);
  ((0, D.useEffect)(() => {
    let t = !0;
    y.auth.getSession().then(({ data: n }) => {
      if (t) {
        if (!n.session) {
          e({ to: `/auth`, replace: !0 });
          return;
        }
        (s(n.session.user.email ?? null), i(!0));
      }
    });
    let { data: n } = y.auth.onAuthStateChange((t, n) => {
      t === `SIGNED_OUT` || !n
        ? (i(!1), e({ to: `/auth`, replace: !0 }))
        : s(n.user.email ?? null);
    });
    return () => {
      ((t = !1), n.subscription.unsubscribe());
    };
  }, [e]),
    (0, D.useEffect)(() => {
      let e = setTimeout(
        () => l((e) => ({ ...e, search: u.trim(), page: 0 })),
        300,
      );
      return () => clearTimeout(e);
    }, [u]));
  let g = N({
      queryKey: [`brand_leads`, c],
      enabled: r,
      queryFn: async () => Se(c),
    }),
    _ = N({ queryKey: [`brand_leads_stats`], enabled: r, queryFn: Ce }),
    v = N({ queryKey: [`brand_leads_options`], enabled: r, queryFn: we }),
    x = (0, D.useCallback)(() => {
      (t.invalidateQueries({ queryKey: [`brand_leads`] }),
        t.invalidateQueries({ queryKey: [`brand_leads_stats`] }),
        t.invalidateQueries({ queryKey: [`brand_leads_options`] }));
    }, [t]);
  (0, D.useEffect)(() => {
    if (!r) return;
    let e = y
      .channel(`brand_leads_changes`)
      .on(
        `postgres_changes`,
        { event: `*`, schema: `public`, table: `brand_leads` },
        () => {
          x();
        },
      )
      .subscribe();
    return () => {
      y.removeChannel(e);
    };
  }, [r, x]);
  let S = g.data?.rows ?? [],
    C = g.data?.count ?? 0;
  (0, D.useEffect)(() => {
    !f && S[0] && p(S[0].id);
  }, [S, f]);
  let w = (0, D.useMemo)(() => S.find((e) => e.id === f) ?? null, [S, f]);
  async function T() {
    (await t.cancelQueries(),
      t.clear(),
      await y.auth.signOut(),
      e({ to: `/auth`, replace: !0 }));
  }
  let E = _.data,
    O = Math.max(1, Math.ceil(C / J)),
    k = [c.mail, c.priority, c.budget, c.industry, c.stage].filter(
      (e) => e !== `all`,
    ).length;
  return r
    ? (0, A.jsxs)(`div`, {
        className: `glanzy app-shell`,
        children: [
          (0, A.jsxs)(`header`, {
            className: `topbar`,
            children: [
              (0, A.jsxs)(`div`, {
                className: `topbar-copy`,
                children: [
                  (0, A.jsx)(`div`, {
                    className: `eyebrow`,
                    children: `GLANZY STUDIO`,
                  }),
                  (0, A.jsx)(`h1`, { children: `Lead Command Center` }),
                  (0, A.jsx)(`p`, {
                    children: `Search, review and update your saved brand leads directly from Supabase.`,
                  }),
                ],
              }),
              (0, A.jsxs)(`div`, {
                className: `topbar-actions`,
                children: [
                  a
                    ? (0, A.jsx)(`span`, {
                        className: `user-chip`,
                        children: a,
                      })
                    : null,
                  (0, A.jsx)(b, {}),
                  (0, A.jsxs)(`button`, {
                    className: `btn secondary icon-label-btn`,
                    onClick: x,
                    children: [
                      (0, A.jsx)(ge, { "aria-hidden": `true` }),
                      (0, A.jsx)(`span`, { children: `Refresh` }),
                    ],
                  }),
                  (0, A.jsxs)(`button`, {
                    className: `btn danger icon-label-btn`,
                    onClick: T,
                    children: [
                      (0, A.jsx)(pe, { "aria-hidden": `true` }),
                      (0, A.jsx)(`span`, { children: `Sign out` }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, A.jsxs)(`section`, {
            className: `stats`,
            children: [
              (0, A.jsx)(Z, { label: `Total Leads`, value: E?.total }),
              (0, A.jsx)(Z, { label: `Pending`, value: E?.pending }),
              (0, A.jsx)(Z, { label: `Complete`, value: E?.complete }),
              (0, A.jsx)(Z, { label: `Success`, value: E?.success }),
            ],
          }),
          (0, A.jsxs)(`section`, {
            className: `toolbar`,
            "aria-label": `Lead search and filters`,
            children: [
              (0, A.jsxs)(`div`, {
                className: `search-wrap`,
                children: [
                  (0, A.jsx)(_e, { "aria-hidden": `true` }),
                  (0, A.jsx)(`input`, {
                    type: `search`,
                    placeholder: `Search brands, industry, product, email, email draft...`,
                    autoComplete: `off`,
                    value: u,
                    onChange: (e) => d(e.target.value),
                  }),
                ],
              }),
              (0, A.jsxs)(`details`, {
                className: `mobile-filter-panel`,
                children: [
                  (0, A.jsxs)(`summary`, {
                    children: [
                      (0, A.jsx)(de, { "aria-hidden": `true` }),
                      `Filters`,
                      k ? ` (${k})` : ``,
                    ],
                  }),
                  (0, A.jsx)(`div`, {
                    className: `mobile-filter-grid`,
                    children: (0, A.jsx)(X, {
                      filters: c,
                      setFilters: l,
                      industries: v.data?.industries ?? [],
                      stages: v.data?.stages ?? [],
                    }),
                  }),
                ],
              }),
              (0, A.jsx)(`div`, {
                className: `desktop-filter-controls`,
                children: (0, A.jsx)(X, {
                  filters: c,
                  setFilters: l,
                  industries: v.data?.industries ?? [],
                  stages: v.data?.stages ?? [],
                }),
              }),
            ],
          }),
          (0, A.jsxs)(`main`, {
            className: `content-grid`,
            children: [
              (0, A.jsxs)(`section`, {
                className: `table-panel`,
                children: [
                  (0, A.jsxs)(`div`, {
                    className: `panel-header`,
                    children: [
                      (0, A.jsxs)(`div`, {
                        children: [
                          (0, A.jsx)(`h2`, { children: `Saved Brands` }),
                          (0, A.jsx)(`span`, {
                            className: `muted`,
                            children: g.isLoading
                              ? `Loading…`
                              : `${C} match${C === 1 ? `` : `es`}`,
                          }),
                        ],
                      }),
                      g.error
                        ? (0, A.jsx)(`div`, {
                            className: `error`,
                            children: g.error.message,
                          })
                        : null,
                    ],
                  }),
                  (0, A.jsx)(`div`, {
                    className: `table-wrap`,
                    children: (0, A.jsxs)(`table`, {
                      children: [
                        (0, A.jsx)(`thead`, {
                          children: (0, A.jsxs)(`tr`, {
                            children: [
                              (0, A.jsx)(`th`, { children: `Brand` }),
                              (0, A.jsx)(`th`, { children: `Industry` }),
                              (0, A.jsx)(`th`, { children: `Lead` }),
                              (0, A.jsx)(`th`, { children: `Priority` }),
                              (0, A.jsx)(`th`, { children: `Budget` }),
                              (0, A.jsx)(`th`, { children: `Mail` }),
                            ],
                          }),
                        }),
                        (0, A.jsx)(`tbody`, {
                          children: g.isLoading
                            ? (0, A.jsx)(`tr`, {
                                children: (0, A.jsx)(`td`, {
                                  colSpan: 6,
                                  className: `loading`,
                                  children: `Loading saved brands…`,
                                }),
                              })
                            : S.length === 0
                              ? (0, A.jsx)(`tr`, {
                                  children: (0, A.jsx)(`td`, {
                                    colSpan: 6,
                                    className: `loading`,
                                    children: `No matching brands.`,
                                  }),
                                })
                              : S.map((e) =>
                                  (0, A.jsxs)(
                                    `tr`,
                                    {
                                      className: f === e.id ? `selected` : ``,
                                      onClick: () => p(e.id),
                                      children: [
                                        (0, A.jsx)(`td`, {
                                          children: (0, A.jsxs)(`div`, {
                                            className: `brand-cell`,
                                            children: [
                                              (0, A.jsx)(`div`, {
                                                className: `avatar`,
                                                children: $(e.company_name),
                                              }),
                                              (0, A.jsxs)(`div`, {
                                                children: [
                                                  (0, A.jsx)(`div`, {
                                                    className: `brand-name`,
                                                    children: W(e.company_name),
                                                  }),
                                                  (0, A.jsx)(`div`, {
                                                    className: `brand-sub`,
                                                    children: W(
                                                      e.email ||
                                                        e.website ||
                                                        e.product,
                                                    ),
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                        (0, A.jsx)(`td`, {
                                          children: W(e.industry),
                                        }),
                                        (0, A.jsx)(`td`, {
                                          children: (0, A.jsx)(`span`, {
                                            className: `score`,
                                            children: e.lead_score ?? `—`,
                                          }),
                                        }),
                                        (0, A.jsx)(`td`, {
                                          children: (0, A.jsx)(`span`, {
                                            className: `badge priority`,
                                            children: W(e.priority),
                                          }),
                                        }),
                                        (0, A.jsx)(`td`, {
                                          children: W(e.budget_potential),
                                        }),
                                        (0, A.jsx)(`td`, {
                                          children: (0, A.jsx)(`span`, {
                                            className: `badge ${U(e.mail)}`,
                                            children: W(e.mail),
                                          }),
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                ),
                        }),
                      ],
                    }),
                  }),
                  (0, A.jsx)(`div`, {
                    className: `mobile-lead-list`,
                    "aria-live": `polite`,
                    children: g.isLoading
                      ? (0, A.jsx)(`div`, {
                          className: `loading`,
                          children: `Loading saved brands…`,
                        })
                      : S.length === 0
                        ? (0, A.jsx)(`div`, {
                            className: `loading`,
                            children: `No matching brands.`,
                          })
                        : S.map((e) =>
                            (0, A.jsxs)(
                              `button`,
                              {
                                type: `button`,
                                className: `mobile-lead-card`,
                                onClick: () => {
                                  (p(e.id), h(!0));
                                },
                                "aria-label": `Open ${W(e.company_name)} details`,
                                children: [
                                  (0, A.jsxs)(`span`, {
                                    className: `mobile-lead-main`,
                                    children: [
                                      (0, A.jsx)(`span`, {
                                        className: `avatar`,
                                        children: $(e.company_name),
                                      }),
                                      (0, A.jsxs)(`span`, {
                                        className: `mobile-lead-copy`,
                                        children: [
                                          (0, A.jsxs)(`span`, {
                                            className: `mobile-brand-line`,
                                            children: [
                                              (0, A.jsx)(`span`, {
                                                className: `brand-name`,
                                                children: W(e.company_name),
                                              }),
                                              (0, A.jsx)(`span`, {
                                                className: `badge ${U(e.mail)}`,
                                                children: W(e.mail),
                                              }),
                                            ],
                                          }),
                                          (0, A.jsx)(`span`, {
                                            className: `brand-sub`,
                                            children: W(
                                              e.industry || e.product,
                                            ),
                                          }),
                                        ],
                                      }),
                                      (0, A.jsx)(B, {
                                        className: `mobile-lead-chevron`,
                                        "aria-hidden": `true`,
                                      }),
                                    ],
                                  }),
                                  (0, A.jsxs)(`span`, {
                                    className: `mobile-lead-metrics`,
                                    children: [
                                      (0, A.jsxs)(`span`, {
                                        children: [
                                          (0, A.jsx)(`small`, {
                                            children: `Lead score`,
                                          }),
                                          (0, A.jsx)(`strong`, {
                                            children: e.lead_score ?? `—`,
                                          }),
                                        ],
                                      }),
                                      (0, A.jsxs)(`span`, {
                                        children: [
                                          (0, A.jsx)(`small`, {
                                            children: `Priority`,
                                          }),
                                          (0, A.jsx)(`strong`, {
                                            children: W(e.priority),
                                          }),
                                        ],
                                      }),
                                      (0, A.jsxs)(`span`, {
                                        children: [
                                          (0, A.jsx)(`small`, {
                                            children: `Budget`,
                                          }),
                                          (0, A.jsx)(`strong`, {
                                            children: W(e.budget_potential),
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              e.id,
                            ),
                          ),
                  }),
                  (0, A.jsxs)(`div`, {
                    className: `pagination`,
                    children: [
                      (0, A.jsxs)(`span`, {
                        className: `muted`,
                        children: [`Page `, c.page + 1, ` of `, O],
                      }),
                      (0, A.jsxs)(`div`, {
                        className: `section-actions`,
                        children: [
                          (0, A.jsx)(`button`, {
                            className: `btn small secondary`,
                            disabled: c.page === 0,
                            onClick: () =>
                              l((e) => ({ ...e, page: e.page - 1 })),
                            children: `← Previous`,
                          }),
                          (0, A.jsx)(`button`, {
                            className: `btn small secondary`,
                            disabled: c.page + 1 >= O,
                            onClick: () =>
                              l((e) => ({ ...e, page: e.page + 1 })),
                            children: `Next →`,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              (0, A.jsx)(ye, {
                lead: w,
                onChanged: x,
                mobileOpen: m,
                onMobileClose: () => h(!1),
              }),
            ],
          }),
        ],
      })
    : (0, A.jsx)(`div`, {
        className: `glanzy app-shell`,
        children: (0, A.jsx)(`div`, {
          className: `loading`,
          children: `Checking your session…`,
        }),
      });
}
function X({ filters: e, setFilters: t, industries: n, stages: r }) {
  return (0, A.jsxs)(A.Fragment, {
    children: [
      (0, A.jsx)(Q, {
        value: e.mail,
        onChange: (e) => t((t) => ({ ...t, mail: e, page: 0 })),
        options: [
          [`all`, `All mail statuses`],
          [`Pending`, `Pending`],
          [`Complete`, `Complete`],
          [`Success`, `Success`],
        ],
      }),
      (0, A.jsx)(Q, {
        value: e.priority,
        onChange: (e) => t((t) => ({ ...t, priority: e, page: 0 })),
        options: [
          [`all`, `All priorities`],
          [`Immediate`, `Immediate`],
          [`High Priority`, `High Priority`],
          [`Good Lead`, `Good Lead`],
          [`Nurture`, `Nurture`],
          [`Low`, `Low`],
        ],
      }),
      (0, A.jsx)(Q, {
        value: e.budget,
        onChange: (e) => t((t) => ({ ...t, budget: e, page: 0 })),
        options: [
          [`all`, `All budget potential`],
          [`Very High`, `Very High`],
          [`High`, `High`],
          [`Medium`, `Medium`],
          [`Low`, `Low`],
          [`Unknown`, `Unknown`],
        ],
      }),
      (0, A.jsx)(Q, {
        value: e.industry,
        onChange: (e) => t((t) => ({ ...t, industry: e, page: 0 })),
        options: [[`all`, `All industries`], ...n.map((e) => [e, e])],
      }),
      (0, A.jsx)(Q, {
        value: e.stage,
        onChange: (e) => t((t) => ({ ...t, stage: e, page: 0 })),
        options: [[`all`, `All company stages`], ...r.map((e) => [e, e])],
      }),
      (0, A.jsx)(Q, {
        value: e.sort,
        onChange: (e) => t((t) => ({ ...t, sort: e, page: 0 })),
        options: [
          [`lead_desc`, `Lead score ↓`],
          [`fit_desc`, `Influencer fit ↓`],
          [`updated_desc`, `Recently updated`],
          [`verified_desc`, `Recently verified`],
          [`name_asc`, `Brand A–Z`],
        ],
      }),
    ],
  });
}
function Z({ label: e, value: t }) {
  return (0, A.jsxs)(`div`, {
    className: `stat`,
    children: [
      (0, A.jsx)(`div`, { className: `label`, children: e }),
      (0, A.jsx)(`div`, { className: `value`, children: t ?? `—` }),
    ],
  });
}
function Q({ value: e, onChange: t, options: n }) {
  return (0, A.jsx)(`select`, {
    className: `control`,
    value: e,
    onChange: (e) => t(e.target.value),
    children: n.map(([e, t]) =>
      (0, A.jsx)(`option`, { value: e, children: t }, e),
    ),
  });
}
function $(e) {
  return String(e || `?`)
    .split(/\s+/)
    .slice(0, 2)
    .map((e) => e[0])
    .join(``)
    .toUpperCase();
}
async function Se(e) {
  let t = async (t) => {
      let n = Y[t],
        r = y.from(`brand_leads`).select(`*`, { count: `exact` }),
        i = e.search.replace(/[,()%]/g, ` `).trim();
      (i && (r = r.or(be.map((e) => `${e}.ilike.%${i}%`).join(`,`))),
        e.mail !== `all` && (r = r.eq(`mail`, e.mail)),
        e.priority !== `all` && (r = r.eq(`priority`, e.priority)),
        e.budget !== `all` && (r = r.eq(`budget_potential`, e.budget)),
        e.industry !== `all` && (r = r.eq(`industry`, e.industry)),
        e.stage !== `all` && (r = r.eq(`company_stage`, e.stage)),
        (r = r.order(n.column, { ascending: n.ascending, nullsFirst: !1 })));
      let a = e.page * J;
      return r.range(a, a + J - 1);
    },
    { data: n, error: r, count: i } = await t(e.sort);
  if (
    (r &&
      e.sort === `verified_desc` &&
      /verified_at/.test(r.message) &&
      (h.message(
        `No verified date on this table — sorted by recently updated instead.`,
      ),
      ({ data: n, error: r, count: i } = await t(`updated_desc`))),
    r)
  )
    throw Error(r.message);
  return { rows: n ?? [], count: i ?? 0 };
}
async function Ce() {
  let e = async (e) => {
      let t = y.from(`brand_leads`).select(`id`, { count: `exact`, head: !0 });
      e && (t = t.eq(`mail`, e));
      let { count: n, error: r } = await t;
      if (r) throw Error(r.message);
      return n ?? 0;
    },
    [t, n, r, i] = await Promise.all([
      e(),
      e(`Pending`),
      e(`Complete`),
      e(`Success`),
    ]);
  return { total: t, pending: n, complete: r, success: i };
}
async function we() {
  let { data: e, error: t } = await y
    .from(`brand_leads`)
    .select(`industry, company_stage`)
    .limit(2e3);
  if (t) throw Error(t.message);
  let n = new Set(),
    r = new Set();
  for (let t of e ?? [])
    (t.industry && n.add(t.industry),
      t.company_stage && r.add(t.company_stage));
  return { industries: [...n].sort(), stages: [...r].sort() };
}
export { xe as component };
