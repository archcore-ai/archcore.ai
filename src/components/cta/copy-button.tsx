import { Check, Copy } from "lucide-react";
import { Trans } from "@lingui/react/macro";
import { Button } from "@/components/ui/button";

interface CopyButtonProps {
  copied: boolean;
  onCopy: () => void;
}

export function CopyButton({ copied, onCopy }: CopyButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-2 top-2 h-8 w-8"
      onClick={onCopy}
    >
      {copied ? (
        <Check className="h-4 w-4 text-primary" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
      <span className="sr-only">
        <Trans>Copy</Trans>
      </span>
    </Button>
  );
}
