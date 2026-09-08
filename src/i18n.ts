import { i18n } from "@lingui/core";
import { messages } from "./locales/en/messages";

i18n.load("en", messages);
i18n.activate("en");

export type SupportedLocale = "en" | "ru";

export const LOCALE_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  ru: "Русский",
};

export async function activateLocale(locale: SupportedLocale) {
  const catalog =
    locale === "en" ? { messages } : await import("./locales/ru/messages.ts");
  i18n.load(locale, catalog.messages);
  i18n.activate(locale);
}

export { detectLocale, saveLocale } from "./lib/locale";
