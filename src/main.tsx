import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { initTheme } from "./lib/init-theme";
import App from "./App";
import { PostHogProvider } from "posthog-js/react";
import { LocaleProvider } from "./hooks/use-locale";

initTheme();

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-11-30",
  disabled: import.meta.env.DEV,
} as const;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </PostHogProvider>
  </StrictMode>
);
