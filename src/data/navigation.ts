import { setupI18n, type MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { messages as enMessages } from "../locales/en/messages";
import { messages as ruMessages } from "../locales/ru/messages";
import { LINKS } from "../lib/links";

// Build-time translations for the shared Astro shell.
const en = setupI18n({ locale: "en", messages: { en: enMessages } });
const ru = setupI18n({ locale: "ru", messages: { ru: ruMessages } });
export const label = (message: MessageDescriptor) => ({
  en: en._(message),
  ru: ru._(message),
});
/**
 * A label whose sentence embeds a value that itself differs by language —
 * "Archcore and Serena" against «Archcore и Serena», say.
 */
export const labelWith = (
  message: (value: string) => MessageDescriptor,
  values: { en: string; ru: string }
) => ({ en: en._(message(values.en)), ru: ru._(message(values.ru)) });
const link = (href: string, message: MessageDescriptor) => ({
  href,
  ...label(message),
});

export const headerLinks = [
  link("/how-to-use/", msg`How to use`),
  link("/integrations/", msg`Integrations`),
  link(LINKS.docs, msg`Docs`),
  link("/blog/", msg`Blog`),
  link("/learn/", msg`Learn`),
];
export const primaryLinks = [
  link("/plugin/", msg`Plugin`),
  link("/cli/", msg`CLI`),
  ...headerLinks,
  { href: LINKS.org, en: "GitHub", ru: "GitHub" },
  link("/privacy/", msg`Privacy`),
];
export const chromeLabels = {
  star: label(msg`Star`),
  starLabel: label(msg`Star Archcore on GitHub`),
  install: label(msg`Install`),
  menu: label(msg`Menu`),
  tagline: label(msg`Git-native context for AI coding agents.`),
};

/**
 * The closing CTA, for the static pages that render it without a Lingui
 * runtime. The messages mirror src/components/closing-cta.tsx, so both resolve
 * to the same catalog entries.
 */
export const closingCtaLabels = {
  title: label(msg`Start with Archcore.`),
  description: label(msg`Keep your project decisions ready for the next task.`),
  primary: label(msg`Install Archcore →`),
  secondary: label(msg`See how it works`),
};
