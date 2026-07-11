import { msg } from "@lingui/core/macro";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { usePostHog } from "posthog-js/react";
import { Compass, Menu, X, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useGitHubStars, formatStars } from "@/hooks/use-github-stars";
import { useLingui } from "@lingui/react";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

export function StickyHeader() {
  const { _ } = useLingui();
  const { total } = useGitHubStars();
  const posthog = usePostHog();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const howToUseLabel = _(msg`How to use`);
  const howToUseAria = _(msg`Open the interactive walkthrough`);
  const interactiveCaption = _(msg`Interactive walkthrough`);

  const navItems: Array<{
    href: string;
    label: string;
    external?: boolean;
    internal?: boolean;
  }> = [
    { href: INTERNAL_LINKS.plugin, label: _(msg`Plugin`), internal: true },
    { href: INTERNAL_LINKS.cli, label: _(msg`CLI`), internal: true },
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
              onClick={() => posthog.capture("navbar_star_click", { total })}
              className={cn(
                "hidden min-[246px]:inline-flex items-center gap-1.5 h-8 rounded-md px-2 sm:px-2.5",
                "border border-border bg-card text-sm font-medium text-foreground/90",
                "hover:text-foreground hover:border-foreground/25 transition-colors"
              )}
            >
              <Star
                className="h-4 w-4 shrink-0 text-[var(--color-action)]"
                fill="currentColor"
              />
              <span className="tabular-nums">{formatStars(total)}</span>
            </a>

            <HowToUseCta
              label={howToUseLabel}
              ariaLabel={howToUseAria}
              caption={interactiveCaption}
            />

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
            <Link
              to={INTERNAL_LINKS.howToUse}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl p-4",
                "bg-[var(--color-action)] text-[var(--color-text-inverse)]",
                "shadow-sm transition-transform active:scale-[0.99]"
              )}
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  "bg-white/12 text-current"
                )}
                aria-hidden="true"
              >
                <Compass className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <span className="flex flex-1 flex-col">
                <span className="flex items-center gap-2 text-base font-semibold">
                  {howToUseLabel}
                  <span
                    className="nav-live-dot text-white/85"
                    aria-hidden="true"
                  />
                </span>
                <span className="text-[12px] font-normal opacity-70">
                  {interactiveCaption}
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

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

interface HowToUseCtaProps {
  label: string;
  ariaLabel: string;
  caption: string;
}

function HowToUseCta({ label, ariaLabel, caption }: HowToUseCtaProps) {
  return (
    <Link
      to={INTERNAL_LINKS.howToUse}
      aria-label={ariaLabel}
      title={caption}
      className={cn(
        "group hidden min-[320px]:inline-flex items-center gap-1.5 sm:gap-2 rounded-md",
        "h-8 px-2 md:px-3",
        "bg-[var(--color-action)] text-[var(--color-text-inverse)]",
        "text-sm font-medium tracking-[-0.005em]",
        "transition-[transform,background-color] duration-200",
        "hover:bg-[var(--color-action-hover)] hover:-translate-y-[1px]",
        "active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-text)]"
      )}
    >
      <Compass
        className="h-4 w-4 shrink-0 opacity-90"
        strokeWidth={2.25}
        aria-hidden="true"
      />
      <span className="whitespace-nowrap hidden md:inline">{label}</span>
      <span
        className="nav-live-dot text-white/85 ml-0.5 hidden md:inline-flex"
        aria-hidden="true"
      />
    </Link>
  );
}
