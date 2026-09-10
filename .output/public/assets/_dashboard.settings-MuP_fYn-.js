import { i as e, n as t, t as n } from "./jsx-runtime-Cltr0gcK.js";
import { t as r } from "./link-CKQMLqzL.js";
import { t as i } from "./useQuery-DDbtQ9mW.js";
import { t as a } from "./useMutation-CYY_aFUu.js";
import { S as o, r as s, x as c } from "./index-Difz8PWa.js";
import { t as l } from "./supabase-DTorYgRt.js";
import { t as u } from "./useMonetization-C0l42Clg.js";
import { t as d } from "./createLucideIcon-CEGepnBf.js";
import { t as f } from "./building-2-DW8rJ0te.js";
import { t as p } from "./credit-card-T4PSeN2q.js";
import { t as m } from "./loader-circle-LmZjNfAe.js";
import { t as h } from "./log-out-ORTi8ClS.js";
import { t as g } from "./save-DWdmpGqL.js";
import { t as _ } from "./shield-O49Fg52t.js";
import { t as v } from "./sparkles-C-wfMPnb.js";
import { t as y } from "./user-dmWph8jC.js";
var b = d(`bell`, [
    [`path`, { d: `M10.268 21a2 2 0 0 0 3.464 0`, key: `vwvbt9` }],
    [
      `path`,
      {
        d: `M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326`,
        key: `11g9vi`,
      },
    ],
  ]),
  x = d(`key`, [
    [
      `path`,
      {
        d: `m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4`,
        key: `g0fldk`,
      },
    ],
    [`path`, { d: `m21 2-9.6 9.6`, key: `1j0ho8` }],
    [`circle`, { cx: `7.5`, cy: `15.5`, r: `5.5`, key: `yqb3hr` }],
  ]),
  S = d(`triangle-alert`, [
    [
      `path`,
      {
        d: `m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3`,
        key: `wmoenq`,
      },
    ],
    [`path`, { d: `M12 9v4`, key: `juzpu7` }],
    [`path`, { d: `M12 17h.01`, key: `p32p05` }],
  ]),
  C = e(t(), 1),
  w = n();
