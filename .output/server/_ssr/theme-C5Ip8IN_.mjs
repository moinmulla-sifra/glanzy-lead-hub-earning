//#region node_modules/.nitro/vite/services/ssr/assets/theme-C5Ip8IN_.js
var THEME_KEY = "branzly-theme";
function getStoredTheme() {
	if (typeof window === "undefined") return "system";
	const stored = window.localStorage.getItem(THEME_KEY);
	if (stored === "dark" || stored === "light") return stored;
	return "system";
}
function applyTheme(theme) {
	if (typeof document === "undefined") return;
	window.localStorage.setItem(THEME_KEY, theme);
	if (theme === "system") {
		const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		document.documentElement.setAttribute("data-theme", systemIsDark ? "dark" : "light");
	} else document.documentElement.setAttribute("data-theme", theme);
	window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
}
var THEME_INIT_SCRIPT = `
try {
  var t = localStorage.getItem('${THEME_KEY}');
  if (t === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else if (t === 'system') {
    var sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.setAttribute('data-theme', sysDark ? 'dark' : 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
} catch (e) {
  document.documentElement.setAttribute('data-theme', 'dark');
}
`;
//#endregion
export { applyTheme as n, getStoredTheme as r, THEME_INIT_SCRIPT as t };
