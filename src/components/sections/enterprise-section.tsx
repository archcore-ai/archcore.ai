import { Box, Database, Container, Cpu, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/section-container";
import { Trans, msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";

const DEMO_URL = "https://demo.archcore.ai";

export function EnterpriseSection() {
  const { _ } = useLingui();
  const deploymentFeatures = [
    { icon: Box, label: _(msg`Single binary`) },
    { icon: Database, label: _(msg`PostgreSQL backend`) },
    { icon: Container, label: _(msg`Docker-ready`) },
    { icon: Cpu, label: _(msg`Local LLMs supported`) },
  ];

  const trustBullets = [
    _(msg`Data sovereignty`),
    _(msg`No vendor lock-in`),
    _(msg`Data stays on your infrastructure`),
    _(msg`Designed for environments with strict architectural and data controls`),
  ];

  return (
    <SectionContainer id="privacy" className="bg-muted/30 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight"><Trans>Private. Self-hosted. Yours.</Trans></h2>
          <p className="text-lg text-muted-foreground">
            <Trans>Archcore runs entirely on your infrastructure — no SaaS, no data export, no third-party AI vendors required. Keep your code and architectural knowledge inside your security perimeter.</Trans>
          </p>
          <p className="text-base text-muted-foreground">
            <Trans>Architectural understanding remains local, explicit, and under your control.</Trans>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deploymentFeatures.map((feature) => (
              <div key={feature.label} className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium">{feature.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            {trustBullets.map((bullet) => (
              <Badge key={bullet} variant="outline" className="gap-1">
                <Check className="h-3 w-3" />
                {bullet}
              </Badge>
            ))}
          </div>

          <Button size="lg" asChild className="mt-2">
            <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">
              <Trans>Interactive Tour</Trans>
            </a>
          </Button>
        </div>

        <img
          src="/images/security.png"
          alt="Self-hosted Archcore architecture: PostgreSQL-backed artifacts, filesystem storage, local or on-prem LLMs, and IDE/tool integrations"
          width={1064}
          height={887}
          className="w-full h-auto max-h-80 object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </SectionContainer>
  );
}
