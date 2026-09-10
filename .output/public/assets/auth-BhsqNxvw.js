import { i as e, n as t, t as n } from "./jsx-runtime-Cltr0gcK.js";
import { S as r, n as i, r as a } from "./index-Difz8PWa.js";
import { t as o } from "./supabase-DTorYgRt.js";
import { t as s } from "./compass-BSwcFPjt.js";
import { t as c } from "./loader-circle-LmZjNfAe.js";
import { t as l } from "./mail-DUe2Erw0.js";
var u = e(t()),
  d = n();
function f() {
  let e = r(),
    t = i.useSearch(),
    [n, f] = (0, u.useState)(t.mode || `signin`),
    [p, m] = (0, u.useState)(!1),
    [h, g] = (0, u.useState)(!1),
    [_, v] = (0, u.useState)(``),
    [y, b] = (0, u.useState)(``),
    [x, S] = (0, u.useState)(``),
    [C, w] = (0, u.useState)(`creator`);
  (0, u.useEffect)(() => {
    (o.auth.onAuthStateChange((e, t) => {
      e === `PASSWORD_RECOVERY` && f(`reset`);
    }),
      o.auth.getSession().then(({ data: e }) => {
        e.session && n !== `reset` ? T(e.session.user.id) : g(!0);
      }));
  }, [n]);
  let T = async (t) => {
    try {
      let { data: n, error: r } = await o
        .from(`profiles`)
        .select(`account_type, onboarding_completed`)
        .eq(`id`, t)
        .single();
      r && r.code === `PGRST116`
        ? e({ to: `/onboarding`, replace: !0 })
        : n && n.onboarding_completed
          ? e({ to: `/dashboard`, replace: !0 })
          : e({ to: `/onboarding`, replace: !0 });
    } catch (t) {
      (console.error(t), e({ to: `/onboarding`, replace: !0 }));
    } finally {
      g(!0);
    }
  };
  return h
    ? (0, d.jsxs)(`div`, {
        className: `min-h-screen flex flex-col md:flex-row bg-background`,
        children: [
          (0, d.jsxs)(`div`, {
            className: `hidden md:flex flex-col md:w-1/2 lg:w-[55%] bg-muted/30 p-12 relative overflow-hidden border-r border-border/50`,
            children: [
              (0, d.jsx)(`div`, {
                className: `absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-brand/10 via-background to-background pointer-events-none`,
              }),
              (0, d.jsxs)(`div`, {
                className: `relative z-10 flex items-center gap-3 mb-16`,
                children: [
                  (0, d.jsx)(`div`, {
                    className: `w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand/20`,
                    children: (0, d.jsx)(`span`, {
                      className: `text-white font-bold text-xl leading-none`,
                      children: `B`,
                    }),
                  }),
                  (0, d.jsx)(`span`, {
                    className: `font-bold text-2xl tracking-tight text-foreground`,
                    children: `Branzly`,
                  }),
                ],
              }),
              (0, d.jsxs)(`div`, {
                className: `relative z-10 flex-1 flex flex-col justify-center max-w-lg`,
                children: [
                  (0, d.jsx)(`h1`, {
                    className: `text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight tracking-tight`,
                    children: `Discover better brands. Reach out. Close deals.`,
                  }),
                  (0, d.jsx)(`p`, {
                    className: `text-lg text-muted-foreground mb-12`,
                    children: `The complete creator economy CRM. Find the right opportunities, manage your pipeline, and build stronger brand partnerships.`,
                  }),
                  (0, d.jsxs)(`div`, {
                    className: `space-y-6`,
                    children: [
                      (0, d.jsxs)(`div`, {
                        className: `flex items-center gap-4`,
                        children: [
                          (0, d.jsx)(`div`, {
                            className: `w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0`,
                            children: (0, d.jsx)(s, {
                              className: `text-brand w-6 h-6`,
                            }),
                          }),
                          (0, d.jsxs)(`div`, {
                            children: [
                              (0, d.jsx)(`h3`, {
                                className: `font-semibold text-foreground`,
                                children: `Smart Discovery`,
                              }),
                              (0, d.jsx)(`p`, {
                                className: `text-sm text-muted-foreground`,
                                children: `Find brands that match your niche and audience.`,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, d.jsxs)(`div`, {
                        className: `flex items-center gap-4`,
                        children: [
                          (0, d.jsx)(`div`, {
                            className: `w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center shrink-0`,
                            children: (0, d.jsx)(l, {
                              className: `text-brand w-6 h-6`,
                            }),
                          }),
                          (0, d.jsxs)(`div`, {
                            children: [
                              (0, d.jsx)(`h3`, {
                                className: `font-semibold text-foreground`,
                                children: `Outreach CRM`,
                              }),
                              (0, d.jsx)(`p`, {
                                className: `text-sm text-muted-foreground`,
                                children: `Track conversations from saved to won.`,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, d.jsx)(`div`, {
            className: `flex-1 flex items-center justify-center p-6 sm:p-12 relative`,
            children: (0, d.jsxs)(`div`, {
              className: `w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700`,
              children: [
                (0, d.jsxs)(`div`, {
                  className: `md:hidden flex items-center gap-3 mb-10 justify-center`,
                  children: [
                    (0, d.jsx)(`div`, {
                      className: `w-10 h-10 rounded-xl bg-brand flex items-center justify-center shadow-lg shadow-brand/20`,
                      children: (0, d.jsx)(`span`, {
                        className: `text-white font-bold text-xl leading-none`,
                        children: `B`,
                      }),
                    }),
                    (0, d.jsx)(`span`, {
                      className: `font-bold text-2xl tracking-tight text-foreground`,
                      children: `Branzly`,
                    }),
                  ],
                }),
                (0, d.jsxs)(`div`, {
                  className: `space-y-6`,
                  children: [
                    (0, d.jsxs)(`div`, {
                      className: `text-center mb-8`,
                      children: [
                        (0, d.jsx)(`h2`, {
                          className: `text-3xl font-bold text-foreground mb-2 tracking-tight`,
                          children:
                            n === `signin`
                              ? `Welcome back`
                              : n === `signup`
                                ? `Create an account`
                                : n === `forgot`
                                  ? `Reset password`
                                  : `Set new password`,
                        }),
                        (0, d.jsx)(`p`, {
                          className: `text-muted-foreground`,
                          children:
                            n === `signin`
                              ? `Sign in to your account to continue`
                              : n === `signup`
                                ? `Join Branzly to manage your brand deals`
                                : n === `forgot`
                                  ? `Enter your email to receive a reset link`
                                  : `Enter your new password below`,
                        }),
                      ],
                    }),
                    (0, d.jsxs)(`form`, {
                      onSubmit: async (t) => {
                        (t.preventDefault(), m(!0));
                        try {
                          if (n === `signup`) {
                            if (y.length < 6)
                              throw Error(
                                `Password must be at least 6 characters.`,
                              );
                            if (!x) throw Error(`Please enter your name.`);
                            let { data: t, error: n } = await o.auth.signUp({
                              email: _,
                              password: y,
                              options: {
                                data: { full_name: x, account_type: C },
                              },
                            });
                            if (n) throw n;
                            t.user &&
                              (t.user.identities?.length === 0
                                ? a.error(
                                    `User already exists or email is taken.`,
                                  )
                                : t.session
                                  ? (a.success(`Account created!`),
                                    e({ to: `/onboarding`, replace: !0 }))
                                  : (a.success(
                                      `Please check your email to verify your account.`,
                                    ),
                                    f(`signin`)));
                          } else if (n === `signin`) {
                            let { data: e, error: t } =
                              await o.auth.signInWithPassword({
                                email: _,
                                password: y,
                              });
                            if (t) throw t;
                            e.session &&
                              (a.success(`Welcome back!`), T(e.user.id));
                          } else if (n === `forgot`) {
                            let { error: e } =
                              await o.auth.resetPasswordForEmail(_, {
                                redirectTo: `${window.location.origin}/auth`,
                              });
                            if (e) throw e;
                            (a.success(
                              `Password reset email sent! Check your inbox.`,
                            ),
                              f(`signin`));
                          } else if (n === `reset`) {
                            if (y.length < 6)
                              throw Error(
                                `Password must be at least 6 characters.`,
                              );
                            let { error: e } = await o.auth.updateUser({
                              password: y,
                            });
                            if (e) throw e;
                            (a.success(`Password updated successfully!`),
                              f(`signin`));
                          }
                        } catch (e) {
                          a.error(e.message || `Authentication failed`);
                        } finally {
                          m(!1);
                        }
                      },
                      className: `space-y-4`,
                      children: [
                        n === `signup` &&
                          (0, d.jsxs)(d.Fragment, {
                            children: [
                              (0, d.jsxs)(`div`, {
                                className: `grid grid-cols-2 gap-3 mb-4`,
                                children: [
                                  (0, d.jsx)(`button`, {
                                    type: `button`,
                                    onClick: () => w(`creator`),
                                    className: `py-3 px-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${C === `creator` ? `bg-brand/10 border-brand/50 text-brand` : `bg-background border-border text-muted-foreground hover:bg-muted/50`}`,
                                    children: (0, d.jsx)(`span`, {
                                      className: `font-semibold text-sm`,
                                      children: `Creator`,
                                    }),
                                  }),
                                  (0, d.jsx)(`button`, {
                                    type: `button`,
                                    onClick: () => w(`agency`),
                                    className: `py-3 px-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${C === `agency` ? `bg-brand/10 border-brand/50 text-brand` : `bg-background border-border text-muted-foreground hover:bg-muted/50`}`,
                                    children: (0, d.jsx)(`span`, {
                                      className: `font-semibold text-sm`,
                                      children: `Agency`,
                                    }),
                                  }),
                                ],
                              }),
                              (0, d.jsxs)(`div`, {
                                className: `space-y-2`,
                                children: [
                                  (0, d.jsx)(`label`, {
                                    className: `text-sm font-semibold text-foreground`,
                                    children: `Full Name`,
                                  }),
                                  (0, d.jsx)(`input`, {
                                    type: `text`,
                                    required: !0,
                                    value: x,
                                    onChange: (e) => S(e.target.value),
                                    placeholder: `John Doe`,
                                    className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow`,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        n !== `reset` &&
                          (0, d.jsxs)(`div`, {
                            className: `space-y-2`,
                            children: [
                              (0, d.jsx)(`label`, {
                                className: `text-sm font-semibold text-foreground`,
                                children: `Email`,
                              }),
                              (0, d.jsx)(`input`, {
                                type: `email`,
                                required: !0,
                                value: _,
                                onChange: (e) => v(e.target.value),
                                placeholder: `name@example.com`,
                                className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow`,
                              }),
                            ],
                          }),
                        (n === `signin` || n === `signup` || n === `reset`) &&
                          (0, d.jsxs)(`div`, {
                            className: `space-y-2`,
                            children: [
                              (0, d.jsxs)(`div`, {
                                className: `flex justify-between items-center`,
                                children: [
                                  (0, d.jsx)(`label`, {
                                    className: `text-sm font-semibold text-foreground`,
                                    children:
                                      n === `reset`
                                        ? `New Password`
                                        : `Password`,
                                  }),
                                  n === `signin` &&
                                    (0, d.jsx)(`button`, {
                                      type: `button`,
                                      onClick: () => f(`forgot`),
                                      className: `text-xs font-semibold text-brand hover:underline`,
                                      children: `Forgot password?`,
                                    }),
                                ],
                              }),
                              (0, d.jsx)(`input`, {
                                type: `password`,
                                required: !0,
                                value: y,
                                onChange: (e) => b(e.target.value),
                                placeholder: `••••••••`,
                                className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 transition-shadow`,
                              }),
                            ],
                          }),
                        (0, d.jsx)(`button`, {
                          type: `submit`,
                          disabled: p,
                          className: `w-full flex items-center justify-center gap-2 bg-foreground text-background font-semibold rounded-xl px-4 py-3.5 hover:bg-foreground/90 transition-all shadow-lg shadow-foreground/10 disabled:opacity-50 disabled:cursor-not-allowed mt-4`,
                          children: p
                            ? (0, d.jsx)(c, {
                                className: `w-5 h-5 animate-spin`,
                              })
                            : n === `signin`
                              ? `Sign In`
                              : n === `signup`
                                ? `Create Account`
                                : n === `forgot`
                                  ? `Send Reset Link`
                                  : `Update Password`,
                        }),
                      ],
                    }),
                    (0, d.jsx)(`div`, {
                      className: `text-center mt-6`,
                      children:
                        n === `signin`
                          ? (0, d.jsxs)(`p`, {
                              className: `text-sm text-muted-foreground`,
                              children: [
                                `Don't have an account?`,
                                ` `,
                                (0, d.jsx)(`button`, {
                                  onClick: () => f(`signup`),
                                  className: `font-semibold text-foreground hover:underline`,
                                  children: `Sign up`,
                                }),
                              ],
                            })
                          : n === `signup` || n === `forgot`
                            ? (0, d.jsxs)(`p`, {
                                className: `text-sm text-muted-foreground`,
                                children: [
                                  `Already have an account?`,
                                  ` `,
                                  (0, d.jsx)(`button`, {
                                    onClick: () => f(`signin`),
                                    className: `font-semibold text-foreground hover:underline`,
                                    children: `Sign in`,
                                  }),
                                ],
                              })
                            : null,
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      })
    : (0, d.jsx)(`div`, {
        className: `min-h-screen flex items-center justify-center bg-background`,
        children: (0, d.jsx)(c, {
          className: `w-8 h-8 animate-spin text-brand`,
        }),
      });
}
export { f as component };
