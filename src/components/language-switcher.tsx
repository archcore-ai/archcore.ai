import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";
import { type SupportedLocale } from "@/i18n";
import { cn } from "@/lib/utils";

const LOCALE_SHORT_LABELS: Record<SupportedLocale, string> = {
  en: "EN",
  ru: "RU",
};

const LOCALE_FULL_LABELS: Record<SupportedLocale, string> = {
  en: "English",
  ru: "Русский",
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleLocaleChange = async (newLocale: SupportedLocale) => {
    setIsOpen(false);
    await setLocale(newLocale);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1 px-3 py-2 rounded-md",
          "text-sm font-medium text-foreground",
          "hover:bg-accent transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "touch-manipulation select-none"
        )}
        aria-label={`Change language (current: ${LOCALE_FULL_LABELS[locale]})`}
        aria-expanded={isOpen}
      >
        <span className="min-w-[2ch]">{LOCALE_SHORT_LABELS[locale]}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            className={cn(
              "absolute left-0 md:right-0 md:left-auto mt-2 min-w-[140px]",
              "bg-popover rounded-lg shadow-lg border border-border",
              "py-1 z-50",
              "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
            )}
            role="menu"
            aria-orientation="vertical"
          >
            {(Object.keys(LOCALE_FULL_LABELS) as SupportedLocale[]).map(
              (loc) => (
                <button
                  key={loc}
                  onClick={() => void handleLocaleChange(loc)}
                  className={cn(
                    "w-full text-left px-4 py-2.5",
                    "text-sm transition-colors",
                    "hover:bg-accent focus:bg-accent",
                    "focus:outline-none touch-manipulation",
                    locale === loc
                      ? "text-primary font-medium bg-primary/10"
                      : "text-foreground"
                  )}
                  role="menuitem"
                  aria-current={locale === loc ? "true" : undefined}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span>{LOCALE_FULL_LABELS[loc]}</span>
                    <span className="text-xs text-muted-foreground">
                      {LOCALE_SHORT_LABELS[loc]}
                    </span>
                  </div>
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
