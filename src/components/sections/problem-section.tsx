import { msg } from "@lingui/core/macro";
import { Shuffle, AlertTriangle, Search } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { useLingui } from "@lingui/react";

const problems = [
  {
    icon: Shuffle,
    title: msg`Context scattered across code, docs, and chats`,
    description: msg`AI sees fragments, not the system. Impossible to understand how pieces connect.`,
  },
  {
    icon: AlertTriangle,
    title: msg`Rules aren't enforced`,
    description: msg`Conventions are easily ignored when not structured. No automatic validation.`,
  },
  {
    icon: Search,
    title: msg`No traceability`,
    description: msg`Without sources and versions, impossible to understand 'why AI decided this' or verify correctness.`,
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
        title={_(msg`The Model Isn't 'Bad'. The Context Is Incomplete.`)}
        description={_(
          msg`Context fragmentation is the root cause of AI hallucinations and architectural drift.`
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {problems.map(({ icon: Icon, title, description }) => (
          <div
            key={_(title)}
            className="flex flex-col items-center text-center space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold leading-tight">
              {_(title)}
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              {_(description)}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
