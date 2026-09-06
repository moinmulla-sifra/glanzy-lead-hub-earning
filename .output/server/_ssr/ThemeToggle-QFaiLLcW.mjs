import { n as __toESM } from "../_runtime.mjs";
import { n as applyTheme, r as getStoredTheme } from "./theme-BLPgvjo-.mjs";
import { a as require_react, i as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ThemeToggle-QFaiLLcW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var supabase = createClient({
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
}["VITE_SUPABASE_URL"] ?? "https://rdelzqnhduaudjouadvf.supabase.co", {
	"BASE_URL": "/",
	"DEV": false,
	"MODE": "production",
	"PROD": true,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/"
}["VITE_SUPABASE_PUBLISHABLE_KEY"] ?? "sb_publishable_WxqnrdckUqI1zABQEANC9g__Q1PyiMY", { auth: {
	persistSession: true,
	autoRefreshToken: true,
	detectSessionInUrl: true,
	storageKey: "glanzy-auth"
} });
function ThemeToggle() {
	const [theme, setTheme] = (0, import_react.useState)("dark");
	(0, import_react.useEffect)(() => {
		setTheme(getStoredTheme());
	}, []);
	function toggle() {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		applyTheme(next);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "btn secondary",
		onClick: toggle,
		"aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
		title: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
		children: theme === "dark" ? "☾ Dark" : "☀ Light"
	});
}
//#endregion
export { supabase as n, ThemeToggle as t };
