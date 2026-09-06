export type Theme = "dark" | "light";

export const THEME_KEY = "glanzy-theme";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "light" ? "light" : "dark";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem(THEME_KEY, theme);
}

// Inlined in the document head so the correct theme paints before hydration.
export const THEME_INIT_SCRIPT = `try{var t=localStorage.getItem('${THEME_KEY}');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark');}catch(e){document.documentElement.setAttribute('data-theme','dark');}`;
