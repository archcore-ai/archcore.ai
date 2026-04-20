import {
  StickyHeader,
  HeroSection,
  EntryPointChoiceSection,
  JobsSection,
  BeforeAfterSection,
  InstallSection,
  WhyNotInstructionsSection,
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
        <BeforeAfterSection />
        <InstallSection />
        <WhyNotInstructionsSection />
        <EntryPointChoiceSection />
        <JobsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <FooterSection />
    </div>
  );
}
