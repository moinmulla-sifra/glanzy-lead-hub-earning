import { i as e, n as t, t as n } from "./jsx-runtime-Cltr0gcK.js";
import { n as r, t as i } from "./link-CKQMLqzL.js";
import { a, n as o, r as s } from "./theme-DqD5jDaL.js";
import { n as c } from "./useMatch-CU29MQY4.js";
import { t as l } from "./useRouter-CwjitLz4.js";
import { t as u } from "./useQuery-DDbtQ9mW.js";
import { S as d, x as f } from "./index-Difz8PWa.js";
import { t as p } from "./supabase-DTorYgRt.js";
import { t as m } from "./createLucideIcon-CEGepnBf.js";
import { t as h } from "./bookmark-BtRCrCO3.js";
import { t as g } from "./chart-no-axes-column-increasing-Klwwk7w3.js";
import { t as _ } from "./compass-BSwcFPjt.js";
import { t as v } from "./log-out-ORTi8ClS.js";
import { t as y } from "./send-C1wOFq8M.js";
import { t as b } from "./sparkles-C-wfMPnb.js";
import { t as x } from "./user-dmWph8jC.js";
import { t as S } from "./users-ByQQ79Dh.js";
import { t as C } from "./x-_CKTk_uH.js";
function w(e) {
  let t = l();
  return r(t.stores.location, c(e, t));
}
var T = m(`menu`, [
    [`path`, { d: `M4 5h16`, key: `1tepv9` }],
    [`path`, { d: `M4 12h16`, key: `1lakjw` }],
    [`path`, { d: `M4 19h16`, key: `1djgab` }],
  ]),
  E = m(`monitor`, [
    [
      `rect`,
      { width: `20`, height: `14`, x: `2`, y: `3`, rx: `2`, key: `48i651` },
    ],
    [`line`, { x1: `8`, x2: `16`, y1: `21`, y2: `21`, key: `1svkeh` }],
    [`line`, { x1: `12`, x2: `12`, y1: `17`, y2: `21`, key: `vw1qmm` }],
  ]),
  D = m(`moon`, [
    [
      `path`,
      {
        d: `M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`,
        key: `kfwtm`,
      },
    ],
  ]),
  O = m(`panel-left-close`, [
    [
      `rect`,
      { width: `18`, height: `18`, x: `3`, y: `3`, rx: `2`, key: `afitv7` },
    ],
    [`path`, { d: `M9 3v18`, key: `fh3hqa` }],
    [`path`, { d: `m16 15-3-3 3-3`, key: `14y99z` }],
  ]),
  k = m(`panel-left-open`, [
    [
      `rect`,
      { width: `18`, height: `18`, x: `3`, y: `3`, rx: `2`, key: `afitv7` },
    ],
    [`path`, { d: `M9 3v18`, key: `fh3hqa` }],
    [`path`, { d: `m14 9 3 3-3 3`, key: `8010ee` }],
  ]),
  A = m(`settings`, [
    [
      `path`,
      {
        d: `M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915`,
        key: `1i5ecw`,
      },
    ],
    [`circle`, { cx: `12`, cy: `12`, r: `3`, key: `1v7zrd` }],
  ]),
  j = m(`sun`, [
    [`circle`, { cx: `12`, cy: `12`, r: `4`, key: `4exip2` }],
    [`path`, { d: `M12 2v2`, key: `tus03m` }],
    [`path`, { d: `M12 20v2`, key: `1lh1kg` }],
    [`path`, { d: `m4.93 4.93 1.41 1.41`, key: `149t6j` }],
    [`path`, { d: `m17.66 17.66 1.41 1.41`, key: `ptbguv` }],
    [`path`, { d: `M2 12h2`, key: `1t8f8n` }],
    [`path`, { d: `M20 12h2`, key: `1q8mjw` }],
    [`path`, { d: `m6.34 17.66-1.41 1.41`, key: `1m8zz5` }],
    [`path`, { d: `m19.07 4.93-1.41 1.41`, key: `1shlcs` }],
  ]),
  M = e(t(), 1),
  N = n();
