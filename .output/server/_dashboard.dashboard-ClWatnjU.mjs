import { t as supabase } from "./_ssr/supabase-BEO93jmY.mjs";
import { r as useQuery } from "./_libs/react+tanstack__react-query.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "./_libs/react.mjs";
import { L as Compass, c as TrendingUp, f as Sparkles, g as Send, q as Bookmark } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_dashboard.dashboard-ClWatnjU.js
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/_dashboard.dashboard.tsx?tsr-split=component";
function DashboardOverview() {
	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const { data: sessionData } = await supabase.auth.getSession();
			if (!sessionData.session) return null;
			const { data } = await supabase.from("profiles").select("*").eq("id", sessionData.session.user.id).single();
			return data;
		}
	});
	const { data: workspace } = useQuery({
		queryKey: ["active-workspace"],
		queryFn: async () => {
			const { data: sessionData } = await supabase.auth.getSession();
			if (!sessionData.session) return null;
			const { data: members } = await supabase.from("workspace_members").select("workspace_id").eq("user_id", sessionData.session.user.id);
			if (!members || members.length === 0) return null;
			const { data } = await supabase.from("workspaces").select("*").eq("id", members[0].workspace_id).single();
			return data;
		}
	});
	const { data: counts } = useQuery({
		queryKey: ["dashboard-counts"],
		queryFn: async () => {
			const { data: sessionData } = await supabase.auth.getSession();
			if (!sessionData.session) return {
				saved: 0,
				outreach: 0
			};
			const { count: savedCount } = await supabase.from("saved_brands").select("*", {
				count: "exact",
				head: true
			});
			const { count: outreachCount } = await supabase.from("outreach").select("*", {
				count: "exact",
				head: true
			});
			return {
				saved: savedCount || 0,
				outreach: outreachCount || 0
			};
		}
	});
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "space-y-8 animate-in fade-in duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex flex-col md:flex-row justify-between items-start md:items-center gap-4",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl font-bold tracking-tight text-foreground",
					children: ["Welcome back, ", profile?.full_name?.split(" ")[0] || "there"]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 73,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
					className: "text-muted-foreground mt-1",
					children: workspace ? `Active Workspace: ${workspace.name}` : "Here's what's happening today."
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 76,
					columnNumber: 11
				}, this)] }, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 72,
					columnNumber: 9
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 71,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "w-5 h-5 text-brand" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 86,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 85,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-semibold text-foreground",
									children: "Discover"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 88,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 84,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-bold mb-1",
								children: "New"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 90,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: "Opportunities waiting"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 91,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 83,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Bookmark, { className: "w-5 h-5 text-blue-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 97,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 96,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-semibold text-foreground",
									children: "Saved Brands"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 99,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 95,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-bold mb-1",
								children: counts?.saved || 0
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 101,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: "In your pipeline"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 102,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 94,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "w-5 h-5 text-green-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 108,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 107,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-semibold text-foreground",
									children: "Active Outreach"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 110,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 106,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-bold mb-1",
								children: counts?.outreach || 0
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 112,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: "Ongoing conversations"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 113,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 105,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-3 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TrendingUp, { className: "w-5 h-5 text-purple-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 119,
										columnNumber: 15
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 118,
									columnNumber: 13
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
									className: "font-semibold text-foreground",
									children: "Profile"
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 121,
									columnNumber: 13
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 117,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "text-2xl font-bold mb-1",
								children: profile?.onboarding_completed ? "100%" : "50%"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 123,
								columnNumber: 11
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-sm text-muted-foreground",
								children: "Completion"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 126,
								columnNumber: 11
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 116,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 82,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "bg-card border border-border/50 rounded-2xl p-12 text-center shadow-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Compass, { className: "w-8 h-8 text-brand" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 132,
							columnNumber: 11
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 131,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
						className: "text-2xl font-bold text-foreground mb-3",
						children: "Your Branzly workspace is ready."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 134,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-muted-foreground mb-8 max-w-md mx-auto text-lg",
						children: "Start discovering brands that match your niche, save them to your pipeline, and manage your outreach."
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 137,
						columnNumber: 9
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-col sm:flex-row items-center justify-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
							to: "/discover",
							className: "w-full sm:w-auto bg-brand text-brand-foreground font-semibold rounded-xl px-8 py-3 hover:bg-brand/90 transition-all shadow-lg shadow-brand/20",
							children: "Discover Brands"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 142,
							columnNumber: 11
						}, this), !profile?.onboarding_completed && /* @__PURE__ */ (void 0)(Link, {
							to: "/onboarding",
							className: "w-full sm:w-auto bg-muted text-foreground font-semibold rounded-xl px-8 py-3 hover:bg-muted/80 transition-colors",
							children: "Complete Your Profile"
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 145,
							columnNumber: 46
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 141,
						columnNumber: 9
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 130,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 70,
		columnNumber: 10
	}, this);
}
//#endregion
export { DashboardOverview as component };
