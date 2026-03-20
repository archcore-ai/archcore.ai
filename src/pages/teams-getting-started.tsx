import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Terminal } from "lucide-react";
import { Trans } from "@lingui/react/macro";
import { Badge } from "@/components/ui/badge";
import {
  ENV_CONTENT,
  COMPOSE_CONTENT,
  RUN_COMMAND,
} from "@/lib/team-deploy-content";
import { CopyButton } from "@/components/cta/copy-button";

type CopyKey = "env" | "compose" | "run";

export function TeamsGettingStarted() {
  const [copiedKey, setCopiedKey] = useState<CopyKey | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    document.title = "Deploy Archcore Team — Archcore";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute(
        "content",
        "Deploy the full Archcore Team stack with Docker Compose in 3 steps. Self-hosted, no external dependencies."
      );
    }
    return () => {
      document.title =
        "Archcore — Shared architectural memory for AI coding agents";
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute(
          "content",
          "Version decisions, rules, plans, and experience in your repo so Claude Code, Cursor, Copilot, and other AI coding agents share the same context across sessions."
        );
      }
    };
  }, []);

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
                copied={copiedKey === "env"}
                onCopy={() => handleCopy(ENV_CONTENT, "env")}
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
                copied={copiedKey === "compose"}
                onCopy={() => handleCopy(COMPOSE_CONTENT, "compose")}
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
                copied={copiedKey === "run"}
                onCopy={() => handleCopy(RUN_COMMAND, "run")}
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