function P() {
  let [e, t] = (0, M.useState)(`system`);
  (0, M.useEffect)(() => {
    t(s());
    let e = (e) => {
      t(e.detail);
    };
    return (
      window.addEventListener(`theme-change`, e),
      () => window.removeEventListener(`theme-change`, e)
    );
  }, []);
  function n() {
    o(e === `dark` ? `light` : e === `light` ? `system` : `dark`);
  }
  return (0, N.jsx)(`button`, {
    className: `p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center justify-center`,
    onClick: n,
    "aria-label": `Current theme: ${e}. Click to change.`,
    title: `Current theme: ${e}. Click to change.`,
    children:
      e === `dark`
        ? (0, N.jsx)(D, { size: 18 })
        : e === `light`
          ? (0, N.jsx)(j, { size: 18 })
          : (0, N.jsx)(E, { size: 18 }),
  });
}
function F() {
  let e = d(),
    t = w(),
    n = f(),
    [r, o] = (0, M.useState)(!1),
    [s, c] = (0, M.useState)(null),
    [l, m] = (0, M.useState)(null),
    [E, D] = (0, M.useState)(!1),
    [j, F] = (0, M.useState)(!1);
  (0, M.useEffect)(() => {
    let t = !0;
    p.auth.getSession().then(({ data: n }) => {
      if (t) {
        if (!n.session) {
          e({ to: `/auth`, replace: !0 });
          return;
        }
        (c(n.session.user.id), m(n.session.user.email ?? null), o(!0));
      }
    });
    let { data: n } = p.auth.onAuthStateChange((n, r) => {
      t &&
        (n === `SIGNED_OUT` || !r
          ? (o(!1), e({ to: `/auth`, replace: !0 }))
          : n === `SIGNED_IN` &&
            r &&
            (c(r.user.id), m(r.user.email ?? null), o(!0)));
    });
    return () => {
      ((t = !1), n.subscription.unsubscribe());
    };
  }, [e]);
  let I = u({
    queryKey: [`profile`, s],
    enabled: !!s,
    queryFn: async () => {
      let { data: e, error: t } = await p
        .from(`profiles`)
        .select(`*`)
        .eq(`id`, s)
        .single();
      if (t) throw t;
      return e;
    },
  });
  async function L() {
    (await n.cancelQueries(), n.clear(), await p.auth.signOut());
  }
  if (!r)
    return (0, N.jsx)(`div`, {
      className: `flex min-h-screen items-center justify-center bg-background`,
      children: (0, N.jsxs)(`div`, {
        className: `flex flex-col items-center gap-4`,
        children: [
          (0, N.jsx)(`div`, {
            className: `h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent`,
          }),
          (0, N.jsx)(`p`, {
            className: `text-sm font-medium text-muted-foreground animate-pulse`,
            children: `Loading Branzly...`,
          }),
        ],
      }),
    });
  let R = I.data?.account_type === `agency`,
    z = [
      { id: `dashboard`, label: `Dashboard`, icon: g, to: `/dashboard` },
      { id: `discover`, label: `Discover`, icon: _, to: `/discover` },
      { id: `saved`, label: `Saved`, icon: h, to: `/saved` },
      { id: `contacted`, label: `Contacted`, icon: y, to: `/contacted` },
      { id: `for-you`, label: `For You`, icon: b, to: `/for-you` },
    ],
    B = [
      { id: `profile`, label: `Profile`, icon: x, to: `/profile` },
      ...(R ? [{ id: `team`, label: `Team`, icon: S, to: `/team` }] : []),
      { id: `settings`, label: `Settings`, icon: A, to: `/settings` },
    ];
  return (0, N.jsxs)(`div`, {
    className: `flex h-screen bg-background overflow-hidden selection:bg-brand/20`,
    children: [
      (0, N.jsxs)(`div`, {
        className: `lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-between px-4`,
        children: [
          (0, N.jsxs)(`div`, {
            className: `flex items-center gap-2`,
            children: [
              (0, N.jsx)(`div`, {
                className: `w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/20`,
                children: (0, N.jsx)(`span`, {
                  className: `text-white font-bold text-lg leading-none`,
                  children: `B`,
                }),
              }),
              (0, N.jsx)(`span`, {
                className: `font-bold text-lg tracking-tight`,
                children: `Branzly`,
              }),
            ],
          }),
          (0, N.jsx)(`button`, {
            onClick: () => D(!E),
            className: `p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors`,
            children: E
              ? (0, N.jsx)(C, { size: 24 })
              : (0, N.jsx)(T, { size: 24 }),
          }),
        ],
      }),
      (0, N.jsxs)(`aside`, {
        className: `
        fixed inset-y-0 left-0 z-40 bg-card border-r border-border/50 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        lg:relative lg:translate-x-0
        ${E ? `translate-x-0 w-64` : `-translate-x-full w-64`}
        ${j ? `lg:w-0 lg:border-r-0 lg:opacity-0 lg:overflow-hidden lg:invisible` : `lg:w-64 lg:opacity-100 lg:visible`}
      `,
        children: [
          (0, N.jsxs)(`div`, {
            className: `p-6 hidden lg:flex items-center justify-between gap-3`,
            children: [
              (0, N.jsxs)(`div`, {
                className: `flex items-center gap-3`,
                children: [
                  (0, N.jsx)(`div`, {
                    className: `w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/20`,
                    children: (0, N.jsx)(`span`, {
                      className: `text-brand-foreground font-bold text-lg leading-none`,
                      children: `B`,
                    }),
                  }),
                  (0, N.jsx)(`span`, {
                    className: `font-bold text-xl tracking-tight`,
                    children: `Branzly`,
                  }),
                ],
              }),
              (0, N.jsx)(`button`, {
                onClick: () => F(!0),
                className: `p-1 text-muted-foreground hover:bg-muted rounded-md transition-colors`,
                title: `Close sidebar`,
                children: (0, N.jsx)(O, { size: 20 }),
              }),
            ],
          }),
          (0, N.jsxs)(`div`, {
            className: `flex-1 overflow-y-auto py-6 lg:py-2 px-3`,
            children: [
              (0, N.jsxs)(`nav`, {
                className: `space-y-1`,
                children: [
                  (0, N.jsx)(`div`, {
                    className: `px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider`,
                    children: `Menu`,
                  }),
                  z.map((e) => {
                    let n = e.icon,
                      r = t.pathname.startsWith(e.to);
                    return (0, N.jsxs)(
                      i,
                      {
                        to: e.to,
                        onClick: () => D(!1),
                        className: `
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${r ? `bg-brand/10 text-brand shadow-sm` : `text-muted-foreground hover:bg-muted/50 hover:text-foreground`}
                  `,
                        children: [
                          (0, N.jsx)(n, {
                            size: 18,
                            className: r ? `text-brand` : `opacity-70`,
                          }),
                          e.label,
                        ],
                      },
                      e.id,
                    );
                  }),
                ],
              }),
              (0, N.jsxs)(`nav`, {
                className: `space-y-1 mt-8`,
                children: [
                  (0, N.jsx)(`div`, {
                    className: `px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider`,
                    children: `Account`,
                  }),
                  B.map((e) => {
                    let n = e.icon,
                      r = t.pathname.startsWith(e.to);
                    return (0, N.jsxs)(
                      i,
                      {
                        to: e.to,
                        onClick: () => D(!1),
                        className: `
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${r ? `bg-brand/10 text-brand shadow-sm` : `text-muted-foreground hover:bg-muted/50 hover:text-foreground`}
                  `,
                        children: [
                          (0, N.jsx)(n, {
                            size: 18,
                            className: r ? `text-brand` : `opacity-70`,
                          }),
                          e.label,
                        ],
                      },
                      e.id,
                    );
                  }),
                ],
              }),
            ],
          }),
          (0, N.jsxs)(`div`, {
            className: `p-4 border-t border-border/50`,
            children: [
              (0, N.jsxs)(`div`, {
                className: `flex items-center gap-3 px-3 py-2 mb-2`,
                children: [
                  (0, N.jsx)(`div`, {
                    className: `w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0`,
                    children: I.data?.avatar_url
                      ? (0, N.jsx)(`img`, {
                          src: I.data.avatar_url,
                          alt: `User`,
                          className: `w-full h-full object-cover`,
                        })
                      : (0, N.jsx)(x, {
                          size: 14,
                          className: `text-muted-foreground`,
                        }),
                  }),
                  (0, N.jsxs)(`div`, {
                    className: `flex-1 overflow-hidden`,
                    children: [
                      (0, N.jsx)(`p`, {
                        className: `text-sm font-medium truncate`,
                        children: I.data?.full_name || l?.split(`@`)[0],
                      }),
                      (0, N.jsx)(`p`, {
                        className: `text-xs text-muted-foreground truncate`,
                        children: l,
                      }),
                    ],
                  }),
                ],
              }),
              (0, N.jsxs)(`div`, {
                className: `flex items-center justify-between gap-2`,
                children: [
                  (0, N.jsx)(P, {}),
                  (0, N.jsxs)(`button`, {
                    onClick: L,
                    className: `flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors`,
                    children: [(0, N.jsx)(v, { size: 16 }), `Sign Out`],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      (0, N.jsxs)(`main`, {
        className: `flex-1 flex flex-col h-[100dvh] pt-16 lg:pt-0 overflow-hidden relative`,
        children: [
          (0, N.jsx)(`div`, {
            className: `absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/5 via-background to-background pointer-events-none`,
          }),
          j &&
            (0, N.jsx)(`div`, {
              className: `hidden lg:flex fixed top-4 left-4 z-20`,
              children: (0, N.jsx)(`button`, {
                onClick: () => F(!1),
                className: `p-2 bg-card border border-border/50 text-muted-foreground hover:bg-muted rounded-md shadow-sm transition-all hover:text-foreground`,
                title: `Open sidebar`,
                children: (0, N.jsx)(k, { size: 20 }),
              }),
            }),
          (0, N.jsx)(`div`, {
            className: `flex-1 overflow-y-auto p-4 lg:p-8 relative z-10`,
            children: (0, N.jsx)(`div`, {
              className: `max-w-6xl mx-auto h-full`,
              children: (0, N.jsx)(a, {}),
            }),
          }),
        ],
      }),
      E &&
        (0, N.jsx)(`div`, {
          className: `fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden`,
          onClick: () => D(!1),
        }),
    ],
  });
}
export { F as component };
