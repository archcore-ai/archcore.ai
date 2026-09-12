import { i18n } from "@lingui/core";

// English has no runtime catalog on purpose. The Lingui macro is configured
// with `stripMessageField: false` (see astro.config.mjs), so every `Trans` and
// `msg` carries its English source inline and Lingui falls back to it when the
// active catalog has no entry for the id. Loading the compiled English catalog
// here would instead put every page's copy into the first chunk the browser
// downloads. Russian still ships as a catalog, loaded on demand below.
i18n.load("en", {});
i18n.activate("en");

export type SupportedLocale = "en" | "ru";

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  ru: "Русский",
};

let activation = 0;

export async function activateLocale(locale: SupportedLocale) {
  const request = ++activation;
  const catalog =
    locale === "en"
      ? { messages: {} }
      : await import("./locales/ru/messages.ts");
  if (request !== activation) return;
  i18n.load(locale, catalog.messages);
  i18n.activate(locale);
}

export { detectLocale, saveLocale } from "./lib/locale";
