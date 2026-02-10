import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import {
  activateLocale,
  detectLocale,
  saveLocale,
  type SupportedLocale,
} from "@/i18n";

interface LocaleContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => Promise<void>;
  isLoading: boolean;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>("en");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initLocale = async () => {
      const detected = detectLocale();

      // Check if locale was detected from URL query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get("lang") || urlParams.get("locale");
      const isFromUrl = langParam === detected;

      // Save to localStorage if it came from URL
      if (isFromUrl) {
        saveLocale(detected);

        // Remove query parameter for cleaner URLs
        urlParams.delete("lang");
        urlParams.delete("locale");
        const newSearch = urlParams.toString();
        const newUrl =
          window.location.pathname + (newSearch ? `?${newSearch}` : "");
        window.history.replaceState({}, "", newUrl);
      }

      await activateLocale(detected);
      setLocaleState(detected);
      document.documentElement.lang = detected;
      setIsLoading(false);
    };

    void initLocale();
  }, []);

  const setLocale = async (newLocale: SupportedLocale) => {
    setIsLoading(true);
    await activateLocale(newLocale);
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
    saveLocale(newLocale);
    setIsLoading(false);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, isLoading }}>
      <I18nProvider i18n={i18n}>{children}</I18nProvider>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
