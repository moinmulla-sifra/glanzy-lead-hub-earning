import { n as e, t } from "./rolldown-runtime-Bh1tDfsg.js";
import { c as n, s as r } from "./theme-DjMA5HfB.js";
var i = t((e) => {
    var t = n();
    function r(e) {
      var t = `https://react.dev/errors/` + e;
      if (1 < arguments.length) {
        t += `?args[]=` + encodeURIComponent(arguments[1]);
        for (var n = 2; n < arguments.length; n++)
          t += `&args[]=` + encodeURIComponent(arguments[n]);
      }
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    function i() {}
    var a = {
        d: {
          f: i,
          r: function () {
            throw Error(r(522));
          },
          D: i,
          C: i,
          L: i,
          m: i,
          X: i,
          S: i,
          M: i,
        },
        p: 0,
        findDOMNode: null,
      },
      o = Symbol.for(`react.portal`);
    function s(e, t, n) {
      var r =
        3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: o,
        key: r == null ? null : `` + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    var c = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    function l(e, t) {
      if (e === `font`) return ``;
      if (typeof t == `string`) return t === `use-credentials` ? t : ``;
    }
    ((e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a),
      (e.createPortal = function (e, t) {
        var n =
          2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!t || (t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11))
          throw Error(r(299));
        return s(e, t, null, n);
      }),
      (e.flushSync = function (e) {
        var t = c.T,
          n = a.p;
        try {
          if (((c.T = null), (a.p = 2), e)) return e();
        } finally {
          ((c.T = t), (a.p = n), a.d.f());
        }
      }),
      (e.preconnect = function (e, t) {
        typeof e == `string` &&
          (t
            ? ((t = t.crossOrigin),
              (t =
                typeof t == `string`
                  ? t === `use-credentials`
                    ? t
                    : ``
                  : void 0))
            : (t = null),
          a.d.C(e, t));
      }),
      (e.prefetchDNS = function (e) {
        typeof e == `string` && a.d.D(e);
      }),
      (e.preinit = function (e, t) {
        if (typeof e == `string` && t && typeof t.as == `string`) {
          var n = t.as,
            r = l(n, t.crossOrigin),
            i = typeof t.integrity == `string` ? t.integrity : void 0,
            o = typeof t.fetchPriority == `string` ? t.fetchPriority : void 0;
          n === `style`
            ? a.d.S(
                e,
                typeof t.precedence == `string` ? t.precedence : void 0,
                { crossOrigin: r, integrity: i, fetchPriority: o },
              )
            : n === `script` &&
              a.d.X(e, {
                crossOrigin: r,
                integrity: i,
                fetchPriority: o,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              });
        }
      }),
      (e.preinitModule = function (e, t) {
        if (typeof e == `string`)
          if (typeof t == `object` && t) {
            if (t.as == null || t.as === `script`) {
              var n = l(t.as, t.crossOrigin);
              a.d.M(e, {
                crossOrigin: n,
                integrity:
                  typeof t.integrity == `string` ? t.integrity : void 0,
                nonce: typeof t.nonce == `string` ? t.nonce : void 0,
              });
            }
          } else t ?? a.d.M(e);
      }),
      (e.preload = function (e, t) {
        if (
          typeof e == `string` &&
          typeof t == `object` &&
          t &&
          typeof t.as == `string`
        ) {
          var n = t.as,
            r = l(n, t.crossOrigin);
          a.d.L(e, n, {
            crossOrigin: r,
            integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            nonce: typeof t.nonce == `string` ? t.nonce : void 0,
            type: typeof t.type == `string` ? t.type : void 0,
            fetchPriority:
              typeof t.fetchPriority == `string` ? t.fetchPriority : void 0,
            referrerPolicy:
              typeof t.referrerPolicy == `string` ? t.referrerPolicy : void 0,
            imageSrcSet:
              typeof t.imageSrcSet == `string` ? t.imageSrcSet : void 0,
            imageSizes: typeof t.imageSizes == `string` ? t.imageSizes : void 0,
            media: typeof t.media == `string` ? t.media : void 0,
          });
        }
      }),
      (e.preloadModule = function (e, t) {
        if (typeof e == `string`)
          if (t) {
            var n = l(t.as, t.crossOrigin);
            a.d.m(e, {
              as: typeof t.as == `string` && t.as !== `script` ? t.as : void 0,
              crossOrigin: n,
              integrity: typeof t.integrity == `string` ? t.integrity : void 0,
            });
          } else a.d.m(e);
      }),
      (e.requestFormReset = function (e) {
        a.d.r(e);
      }),
      (e.unstable_batchedUpdates = function (e, t) {
        return e(t);
      }),
      (e.useFormState = function (e, t, n) {
        return c.H.useFormState(e, t, n);
      }),
      (e.useFormStatus = function () {
        return c.H.useHostTransitionStatus();
      }),
      (e.version = `19.2.8`));
  }),
  a = t((e, t) => {
    function n() {
      if (!(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
      ))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
        } catch (e) {
          console.error(e);
        }
    }
    (n(), (t.exports = i()));
  }),
  o = e(n(), 1),
  s = r(),
  c = o.createContext(void 0),
  l = (e) => {
    let t = o.useContext(c);
    if (e) return e;
    if (!t)
      throw Error(`No QueryClient set, use QueryClientProvider to set one`);
    return t;
  },
  u = ({ client: e, children: t }) => (
    o.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e],
    ),
    (0, s.jsx)(c.Provider, { value: e, children: t })
  ),
  d = {
    setTimeout: (e, t) => setTimeout(e, t),
    clearTimeout: (e) => clearTimeout(e),
    setInterval: (e, t) => setInterval(e, t),
    clearInterval: (e) => clearInterval(e),
  },
  f = new (class {
    #e = d;
    setTimeoutProvider(e) {
      this.#e = e;
    }
    setTimeout(e, t) {
      return this.#e.setTimeout(e, t);
    }
    clearTimeout(e) {
      this.#e.clearTimeout(e);
    }
    setInterval(e, t) {
      return this.#e.setInterval(e, t);
    }
    clearInterval(e) {
      this.#e.clearInterval(e);
    }
  })();
