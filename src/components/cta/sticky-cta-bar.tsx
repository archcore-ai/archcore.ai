import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StickyCTABarProps {
  message?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  className?: string;
}

const STORAGE_KEY = "archcore-sticky-cta-dismissed";

function getInitialDismissed() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "true";
}

export function StickyCTABar({
  message = "Ready to implement Archcore?",
  buttonLabel = "Book a Demo",
  onButtonClick,
  className,
}: StickyCTABarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(getInitialDismissed);

  useEffect(() => {
    if (isDismissed) return;

    const handleScroll = () => {
      // Show after scrolling past hero section (roughly one viewport height)
      const scrollThreshold = window.innerHeight * 0.8;
      setIsVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, "true");
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40",
        "bg-background/95 backdrop-blur-md border-t border-border",
        "transform transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-sm font-medium hidden sm:block">{message}</p>
        <p className="text-sm font-medium sm:hidden">
          Get started with Archcore
        </p>

        <div className="flex items-center gap-2">
          <Button size="sm" onClick={onButtonClick} className="gap-1.5">
            {buttonLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={handleDismiss}
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
