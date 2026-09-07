export type Theme = "dark" | "light" | "system";
export const THEME_KEY = "branzly-theme";

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return "system";
}

export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  
  window.localStorage.setItem(THEME_KEY, theme);
  
  if (theme === "system") {
    const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", systemIsDark ? "dark" : "light");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
  
  window.dispatchEvent(new CustomEvent("theme-change", { detail: theme }));
}

export const THEME_INIT_SCRIPT = `
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