function p(e) {
  setTimeout(e, 0);
}
var m = typeof window > `u` || `Deno` in globalThis;
function h() {}
function g(e, t) {
  return typeof e == `function` ? e(t) : e;
}
function _(e) {
  return typeof e == `number` && e >= 0 && e !== 1 / 0;
}
function v(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function y(e, t) {
  return typeof e == `function` ? e(t) : e;
}
function b(e, t) {
  let {
    type: n = `all`,
    exact: r,
    fetchStatus: i,
    predicate: a,
    queryKey: o,
    stale: s,
  } = e;
  if (o) {
    if (r) {
      if (t.queryHash !== ee(o, t.options)) return !1;
    } else if (!C(t.queryKey, o)) return !1;
  }
  if (n !== `all`) {
    let e = t.isActive();
    if ((n === `active` && !e) || (n === `inactive` && e)) return !1;
  }
  return !(
    (typeof s == `boolean` && t.isStale() !== s) ||
    (i && i !== t.state.fetchStatus) ||
    (a && !a(t))
  );
}
function x(e, t) {
  let { exact: n, status: r, predicate: i, mutationKey: a } = e;
  if (a) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (S(t.options.mutationKey) !== S(a)) return !1;
    } else if (!C(t.options.mutationKey, a)) return !1;
  }
  return !((r && t.state.status !== r) || (i && !i(t)));
}
function ee(e, t) {
  return (t?.queryKeyHashFn || S)(e);
}
function S(e) {
  return JSON.stringify(e, (e, t) =>
    D(t)
      ? Object.keys(t)
          .sort()
          .reduce((e, n) => ((e[n] = t[n]), e), {})
      : t,
  );
}
function C(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (e && t && typeof e == `object` && typeof t == `object`) {
    if (Array.isArray(e) && Array.isArray(t)) {
      for (let n = 0; n < t.length; n++) if (!C(e[n], t[n])) return !1;
      return !0;
    }
    let n = Object.keys(t);
    for (let r of n) if (!C(e[r], t[r])) return !1;
    return !0;
  }
  return !1;
}
var w = Object.prototype.hasOwnProperty;
function te(e, t, n = 0) {
  if (e === t) return e;
  if (n > 500) return t;
  let r = E(e) && E(t);
  if (!r && !(D(e) && D(t))) return t;
  let i = (r ? e : Object.keys(e)).length,
    a = r ? t : Object.keys(t),
    o = a.length,
    s = r ? Array(o) : {},
    c = 0;
  for (let l = 0; l < o; l++) {
    let o = r ? l : a[l],
      u = e[o],
      d = t[o];
    if (u === d) {
      ((s[o] = u), (r ? l < i : w.call(e, o)) && c++);
      continue;
    }
    if (
      u === null ||
      d === null ||
      typeof u != `object` ||
      typeof d != `object`
    ) {
      s[o] = d;
      continue;
    }
    let f = te(u, d, n + 1);
    ((s[o] = f), f === u && c++);
  }
  return i === o && c === i ? e : s;
}
function T(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (let n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function E(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function D(e) {
  if (!O(e)) return !1;
  let t = e.constructor;
  if (t === void 0) return !0;
  let n = t.prototype;
  return !(
    !O(n) ||
    !n.hasOwnProperty(`isPrototypeOf`) ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function O(e) {
  return Object.prototype.toString.call(e) === `[object Object]`;
}
function k(e) {
  return new Promise((t) => {
    f.setTimeout(t, e);
  });
}
function A(e, t, n) {
  return typeof n.structuralSharing == `function`
    ? n.structuralSharing(e, t)
    : n.structuralSharing === !1
      ? t
      : te(e, t);
}
function j(e, t, n = 0) {
  let r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function M(e, t, n = 0) {
  let r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var N = Symbol();
function P(e, t) {
  return !e.queryFn && t?.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === N
      ? () => Promise.reject(Error(`Missing queryFn: '${e.queryHash}'`))
      : e.queryFn;
}
function F(e, t) {
  return typeof e == `function` ? e(...t) : !!e;
}
function I(e, t, n) {
  let r = !1,
    i;
  return (
    Object.defineProperty(e, "signal", {
      enumerable: !0,
      get: () => (
        (i ??= t()),
        r
          ? i
          : ((r = !0),
            i.aborted ? n() : i.addEventListener(`abort`, n, { once: !0 }),
            i)
      ),
    }),
    e
  );
}
var ne = () => m,
  L = () => ne(),
  re = class {
    constructor() {
      ((this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this)));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          (this.listeners.delete(e), this.onUnsubscribe());
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  R = new (class extends re {
    #e;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (e) => {
          if (typeof window < `u` && window.addEventListener) {
            let t = () => e();
            return (
              window.addEventListener(`visibilitychange`, t, !1),
              () => {
                window.removeEventListener(`visibilitychange`, t);
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      ((this.#n = e),
        this.#t?.(),
        (this.#t = e((e) => {
          typeof e == `boolean` ? this.setFocused(e) : this.onFocus();
        })));
    }
    setFocused(e) {
      this.#e !== e && ((this.#e = e), this.onFocus());
    }
    onFocus() {
      let e = this.isFocused();
      this.listeners.forEach((t) => {
        t(e);
      });
    }
    isFocused() {
      return typeof this.#e == `boolean`
        ? this.#e
        : globalThis.document?.visibilityState !== `hidden`;
    }
  })(),
  ie = p;
function ae() {
  let e = [],
    t = 0,
    n = (e) => {
      e();
    },
    r = (e) => {
      e();
    },
    i = ie,
    a = (r) => {
      t
        ? e.push(r)
        : i(() => {
            n(r);
          });
    },
    o = () => {
      let t = e;
      ((e = []),
        t.length &&
          i(() => {
            r(() => {
              t.forEach((e) => {
                n(e);
              });
            });
          }));
    };
  return {
    batch: (e) => {
      let n;
      t++;
      try {
        n = e();
      } finally {
        (t--, t || o());
      }
      return n;
    },
    batchCalls:
      (e) =>
      (...t) => {
        a(() => {
          e(...t);
        });
      },
    schedule: a,
    setNotifyFunction: (e) => {
      n = e;
    },
    setBatchNotifyFunction: (e) => {
      r = e;
    },
    setScheduler: (e) => {
      i = e;
    },
  };
}
var z = ae(),
  B = new (class extends re {
    #e = !0;
    #t;
    #n;
    constructor() {
      (super(),
        (this.#n = (e) => {
          if (typeof window < `u` && window.addEventListener) {
            let t = () => e(!0),
              n = () => e(!1);
            return (
              window.addEventListener(`online`, t, !1),
              window.addEventListener(`offline`, n, !1),
              () => {
                (window.removeEventListener(`online`, t),
                  window.removeEventListener(`offline`, n));
              }
            );
          }
        }));
    }
    onSubscribe() {
      this.#t || this.setEventListener(this.#n);
    }
    onUnsubscribe() {
      this.hasListeners() || (this.#t?.(), (this.#t = void 0));
    }
    setEventListener(e) {
      ((this.#n = e), this.#t?.(), (this.#t = e(this.setOnline.bind(this))));
    }
    setOnline(e) {
      this.#e !== e &&
        ((this.#e = e),
        this.listeners.forEach((t) => {
          t(e);
        }));
    }
    isOnline() {
      return this.#e;
    }
  })();
function V(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function oe(e) {
  return (e ?? `online`) !== `online` || B.isOnline();
}
var H = class extends Error {
  constructor(e) {
    (super(`CancelledError`),
      (this.revert = e?.revert),
      (this.silent = e?.silent));
  }
};
function U(e) {
  let t = !1,
    n = 0,
    r,
    i = `pending`,
    a,
    o,
    s = new Promise((e, t) => {
      ((a = e), (o = t));
    });
  s.catch(h);
  let c = () => i !== `pending`,
    l = (t) => {
      if (!c()) {
        let n = new H(t);
        (g(n), e.onCancel?.(n));
      }
    },
    u = () => {
      t = !0;
    },
    d = () => {
      t = !1;
    },
    f = () =>
      R.isFocused() &&
      (e.networkMode === `always` || B.isOnline()) &&
      e.canRun(),
    p = () => oe(e.networkMode) && e.canRun(),
    m = (e) => {
      c() || (r?.(), (i = `resolved`), a(e));
    },
    g = (e) => {
      c() || (r?.(), (i = `rejected`), o(e));
    },
    _ = () =>
      new Promise((t) => {
        ((r = (e) => {
          (c() || f()) && t(e);
        }),
          e.onPause?.());
      }).then(() => {
        ((r = void 0), c() || e.onContinue?.());
      }),
    v = () => {
      if (c()) return;
      let r,
        i = n === 0 ? e.initialPromise : void 0;
      try {
        r = i ?? e.fn();
      } catch (e) {
        r = Promise.reject(e);
      }
      Promise.resolve(r)
        .then(m)
        .catch((r) => {
          if (c()) return;
          let i = e.retry ?? (L() ? 0 : 3),
            a = e.retryDelay ?? V,
            o = typeof a == `function` ? a(n, r) : a,
            s =
              i === !0 ||
              (typeof i == `number` && n < i) ||
              (typeof i == `function` && i(n, r));
          if (t || !s) {
            g(r);
            return;
          }
          (n++,
            e.onFail?.(n, r),
            k(o)
              .then(() => (f() ? void 0 : _()))
              .then(() => {
                t ? g(r) : v();
              }));
        });
    };
  return {
    promise: s,
    status: () => i,
    cancel: l,
    continue: () => (r?.(), s),
    cancelRetry: u,
    continueRetry: d,
    canStart: p,
    start: () => (p() ? v() : _().then(v), s),
  };
}
var W = class {
  #e;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    (this.clearGcTimeout(),
      _(this.gcTime) &&
        (this.#e = f.setTimeout(() => {
          this.optionalRemove();
        }, this.gcTime)));
  }
  updateGcTime(e) {
    this.gcTime = Math.max(this.gcTime || 0, e ?? (L() ? 1 / 0 : 3e5));
  }
  clearGcTimeout() {
    this.#e !== void 0 && (f.clearTimeout(this.#e), (this.#e = void 0));
  }
};
function G(e) {
  return {
    onFetch: (t, n) => {
      let r = t.options,
        i = t.fetchOptions?.meta?.fetchMore?.direction,
        a = t.state.data?.pages || [],
        o = t.state.data?.pageParams || [],
        s = { pages: [], pageParams: [] },
        c = 0,
        l = async () => {
          let n = !1,
            l = (e) => {
              I(
                e,
                () => t.signal,
                () => (n = !0),
              );
            },
            u = P(t.options, t.fetchOptions),
            d = async (e, r, i) => {
              if (n) return Promise.reject(t.signal.reason);
              if (r == null && e.pages.length) return Promise.resolve(e);
              let a = (() => {
                  let e = {
                    client: t.client,
                    queryKey: t.queryKey,
                    pageParam: r,
                    direction: i ? `backward` : `forward`,
                    meta: t.options.meta,
                  };
                  return (l(e), e);
                })(),
                o = await u(a),
                { maxPages: s } = t.options,
                c = i ? M : j;
              return {
                pages: c(e.pages, o, s),
                pageParams: c(e.pageParams, r, s),
              };
            };
          if (i && a.length) {
            let e = i === `backward`,
              t = e ? ce : se,
              n = { pages: a, pageParams: o };
            s = await d(n, t(r, n), e);
          } else {
            let t = e ?? a.length;
            do {
              let e = c === 0 ? (o[0] ?? r.initialPageParam) : se(r, s);
              if (c > 0 && e == null) break;
              ((s = await d(s, e)), c++);
            } while (c < t);
          }
          return s;
        };
      t.options.persister
        ? (t.fetchFn = () =>
            t.options.persister?.(
              l,
              {
                client: t.client,
                queryKey: t.queryKey,
                meta: t.options.meta,
                signal: t.signal,
              },
              n,
            ))
        : (t.fetchFn = l);
    },
  };
}
function se(e, { pages: t, pageParams: n }) {
  let r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function ce(e, { pages: t, pageParams: n }) {
  return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, n[0], n) : void 0;
}
var K = class extends W {
  #e;
  #t;
  #n;
  #r;
  #i;
  #a;
  #o;
  #s;
  constructor(e) {
    (super(),
      (this.#s = !1),
      (this.#o = e.defaultOptions),
      this.setOptions(e.options),
      (this.observers = []),
      (this.#i = e.client),
      (this.#r = this.#i.getQueryCache()),
      (this.queryKey = e.queryKey),
      (this.queryHash = e.queryHash),
      (this.#t = q(this.options)),
      (this.state = e.state ?? this.#t),
      this.scheduleGc());
  }
  get meta() {
    return this.options.meta;
  }
  get queryType() {
    return this.#e;
  }
  get promise() {
    return this.#a?.promise;
  }
  setOptions(e) {
    if (
      ((this.options = { ...this.#o, ...e }),
      e?._type && (this.#e = e._type),
      this.updateGcTime(this.options.gcTime),
      this.state && this.state.data === void 0)
    ) {
      let e = q(this.options);
      e.data !== void 0 &&
        (this.setState(ue(e.data, e.dataUpdatedAt)), (this.#t = e));
    }
  }
  optionalRemove() {
    !this.observers.length &&
      this.state.fetchStatus === `idle` &&
      this.#r.remove(this);
  }
  setData(e, t) {
    let n = A(this.state.data, e, this.options);
    return (
      this.#c({
        data: n,
        type: `success`,
        dataUpdatedAt: t?.updatedAt,
        manual: t?.manual,
      }),
      n
    );
  }
  setState(e) {
    this.#c({ type: `setState`, state: e });
  }
  cancel(e) {
    let t = this.#a?.promise;
    return (this.#a?.cancel(e), t ? t.then(h).catch(h) : Promise.resolve());
  }
  destroy() {
    (super.destroy(), this.cancel({ silent: !0 }));
  }
  get resetState() {
    return this.#t;
  }
  reset() {
    (this.destroy(), this.setState(this.resetState));
  }
  isActive() {
    return this.observers.some((e) => y(e.options.enabled, this) !== !1);
  }
  isDisabled() {
    return this.getObserversCount() > 0
      ? !this.isActive()
      : this.options.queryFn === N || !this.isFetched();
  }
  isFetched() {
    return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
  }
  isStatic() {
    return (
      this.getObserversCount() > 0 &&
      this.observers.some((e) => y(e.options.staleTime, this) === `static`)
    );
  }
  isStale() {
    return this.getObserversCount() > 0
      ? this.observers.some((e) => e.getCurrentResult().isStale)
      : this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(e = 0) {
    return this.state.data === void 0
      ? !0
      : e === `static`
        ? !1
        : this.state.isInvalidated
          ? !0
          : !v(this.state.dataUpdatedAt, e);
  }
  onFocus() {
    (this.observers
      .find((e) => e.shouldFetchOnWindowFocus())
      ?.refetch({ cancelRefetch: !1 }),
      this.#a?.continue());
  }
  onOnline() {
    (this.observers
      .find((e) => e.shouldFetchOnReconnect())
      ?.refetch({ cancelRefetch: !1 }),
      this.#a?.continue());
  }
  addObserver(e) {
    this.observers.includes(e) ||
      (this.observers.push(e),
      this.clearGcTimeout(),
      this.#r.notify({ type: `observerAdded`, query: this, observer: e }));
  }
  removeObserver(e) {
    let t = this.observers.indexOf(e);
    t !== -1 &&
      (this.observers.splice(t, 1),
      this.observers.length ||
        (this.#a &&
          (this.#s ||
          (this.state.fetchStatus === `paused` &&
            this.state.status === `pending`)
            ? this.#a.cancel({ revert: !0 })
            : this.#a.cancelRetry()),
        this.scheduleGc()),
      this.#r.notify({ type: `observerRemoved`, query: this, observer: e }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || this.#c({ type: `invalidate` });
  }
  async fetch(e, t) {
    if (this.state.fetchStatus !== `idle` && this.#a?.status() !== `rejected`) {
      if (this.state.data !== void 0 && t?.cancelRefetch)
        this.cancel({ silent: !0 });
      else if (this.#a) return (this.#a.continueRetry(), this.#a.promise);
    }
    if ((e && this.setOptions(e), !this.options.queryFn)) {
      let e = this.observers.find((e) => e.options.queryFn);
      e && this.setOptions(e.options);
    }
    let n = new AbortController(),
      r = (e) => {
        Object.defineProperty(e, "signal", {
          enumerable: !0,
          get: () => ((this.#s = !0), n.signal),
        });
      },
      i = () => {
        let e = P(this.options, t),
          n = (() => {
            let e = {
              client: this.#i,
              queryKey: this.queryKey,
              meta: this.meta,
            };
            return (r(e), e);
          })();
        return (
          (this.#s = !1),
          this.options.persister ? this.options.persister(e, n, this) : e(n)
        );
      },
      a = (() => {
        let e = {
          fetchOptions: t,
          options: this.options,
          queryKey: this.queryKey,
          client: this.#i,
          state: this.state,
          fetchFn: i,
        };
        return (r(e), e);
      })();
    ((this.#e === `infinite`
      ? G(this.options.pages)
      : this.options.behavior
    )?.onFetch(a, this),
      (this.#n = this.state),
      (this.state.fetchStatus === `idle` ||
        this.state.fetchMeta !== a.fetchOptions?.meta) &&
        this.#c({ type: `fetch`, meta: a.fetchOptions?.meta }));
    let o = (this.#a = U({
      initialPromise: t?.initialPromise,
      fn: a.fetchFn,
      onCancel: (e) => {
        (e instanceof H &&
          e.revert &&
          this.setState({ ...this.#n, fetchStatus: `idle` }),
          n.abort());
      },
      onFail: (e, t) => {
        this.#c({ type: `failed`, failureCount: e, error: t });
      },
      onPause: () => {
        this.#c({ type: `pause` });
      },
      onContinue: () => {
        this.#c({ type: `continue` });
      },
      retry: a.options.retry,
      retryDelay: a.options.retryDelay,
      networkMode: a.options.networkMode,
      canRun: () => !0,
    }));
    try {
      let e = await o.start();
      if (e === void 0) throw Error(`${this.queryHash} data is undefined`);
      return (
        this.setData(e),
        this.#r.config.onSuccess?.(e, this),
        this.#r.config.onSettled?.(e, this.state.error, this),
        e
      );
    } catch (e) {
      if (e instanceof H) {
        if (e.silent) return this.#a.promise;
        if (e.revert) {
          if (this.state.data === void 0) throw e;
          return this.state.data;
        }
      }
      throw (
        this.#c({ type: `error`, error: e }),
        this.#r.config.onError?.(e, this),
        this.#r.config.onSettled?.(this.state.data, e, this),
        e
      );
    } finally {
      (this.#a === o && (this.#a = void 0), this.scheduleGc());
    }
  }
  #c(e) {
    let t = (t) => {
      switch (e.type) {
        case `failed`:
          return {
            ...t,
            fetchFailureCount: e.failureCount,
            fetchFailureReason: e.error,
          };
        case `pause`:
          return { ...t, fetchStatus: `paused` };
        case `continue`:
          return { ...t, fetchStatus: `fetching` };
        case `fetch`:
          return {
            ...t,
            ...le(t.data, this.options),
            fetchMeta: e.meta ?? null,
          };
        case `success`:
          let n = {
            ...t,
            ...ue(e.data, e.dataUpdatedAt),
            dataUpdateCount: t.dataUpdateCount + 1,
            ...(!e.manual && {
              fetchStatus: `idle`,
              fetchFailureCount: 0,
              fetchFailureReason: null,
            }),
          };
          return ((this.#n = e.manual ? n : void 0), n);
        case `error`:
          let r = e.error;
          return {
            ...t,
            error: r,
            errorUpdateCount: t.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: t.fetchFailureCount + 1,
            fetchFailureReason: r,
            fetchStatus: `idle`,
            status: `error`,
            isInvalidated: !0,
          };
        case `invalidate`:
          return { ...t, isInvalidated: !0 };
        case `setState`:
          return { ...t, ...e.state };
      }
    };
    ((this.state = t(this.state)),
      z.batch(() => {
        (this.observers.slice().forEach((e) => {
          e.onQueryUpdate();
        }),
          this.#r.notify({ query: this, type: `updated`, action: e }));
      }));
  }
};
function le(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: oe(t.networkMode) ? `fetching` : `paused`,
    ...(e === void 0 && { error: null, status: `pending` }),
  };
}
function ue(e, t) {
  return {
    data: e,
    dataUpdatedAt: t ?? Date.now(),
    error: null,
    isInvalidated: !1,
    status: `success`,
  };
}
function q(e) {
  let t = typeof e.initialData == `function` ? e.initialData() : e.initialData,
    n = t !== void 0,
    r = n
      ? typeof e.initialDataUpdatedAt == `function`
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? (r ?? Date.now()) : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? `success` : `pending`,
    fetchStatus: `idle`,
  };
}
var J = e(a(), 1);
function de(e) {
  if (!e || typeof document > `u`) return;
  let t = document.head || document.getElementsByTagName(`head`)[0],
    n = document.createElement(`style`);
  ((n.type = `text/css`),
    t.appendChild(n),
    n.styleSheet
      ? (n.styleSheet.cssText = e)
      : n.appendChild(document.createTextNode(e)));
}
var fe = (e) => {
    switch (e) {
      case `success`:
        return me;
      case `info`:
        return ge;
      case `warning`:
        return he;
      case `error`:
        return _e;
      default:
        return null;
    }
  },
  Y = Array(12).fill(0),
  pe = ({ visible: e, className: t }) =>
    o.createElement(
      `div`,
      {
        className: [`sonner-loading-wrapper`, t].filter(Boolean).join(` `),
        "data-visible": e,
      },
      o.createElement(
        `div`,
        { className: `sonner-spinner` },
        Y.map((e, t) =>
          o.createElement(`div`, {
            className: `sonner-loading-bar`,
            key: `spinner-bar-${t}`,
          }),
        ),
      ),
    ),
  me = o.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 20 20`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
      "aria-hidden": `true`,
    },
    o.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z`,
      clipRule: `evenodd`,
    }),
  ),
  he = o.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 24 24`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
      "aria-hidden": `true`,
    },
    o.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z`,
      clipRule: `evenodd`,
    }),
  ),
  ge = o.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 20 20`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
      "aria-hidden": `true`,
    },
    o.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z`,
      clipRule: `evenodd`,
    }),
  ),
  _e = o.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      viewBox: `0 0 20 20`,
      fill: `currentColor`,
      height: `20`,
      width: `20`,
      "aria-hidden": `true`,
    },
    o.createElement(`path`, {
      fillRule: `evenodd`,
      d: `M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z`,
      clipRule: `evenodd`,
    }),
  ),
  ve = o.createElement(
    `svg`,
    {
      xmlns: `http://www.w3.org/2000/svg`,
      width: `12`,
      height: `12`,
      viewBox: `0 0 24 24`,
      fill: `none`,
      stroke: `currentColor`,
      strokeWidth: `1.5`,
      strokeLinecap: `round`,
      strokeLinejoin: `round`,
      "aria-hidden": `true`,
    },
    o.createElement(`line`, { x1: `18`, y1: `6`, x2: `6`, y2: `18` }),
    o.createElement(`line`, { x1: `6`, y1: `6`, x2: `18`, y2: `18` }),
  ),
  ye = () => {
    let [e, t] = o.useState(document.hidden);
    return (
      o.useEffect(() => {
        let e = () => {
          t(document.hidden);
        };
        return (
          document.addEventListener(`visibilitychange`, e),
          () => document.removeEventListener(`visibilitychange`, e)
        );
      }, []),
      e
    );
  },
  X = 1,
  be = 100,
  Z = (e) => (typeof e?.id == `number` || e?.id?.length > 0 ? e.id : X++),
  Q = new (class {
    constructor() {
      ((this.subscribe = (e) => (
        this.subscribers.push(e),
        this.getActiveToasts().forEach((t) => e(t)),
        () => {
          let t = this.subscribers.indexOf(e);
          this.subscribers.splice(t, 1);
        }
      )),
        (this.publish = (e) => {
          this.subscribers.forEach((t) => t(e));
        }),
        (this.addToast = (e) => {
          (this.publish(e),
            (this.toasts = [...this.toasts, e]),
            this.trimHistory());
        }),
        (this.trimHistory = () => {
          let e = this.toasts.length - be;
          e <= 0 ||
            (this.toasts = this.toasts.filter((t) =>
              e > 0 && this.dismissedToasts.has(t.id)
                ? (this.dismissedToasts.delete(t.id), e--, !1)
                : !0,
            ));
        }),
        (this.create = (e) => {
          let { message: t, ...n } = e,
            r = Z(e),
            i = this.pendingDismissals.get(r);
          i !== void 0 &&
            (cancelAnimationFrame(i),
            this.pendingDismissals.delete(r),
            this.dismissedToasts.delete(r));
          let a = this.dismissedToasts.has(r),
            o = e.dismissible === void 0 || e.dismissible;
          return (
            a &&
              (this.dismissedToasts.delete(r),
              (this.toasts = this.toasts.filter((e) => e.id !== r))),
            !a && this.toasts.find((e) => e.id === r)
              ? (this.toasts = this.toasts.map((n) =>
                  n.id === r
                    ? (this.publish({ ...n, ...e, id: r, title: t }),
                      { ...n, ...e, id: r, dismissible: o, title: t })
                    : n,
                ))
              : this.addToast({ title: t, ...n, dismissible: o, id: r }),
            r
          );
        }),
        (this.dismiss = (e) => {
          if (e == null)
            return (
              this.getActiveToasts().forEach((e) => {
                (this.dismissedToasts.add(e.id),
                  this.subscribers.forEach((t) =>
                    t({ id: e.id, dismiss: !0 }),
                  ));
              }),
              e
            );
          this.dismissedToasts.add(e);
          let t = this.pendingDismissals.get(e);
          return (
            t !== void 0 && cancelAnimationFrame(t),
            this.pendingDismissals.set(
              e,
              requestAnimationFrame(() => {
                (this.pendingDismissals.delete(e),
                  this.subscribers.forEach((t) => t({ id: e, dismiss: !0 })));
              }),
            ),
            e
          );
        }),
        (this.message = (e, t) =>
          this.create({ ...t, message: e, type: void 0 })),
        (this.error = (e, t) =>
          this.create({ ...t, message: e, type: `error` })),
        (this.success = (e, t) =>
          this.create({ ...t, type: `success`, message: e })),
        (this.info = (e, t) => this.create({ ...t, type: `info`, message: e })),
        (this.warning = (e, t) =>
          this.create({ ...t, type: `warning`, message: e })),
        (this.loading = (e, t) =>
          this.create({ ...t, type: `loading`, message: e })),
        (this.promise = (e, t) => {
          if (!t) return;
          let n;
          t.loading !== void 0 &&
            (n = this.create({
              ...t,
              promise: e,
              type: `loading`,
              message: t.loading,
              description:
                typeof t.description == `function` ? void 0 : t.description,
            }));
          let r = Promise.resolve(e instanceof Function ? e() : e),
            i = n !== void 0,
            a,
            s = r
              .then(async (e) => {
                if (((a = [`resolve`, e]), o.isValidElement(e)))
                  ((i = !1),
                    this.create({ id: n, type: `default`, message: e }));
                else if (Se(e) && !e.ok) {
                  i = !1;
                  let r =
                      typeof t.error == `function`
                        ? await t.error(`HTTP error! status: ${e.status}`)
                        : t.error,
                    a =
                      typeof t.description == `function`
                        ? await t.description(`HTTP error! status: ${e.status}`)
                        : t.description,
                    s =
                      typeof r == `object` && !o.isValidElement(r)
                        ? r
                        : { message: r };
                  this.create({ id: n, type: `error`, description: a, ...s });
                } else if (e instanceof Error) {
                  i = !1;
                  let r =
                      typeof t.error == `function` ? await t.error(e) : t.error,
                    a =
                      typeof t.description == `function`
                        ? await t.description(e)
                        : t.description,
                    s =
                      typeof r == `object` && !o.isValidElement(r)
                        ? r
                        : { message: r };
                  this.create({ id: n, type: `error`, description: a, ...s });
                } else if (t.success !== void 0) {
                  i = !1;
                  let r =
                      typeof t.success == `function`
                        ? await t.success(e)
                        : t.success,
                    a =
                      typeof t.description == `function`
                        ? await t.description(e)
                        : t.description,
                    s =
                      typeof r == `object` && !o.isValidElement(r)
                        ? r
                        : { message: r };
                  this.create({ id: n, type: `success`, description: a, ...s });
                }
              })
              .catch(async (e) => {
                if (((a = [`reject`, e]), t.error !== void 0)) {
                  i = !1;
                  let r =
                      typeof t.error == `function` ? await t.error(e) : t.error,
                    a =
                      typeof t.description == `function`
                        ? await t.description(e)
                        : t.description,
                    s =
                      typeof r == `object` && !o.isValidElement(r)
                        ? r
                        : { message: r };
                  this.create({ id: n, type: `error`, description: a, ...s });
                }
              })
              .finally(() => {
                (i && (this.dismiss(n), (n = void 0)),
                  t.finally == null || t.finally.call(t));
              }),
            c = () =>
              new Promise((e, t) =>
                s.then(() => (a[0] === `reject` ? t(a[1]) : e(a[1]))).catch(t),
              );
          return typeof n != `string` && typeof n != `number`
            ? { unwrap: c }
            : Object.assign(n, { unwrap: c });
        }),
        (this.custom = (e, t) => {
          let n = Z(t);
          return (this.create({ ...t, jsx: e(n), id: n, type: void 0 }), n);
        }),
        (this.getActiveToasts = () =>
          this.toasts.filter((e) => !this.dismissedToasts.has(e.id))),
        (this.subscribers = []),
        (this.toasts = []),
        (this.dismissedToasts = new Set()),
        (this.pendingDismissals = new Map()));
    }
  })(),
  xe = (e, t) => Q.message(e, t),
  Se = (e) =>
    e &&
    typeof e == `object` &&
    `ok` in e &&
    typeof e.ok == `boolean` &&
    `status` in e &&
    typeof e.status == `number`,
  Ce = Object.assign(
    xe,
    {
      success: Q.success,
      info: Q.info,
      warning: Q.warning,
      error: Q.error,
      custom: Q.custom,
      message: Q.message,
      promise: Q.promise,
      dismiss: Q.dismiss,
      loading: Q.loading,
    },
    { getHistory: () => Q.toasts, getToasts: () => Q.getActiveToasts() },
  );
de(
  `[data-sonner-toaster][dir=ltr],html[dir=ltr]{--toast-icon-margin-start:-3px;--toast-icon-margin-end:4px;--toast-svg-margin-start:-1px;--toast-svg-margin-end:0px;--toast-button-margin-start:auto;--toast-button-margin-end:0;--toast-close-button-start:0;--toast-close-button-end:unset;--toast-close-button-transform:translate(-35%, -35%)}[data-sonner-toaster][dir=rtl],html[dir=rtl]{--toast-icon-margin-start:4px;--toast-icon-margin-end:-3px;--toast-svg-margin-start:0px;--toast-svg-margin-end:-1px;--toast-button-margin-start:0;--toast-button-margin-end:auto;--toast-close-button-start:unset;--toast-close-button-end:0;--toast-close-button-transform:translate(35%, -35%)}[data-sonner-toaster]{position:fixed;width:var(--width);font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;--gray1:hsl(0, 0%, 99%);--gray2:hsl(0, 0%, 97.3%);--gray3:hsl(0, 0%, 95.1%);--gray4:hsl(0, 0%, 93%);--gray5:hsl(0, 0%, 90.9%);--gray6:hsl(0, 0%, 88.7%);--gray7:hsl(0, 0%, 85.8%);--gray8:hsl(0, 0%, 78%);--gray9:hsl(0, 0%, 56.1%);--gray10:hsl(0, 0%, 52.3%);--gray11:hsl(0, 0%, 43.5%);--gray12:hsl(0, 0%, 9%);--border-radius:8px;box-sizing:border-box;padding:0;margin:0;list-style:none;outline:0;z-index:999999999;transition:transform .4s ease}@media (hover:none) and (pointer:coarse){[data-sonner-toaster][data-lifted=true]{transform:none}}[data-sonner-toaster][data-x-position=right]{right:var(--offset-right)}[data-sonner-toaster][data-x-position=left]{left:var(--offset-left)}[data-sonner-toaster][data-x-position=center]{left:50%;transform:translateX(-50%)}[data-sonner-toaster][data-y-position=top]{top:var(--offset-top)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--offset-bottom)}[data-sonner-toast]{--y:translateY(100%);--lift-amount:calc(var(--lift) * var(--gap));z-index:var(--z-index);position:absolute;opacity:0;transform:var(--y);touch-action:none;transition:transform .4s,opacity .4s,height .4s,box-shadow .2s;box-sizing:border-box;outline:0;overflow-wrap:anywhere}[data-sonner-toast][data-styled=true]{padding:16px;background:var(--normal-bg);border:1px solid var(--normal-border);color:var(--normal-text);border-radius:var(--border-radius);box-shadow:0 4px 12px rgba(0,0,0,.1);width:var(--width);font-size:13px;display:flex;align-items:center;gap:6px}[data-sonner-toast]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-y-position=top]{top:0;--y:translateY(-100%);--lift:1;--lift-amount:calc(1 * var(--gap))}[data-sonner-toast][data-y-position=bottom]{bottom:0;--y:translateY(100%);--lift:-1;--lift-amount:calc(var(--lift) * var(--gap))}[data-sonner-toast][data-styled=true] [data-description]{font-weight:400;line-height:1.4;color:#3f3f3f}[data-rich-colors=true][data-sonner-toast][data-styled=true] [data-description]{color:inherit}[data-sonner-toaster][data-sonner-theme=dark] [data-description]{color:#e8e8e8}[data-sonner-toast][data-styled=true] [data-title]{font-weight:500;line-height:1.5;color:inherit}[data-sonner-toast][data-styled=true] [data-icon]{display:flex;height:16px;width:16px;position:relative;justify-content:flex-start;align-items:center;flex-shrink:0;margin-left:var(--toast-icon-margin-start);margin-right:var(--toast-icon-margin-end)}[data-sonner-toast][data-promise=true] [data-icon]>svg{opacity:0;transform:scale(.8);transform-origin:center;animation:sonner-fade-in .3s ease forwards}[data-sonner-toast][data-styled=true] [data-icon]>*{flex-shrink:0}[data-sonner-toast][data-styled=true] [data-icon] svg{margin-left:var(--toast-svg-margin-start);margin-right:var(--toast-svg-margin-end)}[data-sonner-toast][data-styled=true] [data-content]{display:flex;flex-direction:column;gap:2px;flex:1;min-width:0}[data-sonner-toast][data-styled=true] [data-button]{border-radius:4px;padding-left:8px;padding-right:8px;height:24px;font-size:12px;color:var(--normal-bg);background:var(--normal-text);margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end);border:none;font-weight:500;cursor:pointer;outline:0;display:flex;align-items:center;flex-shrink:0;transition:opacity .4s,box-shadow .2s}[data-sonner-toast][data-styled=true] [data-button]:focus-visible{box-shadow:0 0 0 2px rgba(0,0,0,.4)}[data-sonner-toast][data-styled=true] [data-button]:first-of-type{margin-left:var(--toast-button-margin-start);margin-right:var(--toast-button-margin-end)}[data-sonner-toast][data-styled=true] [data-cancel]{color:var(--normal-text);background:rgba(0,0,0,.08)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-styled=true] [data-cancel]{background:rgba(255,255,255,.3)}[data-sonner-toast][data-styled=true] [data-close-button]{position:absolute;left:var(--toast-close-button-start);right:var(--toast-close-button-end);top:0;height:20px;width:20px;display:flex;justify-content:center;align-items:center;padding:0;color:var(--normal-text);background:var(--normal-bg);border:1px solid var(--normal-border);transform:var(--toast-close-button-transform);border-radius:50%;cursor:pointer;z-index:1;transition:opacity .1s,background .2s,border-color .2s}[data-sonner-toast][data-styled=true] [data-close-button]:focus-visible{box-shadow:0 4px 12px rgba(0,0,0,.1),0 0 0 2px rgba(0,0,0,.2)}[data-sonner-toast][data-styled=true] [data-disabled=true]{cursor:not-allowed}[data-sonner-toast][data-styled=true]:hover [data-close-button]:hover{background:var(--gray2);border-color:var(--gray5)}[data-sonner-toast][data-swiping=true]::before{content:'';position:absolute;left:-100%;right:-100%;height:100%;z-index:-1}[data-sonner-toast][data-y-position=top][data-swiping=true]::before{bottom:50%;transform:scaleY(3) translateY(50%)}[data-sonner-toast][data-y-position=bottom][data-swiping=true]::before{top:50%;transform:scaleY(3) translateY(-50%)}[data-sonner-toast][data-swiping=false][data-removed=true]::before{content:'';position:absolute;inset:0;transform:scaleY(2)}[data-sonner-toast][data-expanded=true]::after{content:'';position:absolute;left:0;height:calc(var(--gap) + 1px);bottom:100%;width:100%}[data-sonner-toast][data-mounted=true]{--y:translateY(0);opacity:1}[data-sonner-toast][data-expanded=false][data-front=false]{--scale:var(--toasts-before) * 0.05 + 1;--y:translateY(calc(var(--lift-amount) * var(--toasts-before))) scale(calc(-1 * var(--scale)));height:var(--front-toast-height)}[data-sonner-toast]>*{transition:opacity .4s}[data-sonner-toast][data-x-position=right]{right:0}[data-sonner-toast][data-x-position=left]{left:0}[data-sonner-toast][data-expanded=false][data-front=false][data-styled=true]>*{opacity:0}[data-sonner-toast][data-visible=false]{opacity:0;pointer-events:none}[data-sonner-toast][data-mounted=true][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset)));height:var(--initial-height)}[data-sonner-toast][data-removed=true][data-front=true][data-swipe-out=false]{--y:translateY(calc(var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=true]{--y:translateY(calc(var(--lift) * var(--offset) + var(--lift) * -100%));opacity:0}[data-sonner-toast][data-removed=true][data-front=false][data-swipe-out=false][data-expanded=false]{--y:translateY(40%);opacity:0;transition:transform .5s,opacity .2s}[data-sonner-toast][data-removed=true][data-front=false]::before{height:calc(var(--initial-height) + 20%)}[data-sonner-toast][data-swiping=true]{transform:var(--y) translateY(var(--swipe-amount-y,0)) translateX(var(--swipe-amount-x,0));transition:none}[data-sonner-toast][data-swiped=true]{-webkit-user-select:none;user-select:none}[data-sonner-toast][data-swipe-out=true][data-y-position=bottom],[data-sonner-toast][data-swipe-out=true][data-y-position=top]{animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=left]{animation-name:swipe-out-left}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=right]{animation-name:swipe-out-right}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=up]{animation-name:swipe-out-up}[data-sonner-toast][data-swipe-out=true][data-swipe-direction=down]{animation-name:swipe-out-down}@keyframes swipe-out-left{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) - 100%));opacity:0}}@keyframes swipe-out-right{from{transform:var(--y) translateX(var(--swipe-amount-x));opacity:1}to{transform:var(--y) translateX(calc(var(--swipe-amount-x) + 100%));opacity:0}}@keyframes swipe-out-up{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) - 100%));opacity:0}}@keyframes swipe-out-down{from{transform:var(--y) translateY(var(--swipe-amount-y));opacity:1}to{transform:var(--y) translateY(calc(var(--swipe-amount-y) + 100%));opacity:0}}@media (max-width:600px){[data-sonner-toaster]{position:fixed;right:var(--mobile-offset-right);left:var(--mobile-offset-left);width:100%}[data-sonner-toaster][dir=rtl]{left:calc(var(--mobile-offset-left) * -1)}[data-sonner-toaster] [data-sonner-toast]{left:0;right:0;width:calc(100% - var(--mobile-offset-left) * 2)}[data-sonner-toaster][data-x-position=left]{left:var(--mobile-offset-left)}[data-sonner-toaster][data-y-position=bottom]{bottom:var(--mobile-offset-bottom)}[data-sonner-toaster][data-y-position=top]{top:var(--mobile-offset-top)}[data-sonner-toaster][data-x-position=center]{left:var(--mobile-offset-left);right:var(--mobile-offset-right);transform:none}}[data-sonner-toaster][data-sonner-theme=light]{--normal-bg:#fff;--normal-border:var(--gray4);--normal-text:var(--gray12);--success-bg:hsl(143, 85%, 96%);--success-border:hsl(145, 92%, 87%);--success-text:hsl(140, 100%, 27%);--info-bg:hsl(208, 100%, 97%);--info-border:hsl(221, 91%, 93%);--info-text:hsl(210, 92%, 45%);--warning-bg:hsl(49, 100%, 97%);--warning-border:hsl(49, 91%, 84%);--warning-text:hsl(31, 92%, 45%);--error-bg:hsl(359, 100%, 97%);--error-border:hsl(359, 100%, 94%);--error-text:hsl(360, 100%, 45%)}[data-sonner-toaster][data-sonner-theme=light] [data-sonner-toast][data-invert=true]{--normal-bg:#000;--normal-border:hsl(0, 0%, 20%);--normal-text:var(--gray1)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast][data-invert=true]{--normal-bg:#fff;--normal-border:var(--gray3);--normal-text:var(--gray12)}[data-sonner-toaster][data-sonner-theme=dark]{--normal-bg:#000;--normal-bg-hover:hsl(0, 0%, 12%);--normal-border:hsl(0, 0%, 20%);--normal-border-hover:hsl(0, 0%, 25%);--normal-text:var(--gray1);--success-bg:hsl(150, 100%, 6%);--success-border:hsl(147, 100%, 12%);--success-text:hsl(150, 86%, 65%);--info-bg:hsl(215, 100%, 6%);--info-border:hsl(223, 43%, 17%);--info-text:hsl(216, 87%, 65%);--warning-bg:hsl(64, 100%, 6%);--warning-border:hsl(60, 100%, 9%);--warning-text:hsl(46, 87%, 65%);--error-bg:hsl(358, 76%, 10%);--error-border:hsl(357, 89%, 16%);--error-text:hsl(358, 100%, 81%)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]{background:var(--normal-bg);border-color:var(--normal-border);color:var(--normal-text)}[data-sonner-toaster][data-sonner-theme=dark] [data-sonner-toast] [data-close-button]:hover{background:var(--normal-bg-hover);border-color:var(--normal-border-hover)}[data-rich-colors=true][data-sonner-toast][data-type=success]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=success] [data-close-button]{background:var(--success-bg);border-color:var(--success-border);color:var(--success-text)}[data-rich-colors=true][data-sonner-toast][data-type=info]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=info] [data-close-button]{background:var(--info-bg);border-color:var(--info-border);color:var(--info-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=warning] [data-close-button]{background:var(--warning-bg);border-color:var(--warning-border);color:var(--warning-text)}[data-rich-colors=true][data-sonner-toast][data-type=error]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}[data-rich-colors=true][data-sonner-toast][data-type=error] [data-close-button]{background:var(--error-bg);border-color:var(--error-border);color:var(--error-text)}.sonner-loading-wrapper{--size:16px;height:var(--size);width:var(--size);position:absolute;inset:0;z-index:10}.sonner-loading-wrapper[data-visible=false]{transform-origin:center;animation:sonner-fade-out .2s ease forwards}.sonner-spinner{position:relative;top:50%;left:50%;height:var(--size);width:var(--size)}.sonner-loading-bar{animation:sonner-spin 1.2s linear infinite;background:var(--gray11);border-radius:6px;height:8%;left:-10%;position:absolute;top:-3.9%;width:24%}.sonner-loading-bar:first-child{animation-delay:-1.2s;transform:rotate(.0001deg) translate(146%)}.sonner-loading-bar:nth-child(2){animation-delay:-1.1s;transform:rotate(30deg) translate(146%)}.sonner-loading-bar:nth-child(3){animation-delay:-1s;transform:rotate(60deg) translate(146%)}.sonner-loading-bar:nth-child(4){animation-delay:-.9s;transform:rotate(90deg) translate(146%)}.sonner-loading-bar:nth-child(5){animation-delay:-.8s;transform:rotate(120deg) translate(146%)}.sonner-loading-bar:nth-child(6){animation-delay:-.7s;transform:rotate(150deg) translate(146%)}.sonner-loading-bar:nth-child(7){animation-delay:-.6s;transform:rotate(180deg) translate(146%)}.sonner-loading-bar:nth-child(8){animation-delay:-.5s;transform:rotate(210deg) translate(146%)}.sonner-loading-bar:nth-child(9){animation-delay:-.4s;transform:rotate(240deg) translate(146%)}.sonner-loading-bar:nth-child(10){animation-delay:-.3s;transform:rotate(270deg) translate(146%)}.sonner-loading-bar:nth-child(11){animation-delay:-.2s;transform:rotate(300deg) translate(146%)}.sonner-loading-bar:nth-child(12){animation-delay:-.1s;transform:rotate(330deg) translate(146%)}@keyframes sonner-fade-in{0%{opacity:0;transform:scale(.8)}100%{opacity:1;transform:scale(1)}}@keyframes sonner-fade-out{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.8)}}@keyframes sonner-spin{0%{opacity:1}100%{opacity:.15}}@media (prefers-reduced-motion){.sonner-loading-bar,[data-sonner-toast],[data-sonner-toast]>*{transition:none!important;animation:none!important}}.sonner-loader{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-origin:center;transition:opacity .2s,transform .2s}.sonner-loader[data-visible=false]{opacity:0;transform:scale(.8) translate(-50%,-50%)}`,
);
function we(e) {
  return e.label !== void 0;
}
var Te = 3,
  Ee = `24px`,
  De = `16px`,
  Oe = 4e3,
  ke = 356,
  Ae = 14,
  je = 45,
  Me = 200;
function $(...e) {
  return e.filter(Boolean).join(` `);
}
function Ne(e) {
  let [t, n] = e.split(`-`),
    r = [];
  return (t && r.push(t), n && r.push(n), r);
}
var Pe = (e) => {
  let {
      invert: t,
      toast: n,
      unstyled: r,
      interacting: i,
      setHeights: a,
      visibleToasts: s,
      heights: c,
      index: l,
      toasts: u,
      expanded: d,
      removeToast: f,
      defaultRichColors: p,
      closeButton: m,
      style: h,
      cancelButtonStyle: g,
      actionButtonStyle: _,
      className: v = ``,
      descriptionClassName: y = ``,
      duration: b,
      position: x,
      gap: ee,
      expandByDefault: S,
      classNames: C,
      icons: w,
      closeButtonAriaLabel: te = `Close toast`,
    } = e,
    [T, E] = o.useState(null),
    [D, O] = o.useState(null),
    [k, A] = o.useState(!1),
    [j, M] = o.useState(!1),
    [N, P] = o.useState(!1),
    [F, I] = o.useState(!1),
    [ne, L] = o.useState(!1),
    [re, R] = o.useState(0),
    [ie, ae] = o.useState(0),
    z = o.useRef(n.duration || b || Oe),
    B = o.useRef(null),
    V = o.useRef(null),
    oe = l === 0,
    H = l + 1 <= s,
    U = n.type,
    W = U ?? `default`,
    G = n.dismissible !== !1,
    se = n.className || ``,
    ce = n.descriptionClassName || ``,
    K = o.useMemo(() => c.findIndex((e) => e.toastId === n.id) || 0, [c, n.id]),
    le = o.useMemo(() => n.closeButton ?? m, [n.closeButton, m]),
    ue = o.useMemo(() => n.duration || b || Oe, [n.duration, b]),
    q = o.useRef(0),
    J = o.useRef(0),
    de = o.useRef(0),
    Y = o.useRef(null),
    [me, he] = x.split(`-`),
    ge = o.useMemo(
      () => c.reduce((e, t, n) => (n >= K ? e : e + t.height), 0),
      [c, K],
    ),
    _e = ye(),
    X = o.useMemo(() => e.swipeDirections ?? Ne(x), [e.swipeDirections, x]),
    be = n.invert || t,
    Z = U === `loading`;
  ((J.current = o.useMemo(() => K * ee + ge, [K, ge])),
    o.useEffect(() => {
      z.current = ue;
    }, [ue]),
    o.useEffect(() => {
      A(!0);
    }, []),
    o.useEffect(() => {
      let e = V.current;
      if (e) {
        let t = e.getBoundingClientRect().height;
        return (
          ae(t),
          a((e) => [{ toastId: n.id, height: t, position: n.position }, ...e]),
          () => a((e) => e.filter((e) => e.toastId !== n.id))
        );
      }
    }, [a, n.id]),
    o.useLayoutEffect(() => {
      if (!k) return;
      let e = V.current,
        t = e.style.height;
      e.style.height = `auto`;
      let r = e.getBoundingClientRect().height;
      ((e.style.height = t),
        ae(r),
        a((e) =>
          e.find((e) => e.toastId === n.id)
            ? e.map((e) => (e.toastId === n.id ? { ...e, height: r } : e))
            : [{ toastId: n.id, height: r, position: n.position }, ...e],
        ));
    }, [k, n.title, n.description, a, n.id, n.jsx, n.action, n.cancel]));
  let Q = o.useCallback(() => {
    (M(!0),
      R(J.current),
      a((e) => e.filter((e) => e.toastId !== n.id)),
      setTimeout(() => {
        f(n);
      }, Me));
  }, [n, f, a, J]);
  (o.useEffect(() => {
    if (
      (n.promise && U === `loading`) ||
      n.duration === 1 / 0 ||
      n.type === `loading`
    )
      return;
    let e;
    return (
      d || i || _e
        ? (() => {
            if (de.current < q.current) {
              let e = new Date().getTime() - q.current;
              z.current -= e;
            }
            de.current = new Date().getTime();
          })()
        : z.current !== 1 / 0 &&
          ((q.current = new Date().getTime()),
          (e = setTimeout(() => {
            (n.onAutoClose == null || n.onAutoClose.call(n, n), Q());
          }, z.current))),
      () => clearTimeout(e)
    );
  }, [d, i, n, U, _e, Q]),
    o.useEffect(() => {
      n.delete && (Q(), n.onDismiss == null || n.onDismiss.call(n, n));
    }, [Q, n.delete]));
  function xe() {
    return w?.loading
      ? o.createElement(
          `div`,
          {
            className: $(C?.loader, n?.classNames?.loader, `sonner-loader`),
            "data-visible": U === `loading`,
          },
          w.loading,
        )
      : o.createElement(pe, {
          className: $(C?.loader, n?.classNames?.loader),
          visible: U === `loading`,
        });
  }
  let Se = n.icon || w?.[U] || fe(U);
  return o.createElement(
    `li`,
    {
      tabIndex: 0,
      ref: V,
      className: $(
        v,
        se,
        C?.toast,
        n?.classNames?.toast,
        C?.[W],
        n?.classNames?.[W],
      ),
      "data-sonner-toast": ``,
      "data-rich-colors": n.richColors ?? p,
      "data-styled": !(n.jsx || n.unstyled || r),
      "data-mounted": k,
      "data-promise": !!n.promise,
      "data-swiped": ne,
      "data-removed": j,
      "data-visible": H,
      "data-y-position": me,
      "data-x-position": he,
      "data-index": l,
      "data-front": oe,
      "data-swiping": N,
      "data-dismissible": G,
      "data-type": U,
      "data-invert": be,
      "data-swipe-out": F,
      "data-swipe-direction": D,
      "data-expanded": !!(d || (S && k)),
      "data-testid": n.testId,
      style: {
        "--index": l,
        "--toasts-before": l,
        "--z-index": u.length - l,
        "--offset": `${j ? re : J.current}px`,
        "--initial-height": S ? `auto` : `${ie}px`,
        ...h,
        ...n.style,
      },
      onDragEnd: () => {
        (P(!1), E(null), (Y.current = null));
      },
      onPointerDown: (e) => {
        e.button !== 2 &&
          (Z ||
            !G ||
            ((B.current = new Date()),
            R(J.current),
            e.target.setPointerCapture(e.pointerId),
            e.target.tagName !== `BUTTON` &&
              (P(!0), (Y.current = { x: e.clientX, y: e.clientY }))));
      },
      onPointerUp: () => {
        if (F || !G) return;
        Y.current = null;
        let e = Number(
            V.current?.style
              .getPropertyValue(`--swipe-amount-x`)
              .replace(`px`, ``) || 0,
          ),
          t = Number(
            V.current?.style
              .getPropertyValue(`--swipe-amount-y`)
              .replace(`px`, ``) || 0,
          ),
          r = new Date().getTime() - B.current?.getTime(),
          i = T === `x` ? e : t,
          a = Math.abs(i) / r;
        if (
          (T === `x`
            ? X.includes(e > 0 ? `right` : `left`)
            : X.includes(t > 0 ? `bottom` : `top`)) &&
          (Math.abs(i) >= je || a > 0.11)
        ) {
          (R(J.current),
            n.onDismiss == null || n.onDismiss.call(n, n),
            O(T === `x` ? (e > 0 ? `right` : `left`) : t > 0 ? `down` : `up`),
            Q(),
            I(!0));
          return;
        } else {
          var o, s;
          ((o = V.current) == null ||
            o.style.setProperty(`--swipe-amount-x`, `0px`),
            (s = V.current) == null ||
              s.style.setProperty(`--swipe-amount-y`, `0px`));
        }
        (L(!1), P(!1), E(null));
      },
      onPointerMove: (e) => {
        var t, n;
        if (!Y.current || !G || window.getSelection()?.toString().length > 0)
          return;
        let r = e.clientY - Y.current.y,
          i = e.clientX - Y.current.x;
        !T &&
          (Math.abs(i) > 1 || Math.abs(r) > 1) &&
          E(Math.abs(i) > Math.abs(r) ? `x` : `y`);
        let a = { x: 0, y: 0 },
          o = (e) => 1 / (1.5 + Math.abs(e) / 20);
        if (T === `y`) {
          if (X.includes(`top`) || X.includes(`bottom`))
            if ((X.includes(`top`) && r < 0) || (X.includes(`bottom`) && r > 0))
              a.y = r;
            else {
              let e = r * o(r);
              a.y = Math.abs(e) < Math.abs(r) ? e : r;
            }
        } else if (T === `x` && (X.includes(`left`) || X.includes(`right`)))
          if ((X.includes(`left`) && i < 0) || (X.includes(`right`) && i > 0))
            a.x = i;
          else {
            let e = i * o(i);
            a.x = Math.abs(e) < Math.abs(i) ? e : i;
          }
        ((Math.abs(a.x) > 0 || Math.abs(a.y) > 0) && L(!0),
          (t = V.current) == null ||
            t.style.setProperty(`--swipe-amount-x`, `${a.x}px`),
          (n = V.current) == null ||
            n.style.setProperty(`--swipe-amount-y`, `${a.y}px`));
      },
    },
    le && !n.jsx && U !== `loading`
      ? o.createElement(
          `button`,
          {
            "aria-label": te,
            "data-disabled": Z,
            "data-close-button": !0,
            onClick:
              Z || !G
                ? () => {}
                : () => {
                    (Q(), n.onDismiss == null || n.onDismiss.call(n, n));
                  },
            className: $(C?.closeButton, n?.classNames?.closeButton),
          },
          w?.close ?? ve,
        )
      : null,
    (U || n.icon || n.promise) && n.icon !== null && (w?.[U] !== null || n.icon)
      ? o.createElement(
          `div`,
          { "data-icon": ``, className: $(C?.icon, n?.classNames?.icon) },
          U === `loading` ? n.icon || xe() : n.promise ? xe() : null,
          U === `loading` ? null : Se,
        )
      : null,
    o.createElement(
      `div`,
      { "data-content": ``, className: $(C?.content, n?.classNames?.content) },
      o.createElement(
        `div`,
        { "data-title": ``, className: $(C?.title, n?.classNames?.title) },
        n.jsx ? n.jsx : typeof n.title == `function` ? n.title() : n.title,
      ),
      n.description
        ? o.createElement(
            `div`,
            {
              "data-description": ``,
              className: $(y, ce, C?.description, n?.classNames?.description),
            },
            typeof n.description == `function`
              ? n.description()
              : n.description,
          )
        : null,
    ),
    o.isValidElement(n.cancel)
      ? n.cancel
      : n.cancel && we(n.cancel)
        ? o.createElement(
            `button`,
            {
              "data-button": !0,
              "data-cancel": !0,
              style: n.cancelButtonStyle || g,
              onClick: (e) => {
                we(n.cancel) &&
                  G &&
                  (n.cancel.onClick == null ||
                    n.cancel.onClick.call(n.cancel, e),
                  Q());
              },
              className: $(C?.cancelButton, n?.classNames?.cancelButton),
            },
            n.cancel.label,
          )
        : null,
    o.isValidElement(n.action)
      ? n.action
      : n.action && we(n.action)
        ? o.createElement(
            `button`,
            {
              "data-button": !0,
              "data-action": !0,
              style: n.actionButtonStyle || _,
              onClick: (e) => {
                we(n.action) &&
                  (n.action.onClick == null ||
                    n.action.onClick.call(n.action, e),
                  !e.defaultPrevented && Q());
              },
              className: $(C?.actionButton, n?.classNames?.actionButton),
            },
            n.action.label,
          )
        : null,
  );
};
function Fe() {
  if (typeof window > `u` || typeof document > `u`) return `ltr`;
  let e = document.documentElement.getAttribute(`dir`);
  return e === `auto` || !e
    ? window.getComputedStyle(document.documentElement).direction
    : e;
}
function Ie(e, t) {
  let n = {};
  return (
    [e, t].forEach((e, t) => {
      let r = t === 1,
        i = r ? `--mobile-offset` : `--offset`,
        a = r ? De : Ee;
      function o(e) {
        [`top`, `right`, `bottom`, `left`].forEach((t) => {
          n[`${i}-${t}`] = typeof e == `number` ? `${e}px` : e;
        });
      }
      typeof e == `number` || typeof e == `string`
        ? o(e)
        : typeof e == `object`
          ? [`top`, `right`, `bottom`, `left`].forEach((t) => {
              e[t] === void 0
                ? (n[`${i}-${t}`] = a)
                : (n[`${i}-${t}`] =
                    typeof e[t] == `number` ? `${e[t]}px` : e[t]);
            })
          : o(a);
    }),
    n
  );
}
var Le = o.forwardRef(function (e, t) {
  let {
      id: n,
      invert: r,
      position: i = `bottom-right`,
      hotkey: a = [`altKey`, `KeyT`],
      expand: s,
      closeButton: c,
      className: l,
      offset: u,
      mobileOffset: d,
      theme: f = `light`,
      richColors: p,
      duration: m,
      style: h,
      visibleToasts: g = Te,
      toastOptions: _,
      dir: v = Fe(),
      gap: y = Ae,
      icons: b,
      customAriaLabel: x,
      containerAriaLabel: ee = `Notifications`,
    } = e,
    [S, C] = o.useState([]),
    w = o.useMemo(
      () =>
        n ? S.filter((e) => e.toasterId === n) : S.filter((e) => !e.toasterId),
      [S, n],
    ),
    te = o.useMemo(
      () =>
        Array.from(
          new Set(
            [i].concat(w.filter((e) => e.position).map((e) => e.position)),
          ),
        ),
      [w, i],
    ),
    [T, E] = o.useState([]),
    [D, O] = o.useState(!1),
    [k, A] = o.useState(!1),
    [j, M] = o.useState(
      f === `system`
        ? typeof window < `u` &&
          window.matchMedia &&
          window.matchMedia(`(prefers-color-scheme: dark)`).matches
          ? `dark`
          : `light`
        : f,
    ),
    N = o.useRef(null),
    P = a.join(`+`).replace(/Key/g, ``).replace(/Digit/g, ``),
    F = o.useRef(null),
    I = o.useRef(!1),
    ne = o.useCallback((e) => {
      C(
        (t) => (
          t.find((t) => t.id === e.id)?.delete || Q.dismiss(e.id),
          t.filter(({ id: t }) => t !== e.id)
        ),
      );
    }, []);
  return (
    o.useEffect(
      () =>
        Q.subscribe((e) => {
          if (e.dismiss) {
            requestAnimationFrame(() => {
              C((t) =>
                t.map((t) => (t.id === e.id ? { ...t, delete: !0 } : t)),
              );
            });
            return;
          }
          setTimeout(() => {
            J.flushSync(() => {
              C((t) => {
                let n = t.findIndex((t) => t.id === e.id);
                return n === -1
                  ? [e, ...t]
                  : [...t.slice(0, n), { ...t[n], ...e }, ...t.slice(n + 1)];
              });
            });
          });
        }),
      [],
    ),
    o.useEffect(() => {
      if (f !== `system`) {
        M(f);
        return;
      }
      if (
        (f === `system` &&
          (window.matchMedia &&
          window.matchMedia(`(prefers-color-scheme: dark)`).matches
            ? M(`dark`)
            : M(`light`)),
        typeof window > `u`)
      )
        return;
      let e = window.matchMedia(`(prefers-color-scheme: dark)`);
      try {
        e.addEventListener(`change`, ({ matches: e }) => {
          M(e ? `dark` : `light`);
        });
      } catch {
        e.addListener(({ matches: e }) => {
          try {
            M(e ? `dark` : `light`);
          } catch (e) {
            console.error(e);
          }
        });
      }
    }, [f]),
    o.useEffect(() => {
      S.length <= 1 && O(!1);
    }, [S]),
    o.useEffect(() => {
      let e = (e) => {
        if (a.length > 0 && a.every((t) => e[t] || e.code === t)) {
          var t;
          (O(!0), (t = N.current) == null || t.focus());
        }
        e.code === `Escape` &&
          (document.activeElement === N.current ||
            N.current?.contains(document.activeElement)) &&
          O(!1);
      };
      return (
        document.addEventListener(`keydown`, e),
        () => document.removeEventListener(`keydown`, e)
      );
    }, [a]),
    o.useEffect(() => {
      if (N.current)
        return () => {
          F.current &&
            (F.current.focus({ preventScroll: !0 }),
            (F.current = null),
            (I.current = !1));
        };
    }, [N.current]),
    o.createElement(
      `section`,
      {
        ref: t,
        "aria-label": x ?? `${ee} ${P}`,
        tabIndex: -1,
        "aria-live": `polite`,
        "aria-relevant": `additions text`,
        "aria-atomic": `false`,
        suppressHydrationWarning: !0,
        "data-react-aria-top-layer": !0,
      },
      te.map((t, n) => {
        let [i, a] = t.split(`-`);
        return w.length
          ? o.createElement(
              `ol`,
              {
                key: t,
                dir: v === `auto` ? Fe() : v,
                tabIndex: -1,
                ref: N,
                className: l,
                "data-sonner-toaster": !0,
                "data-sonner-theme": j,
                "data-y-position": i,
                "data-x-position": a,
                style: {
                  "--front-toast-height": `${T[0]?.height || 0}px`,
                  "--width": `${ke}px`,
                  "--gap": `${y}px`,
                  ...h,
                  ...Ie(u, d),
                },
                onBlur: (e) => {
                  I.current &&
                    !e.currentTarget.contains(e.relatedTarget) &&
                    ((I.current = !1),
                    (F.current &&=
                      (F.current.focus({ preventScroll: !0 }), null)));
                },
                onFocus: (e) => {
                  (e.target instanceof HTMLElement &&
                    e.target.dataset.dismissible === `false`) ||
                    I.current ||
                    ((I.current = !0), (F.current = e.relatedTarget));
                },
                onMouseEnter: () => O(!0),
                onMouseMove: () => O(!0),
                onMouseLeave: () => {
                  k || O(!1);
                },
                onDragEnd: () => O(!1),
                onPointerDown: (e) => {
                  (e.target instanceof HTMLElement &&
                    e.target.dataset.dismissible === `false`) ||
                    A(!0);
                },
                onPointerUp: () => A(!1),
              },
              w
                .filter((e) => (!e.position && n === 0) || e.position === t)
                .map((n, i) =>
                  o.createElement(Pe, {
                    key: n.id,
                    icons: b,
                    index: i,
                    toast: n,
                    defaultRichColors: p,
                    duration: _?.duration ?? m,
                    className: _?.className,
                    descriptionClassName: _?.descriptionClassName,
                    invert: r,
                    visibleToasts: g,
                    closeButton: _?.closeButton ?? c,
                    interacting: k,
                    position: t,
                    style: _?.style,
                    unstyled: _?.unstyled,
                    classNames: _?.classNames,
                    cancelButtonStyle: _?.cancelButtonStyle,
                    actionButtonStyle: _?.actionButtonStyle,
                    closeButtonAriaLabel: _?.closeButtonAriaLabel,
                    removeToast: ne,
                    toasts: w.filter((e) => e.position == n.position),
                    heights: T.filter((e) => e.position == n.position),
                    setHeights: E,
                    expandByDefault: s,
                    gap: y,
                    expanded: D,
                    swipeDirections: e.swipeDirections,
                  }),
                ),
            )
          : null;
      }),
    )
  );
});
export {
  F as C,
  u as D,
  f as E,
  l as O,
  T as S,
  v as T,
  b as _,
  W as a,
  A as b,
  z as c,
  L as d,
  g as f,
  x as g,
  _ as h,
  le as i,
  a as k,
  R as l,
  ee as m,
  Ce as n,
  U as o,
  S as p,
  K as r,
  B as s,
  Le as t,
  re as u,
  h as v,
  N as w,
  y as x,
  C as y,
};
