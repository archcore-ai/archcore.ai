import { useState, useRef, useEffect } from "react";
import { Terminal } from "lucide-react";
import { Trans } from "@lingui/react/macro";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  ENV_CONTENT,
  COMPOSE_CONTENT,
  RUN_COMMAND,
} from "@/lib/team-deploy-content";
import { CopyButton } from "./copy-button";

interface TeamSetupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CopyKey = "env" | "compose" | "run";

export function TeamSetupDialog({
  open,
  onOpenChange,
}: TeamSetupDialogProps) {
  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    []
  );

  const handleCopy = (text: string, key: CopyKey) => {
    void navigator.clipboard.writeText(text);
    setCopiedKey(key);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <DialogTitle>
              <Trans>Deploy Archcore Team</Trans>
            </DialogTitle>
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/40 text-primary">
              Early Access
            </Badge>
          </div>
          <DialogDescription>
            <Trans>
              Deploy the full Archcore Team stack with Docker Compose in 3
              steps.
            </Trans>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Step 1: .env */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                1
              </span>
              <Trans>
                Create <code className="text-xs bg-muted px-1 py-0.5 rounded">.env</code> file
              </Trans>
            </div>
            <div className="relative rounded-lg bg-muted/50 border p-4 pr-12 font-mono text-xs break-all whitespace-pre-wrap max-h-40 overflow-y-auto">
              {ENV_CONTENT}
              <CopyButton copied={copiedKey === "env"} onCopy={() => handleCopy(ENV_CONTENT, "env")} />
            </div>
          </div>

          {/* Step 2: docker-compose.yml */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                2
              </span>
              <Trans>
                Create <code className="text-xs bg-muted px-1 py-0.5 rounded">docker-compose.yml</code> file
              </Trans>
            </div>
            <div className="relative rounded-lg bg-muted/50 border p-4 pr-12 font-mono text-xs break-all whitespace-pre-wrap max-h-52 overflow-y-auto">
              {COMPOSE_CONTENT}
              <CopyButton copied={copiedKey === "compose"} onCopy={() => handleCopy(COMPOSE_CONTENT, "compose")} />
            </div>
          </div>

          {/* Step 3: Run */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                3
              </span>
              <Trans>Run in your terminal</Trans>
            </div>
            <div className="relative rounded-lg bg-muted/50 border p-4 pr-12 font-mono text-sm break-all">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 shrink-0 text-muted-foreground" />
                {RUN_COMMAND}
              </div>
              <CopyButton copied={copiedKey === "run"} onCopy={() => handleCopy(RUN_COMMAND, "run")} />
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
