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
  primaryLabel = "Get Started",
  primaryHref,
  secondaryLabel,
  secondaryHref,
  onPrimaryClick,
  onSecondaryClick,
  className,
}: DualCTAProps) {
  const handlePrimaryClick = () => {
    if (primaryHref) {
      window.open(primaryHref, "_blank", "noopener,noreferrer");
    } else if (onPrimaryClick) {
      onPrimaryClick();
    }
  };

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 sm:gap-4 ${className ?? ""}`}
    >
      <Button size="lg" className="gap-2" onClick={handlePrimaryClick}>
        {primaryLabel}
        <ArrowRight className="h-4 w-4" />
      </Button>

      {secondaryLabel &&
        (secondaryHref ? (
          <Button size="lg" variant="outline" asChild>
            <a href={secondaryHref}>{secondaryLabel}</a>
          </Button>
        ) : (
          <Button size="lg" variant="outline" onClick={onSecondaryClick}>
            {secondaryLabel}
          </Button>
        ))}
    </div>
  );
}
