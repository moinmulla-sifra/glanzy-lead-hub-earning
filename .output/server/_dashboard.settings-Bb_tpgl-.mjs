import { n as __toESM } from "./_runtime.mjs";
import { n as applyTheme, r as getStoredTheme } from "./_ssr/theme-C5Ip8IN_.mjs";
import { t as supabase } from "./_ssr/supabase-CzmrzPTc.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { C as Monitor, D as LogOut, I as CreditCard, K as Building2, M as Key, O as LoaderCircle, S as Moon, Y as Bell, f as Sparkles, i as User, m as Shield, s as TriangleAlert, u as Sun, v as Save, x as Paintbrush } from "./_libs/lucide-react.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-Dm9pnDla.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.settings-Bb_tpgl-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/SettingsView.tsx";
function SettingsView({ userId }) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [theme, setTheme] = (0, import_react.useState)("system");
	const [activeTab, setActiveTab] = (0, import_react.useState)("account");
	(0, import_react.useEffect)(() => {
		setTheme(getStoredTheme());
		const handleThemeChange = (e) => {
			setTheme(e.detail);
		};
		window.addEventListener("theme-change", handleThemeChange);
		return () => window.removeEventListener("theme-change", handleThemeChange);
	}, []);
	const profileQuery = useQuery({
		queryKey: ["profile", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
			if (error) throw error;
			return data;
		}
	});
	const workspaceMemberQuery = useQuery({
		queryKey: ["workspace_member_settings", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("workspace_members").select("*, workspaces(*)").eq("user_id", userId).single();
			if (error) throw error;
			return {
				member: data,
				workspace: data.workspaces
			};
		}
	});
	const memberInfo = workspaceMemberQuery.data?.member;
	const workspaceInfo = workspaceMemberQuery.data?.workspace;
	const isWorkspaceAdmin = memberInfo?.role === "owner" || memberInfo?.role === "admin";
	const [workspaceName, setWorkspaceName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (workspaceInfo?.name) setWorkspaceName(workspaceInfo.name);
	}, [workspaceInfo?.name]);
	const updateWorkspaceMutation = useMutation({
		mutationFn: async (newName) => {
			if (!workspaceInfo?.id) throw new Error("Workspace not found");
			const { error } = await supabase.from("workspaces").update({
				name: newName,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", workspaceInfo.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Workspace settings saved");
			queryClient.invalidateQueries({ queryKey: ["workspace_member_settings"] });
		},
		onError: (err) => toast.error(err.message || "Failed to update workspace")
	});
	const [password, setPassword] = (0, import_react.useState)("");
	const updatePasswordMutation = useMutation({
		mutationFn: async (newPassword) => {
			const { error } = await supabase.auth.updateUser({ password: newPassword });
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Password updated successfully");
			setPassword("");
		},
		onError: (err) => toast.error(err.message || "Failed to update password")
	});
	async function handleSignOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	const handleThemeChange = (newTheme) => {
		applyTheme(newTheme);
	};
	const tabs = [
		{
			id: "account",
			label: "Account",
			icon: User
		},
		{
			id: "workspace",
			label: "Workspace",
			icon: Building2
		},
		{
			id: "appearance",
			label: "Appearance",
			icon: Paintbrush
		},
		{
			id: "security",
			label: "Security",
			icon: Shield
		},
		{
			id: "notifications",
			label: "Notifications",
			icon: Bell
		},
		{
			id: "subscription",
			label: "Subscription",
			icon: CreditCard
		},
		{
			id: "danger",
			label: "Danger Zone",
			icon: TriangleAlert,
			danger: true
		}
	];
	if (!userId || profileQuery.isLoading || workspaceMemberQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col items-center justify-center h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 152,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 151,
		columnNumber: 7
	}, this);
	const profile = profileQuery.data;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col lg:flex-row h-full gap-8 pb-12 animate-in fade-in duration-500 max-w-6xl mx-auto w-full",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "lg:w-64 shrink-0 flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
				className: "text-3xl font-bold tracking-tight text-foreground mb-4 px-2",
				children: "Settings"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 163,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("nav", {
				className: "flex flex-col gap-1",
				children: tabs.map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${isActive ? tab.danger ? "bg-destructive/10 text-destructive" : "bg-brand/10 text-brand" : tab.danger ? "text-destructive/70 hover:bg-destructive/10 hover:text-destructive" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}
                `,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { size: 18 }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 188,
							columnNumber: 17
						}, this), tab.label]
					}, tab.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 172,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 167,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 162,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 bg-card border border-border/60 rounded-3xl p-6 lg:p-10 subtle-shadow min-h-[500px]",
			children: [
				activeTab === "account" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-2xl font-bold text-foreground mb-1",
							children: "Account"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 202,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage your personal profile details."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 205,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 201,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "flex items-center gap-6",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "w-20 h-20 rounded-full bg-muted border border-border/50 flex items-center justify-center overflow-hidden shrink-0 shadow-sm",
								children: profile?.avatar_url ? /* @__PURE__ */ (void 0)("img", {
									src: profile.avatar_url,
									alt: "Avatar",
									className: "w-full h-full object-cover"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 213,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (void 0)(User, {
									size: 32,
									className: "text-muted-foreground"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 219,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 211,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col gap-1",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-lg font-bold text-foreground",
										children: profile?.full_name || "Anonymous User"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 223,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "text-sm text-muted-foreground",
										children: ["User ID: ", profile?.id]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 226,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2 mt-1",
										children: /* @__PURE__ */ (void 0)("span", {
											className: "px-2.5 py-0.5 bg-muted rounded-md text-xs font-semibold capitalize border border-border/50",
											children: [profile?.account_type || "Creator", " Account"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 230,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 229,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 222,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 210,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "border-t border-border/50 pt-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-semibold text-foreground",
								children: "Creator Profile"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 239,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground max-w-md",
								children: "Update your niche, connected platforms, and bio used for brand matching."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 242,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 238,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(Link, {
								to: "/profile",
								className: "px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-colors shadow-sm",
								children: "Edit Profile"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 247,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 237,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 200,
					columnNumber: 11
				}, this),
				activeTab === "workspace" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-2xl font-bold text-foreground mb-1",
							children: "Workspace"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 261,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage shared configuration for your team or agency."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 264,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 260,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "space-y-5 max-w-lg",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-sm font-semibold text-foreground",
										children: "Workspace Name"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 271,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("input", {
										type: "text",
										value: workspaceName,
										onChange: (e) => setWorkspaceName(e.target.value),
										disabled: !isWorkspaceAdmin || updateWorkspaceMutation.isPending,
										className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50",
										placeholder: "Enter workspace name"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 274,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 270,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "bg-muted/30 p-4 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground font-semibold uppercase mb-1",
											children: "Type"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 288,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "font-medium capitalize",
											children: workspaceInfo?.workspace_type || "Creator"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 291,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 287,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "bg-muted/30 p-4 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground font-semibold uppercase mb-1",
											children: "Your Role"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 296,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "font-medium capitalize",
											children: memberInfo?.role || "Member"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 299,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 295,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 286,
									columnNumber: 15
								}, this),
								isWorkspaceAdmin && /* @__PURE__ */ (void 0)("button", {
									onClick: () => updateWorkspaceMutation.mutate(workspaceName),
									disabled: updateWorkspaceMutation.isPending || workspaceName === workspaceInfo?.name,
									className: "flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground font-semibold rounded-xl text-sm hover:bg-brand/90 transition-colors shadow-sm disabled:opacity-50",
									children: [updateWorkspaceMutation.isPending ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 315,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (void 0)(Save, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 317,
										columnNumber: 21
									}, this), "Save Workspace"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 306,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 269,
							columnNumber: 13
						}, this),
						profile?.account_type === "agency" && /* @__PURE__ */ (void 0)("div", {
							className: "border-t border-border/50 pt-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-semibold text-foreground",
								children: "Team Management"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 327,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground max-w-md",
								children: "Invite members and manage permissions for your agency."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 330,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 326,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("button", {
								disabled: true,
								className: "px-5 py-2.5 bg-muted text-muted-foreground font-semibold rounded-xl text-sm opacity-50 cursor-not-allowed",
								children: "Coming Soon"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 334,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 325,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 259,
					columnNumber: 11
				}, this),
				activeTab === "appearance" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
						className: "text-2xl font-bold text-foreground mb-1",
						children: "Appearance"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 349,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-muted-foreground text-sm",
						children: "Customize how Branzly looks on your device."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 352,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 348,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl",
						children: [
							/* @__PURE__ */ (void 0)("button", {
								onClick: () => handleThemeChange("light"),
								className: `p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${theme === "light" ? "border-brand bg-brand/5" : "border-border/50 bg-muted/20 hover:bg-muted/50"}`,
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "w-12 h-12 rounded-full bg-background border border-border shadow-sm flex items-center justify-center",
									children: /* @__PURE__ */ (void 0)(Sun, { className: "text-amber-500" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 363,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 362,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-sm",
									children: "Light"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 365,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 358,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								onClick: () => handleThemeChange("dark"),
								className: `p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${theme === "dark" ? "border-brand bg-brand/5" : "border-border/50 bg-muted/20 hover:bg-muted/50"}`,
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "w-12 h-12 rounded-full bg-slate-950 border border-slate-800 shadow-sm flex items-center justify-center",
									children: /* @__PURE__ */ (void 0)(Moon, { className: "text-blue-400" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 373,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 372,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-sm",
									children: "Dark"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 375,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 368,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								onClick: () => handleThemeChange("system"),
								className: `p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${theme === "system" ? "border-brand bg-brand/5" : "border-border/50 bg-muted/20 hover:bg-muted/50"}`,
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "w-12 h-12 rounded-full bg-gradient-to-br from-background to-muted border border-border shadow-sm flex items-center justify-center",
									children: /* @__PURE__ */ (void 0)(Monitor, { className: "text-foreground/70" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 383,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 382,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("span", {
									className: "font-semibold text-sm",
									children: "System"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 385,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 378,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 357,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 347,
					columnNumber: 11
				}, this),
				activeTab === "security" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [
						/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
							className: "text-2xl font-bold text-foreground mb-1",
							children: "Security"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 395,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage your password and session."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 398,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 394,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "max-w-md space-y-4",
							children: [
								/* @__PURE__ */ (void 0)("h3", {
									className: "font-semibold text-foreground",
									children: "Change Password"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 404,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "space-y-2",
									children: /* @__PURE__ */ (void 0)("input", {
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "New password",
										className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 406,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 405,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									onClick: () => {
										if (password.length < 6) {
											toast.error("Password must be at least 6 characters");
											return;
										}
										updatePasswordMutation.mutate(password);
									},
									disabled: !password || updatePasswordMutation.isPending,
									className: "flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-colors shadow-sm disabled:opacity-50",
									children: [updatePasswordMutation.isPending ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 426,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (void 0)(Key, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 428,
										columnNumber: 19
									}, this), "Update Password"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 414,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 403,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "border-t border-border/50 pt-8",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-semibold text-foreground mb-4",
								children: "Active Session"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 435,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: handleSignOut,
								className: "flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground font-semibold rounded-xl text-sm hover:bg-muted/80 transition-colors border border-border/50 shadow-sm",
								children: [/* @__PURE__ */ (void 0)(LogOut, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 442,
									columnNumber: 17
								}, this), "Sign Out"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 438,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 434,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 393,
					columnNumber: 11
				}, this),
				activeTab === "notifications" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
						className: "text-2xl font-bold text-foreground mb-1",
						children: "Notifications"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 453,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-muted-foreground text-sm",
						children: "Control when and how you are contacted."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 456,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 452,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "space-y-6 max-w-lg",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
									className: "font-semibold text-sm",
									children: "Recommendation Alerts"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 464,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Get notified about strong new brand matches."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 467,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 463,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed",
									children: /* @__PURE__ */ (void 0)("div", { className: "w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 472,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 471,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 462,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
									className: "font-semibold text-sm",
									children: "Product Updates"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 478,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Receive news about Branzly features."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 479,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 477,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed",
									children: /* @__PURE__ */ (void 0)("div", { className: "w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 484,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 483,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 476,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: "Email notification preferences will be available in an upcoming release."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 488,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 461,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 451,
					columnNumber: 11
				}, this),
				activeTab === "subscription" && /* @__PURE__ */ (void 0)(SubscriptionSettings, { userId }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 498,
					columnNumber: 11
				}, this),
				activeTab === "danger" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
						className: "text-2xl font-bold text-destructive mb-1",
						children: "Danger Zone"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 505,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-muted-foreground text-sm",
						children: "Irreversible and destructive actions."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 508,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 504,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "max-w-lg border border-destructive/20 bg-destructive/5 rounded-2xl p-6",
						children: [
							/* @__PURE__ */ (void 0)("h3", {
								className: "font-bold text-foreground mb-2",
								children: "Delete Account"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 514,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground mb-6",
								children: "Permanently delete your account, workspace data, saved brands, and outreach history. This action cannot be undone."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 515,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								disabled: true,
								className: "px-5 py-2.5 bg-destructive/10 text-destructive font-semibold rounded-xl text-sm border border-destructive/20 opacity-50 cursor-not-allowed",
								children: "Account Deletion Unavailable"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 520,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground mt-3",
								children: "Complete deletion flows are currently disabled in this preview environment to prevent accidental data loss."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 526,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 513,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 503,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 197,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 160,
		columnNumber: 5
	}, this);
}
function SubscriptionSettings({ userId, workspaceId }) {
	const { currentPlan, planConfig, limits } = useMonetization(userId);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8 animate-in fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "text-2xl font-bold text-foreground mb-1",
			children: "Subscription & Billing"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 551,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-muted-foreground text-sm",
			children: "Manage your plan, limits, and billing details."
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 554,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 550,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md bg-gradient-to-br from-brand/5 to-muted/20 border border-brand/20 rounded-2xl p-6 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs font-bold text-brand uppercase tracking-wider mb-1",
						children: "Current Plan"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 562,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-2xl font-bold text-foreground",
						children: planConfig.name
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 565,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 561,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "text-brand w-6 h-6" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 570,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 569,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 560,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-4 mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "text-sm font-semibold mb-2",
							children: "Usage Limits"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 575,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Searches / mo"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 577,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.searchesPerMonth, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 578,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 576,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Brand Views / mo"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 583,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.brandViewsPerMonth, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 584,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 582,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Saved Brands"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 589,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.savedBrandsTotal, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 590,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 588,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Team Members"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 595,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.teamMembers, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 596,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 594,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 574,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => navigate({ to: "/pricing" }),
					className: "w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
					children: "View Plans & Upgrade"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 602,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 559,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 549,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_dashboard.settings.tsx?tsr-split=component";
function SettingsPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SettingsView, { userId }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 10
	}, this);
}
//#endregion
export { SettingsPage as component };
