import { t as e } from "./jsx-runtime-Cltr0gcK.js";
import { t } from "./link-CKQMLqzL.js";
import { t as n } from "./useQuery-DDbtQ9mW.js";
import { t as r } from "./supabase-DTorYgRt.js";
import { t as i } from "./useMonetization-C0l42Clg.js";
import { t as a } from "./bookmark-BtRCrCO3.js";
import { t as o } from "./compass-BSwcFPjt.js";
import { t as s } from "./send-C1wOFq8M.js";
import { t as c } from "./sparkles-C-wfMPnb.js";
import { t as l } from "./trending-up-9fTZhAs5.js";
var u = e();
function d() {
  let { data: e } = n({
      queryKey: [`auth_session`],
      queryFn: async () => {
        let { data: e } = await r.auth.getSession();
        return e.session;
      },
    }),
    d = e?.user?.id || null,
    { data: f } = n({
      queryKey: [`profile`, d],
      enabled: !!d,
      queryFn: async () => {
        let { data: e } = await r
          .from(`profiles`)
          .select(`*`)
          .eq(`id`, d)
          .single();
        return e;
      },
    }),
    { workspaceId: p } = i(d),
    { data: m } = n({
      queryKey: [`workspace_details`, p],
      enabled: !!p,
      queryFn: async () => {
        let { data: e } = await r
          .from(`workspaces`)
          .select(`*`)
          .eq(`id`, p)
          .single();
        return e;
      },
    }),
    { data: h } = n({
      queryKey: [`dashboard-counts`, p],
      enabled: !!p,
      queryFn: async () => {
        let { count: e } = await r
            .from(`saved_brands`)
            .select(`*`, { count: `exact`, head: !0 })
            .eq(`workspace_id`, p),
          { count: t } = await r
            .from(`outreach`)
            .select(`*`, { count: `exact`, head: !0 })
            .eq(`workspace_id`, p);
        return { saved: e || 0, outreach: t || 0 };
      },
    });
  return (0, u.jsxs)(`div`, {
    className: `space-y-8 animate-in fade-in duration-500`,
    children: [
      (0, u.jsx)(`div`, {
        className: `flex flex-col md:flex-row justify-between items-start md:items-center gap-4`,
        children: (0, u.jsxs)(`div`, {
          children: [
            (0, u.jsxs)(`h1`, {
              className: `text-3xl font-bold tracking-tight text-foreground`,
              children: [
                `Welcome back, `,
                f?.full_name?.split(` `)[0] || `there`,
              ],
            }),
            (0, u.jsx)(`p`, {
              className: `text-muted-foreground mt-1`,
              children: m
                ? `Active Workspace: ${m.name}`
                : `Here's what's happening today.`,
            }),
          ],
        }),
      }),
      (0, u.jsxs)(`div`, {
        className: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4`,
        children: [
          (0, u.jsxs)(`div`, {
            className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
            children: [
              (0, u.jsxs)(`div`, {
                className: `flex items-center gap-3 mb-4`,
                children: [
                  (0, u.jsx)(`div`, {
                    className: `w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center`,
                    children: (0, u.jsx)(c, {
                      className: `w-5 h-5 text-brand`,
                    }),
                  }),
                  (0, u.jsx)(`h3`, {
                    className: `font-semibold text-foreground`,
                    children: `Discover`,
                  }),
                ],
              }),
              (0, u.jsx)(`div`, {
                className: `text-2xl font-bold mb-1`,
                children: `New`,
              }),
              (0, u.jsx)(`p`, {
                className: `text-sm text-muted-foreground`,
                children: `Opportunities waiting`,
              }),
            ],
          }),
          (0, u.jsxs)(`div`, {
            className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
            children: [
              (0, u.jsxs)(`div`, {
                className: `flex items-center gap-3 mb-4`,
                children: [
                  (0, u.jsx)(`div`, {
                    className: `w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center`,
                    children: (0, u.jsx)(a, {
                      className: `w-5 h-5 text-blue-500`,
                    }),
                  }),
                  (0, u.jsx)(`h3`, {
                    className: `font-semibold text-foreground`,
                    children: `Saved Brands`,
                  }),
                ],
              }),
              (0, u.jsx)(`div`, {
                className: `text-2xl font-bold mb-1`,
                children: h?.saved || 0,
              }),
              (0, u.jsx)(`p`, {
                className: `text-sm text-muted-foreground`,
                children: `In your pipeline`,
              }),
            ],
          }),
          (0, u.jsxs)(`div`, {
            className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
            children: [
              (0, u.jsxs)(`div`, {
                className: `flex items-center gap-3 mb-4`,
                children: [
                  (0, u.jsx)(`div`, {
                    className: `w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center`,
                    children: (0, u.jsx)(s, {
                      className: `w-5 h-5 text-green-500`,
                    }),
                  }),
                  (0, u.jsx)(`h3`, {
                    className: `font-semibold text-foreground`,
                    children: `Active Outreach`,
                  }),
                ],
              }),
              (0, u.jsx)(`div`, {
                className: `text-2xl font-bold mb-1`,
                children: h?.outreach || 0,
              }),
              (0, u.jsx)(`p`, {
                className: `text-sm text-muted-foreground`,
                children: `Ongoing conversations`,
              }),
            ],
          }),
          (0, u.jsxs)(`div`, {
            className: `bg-card border border-border/50 rounded-2xl p-6 shadow-sm`,
            children: [
              (0, u.jsxs)(`div`, {
                className: `flex items-center gap-3 mb-4`,
                children: [
                  (0, u.jsx)(`div`, {
                    className: `w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center`,
                    children: (0, u.jsx)(l, {
                      className: `w-5 h-5 text-purple-500`,
                    }),
                  }),
                  (0, u.jsx)(`h3`, {
                    className: `font-semibold text-foreground`,
                    children: `Profile`,
                  }),
                ],
              }),
              (0, u.jsx)(`div`, {
                className: `text-2xl font-bold mb-1`,
                children: f?.onboarding_completed ? `100%` : `50%`,
              }),
              (0, u.jsx)(`p`, {
                className: `text-sm text-muted-foreground`,
                children: `Completion`,
              }),
            ],
          }),
        ],
      }),
      (0, u.jsxs)(`div`, {
        className: `bg-card border border-border/50 rounded-2xl p-12 text-center shadow-sm`,
        children: [
          (0, u.jsx)(`div`, {
            className: `w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6`,
            children: (0, u.jsx)(o, { className: `w-8 h-8 text-brand` }),
          }),
          (0, u.jsx)(`h2`, {
            className: `text-2xl font-bold text-foreground mb-3`,
            children: `Your Branzly workspace is ready.`,
          }),
          (0, u.jsx)(`p`, {
            className: `text-muted-foreground mb-8 max-w-md mx-auto text-lg`,
            children: `Start discovering brands that match your niche, save them to your pipeline, and manage your outreach.`,
          }),
          (0, u.jsxs)(`div`, {
            className: `flex flex-col sm:flex-row items-center justify-center gap-4`,
            children: [
              (0, u.jsx)(t, {
                to: `/discover`,
                className: `w-full sm:w-auto bg-brand text-brand-foreground font-semibold rounded-xl px-8 py-3 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20`,
                children: `Discover Brands`,
              }),
              !f?.onboarding_completed &&
                (0, u.jsx)(t, {
                  to: `/onboarding`,
                  className: `w-full sm:w-auto bg-muted text-foreground font-semibold rounded-xl px-8 py-3 hover:bg-muted/80 transition-colors`,
                  children: `Complete Your Profile`,
                }),
            ],
          }),
        ],
      }),
    ],
  });
}
export { d as component };
