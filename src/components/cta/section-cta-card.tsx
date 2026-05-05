import { type LucideIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCTACardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  className?: string;
  /** Use 'featured' for the main conversion CTA with strong-border emphasis. */
  variant?: "default" | "featured";
}

export function SectionCTACard({
  icon: Icon,
  title,
  description,
  buttonLabel,
  buttonHref,
  onButtonClick,
  className,
  variant = "default",
}: SectionCTACardProps) {
  const handleButtonClick = () => {
    if (buttonHref) {
      window.open(buttonHref, "_blank", "noopener,noreferrer");
    } else if (onButtonClick) {
      onButtonClick();
    }
  };

  if (variant === "featured") {
    return (
      <div
        className={cn(
          "group relative rounded-[var(--radius-card)] border border-border-strong bg-[var(--color-elevated)] px-6 py-5 shadow-[0_8px_24px_rgba(17,16,14,0.06)]",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="flex-1 space-y-1">
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button onClick={handleButtonClick} className="gap-2 flex-shrink-0">
            {buttonLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn("bg-primary/5 border-primary/20", className)}>
      <CardContent className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {Icon && (
            <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          <Button onClick={handleButtonClick} className="gap-2 flex-shrink-0">
            {buttonLabel}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
