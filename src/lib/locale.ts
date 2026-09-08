import type { SupportedLocale } from "../i18n";

function isValidLocale(value: string | null): value is SupportedLocale {
  return value === "en" || value === "ru";
}

export function detectLocale(): SupportedLocale {
  // 1. Check URL query parameter (?lang=en or ?locale=ru)
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get("lang") || urlParams.get("locale");
  if (isValidLocale(langParam)) {
    return langParam;
  }

  // 2. Check localStorage
  let stored: string | null = null;
  try {
    stored = localStorage.getItem("locale");
  } catch {
    /* Storage may be disabled. */
  }
  if (isValidLocale(stored)) {
    return stored;
  }

  // 3. Check browser language
  const browserLang = navigator.language.split("-")[0];
  if (browserLang === "ru") {
    return "ru";
  }

  // 4. Default to English
  return "en";
}

export function saveLocale(locale: SupportedLocale) {
  try {
    localStorage.setItem("locale", locale);
  } catch {
    /* The current page can still switch. */
  }
}
