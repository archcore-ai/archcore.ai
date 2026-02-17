import { useState } from "react";
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { Check, Clock, Lock } from "lucide-react";
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

  // Team features — commented out while Team card is in "Coming Soon" state
  // const teamFeatures = [
  //   _(msg`Multi-user auth`),
  //   _(msg`Unlimited projects`),
  //   _(msg`Team collaboration`),
  //   _(msg`Priority support`),
  // ];

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
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/40 text-primary">
                    Alpha
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

            {/* Team Card — Coming Soon placeholder */}
            <Card className="relative opacity-70">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>
                    <Trans>Team</Trans>
                  </CardTitle>
                  <Badge variant="secondary">
                    <Trans>Coming Soon</Trans>
                  </Badge>
                </div>
                <CardDescription>
                  <Trans>For teams and organizations</Trans>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-10 text-center space-y-3">
                <Clock className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground max-w-[220px]">
                  <Trans>Team plan is coming soon. Stay tuned!</Trans>
                </p>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full" disabled>
                  <Trans>Coming Soon</Trans>
                </Button>
              </CardFooter>
            </Card>

            {/* Original Team Card — commented out for restoration later
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CardTitle>
                    <Trans>Team</Trans>
                  </CardTitle>
                  <Badge variant="secondary">
                    <Trans>Free</Trans>
                  </Badge>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/40 text-primary">
                    Early Access
                  </Badge>
                </div>
                <CardDescription>
                  <Trans>For teams and organizations</Trans>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">
                    <Trans>Early Access</Trans>
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
                <Button size="lg" className="w-full" asChild>
                  <Link to="/teams/getting-started">
                    <Trans>Get Started</Trans>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            */}
          </div>
        </TabsContent>

        <TabsContent value="cloud" />
      </Tabs>
    </SectionContainer>
  );
}
