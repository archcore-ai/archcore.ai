import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { useLingui } from "@lingui/react";
import { cn } from "@/lib/utils";
import { ThemedImage } from "@/components/themed-image";
import { InstallCommand } from "@/components/cta/install-command";
import { buttonVariants } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

interface HowItWorksCard {
  title: ReactNode;
  description: ReactNode;
  extra?: ReactNode;
  lightSrc: string;
  darkSrc: string;
}

export function HowItWorksSection() {
  const { _ } = useLingui();

  const cards: HowItWorksCard[] = [
    {
      title: _(msg`One command to start`),
      description: (
        <Trans>
          Run{" "}
          <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">
            archcore init
          </code>{" "}
          and get a structured{" "}
          <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">
            .archcore/
          </code>{" "}
          directory in your repo. No servers, no accounts, no configuration
          files. Just a CLI and 30 seconds.
        </Trans>
      ),
      extra: <InstallCommand variant="inline" className="text-xs p-2 pr-9" />,
      lightSrc: "/images/cli-init-light.png",
      darkSrc: "/images/cli-init-dark.png",
    },
    {
      title: _(msg`Documentation lives in your repo`),
      description: _(
        msg`Like README, but for architecture. Your decisions, rules, and guides are version-controlled markdown files. They go through code review, show up in diffs, and never go stale in a wiki no one checks.`
      ),
      extra: (
        <a
          href="https://github.com/archcore-ai/cli/tree/main/.archcore"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          <Trans>See real example</Trans>
          <ExternalLink className="size-3.5" />
        </a>
      ),
      lightSrc: "/images/in-git-light.png",
      darkSrc: "/images/in-git-dark.png",
    },
  ];

  return (
    <SectionContainer
      id="how-it-works"
      className="border-b border-border pb-10 md:pb-12"
    >
      <p className="text-center text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
        {_(msg`How it works`)}
      </p>
      <SectionHeader
        title={_(msg`Give your AI agents the full picture`)}
        description={_(
          msg`Build and structure project knowledge with Archcore — so every agent works with real architectural context, not guesswork.`
        )}
      />

      <div className="max-w-5xl mx-auto">
        {cards.map(
          ({ title, description, extra, lightSrc, darkSrc }, index) => {
            const isEven = index % 2 === 0;
            const isLast = index === cards.length - 1;

            return (
              <div
                key={lightSrc}
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 py-8 md:px-6 md:py-10",
                  !isLast && "border-b border-border"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg overflow-hidden",
                    "order-1",
                    !isEven && "md:order-2"
                  )}
                >
                  <ThemedImage
                    lightSrc={lightSrc}
                    darkSrc={darkSrc}
                    alt={typeof title === "string" ? title : "Archcore"}
                    className="w-full rounded-lg integration-card-image"
                    width={lightSrc.includes("cli-init") ? 850 : 638}
                    height={lightSrc.includes("cli-init") ? 402 : 496}
                    loading="lazy"
                  />
                </div>
                <div
                  className={cn(
                    "flex flex-col justify-start space-y-4 order-2",
                    !isEven && "md:order-1"
                  )}
                >
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                  {extra}
                </div>
              </div>
            );
          }
        )}
      </div>
    </SectionContainer>
  );
}
