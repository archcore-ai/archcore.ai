import {
  StickyHeader,
  HeroSection,
  ProblemSection,
  HowWeSolveSection,
  HowToUseCtaSection,
  ChoosePathSection,
  FAQSection,
  SiteNav,
} from "@/components/sections";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <HowWeSolveSection />
        <HowToUseCtaSection />
        <ChoosePathSection />
        <FAQSection />
        <HowToUseCtaSection variant="compact" />
      </main>
      <SiteNav />
    </div>
  );
}
