import {
  MessageSquare,
  FileText,
  GitBranch,
  Layers,
  Box,
  MessageCircle,
  GitPullRequest,
  Code,
  ArrowRight
} from "lucide-react";
import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";
import { Trans } from "@lingui/macro";

interface BadgeProps {
  icon: LucideIcon;
  label: string;
}

function SourceBadge({ icon: Icon, label }: BadgeProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border/50">
      <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function ToolBadge({ icon: Icon, label }: BadgeProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
      <Icon className="h-5 w-5 text-primary flex-shrink-0" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export function SolutionDiagram() {
  return (
    <div className="relative py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Sources */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground mb-4"><Trans>Sources</Trans></h3>
          <SourceBadge icon={MessageSquare} label="Slack threads" />
          <SourceBadge icon={FileText} label="Confluence docs" />
          <SourceBadge icon={GitBranch} label="Git repos" />
          <SourceBadge icon={Layers} label="ADRs & RFCs" />
        </div>

        {/* Architecture Record (center) */}
        <div className="relative">
          <Card className="bg-primary/5 border-primary p-8 text-center">
            <Box className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-bold"><Trans>Architecture Record</Trans></h3>
            <p className="text-sm text-muted-foreground mt-2">
              <Trans>Structured, versioned, queryable</Trans>
            </p>
          </Card>
          <ArrowRight className="hidden md:block absolute left-[-2rem] top-1/2 -translate-y-1/2 text-muted-foreground" />
          <ArrowRight className="hidden md:block absolute right-[-2rem] top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>

        {/* Tools */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground mb-4"><Trans>AI Tools</Trans></h3>
          <ToolBadge icon={MessageCircle} label="Chat (Claude, GPT)" />
          <ToolBadge icon={GitPullRequest} label="PR Review" />
          <ToolBadge icon={Code} label="Code Agents" />
        </div>
      </div>
    </div>
  );
}
