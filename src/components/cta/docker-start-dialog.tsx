import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Trans } from "@lingui/react/macro";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DockerStartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DOCKER_COMMAND =
  "docker run -d -p 80:80 ghcr.io/archcore-ai/archcore-personal:latest";

export function DockerStartDialog({
  open,
  onOpenChange,
}: DockerStartDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(DOCKER_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            <Trans>Get Started with Archcore</Trans>
          </DialogTitle>
          <DialogDescription>
            <Trans>
              Launch Archcore locally with a single Docker command. No
              registration or configuration required.
            </Trans>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Terminal className="h-4 w-4 shrink-0" />
            <Trans>Run in your terminal:</Trans>
          </div>
          <div className="relative rounded-lg bg-muted/50 border p-4 pr-12 font-mono text-sm break-all">
            {DOCKER_COMMAND}
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
          <p className="text-xs text-muted-foreground">
            <Trans>
              After launch, open{" "}
              <a
                href="http://localhost"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                http://localhost
              </a>{" "}
              in your browser.
            </Trans>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
