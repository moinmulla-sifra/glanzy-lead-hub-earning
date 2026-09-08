import { n as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/supabase-CzmrzPTc.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react } from "./_libs/react+tanstack__react-query.mjs";
import { y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { A as LayoutGrid, C as MessageSquare, H as Check, K as Briefcase, L as Clock, M as Globe, N as FileText, O as List, P as ExternalLink, T as Mail, W as Calendar, Y as ArrowRight, Z as Activity, _ as Search, b as Phone, g as Send, i as User, n as X, v as Save, z as CircleCheck } from "./_libs/lucide-react.mjs";
import { t as useMonetization } from "./_ssr/useMonetization-Dm9pnDla.mjs";
import { t as BRAND_SELECT_FIELDS } from "./_ssr/constants-GxBJ0Kj6.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Route } from "./_dashboard.outreach-dF6IwfMd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.outreach-BeSCcsUt.js
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col h-full gap-6 lg:gap-8 animate-in fade-in duration-500",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "text-3xl lg:text-4xl font-bold tracking-tight text-foreground",
							children: "Outreach"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 382,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-muted-foreground text-lg max-w-2xl",
							children: "Manage your brand conversations and keep every opportunity organized."
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 385,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 381,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center bg-card p-1 rounded-xl border border-border/60 shadow-sm subtle-shadow",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setViewMode("pipeline"),
							className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${viewMode === "pipeline" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LayoutGrid, { size: 16 }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 395,
								columnNumber: 15
							}, this), " Pipeline"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 391,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => setViewMode("list"),
							className: `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${viewMode === "list" ? "bg-muted text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(List, { size: 16 }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 401,
								columnNumber: 15
							}, this), " List"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 397,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 390,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 380,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-2 md:grid-cols-4 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card border border-border/60 rounded-2xl p-4 subtle-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-muted-foreground mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Activity, { size: 16 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 410,
										columnNumber: 15
									}, this),
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm font-semibold",
										children: "Active Outreach"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 411,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 409,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-2xl font-bold text-foreground",
								children: metrics.active
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 413,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 408,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card border border-border/60 rounded-2xl p-4 subtle-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-brand mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquare, { size: 16 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 419,
										columnNumber: 15
									}, this),
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm font-semibold",
										children: "Replied"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 420,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 418,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-2xl font-bold text-foreground",
								children: metrics.replied
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 422,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 417,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card border border-border/60 rounded-2xl p-4 subtle-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-blue-500 mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { size: 16 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 428,
										columnNumber: 15
									}, this),
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm font-semibold",
										children: "Meetings"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 429,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 427,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-2xl font-bold text-foreground",
								children: metrics.meetings
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 431,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 426,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card border border-border/60 rounded-2xl p-4 subtle-shadow",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 text-green-500 mb-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { size: 16 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 437,
										columnNumber: 15
									}, this),
									" ",
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-sm font-semibold",
										children: "Won"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 438,
										columnNumber: 15
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 436,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-2xl font-bold text-foreground",
								children: metrics.won
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 440,
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
					lineNumber: 407,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex flex-col sm:flex-row gap-3 items-center bg-card p-2 rounded-2xl border border-border/60 shadow-sm subtle-shadow",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "relative w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 447,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								type: "text",
								placeholder: "Search outreach...",
								value: searchTerm,
								onChange: (e) => setSearchTerm(e.target.value),
								className: "w-full pl-10 pr-4 py-2.5 bg-transparent border-none focus:ring-0 text-base placeholder:text-muted-foreground"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 448,
								columnNumber: 13
							}, this),
							searchTerm && /* @__PURE__ */ (void 0)("button", {
								onClick: () => setSearchTerm(""),
								className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted",
								children: /* @__PURE__ */ (void 0)(X, { size: 16 }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 460,
									columnNumber: 17
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 456,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 446,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 445,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 379,
			columnNumber: 7
		}, this), outreachQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 flex flex-col items-center justify-center p-12 bg-card border border-border/60 rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-brand border-t-transparent mb-4" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 469,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "font-semibold text-muted-foreground",
				children: "Loading your pipeline..."
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 470,
				columnNumber: 11
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 468,
			columnNumber: 9
		}, this) : allRecords.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 flex flex-col items-center justify-center text-center p-16 bg-card border border-border/60 rounded-3xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-6 border border-border/50 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { className: "w-10 h-10 text-muted-foreground" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 477,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 476,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-2xl font-bold mb-3",
					children: "No outreach yet"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 479,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground max-w-md mb-8 text-lg",
					children: "Choose a brand from Discover and start your first conversation."
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 480,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/discover",
					className: "px-6 py-3 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Globe, { size: 18 }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 487,
						columnNumber: 13
					}, this), " Discover Brands"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 483,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 475,
			columnNumber: 9
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex-1 flex flex-col min-h-0 relative",
			children: [
				viewMode === "list" && /* @__PURE__ */ (void 0)("div", {
					className: "flex-1 flex flex-col md:flex-row gap-6 min-h-0",
					children: [/* @__PURE__ */ (void 0)("div", {
						className: "w-full md:w-[400px] flex flex-col bg-card rounded-3xl border border-border/60 subtle-shadow overflow-hidden flex-shrink-0 min-h-0",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "p-4 border-b border-border/50 bg-muted/20",
							children: [/* @__PURE__ */ (void 0)("h2", {
								className: "font-bold tracking-tight",
								children: "Active Pipeline"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 497,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: [filteredRecords.length, " opportunities"]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 498,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 496,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar",
							children: filteredRecords.map((row) => {
								return /* @__PURE__ */ (void 0)("button", {
									onClick: () => setSelectedId(row.id),
									className: `w-full text-left p-4 rounded-2xl transition-all duration-200 border
                          ${selected?.id === row.id ? "bg-brand/5 border-brand/30 shadow-sm" : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border/50"}
                        `,
									children: [/* @__PURE__ */ (void 0)("div", {
										className: "flex justify-between items-start mb-1.5",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "font-bold text-foreground truncate pr-2 leading-tight",
											children: row.brand?.company_name || "Unknown Brand"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 514,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", {
											className: `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full whitespace-nowrap border ${getStatusColor(row.status)}`,
											children: row.status
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 517,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 513,
										columnNumber: 25
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-col gap-1 text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between items-center",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "truncate flex items-center gap-1",
												children: [
													/* @__PURE__ */ (void 0)(Briefcase, { size: 12 }, void 0, false, {
														fileName: _jsxFileName$1,
														lineNumber: 526,
														columnNumber: 31
													}, this),
													" ",
													row.brand?.industry || "Unspecified"
												]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 525,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("span", { children: new Date(row.updated_at).toLocaleDateString(void 0, {
												month: "short",
												day: "numeric"
											}) }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 529,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 524,
											columnNumber: 27
										}, this), row.next_action && /* @__PURE__ */ (void 0)("span", {
											className: "text-foreground/80 font-medium truncate flex items-center gap-1",
											children: [
												/* @__PURE__ */ (void 0)(ArrowRight, {
													size: 12,
													className: "text-brand"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 538,
													columnNumber: 31
												}, this),
												" ",
												row.next_action
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 537,
											columnNumber: 29
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 523,
										columnNumber: 25
									}, this)]
								}, row.id, true, {
									fileName: _jsxFileName$1,
									lineNumber: 506,
									columnNumber: 23
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 502,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 495,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("div", {
						className: "flex-1 flex flex-col bg-card rounded-3xl border border-border/60 subtle-shadow overflow-hidden min-h-0",
						children: selected ? /* @__PURE__ */ (void 0)(OutreachDetailPane, {
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
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 552,
							columnNumber: 19
						}, this) : /* @__PURE__ */ (void 0)("div", {
							className: "flex-1 flex flex-col items-center justify-center text-center p-12",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 border border-border/50 shadow-sm",
									children: /* @__PURE__ */ (void 0)(Briefcase, { className: "w-8 h-8 text-muted-foreground" }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 589,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 588,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("h3", {
									className: "text-lg font-bold text-foreground mb-1",
									children: "Select an opportunity"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 591,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-sm text-muted-foreground max-w-xs",
									children: "Choose a brand from the list to view details and manage outreach."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 594,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 587,
							columnNumber: 19
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 550,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 493,
					columnNumber: 13
				}, this),
				viewMode === "pipeline" && /* @__PURE__ */ (void 0)("div", {
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
						return /* @__PURE__ */ (void 0)("div", {
							className: "w-[320px] flex-shrink-0 flex flex-col bg-muted/20 border border-border/50 rounded-3xl snap-start",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "p-4 flex items-center justify-between border-b border-border/50",
								children: /* @__PURE__ */ (void 0)("h3", {
									className: "font-bold flex items-center gap-2",
									children: [colStatus, /* @__PURE__ */ (void 0)("span", {
										className: "text-xs font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/50",
										children: colRecords.length
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 625,
										columnNumber: 25
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 623,
									columnNumber: 23
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 622,
								columnNumber: 21
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar",
								children: colRecords.map((record) => /* @__PURE__ */ (void 0)("div", {
									onClick: () => setSelectedId(record.id),
									className: "bg-card rounded-2xl p-4 border border-border/60 subtle-shadow cursor-pointer hover:border-brand/40 hover:-translate-y-0.5 transition-all",
									children: [
										/* @__PURE__ */ (void 0)("div", {
											className: "flex justify-between items-start mb-2",
											children: /* @__PURE__ */ (void 0)("h4", {
												className: "font-bold leading-tight line-clamp-1 pr-2",
												children: record.brand?.company_name
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 638,
												columnNumber: 29
											}, this)
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 637,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (void 0)("p", {
											className: "text-xs text-muted-foreground mb-3 flex items-center gap-1 line-clamp-1",
											children: [
												/* @__PURE__ */ (void 0)(Briefcase, { size: 12 }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 643,
													columnNumber: 29
												}, this),
												" ",
												record.brand?.industry || "Industry unspecified"
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 642,
											columnNumber: 27
										}, this),
										record.next_action && /* @__PURE__ */ (void 0)("div", {
											className: "mb-3 p-2 bg-muted/40 rounded-lg border border-border/50 text-xs text-foreground/90 font-medium flex gap-1.5",
											children: [
												/* @__PURE__ */ (void 0)(ArrowRight, {
													size: 14,
													className: "text-brand shrink-0"
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 649,
													columnNumber: 31
												}, this),
												" ",
												/* @__PURE__ */ (void 0)("span", {
													className: "line-clamp-2",
													children: record.next_action
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 653,
													columnNumber: 31
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 648,
											columnNumber: 29
										}, this),
										/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center justify-between mt-auto pt-3 border-t border-border/50 text-[10px] text-muted-foreground uppercase font-bold tracking-wider",
											children: [/* @__PURE__ */ (void 0)("span", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (void 0)(Clock, { size: 12 }, void 0, false, {
														fileName: _jsxFileName$1,
														lineNumber: 661,
														columnNumber: 31
													}, this),
													" ",
													new Date(record.updated_at).toLocaleDateString()
												]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 660,
												columnNumber: 29
											}, this), record.brand?.lead_score != null && /* @__PURE__ */ (void 0)("span", {
												className: "text-brand flex items-center gap-1",
												children: [
													/* @__PURE__ */ (void 0)(Activity, { size: 12 }, void 0, false, {
														fileName: _jsxFileName$1,
														lineNumber: 666,
														columnNumber: 33
													}, this),
													" Score",
													" ",
													record.brand.lead_score
												]
											}, void 0, true, {
												fileName: _jsxFileName$1,
												lineNumber: 665,
												columnNumber: 31
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 659,
											columnNumber: 27
										}, this)
									]
								}, record.id, true, {
									fileName: _jsxFileName$1,
									lineNumber: 632,
									columnNumber: 25
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 630,
								columnNumber: 21
							}, this)]
						}, colStatus, true, {
							fileName: _jsxFileName$1,
							lineNumber: 618,
							columnNumber: 19
						}, this);
					})
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 605,
					columnNumber: 13
				}, this),
				viewMode === "pipeline" && selected && /* @__PURE__ */ (void 0)("div", {
					className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200",
					children: /* @__PURE__ */ (void 0)("div", {
						className: "bg-card w-full max-w-5xl max-h-full rounded-3xl border border-border/60 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300",
						children: /* @__PURE__ */ (void 0)(OutreachDetailPane, {
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
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 684,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 683,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 682,
					columnNumber: 13
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 491,
			columnNumber: 9
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 377,
		columnNumber: 5
	}, this);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col h-full overflow-hidden bg-card rounded-3xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-2xl font-bold text-foreground truncate",
							children: outreach.brand?.company_name
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 789,
							columnNumber: 13
						}, this), outreach.brand?.website && /* @__PURE__ */ (void 0)("a", {
							href: outreach.brand.website,
							target: "_blank",
							rel: "noreferrer",
							className: "text-muted-foreground hover:text-brand transition-colors p-1 bg-muted rounded-md",
							children: /* @__PURE__ */ (void 0)(ExternalLink, { size: 16 }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 799,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 793,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 788,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground flex items-center gap-4 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Briefcase, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 805,
									columnNumber: 15
								}, this),
								" ",
								outreach.brand?.industry || "Industry unspecified"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 804,
							columnNumber: 13
						}, this), outreach.brand?.country && /* @__PURE__ */ (void 0)("span", {
							className: "flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (void 0)(Globe, { size: 14 }, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 810,
									columnNumber: 17
								}, this),
								" ",
								outreach.brand.country
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 809,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 803,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 787,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-3 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col gap-1 items-end",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-[10px] uppercase font-bold tracking-wider text-muted-foreground",
							children: "Current Status"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 818,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", {
							value: outreach.status,
							onChange: (e) => onStatusChange(e.target.value),
							className: `h-9 pl-3 pr-8 rounded-xl text-sm font-bold shadow-sm appearance-none cursor-pointer border focus:ring-2 focus:ring-brand focus:outline-none ${getStatusColor(outreach.status)}`,
							children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", {
								value: s,
								children: s
							}, s, false, {
								fileName: _jsxFileName$1,
								lineNumber: 827,
								columnNumber: 17
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 821,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 817,
						columnNumber: 11
					}, this), onClose && /* @__PURE__ */ (void 0)("button", {
						onClick: onClose,
						className: "p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors ml-2 self-start flex",
						children: /* @__PURE__ */ (void 0)(X, { size: 20 }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 838,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 834,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 816,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 786,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
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
				].map((t) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => setActiveTab(t.id),
					className: `flex items-center gap-2 pb-3 px-1 text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === t.id ? "border-brand text-brand" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(t.icon, { size: 16 }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 862,
							columnNumber: 13
						}, this),
						" ",
						t.label
					]
				}, t.id, true, {
					fileName: _jsxFileName$1,
					lineNumber: 851,
					columnNumber: 11
				}, this))
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 845,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex-1 overflow-y-auto p-6 custom-scrollbar bg-muted/10",
				children: [
					activeTab === "details" && /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col gap-6 max-w-4xl mx-auto",
						children: [/* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-6",
							children: [/* @__PURE__ */ (void 0)("div", {
								className: "bg-card rounded-2xl p-5 border border-border/60 subtle-shadow",
								children: [/* @__PURE__ */ (void 0)("h3", {
									className: "text-sm font-bold text-foreground mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(User, {
										size: 16,
										className: "text-brand"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 875,
										columnNumber: 19
									}, this), " Key Contact"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 874,
									columnNumber: 17
								}, this), outreach.brand?.contact_person ? /* @__PURE__ */ (void 0)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (void 0)("div", { children: [/* @__PURE__ */ (void 0)("p", {
										className: "font-bold text-foreground text-lg leading-none mb-1",
										children: outreach.brand.contact_person
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 880,
										columnNumber: 23
									}, this), outreach.brand.contact_role && /* @__PURE__ */ (void 0)("p", {
										className: "text-sm text-muted-foreground",
										children: outreach.brand.contact_role
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 884,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 879,
										columnNumber: 21
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "flex flex-col gap-2 pt-2",
										children: [outreach.brand.email && /* @__PURE__ */ (void 0)("a", {
											href: `mailto:${outreach.brand.email}`,
											className: "flex items-center gap-3 text-sm text-foreground hover:text-brand transition-colors p-2 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0",
												children: /* @__PURE__ */ (void 0)(Mail, { size: 14 }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 896,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 895,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "truncate",
												children: outreach.brand.email
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 898,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 891,
											columnNumber: 25
										}, this), outreach.brand.phone && /* @__PURE__ */ (void 0)("a", {
											href: `tel:${outreach.brand.phone}`,
											className: "flex items-center gap-3 text-sm text-foreground hover:text-brand transition-colors p-2 rounded-lg hover:bg-muted/50 border border-transparent hover:border-border",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "w-8 h-8 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0",
												children: /* @__PURE__ */ (void 0)(Phone, { size: 14 }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 909,
													columnNumber: 29
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 908,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)("span", { children: outreach.brand.phone }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 911,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 904,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 889,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 878,
									columnNumber: 19
								}, this) : /* @__PURE__ */ (void 0)("div", {
									className: "h-full min-h-[100px] flex items-center justify-center text-center",
									children: /* @__PURE__ */ (void 0)("p", {
										className: "text-sm text-muted-foreground italic",
										children: "No contact information available for this brand."
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 918,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 917,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 873,
								columnNumber: 15
							}, this), /* @__PURE__ */ (void 0)("div", {
								className: "bg-card rounded-2xl p-5 border border-border/60 subtle-shadow flex flex-col",
								children: [/* @__PURE__ */ (void 0)("h3", {
									className: "text-sm font-bold text-foreground mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(ArrowRight, {
										size: 16,
										className: "text-brand"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 928,
										columnNumber: 19
									}, this), " Next Action"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 927,
									columnNumber: 17
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex-1 flex flex-col gap-3",
									children: [/* @__PURE__ */ (void 0)("input", {
										value: nextAction,
										onChange: (e) => setNextAction(e.target.value),
										placeholder: "E.g. Follow up on Tuesday, Send portfolio...",
										className: "w-full px-3 py-2 bg-transparent border-b border-border/50 focus:border-brand focus:outline-none text-sm font-medium transition-colors"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 931,
										columnNumber: 19
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "mt-auto flex justify-end",
										children: /* @__PURE__ */ (void 0)("button", {
											onClick: () => onSaveNextAction(nextAction),
											disabled: nextAction === outreach.next_action,
											className: "px-4 py-1.5 bg-muted text-foreground rounded-lg text-xs font-semibold hover:bg-muted/80 transition-colors disabled:opacity-50",
											children: "Save Action"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 938,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 937,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 930,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 926,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 871,
							columnNumber: 13
						}, this), /* @__PURE__ */ (void 0)("div", {
							className: "bg-card rounded-2xl p-5 border border-border/60 subtle-shadow flex flex-col min-h-[250px]",
							children: [
								/* @__PURE__ */ (void 0)("h3", {
									className: "text-sm font-bold text-foreground mb-4 flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(MessageSquare, {
										size: 16,
										className: "text-brand"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 953,
										columnNumber: 17
									}, this), " Workspace Notes"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 952,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground mb-3",
									children: "These notes are private to your workspace and not visible to the brand."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 956,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("textarea", {
									value: notes,
									onChange: (e) => setNotes(e.target.value),
									placeholder: "Log call notes, thoughts, or strategies...",
									className: "w-full flex-1 min-h-[150px] p-4 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm leading-relaxed resize-y custom-scrollbar"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 960,
									columnNumber: 15
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "mt-4 flex justify-end",
									children: /* @__PURE__ */ (void 0)("button", {
										onClick: () => onSaveNotes(notes),
										disabled: notes === outreach.notes,
										className: "flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground disabled:shadow-none",
										children: [/* @__PURE__ */ (void 0)(Save, { size: 14 }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 972,
											columnNumber: 19
										}, this), " Save Notes"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 967,
										columnNumber: 17
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 966,
									columnNumber: 15
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 951,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 870,
						columnNumber: 11
					}, this),
					activeTab === "email" && /* @__PURE__ */ (void 0)("div", {
						className: "flex flex-col h-full max-w-4xl mx-auto bg-card rounded-2xl p-5 border border-border/60 subtle-shadow",
						children: [
							/* @__PURE__ */ (void 0)("div", {
								className: "flex items-center justify-between mb-6",
								children: [/* @__PURE__ */ (void 0)("h3", {
									className: "text-sm font-bold text-foreground flex items-center gap-2",
									children: [/* @__PURE__ */ (void 0)(Mail, {
										size: 16,
										className: "text-brand"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 983,
										columnNumber: 17
									}, this), " Email Drafter"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 982,
									columnNumber: 15
								}, this), outreach.status === "Saved" && /* @__PURE__ */ (void 0)("button", {
									onClick: onMarkContacted,
									className: "flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-xl text-sm font-semibold hover:bg-brand/20 transition-colors border border-brand/20",
									children: [/* @__PURE__ */ (void 0)(Check, { size: 14 }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 990,
										columnNumber: 19
									}, this), " Mark as Contacted"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 986,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 981,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex-1 flex flex-col gap-4",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground",
										children: "Subject"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 997,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("input", {
										value: emailSubject,
										onChange: (e) => setEmailSubject(e.target.value),
										placeholder: "Compelling subject line...",
										className: "w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm font-semibold transition-colors"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 1e3,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 996,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex-1 flex flex-col space-y-1.5 min-h-[300px]",
									children: [/* @__PURE__ */ (void 0)("label", {
										className: "text-xs font-bold uppercase tracking-wider text-muted-foreground flex justify-between",
										children: ["Message Body", /* @__PURE__ */ (void 0)("span", {
											className: "normal-case text-muted-foreground/60 font-medium",
											children: "Use personalized details for best results"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 1011,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 1009,
										columnNumber: 17
									}, this), /* @__PURE__ */ (void 0)("textarea", {
										value: emailBody,
										onChange: (e) => setEmailBody(e.target.value),
										placeholder: "Write your outreach message here...",
										className: "w-full flex-1 p-4 bg-muted/30 border border-border/50 rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm leading-relaxed resize-y custom-scrollbar"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 1015,
										columnNumber: 17
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 1008,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 995,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (void 0)("div", {
								className: "flex flex-wrap items-center justify-between mt-6 pt-4 border-t border-border/50 gap-4",
								children: [/* @__PURE__ */ (void 0)("p", {
									className: "text-xs text-muted-foreground",
									children: "Branzly does not send emails automatically. Copy and send via your client."
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 1025,
									columnNumber: 15
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (void 0)("button", {
											onClick: () => {
												navigator.clipboard.writeText(`${emailSubject}\n\n${emailBody}`);
												toast.success("Copied to clipboard!");
											},
											className: "px-4 py-2.5 bg-background border border-border rounded-xl text-sm font-semibold hover:bg-muted transition-colors",
											children: "Copy Content"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 1030,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("button", {
											onClick: () => onSaveEmail(emailSubject, emailBody),
											disabled: emailSubject === outreach.email_subject && emailBody === outreach.email_body,
											className: "flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-semibold hover:bg-muted/80 transition-colors disabled:opacity-50",
											children: [/* @__PURE__ */ (void 0)(Save, { size: 16 }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 1049,
												columnNumber: 19
											}, this), " Save Draft"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 1041,
											columnNumber: 17
										}, this),
										/* @__PURE__ */ (void 0)("a", {
											href: `mailto:${outreach.brand?.email || ""}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
											className: "flex items-center gap-2 px-5 py-2.5 bg-brand text-brand-foreground rounded-xl text-sm font-semibold hover:bg-brand/90 transition-colors shadow-sm",
											children: [/* @__PURE__ */ (void 0)(Send, { size: 16 }, void 0, false, {
												fileName: _jsxFileName$1,
												lineNumber: 1055,
												columnNumber: 19
											}, this), " Open Mail Client"]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 1051,
											columnNumber: 17
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 1029,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 1024,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 980,
						columnNumber: 11
					}, this),
					activeTab === "history" && /* @__PURE__ */ (void 0)("div", {
						className: "max-w-3xl mx-auto",
						children: activityQuery.isLoading ? /* @__PURE__ */ (void 0)("div", {
							className: "flex justify-center p-8",
							children: /* @__PURE__ */ (void 0)("div", { className: "w-6 h-6 animate-spin rounded-full border-2 border-brand border-t-transparent" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 1066,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 1065,
							columnNumber: 15
						}, this) : activityQuery.data?.length === 0 ? /* @__PURE__ */ (void 0)("div", {
							className: "text-center p-12 bg-card rounded-2xl border border-border/60",
							children: /* @__PURE__ */ (void 0)("p", {
								className: "text-muted-foreground",
								children: "No activity recorded yet."
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 1070,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 1069,
							columnNumber: 15
						}, this) : /* @__PURE__ */ (void 0)("div", {
							className: "relative pl-6 space-y-8 before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-border/60",
							children: activityQuery.data?.map((activity) => /* @__PURE__ */ (void 0)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "absolute -left-6 top-1 w-6 h-6 rounded-full bg-background border-2 border-muted flex items-center justify-center",
									children: /* @__PURE__ */ (void 0)("div", { className: `w-2.5 h-2.5 rounded-full ${activity.activity_type === "status_changed" ? "bg-brand" : activity.activity_type === "contacted" ? "bg-green-500" : activity.activity_type === "created" ? "bg-blue-500" : "bg-muted-foreground"}` }, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 1079,
										columnNumber: 23
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 1078,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("div", {
									className: "pl-4",
									children: [/* @__PURE__ */ (void 0)("p", {
										className: "text-xs text-muted-foreground font-medium mb-1",
										children: new Date(activity.created_at).toLocaleString(void 0, {
											month: "short",
											day: "numeric",
											hour: "numeric",
											minute: "2-digit"
										})
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 1092,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "bg-card p-4 rounded-2xl border border-border/60 subtle-shadow",
										children: activity.activity_type === "status_changed" ? /* @__PURE__ */ (void 0)("p", {
											className: "text-sm text-foreground",
											children: [
												"Status changed from",
												" ",
												/* @__PURE__ */ (void 0)("span", {
													className: "font-semibold",
													children: activity.old_status
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 1107,
													columnNumber: 29
												}, this),
												" ",
												"to",
												" ",
												/* @__PURE__ */ (void 0)("span", {
													className: "font-semibold text-brand",
													children: activity.new_status
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 1111,
													columnNumber: 29
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 1105,
											columnNumber: 27
										}, this) : activity.activity_type === "contacted" ? /* @__PURE__ */ (void 0)("p", {
											className: "text-sm font-semibold text-foreground",
											children: "Marked as Contacted"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 1116,
											columnNumber: 27
										}, this) : activity.activity_type === "created" ? /* @__PURE__ */ (void 0)("p", {
											className: "text-sm font-semibold text-foreground",
											children: "Outreach Started"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 1120,
											columnNumber: 27
										}, this) : /* @__PURE__ */ (void 0)("p", {
											className: "text-sm text-foreground",
											children: activity.description
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 1124,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 1103,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 1091,
									columnNumber: 21
								}, this)]
							}, activity.id, true, {
								fileName: _jsxFileName$1,
								lineNumber: 1077,
								columnNumber: 19
							}, this))
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 1075,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 1063,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 868,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 784,
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
		defaultSelectedId: brandId || null
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 22,
		columnNumber: 10
	}, this);
}
//#endregion
export { OutreachPage as component };
