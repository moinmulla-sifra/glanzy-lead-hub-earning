import { n as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BEO93jmY.mjs";
import { r as useQuery, s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { O as LoaderCircle, X as ArrowLeft, m as Shield } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D4_rF0kL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
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
	if (!userId || profileQuery.isLoading) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "w-8 h-8 animate-spin text-brand" }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 37,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 36,
		columnNumber: 12
	}, this);
	if (!(profileQuery.data?.account_type === "admin")) return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "flex flex-col items-center justify-center min-h-screen text-center p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Shield, { className: "w-8 h-8 text-destructive" }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 46,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 45,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
				className: "text-2xl font-bold text-foreground mb-2",
				children: "Access Denied"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 48,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
				className: "text-muted-foreground mb-6",
				children: "You do not have permission to access the admin portal."
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 51,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/discover",
				className: "flex items-center gap-2 text-sm font-semibold text-brand hover:underline",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { size: 16 }, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 11
				}, this), " Return to Dashboard"]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 54,
				columnNumber: 9
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 44,
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
						lineNumber: 63,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 62,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "font-bold text-lg",
					children: "Branzly Admin"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 65,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 61,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
				to: "/discover",
				className: "text-sm font-semibold text-muted-foreground hover:text-foreground",
				children: "Exit Admin"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 67,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 60,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "p-8 max-w-6xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
					className: "text-3xl font-bold mb-6",
					children: "Platform Administration"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 73,
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
								lineNumber: 77,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-bold",
								children: "---"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 80,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 76,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-muted-foreground uppercase mb-1",
								children: "Total Brands"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 83,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-bold",
								children: "---"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 86,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 82,
							columnNumber: 11
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "bg-card border border-border/50 rounded-2xl p-6 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-sm font-semibold text-muted-foreground uppercase mb-1",
								children: "Active Subscriptions"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 89,
								columnNumber: 13
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-3xl font-bold",
								children: "---"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 92,
								columnNumber: 13
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 88,
							columnNumber: 11
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 75,
					columnNumber: 9
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "bg-card border border-border/50 rounded-2xl p-8 text-center text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Admin tools are currently in development. Database operations should be performed via the Supabase Dashboard until the internal admin suite is ready." }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 97,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 96,
					columnNumber: 9
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 72,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 59,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminPage as component };
