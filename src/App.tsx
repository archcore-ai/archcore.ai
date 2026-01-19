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
  GitPullRequest,
  MessageSquare,
  Lightbulb,
  RefreshCw,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import {
  DualCTA,
  InlineEmailCapture,
  ContactDialog,
  OpenDemoDialog,
  SectionCTACard,
  StickyCTABar,
} from "@/components/cta";
import { useCTAState } from "@/hooks/use-cta-state";
import { useTheme } from "@/hooks/use-theme";

const DEMO_URL = "https://demo.archcore.ai"; // Configure this

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
      <div className="max-w-6xl mx-auto px-6 md:px-0 h-16 flex items-center justify-between">
        <a href="#top">
          <Logo size="md" loading="eager" />
        </a>

        <div className="hidden md:flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <a href="#use-cases">Use Cases</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#workflows">Workflows</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#problem">Challenges</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#privacy">Self-Hosted</a>
          </Button>
          <Button variant="ghost" size="sm" onClick={onContactClick}>
            Contact Us
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => {
            setMobileMenuOpen(!mobileMenuOpen);
          }}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="px-6 py-4 space-y-2">
            <a
              href="#use-cases"
              className="block py-2 text-sm"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              Use Cases
            </a>
            <a
              href="#workflows"
              className="block py-2 text-sm"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              Workflows
            </a>
            <a
              href="#problem"
              className="block py-2 text-sm"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              Challenges
            </a>
            <a
              href="#privacy"
              className="block py-2 text-sm"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              Self-Hosted
            </a>
            <button
              className="block py-2 text-sm w-full text-left"
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

