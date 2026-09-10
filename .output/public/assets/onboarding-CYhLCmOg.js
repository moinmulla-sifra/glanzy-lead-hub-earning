import { i as e, n as t, t as n } from "./jsx-runtime-Cltr0gcK.js";
import { S as r, r as i } from "./index-Difz8PWa.js";
import { t as a } from "./supabase-DTorYgRt.js";
import { t as o } from "./arrow-right-D5pQCwSL.js";
import { t as s } from "./loader-circle-LmZjNfAe.js";
var c = e(t()),
  l = n();
function u() {
  let e = r(),
    [t, n] = (0, c.useState)(!1),
    [u, d] = (0, c.useState)(!1),
    [f, p] = (0, c.useState)(null),
    [m, h] = (0, c.useState)(`creator`),
    [g, _] = (0, c.useState)(``),
    [v, y] = (0, c.useState)(``),
    [b, x] = (0, c.useState)(``),
    [S, C] = (0, c.useState)(``),
    [w, T] = (0, c.useState)(``),
    [E, D] = (0, c.useState)(``),
    [O, k] = (0, c.useState)(``);
  return (
    (0, c.useEffect)(() => {
      a.auth.getSession().then(({ data: t }) => {
        if (!t.session) {
          e({ to: `/auth`, replace: !0 });
          return;
        }
        (p(t.session.user.id),
          a
            .from(`profiles`)
            .select(`account_type, onboarding_completed, primary_niche`)
            .eq(`id`, t.session.user.id)
            .single()
            .then(({ data: t, error: n }) => {
              t
                ? t.onboarding_completed
                  ? e({ to: `/dashboard`, replace: !0 })
                  : (h(t.account_type), d(!0))
                : d(!0);
            }));
      });
    }, [e]),
    u
      ? (0, l.jsx)(`div`, {
          className: `min-h-screen flex items-center justify-center bg-background p-4`,
          children: (0, l.jsx)(`div`, {
            className: `w-full max-w-lg bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-500`,
            children: (0, l.jsxs)(`div`, {
              className: `p-8`,
              children: [
                (0, l.jsxs)(`div`, {
                  className: `text-center mb-8`,
                  children: [
                    (0, l.jsx)(`h2`, {
                      className: `text-3xl font-bold text-foreground mb-2 tracking-tight`,
                      children: `Complete your profile`,
                    }),
                    (0, l.jsxs)(`p`, {
                      className: `text-muted-foreground`,
                      children: [
                        `Let's set up your `,
                        m,
                        ` account to get personalized recommendations.`,
                      ],
                    }),
                  ],
                }),
                (0, l.jsxs)(`form`, {
                  onSubmit: async (t) => {
                    if ((t.preventDefault(), f)) {
                      n(!0);
                      try {
                        let t = { country: v, onboarding_completed: !0 };
                        if (m === `creator`) {
                          if (!g)
                            throw Error(`Please enter your primary niche.`);
                          ((t.primary_niche = g),
                            (t.niche = g),
                            (t.content_categories = S.split(`,`)
                              .map((e) => e.trim())
                              .filter(Boolean)),
                            (t.platforms = w
                              .split(`,`)
                              .map((e) => e.trim())
                              .filter(Boolean)),
                            (t.audience_range = E));
                        } else {
                          if (!b) throw Error(`Please enter your agency name.`);
                          ((t.website = O),
                            (t.primary_niche = g),
                            (t.niche = g),
                            (t.agency_name = b),
                            (t.content_categories = S.split(`,`)
                              .map((e) => e.trim())
                              .filter(Boolean)));
                        }
                        let n = { id: f, account_type: m, ...t },
                          { error: r } = await a
                            .from(`profiles`)
                            .upsert(n)
                            .select()
                            .single();
                        if (r) throw r;
                        let { data: o } = await a
                          .from(`workspace_members`)
                          .select(`workspace_id`)
                          .eq(`user_id`, f)
                          .maybeSingle();
                        if (o)
                          m === `agency` &&
                            b &&
                            (await a
                              .from(`workspaces`)
                              .update({
                                name: b,
                                updated_at: new Date().toISOString(),
                              })
                              .eq(`id`, o.workspace_id));
                        else {
                          let e =
                              m === `agency`
                                ? b || `My Agency`
                                : `My Workspace`,
                            { data: t } = await a
                              .from(`workspaces`)
                              .insert({
                                name: e,
                                type: m,
                                workspace_type: m,
                                owner_id: f,
                              })
                              .select()
                              .maybeSingle();
                          t &&
                            (await a
                              .from(`workspace_members`)
                              .insert({
                                workspace_id: t.id,
                                user_id: f,
                                role: `owner`,
                              }));
                        }
                        (i.success(`Welcome to Branzly!`),
                          e({ to: `/dashboard`, replace: !0 }));
                      } catch (e) {
                        i.error(e.message || `Failed to save profile`);
                      } finally {
                        n(!1);
                      }
                    }
                  },
                  className: `space-y-4`,
                  children: [
                    m === `creator`
                      ? (0, l.jsxs)(l.Fragment, {
                          children: [
                            (0, l.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, l.jsx)(`label`, {
                                  className: `text-sm font-semibold text-foreground`,
                                  children: `Primary Niche *`,
                                }),
                                (0, l.jsx)(`input`, {
                                  type: `text`,
                                  required: !0,
                                  placeholder: `e.g. Tech, Beauty, Gaming`,
                                  value: g,
                                  onChange: (e) => _(e.target.value),
                                  className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow`,
                                }),
                              ],
                            }),
                            (0, l.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, l.jsx)(`label`, {
                                  className: `text-sm font-semibold text-foreground`,
                                  children: `Platforms (comma separated)`,
                                }),
                                (0, l.jsx)(`input`, {
                                  type: `text`,
                                  placeholder: `e.g. YouTube, Instagram, TikTok`,
                                  value: w,
                                  onChange: (e) => T(e.target.value),
                                  className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow`,
                                }),
                              ],
                            }),
                            (0, l.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, l.jsx)(`label`, {
                                  className: `text-sm font-semibold text-foreground`,
                                  children: `Audience Range`,
                                }),
                                (0, l.jsxs)(`select`, {
                                  value: E,
                                  onChange: (e) => D(e.target.value),
                                  className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow appearance-none`,
                                  children: [
                                    (0, l.jsx)(`option`, {
                                      value: ``,
                                      children: `Select range...`,
                                    }),
                                    (0, l.jsx)(`option`, {
                                      value: `1k-10k`,
                                      children: `1k - 10k`,
                                    }),
                                    (0, l.jsx)(`option`, {
                                      value: `10k-50k`,
                                      children: `10k - 50k`,
                                    }),
                                    (0, l.jsx)(`option`, {
                                      value: `50k-100k`,
                                      children: `50k - 100k`,
                                    }),
                                    (0, l.jsx)(`option`, {
                                      value: `100k-500k`,
                                      children: `100k - 500k`,
                                    }),
                                    (0, l.jsx)(`option`, {
                                      value: `500k+`,
                                      children: `500k+`,
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        })
                      : (0, l.jsxs)(l.Fragment, {
                          children: [
                            (0, l.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, l.jsx)(`label`, {
                                  className: `text-sm font-semibold text-foreground`,
                                  children: `Agency Name *`,
                                }),
                                (0, l.jsx)(`input`, {
                                  type: `text`,
                                  required: !0,
                                  placeholder: `e.g. Apex Talent Group`,
                                  value: b,
                                  onChange: (e) => x(e.target.value),
                                  className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow`,
                                }),
                              ],
                            }),
                            (0, l.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, l.jsx)(`label`, {
                                  className: `text-sm font-semibold text-foreground`,
                                  children: `Website`,
                                }),
                                (0, l.jsx)(`input`, {
                                  type: `url`,
                                  placeholder: `https://example.com`,
                                  value: O,
                                  onChange: (e) => k(e.target.value),
                                  className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow`,
                                }),
                              ],
                            }),
                            (0, l.jsxs)(`div`, {
                              className: `space-y-2`,
                              children: [
                                (0, l.jsx)(`label`, {
                                  className: `text-sm font-semibold text-foreground`,
                                  children: `Focus Categories (comma separated)`,
                                }),
                                (0, l.jsx)(`input`, {
                                  type: `text`,
                                  placeholder: `e.g. Tech, Fashion, Lifestyle`,
                                  value: S,
                                  onChange: (e) => C(e.target.value),
                                  className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow`,
                                }),
                              ],
                            }),
                          ],
                        }),
                    (0, l.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, l.jsx)(`label`, {
                          className: `text-sm font-semibold text-foreground`,
                          children: `Country`,
                        }),
                        (0, l.jsx)(`input`, {
                          type: `text`,
                          placeholder: `e.g. United States`,
                          value: v,
                          onChange: (e) => y(e.target.value),
                          className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow`,
                        }),
                      ],
                    }),
                    (0, l.jsxs)(`div`, {
                      className: `pt-4 flex flex-col gap-3`,
                      children: [
                        (0, l.jsxs)(`button`, {
                          type: `submit`,
                          disabled: t,
                          className: `w-full flex items-center justify-center gap-2 bg-brand text-brand-foreground font-semibold rounded-xl px-4 py-3.5 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 disabled:opacity-50 disabled:cursor-not-allowed`,
                          children: [
                            t
                              ? (0, l.jsx)(s, {
                                  className: `w-5 h-5 animate-spin`,
                                })
                              : `Complete Profile`,
                            !t && (0, l.jsx)(o, { className: `w-5 h-5` }),
                          ],
                        }),
                        (0, l.jsx)(`button`, {
                          type: `button`,
                          onClick: async () => {
                            if (f) {
                              n(!0);
                              try {
                                await a
                                  .from(`profiles`)
                                  .upsert({ id: f, onboarding_completed: !0 });
                                let { data: t } = await a
                                  .from(`workspace_members`)
                                  .select(`workspace_id`)
                                  .eq(`user_id`, f)
                                  .maybeSingle();
                                if (!t) {
                                  let { data: e } = await a
                                    .from(`workspaces`)
                                    .insert({
                                      name: `My Workspace`,
                                      type: m || `creator`,
                                      workspace_type: m || `creator`,
                                      owner_id: f,
                                    })
                                    .select()
                                    .maybeSingle();
                                  e &&
                                    (await a
                                      .from(`workspace_members`)
                                      .insert({
                                        workspace_id: e.id,
                                        user_id: f,
                                        role: `owner`,
                                      }));
                                }
                                e({ to: `/dashboard`, replace: !0 });
                              } catch {
                                i.error(`Failed to skip`);
                              } finally {
                                n(!1);
                              }
                            }
                          },
                          disabled: t,
                          className: `w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors`,
                          children: `Skip for now`,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        })
      : (0, l.jsx)(`div`, {
          className: `min-h-screen flex items-center justify-center bg-background`,
          children: (0, l.jsx)(s, {
            className: `w-8 h-8 animate-spin text-brand`,
          }),
        })
  );
}
export { u as component };
