import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Cpu,
  FolderGit2,
  Github,
  Plug,
  Puzzle,
  ScrollText,
  Star,
  Terminal,
  Webhook,
  type LucideIcon,
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

export function CLIPage() {
  const { _ } = useLingui();

  usePageMeta({
    title: _(
      msg`Archcore CLI — repo-native context layer for AI coding agents`
    ),
    description: _(
      msg`The Archcore CLI puts your architectural decisions, rules, and conventions in .archcore/ — versioned with your code, exposed to 8 AI agents via MCP and session hooks.`
    ),
    canonical: "/cli",
    ogImage: "/og-image-cli.png",
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main>
        <CLIHero />
        <CLIShowcase />
        <CLIInstall />
        <CLIWhatYouGet />
        <CLITracks />
        <CLIAgents />
        <CLIWhyNot />
        <CLICheatsheet />
        <CLIFAQ />
        <CLICrossSell />
        <CLIFinalCTA />
      </main>
      <FooterSection />
    </div>
  );
}

function CLIHero() {
  return (
    <section
      id="top"
      className="hero-pattern relative pt-28 lg:pt-32 pb-12 md:pb-16 px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
        <Badge
          variant="outline"
          className="mx-auto border-primary/30 bg-primary/[0.06] text-primary"
        >
          <Terminal className="h-3 w-3" />
          <Trans>Archcore CLI · MCP + Hooks</Trans>
        </Badge>

        <h1 className="hero-title text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
          <Trans>Repo-native context for any AI agent.</Trans>
        </h1>

        <p className="hero-description text-lg md:text-xl leading-relaxed text-muted-foreground/90 max-w-3xl mx-auto">
          <Trans>
            The Archcore CLI puts your architectural decisions, rules, and
            conventions in <code className="font-mono text-base bg-muted/60 px-1.5 py-0.5 rounded">.archcore/</code> — versioned with your code, exposed to 8 AI
            agents via MCP and session hooks.
          </Trans>
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
          <Button size="lg" className="gap-2" asChild>
            <a href="#install">
              <Terminal className="h-4 w-4" />
              <Trans>Install CLI</Trans>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="gap-2" asChild>
            <a href={LINKS.cliRepo} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4" />
              <Trans>View on GitHub</Trans>
            </a>
          </Button>
        </div>

        <div className="space-y-1 text-sm text-muted-foreground/70 pt-2">
          <p>
            <Trans>
              Standalone binary · macOS, Linux, Windows · No external services ·
              Apache 2.0
            </Trans>
          </p>
          <p>
            <a
              href={LINKS.cliRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              <Star
                className="inline-block h-3.5 w-3.5 -mt-0.5 mr-1"
                fill="currentColor"
              />
              <Trans>Star the CLI on GitHub</Trans>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function CLIShowcase() {
  const { _ } = useLingui();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <section
      aria-label={_(msg`CLI in action`)}
      className="relative px-6"
    >
      <div className="relative max-w-5xl mx-auto">
        <div
          aria-hidden
          className="showcase-glow pointer-events-none absolute inset-x-0 -top-10 -bottom-10 -z-10 mx-auto max-w-3xl rounded-[3rem] bg-[radial-gradient(60%_60%_at_50%_50%,oklch(0.8_0.15_85/0.25),transparent_70%)] blur-3xl"
        />
        <img
          key={isDark ? "dark" : "light"}
          src={
            isDark
              ? "/images/cli-init-dark.png"
              : "/images/cli-init-light.png"
          }
          alt={_(msg`archcore init creating .archcore/ in a project`)}
          width={1600}
          height={1005}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto integration-card-image"
        />
      </div>
    </section>
  );
}

function CLIInstall() {
  const { _ } = useLingui();
  return (
    <SectionContainer id="install" className="py-16 md:py-20">
      <SectionHeader
        title={_(msg`Install in one line`)}
        description={
          <Trans>
            Cross-platform binary. No Node, no Python, no external services.
          </Trans>
        }
      />
      <div className="max-w-2xl mx-auto space-y-4">
        <InstallCommand variant="hero" />
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <p className="text-sm font-medium">
            <Trans>Then initialize your repo</Trans>
          </p>
          <InstallCommand variant="inline" command="cd your-project && archcore init" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <Trans>
              On Windows? See the{" "}
              <a
                href="https://docs.archcore.ai/cli/install/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                full install guide
              </a>{" "}
              (PowerShell, WSL, go install, from source).
            </Trans>
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}

interface Primitive {
  icon: LucideIcon;
  title: string;
  description: string;
}

function CLIWhatYouGet() {
  const { _ } = useLingui();
  const primitives: Primitive[] = [
    {
      icon: FolderGit2,
      title: ".archcore/",
      description: _(
        msg`Repo-native directory of structured, versioned documents — Markdown with YAML frontmatter.`
      ),
    },
    {
      icon: ScrollText,
      title: _(msg`18 document types`),
      description: _(
        msg`ADR, PRD, RFC, rule, guide, doc, spec, plan, task-type — vision, knowledge, and experience layers.`
      ),
    },
    {
      icon: Plug,
      title: _(msg`MCP server`),
      description: _(
        msg`10 tools — list, get, create, update, search, relate — exposed to any MCP-capable agent.`
      ),
    },
    {
      icon: Webhook,
      title: _(msg`Session hooks`),
      description: _(
        msg`Inject the right repo context at session start for supported agents — automatically.`
      ),
    },
  ];

  return (
    <SectionContainer id="features" className="py-16 md:py-20">
      <SectionHeader
        title={_(msg`What you get`)}
        description={_(
          msg`A small CLI, a structured directory, and protocol-level integration with the agents you already use.`
        )}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {primitives.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2"
          >
            <Icon className="h-5 w-5 text-muted-foreground" />
            <p className="font-mono text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

interface SupportedAgent {
  name: string;
  badge: "hooks_mcp" | "mcp_only" | "manual";
}

interface Track {
  prompt: string;
  cascade: string;
  description: string;
}

function CLITracks() {
  const { _ } = useLingui();
  const tracks: Track[] = [
    {
      prompt: "/product_track",
      cascade: "idea → PRD → plan",
      description: _(msg`Lightweight feature flow.`),
    },
    {
      prompt: "/architecture_track",
      cascade: "ADR → spec → plan",
      description: _(msg`Technical design + implementation.`),
    },
    {
      prompt: "/standard_track",
      cascade: "ADR → rule → guide",
      description: _(msg`Codify a team standard.`),
    },
    {
      prompt: "/sources_track",
      cascade: "MRD → BRD → URD",
      description: _(msg`Market / business / user discovery.`),
    },
    {
      prompt: "/iso_track",
      cascade: "BRS → StRS → SyRS → SRS",
      description: _(msg`Formal ISO 29148 cascade.`),
    },
  ];

  return (
    <SectionContainer id="tracks" className="py-16 md:py-20">
      <SectionHeader
        title={_(msg`One prompt. A whole document cascade.`)}
        description={_(
          msg`Tracks are MCP prompts that orchestrate full workflows in a single call — the agent drafts and links every document for you. Use a lightweight track for most work, or formal ones when you need traceability.`
        )}
      />
      <div className="max-w-4xl mx-auto space-y-3">
        {tracks.map((track) => (
          <div
            key={track.prompt}
            className="rounded-xl border border-border bg-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-5"
          >
            <code className="font-mono text-sm font-semibold text-primary sm:w-44 shrink-0">
              {track.prompt}
            </code>
            <code className="font-mono text-xs text-muted-foreground sm:flex-1">
              {track.cascade}
            </code>
            <p className="text-sm text-muted-foreground sm:w-72 leading-relaxed">
              {track.description}
            </p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
        <Trans>
          Run <code className="font-mono bg-muted px-1.5 py-0.5 rounded">/product_track feature="user notifications"</code> in your agent — it
          drafts an idea, derives a PRD, builds a plan, and links them
          automatically.
        </Trans>
      </p>
    </SectionContainer>
  );
}

function CLIAgents() {
  const { _ } = useLingui();
  const agents: SupportedAgent[] = [
    { name: "Claude Code", badge: "hooks_mcp" },
    { name: "Cursor", badge: "hooks_mcp" },
    { name: "Gemini CLI", badge: "hooks_mcp" },
    { name: "GitHub Copilot", badge: "hooks_mcp" },
    { name: "OpenCode", badge: "mcp_only" },
    { name: "Codex CLI", badge: "mcp_only" },
    { name: "Roo Code", badge: "mcp_only" },
    { name: "Cline", badge: "manual" },
  ];

  const badgeFor = (b: SupportedAgent["badge"]) => {
    switch (b) {
      case "hooks_mcp":
        return {
          label: _(msg`Hooks + MCP`),
          variant: "default" as const,
        };
      case "mcp_only":
        return {
          label: _(msg`MCP`),
          variant: "secondary" as const,
        };
      case "manual":
        return {
          label: _(msg`Manual setup`),
          variant: "outline" as const,
        };
    }
  };

  return (
    <SectionContainer id="agents" className="py-16 md:py-20 bg-muted/30">
      <SectionHeader
        title={_(msg`Works with 8 AI coding agents`)}
        description={_(
          msg`Wire up hooks and MCP in seconds. archcore hooks install · archcore mcp install.`
        )}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
        {agents.map((agent) => {
          const badge = badgeFor(agent.badge);
          return (
            <div
              key={agent.name}
              className="rounded-xl border border-border bg-background p-4 flex flex-col items-start gap-2"
            >
              <Bot className="h-5 w-5 text-muted-foreground" />
              <p className="font-semibold text-sm">{agent.name}</p>
              <Badge variant={badge.variant} className="text-[10px]">
                {badge.label}
              </Badge>
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground mt-6 max-w-2xl mx-auto">
        <Trans>
          Hooks inject context at session start. MCP exposes tools to browse
          and edit .archcore/ documents during a session.
        </Trans>
      </p>
    </SectionContainer>
  );
}

function CLIWhyNot() {
  return (
    <SectionContainer id="why" className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <Cpu className="h-8 w-8 mx-auto text-primary" />
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          <Trans>Why not just CLAUDE.md or .cursorrules?</Trans>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          <Trans>
            Instruction files tell agents <em>what</em> you want. Archcore tells
            them <em>how your system works</em> — typed, queryable, relation-aware
            project truth that evolves with your code.
          </Trans>
        </p>
      </div>
    </SectionContainer>
  );
}

function CLICheatsheet() {
  const { _ } = useLingui();

  const commands = [
    { cmd: "archcore init", note: _(msg`Initialize .archcore/ in your repo`) },
    { cmd: "archcore doctor", note: _(msg`Diagnose setup issues`) },
    { cmd: "archcore hooks install", note: _(msg`Wire up session hooks`) },
    { cmd: "archcore mcp install", note: _(msg`Configure MCP for your agent`) },
    { cmd: "archcore update", note: _(msg`Self-update to latest version`) },
    { cmd: "archcore config", note: _(msg`Manage settings (sync, language)`) },
  ];

  return (
    <SectionContainer id="commands" className="py-16 md:py-20 bg-muted/30">
      <SectionHeader
        title={_(msg`Commands cheatsheet`)}
        description={_(msg`Click to copy. Run from any project root.`)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
        {commands.map(({ cmd, note }) => (
          <div
            key={cmd}
            className="rounded-xl border border-border bg-background p-4 flex flex-col gap-2"
          >
            <InstallCommand variant="inline" command={cmd} />
            <p className="text-xs text-muted-foreground leading-relaxed pl-1">
              {note}
            </p>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

function CLIFAQ() {
  const { _ } = useLingui();
  const items = [
    {
      q: _(msg`What does archcore init create?`),
      a: _(
        msg`A .archcore/ directory with templates and config for 18 document types in three layers — vision (PRD, idea, plan, MRD, BRD, URD, BRS, StRS, SyRS, SRS), knowledge (ADR, RFC, rule, guide, doc, spec), and experience (task-type, CPAT).`
      ),
    },
    {
      q: _(msg`Do I need any external services?`),
      a: _(
        msg`No. Standalone binary. Everything in .archcore/ stays in your repo — no servers, databases, accounts, or external dependencies.`
      ),
    },
    {
      q: _(msg`Should I install the plugin instead?`),
      a: _(
        msg`If you use Claude Code or Cursor, yes — see the plugin page. The plugin uses the CLI under the hood and gives you intent-based slash commands. Install the CLI on its own when you want the raw context layer or work with another MCP-capable agent.`
      ),
    },
    {
      q: _(msg`How do I keep it updated?`),
      a: _(
        msg`Run archcore update. Cross-platform on amd64/arm64. Run archcore doctor anytime to verify your setup.`
      ),
    },
  ];

  return (
    <SectionContainer id="faq" className="py-16 md:py-20">
      <SectionHeader title={_(msg`CLI FAQ`)} />
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

function CLICrossSell() {
  return (
    <SectionContainer className="py-12">
      <a
        href={INTERNAL_LINKS.plugin}
        target="_blank"
        rel="noopener noreferrer"
        className="group max-w-3xl mx-auto rounded-2xl border border-border bg-card p-5 flex items-center gap-4 transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
      >
        <div className="rounded-lg bg-primary/[0.08] p-2.5 shrink-0">
          <Puzzle className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm mb-0.5">
            <Trans>Using Claude Code or Cursor?</Trans>
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <Trans>
              Get the plugin — intent-based slash commands and zero-config MCP
              registration on top of the CLI.
            </Trans>
          </p>
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary shrink-0" />
      </a>
    </SectionContainer>
  );
}

function CLIFinalCTA() {
  const { _ } = useLingui();
  return (
    <SectionContainer id="more" className="py-16 md:py-20">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          <Trans>Ship the CLI today</Trans>
        </h2>
        <p className="text-base md:text-lg text-muted-foreground">
          <Trans>
            One binary, eight agents, zero accounts. Your team's truth, in Git.
          </Trans>
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
          <Button size="lg" className="gap-2" asChild>
            <a href="#install">
              <Terminal className="h-4 w-4" />
              <Trans>Install CLI</Trans>
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
            href={LINKS.cliRepo}
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
            to={INTERNAL_LINKS.plugin}
            className="hover:text-foreground transition-colors"
          >
            {_(msg`Compare with the plugin`)}
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