function HeroSection({ onOpenDemo, onContactClick }: { onOpenDemo?: () => void; onContactClick?: () => void }) {
  return (
    <section id="top" className="relative py-24 pt-28 px-6 min-h-[600px] lg:min-h-[700px] overflow-hidden">
      {/* Large decorative background image on right side - desktop only */}
      {/* Both theme images rendered, CSS controls visibility to prevent flash */}
      <div className="absolute top-0 right-0 w-[55%] h-full pointer-events-none hidden lg:block" style={{ zIndex: 1 }}>
        <img
          src="/images/main-page-light.png"
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[10%] w-[650px] xl:w-[800px] h-auto max-w-none opacity-80 object-contain dark:hidden"
          loading="eager"
          decoding="async"
        />
        <img
          src="/images/main-page-dark.png"
          alt=""
          aria-hidden="true"
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[10%] w-[650px] xl:w-[800px] h-auto max-w-none opacity-70 object-contain hidden dark:block"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Content layer */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="max-w-lg lg:max-w-[38%] space-y-8 mx-auto text-center lg:mx-0 lg:text-left">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
              <span className="text-primary">Context engineering</span> for deterministic AI-assisted development.
            </h1>
            <p className="text-lg text-muted-foreground">
              Archcore helps teams share a clear understanding of how their systems work — across humans, AI, and time
            </p>
          </div>

          <DualCTA
            primaryLabel="Open Demo"
            onPrimaryClick={onOpenDemo}
            secondaryLabel="Contact Us"
            onSecondaryClick={onContactClick}
            className="justify-center lg:justify-start"
          />

          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {["Self-hosted", "MCP-native"].map((chip) => (
              <Badge key={chip} variant="secondary" className="px-2 py-0.5 text-xs">
                {chip}
              </Badge>
            ))}
          </div>
        </div>

        {/* Mobile/tablet image - shown at bottom */}
        {/* Both theme images rendered, CSS controls visibility to prevent flash */}
        <div className="mt-12 lg:hidden">
          <img
            src="/images/main-page-light.png"
            alt="Archcore platform interface"
            className="w-full h-auto max-w-xl mx-auto object-contain dark:hidden"
            loading="eager"
            decoding="async"
          />
          <img
            src="/images/main-page-dark.png"
            alt="Archcore platform interface"
            className="w-full h-auto max-w-xl mx-auto object-contain hidden dark:block"
            loading="eager"
            decoding="async"
          />
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

function ProblemSection({ onOpenDemo }: { onOpenDemo?: () => void }) {
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
        onButtonClick={onOpenDemo}
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

function UseCasesSection({ onOpenDemo }: { onOpenDemo?: () => void }) {
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
        onButtonClick={onOpenDemo}
        className="mt-10"
      />
    </SectionContainer>
  );
}

interface WorkflowItem {
  icon: typeof GitPullRequest;
  title: string;
  description: string;
  imageLight?: string;
  imageDark?: string;
}

const workflowItems: WorkflowItem[] = [
  {
    icon: GitPullRequest,
    title: "Architecture-aware code reviews",
    description:
      "Pull requests are evaluated not only against style or tests, but against explicit architectural decisions, constraints, and intent.",
    imageLight: "/images/documents-list-light.png",
    imageDark: "/images/documents-list-dark.png",
  },
  {
    icon: MessageSquare,
    title: "LLM conversations grounded in architectural reality",
    description:
      "Instead of generic answers, AI agents reason over your system's actual architectural context — decisions, rules, and historical intent.",
  },
  {
    icon: Lightbulb,
    title: "Explainability beyond code",
    description:
      "Understand not just how the system works, but why it was designed this way — even months or years after decisions were made.",
    imageLight: "/images/editor-zoom-light.png",
    imageDark: "/images/editor-zoom-dark.png",
  },
  {
    icon: RefreshCw,
    title: "Human and AI alignment over time",
    description:
      "As systems evolve, Archcore helps ensure that human understanding and AI reasoning stay aligned with the same architectural source of truth.",
    imageLight: "/images/analytics-light.png",
    imageDark: "/images/analytics-dark.png",
  },
];

function WorkflowsSection() {
  return (
    <SectionContainer id="workflows" className="border-b border-border">
      <SectionHeader
        title="Where architectural intent meets daily workflows"
        description="Architectural intent stops living in documents — and starts shaping how code is reviewed, discussed, and generated."
      />

      <div className="space-y-16">
        {workflowItems.map((item, index) => {
          const isReversed = index % 2 === 1;
          return (
            <div
              key={item.title}
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start",
                isReversed && "lg:[direction:rtl]",
              )}
            >
              <div className={cn("space-y-4", isReversed && "lg:[direction:ltr]")}>
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              <div className="lg:[direction:ltr]">
                <div className="rounded-xl border border-border overflow-hidden bg-muted/30">
                  <img
                    src={item.imageLight ?? "/images/mcp-dark.png"}
                    alt={item.title}
                    className="w-full h-auto dark:hidden"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={item.imageDark ?? "/images/mcp-light.png"}
                    alt={item.title}
                    className="w-full h-auto hidden dark:block"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
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

function EnterpriseSection({ onOpenDemo }: { onOpenDemo?: () => void }) {
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
            onPrimaryClick={onOpenDemo}
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
    openDemoDialogOpen,
    setOpenDemoDialogOpen,
    openDemoDialog,
  } = useCTAState();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader onContactClick={openContactDialog} />
      <main>
        <HeroSection onOpenDemo={openDemoDialog} onContactClick={openContactDialog} />
        <TrustStrip />
        <UseCasesSection onOpenDemo={openDemoDialog} />
        <WorkflowsSection />
        <ProblemSection onOpenDemo={openDemoDialog} />
        <EnterpriseSection onOpenDemo={openDemoDialog} />
      </main>
      <FooterSection onContactClick={openContactDialog} />
      <StickyCTABar message="Questions about Archcore?" buttonLabel="Contact us" onButtonClick={openContactDialog} />
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
      <OpenDemoDialog open={openDemoDialogOpen} onOpenChange={setOpenDemoDialogOpen} demoUrl={DEMO_URL} />
    </div>
  );
}
