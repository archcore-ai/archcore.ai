import { msg } from "@lingui/core/macro";
import { Users, GitPullRequest, Code, Check, TrendingUp } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLingui } from "@lingui/react";
import type { LucideIcon } from "lucide-react";
import { CodeDiffView } from "@/components/ui/code-diff-view";
import { GitHubBotComment } from "@/components/github-bot-comment";

interface UseCasesSectionProps {
  onContactClick: () => void;
}

interface UseCase {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  outcome: string;
  icon: LucideIcon;
  visual: React.ReactNode;
}

export function UseCasesSection({ onContactClick }: UseCasesSectionProps) {
  // Note: onContactClick is used in commented-out CTA section below
  void onContactClick; // Suppress unused variable warning
  const { _ } = useLingui();

  const useCases: UseCase[] = [
    {
      id: "onboarding",
      title: _(msg`Faster Onboarding`),
      description: _(
        msg`New engineers understand architectural decisions instantly instead of spending days searching through Slack and outdated docs.`
      ),
      bullets: [
        _(msg`"Why did we choose microservices?" → Instant ADR lookup`),
        _(msg`Decision rationale, constraints, and current state in seconds`),
        _(msg`Context-aware answers for architecture questions`),
      ],
      outcome: _(msg`Onboarding: 4 weeks → 1.5 weeks`),
      icon: Users,
      visual: (
        <Card className="bg-muted/50">
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-foreground">
                  {_(msg`User: Why did we move away from the monolith?`)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-semibold text-foreground">
                  {_(msg`AI: …analyzing…`)}
                </div>

                <div className="text-xs text-muted-foreground pl-4 border-l-2 border-primary/50">
                  {_(
                    msg`RFC-017: Monolithic architecture identified as bottleneck for parallel development. Key issues: blocking releases, high domain coupling, average change delivery cycle > 14 days.`
                  )}
                </div>

                <div className="text-xs text-muted-foreground pl-4 border-l-2 border-primary/50">
                  {_(
                    msg`ADR-009: Decided to decompose by bounded contexts. Constraints: autonomous data schemas, contract-based interaction via HTTP/Async API, backward compatibility ≥ 2 releases.`
                  )}
                </div>

                <div className="text-sm">
                  {_(
                    msg`We moved away from the monolith because team velocity became limited by architecture, not people. Moving to services enabled independent deployments, reduced blast radius of errors, and aligned responsibility by domains. The decision consciously increases operational complexity but is considered acceptable at current scale.`
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ),
    },
    {
      id: "code-review",
      title: _(msg`Safer Code Review`),
      description: _(
        msg`Architectural standards enforcement during code review, not after merge.`
      ),
      bullets: [
        _(msg`Auto-detect pattern violations against ADRs`),
        _(msg`Links reviewers directly to relevant architectural decisions`),
        _(msg`Prevents generic AI from approving non-compliant code`),
      ],
      outcome: _(msg`60% fewer violations reach main`),
      icon: GitPullRequest,
      visual: (
        <GitHubBotComment title="Codereview Bot">
          <CodeDiffView
            lines={[
              { type: "removed", content: "conn = psycopg2.connect(dsn)" },
              { type: "added", content: "conn = db_pool.getconn()" },
            ]}
          />

          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              {_(msg`Direct connection creation violates`)}{" "}
              <span className="underline">GUIDE-012</span>{" "}
              {_(
                msg`(Connection Pooling Policy). This leads to database connection limit exhaustion during scaling.`
              )}
            </p>
            <p className="font-semibold">
              {_(msg`Recommendation: Use connection pool (`)}
              <code className="text-xs font-mono bg-muted px-1 py-0.5 rounded">
                db_pool.getconn()
              </code>
              {_(msg`), as defined in GUIDE-012.`)}
            </p>
          </div>
        </GitHubBotComment>
      ),
    },
    {
      id: "code-generation",
      title: _(msg`Reliable AI Code Generation`),
      description: _(
        msg`AI agents generate code following your current architectural standards, not deprecated patterns.`
      ),
      bullets: [
        _(msg`Provides current OAuth2 standard to coding agents`),
        _(msg`Prevents using deprecated authentication patterns`),
        _(msg`Context-aware code generation aligned with ADRs`),
      ],
      outcome: _(msg`75% less architectural rework`),
      icon: Code,
      visual: (
        <img
          src="/images/code-generation.gif"
          alt="AI code generation following architectural standards"
          width={800}
          height={603}
          className="w-full rounded-lg shadow-md"
          loading="lazy"
          decoding="async"
        />
      ),
    },
  ];

  return (
    <SectionContainer id="use-cases" className="border-b border-border">
      <SectionHeader
        title={_(msg`Real Use Cases`)}
        description={_(
          msg`How teams use Archcore to solve architectural context challenges`
        )}
      />

      <Tabs
        defaultValue="onboarding"
        className="w-full"
        aria-label="Use case examples"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="onboarding">
            {_(msg`Q/A, onboarding`)}
          </TabsTrigger>
          <TabsTrigger value="code-review">{_(msg`Code Review`)}</TabsTrigger>
          <TabsTrigger value="code-generation">
            {_(msg`Code Generation`)}
          </TabsTrigger>
        </TabsList>

        {useCases.map((useCase) => (
          <TabsContent key={useCase.id} value={useCase.id} className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column: Content */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <useCase.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold">{useCase.title}</h3>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>

                <ul className="space-y-3">
                  {useCase.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check
                        className="h-5 w-5 text-primary flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <Badge
                  variant="outline"
                  className="text-sm font-medium px-3 py-1.5 gap-2"
                >
                  <TrendingUp className="h-4 w-4" aria-hidden="true" />
                  {useCase.outcome}
                </Badge>
              </div>

              {/* Right Column: Visual Preview */}
              <div className="lg:sticky lg:top-8">{useCase.visual}</div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* <SectionCTACard
        variant="featured"
        title={_(msg`Start seeing these outcomes`)}
        description={_(msg`See how Architecture Record transforms your development workflow`)}
        buttonLabel={_(msg`Book a Demo`)}
        onButtonClick={onContactClick}
        className="mt-10"
      /> */}
    </SectionContainer>
  );
}
