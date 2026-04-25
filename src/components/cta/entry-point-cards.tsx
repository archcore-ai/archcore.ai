import { Trans } from "@lingui/react/macro";
import { Link } from "react-router-dom";
import { ArrowRight, Puzzle, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { INTERNAL_LINKS } from "@/lib/links";

interface EntryPointCardsProps {
  className?: string;
}

export function EntryPointCards({ className }: EntryPointCardsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto text-left",
        className
      )}
    >
      <div className="relative rounded-xl border border-primary/30 bg-primary/[0.04] p-5 shadow-sm flex flex-col">
        <Badge className="absolute -top-2 right-4" variant="default">
          <Trans>Recommended</Trans>
        </Badge>
        <div className="flex items-center gap-2 mb-2">
          <Puzzle className="h-4 w-4 text-primary" />
          <span className="font-semibold text-sm">
            <Trans>Plugin</Trans>
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          <Trans>
            For Claude Code and Cursor. High-level workflows, guardrails, and
            structured actions inside your agent.
          </Trans>
        </p>
        <Button size="sm" className="w-full gap-2 mt-auto" asChild>
          <Link to={INTERNAL_LINKS.plugin}>
            <Trans>Use the Plugin</Trans>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-muted/40 p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Terminal className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-sm">
            <Trans>CLI</Trans>
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          <Trans>
            For direct integrations. Repo-native context, hooks, MCP, and a
            scriptable core that works across agents.
          </Trans>
        </p>
        <Button
          size="sm"
          variant="outline"
          className="w-full gap-2 mt-auto"
          asChild
        >
          <Link to={INTERNAL_LINKS.cli}>
            <Trans>Start with CLI</Trans>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
