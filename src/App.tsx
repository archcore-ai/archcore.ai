import {
  Scale,
  Users,
  Check,
  History,
  Layers,
  Target,
  AlertTriangle,
  Compass,
  Shuffle,
  Menu,
  X,
  Database,
  Box,
  Container,
  Sparkles,
  PlayCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import {
  DualCTA,
  InlineEmailCapture,
  ContactDialog,
  SectionCTACard,
  StickyCTABar,
} from "@/components/cta";
import { useCTAState } from "@/hooks/use-cta-state";
import { useTheme } from "@/hooks/use-theme";

const DEMO_URL = "https://demo.archcore.ai"; // Configure this

const navItems = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#problem", label: "Challenges" },
  { href: "#privacy", label: "Self-Hosted" },
];

function SectionContainer({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={cn("px-6 py-20 md:py-24", className)}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function SectionHeader({ title, description, className }: { title: string; description?: string; className?: string }) {
  return (
    <div className={cn("text-center space-y-4 mb-12", className)}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {description && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>}
    </div>
  );
}

function CheckListItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function StickyHeader({ onContactClick }: { onContactClick?: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent",
      )}
    >
      <div className="px-6">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
          <a href="#top">
            <Logo size="md" loading="eager" />
          </a>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" size="sm" asChild>
                <a href={item.href}>{item.label}</a>
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={onContactClick}>
              Contact Us
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md px-6">
          <nav className="max-w-6xl mx-auto py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2.5 text-sm hover:text-primary transition-colors"
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
            <button
              className="block py-2.5 text-sm w-full text-left hover:text-primary transition-colors"
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick?.();
              }}
            >
              Contact Us
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section id="top" className="relative py-16 pt-20 lg:py-24 lg:pt-28 px-4 md:px-6 lg:px-8 min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Interactive demo GIF on right side - desktop only */}
      <div className="absolute top-0 right-0 w-[55%] h-full hidden lg:block z-20">
        <a
          href={DEMO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group absolute top-1/2 right-0 -translate-y-1/2 translate-x-[10%] w-[90%] max-w-[650px] xl:max-w-[800px] block cursor-pointer"
        >
          {/* GIF */}
          <img
            src="/images/archcore-demo.gif"
            alt="Archcore platform demo"
            className="w-full h-auto max-w-none object-contain rounded-lg border border-border/50 shadow-lg cursor-pointer"
            loading="eager"
            decoding="async"
          />

          {/* Always-visible overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center cursor-pointer">
            <div className="flex flex-col items-center gap-3 text-white transition-transform duration-200 group-hover:scale-110">
              <PlayCircle className="h-16 w-16" strokeWidth={1.5} />
              <span className="text-lg font-semibold">Run Demo</span>
            </div>
          </div>
        </a>
      </div>

      {/* Content layer */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="max-w-lg md:max-w-xl lg:max-w-[480px] xl:max-w-[520px] space-y-8 mx-auto text-center lg:mx-0 lg:text-left">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              <span className="text-primary">Context engineering</span> for deterministic AI-assisted development.
            </h1>
            <p className="text-lg text-muted-foreground">
              Archcore helps teams share a clear understanding of how their systems work — across humans, AI, and time
            </p>
          </div>

          {/* Desktop: Show both buttons */}
          <div className="hidden lg:flex">
            <DualCTA
              primaryLabel="Open Demo"
              primaryHref={DEMO_URL}
              secondaryLabel="How it works?"
              secondaryHref="#how-it-works"
              className="justify-start"
            />
          </div>

          {/* Mobile: Show both buttons in a row, centered */}
          <div className="flex lg:hidden justify-center">
            <DualCTA
              primaryLabel="Open Demo"
              primaryHref={DEMO_URL}
              secondaryLabel="How it works?"
              secondaryHref="#how-it-works"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {["Self-hosted", "MCP-native"].map((chip) => (
              <Badge key={chip} variant="secondary" className="px-2 py-0.5 text-xs">
                {chip}
              </Badge>
            ))}
          </div>
        </div>

        {/* Interactive demo GIF - shown at bottom on mobile/tablet */}
        <div className="mt-8 lg:hidden">
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative max-w-xl mx-auto cursor-pointer"
          >
            {/* GIF */}
            <img
              src="/images/archcore-demo.gif"
              alt="Archcore platform demo"
              className="w-full h-auto object-contain rounded-lg border border-border/50 shadow-md cursor-pointer"
              loading="eager"
              decoding="async"
            />

            {/* Always-visible overlay on mobile */}
            <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center cursor-pointer">
              <div className="flex flex-col items-center gap-2 text-white transition-transform duration-200 active:scale-95">
                <PlayCircle className="h-12 w-12" strokeWidth={1.5} />
                <span className="text-base font-semibold">Run Demo</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section id="trust" className="border-y border-border bg-muted/30 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-muted-foreground">
          Built for <span className="text-foreground font-medium">engineering</span>,{" "}
          <span className="text-foreground font-medium">platform</span>, and{" "}
          <span className="text-foreground font-medium">enterprise</span> teams.
        </p>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <SectionContainer id="how-it-works" className="border-b border-border">
      <SectionHeader
        title="How Archcore works in practice"
        description="Context engineering that shapes real development workflows — from review to generation to evolving understanding."
      />

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
          <TabsTrigger value="questions">Q/A, onboarding</TabsTrigger>
          <TabsTrigger value="review">Code Review</TabsTrigger>
          <TabsTrigger value="generation">Code Generation</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Understand historical context, evolution, and intent</h3>
              <p className="text-muted-foreground leading-relaxed">
                Teams evolve — and so do their systems. With Archcore, you don't just inspect code: you interrogate why
                it exists and how it evolved. This accelerates onboarding, reduces technical ambiguity, and embeds
                tribal knowledge into a searchable lineage.
              </p>
              <div className="space-y-3">
                <CheckListItem
                  title='"Why does this exist?"'
                  description="Trace any part of your codebase back to the decisions and constraints that shaped it"
                />
                <CheckListItem
                  title='"What happens if I change X?"'
                  description="Understand the architectural impact before touching the code"
                />
                <CheckListItem
                  title="Historical understanding"
                  description="Institutional knowledge stays visible as teams grow and evolve, not buried in Slack or repos"
                />
              </div>
            </div>

            <div className="rounded-xl border border-border overflow-hidden bg-muted/30">
              <img
                src="/chat-mcp.gif"
                alt="Chat with Archcore MCP to understand architectural evolution"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="review" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Control code review with explicit architectural context</h3>
              <p className="text-muted-foreground leading-relaxed">
                AI code reviewers evaluate pull requests not just against syntax or tests, but with structural knowledge
                about your system — reducing uncertainty and surfacing architectural intent in every review.
              </p>
              <div className="space-y-3">
                <CheckListItem
                  title="Architecture-aware reviews"
                  description="PR evaluations reference documented decisions and architectural principles, not guesswork"
                />
                <CheckListItem
                  title="Traceable reasoning"
                  description="Every comment links back to a preserved decision, ADR, or rule — no undocumented assumptions"
                />
                <CheckListItem
                  title="Faster, clearer outcomes"
                  description="Reviews resolve faster when the context of why a design exists is right there"
                />
              </div>
            </div>

            <div className="rounded-xl border border-border overflow-hidden bg-muted/30">
              <img
                src="/images/review-mcp.gif"
                alt="AI code review with architectural context from Archcore"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="generation" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Empower code generation with real architectural direction</h3>
              <p className="text-muted-foreground leading-relaxed">
                When your tools generate new code, they shouldn't treat architecture as an afterthought. Archcore
                ensures that agents and LLM-powered tools produce code that obeys your real architectural context, not
                generic AI patterns.
              </p>
              <div className="space-y-3">
                <CheckListItem
                  title="Context-aware generation"
                  description="LLMs and agents work from your architectural record as the source of truth, not just code tokens"
                />
                <CheckListItem
                  title="Integration-ready workflow"
                  description="Archcore fits naturally into code generation pipelines and development tools"
                />
                <CheckListItem
                  title="Constraint-aligned output"
                  description="AI code suggestions are bounded by your documented constraints and design principles"
                />
              </div>
            </div>

            <div className="rounded-xl border border-border overflow-hidden bg-muted/30">
              <img
                src="/images/code-generation.gif"
                alt="Claude using Archcore MCP for context-aware code generation"
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 flex flex-col items-center gap-3">
        <Button
          variant="outline"
          size="lg"
          onClick={() => window.open(DEMO_URL, "_blank", "noopener,noreferrer")}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Explore source of thruth
        </Button>
      </div>
    </SectionContainer>
  );
}

