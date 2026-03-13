import { i18n } from "@lingui/core";

export type SupportedLocale = "en" | "ru";

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  ru: "Русский",
};

export async function activateLocale(locale: SupportedLocale) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { messages } = await import(`./locales/${locale}/messages.ts`);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  i18n.load(locale, messages);
  i18n.activate(locale);
}

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
  const stored = localStorage.getItem("locale") as SupportedLocale | null;
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
  localStorage.setItem("locale", locale);
}
