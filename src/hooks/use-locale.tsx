import { I18nProvider } from "@lingui/react";
import { i18n } from "@lingui/core";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import {
  activateLocale,
  detectLocale,
  saveLocale,
  type SupportedLocale,
} from "@/i18n";
import { registerSuperProperties, track } from "@/lib/analytics";

interface LocaleContextValue {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => Promise<void>;
  isLoading: boolean;
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>("en");
  const [isLoading, setIsLoading] = useState(true);
  const localeRef = useRef<SupportedLocale>("en");

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
      localeRef.current = detected;
      setLocaleState(detected);
      document.documentElement.lang = detected;
      setIsLoading(false);
    };

    void initLocale();
  }, []);

  const setLocale = useCallback(async (newLocale: SupportedLocale) => {
    setIsLoading(true);
    await activateLocale(newLocale);
    // Read through a ref rather than a state updater: an updater runs twice
    // under StrictMode and would double-count the switch.
    const previous = localeRef.current;
    if (previous !== newLocale) {
      track("locale_switched", { from: previous, to: newLocale });
      registerSuperProperties({ locale: newLocale });
    }
    localeRef.current = newLocale;
    setLocaleState(newLocale);
    document.documentElement.lang = newLocale;
    saveLocale(newLocale);
    setIsLoading(false);
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

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
