import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { C as Compass, c as Settings, g as Menu, k as Bookmark, l as Send, n as User, o as Sparkles, t as X, v as LogOut } from "./_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./_ssr/ThemeToggle-tU4ZwfEw.mjs";
import { f as Outlet, g as Link, l as useLocation, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard-7RdH8pJk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_dashboard.tsx?tsr-split=component";
function DashboardLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [userEmail, setUserEmail] = (0, import_react.useState)(null);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		supabase.auth.getSession().then(({ data }) => {
			if (!active) return;
			if (!data.session) {
				navigate({
					to: "/auth",
					replace: true
				});
				return;
			}
			setUserEmail(data.session.user.email ?? null);
			setReady(true);
		});
		const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
			if (!active) return;
			if (event === "SIGNED_OUT" || !session) {
				setReady(false);
				navigate({
					to: "/auth",
					replace: true
				});
			} else if (event === "SIGNED_IN" && session) {
				setUserEmail(session.user.email ?? null);
				setReady(true);
			}
		});
		return () => {
			active = false;
			authListener.subscription.unsubscribe();
		};
	}, [navigate]);
	async function signOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
	}
	if (!ready) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" }, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 58,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm font-medium text-muted-foreground animate-pulse",
				children: "Loading Branzly..."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 59,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 57,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 56,
		columnNumber: 12
	}, this);
	const navItems = [
		{
			id: "discover",
			label: "Discover",
			icon: Compass,
			to: "/discover"
		},
		{
			id: "saved",
			label: "Saved",
			icon: Bookmark,
			to: "/saved"
		},
		{
			id: "outreach",
			label: "Outreach",
			icon: Send,
			to: "/outreach"
		},
		{
			id: "recommendations",
			label: "For You",
			icon: Sparkles,
			to: "/recommendations"
		}
	];
	const bottomNavItems = [{
		id: "profile",
		label: "Profile",
		icon: User,
		to: "/profile"
	}, {
		id: "settings",
		label: "Settings",
		icon: Settings,
		to: "/settings"
	}];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex h-screen bg-background overflow-hidden selection:bg-brand/20",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/50 bg-background/80 backdrop-blur-xl z-50 flex items-center justify-between px-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/20",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-white font-bold text-lg leading-none",
							children: "B"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 101,
							columnNumber: 14
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 100,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-bold text-lg tracking-tight",
						children: "Branzly"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 103,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 99,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
					className: "p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors",
					children: isMobileMenuOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 24 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 31
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { size: 24 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 106,
						columnNumber: 49
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 105,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 98,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("aside", {
				className: `
        fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border/50 flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `,
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-6 hidden lg:flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "w-8 h-8 rounded-lg bg-brand flex items-center justify-center shadow-lg shadow-brand/20",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-brand-foreground font-bold text-lg leading-none",
								children: "B"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 118,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 117,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-bold text-xl tracking-tight",
							children: "Branzly"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 120,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex-1 overflow-y-auto py-6 lg:py-2 px-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Menu"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 125,
								columnNumber: 13
							}, this), navItems.map((item) => {
								const Icon = item.icon;
								const isActive = location.pathname.startsWith(item.to);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: item.to,
									onClick: () => setIsMobileMenuOpen(false),
									className: `
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive ? "bg-brand/10 text-brand shadow-sm" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}
                  `,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
										size: 18,
										className: isActive ? "text-brand" : "opacity-70"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 133,
										columnNumber: 19
									}, this), item.label]
								}, item.id, true, {
									fileName: _jsxFileName,
									lineNumber: 129,
									columnNumber: 20
								}, this);
							})]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 124,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
							className: "space-y-1 mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Account"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 140,
								columnNumber: 13
							}, this), bottomNavItems.map((item) => {
								const Icon = item.icon;
								const isActive = location.pathname.startsWith(item.to);
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
									to: item.to,
									onClick: () => setIsMobileMenuOpen(false),
									className: `
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive ? "bg-brand/10 text-brand shadow-sm" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}
                  `,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, {
										size: 18,
										className: isActive ? "text-brand" : "opacity-70"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 148,
										columnNumber: 19
									}, this), item.label]
								}, item.id, true, {
									fileName: _jsxFileName,
									lineNumber: 144,
									columnNumber: 20
								}, this);
							})]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 139,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 123,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 border-t border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 px-3 py-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, {
									size: 14,
									className: "text-muted-foreground"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 158,
									columnNumber: 15
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 157,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium truncate",
									children: userEmail?.split("@")[0]
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 161,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground truncate",
									children: userEmail
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 162,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 160,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 156,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeToggle, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 166,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: signOut,
								className: "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { size: 16 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 168,
									columnNumber: 15
								}, this), "Sign Out"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 167,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 165,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 155,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 111,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1 flex flex-col h-[100dvh] pt-16 lg:pt-0 overflow-hidden relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/5 via-background to-background pointer-events-none" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 177,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 overflow-y-auto p-4 lg:p-8 relative z-10",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "max-w-6xl mx-auto h-full",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 180,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 179,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 178,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 176,
				columnNumber: 7
			}, this),
			isMobileMenuOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden",
				onClick: () => setIsMobileMenuOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 186,
				columnNumber: 28
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 95,
		columnNumber: 10
	}, this);
}
//#endregion
export { DashboardLayout as component };
