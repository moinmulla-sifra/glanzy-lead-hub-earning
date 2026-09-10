import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-CzmrzPTc.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-BgMG7Kz6.mjs";
import { b as useNavigate, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { K as CreditCard, L as Key, M as LogOut, N as LoaderCircle, _ as Shield, a as User, h as Sparkles, it as Bell, l as TriangleAlert, tt as Building2, x as Save, z as Info } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.settings-B-KFcyBR.js
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
			id: "about",
			label: "About",
			icon: Info
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
			lineNumber: 132,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 131,
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
				lineNumber: 143,
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
							lineNumber: 168,
							columnNumber: 17
						}, this), tab.label]
					}, tab.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 152,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 147,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 142,
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
							lineNumber: 182,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage your personal profile details."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 185,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 181,
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
									lineNumber: 193,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (void 0)(User, {
									size: 32,
									className: "text-muted-foreground"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 199,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 191,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex flex-col gap-1",
								children: [
									/* @__PURE__ */ (void 0)("span", {
										className: "text-lg font-bold text-foreground",
										children: profile?.full_name || "Anonymous User"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 203,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("span", {
										className: "text-sm text-muted-foreground",
										children: ["User ID: ", profile?.id]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 206,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "flex items-center gap-2 mt-1",
										children: /* @__PURE__ */ (void 0)("span", {
											className: "px-2.5 py-0.5 bg-muted rounded-md text-xs font-semibold capitalize border border-border/50",
											children: [profile?.account_type || "Creator", " Account"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 210,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 209,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 202,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 190,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "border-t border-border/50 pt-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-semibold text-foreground",
								children: "Creator Profile"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 219,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground max-w-md",
								children: "Update your niche, connected platforms, and bio used for brand matching."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 222,
								columnNumber: 17
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 218,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)(Link, {
								to: "/profile",
								className: "px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-colors shadow-sm",
								children: "Edit Profile"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 227,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 217,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 180,
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
							lineNumber: 241,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage shared configuration for your team or agency."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 244,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 240,
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
										lineNumber: 251,
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
										lineNumber: 254,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 250,
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
											lineNumber: 268,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "font-medium capitalize",
											children: workspaceInfo?.workspace_type || "Creator"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 271,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 267,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "bg-muted/30 p-4 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground font-semibold uppercase mb-1",
											children: "Your Role"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 276,
											columnNumber: 19
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "font-medium capitalize",
											children: memberInfo?.role || "Member"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 279,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 275,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 266,
									columnNumber: 15
								}, this),
								isWorkspaceAdmin && /* @__PURE__ */ (void 0)("button", {
									onClick: () => updateWorkspaceMutation.mutate(workspaceName),
									disabled: updateWorkspaceMutation.isPending || workspaceName === workspaceInfo?.name,
									className: "flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground font-semibold rounded-xl text-sm hover:bg-brand/90 transition-colors shadow-sm disabled:opacity-50",
									children: [updateWorkspaceMutation.isPending ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 295,
										columnNumber: 21
									}, this) : /* @__PURE__ */ (void 0)(Save, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 297,
										columnNumber: 21
									}, this), "Save Workspace"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 286,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 249,
							columnNumber: 13
						}, this),
						profile?.account_type === "agency" && /* @__PURE__ */ (void 0)("div", {
							className: "border-t border-border/50 pt-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-semibold text-foreground",
								children: "Team Management"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 307,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground max-w-md",
								children: "Invite members and manage permissions for your agency."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 310,
								columnNumber: 19
							}, this)] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 306,
								columnNumber: 17
							}, this), /* @__PURE__ */ (void 0)("button", {
								disabled: true,
								className: "px-5 py-2.5 bg-muted text-muted-foreground font-semibold rounded-xl text-sm opacity-50 cursor-not-allowed",
								children: "Coming Soon"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 314,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 305,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 239,
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
							lineNumber: 329,
							columnNumber: 15
						}, this), /* @__PURE__ */ (void 0)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage your password and session."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 332,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 328,
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
									lineNumber: 338,
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
										lineNumber: 340,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 339,
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
										lineNumber: 360,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (void 0)(Key, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 362,
										columnNumber: 19
									}, this), "Update Password"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 348,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 337,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (void 0)("div", {
							className: "border-t border-border/50 pt-8",
							children: [/* @__PURE__ */ (void 0)("h3", {
								className: "font-semibold text-foreground mb-4",
								children: "Active Session"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 369,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("button", {
								onClick: handleSignOut,
								className: "flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground font-semibold rounded-xl text-sm hover:bg-muted/80 transition-colors border border-border/50 shadow-sm",
								children: [/* @__PURE__ */ (void 0)(LogOut, { className: "w-4 h-4" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 376,
									columnNumber: 17
								}, this), "Sign Out"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 372,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 368,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 327,
					columnNumber: 11
				}, this),
				activeTab === "notifications" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
						className: "text-2xl font-bold text-foreground mb-1",
						children: "Notifications"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 387,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-muted-foreground text-sm",
						children: "Control when and how you are contacted."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 390,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 386,
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
									lineNumber: 398,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Get notified about strong new brand matches."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 401,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 397,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed",
									children: /* @__PURE__ */ (void 0)("div", { className: "w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 406,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 405,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 396,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50",
								children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
									className: "font-semibold text-sm",
									children: "Product Updates"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 412,
									columnNumber: 19
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Receive news about Branzly features."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 413,
									columnNumber: 19
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 411,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed",
									children: /* @__PURE__ */ (void 0)("div", { className: "w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 418,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 417,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 410,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: "Email notification preferences will be available in an upcoming release."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 422,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 395,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 385,
					columnNumber: 11
				}, this),
				activeTab === "subscription" && /* @__PURE__ */ (void 0)(SubscriptionSettings, { userId }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 432,
					columnNumber: 11
				}, this),
				activeTab === "about" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in max-w-3xl pb-12",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
						className: "text-2xl font-bold text-foreground mb-1",
						children: "About Branzly"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 439,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-muted-foreground text-sm",
						children: "Product information and legal details."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 442,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 438,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "space-y-12 mt-8",
						children: [
							/* @__PURE__ */ (void 0)("section", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (void 0)("h2", {
										className: "text-2xl font-bold text-foreground",
										children: "Who We Are"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 449,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-muted-foreground leading-relaxed",
										children: "Branzly is an AI-powered brand discovery and intelligence platform for creators and agencies. We exist to help creators, influencer marketers, agencies, talent managers, brands, and marketing professionals discover brands, understand their activity and opportunities, organize relevant brand information, evaluate potential partnerships, and make better-informed outreach and collaboration decisions."
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 452,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-muted-foreground leading-relaxed",
										children: "Branzly is a product and startup initiative operated through Glanzy Studio under the broader Mirza Group organization. We are currently being developed and operated as a startup/project and our legal structure may evolve over time."
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 461,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 448,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("section", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (void 0)("h2", {
										className: "text-2xl font-bold text-foreground",
										children: "What Branzly Does"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 470,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-muted-foreground leading-relaxed",
										children: "Branzly organizes useful brand intelligence into one professional workspace:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 473,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("ul", {
										className: "list-disc pl-6 text-muted-foreground space-y-2",
										children: [
											/* @__PURE__ */ (void 0)("li", { children: [/* @__PURE__ */ (void 0)("strong", { children: "Discovery:" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 479,
												columnNumber: 21
											}, this), " Find relevant brands by niches, countries, and categories."] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 478,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: [/* @__PURE__ */ (void 0)("strong", { children: "Brand Intelligence:" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 483,
												columnNumber: 21
											}, this), " Access detailed company information, products, social presence, marketing activity, and creator activity."] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 482,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: [/* @__PURE__ */ (void 0)("strong", { children: "Opportunity Signals:" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 488,
												columnNumber: 21
											}, this), " Identify potential partnership opportunities based on recent launches, funding, and marketing signals."] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 487,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: [/* @__PURE__ */ (void 0)("strong", { children: "Organization:" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 493,
												columnNumber: 21
											}, this), " Save promising brands to custom lists and team workspaces."] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 492,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: [/* @__PURE__ */ (void 0)("strong", { children: "Contact Workflows:" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 497,
												columnNumber: 21
											}, this), " Reveal available business contact information and track outreach status manually (Contacted state)."] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 496,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 477,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 469,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("section", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (void 0)("h2", {
										className: "text-2xl font-bold text-foreground",
										children: "Who Branzly Is For"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 505,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-muted-foreground leading-relaxed",
										children: "Branzly is designed to serve:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 508,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("ul", {
										className: "list-disc pl-6 text-muted-foreground space-y-2",
										children: [
											/* @__PURE__ */ (void 0)("li", { children: "Creators and Influencers" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 512,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: "Creator Agencies and Talent Managers" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 513,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: "Marketing Professionals" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 514,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: "Brands and Businesses" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 515,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: "Creator-economy professionals" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 516,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 511,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 504,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("section", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (void 0)("h2", {
									className: "text-2xl font-bold text-foreground",
									children: "Why Branzly Exists"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 521,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("p", {
									className: "text-muted-foreground leading-relaxed",
									children: "Brand discovery is often fragmented across search engines, social platforms, websites, news, directories, spreadsheets, and disconnected research tools. Creators and agencies often need to discover brands, research company information, understand marketing signals, identify relevant business opportunities, save promising companies, and keep track of outreach. Branzly is intended to bring useful brand intelligence and discovery into a more structured, organized environment."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 524,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 520,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("section", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (void 0)("h2", {
										className: "text-2xl font-bold text-foreground",
										children: "How Branzly Works"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 538,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-muted-foreground leading-relaxed",
										children: "The Branzly workflow is designed to be simple and effective:"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 541,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("ol", {
										className: "list-decimal pl-6 text-muted-foreground space-y-2",
										children: [
											/* @__PURE__ */ (void 0)("li", { children: [/* @__PURE__ */ (void 0)("strong", { children: "Discover:" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 546,
												columnNumber: 21
											}, this), " Search for brands in your niche or explore curated recommendations."] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 545,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: [/* @__PURE__ */ (void 0)("strong", { children: "Understand:" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 550,
												columnNumber: 21
											}, this), " Review comprehensive brand profiles, products, social metrics, and funding information."] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 549,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: [/* @__PURE__ */ (void 0)("strong", { children: "Save:" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 554,
												columnNumber: 21
											}, this), " Organize relevant brands into lists or workspace folders."] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 553,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: [/* @__PURE__ */ (void 0)("strong", { children: "Contact:" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 558,
												columnNumber: 21
											}, this), " Uncover available business contact information and reach out to the brand directly outside the platform."] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 557,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (void 0)("li", { children: [/* @__PURE__ */ (void 0)("strong", { children: "Track:" }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 563,
												columnNumber: 21
											}, this), " Mark brands as \"Contacted\" and track your outreach pipeline status."] }, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 562,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 544,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 537,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("section", {
								className: "space-y-4 bg-muted/20 border border-border/50 rounded-2xl p-8",
								children: [
									/* @__PURE__ */ (void 0)("h2", {
										className: "text-2xl font-bold text-foreground",
										children: "Founder & CEO"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 570,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("h3", {
										className: "text-lg font-bold text-foreground mt-4",
										children: "Moin M"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 573,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-muted-foreground leading-relaxed mt-2",
										children: "Moin M is the Founder and CEO of Branzly, the brand discovery and intelligence platform built to help creators, agencies, and modern marketing teams discover better opportunities and make more informed decisions. Branzly was created around a simple idea: finding the right brands should be easier, faster, and more intelligent than relying on scattered searches, spreadsheets, and disconnected information sources."
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 576,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-muted-foreground leading-relaxed mt-4",
										children: "As the founder of Glanzy Studio and the creator behind Branzly, Moin M is focused on building practical technology for the creator economy and improving how creators, agencies, and brands discover and understand commercial opportunities."
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 585,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (void 0)("p", {
										className: "text-muted-foreground leading-relaxed mt-4",
										children: "Branzly represents that vision in product form — combining structured brand intelligence, discovery, opportunity signals, and organization into one platform designed for the modern creator and marketing ecosystem."
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 591,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 569,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("section", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (void 0)("h2", {
									className: "text-2xl font-bold text-foreground",
									children: "Company Information"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 600,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-4",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
											className: "font-semibold text-foreground",
											children: "Parent Organization"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 605,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-muted-foreground",
											children: "Mirza Group"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 608,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 604,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [
											/* @__PURE__ */ (void 0)("h4", {
												className: "font-semibold text-foreground",
												children: "Operating Organization"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 611,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "text-muted-foreground",
												children: "Glanzy Studio"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 614,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("a", {
												href: "https://www.glanzystudio.dedyn.io",
												target: "_blank",
												rel: "noreferrer",
												className: "text-brand hover:underline text-sm",
												children: "glanzystudio.dedyn.io"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 615,
												columnNumber: 21
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 610,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
											className: "font-semibold text-foreground",
											children: "Founded"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 625,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-muted-foreground",
											children: "September 16, 2026"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 626,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 624,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h4", {
											className: "font-semibold text-foreground",
											children: "Location"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 629,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)("p", {
											className: "text-muted-foreground",
											children: "India"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 630,
											columnNumber: 21
										}, this)] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 628,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 603,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 599,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("section", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (void 0)("h2", {
									className: "text-2xl font-bold text-foreground",
									children: "Contact Us"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 636,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "space-y-6 mt-4",
									children: [
										/* @__PURE__ */ (void 0)("div", { children: [
											/* @__PURE__ */ (void 0)("h4", {
												className: "font-semibold text-foreground",
												children: "General Support & Legal/Privacy"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 641,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "text-sm text-muted-foreground mb-1",
												children: "For general inquiries, help with your account, or questions about our privacy policy."
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 644,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("a", {
												href: "mailto:support@branzly.dedyn.io",
												className: "text-brand hover:underline font-medium",
												children: "support@branzly.dedyn.io"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 648,
												columnNumber: 21
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 640,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [
											/* @__PURE__ */ (void 0)("h4", {
												className: "font-semibold text-foreground",
												children: "Leads & Additional Support"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 656,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "text-sm text-muted-foreground mb-1",
												children: "For help with brand discovery or issues regarding lead information."
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 659,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("a", {
												href: "mailto:leads@branzly.dedyn.io",
												className: "text-brand hover:underline font-medium",
												children: "leads@branzly.dedyn.io"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 663,
												columnNumber: 21
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 655,
											columnNumber: 19
										}, this),
										/* @__PURE__ */ (void 0)("div", { children: [
											/* @__PURE__ */ (void 0)("h4", {
												className: "font-semibold text-foreground",
												children: "Partnerships & Business"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 671,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "text-sm text-muted-foreground mb-1",
												children: "For collaboration requests, API access, or enterprise features."
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 674,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("a", {
												href: "mailto:partners@branzly.dedyn.io",
												className: "text-brand hover:underline font-medium",
												children: "partners@branzly.dedyn.io"
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 678,
												columnNumber: 21
											}, this)
										] }, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 670,
											columnNumber: 19
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 639,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 635,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 447,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 437,
					columnNumber: 11
				}, this),
				activeTab === "danger" && /* @__PURE__ */ (void 0)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("h2", {
						className: "text-2xl font-bold text-destructive mb-1",
						children: "Danger Zone"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 695,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("p", {
						className: "text-muted-foreground text-sm",
						children: "Irreversible and destructive actions."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 698,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 694,
						columnNumber: 13
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "max-w-lg border border-destructive/20 bg-destructive/5 rounded-2xl p-6",
						children: [
							/* @__PURE__ */ (void 0)("h3", {
								className: "font-bold text-foreground mb-2",
								children: "Delete Account"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 704,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-sm text-muted-foreground mb-6",
								children: "Permanently delete your account, workspace data, saved brands, and outreach history. This action cannot be undone."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 705,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("button", {
								disabled: true,
								className: "px-5 py-2.5 bg-destructive/10 text-destructive font-semibold rounded-xl text-sm border border-destructive/20 opacity-50 cursor-not-allowed",
								children: "Account Deletion Unavailable"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 710,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground mt-3",
								children: "Complete deletion flows are currently disabled in this preview environment to prevent accidental data loss."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 716,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 703,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 693,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 177,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 140,
		columnNumber: 5
	}, this);
}
function SubscriptionSettings({ userId, workspaceId }) {
	const { currentPlan, pendingPlan, planConfig, limits } = useMonetization(userId);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8 animate-in fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
			className: "text-2xl font-bold text-foreground mb-1",
			children: "Subscription & Billing"
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 741,
			columnNumber: 9
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
			className: "text-muted-foreground text-sm",
			children: "Manage your plan, limits, and billing details."
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 744,
			columnNumber: 9
		}, this)] }, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 740,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "max-w-md bg-gradient-to-br from-brand/5 to-muted/20 border border-brand/20 rounded-2xl p-6 shadow-sm relative overflow-hidden",
			children: [
				pendingPlan && /* @__PURE__ */ (void 0)("div", {
					className: "absolute top-0 left-0 w-full bg-amber-500/10 text-amber-600 px-4 py-2 text-xs font-bold text-center border-b border-amber-500/20",
					children: ["Upgrade Request Pending: ", pendingPlan.toUpperCase()]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 751,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: `flex items-center justify-between mb-6 ${pendingPlan ? "mt-6" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-xs font-bold text-brand uppercase tracking-wider mb-1",
						children: "Current Plan"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 757,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-2xl font-bold text-foreground",
						children: planConfig.name
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 760,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 756,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "text-brand w-6 h-6" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 765,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 764,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 755,
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
							lineNumber: 770,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Searches / mo"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 772,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.searchesPerMonth, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 773,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 771,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Brand Views / mo"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 778,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.brandViewsPerMonth, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 779,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 777,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Saved Brands"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 784,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.savedBrandsTotal, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 785,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 783,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-muted-foreground",
								children: "Team Members"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 790,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-medium text-foreground",
								children: [limits.teamMembers, " limit"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 791,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 789,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 769,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => navigate({ to: "/pricing" }),
					className: "w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
					children: "View Plans & Upgrade"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 797,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 749,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 739,
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
