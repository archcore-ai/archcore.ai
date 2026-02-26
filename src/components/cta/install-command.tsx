import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Trans } from "@lingui/react/macro";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const DEFAULT_COMMAND = "curl -fsSL https://archcore.ai/install.sh | bash";

interface InstallCommandProps {
  command?: string;
  className?: string;
  variant?: "hero" | "inline" | "compact";
}

export function InstallCommand({
  command = DEFAULT_COMMAND,
  className,
  variant = "inline",
}: InstallCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may fail in non-HTTPS or unfocused contexts
    }
  };

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "hidden lg:flex items-center gap-1.5 rounded-md bg-muted/80 border px-3 py-1.5 font-mono text-xs text-muted-foreground",
          className
        )}
      >
        <Terminal className="h-3 w-3 shrink-0" />
        <span className="truncate max-w-[260px]">{command}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 shrink-0 ml-1"
          onClick={() => void handleCopy()}
        >
          {copied ? (
            <Check className="h-3 w-3 text-primary" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          <span className="sr-only">
            <Trans>Copy command</Trans>
          </span>
        </Button>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div
        className={cn(
          "relative rounded-lg bg-muted/50 border p-4 pr-12 font-mono text-sm sm:text-base break-all max-w-2xl mx-auto text-left",
          className
        )}
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Terminal className="h-4 w-4 shrink-0" />
          <Trans>Run in your terminal:</Trans>
        </div>
        {command}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8"
          onClick={() => void handleCopy()}
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">
            <Trans>Copy command</Trans>
          </span>
        </Button>
      </div>
    );
  }

  // inline variant
  return (
    <div
      className={cn(
        "relative rounded-lg bg-muted/50 border p-3 pr-11 font-mono text-sm break-all",
        className
      )}
    >
      {command}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1.5 top-1.5 h-7 w-7"
        onClick={() => void handleCopy()}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        <span className="sr-only">
          <Trans>Copy command</Trans>
        </span>
      </Button>
    </div>
  );
}
