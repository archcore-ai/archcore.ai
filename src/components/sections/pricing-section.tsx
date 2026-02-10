import { useState } from "react";
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { Check, Lock } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DockerStartDialog } from "@/components/cta/docker-start-dialog";

export function PricingSection() {
  const { _ } = useLingui();
  const [dockerDialogOpen, setDockerDialogOpen] = useState(false);

  const personalFeatures = [
    _(msg`No auth required`),
    _(msg`1 user`),
    _(msg`Up to 3 projects`),
    _(msg`Community support`),
  ];

  const teamFeatures = [
    _(msg`Multi-user auth`),
    _(msg`Unlimited projects`),
    _(msg`Team collaboration`),
    _(msg`Priority support`),
  ];

  return (
    <SectionContainer id="pricing">
      <SectionHeader
        title={_(msg`Pricing`)}
        description={_(msg`Start free. Scale when you're ready.`)}
      />

      <Tabs defaultValue="self-hosted">
        <div className="flex justify-center">
          <TabsList className="grid grid-cols-2 max-w-sm w-full">
            <TabsTrigger value="self-hosted">
              <Trans>Self-Hosted</Trans>
            </TabsTrigger>
            <TabsTrigger value="cloud" disabled>
              <Lock className="h-3 w-3" />
              &nbsp;
              <Trans>Cloud</Trans>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                <Trans>Soon</Trans>
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="self-hosted" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Personal Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>
                    <Trans>Personal</Trans>
                  </CardTitle>
                  <Badge variant="secondary">
                    <Trans>Free</Trans>
                  </Badge>
                </div>
                <CardDescription>
                  <Trans>For individual developers</Trans>
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
                  {personalFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => setDockerDialogOpen(true)}
                >
                  <Trans>Get Started</Trans>
                </Button>
              </CardFooter>
            </Card>

            <DockerStartDialog
              open={dockerDialogOpen}
              onOpenChange={setDockerDialogOpen}
            />

            {/* Team Card (Coming Soon) */}
            <Card className="relative overflow-hidden opacity-60">
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  <Trans>Coming Soon</Trans>
                </Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>
                    <Trans>Team</Trans>
                  </CardTitle>
                </div>
                <CardDescription>
                  <Trans>For teams and organizations</Trans>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    <Trans>Custom</Trans>
                  </span>
                </div>
                <ul className="space-y-3">
                  {teamFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button size="lg" variant="outline" className="w-full" disabled>
                  <Trans>Contact Sales</Trans>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cloud" />
      </Tabs>
    </SectionContainer>
  );
}
