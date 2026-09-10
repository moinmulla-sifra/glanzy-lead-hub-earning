import { t as e } from "./jsx-runtime-Cltr0gcK.js";
import { t } from "./link-CKQMLqzL.js";
var n = e();
function r({ children: e, title: r, lastUpdated: i }) {
  return (0, n.jsxs)(`div`, {
    className: `min-h-screen bg-background selection:bg-brand/20`,
    children: [
      (0, n.jsxs)(`header`, {
        className: `sticky top-0 left-0 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-between px-6`,
        children: [
          (0, n.jsxs)(t, {
            to: `/`,
            className: `flex items-center gap-2`,
            children: [
              (0, n.jsx)(`div`, {
                className: `w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-sm`,
                children: (0, n.jsx)(`span`, {
                  className: `text-white font-bold text-lg leading-none`,
                  children: `B`,
                }),
              }),
              (0, n.jsx)(`span`, {
                className: `font-bold text-lg tracking-tight`,
                children: `Branzly`,
              }),
            ],
          }),
          (0, n.jsxs)(`nav`, {
            className: `flex items-center gap-6`,
            children: [
              (0, n.jsx)(t, {
                to: `/about`,
                className: `text-sm font-semibold text-muted-foreground hover:text-foreground`,
                children: `About`,
              }),
              (0, n.jsx)(t, {
                to: `/auth`,
                search: { mode: `signin` },
                className: `text-sm font-semibold text-muted-foreground hover:text-foreground`,
                children: `Sign In`,
              }),
              (0, n.jsx)(t, {
                to: `/auth`,
                search: { mode: `signup` },
                className: `text-sm font-semibold bg-foreground text-background px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors`,
                children: `Get Started`,
              }),
            ],
          }),
        ],
      }),
      (0, n.jsxs)(`main`, {
        className: `max-w-3xl mx-auto px-6 py-12 md:py-20`,
        children: [
          (0, n.jsxs)(`div`, {
            className: `mb-12`,
            children: [
              (0, n.jsx)(`h1`, {
                className: `text-4xl font-bold tracking-tight text-foreground mb-4`,
                children: r,
              }),
              (0, n.jsxs)(`p`, {
                className: `text-sm text-muted-foreground`,
                children: [`Last Updated: `, i],
              }),
            ],
          }),
          (0, n.jsx)(`div`, {
            className: `prose prose-invert prose-brand max-w-none`,
            children: e,
          }),
        ],
      }),
      (0, n.jsx)(`footer`, {
        className: `border-t border-border/50 py-12 px-6`,
        children: (0, n.jsxs)(`div`, {
          className: `max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4`,
          children: [
            (0, n.jsxs)(`div`, {
              className: `flex items-center gap-2 opacity-50`,
              children: [
                (0, n.jsx)(`div`, {
                  className: `w-6 h-6 rounded bg-foreground flex items-center justify-center`,
                  children: (0, n.jsx)(`span`, {
                    className: `text-background font-bold text-xs`,
                    children: `B`,
                  }),
                }),
                (0, n.jsxs)(`span`, {
                  className: `font-bold text-sm`,
                  children: [`Branzly © `, new Date().getFullYear()],
                }),
              ],
            }),
            (0, n.jsxs)(`div`, {
              className: `flex items-center gap-6 text-sm text-muted-foreground`,
              children: [
                (0, n.jsx)(t, {
                  to: `/about`,
                  className: `hover:text-foreground`,
                  children: `About`,
                }),
                (0, n.jsx)(t, {
                  to: `/policies`,
                  className: `hover:text-foreground`,
                  children: `Policies`,
                }),
                (0, n.jsx)(t, {
                  to: `/terms`,
                  className: `hover:text-foreground`,
                  children: `Terms`,
                }),
                (0, n.jsx)(t, {
                  to: `/security`,
                  className: `hover:text-foreground`,
                  children: `Security`,
                }),
                (0, n.jsx)(`a`, {
                  href: `mailto:support@branzly.dedyn.io`,
                  className: `hover:text-foreground`,
                  children: `Support`,
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
export { r as t };
