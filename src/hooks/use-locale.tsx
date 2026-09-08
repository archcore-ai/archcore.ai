import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { activateLocale, type SupportedLocale } from "@/i18n";
import {
  initializeSiteLocale,
  setSiteLocale,
  SITE_LOCALE_EVENT,
} from "@/lib/site-locale";

interface LocaleContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  isLoading: boolean;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>("en");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let active = true;
    let request = 0;
    const syncContent = async (next: SupportedLocale) => {
      const pending = ++request;
      setIsLoading(true);
      await activateLocale(next);
      if (!active || pending !== request) return;
      setLocaleState(next);
      document.documentElement.lang = next;
      setIsLoading(false);
    };
    const change = (event: Event) => {
      void syncContent((event as CustomEvent<SupportedLocale>).detail);
    };
    window.addEventListener(SITE_LOCALE_EVENT, change);
    void syncContent(initializeSiteLocale());
    return () => {
      active = false;
      window.removeEventListener(SITE_LOCALE_EVENT, change);
    };
  }, []);

  const setLocale = useCallback((next: SupportedLocale) => {
    setSiteLocale(next);
  }, []);

  const contextValue = useMemo(
    () => ({ locale, setLocale, isLoading }),
    [locale, setLocale, isLoading]
  );

  return (
    <LocaleContext value={contextValue}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocaleContext>
  );
}

// The provider and hook share a private context; consumers are hydrated by Astro.
// eslint-disable-next-line react-refresh/only-export-components
export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
