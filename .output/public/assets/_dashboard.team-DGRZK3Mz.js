import { i as e, n as t, t as n } from "./jsx-runtime-Cltr0gcK.js";
import { t as r } from "./useQuery-DDbtQ9mW.js";
import { t as i } from "./useMutation-CYY_aFUu.js";
import { r as a, x as o } from "./index-Difz8PWa.js";
import { t as s } from "./supabase-DTorYgRt.js";
import { t as c } from "./createLucideIcon-CEGepnBf.js";
import { t as l } from "./loader-circle-LmZjNfAe.js";
import { t as u } from "./shield-O49Fg52t.js";
import { t as d } from "./users-ByQQ79Dh.js";
var f = c(`user-minus`, [
    [`path`, { d: `M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`, key: `1yyitq` }],
    [`circle`, { cx: `9`, cy: `7`, r: `4`, key: `nufk8` }],
    [`line`, { x1: `22`, x2: `16`, y1: `11`, y2: `11`, key: `1shjgl` }],
  ]),
  p = c(`user-plus`, [
    [`path`, { d: `M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2`, key: `1yyitq` }],
    [`circle`, { cx: `9`, cy: `7`, r: `4`, key: `nufk8` }],
    [`line`, { x1: `19`, x2: `19`, y1: `8`, y2: `14`, key: `1bvyxn` }],
    [`line`, { x1: `22`, x2: `16`, y1: `11`, y2: `11`, key: `1shjgl` }],
  ]),
  m = e(t(), 1),
  h = n();
