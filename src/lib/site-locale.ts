import type { SupportedLocale } from "../i18n";
import { detectLocale, saveLocale } from "./locale";
import { registerSuperProperties, track } from "./analytics";

export const SITE_LOCALE_EVENT = "archcore:locale-change";
let current: SupportedLocale | undefined;

function updateChrome(locale: SupportedLocale) {
  document
    .querySelectorAll<HTMLSelectElement>("[data-locale-select]")
    .forEach((select) => {
      select.value = locale;
      select.disabled = false;
    });
  document
    .querySelectorAll<HTMLElement>("[data-en][data-ru]")
    .forEach((node) => {
      node.textContent =
        (locale === "ru" ? node.dataset.ru : node.dataset.en) ??
        node.textContent;
    });
  document
    .querySelectorAll<HTMLElement>("[data-en-label][data-ru-label]")
    .forEach((node) => {
      const label =
        locale === "ru" ? node.dataset.ruLabel : node.dataset.enLabel;
      if (label) {
        node.setAttribute("aria-label", label);
        node.title = label;
      }
    });
  // English-only content keeps html[lang=en]; chrome declares its own language.
  document
    .querySelectorAll<HTMLElement>(".site-header, .site-footer")
    .forEach((node) => {
      node.lang = locale;
    });
}

export function setSiteLocale(locale: SupportedLocale) {
  const previous = current;
  current = locale;
  saveLocale(locale);
  updateChrome(locale);
  if (previous && previous !== locale) {
    track("locale_switched", { from: previous, to: locale });
    registerSuperProperties({ locale });
  }
  window.dispatchEvent(
    new CustomEvent<SupportedLocale>(SITE_LOCALE_EVENT, { detail: locale })
  );
}

export function initializeSiteLocale(): SupportedLocale {
  if (current) return current;
  current = detectLocale();
  const url = new URL(window.location.href);
  const queryLocale =
    url.searchParams.get("lang") || url.searchParams.get("locale");
  if (queryLocale === current) {
    saveLocale(current);
    url.searchParams.delete("lang");
    url.searchParams.delete("locale");
    window.history.replaceState(
      window.history.state,
      "",
      url.pathname + url.search + url.hash
    );
  }
  updateChrome(current);
  document
    .querySelectorAll<HTMLSelectElement>("[data-locale-select]")
    .forEach((select) => {
      select.addEventListener("change", () => {
        if (select.value === "en" || select.value === "ru")
          setSiteLocale(select.value);
      });
    });
  return current;
}
