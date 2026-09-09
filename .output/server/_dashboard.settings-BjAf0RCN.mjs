import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-CzmrzPTc.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { K as CreditCard, L as Key, M as LogOut, N as LoaderCircle, _ as Shield, a as User, at as Bell, h as Sparkles, l as TriangleAlert, nt as Building2, x as Save } from "./_libs/lucide-react.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-Dm9pnDla.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.settings-BjAf0RCN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/SettingsView.tsx";
function SettingsView({ userId }) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = (0, import_react.useState)("account");
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
			lineNumber: 130,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 129,
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
				lineNumber: 141,
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
							lineNumber: 166,
							columnNumber: 17
						}, this), tab.label]
					}, tab.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 150,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 145,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 140,
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
							lineNumber: 180,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage your personal profile details."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 183,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 179,
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
									lineNumber: 191,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (void 0)(User, {
									size: 32,
									className: "text-muted-foreground"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 197,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 189,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col gap-1",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-lg font-bold text-foreground",
										children: profile?.full_name || "Anonymous User"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 201,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "text-sm text-muted-foreground",
										children: ["User ID: ", profile?.id]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 204,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2 mt-1",
										children: /* @__PURE__ */ (void 0)("span", {
											className: "px-2.5 py-0.5 bg-muted rounded-md text-xs font-semibold capitalize border border-border/50",
											children: [profile?.account_type || "Creator", " Account"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 208,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 207,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 200,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 188,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "border-t border-border/50 pt-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-semibold text-foreground",
								children: "Creator Profile"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 217,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground max-w-md",
								children: "Update your niche, connected platforms, and bio used for brand matching."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 220,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 216,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(Link, {
								to: "/profile",
								className: "px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-colors shadow-sm",
								children: "Edit Profile"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 225,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 215,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 178,
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
							lineNumber: 239,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage shared configuration for your team or agency."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 242,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 238,
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
										lineNumber: 249,
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
										lineNumber: 252,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 248,
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
											lineNumber: 266,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "font-medium capitalize",
											children: workspaceInfo?.workspace_type || "Creator"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 269,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 265,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "bg-muted/30 p-4 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground font-semibold uppercase mb-1",
											children: "Your Role"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 274,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "font-medium capitalize",
											children: memberInfo?.role || "Member"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 277,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 273,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 264,
									columnNumber: 15
								}, this),
								isWorkspaceAdmin && /* @__PURE__ */ (void 0)("button", {
									onClick: () => updateWorkspaceMutation.mutate(workspaceName),
									disabled: updateWorkspaceMutation.isPending || workspaceName === workspaceInfo?.name,
									className: "flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground font-semibold rounded-xl text-sm hover:bg-brand/90 transition-colors shadow-sm disabled:opacity-50",
									children: [updateWorkspaceMutation.isPending ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 293,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (void 0)(Save, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 295,
										columnNumber: 21
									}, this), "Save Workspace"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 284,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 247,
							columnNumber: 13
						}, this),
						profile?.account_type === "agency" && /* @__PURE__ */ (void 0)("div", {
							className: "border-t border-border/50 pt-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-semibold text-foreground",
								children: "Team Management"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 305,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground max-w-md",
								children: "Invite members and manage permissions for your agency."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 308,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 304,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("button", {
								disabled: true,
								className: "px-5 py-2.5 bg-muted text-muted-foreground font-semibold rounded-xl text-sm opacity-50 cursor-not-allowed",
								children: "Coming Soon"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 312,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 303,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 237,
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
							lineNumber: 327,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage your password and session."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 330,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 326,
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
									lineNumber: 336,
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
										lineNumber: 338,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 337,
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
										lineNumber: 358,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (void 0)(Key, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 360,
										columnNumber: 19
									}, this), "Update Password"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 346,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 335,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "border-t border-border/50 pt-8",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-semibold text-foreground mb-4",
								children: "Active Session"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 367,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: handleSignOut,
								className: "flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground font-semibold rounded-xl text-sm hover:bg-muted/80 transition-colors border border-border/50 shadow-sm",
								children: [/* @__PURE__ */ (void 0)(LogOut, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 374,
									columnNumber: 17
								}, this), "Sign Out"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 370,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 366,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 325,
					columnNumber: 11
				}, this),
				activeTab === "notifications" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
						className: "text-2xl font-bold text-foreground mb-1",
						children: "Notifications"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 385,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-muted-foreground text-sm",
						children: "Control when and how you are contacted."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 388,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 384,
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
									lineNumber: 396,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Get notified about strong new brand matches."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 399,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 395,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed",
									children: /* @__PURE__ */ (void 0)("div", { className: "w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 404,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 403,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 394,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
									className: "font-semibold text-sm",
									children: "Product Updates"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 410,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Receive news about Branzly features."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 411,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 409,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed",
									children: /* @__PURE__ */ (void 0)("div", { className: "w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 416,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 415,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 408,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: "Email notification preferences will be available in an upcoming release."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 420,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 393,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 383,
					columnNumber: 11
				}, this),
				activeTab === "subscription" && /* @__PURE__ */ (void 0)(SubscriptionSettings, { userId }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 430,
					columnNumber: 11
				}, this),
				activeTab === "danger" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
						className: "text-2xl font-bold text-destructive mb-1",
						children: "Danger Zone"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 437,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-muted-foreground text-sm",
						children: "Irreversible and destructive actions."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 440,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 436,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "max-w-lg border border-destructive/20 bg-destructive/5 rounded-2xl p-6",
						children: [
							/* @__PURE__ */ (void 0)("h3", {
								className: "font-bold text-foreground mb-2",
								children: "Delete Account"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 446,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground mb-6",
								children: "Permanently delete your account, workspace data, saved brands, and outreach history. This action cannot be undone."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 447,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								disabled: true,
								className: "px-5 py-2.5 bg-destructive/10 text-destructive font-semibold rounded-xl text-sm border border-destructive/20 opacity-50 cursor-not-allowed",
								children: "Account Deletion Unavailable"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 452,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground mt-3",
								children: "Complete deletion flows are currently disabled in this preview environment to prevent accidental data loss."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 458,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 445,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 435,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 175,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 138,
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
			lineNumber: 483,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-muted-foreground text-sm",
			children: "Manage your plan, limits, and billing details."
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 486,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 482,
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
						lineNumber: 494,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-2xl font-bold text-foreground",
						children: planConfig.name
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 497,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 493,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "text-brand w-6 h-6" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 502,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 501,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 492,
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
							lineNumber: 507,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Searches / mo"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 509,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.searchesPerMonth, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 510,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 508,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Brand Views / mo"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 515,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.brandViewsPerMonth, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 516,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 514,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Saved Brands"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 521,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.savedBrandsTotal, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 522,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 520,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Team Members"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 527,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.teamMembers, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 528,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 526,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 506,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => navigate({ to: "/pricing" }),
					className: "w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
					children: "View Plans & Upgrade"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 534,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 491,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 481,
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
