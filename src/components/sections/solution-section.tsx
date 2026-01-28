import { Database, Box, Zap, Shield, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { SectionCTACard } from "@/components/cta";
import { SolutionDiagram } from "@/components/solution-diagram";
import { ComparisonTable } from "@/components/comparison-table";
import { DeterminismVisual } from "@/components/determinism-visual";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

const DEMO_URL = "https://demo.archcore.ai";

export function SolutionSection() {
  const { _ } = useLingui();

  const steps = [
    {
      icon: Database,
      title: _(msg`Gather`),
      description: _(msg`Code + ADRs + discussions`),
    },
    {
      icon: Box,
      title: _(msg`Record`),
      description: _(msg`Architecture Record as enforceable contract`),
    },
    {
      icon: Zap,
      title: _(msg`Apply`),
      description: _(msg`IDEs/chats/agents get context via MCP`),
    },
    {
      icon: Shield,
      title: _(msg`Verify`),
      description: _(msg`Answers with citations to specific decisions`),
    },
  ];

  return (
    <SectionContainer id="solution">
      <SectionHeader
        title={_(msg`Gather → Record → Apply → Verify`)}
        description={_(msg`The 4-stage architectural knowledge pipeline that powers consistent AI context.`)}
      />

      {/* 4-step flow */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 mb-12">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex items-center">
              <Card className="w-full lg:w-48 border-border/50 hover:border-primary transition-colors">
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <CardTitle className="text-lg mb-2">{step.title}</CardTitle>
                  <CardDescription className="text-sm">{step.description}</CardDescription>
                </CardContent>
              </Card>
              {idx < steps.length - 1 && (
                <ArrowRight className="hidden lg:block h-6 w-6 text-muted-foreground mx-2 flex-shrink-0" />
              )}
            </div>
          );
        })}
      </div>

      {/* Central diagram */}
      <SolutionDiagram />

      {/* Not just another search - comparison */}
      <div className="mt-16">
        <ComparisonTable />
      </div>

      {/* Determinism proof */}
      <DeterminismVisual />

      <SectionCTACard
        title={_(msg`See the Architecture Record in action`)}
        description={_(msg`Explore how Archcore structures, versions, and enforces architectural context`)}
        buttonLabel={_(msg`Interactive Tour`)}
        buttonHref={DEMO_URL}
        className="mt-10"
      />
    </SectionContainer>
  );
}
