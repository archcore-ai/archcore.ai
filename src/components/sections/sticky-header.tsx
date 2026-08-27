import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useGitHubStars } from "@/hooks/use-github-stars";
import { useLingui } from "@lingui/react";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";
import { track } from "@/lib/analytics";

export function StickyHeader() {
  const { _ } = useLingui();
  const { total } = useGitHubStars();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Plugin and CLI left the header on 2026-08-27 with the rest of the
  // entry-point choice (landing/home-install-single-path.adr.md). Both pages
  // stay reachable from the footer nav and the index.html static nav.
  //
  // "How to use" was an accent-coloured CTA button until it became a plain nav
  // link beside Docs: onboarding and reference are two reads of the same
  // depth, and the button was the last thing competing with the install block
  // for the eye.
  const navItems: Array<{
    href: string;
    label: string;
    external?: boolean;
    internal?: boolean;
  }> = [
    { href: INTERNAL_LINKS.howToUse, label: _(msg`How to use`), internal: true },
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
        "fixed top-0 left-0 right-0 z-[9999] transition-colors duration-200",
        isScrolled
          ? "bg-[var(--color-page)] border-b border-border"
          : mobileMenuOpen
            ? "bg-[var(--color-page)]"
            : "bg-transparent"
      )}
    >
      <div className="px-4 min-[360px]:px-6">
        <div className="max-w-[var(--container-max)] mx-auto h-16 flex items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2 md:gap-6 min-w-0">
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
            </nav>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <div className="hidden md:flex items-center gap-1">
              <LanguageSwitcher />
            </div>

            <a
              href={LINKS.org}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={_(msg`Star Archcore on GitHub`)}
              // Reports github_star_clicked itself; the flag stops the generic
              // outbound tracker from logging the same click a second time.
              data-analytics-handled
              onClick={() =>
                track("github_star_clicked", {
                  repo: "org",
                  stars: total,
                  surface: "navbar",
                })
              }
              className={cn(
                "hidden min-[246px]:inline-flex items-center gap-1.5 h-8 rounded-md px-2 sm:px-2.5",
                "border border-border bg-card text-sm font-medium text-foreground/90",
                "hover:text-foreground hover:border-foreground/25 transition-colors"
              )}
            >
              <Github className="h-4 w-4 shrink-0" />
              <span>
                <Trans>Star</Trans>
              </span>
            </a>

            <Button
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              onClick={() => {
                setMobileMenuOpen((prev) => !prev);
              }}
              aria-label={
                mobileMenuOpen ? _(msg`Close menu`) : _(msg`Open menu`)
              }
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
            className="max-w-[var(--container-max)] mx-auto py-4 space-y-3"
          >
            <div className="space-y-1 pt-1">
              {navItems.map((item) =>
                item.internal ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block rounded-md px-2 py-2.5 text-sm hover:bg-accent transition-colors"
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
                    className="block rounded-md px-2 py-2.5 text-sm hover:bg-accent transition-colors"
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>

            <div className="pt-3 border-t border-border">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
