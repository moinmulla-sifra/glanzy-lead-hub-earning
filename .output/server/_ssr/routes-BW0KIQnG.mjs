import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Mail, L as Compass, U as ChartNoAxesColumnIncreasing, Y as ArrowRight } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BW0KIQnG.js
var import_jsx_runtime = require_jsx_runtime();
function LandingPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background selection:bg-brand/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "fixed top-0 left-0 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-between px-6 max-w-7xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white font-bold text-lg leading-none",
							children: "B"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-lg tracking-tight",
						children: "Branzly"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						search: { mode: "signin" },
						className: "text-sm font-semibold text-muted-foreground hover:text-foreground",
						children: "Sign In"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						search: { mode: "signup" },
						className: "text-sm font-semibold bg-foreground text-background px-4 py-2 rounded-lg hover:bg-foreground/90 transition-colors",
						children: "Get Started"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "pt-32 pb-24 px-6 max-w-7xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-sm font-semibold mb-6 border border-brand/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SparklesIcon, { className: "w-4 h-4" }), " Now in Public Beta"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-5xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 leading-tight",
							children: [
								"The CRM built for the",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-brand",
									children: "creator economy"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xl text-muted-foreground mb-10 leading-relaxed",
							children: "Discover perfectly matched brands, track your outreach pipeline, and close more sponsorships without the spreadsheet chaos."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col sm:flex-row items-center justify-center gap-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/auth",
								search: { mode: "signup" },
								className: "w-full sm:w-auto flex items-center justify-center gap-2 bg-brand text-brand-foreground font-semibold rounded-xl px-8 py-4 text-lg hover:bg-brand/90 transition-all shadow-lg shadow-brand/20",
								children: ["Start for free ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "w-5 h-5" })]
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border/50 rounded-3xl p-8 subtle-shadow text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, { className: "text-brand w-7 h-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold mb-3",
									children: "Smart Discovery"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Find brands actively looking for creators in your specific niche with our dynamic opportunity engine."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border/50 rounded-3xl p-8 subtle-shadow text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "text-brand w-7 h-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold mb-3",
									children: "Outreach Pipeline"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Track every conversation from initial pitch to signed contract in a beautiful Kanban board designed for deals."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border/50 rounded-3xl p-8 subtle-shadow text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumnIncreasing, { className: "text-brand w-7 h-7" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-bold mb-3",
									children: "Agency Ready"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Manage your entire roster's pipeline with team workspaces, shared contacts, and aggregated reporting."
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border/50 py-12 px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-6 h-6 rounded bg-foreground flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-background font-bold text-xs",
								children: "B"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-sm",
							children: ["Branzly © ", (/* @__PURE__ */ new Date()).getFullYear()]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-6 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-foreground",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-foreground",
								children: "Terms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-foreground",
								children: "Contact"
							})
						]
					})]
				})
			})
		]
	});
}
function SparklesIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		...props,
		xmlns: "http://www.w3.org/2000/svg",
		width: "24",
		height: "24",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" })
	});
}
//#endregion
export { LandingPage as component };