function T({ userId: e }) {
  let t = c(),
    n = o(),
    [u, d] = (0, C.useState)(`account`),
    T = i({
      queryKey: [`profile`, e],
      enabled: !!e,
      queryFn: async () => {
        let { data: t, error: n } = await l
          .from(`profiles`)
          .select(`*`)
          .eq(`id`, e)
          .single();
        if (n) throw n;
        return t;
      },
    }),
    D = i({
      queryKey: [`workspace_member_settings`, e],
      enabled: !!e,
      queryFn: async () => {
        let { data: t, error: n } = await l
          .from(`workspace_members`)
          .select(`*, workspaces(*)`)
          .eq(`user_id`, e)
          .single();
        if (n) throw n;
        return { member: t, workspace: t.workspaces };
      },
    }),
    O = D.data?.member,
    k = D.data?.workspace,
    A = O?.role === `owner` || O?.role === `admin`,
    [j, M] = (0, C.useState)(``);
  (0, C.useEffect)(() => {
    k?.name && M(k.name);
  }, [k?.name]);
  let N = a({
      mutationFn: async (e) => {
        if (!k?.id) throw Error(`Workspace not found`);
        let { error: t } = await l
          .from(`workspaces`)
          .update({ name: e, updated_at: new Date().toISOString() })
          .eq(`id`, k.id);
        if (t) throw t;
      },
      onSuccess: () => {
        (s.success(`Workspace settings saved`),
          t.invalidateQueries({ queryKey: [`workspace_member_settings`] }));
      },
      onError: (e) => s.error(e.message || `Failed to update workspace`),
    }),
    [P, F] = (0, C.useState)(``),
    I = a({
      mutationFn: async (e) => {
        let { error: t } = await l.auth.updateUser({ password: e });
        if (t) throw t;
      },
      onSuccess: () => {
        (s.success(`Password updated successfully`), F(``));
      },
      onError: (e) => s.error(e.message || `Failed to update password`),
    });
  async function L() {
    (await t.cancelQueries(),
      t.clear(),
      await l.auth.signOut(),
      n({ to: `/auth`, replace: !0 }));
  }
  let R = [
    { id: `account`, label: `Account`, icon: y },
    { id: `workspace`, label: `Workspace`, icon: f },
    { id: `security`, label: `Security`, icon: _ },
    { id: `notifications`, label: `Notifications`, icon: b },
    { id: `subscription`, label: `Subscription`, icon: p },
    { id: `danger`, label: `Danger Zone`, icon: S, danger: !0 },
  ];
  if (!e || T.isLoading || D.isLoading)
    return (0, w.jsx)(`div`, {
      className: `flex flex-col items-center justify-center h-[60vh]`,
      children: (0, w.jsx)(m, { className: `w-8 h-8 animate-spin text-brand` }),
    });
  let z = T.data;
  return (0, w.jsxs)(`div`, {
    className: `flex flex-col lg:flex-row h-full gap-8 pb-12 animate-in fade-in duration-500 max-w-6xl mx-auto w-full`,
    children: [
      (0, w.jsxs)(`div`, {
        className: `lg:w-64 shrink-0 flex flex-col gap-2`,
        children: [
          (0, w.jsx)(`h1`, {
            className: `text-3xl font-bold tracking-tight text-foreground mb-4 px-2`,
            children: `Settings`,
          }),
          (0, w.jsx)(`nav`, {
            className: `flex flex-col gap-1`,
            children: R.map((e) => {
              let t = e.icon,
                n = u === e.id;
              return (0, w.jsxs)(
                `button`,
                {
                  onClick: () => d(e.id),
                  className: `
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${n ? (e.danger ? `bg-destructive/10 text-destructive` : `bg-brand/10 text-brand`) : e.danger ? `text-destructive/70 hover:bg-destructive/10 hover:text-destructive` : `text-muted-foreground hover:bg-muted/50 hover:text-foreground`}
                `,
                  children: [(0, w.jsx)(t, { size: 18 }), e.label],
                },
                e.id,
              );
            }),
          }),
        ],
      }),
      (0, w.jsxs)(`div`, {
        className: `flex-1 bg-card border border-border/60 rounded-3xl p-6 lg:p-10 subtle-shadow min-h-[500px]`,
        children: [
          u === `account` &&
            (0, w.jsxs)(`div`, {
              className: `space-y-8 animate-in fade-in`,
              children: [
                (0, w.jsxs)(`div`, {
                  children: [
                    (0, w.jsx)(`h2`, {
                      className: `text-2xl font-bold text-foreground mb-1`,
                      children: `Account`,
                    }),
                    (0, w.jsx)(`p`, {
                      className: `text-muted-foreground text-sm`,
                      children: `Manage your personal profile details.`,
                    }),
                  ],
                }),
                (0, w.jsxs)(`div`, {
                  className: `flex items-center gap-6`,
                  children: [
                    (0, w.jsx)(`div`, {
                      className: `w-20 h-20 rounded-full bg-muted border border-border/50 flex items-center justify-center overflow-hidden shrink-0 shadow-sm`,
                      children: z?.avatar_url
                        ? (0, w.jsx)(`img`, {
                            src: z.avatar_url,
                            alt: `Avatar`,
                            className: `w-full h-full object-cover`,
                          })
                        : (0, w.jsx)(y, {
                            size: 32,
                            className: `text-muted-foreground`,
                          }),
                    }),
                    (0, w.jsxs)(`div`, {
                      className: `flex flex-col gap-1`,
                      children: [
                        (0, w.jsx)(`span`, {
                          className: `text-lg font-bold text-foreground`,
                          children: z?.full_name || `Anonymous User`,
                        }),
                        (0, w.jsxs)(`span`, {
                          className: `text-sm text-muted-foreground`,
                          children: [`User ID: `, z?.id],
                        }),
                        (0, w.jsx)(`div`, {
                          className: `flex items-center gap-2 mt-1`,
                          children: (0, w.jsxs)(`span`, {
                            className: `px-2.5 py-0.5 bg-muted rounded-md text-xs font-semibold capitalize border border-border/50`,
                            children: [
                              z?.account_type || `Creator`,
                              ` Account`,
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                (0, w.jsxs)(`div`, {
                  className: `border-t border-border/50 pt-8 flex items-center justify-between`,
                  children: [
                    (0, w.jsxs)(`div`, {
                      children: [
                        (0, w.jsx)(`h3`, {
                          className: `font-semibold text-foreground`,
                          children: `Creator Profile`,
                        }),
                        (0, w.jsx)(`p`, {
                          className: `text-sm text-muted-foreground max-w-md`,
                          children: `Update your niche, connected platforms, and bio used for brand matching.`,
                        }),
                      ],
                    }),
                    (0, w.jsx)(r, {
                      to: `/profile`,
                      className: `px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-colors shadow-sm`,
                      children: `Edit Profile`,
                    }),
                  ],
                }),
              ],
            }),
          u === `workspace` &&
            (0, w.jsxs)(`div`, {
              className: `space-y-8 animate-in fade-in`,
              children: [
                (0, w.jsxs)(`div`, {
                  children: [
                    (0, w.jsx)(`h2`, {
                      className: `text-2xl font-bold text-foreground mb-1`,
                      children: `Workspace`,
                    }),
                    (0, w.jsx)(`p`, {
                      className: `text-muted-foreground text-sm`,
                      children: `Manage shared configuration for your team or agency.`,
                    }),
                  ],
                }),
                (0, w.jsxs)(`div`, {
                  className: `space-y-5 max-w-lg`,
                  children: [
                    (0, w.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, w.jsx)(`label`, {
                          className: `text-sm font-semibold text-foreground`,
                          children: `Workspace Name`,
                        }),
                        (0, w.jsx)(`input`, {
                          type: `text`,
                          value: j,
                          onChange: (e) => M(e.target.value),
                          disabled: !A || N.isPending,
                          className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50`,
                          placeholder: `Enter workspace name`,
                        }),
                      ],
                    }),
                    (0, w.jsxs)(`div`, {
                      className: `grid grid-cols-2 gap-4`,
                      children: [
                        (0, w.jsxs)(`div`, {
                          className: `bg-muted/30 p-4 rounded-xl border border-border/50`,
                          children: [
                            (0, w.jsx)(`p`, {
                              className: `text-xs text-muted-foreground font-semibold uppercase mb-1`,
                              children: `Type`,
                            }),
                            (0, w.jsx)(`p`, {
                              className: `font-medium capitalize`,
                              children: k?.workspace_type || `Creator`,
                            }),
                          ],
                        }),
                        (0, w.jsxs)(`div`, {
                          className: `bg-muted/30 p-4 rounded-xl border border-border/50`,
                          children: [
                            (0, w.jsx)(`p`, {
                              className: `text-xs text-muted-foreground font-semibold uppercase mb-1`,
                              children: `Your Role`,
                            }),
                            (0, w.jsx)(`p`, {
                              className: `font-medium capitalize`,
                              children: O?.role || `Member`,
                            }),
                          ],
                        }),
                      ],
                    }),
                    A &&
                      (0, w.jsxs)(`button`, {
                        onClick: () => N.mutate(j),
                        disabled: N.isPending || j === k?.name,
                        className: `flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground font-semibold rounded-xl text-sm hover:bg-brand/90 transition-colors shadow-sm disabled:opacity-50`,
                        children: [
                          N.isPending
                            ? (0, w.jsx)(m, {
                                className: `w-4 h-4 animate-spin`,
                              })
                            : (0, w.jsx)(g, { className: `w-4 h-4` }),
                          `Save Workspace`,
                        ],
                      }),
                  ],
                }),
                z?.account_type === `agency` &&
                  (0, w.jsxs)(`div`, {
                    className: `border-t border-border/50 pt-8 flex items-center justify-between`,
                    children: [
                      (0, w.jsxs)(`div`, {
                        children: [
                          (0, w.jsx)(`h3`, {
                            className: `font-semibold text-foreground`,
                            children: `Team Management`,
                          }),
                          (0, w.jsx)(`p`, {
                            className: `text-sm text-muted-foreground max-w-md`,
                            children: `Invite members and manage permissions for your agency.`,
                          }),
                        ],
                      }),
                      (0, w.jsx)(`button`, {
                        disabled: !0,
                        className: `px-5 py-2.5 bg-muted text-muted-foreground font-semibold rounded-xl text-sm opacity-50 cursor-not-allowed`,
                        children: `Coming Soon`,
                      }),
                    ],
                  }),
              ],
            }),
          u === `security` &&
            (0, w.jsxs)(`div`, {
              className: `space-y-8 animate-in fade-in`,
              children: [
                (0, w.jsxs)(`div`, {
                  children: [
                    (0, w.jsx)(`h2`, {
                      className: `text-2xl font-bold text-foreground mb-1`,
                      children: `Security`,
                    }),
                    (0, w.jsx)(`p`, {
                      className: `text-muted-foreground text-sm`,
                      children: `Manage your password and session.`,
                    }),
                  ],
                }),
                (0, w.jsxs)(`div`, {
                  className: `max-w-md space-y-4`,
                  children: [
                    (0, w.jsx)(`h3`, {
                      className: `font-semibold text-foreground`,
                      children: `Change Password`,
                    }),
                    (0, w.jsx)(`div`, {
                      className: `space-y-2`,
                      children: (0, w.jsx)(`input`, {
                        type: `password`,
                        value: P,
                        onChange: (e) => F(e.target.value),
                        placeholder: `New password`,
                        className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50`,
                      }),
                    }),
                    (0, w.jsxs)(`button`, {
                      onClick: () => {
                        if (P.length < 6) {
                          s.error(`Password must be at least 6 characters`);
                          return;
                        }
                        I.mutate(P);
                      },
                      disabled: !P || I.isPending,
                      className: `flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-colors shadow-sm disabled:opacity-50`,
                      children: [
                        I.isPending
                          ? (0, w.jsx)(m, { className: `w-4 h-4 animate-spin` })
                          : (0, w.jsx)(x, { className: `w-4 h-4` }),
                        `Update Password`,
                      ],
                    }),
                  ],
                }),
                (0, w.jsxs)(`div`, {
                  className: `border-t border-border/50 pt-8`,
                  children: [
                    (0, w.jsx)(`h3`, {
                      className: `font-semibold text-foreground mb-4`,
                      children: `Active Session`,
                    }),
                    (0, w.jsxs)(`button`, {
                      onClick: L,
                      className: `flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground font-semibold rounded-xl text-sm hover:bg-muted/80 transition-colors border border-border/50 shadow-sm`,
                      children: [
                        (0, w.jsx)(h, { className: `w-4 h-4` }),
                        `Sign Out`,
                      ],
                    }),
                  ],
                }),
              ],
            }),
          u === `notifications` &&
            (0, w.jsxs)(`div`, {
              className: `space-y-8 animate-in fade-in`,
              children: [
                (0, w.jsxs)(`div`, {
                  children: [
                    (0, w.jsx)(`h2`, {
                      className: `text-2xl font-bold text-foreground mb-1`,
                      children: `Notifications`,
                    }),
                    (0, w.jsx)(`p`, {
                      className: `text-muted-foreground text-sm`,
                      children: `Control when and how you are contacted.`,
                    }),
                  ],
                }),
                (0, w.jsxs)(`div`, {
                  className: `space-y-6 max-w-lg`,
                  children: [
                    (0, w.jsxs)(`div`, {
                      className: `flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50`,
                      children: [
                        (0, w.jsxs)(`div`, {
                          children: [
                            (0, w.jsx)(`h4`, {
                              className: `font-semibold text-sm`,
                              children: `Recommendation Alerts`,
                            }),
                            (0, w.jsx)(`p`, {
                              className: `text-xs text-muted-foreground mt-0.5`,
                              children: `Get notified about strong new brand matches.`,
                            }),
                          ],
                        }),
                        (0, w.jsx)(`div`, {
                          className: `w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed`,
                          children: (0, w.jsx)(`div`, {
                            className: `w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm`,
                          }),
                        }),
                      ],
                    }),
                    (0, w.jsxs)(`div`, {
                      className: `flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50`,
                      children: [
                        (0, w.jsxs)(`div`, {
                          children: [
                            (0, w.jsx)(`h4`, {
                              className: `font-semibold text-sm`,
                              children: `Product Updates`,
                            }),
                            (0, w.jsx)(`p`, {
                              className: `text-xs text-muted-foreground mt-0.5`,
                              children: `Receive news about Branzly features.`,
                            }),
                          ],
                        }),
                        (0, w.jsx)(`div`, {
                          className: `w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed`,
                          children: (0, w.jsx)(`div`, {
                            className: `w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm`,
                          }),
                        }),
                      ],
                    }),
                    (0, w.jsx)(`p`, {
                      className: `text-xs text-muted-foreground`,
                      children: `Email notification preferences will be available in an upcoming release.`,
                    }),
                  ],
                }),
              ],
            }),
          u === `subscription` && (0, w.jsx)(E, { userId: e }),
          u === `about` &&
            (0, w.jsxs)(`div`, {
              className: `space-y-8 animate-in fade-in max-w-3xl`,
              children: [
                (0, w.jsxs)(`div`, {
                  children: [
                    (0, w.jsx)(`h2`, {
                      className: `text-2xl font-bold text-foreground mb-1`,
                      children: `About Branzly`,
                    }),
                    (0, w.jsx)(`p`, {
                      className: `text-muted-foreground text-sm`,
                      children: `Product information and legal details.`,
                    }),
                  ],
                }),
                (0, w.jsxs)(`div`, {
                  className: `grid grid-cols-1 md:grid-cols-2 gap-6`,
                  children: [
                    (0, w.jsxs)(`div`, {
                      className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
                      children: [
                        (0, w.jsxs)(`h3`, {
                          className: `font-semibold mb-4 text-brand flex items-center gap-2`,
                          children: [
                            (0, w.jsx)(v, { className: `w-4 h-4` }),
                            ` Branzly`,
                          ],
                        }),
                        (0, w.jsx)(`p`, {
                          className: `text-sm text-muted-foreground mb-4`,
                          children: `An AI-powered brand discovery and intelligence platform for creators and agencies.`,
                        }),
                        (0, w.jsxs)(`div`, {
                          className: `space-y-2 text-sm`,
                          children: [
                            (0, w.jsxs)(`div`, {
                              className: `flex justify-between`,
                              children: [
                                (0, w.jsx)(`span`, {
                                  className: `text-muted-foreground`,
                                  children: `Version`,
                                }),
                                (0, w.jsx)(`span`, {
                                  className: `font-medium`,
                                  children: `1.0.0 (Preview)`,
                                }),
                              ],
                            }),
                            (0, w.jsxs)(`div`, {
                              className: `flex justify-between`,
                              children: [
                                (0, w.jsx)(`span`, {
                                  className: `text-muted-foreground`,
                                  children: `Founded`,
                                }),
                                (0, w.jsx)(`span`, {
                                  className: `font-medium`,
                                  children: `September 16, 2026`,
                                }),
                              ],
                            }),
                            (0, w.jsxs)(`div`, {
                              className: `flex justify-between`,
                              children: [
                                (0, w.jsx)(`span`, {
                                  className: `text-muted-foreground`,
                                  children: `Country`,
                                }),
                                (0, w.jsx)(`span`, {
                                  className: `font-medium`,
                                  children: `India`,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, w.jsxs)(`div`, {
                      className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
                      children: [
                        (0, w.jsx)(`h3`, {
                          className: `font-semibold mb-4 text-foreground`,
                          children: `Organization`,
                        }),
                        (0, w.jsxs)(`div`, {
                          className: `space-y-2 text-sm`,
                          children: [
                            (0, w.jsxs)(`div`, {
                              className: `flex justify-between`,
                              children: [
                                (0, w.jsx)(`span`, {
                                  className: `text-muted-foreground`,
                                  children: `Founder & CEO`,
                                }),
                                (0, w.jsx)(`span`, {
                                  className: `font-medium`,
                                  children: `Moin M`,
                                }),
                              ],
                            }),
                            (0, w.jsxs)(`div`, {
                              className: `flex justify-between`,
                              children: [
                                (0, w.jsx)(`span`, {
                                  className: `text-muted-foreground`,
                                  children: `Parent Org`,
                                }),
                                (0, w.jsx)(`span`, {
                                  className: `font-medium`,
                                  children: `Mirza Group`,
                                }),
                              ],
                            }),
                            (0, w.jsxs)(`div`, {
                              className: `flex justify-between`,
                              children: [
                                (0, w.jsx)(`span`, {
                                  className: `text-muted-foreground`,
                                  children: `Operating Org`,
                                }),
                                (0, w.jsx)(`span`, {
                                  className: `font-medium`,
                                  children: `Glanzy Studio`,
                                }),
                              ],
                            }),
                            (0, w.jsxs)(`div`, {
                              className: `flex justify-between`,
                              children: [
                                (0, w.jsx)(`span`, {
                                  className: `text-muted-foreground`,
                                  children: `Website`,
                                }),
                                (0, w.jsx)(`a`, {
                                  href: `https://www.glanzystudio.dedyn.io`,
                                  target: `_blank`,
                                  className: `font-medium text-brand hover:underline`,
                                  children: `glanzystudio.dedyn.io`,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, w.jsxs)(`div`, {
                  className: `bg-muted/20 border border-border/50 rounded-2xl p-6 shadow-sm`,
                  children: [
                    (0, w.jsx)(`h3`, {
                      className: `font-semibold mb-3 text-foreground`,
                      children: `Moin M — Founder & CEO`,
                    }),
                    (0, w.jsx)(`p`, {
                      className: `text-sm text-muted-foreground leading-relaxed`,
                      children: `Moin M is the Founder and CEO of Branzly, the brand discovery and intelligence platform built to help creators, agencies, and modern marketing teams discover better opportunities and make more informed decisions. As the founder of Glanzy Studio and the creator behind Branzly, Moin M is focused on building practical technology for the creator economy.`,
                    }),
                  ],
                }),
                (0, w.jsxs)(`div`, {
                  className: `grid grid-cols-1 md:grid-cols-2 gap-6`,
                  children: [
                    (0, w.jsxs)(`div`, {
                      className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
                      children: [
                        (0, w.jsx)(`h3`, {
                          className: `font-semibold mb-4 text-foreground`,
                          children: `Legal & Security`,
                        }),
                        (0, w.jsxs)(`div`, {
                          className: `flex flex-col gap-3 text-sm`,
                          children: [
                            (0, w.jsx)(r, {
                              to: `/about`,
                              className: `text-brand hover:underline`,
                              children: `About Page`,
                            }),
                            (0, w.jsx)(r, {
                              to: `/policies`,
                              className: `text-brand hover:underline`,
                              children: `Privacy Policy`,
                            }),
                            (0, w.jsx)(r, {
                              to: `/terms`,
                              className: `text-brand hover:underline`,
                              children: `Terms of Service`,
                            }),
                            (0, w.jsx)(r, {
                              to: `/security`,
                              className: `text-brand hover:underline`,
                              children: `Security Architecture`,
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, w.jsxs)(`div`, {
                      className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
                      children: [
                        (0, w.jsx)(`h3`, {
                          className: `font-semibold mb-4 text-foreground`,
                          children: `Contact`,
                        }),
                        (0, w.jsxs)(`div`, {
                          className: `flex flex-col gap-3 text-sm`,
                          children: [
                            (0, w.jsxs)(`div`, {
                              children: [
                                (0, w.jsx)(`span`, {
                                  className: `block text-muted-foreground text-xs uppercase mb-1`,
                                  children: `Support & Privacy`,
                                }),
                                (0, w.jsx)(`a`, {
                                  href: `mailto:support@branzly.dedyn.io`,
                                  className: `text-foreground hover:text-brand font-medium`,
                                  children: `support@branzly.dedyn.io`,
                                }),
                              ],
                            }),
                            (0, w.jsxs)(`div`, {
                              children: [
                                (0, w.jsx)(`span`, {
                                  className: `block text-muted-foreground text-xs uppercase mb-1`,
                                  children: `Leads & Additional Support`,
                                }),
                                (0, w.jsx)(`a`, {
                                  href: `mailto:leads@branzly.dedyn.io`,
                                  className: `text-foreground hover:text-brand font-medium`,
                                  children: `leads@branzly.dedyn.io`,
                                }),
                              ],
                            }),
                            (0, w.jsxs)(`div`, {
                              children: [
                                (0, w.jsx)(`span`, {
                                  className: `block text-muted-foreground text-xs uppercase mb-1`,
                                  children: `Partnerships`,
                                }),
                                (0, w.jsx)(`a`, {
                                  href: `mailto:partners@branzly.dedyn.io`,
                                  className: `text-foreground hover:text-brand font-medium`,
                                  children: `partners@branzly.dedyn.io`,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, w.jsxs)(`p`, {
                  className: `text-xs text-muted-foreground text-center`,
                  children: [
                    `Branzly is a product and startup initiative operated through Glanzy Studio under the broader Mirza Group organization.`,
                    (0, w.jsx)(`br`, {}),
                    `© `,
                    new Date().getFullYear(),
                    ` Branzly. All rights reserved.`,
                  ],
                }),
              ],
            }),
          u === `danger` &&
            (0, w.jsxs)(`div`, {
              className: `space-y-8 animate-in fade-in`,
              children: [
                (0, w.jsxs)(`div`, {
                  children: [
                    (0, w.jsx)(`h2`, {
                      className: `text-2xl font-bold text-destructive mb-1`,
                      children: `Danger Zone`,
                    }),
                    (0, w.jsx)(`p`, {
                      className: `text-muted-foreground text-sm`,
                      children: `Irreversible and destructive actions.`,
                    }),
                  ],
                }),
                (0, w.jsxs)(`div`, {
                  className: `max-w-lg border border-destructive/20 bg-destructive/5 rounded-2xl p-6`,
                  children: [
                    (0, w.jsx)(`h3`, {
                      className: `font-bold text-foreground mb-2`,
                      children: `Delete Account`,
                    }),
                    (0, w.jsx)(`p`, {
                      className: `text-sm text-muted-foreground mb-6`,
                      children: `Permanently delete your account, workspace data, saved brands, and outreach history. This action cannot be undone.`,
                    }),
                    (0, w.jsx)(`button`, {
                      disabled: !0,
                      className: `px-5 py-2.5 bg-destructive/10 text-destructive font-semibold rounded-xl text-sm border border-destructive/20 opacity-50 cursor-not-allowed`,
                      children: `Account Deletion Unavailable`,
                    }),
                    (0, w.jsx)(`p`, {
                      className: `text-xs text-muted-foreground mt-3`,
                      children: `Complete deletion flows are currently disabled in this preview environment to prevent accidental data loss.`,
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
function E({ userId: e, workspaceId: t }) {
  let { currentPlan: n, planConfig: r, limits: i } = u(e),
    a = o();
  return (0, w.jsxs)(`div`, {
    className: `space-y-8 animate-in fade-in`,
    children: [
      (0, w.jsxs)(`div`, {
        children: [
          (0, w.jsx)(`h2`, {
            className: `text-2xl font-bold text-foreground mb-1`,
            children: `Subscription & Billing`,
          }),
          (0, w.jsx)(`p`, {
            className: `text-muted-foreground text-sm`,
            children: `Manage your plan, limits, and billing details.`,
          }),
        ],
      }),
      (0, w.jsxs)(`div`, {
        className: `max-w-md bg-gradient-to-br from-brand/5 to-muted/20 border border-brand/20 rounded-2xl p-6 shadow-sm`,
        children: [
          (0, w.jsxs)(`div`, {
            className: `flex items-center justify-between mb-6`,
            children: [
              (0, w.jsxs)(`div`, {
                children: [
                  (0, w.jsx)(`p`, {
                    className: `text-xs font-bold text-brand uppercase tracking-wider mb-1`,
                    children: `Current Plan`,
                  }),
                  (0, w.jsx)(`h3`, {
                    className: `text-2xl font-bold text-foreground`,
                    children: r.name,
                  }),
                ],
              }),
              (0, w.jsx)(`div`, {
                className: `w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center`,
                children: (0, w.jsx)(v, { className: `text-brand w-6 h-6` }),
              }),
            ],
          }),
          (0, w.jsxs)(`div`, {
            className: `space-y-4 mb-8`,
            children: [
              (0, w.jsx)(`div`, {
                className: `text-sm font-semibold mb-2`,
                children: `Usage Limits`,
              }),
              (0, w.jsxs)(`div`, {
                className: `flex justify-between text-sm`,
                children: [
                  (0, w.jsx)(`span`, {
                    className: `text-muted-foreground`,
                    children: `Searches / mo`,
                  }),
                  (0, w.jsxs)(`span`, {
                    className: `font-medium text-foreground`,
                    children: [i.searchesPerMonth, ` limit`],
                  }),
                ],
              }),
              (0, w.jsxs)(`div`, {
                className: `flex justify-between text-sm`,
                children: [
                  (0, w.jsx)(`span`, {
                    className: `text-muted-foreground`,
                    children: `Brand Views / mo`,
                  }),
                  (0, w.jsxs)(`span`, {
                    className: `font-medium text-foreground`,
                    children: [i.brandViewsPerMonth, ` limit`],
                  }),
                ],
              }),
              (0, w.jsxs)(`div`, {
                className: `flex justify-between text-sm`,
                children: [
                  (0, w.jsx)(`span`, {
                    className: `text-muted-foreground`,
                    children: `Saved Brands`,
                  }),
                  (0, w.jsxs)(`span`, {
                    className: `font-medium text-foreground`,
                    children: [i.savedBrandsTotal, ` limit`],
                  }),
                ],
              }),
              (0, w.jsxs)(`div`, {
                className: `flex justify-between text-sm`,
                children: [
                  (0, w.jsx)(`span`, {
                    className: `text-muted-foreground`,
                    children: `Team Members`,
                  }),
                  (0, w.jsxs)(`span`, {
                    className: `font-medium text-foreground`,
                    children: [i.teamMembers, ` limit`],
                  }),
                ],
              }),
            ],
          }),
          (0, w.jsx)(`button`, {
            onClick: () => a({ to: `/pricing` }),
            className: `w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm`,
            children: `View Plans & Upgrade`,
          }),
        ],
      }),
    ],
  });
}
function D() {
  let [e, t] = (0, C.useState)(null);
  return (
    (0, C.useEffect)(() => {
      l.auth.getSession().then(({ data: e }) => {
        e.session && t(e.session.user.id);
      });
    }, []),
    (0, w.jsx)(T, { userId: e })
  );
}
export { D as component };
