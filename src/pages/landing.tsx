import {
  StickyHeader,
  HeroSection,
  ProblemSection,
  HowItWorksSection,
  TryPromptsSection,
  InstallSection,
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
        <HowItWorksSection />
        <TryPromptsSection />
        <InstallSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
