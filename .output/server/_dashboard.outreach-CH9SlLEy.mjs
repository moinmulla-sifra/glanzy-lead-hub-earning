import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { a as useQueryClient, n as useMutation, o as require_jsx_runtime, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { E as Mail, F as ExternalLink, H as Check, K as Briefcase, N as Globe, P as FileText, R as Clock, W as Calendar, Y as ArrowRight, Z as Activity, _ as Search, b as Phone, g as Send, i as User, j as LayoutGrid, k as List, n as X, v as Save, w as MessageSquare, z as CircleCheck } from "./_libs/lucide-react.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-C8GPMWTs.mjs";
import { t as BRAND_SELECT_FIELDS } from "./_ssr/constants-GxBJ0Kj6.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Route } from "./_dashboard.outreach-Ctivd1Ym.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.outreach-CH9SlLEy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"Saved",
	"Contacted",
	"Replied",
	"Interested",
	"Meeting",
	"Won",
	"Lost"
];
var getStatusColor = (status) => {
	switch (status) {
		case "Won": return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
		case "Lost": return "bg-destructive/10 text-destructive border-destructive/20";
		case "Contacted":
		case "Replied":
		case "Interested":
		case "Meeting": return "bg-brand/10 text-brand border-brand/20";
		default: return "bg-muted/50 text-muted-foreground border-border/50";
	}
};
function OutreachView({ userId, defaultSelectedId }) {
	const queryClient = useQueryClient();
	const [viewMode, setViewMode] = (0, import_react.useState)("pipeline");
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [isFilterOpen, setIsFilterOpen] = (0, import_react.useState)(false);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)([]);
	const [debouncedSearch, setDebouncedSearch] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 400);
		return () => clearTimeout(t);
	}, [searchTerm]);
	const { workspaceId } = useMonetization(userId);
	const outreachQuery = useQuery({
		queryKey: ["outreach", workspaceId],
		enabled: !!workspaceId,
		queryFn: async () => {
			const { data, error } = await supabase.from("outreach").select(`*, brand:brand_id (${BRAND_SELECT_FIELDS})`).eq("workspace_id", workspaceId).order("updated_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	const allRecords = (0, import_react.useMemo)(() => outreachQuery.data || [], [outreachQuery.data]);
	const filteredRecords = (0, import_react.useMemo)(() => {
		return allRecords.filter((record) => {
			if (statusFilter.length > 0 && !statusFilter.includes(record.status)) return false;
			if (debouncedSearch) {
				const search = debouncedSearch.toLowerCase();
				const brand = record.brand;
				if (!brand) return false;
				if (!brand.company_name.toLowerCase().includes(search) && !brand.industry?.toLowerCase().includes(search) && !brand.contact_person?.toLowerCase().includes(search) && !brand.email?.toLowerCase().includes(search)) return false;
			}
			return true;
		});
	}, [
		allRecords,
		statusFilter,
		debouncedSearch
	]);
	const initMutation = useMutation({
		mutationFn: async (brandId) => {
			if (!workspaceId) throw new Error("No workspace");
			const { data: existing, error: fetchErr } = await supabase.from("outreach").select("id").eq("workspace_id", workspaceId).eq("brand_id", brandId).maybeSingle();
			if (fetchErr) throw fetchErr;
			if (existing) return existing.id;
			const { data: saved } = await supabase.from("saved_brands").select("*").eq("workspace_id", workspaceId).eq("brand_id", brandId).maybeSingle();
			const { data: created, error: createErr } = await supabase.from("outreach").insert({
				workspace_id: workspaceId,
				brand_id: brandId,
				status: "Saved",
				email_subject: saved?.email_subject || null,
				email_body: saved?.email_body || null,
				notes: saved?.notes || null
			}).select("id").single();
			if (createErr) throw createErr;
			await supabase.from("outreach_activity").insert({
				outreach_id: created.id,
				user_id: userId,
				activity_type: "created",
				description: "Started outreach from Discover/Saved",
				new_status: "Saved"
			});
			return created.id;
		},
		onSuccess: (id) => {
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
			setSelectedId(id);
			window.history.replaceState({}, "", "/outreach");
		}
	});
	(0, import_react.useEffect)(() => {
		if (defaultSelectedId && workspaceId && outreachQuery.isSuccess) {
			const existing = allRecords.find((o) => o.brand_id === defaultSelectedId);
			if (existing) {
				setSelectedId(existing.id);
				window.history.replaceState({}, "", "/outreach");
			} else if (!initMutation.isPending && !initMutation.isSuccess) initMutation.mutate(defaultSelectedId);
		}
	}, [
		defaultSelectedId,
		workspaceId,
		outreachQuery.isSuccess,
		allRecords,
		initMutation
	]);
	const updateStatusMutation = useMutation({
		mutationFn: async ({ id, status, oldStatus }) => {
			const { error } = await supabase.from("outreach").update({
				status,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", id);
			if (error) throw error;
			await supabase.from("outreach_activity").insert({
				outreach_id: id,
				user_id: userId,
				activity_type: "status_changed",
				old_status: oldStatus,
				new_status: status
			});
		},
		onSuccess: () => {
			toast.success("Status updated");
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
			queryClient.invalidateQueries({ queryKey: ["outreach_activity", selectedId] });
		},
		onError: (err) => toast.error(err.message || "Could not update status")
	});
	const markContactedMutation = useMutation({
		mutationFn: async ({ id, oldStatus }) => {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const { error } = await supabase.from("outreach").update({
				status: "Contacted",
				contacted_at: now,
				last_activity_at: now,
				updated_at: now
			}).eq("id", id);
			if (error) throw error;
			await supabase.from("outreach_activity").insert({
				outreach_id: id,
				user_id: userId,
				activity_type: "contacted",
				description: "Marked as contacted",
				old_status: oldStatus,
				new_status: "Contacted"
			});
		},
		onSuccess: () => {
			toast.success("Marked as contacted!");
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
			queryClient.invalidateQueries({ queryKey: ["outreach_activity", selectedId] });
		},
		onError: (err) => toast.error(err.message || "Error updating")
	});
	const updateEmailMutation = useMutation({
		mutationFn: async ({ id, subject, body }) => {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const { error } = await supabase.from("outreach").update({
				email_subject: subject,
				email_body: body,
				updated_at: now,
				last_activity_at: now
			}).eq("id", id);
			if (error) throw error;
			await supabase.from("outreach_activity").insert({
				outreach_id: id,
				user_id: userId,
				activity_type: "email_updated",
				description: "Email draft updated"
			});
		},
		onSuccess: () => {
			toast.success("Draft saved successfully");
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
			queryClient.invalidateQueries({ queryKey: ["outreach_activity", selectedId] });
		},
		onError: (err) => toast.error(err.message || "Could not save draft")
	});
	const updateNotesMutation = useMutation({
		mutationFn: async ({ id, notes }) => {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const { error } = await supabase.from("outreach").update({
				notes,
				updated_at: now,
				last_activity_at: now
			}).eq("id", id);
			if (error) throw error;
			await supabase.from("outreach_activity").insert({
				outreach_id: id,
				user_id: userId,
				activity_type: "note_added",
				description: "Notes updated"
			});
		},
		onSuccess: () => {
			toast.success("Notes saved");
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
			queryClient.invalidateQueries({ queryKey: ["outreach_activity", selectedId] });
		},
		onError: (err) => toast.error(err.message || "Could not save notes")
	});
	const updateNextActionMutation = useMutation({
		mutationFn: async ({ id, next_action }) => {
			const now = (/* @__PURE__ */ new Date()).toISOString();
			const { error } = await supabase.from("outreach").update({
				next_action,
				updated_at: now,
				last_activity_at: now
			}).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Next action updated");
			queryClient.invalidateQueries({ queryKey: ["outreach"] });
		},
		onError: (err) => toast.error(err.message || "Could not save next action")
	});
	const metrics = {
		active: allRecords.filter((r) => !["Won", "Lost"].includes(r.status)).length,
		replied: allRecords.filter((r) => r.status === "Replied").length,
		meetings: allRecords.filter((r) => r.status === "Meeting").length,
		won: allRecords.filter((r) => r.status === "Won").length
	};
	const selected = selectedId ? filteredRecords.find((r) => r.id === selectedId) || null : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full gap-6 lg:gap-8 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground",
							children: "Outreach"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-lg max-w-2xl",
							children: "Manage your brand conversations and keep every opportunity organized."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center bg-card p-1 rounded-xl border border-border/60 shadow-sm subtle-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setViewMode("pipeline"),
							className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${viewMode === "pipeline" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { size: 16 }), " Pipeline"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setViewMode("list"),
							className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${viewMode === "list" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { size: 16 }), " List"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border/60 rounded-2xl p-4 subtle-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 16 }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold",
										children: "Active Outreach"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold text-foreground",
								children: metrics.active
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border/60 rounded-2xl p-4 subtle-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-brand mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { size: 16 }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold",
										children: "Replied"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold text-foreground",
								children: metrics.replied
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border/60 rounded-2xl p-4 subtle-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-blue-500 mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { size: 16 }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold",
										children: "Meetings"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold text-foreground",
								children: metrics.meetings
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card border border-border/60 rounded-2xl p-4 subtle-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-green-500 mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }),
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold",
										children: "Won"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-bold text-foreground",
								children: metrics.won
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col sm:flex-row gap-3 items-center bg-card p-2 rounded-2xl border border-border/60 shadow-sm subtle-shadow",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "Search outreach...",
								value: searchTerm,
								onChange: (e) => setSearchTerm(e.target.value),
								className: "w-full pl-10 pr-4 py-2.5 bg-transparent border-none focus:ring-0 text-base placeholder:text-muted-foreground"
							}),
							searchTerm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSearchTerm(""),
								className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
							})
						]
					})
				})
			]
		}), outreachQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col items-center justify-center p-12 bg-card border border-border/60 rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent mb-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-muted-foreground",
				children: "Loading your pipeline..."
			})]
		}) : allRecords.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-10 h-10 text-muted-foreground" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-bold mb-3",
					children: "No outreach yet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground max-w-md mb-8 text-lg",
					children: "Choose a brand from Discover and start your first conversation."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/discover",
					className: "px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 18 }), " Discover Brands"]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col min-h-0 relative",
			children: [
				viewMode === "list" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col md:flex-row gap-6 min-h-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full md:w-[400px] flex flex-col bg-card rounded-3xl border border-border/60 subtle-shadow overflow-hidden flex-shrink-0 min-h-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 border-b border-border/50 bg-muted/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-bold tracking-tight",
								children: "Active Pipeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [filteredRecords.length, " opportunities"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar",
							children: filteredRecords.map((row) => {
								const isSelected = selected?.id === row.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setSelectedId(row.id),
									className: `w-full text-left p-4 rounded-2xl transition-all duration-200 border
                          ${isSelected ? "bg-brand/5 border-brand/30 shadow-sm" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border/50"}
                        `,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-start mb-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold text-foreground truncate pr-2 leading-tight",
											children: row.brand?.company_name || "Unknown Brand"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap border ${getStatusColor(row.status)}`,
											children: row.status
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-1 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "truncate flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { size: 12 }),
													" ",
													row.brand?.industry || "Unspecified"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: new Date(row.updated_at).toLocaleDateString(void 0, {
												month: "short",
												day: "numeric"
											}) })]
										}), row.next_action && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-foreground/80 font-medium truncate flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
													size: 12,
													className: "text-brand"
												}),
												" ",
												row.next_action
											]
										})]
									})]
								}, row.id);
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 flex flex-col bg-card rounded-3xl border border-border/60 subtle-shadow overflow-hidden min-h-0",
						children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutreachDetailPane, {
							outreach: selected,
							userId,
							onClose: () => setSelectedId(null),
							onStatusChange: (status) => updateStatusMutation.mutate({
								id: selected.id,
								status,
								oldStatus: selected.status
							}),
							onMarkContacted: () => markContactedMutation.mutate({
								id: selected.id,
								oldStatus: selected.status
							}),
							onSaveEmail: (subject, body) => updateEmailMutation.mutate({
								id: selected.id,
								subject,
								body
							}),
							onSaveNotes: (notes) => updateNotesMutation.mutate({
								id: selected.id,
								notes
							}),
							onSaveNextAction: (next_action) => updateNextActionMutation.mutate({
								id: selected.id,
								next_action
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col items-center justify-center text-center p-12",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 border border-border/50 shadow-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { className: "w-8 h-8 text-muted-foreground" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-bold text-foreground mb-1",
									children: "Select an opportunity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground max-w-xs",
									children: "Choose a brand from the list to view details and manage outreach."
								})
							]
						})
					})]
				}),
				viewMode === "pipeline" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x",
					children: [
						"Saved",
						"Contacted",
						"Replied",
						"Interested",
						"Meeting",
						"Won"
					].map((colStatus) => {
						const colRecords = filteredRecords.filter((r) => r.status === colStatus);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-[320px] flex-shrink-0 flex flex-col bg-muted/20 border border-border/50 rounded-3xl snap-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 flex items-center justify-between border-b border-border/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-bold flex items-center gap-2",
									children: [colStatus, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50",
										children: colRecords.length
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar",
								children: colRecords.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									onClick: () => setSelectedId(record.id),
									className: "bg-card rounded-2xl p-4 border border-border/60 subtle-shadow cursor-pointer hover:border-brand/40 hover:-translate-y-0.5 transition-all",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-between items-start mb-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-bold leading-tight line-clamp-1 pr-2",
												children: record.brand?.company_name
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground mb-3 flex items-center gap-1 line-clamp-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { size: 12 }),
												" ",
												record.brand?.industry || "Industry unspecified"
											]
										}),
										record.next_action && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mb-3 p-2 bg-muted/40 rounded-lg border border-border/50 text-xs text-foreground/90 font-medium flex gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
													size: 14,
													className: "text-brand shrink-0"
												}),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "line-clamp-2",
													children: record.next_action
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between mt-auto pt-3 border-t border-border/50 text-[10px] text-muted-foreground uppercase font-bold tracking-wider",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 12 }),
													" ",
													new Date(record.updated_at).toLocaleDateString()
												]
											}), record.brand?.lead_score != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-brand flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { size: 12 }),
													" Score",
													" ",
													record.brand.lead_score
												]
											})]
										})
									]
								}, record.id))
							})]
						}, colStatus);
					})
				}),
				viewMode === "pipeline" && selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-card w-full max-w-5xl max-h-full rounded-3xl border border-border/60 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutreachDetailPane, {
							outreach: selected,
							userId,
							onClose: () => setSelectedId(null),
							onStatusChange: (status) => updateStatusMutation.mutate({
								id: selected.id,
								status,
								oldStatus: selected.status
							}),
							onMarkContacted: () => markContactedMutation.mutate({
								id: selected.id,
								oldStatus: selected.status
							}),
							onSaveEmail: (subject, body) => updateEmailMutation.mutate({
								id: selected.id,
								subject,
								body
							}),
							onSaveNotes: (notes) => updateNotesMutation.mutate({
								id: selected.id,
								notes
							}),
							onSaveNextAction: (next_action) => updateNextActionMutation.mutate({
								id: selected.id,
								next_action
							})
						})
					})
				})
			]
		})]
	});
}
function OutreachDetailPane({ outreach, userId, onClose, onStatusChange, onMarkContacted, onSaveEmail, onSaveNotes, onSaveNextAction }) {
	const [activeTab, setActiveTab] = (0, import_react.useState)("details");
	const [emailSubject, setEmailSubject] = (0, import_react.useState)(outreach.email_subject || "");
	const [emailBody, setEmailBody] = (0, import_react.useState)(outreach.email_body || "");
	const [notes, setNotes] = (0, import_react.useState)(outreach.notes || "");
	const [nextAction, setNextAction] = (0, import_react.useState)(outreach.next_action || "");
	(0, import_react.useEffect)(() => {
		setEmailSubject(outreach.email_subject || "");
		setEmailBody(outreach.email_body || "");
		setNotes(outreach.notes || "");
		setNextAction(outreach.next_action || "");
	}, [
		outreach.id,
		outreach.email_subject,
		outreach.email_body,
		outreach.notes,
		outreach.next_action
	]);
	const activityQuery = useQuery({
		queryKey: ["outreach_activity", outreach.id],
		queryFn: async () => {
			const { data, error } = await supabase.from("outreach_activity").select("*").eq("outreach_id", outreach.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full overflow-hidden bg-card rounded-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold text-foreground truncate",
							children: outreach.brand?.company_name
						}), outreach.brand?.website && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: outreach.brand.website,
							target: "_blank",
							rel: "noreferrer",
							className: "text-muted-foreground hover:text-brand transition-colors p-1 bg-muted rounded-md",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 16 })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground flex items-center gap-4 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { size: 14 }),
								" ",
								outreach.brand?.industry || "Industry unspecified"
							]
						}), outreach.brand?.country && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 14 }),
								" ",
								outreach.brand.country
							]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1 items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase font-bold tracking-wider text-muted-foreground",
							children: "Current Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: outreach.status,
							onChange: (e) => onStatusChange(e.target.value),
							className: `h-9 pl-3 pr-8 rounded-xl text-sm font-bold shadow-sm appearance-none cursor-pointer border focus:ring-2 focus:ring-brand focus:outline-none ${getStatusColor(outreach.status)}`,
							children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))
						})]
					}), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors ml-2 self-start flex",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-6 pt-4 border-b border-border/50 flex items-center gap-6 overflow-x-auto custom-scrollbar",
				children: [
					{
						id: "details",
						icon: FileText,
						label: "Details & Notes"
					},
					{
						id: "email",
						icon: Mail,
						label: "Email Draft"
					},
					{
						id: "history",
						icon: Activity,
						label: "Activity History"
					}
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveTab(t.id),
					className: `flex items-center gap-2 pb-3 px-1 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === t.id ? "border-brand text-brand" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(t.icon, { size: 16 }),
						" ",
						t.label
					]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-6 custom-scrollbar bg-muted/10",
				children: [
					activeTab === "details" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-6 max-w-4xl mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card rounded-2xl p-5 border border-border/60 subtle-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-bold text-foreground mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
										size: 16,
										className: "text-brand"
									}), " Key Contact"]
								}), outreach.brand?.contact_person ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-foreground text-lg leading-none mb-1",
										children: outreach.brand.contact_person
									}), outreach.brand.contact_role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: outreach.brand.contact_role
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-2 pt-2",
										children: [outreach.brand.email && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `mailto:${outreach.brand.email}`,
											className: "flex items-center gap-3 text-sm text-foreground hover:text-brand transition-colors p-2 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 14 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate",
												children: outreach.brand.email
											})]
										}), outreach.brand.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `tel:${outreach.brand.phone}`,
											className: "flex items-center gap-3 text-sm text-foreground hover:text-brand transition-colors p-2 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 14 })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: outreach.brand.phone })]
										})]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full min-h-[100px] flex items-center justify-center text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground italic",
										children: "No contact information available for this brand."
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-card rounded-2xl p-5 border border-border/60 subtle-shadow flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-bold text-foreground mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
										size: 16,
										className: "text-brand"
									}), " Next Action"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 flex flex-col gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: nextAction,
										onChange: (e) => setNextAction(e.target.value),
										placeholder: "E.g. Follow up on Tuesday, Send portfolio...",
										className: "w-full px-3 py-2 bg-transparent border-b border-border/50 focus:border-brand focus:outline-none text-sm font-medium transition-colors"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-auto flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => onSaveNextAction(nextAction),
											disabled: nextAction === outreach.next_action,
											className: "px-4 py-1.5 bg-muted text-foreground rounded-lg text-xs font-semibold hover:bg-muted/80 transition-colors disabled:opacity-50",
											children: "Save Action"
										})
									})]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card rounded-2xl p-5 border border-border/60 subtle-shadow flex flex-col min-h-[250px]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-bold text-foreground mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
										size: 16,
										className: "text-brand"
									}), " Workspace Notes"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mb-3",
									children: "These notes are private to your workspace and not visible to the brand."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									placeholder: "Log call notes, thoughts, or strategies...",
									className: "w-full flex-1 min-h-[150px] p-4 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm leading-relaxed resize-y custom-scrollbar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 flex justify-end",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => onSaveNotes(notes),
										disabled: notes === outreach.notes,
										className: "flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 14 }), " Save Notes"]
									})
								})
							]
						})]
					}),
					activeTab === "email" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col h-full max-w-4xl mx-auto bg-card rounded-2xl p-5 border border-border/60 subtle-shadow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-sm font-bold text-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
										size: 16,
										className: "text-brand"
									}), " Email Drafter"]
								}), outreach.status === "Saved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: onMarkContacted,
									className: "flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-xl text-sm font-semibold hover:bg-brand/20 transition-colors border border-brand/20",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), " Mark as Contacted"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex flex-col gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Subject"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: emailSubject,
										onChange: (e) => setEmailSubject(e.target.value),
										placeholder: "Compelling subject line...",
										className: "w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm font-semibold transition-colors"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 flex flex-col space-y-1.5 min-h-[300px]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex justify-between",
										children: ["Message Body", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "normal-case text-muted-foreground/60 font-medium",
											children: "Use personalized details for best results"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: emailBody,
										onChange: (e) => setEmailBody(e.target.value),
										placeholder: "Write your outreach message here...",
										className: "w-full flex-1 p-4 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm leading-relaxed resize-y custom-scrollbar"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-border/50 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Branzly does not send emails automatically. Copy and send via your client."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												navigator.clipboard.writeText(`${emailSubject}\n\n${emailBody}`);
												toast.success("Copied to clipboard!");
											},
											className: "px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors",
											children: "Copy Content"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => onSaveEmail(emailSubject, emailBody),
											disabled: emailSubject === outreach.email_subject && emailBody === outreach.email_body,
											className: "flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors disabled:opacity-50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { size: 16 }), " Save Draft"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `mailto:${outreach.brand?.email || ""}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
											className: "flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 }), " Open Mail Client"]
										})
									]
								})]
							})
						]
					}),
					activeTab === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-w-3xl mx-auto",
						children: activityQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center p-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-6 h-6 animate-spin rounded-full border-2 border-brand border-t-transparent" })
						}) : activityQuery.data?.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center p-12 bg-card rounded-2xl border border-border/60",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: "No activity recorded yet."
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-border/60",
							children: activityQuery.data?.map((activity) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -left-6 top-1 w-6 h-6 rounded-full bg-background border-2 border-muted flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `w-2.5 h-2.5 rounded-full ${activity.activity_type === "status_changed" ? "bg-brand" : activity.activity_type === "contacted" ? "bg-green-500" : activity.activity_type === "created" ? "bg-blue-500" : "bg-muted-foreground"}` })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pl-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground font-medium mb-1",
										children: new Date(activity.created_at).toLocaleString(void 0, {
											month: "short",
											day: "numeric",
											hour: "numeric",
											minute: "2-digit"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-card p-4 rounded-2xl border border-border/60 subtle-shadow",
										children: activity.activity_type === "status_changed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-foreground",
											children: [
												"Status changed from",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold",
													children: activity.old_status
												}),
												" ",
												"to",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-brand",
													children: activity.new_status
												})
											]
										}) : activity.activity_type === "contacted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold text-foreground",
											children: "Marked as Contacted"
										}) : activity.activity_type === "created" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold text-foreground",
											children: "Outreach Started"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-foreground",
											children: activity.description
										})
									})]
								})]
							}, activity.id))
						})
					})
				]
			})
		]
	});
}
function OutreachPage() {
	const [userId, setUserId] = (0, import_react.useState)(null);
	const { brandId } = Route.useSearch();
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) setUserId(data.session.user.id);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OutreachView, {
		userId,
		defaultSelectedId: brandId
	});
}
//#endregion
export { OutreachPage as component };
