import { msg } from "@lingui/core/macro";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { useLingui } from "@lingui/react";
import { cn } from "@/lib/utils";

interface QuadrantCard {
  title: string;
  description: string;
  placeholder: string;
}

const borderClasses = [
  "border-b md:border-r border-border",
  "border-b border-border",
  "border-b md:border-b-0 md:border-r border-border",
  "",
];

export function IntegrationsSection() {
  const { _ } = useLingui();

  const cards: QuadrantCard[] = [
    {
      title: _(msg`One command to start`),
      description: _(
        msg`Run archcore init and get a structured .archcore/ directory in your repo. No servers, no accounts, no configuration files. Just a CLI and 30 seconds.`
      ),
      placeholder: _(msg`archcore init`),
    },
    {
      title: _(msg`Works with every AI agent`),
      description: _(
        msg`Archcore uses the MCP protocol to expose context to 30+ AI tools. Claude Code, Cursor, Windsurf, Copilot — they all read from the same .archcore/ source of truth.`
      ),
      placeholder: _(msg`MCP integrations`),
    },
    {
      title: _(msg`Documentation lives in your repo`),
      description: _(
        msg`Like README, but for architecture. Your decisions, rules, and guides are version-controlled markdown files. They go through code review, show up in diffs, and never go stale in a wiki no one checks.`
      ),
      placeholder: _(msg`.archcore/ directory`),
    },
    {
      title: _(msg`Cloud with GraphRAG`),
      description: _(
        msg`Connect multiple repos into a unified knowledge graph. GraphRAG finds relations between projects, improves search precision, and gives AI tools global context — not just what's in one repository.`
      ),
      placeholder: _(msg`GraphRAG visualization`),
    },
  ];

  return (
    <SectionContainer id="how-it-works" className="border-b border-border">
      <p className="text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
        {_(msg`How it works`)}
      </p>
      <SectionHeader
        title={_(msg`From zero to full context in 60 seconds`)}
        description={_(
          msg`Everything you need to give AI tools deep understanding of your codebase.`
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto">
        {cards.map(({ title, description, placeholder }, index) => (
          <div
            key={title}
            className={cn("p-6 md:p-8 space-y-4", borderClasses[index])}
          >
            <div className="aspect-[4/3] rounded-lg bg-muted/50 border border-border flex items-center justify-center">
              <span className="text-sm text-muted-foreground">{placeholder}</span>
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
