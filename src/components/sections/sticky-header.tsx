import { msg } from "@lingui/core/macro";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Github, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLingui } from "@lingui/react";
import { ANCHORS, INTERNAL_LINKS, LINKS } from "@/lib/links";

export function StickyHeader() {
  const { _ } = useLingui();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navItems: Array<{
    href: string;
    label: string;
    external?: boolean;
    internal?: boolean;
  }> = [
    { href: INTERNAL_LINKS.plugin, label: _(msg`Plugin`), internal: true },
    { href: INTERNAL_LINKS.cli, label: _(msg`CLI`), internal: true },
    { href: `/${ANCHORS.compare}`, label: _(msg`Compare`) },
    { href: LINKS.docs, label: _(msg`Docs`), external: true },
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

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
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
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between gap-4">
          <Link to="/" className="shrink-0">
            <Logo size="md" loading="eager" />
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden md:flex items-center gap-1"
          >
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" size="sm" asChild>
                {item.internal ? (
                  <Link to={item.href}>{item.label}</Link>
                ) : (
                  <a
                    href={item.href}
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </a>
                )}
              </Button>
            ))}
            <LanguageSwitcher />
          </nav>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Button variant="ghost" size="icon" asChild>
              <a
                href={LINKS.org}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button size="sm" asChild>
              <Link to={INTERNAL_LINKS.plugin}>{_(msg`Install Plugin`)}</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
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
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-6">
          <nav
            aria-label="Mobile navigation"
            className="max-w-6xl mx-auto py-4 space-y-1"
          >
            {navItems.map((item) =>
              item.internal ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="block py-2.5 text-sm hover:text-primary transition-colors"
                  onClick={() => {
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ) : (
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
              )
            )}
            <div className="pt-3 border-t border-border">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
