import { i as e, n as t, t as n } from "./jsx-runtime-Cltr0gcK.js";
import { t as r } from "./link-CKQMLqzL.js";
import { t as i } from "./useQuery-DDbtQ9mW.js";
import { t as a } from "./useMutation-CYY_aFUu.js";
import { S as o } from "./index-Difz8PWa.js";
import { t as s } from "./supabase-DTorYgRt.js";
import { t as c } from "./createLucideIcon-CEGepnBf.js";
import { t as l } from "./loader-circle-LmZjNfAe.js";
import { t as u } from "./shield-O49Fg52t.js";
var d = c(`arrow-left`, [
    [`path`, { d: `m12 19-7-7 7-7`, key: `1l729n` }],
    [`path`, { d: `M19 12H5`, key: `x3x0zl` }],
  ]),
  f = e(t()),
  p = n();
function m() {
  let e = o(),
    [t, n] = (0, f.useState)(null);
  (0, f.useEffect)(() => {
    s.auth.getSession().then(({ data: t }) => {
      t.session ? n(t.session.user.id) : e({ to: `/auth`, replace: !0 });
    });
  }, [e]);
  let c = i({
      queryKey: [`profile`, t],
      enabled: !!t,
      queryFn: async () => {
        let { data: e, error: n } = await s
          .from(`profiles`)
          .select(`*`)
          .eq(`id`, t)
          .single();
        if (n) throw n;
        return e;
      },
    }),
    m = a({
      mutationFn: async () => {
        let { error: e } = await s
          .from(`profiles`)
          .update({ account_type: `admin` })
          .eq(`id`, t);
        if (e) throw e;
      },
      onSuccess: () => {
        c.refetch();
      },
    }),
    h = c.data?.account_type === `admin`,
    g = i({
      queryKey: [`admin_stats`],
      enabled: !!h,
      queryFn: async () => {
        let [e, t] = await Promise.all([
          s.from(`profiles`).select(`id`, { count: `exact`, head: !0 }),
          s.from(`brands`).select(`id`, { count: `exact`, head: !0 }),
        ]);
        return { users: e.count || 0, brands: t.count || 0, subscriptions: 0 };
      },
    });
  return !t || c.isLoading
    ? (0, p.jsx)(`div`, {
        className: `flex min-h-screen items-center justify-center bg-background`,
        children: (0, p.jsx)(l, {
          className: `w-8 h-8 animate-spin text-brand`,
        }),
      })
    : h
      ? (0, p.jsxs)(`div`, {
          className: `min-h-screen bg-background`,
          children: [
            (0, p.jsxs)(`header`, {
              className: `border-b border-border/50 bg-card p-4 flex items-center justify-between`,
              children: [
                (0, p.jsxs)(`div`, {
                  className: `flex items-center gap-3`,
                  children: [
                    (0, p.jsx)(`div`, {
                      className: `w-8 h-8 rounded-lg bg-brand flex items-center justify-center`,
                      children: (0, p.jsx)(u, {
                        className: `text-white w-4 h-4`,
                      }),
                    }),
                    (0, p.jsx)(`span`, {
                      className: `font-bold text-lg`,
                      children: `Branzly Admin`,
                    }),
                  ],
                }),
                (0, p.jsx)(r, {
                  to: `/discover`,
                  className: `text-sm font-semibold text-muted-foreground hover:text-foreground`,
                  children: `Exit Admin`,
                }),
              ],
            }),
            (0, p.jsxs)(`main`, {
              className: `p-8 max-w-6xl mx-auto`,
              children: [
                (0, p.jsx)(`h1`, {
                  className: `text-3xl font-bold mb-6`,
                  children: `Platform Administration`,
                }),
                (0, p.jsxs)(`div`, {
                  className: `grid grid-cols-1 md:grid-cols-3 gap-6 mb-8`,
                  children: [
                    (0, p.jsxs)(`div`, {
                      className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
                      children: [
                        (0, p.jsx)(`h3`, {
                          className: `text-sm font-semibold text-muted-foreground uppercase mb-1`,
                          children: `Total Users`,
                        }),
                        (0, p.jsx)(`p`, {
                          className: `text-3xl font-bold`,
                          children: g.isLoading
                            ? (0, p.jsx)(l, {
                                className: `w-6 h-6 animate-spin text-muted-foreground`,
                              })
                            : g.data?.users || 0,
                        }),
                      ],
                    }),
                    (0, p.jsxs)(`div`, {
                      className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
                      children: [
                        (0, p.jsx)(`h3`, {
                          className: `text-sm font-semibold text-muted-foreground uppercase mb-1`,
                          children: `Total Brands`,
                        }),
                        (0, p.jsx)(`p`, {
                          className: `text-3xl font-bold`,
                          children: g.isLoading
                            ? (0, p.jsx)(l, {
                                className: `w-6 h-6 animate-spin text-muted-foreground`,
                              })
                            : g.data?.brands || 0,
                        }),
                      ],
                    }),
                    (0, p.jsxs)(`div`, {
                      className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
                      children: [
                        (0, p.jsx)(`h3`, {
                          className: `text-sm font-semibold text-muted-foreground uppercase mb-1`,
                          children: `Active Subscriptions`,
                        }),
                        (0, p.jsx)(`p`, {
                          className: `text-3xl font-bold`,
                          children: g.isLoading
                            ? (0, p.jsx)(l, {
                                className: `w-6 h-6 animate-spin text-muted-foreground`,
                              })
                            : g.data?.subscriptions || 0,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        })
      : (0, p.jsxs)(`div`, {
          className: `flex flex-col items-center justify-center min-h-screen text-center p-4`,
          children: [
            (0, p.jsx)(`div`, {
              className: `w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6`,
              children: (0, p.jsx)(u, {
                className: `w-8 h-8 text-destructive`,
              }),
            }),
            (0, p.jsx)(`h2`, {
              className: `text-2xl font-bold text-foreground mb-2`,
              children: `Access Denied`,
            }),
            (0, p.jsx)(`p`, {
              className: `text-muted-foreground mb-6`,
              children: `You do not have permission to access the admin portal.`,
            }),
            (0, p.jsxs)(`div`, {
              className: `flex flex-col gap-3 items-center`,
              children: [
                (0, p.jsxs)(r, {
                  to: `/discover`,
                  className: `flex items-center gap-2 text-sm font-semibold text-brand hover:underline`,
                  children: [
                    (0, p.jsx)(d, { size: 16 }),
                    ` Return to Dashboard`,
                  ],
                }),
                (0, p.jsx)(`button`, {
                  onClick: () => m.mutate(),
                  disabled: m.isPending,
                  className: `text-xs text-muted-foreground underline mt-4 hover:text-foreground`,
                  children: m.isPending
                    ? `Updating...`
                    : `Dev Bypass: Make me an admin`,
                }),
              ],
            }),
          ],
        });
}
export { m as component };
