import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, n as useMutation, o as require_jsx_runtime, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { O as LoaderCircle, a as UserPlus, m as Shield, o as UserMinus, r as Users } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.team-3W-EPb1d.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TeamView({ userId }) {
	useQueryClient();
	const [inviteEmail, setInviteEmail] = (0, import_react.useState)("");
	const workspaceMemberQuery = useQuery({
		queryKey: ["workspace_member_team", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("workspace_members").select("workspace_id, role, workspaces(name, workspace_type)").eq("user_id", userId).single();
			if (error) throw error;
			return data;
		}
	});
	const workspaceId = workspaceMemberQuery.data?.workspace_id;
	const isOwner = workspaceMemberQuery.data?.role === "owner";
	const isAgency = workspaceMemberQuery.data?.workspaces?.workspace_type === "agency";
	const teamMembersQuery = useQuery({
		queryKey: ["team_members", workspaceId],
		enabled: !!workspaceId,
		queryFn: async () => {
			const { data, error } = await supabase.from("workspace_members").select("*, profiles(full_name, avatar_url, account_type)").eq("workspace_id", workspaceId);
			if (error) throw error;
			return data;
		}
	});
	const inviteMemberMutation = useMutation({
		mutationFn: async (email) => {
			await new Promise((r) => setTimeout(r, 1e3));
			throw new Error("Email invitations are disabled in this preview environment.");
		},
		onSuccess: () => {
			toast.success("Invitation sent successfully");
			setInviteEmail("");
		},
		onError: (err) => toast.error(err.message || "Failed to send invitation")
	});
	if (!userId || workspaceMemberQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col items-center justify-center h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" })
	});
	if (!isAgency) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "w-8 h-8 text-muted-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold text-foreground mb-2",
				children: "Team Management"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Team management is only available for Agency accounts. You are currently on a Creator account."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 max-w-5xl mx-auto w-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
						className: "text-brand",
						size: 32
					}), " Team Members"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-muted-foreground text-lg",
					children: [
						"Manage access to your agency workspace (",
						workspaceMemberQuery.data?.workspaces?.name,
						")."
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2 space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border/60 rounded-3xl p-6 subtle-shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-bold text-lg mb-6",
						children: "Active Members"
					}), teamMembersQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center p-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-6 h-6 animate-spin text-brand" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: teamMembersQuery.data?.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden",
									children: member.profiles?.avatar_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: member.profiles.avatar_url,
										alt: "Avatar",
										className: "w-full h-full object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold text-sm",
										children: member.profiles?.full_name?.charAt(0) || "U"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-foreground text-sm",
									children: member.profiles?.full_name || "Unknown User"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground capitalize",
									children: member.role
								})] })]
							}), isOwner && member.user_id !== userId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors",
								title: "Remove Member",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserMinus, { size: 18 })
							})]
						}, member.id))
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border/60 rounded-3xl p-6 subtle-shadow",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-bold text-lg mb-2",
							children: "Invite New Member"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground mb-6",
							children: "Send an email invitation to join this workspace."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								if (inviteEmail) inviteMemberMutation.mutate(inviteEmail);
							},
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold text-foreground uppercase tracking-wider",
										children: "Email Address"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										required: true,
										value: inviteEmail,
										onChange: (e) => setInviteEmail(e.target.value),
										placeholder: "colleague@agency.com",
										className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50",
										disabled: !isOwner
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									disabled: !isOwner || inviteMemberMutation.isPending || !inviteEmail,
									className: "w-full flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-all shadow-sm disabled:opacity-50",
									children: [inviteMemberMutation.isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "w-4 h-4" }), "Send Invitation"]
								}),
								!isOwner && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-center text-muted-foreground flex items-center justify-center gap-1 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 12 }), " Only workspace owners can invite members."]
								})
							]
						})
					]
				})
			})]
		})]
	});
}
function TeamPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamView, { userId });
}
//#endregion
export { TeamPage as component };
