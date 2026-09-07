import { n as __toESM } from "../_runtime.mjs";
import { n as applyTheme, r as getStoredTheme } from "./theme-CR89hFV8.mjs";
import { s as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as Sun, h as Moon } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ThemeToggle-tU4ZwfEw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/components/ThemeToggle.tsx";
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
		className: "p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center justify-center",
		onClick: toggle,
		"aria-label": `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
		title: `Switch to ${theme === "dark" ? "light" : "dark"} theme`,
		children: theme === "dark" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { size: 18 }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 25,
			columnNumber: 27
		}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { size: 18 }, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 25,
			columnNumber: 47
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 19,
		columnNumber: 5
	}, this);
}
//#endregion
export { ThemeToggle as t };
