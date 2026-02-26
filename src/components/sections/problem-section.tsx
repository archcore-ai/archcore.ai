import { msg } from "@lingui/core/macro";
import { CircleHelp } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { useLingui } from "@lingui/react";

const problems = [
  {
    question: msg`"Why did we choose this pattern?"`,
    answer: msg`ADRs and rules in .archcore/ make decisions searchable and available to every AI tool.`,
  },
  {
    question: msg`"Is this code following our standards?"`,
    answer: msg`Rules and guides tell AI what's allowed and what's deprecated. No more violating conventions.`,
  },
  {
    question: msg`"What does the new person need to know?"`,
    answer: msg`Onboarding context lives in .archcore/, not in someone's head or a lost Slack thread.`,
  },
];

export function ProblemSection() {
  const { _ } = useLingui();

  return (
    <SectionContainer
      id="problem"
      className="bg-muted/30 border-b border-border"
    >
      <SectionHeader
        title={_(msg`Your AI tools are guessing. They don't have to.`)}
        description={_(
          msg`Without architectural context, every AI session starts from scratch.`
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {problems.map(({ question, answer }) => (
          <div
            key={_(question)}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <CircleHelp className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold leading-tight">
              {_(question)}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {_(answer)}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
