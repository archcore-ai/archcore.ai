import { Users, GitPullRequest, Code } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { SectionCTACard } from "@/components/cta";
import { StoryCard } from "@/components/story-card";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

interface UseCasesSectionProps {
  onContactClick: () => void;
}

export function UseCasesSection({ onContactClick }: UseCasesSectionProps) {
  const { _ } = useLingui();
  const useCases = [
    {
      trigger: _(msg`New engineer asks: "Why did we choose microservices?"`),
      problem: _(msg`Spends 2 days searching Slack, outdated docs, asking teammates`),
      solution: _(msg`Archcore provides ADR with decision rationale, constraints, and current state`),
      outcome: _(msg`Onboarding time: 4 weeks → 1.5 weeks`),
      icon: Users,
      title: _(msg`Faster Onboarding`)
    },
    {
      trigger: _(msg`PR introduces new database connection pattern`),
      problem: _(msg`Generic AI reviewer approves without checking architectural standards`),
      solution: _(msg`Archcore-powered review flags violation of connection pooling rules (links to ADR)`),
      outcome: _(msg`60% fewer architecture violations reach main`),
      icon: GitPullRequest,
      title: _(msg`Safer Code Review`)
    },
    {
      trigger: _(msg`Coding agent generates REST endpoint using deprecated auth pattern`),
      problem: _(msg`PR fails security review, wastes 3 days of rework`),
      solution: _(msg`Agent uses Archcore context, generates code following current OAuth2 standard`),
      outcome: _(msg`75% reduction in architectural rework cycles`),
      icon: Code,
      title: _(msg`Reliable AI Generation`)
    }
  ];

  return (
    <SectionContainer id="use-cases" className="border-b border-border">
      <SectionHeader
        title={_(msg`Real Use Cases`)}
        description={_(msg`How teams use Archcore to solve architectural context challenges`)}
      />

      <div className="space-y-8">
        {useCases.map((useCase, idx) => (
          <StoryCard key={idx} {...useCase} />
        ))}
      </div>

      <SectionCTACard
        variant="featured"
        title={_(msg`Start seeing these outcomes`)}
        description={_(msg`See how Architecture Record transforms your development workflow`)}
        buttonLabel={_(msg`Book a Demo`)}
        onButtonClick={onContactClick}
        className="mt-10"
      />
    </SectionContainer>
  );
}
