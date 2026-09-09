import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-CzmrzPTc.mjs";
import { a as useQueryClient, n as useMutation, r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { J as Clock, N as LoaderCircle, X as CircleCheck, Y as CirclePlay, Z as CircleAlert, _ as Shield, ct as Activity, et as ChartNoAxesColumnIncreasing, st as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as triggerAutomatedResearch } from "./actions-D_qEAOyJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BvQuhloB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$1 = "/app/applet/src/components/AdminResearchView.tsx";
function AdminResearchView() {
	const queryClient = useQueryClient();
	const [isTriggering, setIsTriggering] = (0, import_react.useState)(false);
	const configQuery = useQuery({
		queryKey: ["admin_research_config"],
		queryFn: async () => {
			const { data, error } = await supabase.from("app_config").select("value").eq("key", "research_scheduler").single();
			if (error && error.code !== "PGRST116") throw error;
			return data?.value || {
				enabled: true,
				frequency: "hourly",
				target_per_run: 6
			};
		}
	});
	const toggleMutation = useMutation({
		mutationFn: async (currentConfig) => {
			const newConfig = {
				...currentConfig,
				enabled: !currentConfig.enabled
			};
			const { error } = await supabase.from("app_config").upsert({
				key: "research_scheduler",
				value: newConfig
			});
			if (error) throw error;
			return newConfig;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["admin_research_config"] });
			toast.success("Scheduler configuration updated");
		}
	});
	const triggerMutation = useMutation({
		mutationFn: async () => {
			const { data: { session } } = await supabase.auth.getSession();
			const token = session?.access_token || "";
			return await triggerAutomatedResearch({ data: { token } });
		},
		onMutate: () => setIsTriggering(true),
		onSuccess: (result) => {
			setIsTriggering(false);
			if (result.status === "completed") toast.success(`Run complete: ${result.newLeads} new leads found (Duplicates: ${result.duplicates}, Rejected: ${result.rejected})`);
			else if (result.status === "locked") toast.error("An automated job is already running");
			else if (result.status === "disabled") toast.error("Scheduler is disabled");
			else if (result.status === "empty_queue") toast.error("No active topics in queue");
			else toast.error(result.error || "Run failed");
			queryClient.invalidateQueries({ queryKey: ["admin_research_jobs"] });
		},
		onError: (err) => {
			setIsTriggering(false);
			toast.error(err.message || "Failed to trigger run");
		}
	});
	const jobsQuery = useQuery({
		queryKey: ["admin_research_jobs"],
		queryFn: async () => {
			const { data, error } = await supabase.from("research_jobs").select("*").order("created_at", { ascending: false }).limit(100);
			if (error) throw error;
			return data;
		}
	});
	if (jobsQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex items-center justify-center p-12",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" }, void 0, false, {
			fileName: _jsxFileName$1,
			lineNumber: 102,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 101,
		columnNumber: 7
	}, this);
	const jobs = jobsQuery.data || [];
	const totalJobs = jobs.length;
	const totalLeadsFound = jobs.reduce((acc, job) => acc + (job.result_count || 0), 0);
	const providerStats = jobs.reduce((acc, job) => {
		const p = job.provider || "unknown";
		if (!acc[p]) acc[p] = {
			total: 0,
			failed: 0
		};
		acc[p].total++;
		if (job.status === "failed") acc[p].failed++;
		return acc;
	}, {});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card rounded-xl border p-6 flex flex-col justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-semibold mb-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CirclePlay, { className: "w-5 h-5 text-brand" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 131,
							columnNumber: 15
						}, this), "Automated Hourly Engine"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 130,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-sm text-muted-foreground mb-4",
						children: "Discovers up to 6 new qualified brand leads every hour (144/day). Uses a rotated queue of research queries."
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 134,
						columnNumber: 13
					}, this)] }, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 129,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => triggerMutation.mutate(),
							disabled: isTriggering || !configQuery.data?.enabled,
							className: "bg-brand text-brand-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-brand/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
							children: [isTriggering ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-4 h-4 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 146,
								columnNumber: 17
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CirclePlay, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 148,
								columnNumber: 17
							}, this), "Run Engine Now"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 140,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							onClick: () => toggleMutation.mutate(configQuery.data),
							disabled: configQuery.isLoading,
							className: "border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 rounded-md text-sm font-medium",
							children: configQuery.data?.enabled ? "Pause Scheduler" : "Enable Scheduler"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 152,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 139,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 128,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card rounded-xl border p-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "font-semibold mb-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Clock, { className: "w-5 h-5 text-muted-foreground" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 166,
							columnNumber: 13
						}, this), "Engine Configuration"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 165,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-3 mt-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-between border-b pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "Status"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 171,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium",
									children: configQuery.data?.enabled ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-green-500 flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 175,
											columnNumber: 21
										}, this), " Active"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 174,
										columnNumber: 19
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "text-destructive flex items-center gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleAlert, { className: "w-4 h-4" }, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 179,
											columnNumber: 21
										}, this), " Paused"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 178,
										columnNumber: 19
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 172,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 170,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-between border-b pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "Frequency"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 185,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium capitalize",
									children: configQuery.data?.frequency || "Hourly"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 186,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 184,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex justify-between pb-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-muted-foreground",
									children: "Target Leads/Run"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 191,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "font-medium",
									children: [configQuery.data?.target_per_run || 6, " leads"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 192,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 190,
								columnNumber: 13
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 169,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 164,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 127,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card rounded-xl border p-6 flex flex-col items-center justify-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
							className: "text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Activity, { className: "w-4 h-4" }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 203,
								columnNumber: 13
							}, this), " Total Leads Found"]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 202,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-5xl font-bold text-brand my-2",
							children: totalLeadsFound
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 205,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "text-xs text-muted-foreground",
							children: [
								"from recent ",
								totalJobs,
								" jobs"
							]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 208,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 201,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card rounded-xl border p-6 col-span-1 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
						className: "text-sm font-medium text-muted-foreground mb-4 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartNoAxesColumnIncreasing, { className: "w-4 h-4" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 215,
							columnNumber: 13
						}, this), " Provider Performance (Recent)"]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 214,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
						children: [Object.entries(providerStats).map(([provider, stats]) => {
							const failRate = stats.total > 0 ? Math.round(stats.failed / stats.total * 100) : 0;
							return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "bg-secondary/50 rounded-lg p-4 border flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "font-semibold capitalize",
									children: provider
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 230,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-xs text-muted-foreground",
									children: [stats.total, " total runs"]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 231,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 229,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `font-bold text-lg ${failRate > 20 ? "text-destructive" : "text-green-500"}`,
										children: [failRate, "%"]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 236,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-xs text-muted-foreground",
										children: "failure rate"
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 241,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$1,
									lineNumber: 235,
									columnNumber: 21
								}, this)]
							}, provider, true, {
								fileName: _jsxFileName$1,
								lineNumber: 225,
								columnNumber: 19
							}, this);
						}), Object.keys(providerStats).length === 0 && /* @__PURE__ */ (void 0)("div", {
							className: "text-sm text-muted-foreground",
							children: "No provider data available"
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 250,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 217,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 213,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 200,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex justify-between items-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
					className: "text-xl font-bold",
					children: "Research Jobs History"
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 259,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "text-sm text-muted-foreground",
					children: [jobs.length, " recent jobs"]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 260,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 258,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-card rounded-xl border overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", {
						className: "w-full text-sm text-left",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", {
							className: "bg-muted/50 text-muted-foreground uppercase text-[10px] font-bold tracking-wider",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-4",
									children: "Job ID"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 270,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-4",
									children: "Type"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 271,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-4",
									children: "Provider"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 272,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-4",
									children: "Status"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 273,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-4",
									children: "Results"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 274,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", {
									className: "px-6 py-4",
									children: "Created"
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 275,
									columnNumber: 17
								}, this)
							] }, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 269,
								columnNumber: 15
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 268,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", {
							className: "divide-y divide-border",
							children: [jobs.map((job) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", {
								className: "hover:bg-muted/50 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 font-mono text-xs",
										title: job.id,
										children: [job.id.substring(0, 8), "..."]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 284,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 font-medium",
										children: job.research_type
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 287,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs",
											children: job.provider || "unknown"
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 289,
											columnNumber: 21
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 288,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-2",
											children: [
												job.status === "completed" && /* @__PURE__ */ (void 0)(CircleCheck, { className: "w-4 h-4 text-green-500" }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 296,
													columnNumber: 25
												}, this),
												job.status === "failed" && /* @__PURE__ */ (void 0)(CircleAlert, { className: "w-4 h-4 text-destructive" }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 299,
													columnNumber: 25
												}, this),
												job.status === "running" && /* @__PURE__ */ (void 0)(CirclePlay, { className: "w-4 h-4 text-brand animate-pulse" }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 302,
													columnNumber: 25
												}, this),
												job.status === "queued" && /* @__PURE__ */ (void 0)(Clock, { className: "w-4 h-4 text-muted-foreground" }, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 305,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "capitalize",
													children: job.status
												}, void 0, false, {
													fileName: _jsxFileName$1,
													lineNumber: 307,
													columnNumber: 23
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName$1,
											lineNumber: 294,
											columnNumber: 21
										}, this), job.error && /* @__PURE__ */ (void 0)("div", {
											className: "text-xs text-destructive mt-1 max-w-xs truncate",
											title: job.error,
											children: job.error
										}, void 0, false, {
											fileName: _jsxFileName$1,
											lineNumber: 310,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$1,
										lineNumber: 293,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4",
										children: job.result_count
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 318,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", {
										className: "px-6 py-4 text-muted-foreground",
										children: new Date(job.created_at).toLocaleString()
									}, void 0, false, {
										fileName: _jsxFileName$1,
										lineNumber: 319,
										columnNumber: 19
									}, this)
								]
							}, job.id, true, {
								fileName: _jsxFileName$1,
								lineNumber: 280,
								columnNumber: 17
							}, this)), jobs.length === 0 && /* @__PURE__ */ (void 0)("tr", { children: /* @__PURE__ */ (void 0)("td", {
								colSpan: 6,
								className: "px-6 py-8 text-center text-muted-foreground",
								children: "No research jobs found"
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 326,
								columnNumber: 19
							}, this) }, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 325,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 278,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$1,
						lineNumber: 267,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 266,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 265,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 126,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/admin.tsx?tsr-split=component";
function AdminPage() {
	const navigate = useNavigate();
	const [userId, setUserId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (!data.session) navigate({
				to: "/auth",
				replace: true
			});
			else setUserId(data.session.user.id);
		});
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
	const makeAdminMutation = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("profiles").update({ account_type: "admin" }).eq("id", userId);
			if (error) throw error;
		},
		onSuccess: () => {
			profileQuery.refetch();
		}
	});
	const isAdmin = profileQuery.data?.account_type === "admin";
	const statsQuery = useQuery({
		queryKey: ["admin_stats"],
		enabled: !!isAdmin,
		queryFn: async () => {
			const [users, brands] = await Promise.all([supabase.from("profiles").select("id", {
				count: "exact",
				head: true
			}), supabase.from("brands").select("id", {
				count: "exact",
				head: true
			})]);
			return {
				users: users.count || 0,
				brands: brands.count || 0,
				subscriptions: 0
			};
		}
	});
	if (!userId || profileQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 70,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 69,
		columnNumber: 12
	}, this);
	if (!isAdmin) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col items-center justify-center min-h-screen text-center p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "w-8 h-8 text-destructive" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 76,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 75,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-2xl font-bold text-foreground mb-2",
				children: "Access Denied"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 78,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground mb-6",
				children: "You do not have permission to access the admin portal."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 81,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col gap-3 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/discover",
					className: "flex items-center gap-2 text-sm font-semibold text-brand hover:underline",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { size: 16 }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 86,
						columnNumber: 13
					}, this), " Return to Dashboard"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 85,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					onClick: () => makeAdminMutation.mutate(),
					disabled: makeAdminMutation.isPending,
					className: "text-xs text-muted-foreground underline mt-4 hover:text-foreground",
					children: makeAdminMutation.isPending ? "Updating..." : "Dev Bypass: Make me an admin"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 88,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 84,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 74,
		columnNumber: 12
	}, this);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "border-b border-border/50 bg-card p-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "w-8 h-8 rounded-lg bg-brand flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "text-white w-4 h-4" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 98,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 97,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "font-bold text-lg",
					children: "Branzly Admin"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 100,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 96,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/discover",
				className: "text-sm font-semibold text-muted-foreground hover:text-foreground",
				children: "Exit Admin"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 102,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 95,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "p-8 max-w-6xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl font-bold mb-6",
					children: "Platform Administration"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 108,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-muted-foreground uppercase mb-1",
								children: "Total Users"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 112,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-bold",
								children: statsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-6 h-6 animate-spin text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 116,
									columnNumber: 39
								}, this) : statsQuery.data?.users || 0
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 115,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 111,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-muted-foreground uppercase mb-1",
								children: "Total Brands"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 120,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-bold",
								children: statsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-6 h-6 animate-spin text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 124,
									columnNumber: 39
								}, this) : statsQuery.data?.brands || 0
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 119,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-muted-foreground uppercase mb-1",
								children: "Active Subscriptions"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 128,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-bold",
								children: statsQuery.isLoading ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-6 h-6 animate-spin text-muted-foreground" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 132,
									columnNumber: 39
								}, this) : statsQuery.data?.subscriptions || 0
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 131,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 127,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 110,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminResearchView, {}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 137,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 107,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 94,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminPage as component };
