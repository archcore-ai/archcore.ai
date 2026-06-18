import {
  StickyHeader,
  HeroSection,
  BeforeAfterSection,
  HowItWorksSection,
  HowToUseWizardSection,
  FAQSection,
  StarCtaSection,
  SiteNav,
} from "@/components/sections";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main id="main-content">
        <HeroSection />
        <BeforeAfterSection />
        <HowItWorksSection />
        <HowToUseWizardSection embedded />
        <FAQSection />
        <StarCtaSection />
      </main>
      <SiteNav />
    </div>
  );
}
