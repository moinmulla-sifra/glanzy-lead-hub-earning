import { n as __toESM } from "./_runtime.mjs";
import { n as applyTheme, r as getStoredTheme } from "./_ssr/theme-C5Ip8IN_.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { f as Outlet, g as Link, l as useLocation, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { C as Monitor, D as LogOut, L as Compass, S as Moon, T as Menu, U as ChartNoAxesColumnIncreasing, f as Sparkles, g as Send, h as Settings, i as User, n as X, q as Bookmark, r as Users, u as Sun } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard-BPiU274B.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/ThemeToggle.tsx";
function ThemeToggle() {
	const [theme, setTheme] = (0, import_react.useState)("system");
	(0, import_react.useEffect)(() => {
		setTheme(getStoredTheme());
		const handleThemeChange = (e) => {
			setTheme(e.detail);
		};
		window.addEventListener("theme-change", handleThemeChange);
		return () => window.removeEventListener("theme-change", handleThemeChange);
	}, []);
	function toggle() {
		applyTheme(theme === "dark" ? "light" : theme === "light" ? "system" : "dark");
	}
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		className: "p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center justify-center",
		onClick: toggle,
		"aria-label": `Current theme: ${theme}. Click to change.`,
		title: `Current theme: ${theme}. Click to change.`,
		children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { size: 18 }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 37,
			columnNumber: 9
		}, this) : theme === "light" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { size: 18 }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 39,
			columnNumber: 9
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Monitor, { size: 18 }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 41,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 30,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_dashboard.tsx?tsr-split=component";
function DashboardLayout() {
	const navigate = useNavigate();
	const location = useLocation();
	const queryClient = useQueryClient();
	const [ready, setReady] = (0, import_react.useState)(false);
	const [userId, setUserId] = (0, import_react.useState)(null);
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
			setUserId(data.session.user.id);
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
				setUserId(session.user.id);
				setUserEmail(session.user.email ?? null);
				setReady(true);
			}
		});
		return () => {
			active = false;
			authListener.subscription.unsubscribe();
		};
	}, [navigate]);
	const profileQuery = useQuery({
		queryKey: ["profile", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
			if (error) throw error;
			return data;
		}
	});
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
				lineNumber: 73,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm font-medium text-muted-foreground animate-pulse",
				children: "Loading Branzly..."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 74,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 72,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 71,
		columnNumber: 12
	}, this);
	const isAgency = profileQuery.data?.account_type === "agency";
	const navItems = [
		{
			id: "dashboard",
			label: "Dashboard",
			icon: ChartNoAxesColumnIncreasing,
			to: "/dashboard"
		},
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
			id: "for-you",
			label: "For You",
			icon: Sparkles,
			to: "/for-you"
		}
	];
	const bottomNavItems = [
		{
			id: "profile",
			label: "Profile",
			icon: User,
			to: "/profile"
		},
		...isAgency ? [{
			id: "team",
			label: "Team",
			icon: Users,
			to: "/team"
		}] : [],
		{
			id: "settings",
			label: "Settings",
			icon: Settings,
			to: "/settings"
		}
	];
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
							lineNumber: 128,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 127,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-bold text-lg tracking-tight",
						children: "Branzly"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 130,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 126,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
					className: "p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors",
					children: isMobileMenuOpen ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { size: 24 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 31
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu, { size: 24 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 133,
						columnNumber: 49
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 132,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 125,
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
								lineNumber: 145,
								columnNumber: 13
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 144,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-bold text-xl tracking-tight",
							children: "Branzly"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 149,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 143,
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
								lineNumber: 154,
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
										lineNumber: 164,
										columnNumber: 19
									}, this), item.label]
								}, item.id, true, {
									fileName: _jsxFileName,
									lineNumber: 160,
									columnNumber: 20
								}, this);
							})]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 153,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
							className: "space-y-1 mt-8",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
								children: "Account"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 171,
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
										lineNumber: 181,
										columnNumber: 19
									}, this), item.label]
								}, item.id, true, {
									fileName: _jsxFileName,
									lineNumber: 177,
									columnNumber: 20
								}, this);
							})]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 170,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 152,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "p-4 border-t border-border/50",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-3 px-3 py-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0",
								children: profileQuery.data?.avatar_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
									src: profileQuery.data.avatar_url,
									alt: "User",
									className: "w-full h-full object-cover"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 191,
									columnNumber: 48
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, {
									size: 14,
									className: "text-muted-foreground"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 191,
									columnNumber: 143
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 190,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex-1 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-medium truncate",
									children: profileQuery.data?.full_name || userEmail?.split("@")[0]
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 194,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground truncate",
									children: userEmail
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 197,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 193,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 189,
							columnNumber: 11
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ThemeToggle, {}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 203,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								onClick: signOut,
								className: "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LogOut, { size: 16 }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 205,
									columnNumber: 15
								}, this), "Sign Out"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 204,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 202,
							columnNumber: 11
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 188,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 138,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
				className: "flex-1 flex flex-col h-[100dvh] pt-16 lg:pt-0 overflow-hidden relative",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/5 via-background to-background pointer-events-none" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 214,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 overflow-y-auto p-4 lg:p-8 relative z-10",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "max-w-6xl mx-auto h-full",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 218,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 217,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 216,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 213,
				columnNumber: 7
			}, this),
			isMobileMenuOpen && /* @__PURE__ */ (void 0)("div", {
				className: "fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden",
				onClick: () => setIsMobileMenuOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 224,
				columnNumber: 28
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 123,
		columnNumber: 10
	}, this);
}
//#endregion
export { DashboardLayout as component };
