import { msg } from "@lingui/core/macro";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Shield, Box, Code, Book, CheckCircle } from "lucide-react";
import { useLingui } from "@lingui/react";

export function ArchitectureRecordSection() {
  const { _ } = useLingui();

  const components = [
    {
      icon: FileText,
      title: _(msg`Decisions (ADR)`),
      description: _(
        msg`Architectural decisions with rationale: why this approach, what were alternatives.`
      ),
    },
    {
      icon: Shield,
      title: _(msg`Constraints (must/never)`),
      description: _(
        msg`Hard rules: what must be done, what is strictly forbidden in the codebase.`
      ),
    },
    {
      icon: Box,
      title: _(msg`Boundaries`),
      description: _(
        msg`Modules, bounded contexts, interaction interfaces between components.`
      ),
    },
    {
      icon: Code,
      title: _(msg`Examples / Anti-examples`),
      description: _(
        msg`Samples of correct and incorrect code for specific patterns.`
      ),
    },
    {
      icon: Book,
      title: _(msg`Glossary`),
      description: _(
        msg`Domain terms and definitions, team's ubiquitous language.`
      ),
    },
    {
      icon: CheckCircle,
      title: _(msg`Review Checklists`),
      description: _(msg`Code review criteria for architectural compliance.`),
    },
  ];

  return (
    <SectionContainer id="architecture-record">
      <SectionHeader
        title={_(msg`What is Architecture Record`)}
        description={_(
          msg`The answer to: 'what exactly do you store?' Six types of architectural knowledge.`
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {components.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="border-border/50 hover:border-border transition-colors"
            >
              <CardContent className="pt-6">
                <Icon className="h-8 w-8 mb-4 text-primary" />
                <CardTitle className="mb-2">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </SectionContainer>
  );
}
