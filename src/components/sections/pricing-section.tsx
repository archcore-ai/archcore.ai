import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { Check, Clock } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineEmailCapture } from "@/components/cta";

export function PricingSection() {
  const { _ } = useLingui();

  const cliFeatures = [
    _(msg`Unlimited documents`),
    _(msg`Claude Code hooks`),
    _(msg`MCP server`),
    _(msg`archcore doctor`),
  ];

  const cloudFeatures = [
    _(msg`Cross-project sharing`),
    _(msg`Team collaboration`),
    _(msg`archcore sync`),
    _(msg`Centralized rules`),
  ];

  return (
    <SectionContainer id="pricing">
      <SectionHeader
        title={_(msg`Free. Open source. No strings.`)}
        description={_(
          msg`The CLI is free forever. Cloud sync is coming for teams.`
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {/* CLI Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>CLI</CardTitle>
              <Badge variant="secondary">
                <Trans>Free</Trans>
              </Badge>
            </div>
            <CardDescription>
              <Trans>Everything you need, locally</Trans>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-muted-foreground">
                <Trans>Forever free</Trans>
              </span>
            </div>
            <ul className="space-y-3">
              {cliFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter />
        </Card>

        {/* Cloud Card */}
        <Card className="relative opacity-70">
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Cloud</CardTitle>
              <Badge variant="secondary">
                <Trans>Coming Soon</Trans>
              </Badge>
            </div>
            <CardDescription>
              <Trans>For teams and organizations</Trans>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground text-sm">
                <Trans>Pricing TBD</Trans>
              </span>
            </div>
            <ul className="space-y-3">
              {cloudFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <InlineEmailCapture
              placeholder={_(msg`Enter your email for waitlist`)}
              buttonLabel={_(msg`Join Waitlist`)}
              successMessage={_(msg`Thanks! You're on the list.`)}
              className="w-full"
            />
          </CardFooter>
        </Card>
      </div>
    </SectionContainer>
  );
}
