import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  MessageSquareText,
  Plug,
  Puzzle,
  ShieldCheck,
  Star,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import { StickyHeader } from "@/components/sections/sticky-header";
import { FooterSection } from "@/components/sections/footer-section";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { InstallCommand } from "@/components/cta/install-command";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useTheme } from "@/hooks/use-theme";
import { INTERNAL_LINKS, LINKS } from "@/lib/links";

const SLASH_COMMANDS = [
  {
    cmd: "/archcore:context",
    desc: msg`Pull rules and ADRs that apply to the file you're touching.`,
  },
  {
    cmd: "/archcore:capture",
    desc: msg`Document a module — Archcore picks ADR, doc, spec, or guide.`,
  },
  {
    cmd: "/archcore:decide",
    desc: msg`Record a finalized technical or architectural decision.`,
  },
  {
    cmd: "/archcore:plan",
    desc: msg`Create a feature plan or full PRD → plan cascade.`,
  },
  {
    cmd: "/archcore:standard",
    desc: msg`Codify a team practice as ADR → rule → guide.`,
  },
  {
    cmd: "/archcore:review",
    desc: msg`Audit documentation health and find coverage gaps.`,
  },
  {
    cmd: "/archcore:status",
    desc: msg`Compact dashboard — counts, statuses, relations.`,
  },
  {
    cmd: "/archcore:graph",
    desc: msg`Render the Archcore document graph as a Mermaid flowchart.`,
  },
];

