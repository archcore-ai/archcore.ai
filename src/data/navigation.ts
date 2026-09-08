import { setupI18n, type MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { messages as enMessages } from "../locales/en/messages";
import { messages as ruMessages } from "../locales/ru/messages";
import { LINKS } from "../lib/links";

// Build-time translations for the Astro shell. React only switches the DOM labels.
const en = setupI18n({ locale: "en", messages: { en: enMessages } });
const ru = setupI18n({ locale: "ru", messages: { ru: ruMessages } });
export const label = (message: MessageDescriptor) => ({
  en: en._(message),
  ru: ru._(message),
});
const link = (href: string, message: MessageDescriptor) => ({
  href,
  ...label(message),
});

export const headerLinks = [
  link("/how-to-use/", msg`How to use`),
  link("/blog/", msg`Blog`),
  link("/learn/", msg`Learn`),
  link("/integrations/", msg`Integrations`),
  link(LINKS.docs, msg`Docs`),
];
export const primaryLinks = [
  link("/plugin/", msg`Plugin`),
  link("/cli/", msg`CLI`),
  ...headerLinks,
  { href: LINKS.org, en: "GitHub", ru: "GitHub" },
  link("/privacy/", msg`Privacy`),
];
export const referenceLinks = [
  link("/context-engineering/", msg`Context engineering`),
  link("/spec-driven-development/", msg`Spec-driven development`),
  link("/project-context/", msg`Project context`),
  link("/git-native-context/", msg`Git-native context`),
  { href: "/mcp/", en: "MCP", ru: "MCP" },
];
export const chromeLabels = {
  install: label(msg`Install`),
  menu: label(msg`Menu`),
  tagline: label(msg`Git-native context for AI coding agents.`),
};
