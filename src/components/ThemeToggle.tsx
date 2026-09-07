import { useEffect, useState } from "react";
import { applyTheme, getStoredTheme, type Theme } from "@/lib/theme";
import { Moon, Sun, Monitor } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    setTheme(getStoredTheme());
    
    const handleThemeChange = (e: CustomEvent<Theme>) => {
      setTheme(e.detail);
    };
    
    window.addEventListener("theme-change", handleThemeChange as EventListener);
    return () => window.removeEventListener("theme-change", handleThemeChange as EventListener);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
    applyTheme(next);
  }

  return (
    <button
      className="p-2 rounded-lg bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center justify-center"
      onClick={toggle}
      aria-label={`Current theme: ${theme}. Click to change.`}
      title={`Current theme: ${theme}. Click to change.`}
    >
      {theme === "dark" ? <Moon size={18} /> : theme === "light" ? <Sun size={18} /> : <Monitor size={18} />}
    </button>
  );
}