const painPoints = [
  {
    icon: Shuffle,
    title: "Scattered decisions",
    description: "Architectural decisions scattered across Slack, docs, and tribal memory.",
  },
  {
    icon: AlertTriangle,
    title: "Implicit architectural constraints",
    description: "Architectural constraints remain implicit — invisible to both humans and AI.",
  },
  {
    icon: Compass,
    title: "Untraceable decisions",
    description: "Architectural and technical decisions lack clear traceability over time.",
  },
  {
    icon: Target,
    title: "Decision drift",
    description: "Documented intent gradually diverges from how the system actually behaves.",
  },
];

function ProblemSection() {
  return (
    <SectionContainer id="problem" className="bg-muted/30 border-b border-border">
      <div className="text-center space-y-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          AI is powerful. <span className="text-muted-foreground">Without structure, understanding breaks down.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {painPoints.map((point) => (
          <Card key={point.title} className="bg-background/50 border-destructive/20">
            <CardContent className="p-6 text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <point.icon className="h-6 w-6 text-destructive" />
              </div>
              <CardTitle className="text-base">{point.title}</CardTitle>
              <CardDescription className="text-sm">{point.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <SectionCTACard
        variant="featured"
        icon={Sparkles}
        title="See how Archcore works in practice"
        description="Build shared architectural understanding for humans and AI."
        buttonLabel="Open Demo"
        buttonHref={DEMO_URL}
        className="mt-10"
      />
    </SectionContainer>
  );
}

const useCases = [
  {
    icon: Scale,
    title: "Architecture governance",
    description: "Keep decisions reviewable and discoverable.",
  },
  {
    icon: Layers,
    title: "Platform standards",
    description: "Shared rules and playbooks that keep systems consistent at scale.",
  },
  {
    icon: Users,
    title: "Onboarding at scale",
    description: "A shared understanding that survives team growth.",
  },
  {
    icon: History,
    title: "Audit-ready history",
    description: "Preserve how and why architectural understanding changed over time.",
  },
];

function UseCasesSection() {
  return (
    <SectionContainer id="use-cases" className="border-b border-border">
      <SectionHeader
        title="For teams who treat architecture as an executable contract."
        description="Archcore is used where architectural intent must remain explicit, reviewable, and enforceable — even when AI is part of the development loop."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {useCases.map((useCase) => (
          <Card key={useCase.title}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-primary/10 flex-shrink-0">
                  <useCase.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                  <CardDescription>{useCase.description}</CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <SectionCTACard
        variant="featured"
        title="Start shipping with confidence"
        description="Keep architectural understanding aligned — across teams and AI."
        buttonLabel="Try Demo"
        buttonHref={DEMO_URL}
        className="mt-10"
      />
    </SectionContainer>
  );
}

const deploymentFeatures = [
  { icon: Box, label: "Single binary" },
  { icon: Database, label: "PostgreSQL backend" },
  { icon: Container, label: "Docker-ready" },
];

const trustBullets = [
  "Data sovereignty",
  "No vendor lock-in",
  "Data stays on your infrastructure",
  "Designed for environments with strict architectural and data controls",
];

function EnterpriseSection() {
  return (
    <SectionContainer id="privacy" className="bg-muted/30 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Private. Self-hosted. Yours.</h2>
          <p className="text-lg text-muted-foreground">
            archcore runs entirely on your infrastructure — no SaaS, no data export.
          </p>
          <p className="text-base text-muted-foreground">
            Architectural understanding remains local, explicit, and under your control.
          </p>

          <div className="grid grid-cols-2 gap-4">
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

          <DualCTA
            primaryLabel="Open Demo"
            primaryHref={DEMO_URL}
            // secondaryLabel="Explore the Architecture Layer"
            // secondaryHref={DOCS_URL}
            className="pt-2"
          />
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

const footerLinks = {
  Resources: [{ label: "GitHub", href: "https://github.com/archcore-ai", external: true }],
};

function FooterSection({ onContactClick }: { onContactClick?: () => void }) {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <Logo size="md" loading="lazy" />
            <p className="text-sm text-muted-foreground max-w-sm">
              Verified architectural context for AI-assisted development. Self-hosted, MCP-native.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Stay Updated</h3>
            <InlineEmailCapture
              placeholder="Enter your work email"
              buttonLabel="Subscribe"
              successMessage="Thanks! You're on the list."
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {Object.values(footerLinks)
              .flat()
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            <button onClick={onContactClick} className="text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </button>
          </div>

          <div className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} archcore.ai</div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useTheme(); // Initialize theme detection (system preference + localStorage)

  const {
    contactDialogOpen,
    setContactDialogOpen,
    openContactDialog,
  } = useCTAState();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader onContactClick={openContactDialog} />
      <main>
        <HeroSection />
        <TrustStrip />
        <HowItWorksSection />
        <UseCasesSection />
        <ProblemSection />
        <EnterpriseSection />
      </main>
      <FooterSection onContactClick={openContactDialog} />
      <StickyCTABar message="Questions about Archcore?" buttonLabel="Contact us" onButtonClick={openContactDialog} />
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
    </div>
  );
}
