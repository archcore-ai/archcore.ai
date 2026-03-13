type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export function initTheme() {
  const stored = (localStorage.getItem("theme") as Theme) || "system";
  const resolved = stored === "system" ? getSystemTheme() : stored;
  applyTheme(resolved);

  // Listen for system preference changes when using system theme
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", () => {
    const current = (localStorage.getItem("theme") as Theme) || "system";
    if (current === "system") {
      applyTheme(getSystemTheme());
    }
  });
}
