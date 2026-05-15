import {
  StickyHeader,
  HeroSection,
  ProblemSection,
  HowWeSolveSection,
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
        <ChoosePathSection />
        <FAQSection />
      </main>
      <SiteNav />
    </div>
  );
}
