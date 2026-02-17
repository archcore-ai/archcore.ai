import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy, Terminal } from "lucide-react";
import { Trans } from "@lingui/react/macro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ENV_CONTENT,
  COMPOSE_CONTENT,
  RUN_COMMAND,
} from "@/lib/team-deploy-content";

type CopyKey = "env" | "compose" | "run";

function CopyButton({
  text,
  copyKey,
  copiedKey,
  onCopy,
}: {
  text: string;
  copyKey: CopyKey;
  copiedKey: CopyKey | null;
  onCopy: (text: string, key: CopyKey) => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-2 top-2 h-8 w-8"
      onClick={() => {
        onCopy(text, copyKey);
      }}
    >
      {copiedKey === copyKey ? (
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

export function TeamsGettingStarted() {
  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null);

  const handleCopy = (text: string, key: CopyKey) => {
    void navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-24">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          <Trans>Back to home</Trans>
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold tracking-tight">
              <Trans>Deploy Archcore Team</Trans>
            </h1>
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 border-primary/40 text-primary"
            >
              Early Access
            </Badge>
          </div>
          <p className="text-muted-foreground">
            <Trans>
              Deploy the full Archcore Team stack with Docker Compose in 3
              steps.
            </Trans>
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {/* Step 1: .env */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-medium">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                1
              </span>
              <Trans>
                Create{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  .env
                </code>{" "}
                file
              </Trans>
            </div>
            <div className="relative rounded-lg bg-muted/50 border p-4 pr-12 font-mono text-xs break-all whitespace-pre-wrap max-h-60 overflow-y-auto">
              {ENV_CONTENT}
              <CopyButton
                text={ENV_CONTENT}
                copyKey="env"
                copiedKey={copiedKey}
                onCopy={handleCopy}
              />
            </div>
          </div>

          {/* Step 2: docker-compose.yml */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-medium">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                2
              </span>
              <Trans>
                Create{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  docker-compose.yml
                </code>{" "}
                file
              </Trans>
            </div>
            <div className="relative rounded-lg bg-muted/50 border p-4 pr-12 font-mono text-xs break-all whitespace-pre-wrap max-h-96 overflow-y-auto">
              {COMPOSE_CONTENT}
              <CopyButton
                text={COMPOSE_CONTENT}
                copyKey="compose"
                copiedKey={copiedKey}
                onCopy={handleCopy}
              />
            </div>
          </div>

          {/* Step 3: Run */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-medium">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
                3
              </span>
              <Trans>Run in your terminal</Trans>
            </div>
            <div className="relative rounded-lg bg-muted/50 border p-4 pr-12 font-mono text-sm break-all">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 shrink-0 text-muted-foreground" />
                {RUN_COMMAND}
              </div>
              <CopyButton
                text={RUN_COMMAND}
                copyKey="run"
                copiedKey={copiedKey}
                onCopy={handleCopy}
              />
            </div>
            <p className="text-sm text-muted-foreground">
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

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <Link
            to="/"
            className="hover:text-foreground transition-colors"
          >
            <Trans>Back to home</Trans>
          </Link>
          <span>&copy; {new Date().getFullYear()} archcore.ai</span>
        </div>
      </div>
    </div>
  );
}
