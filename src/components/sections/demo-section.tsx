import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Code, GitPullRequest, MessageCircle, Info } from "lucide-react";
import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export function DemoSection() {
  const { _ } = useLingui();

  const scenarios = [
    {
      icon: Code,
      label: _(msg`Generate service X following context boundaries`),
      description: _(msg`Example of AI agent generating code with architectural constraints`),
      href: "#demo-generation",
    },
    {
      icon: GitPullRequest,
      label: _(msg`Check PR for architectural constraint violations`),
      description: _(msg`Example of automated architectural code review`),
      href: "#demo-pr-review",
    },
    {
      icon: MessageCircle,
      label: _(msg`Why did we choose microservices/queue/DDD?`),
      description: _(msg`Example of architectural decision explanation with sources`),
      href: "#demo-why-question",
    },
  ];

  return (
    <SectionContainer id="demo">
      <SectionHeader
        title={_(msg`Try Archcore in Action`)}
        description={_(msg`Interactive scenarios on a public repository. Read-only tour.`)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          return (
            <Card
              key={scenario.label}
              className="cursor-pointer hover:border-primary transition-all hover:shadow-lg"
            >
              <CardContent className="pt-6 flex flex-col h-full">
                <Icon className="h-12 w-12 mb-4 text-primary" />
                <CardTitle className="mb-2 text-lg">{scenario.label}</CardTitle>
                <CardDescription className="mb-4 flex-grow">{scenario.description}</CardDescription>
                <Button asChild className="w-full mt-auto">
                  <a href={scenario.href}>{_(msg`Try Scenario`)}</a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Alert className="mt-8 border-blue-500/50 bg-blue-500/10">
        <Info className="h-4 w-4 text-blue-500" />
        <AlertDescription className="text-sm">
          {_(msg`This is a read-only tour on a public repository. To create/modify Architecture Record — install self-hosted.`)}
        </AlertDescription>
      </Alert>
    </SectionContainer>
  );
}
