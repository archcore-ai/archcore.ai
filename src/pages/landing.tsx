import {
  StickyHeader,
  HeroSection,
  ProblemSection,
  WhyArchcoreSection,
  WhyNotInstructionsSection,
  QuickstartSection,
  HowItWorksSection,
  WorksWithAgentsSection,
  ComingSoonSection,
  FAQSection,
  FinalCTASection,
  FooterSection,
} from "@/components/sections";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main>
        <HeroSection />
        <ProblemSection />
        <WhyArchcoreSection />
        <WhyNotInstructionsSection />
        <QuickstartSection />
        <HowItWorksSection />
        <WorksWithAgentsSection />
        <ComingSoonSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
