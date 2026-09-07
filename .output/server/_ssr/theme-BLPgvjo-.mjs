//#region node_modules/.nitro/vite/services/ssr/assets/theme-BLPgvjo-.js
var THEME_KEY = "glanzy-theme";
function getStoredTheme() {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem("glanzy-theme") === "light"
    ? "light"
    : "dark";
}
function applyTheme(theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(THEME_KEY, theme);
}
var THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${THEME_KEY}');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}`;
//#endregion
export { applyTheme as n, getStoredTheme as r, THEME_INIT_SCRIPT as t };
