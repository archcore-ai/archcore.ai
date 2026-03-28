import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { FolderGit2, Puzzle, FileText, GitBranch } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

import type { MessageDescriptor } from "@lingui/core";

const cards: Array<{
  id: string;
  icon: LucideIcon;
  title: MessageDescriptor;
  description: MessageDescriptor;
}> = [
  {
    id: "stop-explaining",
    icon: FolderGit2,
    title: msg`Stop repeated explaining`,
    description: msg`Decisions, rules, and plans live alongside the code — every agent reads the same context without re-prompting.`,
  },
  {
    id: "cross-agent",
    icon: Puzzle,
    title: msg`Work across Claude, Cursor, and Copilot`,
    description: msg`Any agent that reads files can use .archcore/ context. No vendor lock-in, no per-tool configuration.`,
  },
  {
    id: "working-context",
    icon: FileText,
    title: msg`Turn docs into working context`,
    description: msg`ADRs, rules, plans, and guides become structured, machine-readable documents that agents use — not just files humans write.`,
  },
  {
    id: "git-review",
    icon: GitBranch,
    title: msg`Review context changes in Git`,
    description: msg`Context is versioned, reviewable, and diffable — just like code. Changes go through the same PR workflow.`,
  },
];

export function WhyArchcoreSection() {
  const { _ } = useLingui();

  return (
    <SectionContainer id="why-archcore">
      <SectionHeader
        title={_(msg`Keep architecture context where code lives`)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ id, icon: Icon, title, description }) => (
          <Card key={id} className="text-center">
            <CardContent className="space-y-3">
              <div className="w-10 h-10 mx-auto rounded-lg bg-muted flex items-center justify-center">
                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">{_(title)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {_(description)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
