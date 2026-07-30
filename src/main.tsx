import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import { initTheme } from "./lib/init-theme";
import App from "./App";
import { setupAnalytics } from "./lib/analytics";
import { detectLocale } from "./i18n";
import { LocaleProvider } from "./hooks/use-locale";

initTheme();

// Automatic instrumentation (link, scroll, section, copy tracking) is wired
// synchronously; posthog-js itself is dynamically imported after the first
// interaction so it never competes with first paint. Locale is read directly
// rather than through LocaleProvider, which resolves it asynchronously and
// would miss the initial pageview.
setupAnalytics({
  site: "landing",
  key: import.meta.env.VITE_PUBLIC_POSTHOG_KEY,
  host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  locale: detectLocale(),
  debug: import.meta.env.DEV,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </StrictMode>
);