export function PluginPage() {
  const { _ } = useLingui();

  usePageMeta({
    title: _(
      msg`Archcore Plugin — make Claude Code and Cursor follow your repo rules`
    ),
    description: _(
      msg`Archcore loads the right ADRs, specs, rules, and patterns before Claude Code and Cursor edit code. Capture decisions, standards, and plans without leaving chat.`
    ),
    canonical: "/plugin",
    ogImage: "/og-image-plugin.png",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main>
        <PluginHero />
        <PluginInstall />
        <PluginFirstPrompts />
        <PluginShowcase />
        <PluginFeatures />
        <PluginCommands />
        <PluginFAQ />
        <PluginCrossSell />
        <PluginFinalCTA />
      </main>
      <FooterSection />
    </div>
  );
}

function PluginHero() {
  return (
    <section
      id="top"
      className="relative pt-28 lg:pt-32 pb-12 md:pb-16 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-[var(--container-max)] mx-auto text-center space-y-6">
        <Badge
          variant="outline"
          className="mx-auto border-primary/30 bg-primary/[0.06] text-primary"
        >
          <Plug className="h-3 w-3" />
          <Trans>Archcore Plugin · Claude Code & Cursor</Trans>
        </Badge>

        <h1 className="type-hero text-balance">
          <Trans>
            Make Claude Code and Cursor
            <br />
            follow your repo rules.
          </Trans>
        </h1>

        <p className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-[var(--container-narrow)] mx-auto">
          <Trans>
            Archcore loads the right ADRs, specs, rules, and patterns before
            your agent edits code. Capture new decisions, standards, and plans
            without leaving the chat.
          </Trans>
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
          <Button size="lg" className="gap-2" asChild>
            <a href="#install">
              <Puzzle className="h-4 w-4" />
              <Trans>Install in Claude Code</Trans>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href="#cursor">
              <Terminal className="h-4 w-4" />
              <Trans>Cursor setup</Trans>
            </a>
          </Button>
        </div>

        <div className="space-y-1 text-sm text-muted-foreground/70 pt-2">
          <p>
            <Trans>
              Fastest path for Claude Code · Cursor 2.5+ plugin · Open source ·
              Versioned in Git
            </Trans>
          </p>
          <p>
            <a
              href={LINKS.pluginRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              <Star
                className="inline-block h-3.5 w-3.5 -mt-0.5 mr-1"
                fill="currentColor"
              />
              <Trans>Star the plugin on GitHub</Trans>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function PluginShowcase() {
  const { _ } = useLingui();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <section aria-label={_(msg`Plugin in action`)} className="relative px-6">
      <div className="relative max-w-5xl mx-auto">
        <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-[#ff5f57]/80" />
              <span className="size-3 rounded-full bg-[#febc2e]/80" />
              <span className="size-3 rounded-full bg-[#28c840]/80" />
            </div>
            <div className="ml-3 flex-1 text-center">
              <span className="font-mono text-xs text-muted-foreground">
                cursor · plugins · archcore
              </span>
            </div>
            <Badge
              variant="outline"
              className="text-[10px] hidden sm:inline-flex"
            >
              <Trans>Live</Trans>
            </Badge>
          </div>
          <div className="relative bg-background">
            <img
              key={isDark ? "dark" : "light"}
              src={
                isDark
                  ? "/images/cursor-plugin-dark.png"
                  : "/images/cursor-plugin-light.png"
              }
              alt={_(
                msg`Archcore plugin in the Cursor plugin marketplace, showing MCP and slash commands`
              )}
              width={1436}
              height={1142}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto integration-card-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function PluginFeatures() {
  const { _ } = useLingui();

  const features = [
    {
      icon: Workflow,
      title: _(msg`Intent-based slash commands`),
      description: _(
        msg`Type /archcore:capture, /archcore:decide, /archcore:context — full document workflows live inside your agent.`
      ),
    },
    {
      icon: ShieldCheck,
      title: _(msg`Knows your architecture`),
      description: _(
        msg`Reads ADRs, rules, and guides from .archcore/ before suggesting changes — so refactors land in the right place.`
      ),
    },
    {
      icon: Zap,
      title: _(msg`Zero setup for Claude Code`),
      description: _(
        msg`Auto-bundles a launcher that resolves the Archcore CLI on first call. MCP registers itself. No configs to write.`
      ),
    },
  ];

  return (
    <SectionContainer id="features" className="py-16 md:py-20">
      <SectionHeader
        title={_(msg`Built for the way agents actually work`)}
        description={_(
          msg`The plugin wraps the Archcore context layer in commands and guardrails your team can use from day one.`
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-6 flex flex-col gap-3"
          >
            <div className="size-10 rounded-lg bg-primary/[0.08] text-primary flex items-center justify-center">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-base leading-tight">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

function PluginInstall() {
  const { _ } = useLingui();
  return (
    <SectionContainer id="install" className="py-16 md:py-20">
      <SectionHeader
        title={_(msg`Install in 30 seconds`)}
        description={
          <Trans>
            Claude Code auto-resolves the CLI and registers MCP. Cursor users
            install the plugin, then may need manual MCP registration depending
            on their workspace.
          </Trans>
        }
      />

      <div className="max-w-3xl mx-auto space-y-5">
        <article className="rounded-2xl border-2 border-primary/30 bg-primary/[0.04] p-6 space-y-4 shadow-sm">
          <header className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-base">Claude Code</h3>
            <Badge variant="default" className="text-[10px]">
              <Trans>Production</Trans>
            </Badge>
          </header>
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              <Trans>From inside Claude Code</Trans>
            </p>
            <InstallCommand
              variant="inline"
              command="/plugin marketplace add archcore-ai/plugin"
            />
            <InstallCommand
              variant="inline"
              command="/plugin install archcore@archcore-plugins"
            />
          </div>
          <details className="text-xs text-muted-foreground">
            <summary className="cursor-pointer hover:text-foreground transition-colors">
              <Trans>Or from your terminal</Trans>
            </summary>
            <div className="mt-2 space-y-2">
              <InstallCommand
                variant="inline"
                command="claude plugin marketplace add archcore-ai/plugin"
              />
              <InstallCommand
                variant="inline"
                command="claude plugin install archcore@archcore-plugins"
              />
            </div>
          </details>
        </article>

        <article
          id="cursor"
          className="rounded-2xl border border-border bg-card p-6 space-y-3 scroll-mt-24"
        >
          <header className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-base">Cursor 2.5+</h3>
            <Badge variant="outline" className="text-[10px]">
              <Trans>Implemented</Trans>
            </Badge>
          </header>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <Trans>
              Open Cursor → Plugins, paste the GitHub URL into "Search or paste
              link", and click Add Plugin:
            </Trans>
          </p>
          <InstallCommand
            variant="inline"
            command="https://github.com/archcore-ai/plugin"
          />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <Trans>Or grab it from</Trans>{" "}
            <a
              href={LINKS.cursorDirectory}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Cursor Directory
              <ArrowUpRight className="h-3 w-3" />
            </a>
            .
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border">
            <Trans>
              If MCP is not registered automatically in Cursor, install the CLI
              context layer and run archcore mcp install. Need raw context for
              any MCP-capable agent today?
            </Trans>{" "}
            <a
              href={INTERNAL_LINKS.cli}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              <Trans>Use the CLI</Trans>
            </a>
            .
          </p>
        </article>
      </div>
    </SectionContainer>
  );
}

function PluginFirstPrompts() {
  const { _ } = useLingui();
  const prompts = [
    {
      prompt: _(
        msg`Before I touch src/auth/, what rules and prior decisions apply here?`
      ),
      outcome: _(
        msg`Loads the matching ADRs, rules, and patterns before editing.`
      ),
    },
    {
      prompt: _(msg`Add a new API handler and follow this repo's conventions.`),
      outcome: _(
        msg`Keeps generated code aligned with your existing structure.`
      ),
    },
    {
      prompt: _(msg`We picked PostgreSQL. Record it as a team standard.`),
      outcome: _(
        msg`Creates structured Archcore documents the next session can read.`
      ),
    },
  ];

  return (
    <SectionContainer id="first-prompts" className="py-16 md:py-20 bg-muted/30">
      <SectionHeader
        title={_(msg`First 3 prompts to try`)}
        description={_(
          msg`Start with context loading, convention-following, and decision capture — the three moments where repo memory pays off immediately.`
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {prompts.map((item) => (
          <article
            key={item.prompt}
            className="rounded-xl border border-border bg-background p-5 flex flex-col gap-4"
          >
            <MessageSquareText className="h-5 w-5 text-muted-foreground" />
            <p className="font-mono text-sm leading-relaxed">“{item.prompt}”</p>
            <p className="text-xs text-muted-foreground leading-relaxed pt-3 border-t border-border">
              {item.outcome}
            </p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}

function PluginCommands() {
  const { _ } = useLingui();
  return (
    <SectionContainer id="commands" className="py-16 md:py-20 bg-muted/30">
      <SectionHeader
        title={_(msg`Slash commands at your fingertips`)}
        description={_(
          msg`Each command runs a typed document workflow — from a single decision to a full PRD cascade.`
        )}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
        {SLASH_COMMANDS.map(({ cmd, desc }) => (
          <div
            key={cmd}
            className="rounded-xl border border-border bg-background p-4 flex flex-col gap-2"
          >
            <code className="font-mono text-xs font-semibold text-primary">
              {cmd}
            </code>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {_(desc)}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

function PluginFAQ() {
  const { _ } = useLingui();
  const items = [
    {
      q: _(msg`Do I need to install the CLI separately?`),
      a: _(
        msg`No. The plugin bundles a launcher that auto-resolves and caches the Archcore CLI on first tool call (~5s, one-time). If you already have archcore on PATH, the launcher defers to it.`
      ),
    },
    {
      q: _(msg`Which agents are supported?`),
      a: _(
        msg`Claude Code (production) and Cursor 2.5+ (implemented). Copilot and Codex CLI are on the plugin roadmap. For other MCP-capable agents, use the CLI directly.`
      ),
    },
    {
      q: _(msg`Can I use my own CLI install?`),
      a: _(
        msg`Yes. Set ARCHCORE_BIN=/abs/path/to/archcore to point the plugin at your own binary, or ARCHCORE_SKIP_DOWNLOAD=1 to disable the auto-download (useful for offline / enterprise deployments).`
      ),
    },
    {
      q: _(msg`Where do my docs live?`),
      a: _(
        msg`In .archcore/ inside your repository. Markdown with YAML frontmatter, versioned with your code. No external services, accounts, or databases.`
      ),
    },
  ];

  return (
    <SectionContainer id="faq" className="py-16 md:py-20">
      <SectionHeader title={_(msg`Plugin FAQ`)} />
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {items.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-sm md:text-base">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionContainer>
  );
}

function PluginCrossSell() {
  return (
    <SectionContainer className="py-12">
      <a
        href={INTERNAL_LINKS.cli}
        target="_blank"
        rel="noopener noreferrer"
        className="group max-w-3xl mx-auto rounded-2xl border border-border bg-card p-5 flex items-center gap-4 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
      >
        <div className="rounded-lg bg-muted p-2.5 shrink-0">
          <Terminal className="h-5 w-5 text-foreground/80" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm mb-0.5">
            <Trans>Need the raw context layer instead?</Trans>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <Trans>
              The Archcore CLI works with 8 AI agents via MCP and session hooks
              — no plugin host required.
            </Trans>
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary shrink-0" />
      </a>
    </SectionContainer>
  );
}

function PluginFinalCTA() {
  const { _ } = useLingui();
  return (
    <SectionContainer id="more" className="py-16 md:py-20">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          <Trans>Ship architecture-aware code today</Trans>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          <Trans>
            Two commands inside Claude Code. Your team's decisions travel with
            every change.
          </Trans>
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
          <Button size="lg" className="gap-2" asChild>
            <a href="#install">
              <Puzzle className="h-4 w-4" />
              <Trans>Install plugin</Trans>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href={LINKS.docs} target="_blank" rel="noopener noreferrer">
              <BookOpen className="h-4 w-4" />
              <Trans>Read the docs</Trans>
            </a>
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-sm text-muted-foreground">
          <a
            href={LINKS.pluginRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Star className="h-3.5 w-3.5" fill="currentColor" />
            {_(msg`Star on GitHub`)}
          </a>
          <a
            href={LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            {_(msg`Join Discord`)}
          </a>
          <Link
            to={INTERNAL_LINKS.cli}
            className="hover:text-foreground transition-colors"
          >
            {_(msg`Compare with the CLI`)}
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
