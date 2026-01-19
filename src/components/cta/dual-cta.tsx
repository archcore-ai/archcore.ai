import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DualCTAProps {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export function DualCTA({
  primaryLabel = "Book a Demo",
  primaryHref,
  // secondaryLabel = "View Docs",
  // secondaryHref,
  onPrimaryClick,
  // onSecondaryClick,
  className,
}: DualCTAProps) {
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className ?? ""}`}>
      {primaryHref ? (
        <Button size="lg" className="gap-2" asChild>
          <a href={primaryHref}>
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      ) : (
        <Button size="lg" className="gap-2" onClick={onPrimaryClick}>
          {primaryLabel}
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}

      {/* {secondaryHref ? (
        <Button size="lg" variant="outline" asChild>
          <a href={secondaryHref}>{secondaryLabel}</a>
        </Button>
      ) : (
        <Button size="lg" variant="outline" onClick={onSecondaryClick}>
          {secondaryLabel}
        </Button>
      )} */}
    </div>
  );
}
