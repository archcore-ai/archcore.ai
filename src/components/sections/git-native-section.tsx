import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { GitPullRequest, History, Package, EyeOff, Users } from "lucide-react";
import { SectionContainer } from "@/components/section-container";
import { INTERNAL_LINKS } from "@/lib/links";

/**
 * Section 5 of the canonical homepage sequence. The differentiator section:
 * every claim here is one a hosted memory product structurally cannot make.
 */
export function GitNativeSection() {
  const { _ } = useLingui();

  const claims: {
    icon: typeof GitPullRequest;
    title: string;
    description: string;
  }[] = [
    {
      icon: GitPullRequest,
      title: _(msg`Reviewable in pull requests`),
      description: _(msg`A change to a rule is a diff someone approves.`),
    },
    {
      icon: History,
      title: _(msg`Versioned with code`),
      description: _(msg`Context and implementation move on the same branch.`),
    },
    {
      icon: Package,
      title: _(msg`Portable across tools`),
      description: _(msg`Switch agents without rebuilding your project context.`),
    },
    {
      icon: EyeOff,
      title: _(msg`No opaque agent memory`),
      description: _(msg`Nothing is stored where you cannot read or edit it.`),
    },
    {
      icon: Users,
      title: _(msg`Team-owned source of truth`),
      description: _(msg`It belongs to the repository, not to one laptop.`),
    },
  ];

  return (
    <SectionContainer
      id="git-native"
      className="bg-muted/30 border-y border-border"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>Git-native</Trans>
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
          <Trans>Project context belongs in Git</Trans>
        </h2>
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          <Trans>
            Everything lives in a <code className="font-mono text-[0.9em]">.archcore/</code> directory
            inside your repository. Plain Markdown, no database, no external
            service.
          </Trans>
        </p>
      </div>

      <ul className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {claims.map((claim) => {
          const Icon = claim.icon;
          return (
            <li
              key={claim.title}
              className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
            >
              <div className="rounded-lg bg-muted p-2 w-fit">
                <Icon className="h-4 w-4 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold leading-tight">
                {claim.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {claim.description}
              </p>
            </li>
          );
        })}
      </ul>

      <p className="max-w-2xl mx-auto mt-10 text-center text-sm leading-relaxed text-muted-foreground">
        <Trans>
          <a
            href={INTERNAL_LINKS.gitNativeContext}
            className="underline underline-offset-4 decoration-border hover:text-foreground transition-colors"
          >
            Why project context belongs in Git
          </a>{" "}
          works through each claim, including what the alternatives give up.
        </Trans>
      </p>
    </SectionContainer>
  );
}
