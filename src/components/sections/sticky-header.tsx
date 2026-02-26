import { msg } from "@lingui/core/macro";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLingui } from "@lingui/react";

export function StickyHeader() {
  const { _ } = useLingui();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navItems: Array<{ href: string; label: string; external?: boolean }> = [
    { href: "#how-it-works", label: _(msg`How it works`) },
    { href: "#use-cases", label: _(msg`Use cases`) },
    { href: "#pricing", label: _(msg`Pricing`) },
    { href: "https://github.com/archcore-ai", label: "GitHub", external: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-[9999] transition-all duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : mobileMenuOpen
            ? "bg-background"
            : "bg-transparent"
      )}
    >
      <div className="px-6">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
          <a href="#top">
            <Logo size="md" loading="eager" />
          </a>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" size="sm" asChild>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {item.label}
                </a>
              </Button>
            ))}
            <LanguageSwitcher />
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={mobileMenuOpen ? _(msg`Close menu`) : _(msg`Open menu`)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-6">
          <nav className="max-w-6xl mx-auto py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="block py-2.5 text-sm hover:text-primary transition-colors"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-border">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
