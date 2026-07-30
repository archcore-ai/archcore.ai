import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import { initTheme } from "./lib/init-theme";
import App from "./App";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { LocaleProvider } from "./hooks/use-locale";

initTheme();

// PostHog init is deferred until the first interaction (or a 4s idle
// fallback) so analytics never competes with first paint. The provider
// receives the shared client up front, so no remount happens when init
// runs, and pageview capture fires on init — the visit is still recorded.
function initAnalyticsOnce() {
  if (posthog.__loaded) return;
  posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: "2025-11-30",
  });
}

if (!import.meta.env.DEV) {
  const events = ["pointerdown", "keydown", "scroll"] as const;
  const start = () => {
    events.forEach((e) => removeEventListener(e, start));
    clearTimeout(idleTimer);
    initAnalyticsOnce();
  };
  events.forEach((e) =>
    addEventListener(e, start, { once: true, passive: true }),
  );
  const idleTimer = setTimeout(start, 4000);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </PostHogProvider>
  </StrictMode>
);
