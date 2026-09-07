import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { O as LoaderCircle, a as UserPlus, m as Shield, o as UserMinus, r as Users } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.team-BTl5WyhQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/TeamView.tsx";
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
	if (!userId || workspaceMemberQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col items-center justify-center h-[60vh]",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 65,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 64,
		columnNumber: 7
	}, this);
	if (!isAgency) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col items-center justify-center h-[60vh] text-center max-w-md mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, { className: "w-8 h-8 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 74,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 73,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-2xl font-bold text-foreground mb-2",
				children: "Team Management"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 76,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground",
				children: "Team management is only available for Agency accounts. You are currently on a Creator account."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 79,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 72,
		columnNumber: 7
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col h-full gap-6 lg:gap-8 pb-12 animate-in fade-in duration-500 max-w-5xl mx-auto w-full",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
			children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Users, {
						className: "text-brand",
						size: 32
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 92,
						columnNumber: 13
					}, this), " Team Members"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 91,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground text-lg",
					children: [
						"Manage access to your agency workspace (",
						workspaceMemberQuery.data?.workspaces?.name,
						")."
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 94,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 90,
				columnNumber: 9
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 89,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "lg:col-span-2 space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card border border-border/60 rounded-3xl p-6 subtle-shadow",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "font-bold text-lg mb-6",
						children: "Active Members"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 105,
						columnNumber: 13
					}, this), teamMembersQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex justify-center p-8",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-6 h-6 animate-spin text-brand" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 109,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 108,
						columnNumber: 15
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-4",
						children: teamMembersQuery.data?.map((member) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden",
									children: member.profiles?.avatar_url ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
										src: member.profiles.avatar_url,
										alt: "Avatar",
										className: "w-full h-full object-cover"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 121,
										columnNumber: 27
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "font-bold text-sm",
										children: member.profiles?.full_name?.charAt(0) || "U"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 127,
										columnNumber: 27
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 119,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-semibold text-foreground text-sm",
									children: member.profiles?.full_name || "Unknown User"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 133,
									columnNumber: 25
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground capitalize",
									children: member.role
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 136,
									columnNumber: 25
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 132,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 118,
								columnNumber: 21
							}, this), isOwner && member.user_id !== userId && /* @__PURE__ */ (void 0)("button", {
								className: "p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors",
								title: "Remove Member",
								children: /* @__PURE__ */ (void 0)(UserMinus, { size: 18 }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 147,
									columnNumber: 25
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 143,
								columnNumber: 23
							}, this)]
						}, member.id, true, {
							fileName: _jsxFileName$1,
							lineNumber: 114,
							columnNumber: 19
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 112,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 104,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 103,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card border border-border/60 rounded-3xl p-6 subtle-shadow",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "font-bold text-lg mb-2",
							children: "Invite New Member"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 160,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-sm text-muted-foreground mb-6",
							children: "Send an email invitation to join this workspace."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 161,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							onSubmit: (e) => {
								e.preventDefault();
								if (inviteEmail) inviteMemberMutation.mutate(inviteEmail);
							},
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
										className: "text-xs font-semibold text-foreground uppercase tracking-wider",
										children: "Email Address"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 173,
										columnNumber: 17
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
										type: "email",
										required: true,
										value: inviteEmail,
										onChange: (e) => setInviteEmail(e.target.value),
										placeholder: "colleague@agency.com",
										className: "w-full bg-background border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand/50",
										disabled: !isOwner
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 176,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 172,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "submit",
									disabled: !isOwner || inviteMemberMutation.isPending || !inviteEmail,
									className: "w-full flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background font-semibold rounded-xl text-sm hover:bg-foreground/90 transition-all shadow-sm disabled:opacity-50",
									children: [inviteMemberMutation.isPending ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 195,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserPlus, { className: "w-4 h-4" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 197,
										columnNumber: 19
									}, this), "Send Invitation"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 187,
									columnNumber: 15
								}, this),
								!isOwner && /* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-center text-muted-foreground flex items-center justify-center gap-1 mt-2",
									children: [/* @__PURE__ */ (void 0)(Shield, { size: 12 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 204,
										columnNumber: 19
									}, this), " Only workspace owners can invite members."]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 203,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 165,
							columnNumber: 13
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 159,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 158,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 101,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 88,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_dashboard.team.tsx?tsr-split=component";
function TeamPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TeamView, { userId }, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 15,
		columnNumber: 10
	}, this);
}
//#endregion
export { TeamPage as component };
