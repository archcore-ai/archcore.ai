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
  ExitIntentBanner,
} from "@/components/cta";
import { useCTAState } from "@/hooks/use-cta-state";
import { useTheme } from "@/hooks/use-theme";

const DOCS_URL = "https://github.com/archcore-ai";
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
        isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-0 h-16 flex items-center justify-between">
        <a href="#top">
          <Logo size="md" loading="eager" />
        </a>

        <div className="hidden md:flex items-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <a href="#problem">Why?</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#use-cases">Use Cases</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href="#privacy">Privacy</a>
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
              href="#problem"
              className="block py-2 text-sm"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              Why?
            </a>
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
              href="#privacy"
              className="block py-2 text-sm"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
            >
              Privacy
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
    <section id="top" className="relative py-24 pt-28 px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                <span className="text-primary">Context engineering</span> for deterministic AI-assisted development.
              </h1>
              <p className="text-lg text-muted-foreground">
                Architectural decisions, engineering rules, and playbooks — delivered to IDEs and tools via MCP as a
                verified, read-only context layer.
              </p>
            </div>

            <DualCTA
              primaryLabel="Open Demo"
              onPrimaryClick={onOpenDemo}
              secondaryLabel="Contact Us"
              onSecondaryClick={onContactClick}
            />

            <div className="flex flex-wrap gap-2">
              {["Self-hosted", "MCP-native"].map((chip) => (
                <Badge key={chip} variant="secondary" className="px-2 py-0.5 text-xs">
                  {chip}
                </Badge>
              ))}
            </div>
          </div>

          <div className="w-full overflow-hidden text-center lg:text-right" style={{ perspective: "1000px" }}>
            <img
              src="/images/layers.png"
              alt="Archcore architectural context layers: Decisions, Rules and guides, Documentation, Verified engineering context"
              width={800}
              height={800}
              className="inline-block h-auto max-h-80 object-contain"
              loading="eager"
              decoding="async"
              style={{
                animation: "zoomOut 10s ease-out forwards",
                transformOrigin: "bottom right",
              }}
            />
            <style>{`
              @keyframes zoomOut {
                0% {
                  transform: scale(3);
                  opacity: 0.5;
                }
                100% {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            `}</style>
          </div>
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
    description: "Architecture choices lost in Slack, docs, and tribal memory.",
  },
  {
    icon: AlertTriangle,
    title: "Implicit architectural constraints",
    description: "AI operates without access to explicit architectural rules, invariants, and decisions.",
  },
  {
    icon: Compass,
    title: "Untraceable decisions",
    description: "Architectural and technical decisions are not recorded as first-class artifacts.",
  },
  {
    icon: Target,
    title: "Decision drift",
    description: "Documented intent diverges from actual system behavior over time.",
  },
];

function ProblemSection({ onOpenDemo }: { onOpenDemo?: () => void }) {
  return (
    <SectionContainer id="problem" className="bg-muted/30 border-b border-border">
      <div className="text-center space-y-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          AI is powerful. <span className="text-muted-foreground">Without structure, it creates chaos.</span>
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
        title="See how Archcore solves this"
        description="Structure your AI-assisted development with explicit architectural context."
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
    description: "Rules and playbooks for multi-service ecosystems.",
  },
  {
    icon: Users,
    title: "Onboarding at scale",
    description: "Guides and playbooks that survive team growth.",
  },
  {
    icon: History,
    title: "Audit-ready history",
    description: "Trace what changed, when, and why.",
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
        description="Deploy Archcore in minutes. Keep your AI agents aligned with your architecture."
        buttonLabel="Try Demo"
        onButtonClick={onOpenDemo}
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
  "Designed for regulated environments",
];

function EnterpriseSection({ onOpenDemo }: { onOpenDemo?: () => void }) {
  return (
    <SectionContainer id="privacy" className="bg-muted/30 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Private. Self-hosted. Yours.</h2>
          <p className="text-lg text-muted-foreground">
            archcore runs entirely on your infrastructure -- no SaaS, no data export.
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
            secondaryLabel="View Architecture Docs"
            secondaryHref={DOCS_URL}
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
      <ExitIntentBanner buttonLabel="Contact us" onButtonClick={openContactDialog} />
      <StickyHeader onContactClick={openContactDialog} />
      <main>
        <HeroSection onOpenDemo={openDemoDialog} onContactClick={openContactDialog} />
        <TrustStrip />
        <ProblemSection onOpenDemo={openDemoDialog} />
        <UseCasesSection onOpenDemo={openDemoDialog} />
        <EnterpriseSection onOpenDemo={openDemoDialog} />
      </main>
      <FooterSection onContactClick={openContactDialog} />
      <StickyCTABar message="Questions about Archcore?" buttonLabel="Contact us" onButtonClick={openContactDialog} />
      <ContactDialog open={contactDialogOpen} onOpenChange={setContactDialogOpen} />
      <OpenDemoDialog open={openDemoDialogOpen} onOpenChange={setOpenDemoDialogOpen} demoUrl={DEMO_URL} />
    </div>
  );
}
