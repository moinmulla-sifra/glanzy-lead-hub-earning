import { i as e, n as t, t as n } from "./jsx-runtime-Cltr0gcK.js";
import { t as r } from "./useQuery-DDbtQ9mW.js";
import { t as i } from "./useMutation-CYY_aFUu.js";
import { r as a, x as o } from "./index-Difz8PWa.js";
import { t as s } from "./supabase-DTorYgRt.js";
import { t as c } from "./loader-circle-LmZjNfAe.js";
import { t as l } from "./save-DWdmpGqL.js";
import { t as u } from "./user-dmWph8jC.js";
var d = e(t(), 1),
  f = n();
function p({ userId: e }) {
  let t = o(),
    [n, p] = (0, d.useState)({}),
    m = r({
      queryKey: [`profile`, e],
      enabled: !!e,
      queryFn: async () => {
        let { data: t, error: n } = await s
          .from(`profiles`)
          .select(`*`)
          .eq(`id`, e)
          .single();
        if (n) throw n;
        return t;
      },
    });
  (0, d.useEffect)(() => {
    m.data &&
      p({ ...m.data, niche: m.data.niche || m.data.primary_niche || `` });
  }, [m.data]);
  let h = i({
      mutationFn: async (t) => {
        let n = t.niche || t.primary_niche || null,
          r = {
            id: e,
            full_name: t.full_name ?? null,
            country: t.country ?? null,
            bio: t.bio ?? null,
            niche: n,
            primary_niche: n,
            updated_at: new Date().toISOString(),
          };
        v && t.agency_name !== void 0 && (r.agency_name = t.agency_name);
        let { error: i } = await s.from(`profiles`).upsert(r);
        if (i) throw i;
        if (v && t.agency_name) {
          let { data: n } = await s
            .from(`workspace_members`)
            .select(`workspace_id`)
            .eq(`user_id`, e)
            .eq(`role`, `owner`)
            .maybeSingle();
          n?.workspace_id &&
            (await s
              .from(`workspaces`)
              .update({
                name: t.agency_name,
                updated_at: new Date().toISOString(),
              })
              .eq(`id`, n.workspace_id));
        }
      },
      onSuccess: () => {
        (a.success(`Profile updated successfully`),
          t.invalidateQueries({ queryKey: [`profile`] }),
          t.invalidateQueries({ queryKey: [`workspace_member_settings`] }),
          t.invalidateQueries({ queryKey: [`workspace_member`] }));
      },
      onError: (e) => a.error(e.message || `Failed to update profile`),
    }),
    g = (t) => {
      (t.preventDefault(), e && h.mutate(n));
    },
    _ = (e) => {
      let { name: t, value: n } = e.target;
      p((e) => ({ ...e, [t]: n }));
    };
  if (!e || m.isLoading)
    return (0, f.jsx)(`div`, {
      className: `flex flex-col items-center justify-center h-[60vh]`,
      children: (0, f.jsx)(c, { className: `w-8 h-8 animate-spin text-brand` }),
    });
  let v = m.data?.account_type === `agency`;
  return (0, f.jsxs)(`div`, {
    className: `flex flex-col h-full gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 max-w-4xl mx-auto w-full`,
    children: [
      (0, f.jsxs)(`div`, {
        className: `flex flex-col gap-2`,
        children: [
          (0, f.jsxs)(`h1`, {
            className: `text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3`,
            children: [
              (0, f.jsx)(u, { className: `text-brand`, size: 32 }),
              ` Profile`,
            ],
          }),
          (0, f.jsx)(`p`, {
            className: `text-muted-foreground text-lg`,
            children: `Manage your public identity and brand matching preferences.`,
          }),
        ],
      }),
      (0, f.jsxs)(`form`, {
        onSubmit: g,
        className: `bg-card border border-border/60 rounded-3xl p-6 lg:p-10 subtle-shadow space-y-8`,
        children: [
          (0, f.jsxs)(`div`, {
            className: `space-y-4`,
            children: [
              (0, f.jsx)(`h2`, {
                className: `text-xl font-bold text-foreground mb-4`,
                children: `Basic Information`,
              }),
              (0, f.jsxs)(`div`, {
                className: `grid grid-cols-1 md:grid-cols-2 gap-6`,
                children: [
                  (0, f.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, f.jsx)(`label`, {
                        className: `text-sm font-semibold text-foreground`,
                        children: `Full Name`,
                      }),
                      (0, f.jsx)(`input`, {
                        type: `text`,
                        name: `full_name`,
                        value: n.full_name || ``,
                        onChange: _,
                        className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50`,
                      }),
                    ],
                  }),
                  v &&
                    (0, f.jsxs)(`div`, {
                      className: `space-y-2`,
                      children: [
                        (0, f.jsx)(`label`, {
                          className: `text-sm font-semibold text-foreground`,
                          children: `Agency Name`,
                        }),
                        (0, f.jsx)(`input`, {
                          type: `text`,
                          name: `agency_name`,
                          value: n.agency_name || ``,
                          onChange: _,
                          className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50`,
                        }),
                      ],
                    }),
                  (0, f.jsxs)(`div`, {
                    className: `space-y-2`,
                    children: [
                      (0, f.jsx)(`label`, {
                        className: `text-sm font-semibold text-foreground`,
                        children: `Country`,
                      }),
                      (0, f.jsx)(`input`, {
                        type: `text`,
                        name: `country`,
                        value: n.country || ``,
                        onChange: _,
                        placeholder: `e.g. United States`,
                        className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50`,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, f.jsx)(`hr`, { className: `border-border/50` }),
          (0, f.jsxs)(`div`, {
            className: `space-y-4`,
            children: [
              (0, f.jsx)(`h2`, {
                className: `text-xl font-bold text-foreground mb-4`,
                children: `Brand Matching`,
              }),
              (0, f.jsx)(`p`, {
                className: `text-sm text-muted-foreground mb-4`,
                children: `This information helps us recommend the best brand opportunities in the For You section.`,
              }),
              (0, f.jsxs)(`div`, {
                className: `space-y-2 max-w-lg`,
                children: [
                  (0, f.jsx)(`label`, {
                    className: `text-sm font-semibold text-foreground`,
                    children: `Primary Niche / Category`,
                  }),
                  (0, f.jsx)(`input`, {
                    type: `text`,
                    name: `niche`,
                    value: n.niche || ``,
                    onChange: _,
                    placeholder: `e.g. Tech, Beauty, Gaming, Lifestyle`,
                    className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50`,
                  }),
                ],
              }),
              (0, f.jsxs)(`div`, {
                className: `space-y-2 max-w-2xl`,
                children: [
                  (0, f.jsx)(`label`, {
                    className: `text-sm font-semibold text-foreground`,
                    children: `Bio / Description`,
                  }),
                  (0, f.jsx)(`textarea`, {
                    name: `bio`,
                    value: n.bio || ``,
                    onChange: _,
                    rows: 4,
                    placeholder: `Tell brands a little about your content and audience...`,
                    className: `w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none`,
                  }),
                ],
              }),
            ],
          }),
          (0, f.jsx)(`div`, {
            className: `pt-4 flex justify-end`,
            children: (0, f.jsxs)(`button`, {
              type: `submit`,
              disabled: h.isPending,
              className: `flex items-center gap-2 px-6 py-3 bg-brand text-brand-foreground font-semibold rounded-xl text-sm hover:bg-brand/90 transition-all shadow-sm shadow-brand/20 disabled:opacity-50`,
              children: [
                h.isPending
                  ? (0, f.jsx)(c, { className: `w-4 h-4 animate-spin` })
                  : (0, f.jsx)(l, { className: `w-4 h-4` }),
                `Save Profile`,
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
function m() {
  let [e, t] = (0, d.useState)(null);
  return (
    (0, d.useEffect)(() => {
      s.auth.getSession().then(({ data: e }) => {
        e.session && t(e.session.user.id);
      });
    }, []),
    (0, f.jsx)(p, { userId: e })
  );
}
export { m as component };
