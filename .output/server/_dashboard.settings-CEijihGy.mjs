import { n as __toESM } from "./_runtime.mjs";
import { n as applyTheme, r as getStoredTheme } from "./_ssr/theme-C5Ip8IN_.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, n as useMutation, o as require_jsx_runtime, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { C as Monitor, D as LogOut, G as Building2, I as CreditCard, J as Bell, M as Key, O as LoaderCircle, S as Moon, f as Sparkles, i as User, m as Shield, s as TriangleAlert, u as Sun, v as Save, x as Paintbrush } from "./_libs/lucide-react.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-C8GPMWTs.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.settings-CEijihGy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	if (!userId || profileQuery.isLoading || workspaceMemberQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center justify-center h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" })
	});
	const profile = profileQuery.data;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col lg:flex-row h-full gap-8 pb-12 animate-in fade-in duration-500 max-w-6xl mx-auto w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:w-64 shrink-0 flex flex-col gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold tracking-tight text-foreground mb-4 px-2",
				children: "Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-col gap-1",
				children: tabs.map((tab) => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab(tab.id),
						className: `
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                  ${isActive ? tab.danger ? "bg-destructive/10 text-destructive" : "bg-brand/10 text-brand" : tab.danger ? "text-destructive/70 hover:bg-destructive/10 hover:text-destructive" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"}
                `,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), tab.label]
					}, tab.id);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 bg-card border border-border/60 rounded-3xl p-6 lg:p-10 subtle-shadow min-h-[500px]",
			children: [
				activeTab === "account" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-foreground mb-1",
							children: "Account"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage your personal profile details."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-20 h-20 rounded-full bg-muted border border-border/50 flex items-center justify-center overflow-hidden shrink-0 shadow-sm",
								children: profile?.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: profile.avatar_url,
									alt: "Avatar",
									className: "w-full h-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
									size: 32,
									className: "text-muted-foreground"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg font-bold text-foreground",
										children: profile?.full_name || "Anonymous User"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm text-muted-foreground",
										children: ["User ID: ", profile?.id]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-2 mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-2.5 py-0.5 bg-muted rounded-md text-xs font-semibold capitalize border border-border/50",
											children: [profile?.account_type || "Creator", " Account"]
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border/50 pt-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-foreground",
								children: "Creator Profile"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground max-w-md",
								children: "Update your niche, connected platforms, and bio used for brand matching."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/profile",
								className: "px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-colors shadow-sm",
								children: "Edit Profile"
							})]
						})
					]
				}),
				activeTab === "workspace" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-foreground mb-1",
							children: "Workspace"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage shared configuration for your team or agency."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-5 max-w-lg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-sm font-semibold text-foreground",
										children: "Workspace Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: workspaceName,
										onChange: (e) => setWorkspaceName(e.target.value),
										disabled: !isWorkspaceAdmin || updateWorkspaceMutation.isPending,
										className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:opacity-50",
										placeholder: "Enter workspace name"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-muted/30 p-4 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground font-semibold uppercase mb-1",
											children: "Type"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium capitalize",
											children: workspaceInfo?.workspace_type || "Creator"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-muted/30 p-4 rounded-xl border border-border/50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground font-semibold uppercase mb-1",
											children: "Your Role"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium capitalize",
											children: memberInfo?.role || "Member"
										})]
									})]
								}),
								isWorkspaceAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => updateWorkspaceMutation.mutate(workspaceName),
									disabled: updateWorkspaceMutation.isPending || workspaceName === workspaceInfo?.name,
									className: "flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground font-semibold rounded-xl text-sm hover:bg-brand/90 transition-colors shadow-sm disabled:opacity-50",
									children: [updateWorkspaceMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), "Save Workspace"]
								})
							]
						}),
						profile?.account_type === "agency" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border/50 pt-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-foreground",
								children: "Team Management"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground max-w-md",
								children: "Invite members and manage permissions for your agency."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: true,
								className: "px-5 py-2.5 bg-muted text-muted-foreground font-semibold rounded-xl text-sm opacity-50 cursor-not-allowed",
								children: "Coming Soon"
							})]
						})
					]
				}),
				activeTab === "appearance" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold text-foreground mb-1",
						children: "Appearance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: "Customize how Branzly looks on your device."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleThemeChange("light"),
								className: `p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${theme === "light" ? "border-brand bg-brand/5" : "border-border/50 bg-muted/20 hover:bg-muted/50"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded-full bg-background border border-border shadow-sm flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sun, { className: "text-amber-500" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-sm",
									children: "Light"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleThemeChange("dark"),
								className: `p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${theme === "dark" ? "border-brand bg-brand/5" : "border-border/50 bg-muted/20 hover:bg-muted/50"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded-full bg-slate-950 border border-slate-800 shadow-sm flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon, { className: "text-blue-400" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-sm",
									children: "Dark"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => handleThemeChange("system"),
								className: `p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all ${theme === "system" ? "border-brand bg-brand/5" : "border-border/50 bg-muted/20 hover:bg-muted/50"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-12 h-12 rounded-full bg-gradient-to-br from-background to-muted border border-border shadow-sm flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "text-foreground/70" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-sm",
									children: "System"
								})]
							})
						]
					})]
				}),
				activeTab === "security" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-foreground mb-1",
							children: "Security"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm",
							children: "Manage your password and session."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-md space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-foreground",
									children: "Change Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "New password",
										className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										if (password.length < 6) {
											toast.error("Password must be at least 6 characters");
											return;
										}
										updatePasswordMutation.mutate(password);
									},
									disabled: !password || updatePasswordMutation.isPending,
									className: "flex items-center gap-2 px-5 py-2.5 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-colors shadow-sm disabled:opacity-50",
									children: [updatePasswordMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "w-4 h-4" }), "Update Password"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border/50 pt-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-foreground mb-4",
								children: "Active Session"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleSignOut,
								className: "flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground font-semibold rounded-xl text-sm hover:bg-muted/80 transition-colors border border-border/50 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "w-4 h-4" }), "Sign Out"]
							})]
						})
					]
				}),
				activeTab === "notifications" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold text-foreground mb-1",
						children: "Notifications"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: "Control when and how you are contacted."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6 max-w-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm",
									children: "Recommendation Alerts"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Get notified about strong new brand matches."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "font-semibold text-sm",
									children: "Product Updates"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-0.5",
									children: "Receive news about Branzly features."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-6 bg-brand rounded-full relative opacity-50 cursor-not-allowed",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Email notification preferences will be available in an upcoming release."
							})
						]
					})]
				}),
				activeTab === "subscription" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubscriptionSettings, { userId }),
				activeTab === "danger" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8 animate-in fade-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold text-destructive mb-1",
						children: "Danger Zone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: "Irreversible and destructive actions."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-lg border border-destructive/20 bg-destructive/5 rounded-2xl p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-foreground mb-2",
								children: "Delete Account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground mb-6",
								children: "Permanently delete your account, workspace data, saved brands, and outreach history. This action cannot be undone."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								disabled: true,
								className: "px-5 py-2.5 bg-destructive/10 text-destructive font-semibold rounded-xl text-sm border border-destructive/20 opacity-50 cursor-not-allowed",
								children: "Account Deletion Unavailable"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-3",
								children: "Complete deletion flows are currently disabled in this preview environment to prevent accidental data loss."
							})
						]
					})]
				})
			]
		})]
	});
}
function SubscriptionSettings({ userId, workspaceId }) {
	const { currentPlan, planConfig, limits } = useMonetization(userId);
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8 animate-in fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-2xl font-bold text-foreground mb-1",
			children: "Subscription & Billing"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground text-sm",
			children: "Manage your plan, limits, and billing details."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md bg-gradient-to-br from-brand/5 to-muted/20 border border-brand/20 rounded-2xl p-6 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold text-brand uppercase tracking-wider mb-1",
						children: "Current Plan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-bold text-foreground",
						children: planConfig.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "text-brand w-6 h-6" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold mb-2",
							children: "Usage Limits"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Searches / mo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-foreground",
								children: [limits.searchesPerMonth, " limit"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Brand Views / mo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-foreground",
								children: [limits.brandViewsPerMonth, " limit"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Saved Brands"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-foreground",
								children: [limits.savedBrandsTotal, " limit"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Team Members"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-foreground",
								children: [limits.teamMembers, " limit"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => navigate({ to: "/pricing" }),
					className: "w-full flex justify-center items-center gap-2 py-2.5 px-4 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
					children: "View Plans & Upgrade"
				})
			]
		})]
	});
}
function SettingsPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsView, { userId });
}
//#endregion
export { SettingsPage as component };
