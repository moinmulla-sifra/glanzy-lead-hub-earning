import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { A as Briefcase, C as ExternalLink, f as Save, g as MessageSquare, m as Phone, n as User, u as Send, v as Mail } from "./_libs/lucide-react.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Route } from "./_dashboard.outreach--CvmmNhr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.outreach-BrDMiMvk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/OutreachView.tsx";
var STATUSES = [
	"Saved",
	"Contacted",
	"Replied",
	"Interested",
	"Meeting",
	"Won",
	"Lost"
];
function OutreachView({ userId, defaultSelectedId }) {
	const queryClient = useQueryClient();
	const [selectedId, setSelectedId] = (0, import_react.useState)(defaultSelectedId || null);
	const workspaceId = useQuery({
		queryKey: ["workspaces", userId],
		enabled: !!userId,
		queryFn: async () => {
			const { data, error } = await supabase.from("workspace_members").select("workspace_id").eq("user_id", userId);
			if (error) throw error;
			return data.map((d) => d.workspace_id);
		}
	}).data?.[0];
	const outreachQuery = useQuery({
		queryKey: ["outreach", workspaceId],
		enabled: !!workspaceId,
		queryFn: async () => {
			const { data, error } = await supabase.from("saved_brands").select(`*, brand:brand_id (*)`).eq("workspace_id", workspaceId).order("updated_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	const updateStatusMutation = useMutation({
		mutationFn: async ({ id, status }) => {
			const { error } = await supabase.from("saved_brands").update({
				status,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Status updated");
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
		},
		onError: (err) => toast.error(err.message || "Could not update status")
	});
	const updateEmailMutation = useMutation({
		mutationFn: async ({ id, subject, body }) => {
			const { error } = await supabase.from("saved_brands").update({
				email_subject: subject,
				email_body: body,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Draft saved successfully");
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
		},
		onError: (err) => toast.error(err.message || "Could not save draft")
	});
	if (outreachQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center h-full",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 124,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-sm font-medium text-muted-foreground",
				children: "Loading your pipeline..."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 125,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 123,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 122,
		columnNumber: 7
	}, this);
	const rows = outreachQuery.data || [];
	if (rows.length === 0) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col items-center justify-center text-center p-12 h-full bg-card border border-border rounded-3xl border-dashed",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "w-8 h-8 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 139,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 138,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-xl font-bold mb-2",
				children: "Your outreach pipeline is empty"
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 141,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground max-w-sm",
				children: "Head over to the Discover tab to find high-quality brand opportunities and save them here to track your deals."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 144,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 137,
		columnNumber: 7
	}, this);
	const selected = rows.find((r) => r.id === selectedId || defaultSelectedId && r.brand_id === defaultSelectedId) || rows[0];
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)] animate-in fade-in duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "w-full lg:w-[380px] flex flex-col bg-card rounded-3xl border border-border/60 subtle-shadow overflow-hidden flex-shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-5 border-b border-border/50 bg-muted/20",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-lg font-bold tracking-tight",
					children: "Active Pipeline"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 165,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground",
					children: [rows.length, " opportunities"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 166,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 164,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 overflow-y-auto p-3 space-y-2",
				children: rows.map((row) => {
					const isSelected = selected?.id === row.id;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						onClick: () => setSelectedId(row.id),
						className: `w-full text-left p-4 rounded-2xl transition-all duration-200 border
                  ${isSelected ? "bg-brand/5 border-brand/30 shadow-sm" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border"}
                `,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex justify-between items-start mb-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "font-bold text-foreground truncate pr-2",
								children: row.brand?.company_name || "Unknown Brand"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 186,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap
                    ${row.status === "Won" ? "bg-green-500/10 text-green-600 dark:text-green-400" : row.status === "Lost" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}
                  `,
								children: row.status
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 189,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 185,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center text-xs text-muted-foreground gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "truncate",
									children: row.brand?.industry || "Unspecified"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 204,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "w-1 h-1 rounded-full bg-border" }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 207,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: new Date(row.updated_at).toLocaleDateString(void 0, {
									month: "short",
									day: "numeric"
								}) }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 208,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 203,
							columnNumber: 17
						}, this)]
					}, row.id, true, {
						fileName: _jsxFileName$1,
						lineNumber: 174,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 170,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 163,
			columnNumber: 7
		}, this), selected && selected.brand ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 flex flex-col bg-card rounded-3xl border border-border/60 subtle-shadow overflow-hidden min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-6 border-b border-border/50 bg-muted/10 flex flex-col sm:flex-row sm:items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-3xl font-bold text-foreground",
						children: selected.brand.company_name
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 227,
						columnNumber: 17
					}, this), selected.brand.website_url && /* @__PURE__ */ (void 0)("a", {
						href: selected.brand.website_url,
						target: "_blank",
						rel: "noreferrer",
						className: "p-1.5 bg-muted rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors",
						children: /* @__PURE__ */ (void 0)(ExternalLink, { size: 16 }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 237,
							columnNumber: 21
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 231,
						columnNumber: 19
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 226,
					columnNumber: 15
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { size: 14 }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 242,
						columnNumber: 17
					}, this), selected.brand.industry || "Industry unspecified"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 241,
					columnNumber: 15
				}, this)] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 225,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col gap-2 min-w-[200px]",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
						className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider",
						children: "Pipeline Status"
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 248,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
						value: selected.status,
						onChange: (e) => updateStatusMutation.mutate({
							id: selected.id,
							status: e.target.value
						}),
						className: "w-full h-10 px-3 bg-background border border-input rounded-xl text-sm font-medium shadow-sm focus:ring-1 focus:ring-brand focus:outline-none appearance-none cursor-pointer",
						children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
							value: s,
							children: s
						}, s, false, {
							fileName: _jsxFileName$1,
							lineNumber: 262,
							columnNumber: 19
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 251,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 247,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 224,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "p-6 grid grid-cols-1 lg:grid-cols-2 gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(User, {
								size: 16,
								className: "text-brand"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 276,
								columnNumber: 21
							}, this), "Key Contact"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 275,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-background rounded-2xl p-4 border border-border",
							children: selected.brand.decision_maker_name ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "font-bold text-foreground mb-1",
									children: selected.brand.decision_maker_name
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 282,
									columnNumber: 25
								}, this),
								selected.brand.decision_maker_role && /* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-muted-foreground mb-3",
									children: selected.brand.decision_maker_role
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 286,
									columnNumber: 27
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-2",
									children: [selected.brand.decision_maker_email && /* @__PURE__ */ (void 0)("a", {
										href: `mailto:${selected.brand.decision_maker_email}`,
										className: "flex items-center gap-2 text-sm text-brand hover:underline",
										children: [/* @__PURE__ */ (void 0)(Mail, { size: 14 }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 296,
											columnNumber: 31
										}, this), selected.brand.decision_maker_email]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 292,
										columnNumber: 29
									}, this), selected.brand.phone && /* @__PURE__ */ (void 0)("a", {
										href: `tel:${selected.brand.phone}`,
										className: "flex items-center gap-2 text-sm text-brand hover:underline",
										children: [/* @__PURE__ */ (void 0)(Phone, { size: 14 }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 305,
											columnNumber: 31
										}, this), selected.brand.phone]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 301,
										columnNumber: 29
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 290,
									columnNumber: 25
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 281,
								columnNumber: 23
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground italic",
								children: "No contact information available."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 312,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 279,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 274,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, {
								size: 16,
								className: "text-brand"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 321,
								columnNumber: 21
							}, this), "Opportunity Notes"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 320,
							columnNumber: 19
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-background rounded-2xl p-4 border border-border text-sm text-foreground leading-relaxed whitespace-pre-wrap min-h-[100px]",
							children: selected.brand.notes || /* @__PURE__ */ (void 0)("span", {
								className: "text-muted-foreground italic",
								children: "No notes provided for this brand."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 326,
								columnNumber: 23
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 324,
							columnNumber: 19
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 319,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 273,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col h-full",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, {
								size: 16,
								className: "text-brand"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 337,
								columnNumber: 19
							}, this), "Email Draft"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 336,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							className: "flex-1 flex flex-col gap-3 bg-background rounded-2xl p-4 border border-border",
							onSubmit: (e) => {
								e.preventDefault();
								const formData = new FormData(e.currentTarget);
								updateEmailMutation.mutate({
									id: selected.id,
									subject: formData.get("subject"),
									body: formData.get("body")
								});
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
									name: "subject",
									defaultValue: selected.email_subject || "",
									placeholder: "Subject line...",
									className: "w-full px-3 py-2 bg-transparent border-b border-border/50 focus:border-brand focus:outline-none text-sm font-medium transition-colors placeholder:font-normal"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 352,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
									name: "body",
									defaultValue: selected.email_body || "",
									placeholder: "Write your outreach message here...",
									className: "w-full flex-1 min-h-[200px] px-3 py-2 bg-transparent border-none focus:outline-none resize-none text-sm leading-relaxed"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 358,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center justify-between mt-auto pt-4 border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "text-xs text-muted-foreground",
										children: "Draft is saved securely to your workspace."
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 365,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
											type: "submit",
											disabled: updateEmailMutation.isPending,
											className: "flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Save, { size: 14 }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 374,
												columnNumber: 25
											}, this), "Save Draft"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 369,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", {
											href: `mailto:${selected.brand?.decision_maker_email || ""}?subject=${encodeURIComponent(selected.email_subject || "")}&body=${encodeURIComponent(selected.email_body || "")}`,
											className: "flex items-center gap-2 px-4 py-2 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { size: 14 }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 381,
												columnNumber: 25
											}, this), "Open Mail"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 377,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 368,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 364,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 340,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 335,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 271,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 270,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 223,
			columnNumber: 9
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 flex flex-col bg-card rounded-3xl border border-border/60 items-center justify-center p-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "w-12 h-12 text-muted/50 mb-4" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 393,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
					className: "text-lg font-bold text-muted-foreground",
					children: "Select an opportunity"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 394,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-sm text-muted-foreground max-w-xs mt-2",
					children: "Choose a brand from your pipeline on the left to view details and draft emails."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 397,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 392,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 161,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/_dashboard.outreach.tsx?tsr-split=component";
function OutreachPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	const { brandId } = Route.useSearch();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OutreachView, {
		userId,
		defaultSelectedId: brandId
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 10
	}, this);
}
//#endregion
export { OutreachPage as component };