function g({ userId: e }) {
  o();
  let [t, n] = (0, m.useState)(``),
    c = r({
      queryKey: [`workspace_member_team`, e],
      enabled: !!e,
      queryFn: async () => {
        let { data: t, error: n } = await s
          .from(`workspace_members`)
          .select(`workspace_id, role, workspaces(name, type, workspace_type)`)
          .eq(`user_id`, e)
          .single();
        if (n) throw n;
        return t;
      },
    }),
    g = c.data?.workspace_id,
    _ = c.data?.role === `owner`,
    v = Array.isArray(c.data?.workspaces)
      ? c.data?.workspaces[0]
      : c.data?.workspaces,
    y = v?.workspace_type === `agency` || v?.type === `agency`,
    b = r({
      queryKey: [`team_members`, g],
      enabled: !!g,
      queryFn: async () => {
        let { data: e, error: t } = await s
          .from(`workspace_members`)
          .select(`*, profiles(full_name, avatar_url, account_type)`)
          .eq(`workspace_id`, g);
        if (t) throw t;
        return e;
      },
    }),
    x = i({
      mutationFn: async (e) => {
        throw (
          await new Promise((e) => setTimeout(e, 1e3)),
          Error(`Email invitations are disabled in this preview environment.`)
        );
      },
      onSuccess: () => {
        (a.success(`Invitation sent successfully`), n(``));
      },
      onError: (e) => a.error(e.message || `Failed to send invitation`),
    });
  return !e || c.isLoading
    ? (0, h.jsx)(`div`, {
        className: `flex flex-col items-center justify-center h-[60vh]`,
        children: (0, h.jsx)(l, {
          className: `w-8 h-8 animate-spin text-brand`,
        }),
      })
    : y
      ? (0, h.jsxs)(`div`, {
          className: `flex flex-col h-full gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 max-w-5xl mx-auto w-full`,
          children: [
            (0, h.jsx)(`div`, {
              className: `flex flex-col sm:flex-row sm:items-center justify-between gap-4`,
              children: (0, h.jsxs)(`div`, {
                className: `flex flex-col gap-2`,
                children: [
                  (0, h.jsxs)(`h1`, {
                    className: `text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3`,
                    children: [
                      (0, h.jsx)(d, { className: `text-brand`, size: 32 }),
                      ` Team Members`,
                    ],
                  }),
                  (0, h.jsxs)(`p`, {
                    className: `text-muted-foreground text-lg`,
                    children: [
                      `Manage access to your agency workspace (`,
                      (Array.isArray(c.data?.workspaces)
                        ? c.data?.workspaces[0]
                        : c.data?.workspaces
                      )?.name,
                      `).`,
                    ],
                  }),
                ],
              }),
            }),
            (0, h.jsxs)(`div`, {
              className: `grid grid-cols-1 lg:grid-cols-3 gap-8`,
              children: [
                (0, h.jsx)(`div`, {
                  className: `lg:col-span-2 space-y-4`,
                  children: (0, h.jsxs)(`div`, {
                    className: `bg-card border border-border/60 rounded-3xl p-6 subtle-shadow`,
                    children: [
                      (0, h.jsx)(`h2`, {
                        className: `font-bold text-lg mb-6`,
                        children: `Active Members`,
                      }),
                      b.isLoading
                        ? (0, h.jsx)(`div`, {
                            className: `flex justify-center p-8`,
                            children: (0, h.jsx)(l, {
                              className: `w-6 h-6 animate-spin text-brand`,
                            }),
                          })
                        : (0, h.jsx)(`div`, {
                            className: `space-y-4`,
                            children: b.data?.map((t) =>
                              (0, h.jsxs)(
                                `div`,
                                {
                                  className: `flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50`,
                                  children: [
                                    (0, h.jsxs)(`div`, {
                                      className: `flex items-center gap-4`,
                                      children: [
                                        (0, h.jsx)(`div`, {
                                          className: `w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden`,
                                          children: t.profiles?.avatar_url
                                            ? (0, h.jsx)(`img`, {
                                                src: t.profiles.avatar_url,
                                                alt: `Avatar`,
                                                className: `w-full h-full object-cover`,
                                              })
                                            : (0, h.jsx)(`span`, {
                                                className: `font-bold text-sm`,
                                                children:
                                                  t.profiles?.full_name?.charAt(
                                                    0,
                                                  ) || `U`,
                                              }),
                                        }),
                                        (0, h.jsxs)(`div`, {
                                          children: [
                                            (0, h.jsx)(`p`, {
                                              className: `font-semibold text-foreground text-sm`,
                                              children:
                                                t.profiles?.full_name ||
                                                `Unknown User`,
                                            }),
                                            (0, h.jsx)(`p`, {
                                              className: `text-xs text-muted-foreground capitalize`,
                                              children: t.role,
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                                    _ &&
                                      t.user_id !== e &&
                                      (0, h.jsx)(`button`, {
                                        className: `p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors`,
                                        title: `Remove Member`,
                                        children: (0, h.jsx)(f, { size: 18 }),
                                      }),
                                  ],
                                },
                                t.id,
                              ),
                            ),
                          }),
                    ],
                  }),
                }),
                (0, h.jsx)(`div`, {
                  className: `space-y-4`,
                  children: (0, h.jsxs)(`div`, {
                    className: `bg-card border border-border/60 rounded-3xl p-6 subtle-shadow`,
                    children: [
                      (0, h.jsx)(`h2`, {
                        className: `font-bold text-lg mb-2`,
                        children: `Invite New Member`,
                      }),
                      (0, h.jsx)(`p`, {
                        className: `text-sm text-muted-foreground mb-6`,
                        children: `Send an email invitation to join this workspace.`,
                      }),
                      (0, h.jsxs)(`form`, {
                        onSubmit: (e) => {
                          (e.preventDefault(), t && x.mutate(t));
                        },
                        className: `space-y-4`,
                        children: [
                          (0, h.jsxs)(`div`, {
                            className: `space-y-2`,
                            children: [
                              (0, h.jsx)(`label`, {
                                className: `text-xs font-semibold text-foreground uppercase tracking-wider`,
                                children: `Email Address`,
                              }),
                              (0, h.jsx)(`input`, {
                                type: `email`,
                                required: !0,
                                value: t,
                                onChange: (e) => n(e.target.value),
                                placeholder: `colleague@agency.com`,
                                className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50`,
                                disabled: !_,
                              }),
                            ],
                          }),
                          (0, h.jsxs)(`button`, {
                            type: `submit`,
                            disabled: !_ || x.isPending || !t,
                            className: `w-full flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-all shadow-sm disabled:opacity-50`,
                            children: [
                              x.isPending
                                ? (0, h.jsx)(l, {
                                    className: `w-4 h-4 animate-spin`,
                                  })
                                : (0, h.jsx)(p, { className: `w-4 h-4` }),
                              `Send Invitation`,
                            ],
                          }),
                          !_ &&
                            (0, h.jsxs)(`p`, {
                              className: `text-xs text-center text-muted-foreground flex items-center justify-center gap-1 mt-2`,
                              children: [
                                (0, h.jsx)(u, { size: 12 }),
                                ` Only workspace owners can invite members.`,
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          ],
        })
      : (0, h.jsxs)(`div`, {
          className: `flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto`,
          children: [
            (0, h.jsx)(`div`, {
              className: `w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6`,
              children: (0, h.jsx)(d, {
                className: `w-8 h-8 text-muted-foreground`,
              }),
            }),
            (0, h.jsx)(`h2`, {
              className: `text-2xl font-bold text-foreground mb-2`,
              children: `Team Management`,
            }),
            (0, h.jsx)(`p`, {
              className: `text-muted-foreground`,
              children: `Team management is only available for Agency accounts. You are currently on a Creator account.`,
            }),
          ],
        });
}
function _() {
  let [e, t] = (0, m.useState)(null);
  return (
    (0, m.useEffect)(() => {
      s.auth.getSession().then(({ data: e }) => {
        e.session && t(e.session.user.id);
      });
    }, []),
    (0, h.jsx)(g, { userId: e })
  );
}
export { _ as component };
