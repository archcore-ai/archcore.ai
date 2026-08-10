import { lazy, Suspense } from "react";
import {
  StickyHeader,
  HeroSection,
  ProblemSection,
  BeforeAfterSection,
  SpecDrivenSection,
  ContextEngineeringSection,
  GitNativeSection,
  CrossAgentSection,
  HowItWorksSection,
  SiteNav,
} from "@/components/sections";

// Below-fold sections are code-split so the wizard (the heaviest chunk)
// stays out of the initial bundle. Fallback is null: the sections render
// into empty space below the fold once their chunk arrives.
const HowToUseWizardSection = lazy(() =>
  import("@/components/sections/how-to-use-wizard-section").then((m) => ({
    default: m.HowToUseWizardSection,
  })),
);
const FAQSection = lazy(() =>
  import("@/components/sections/faq-section").then((m) => ({
    default: m.FAQSection,
  })),
);
const StarCtaSection = lazy(() =>
  import("@/components/sections/star-cta-section").then((m) => ({
    default: m.StarCtaSection,
  })),
);

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main id="main-content">
        {/*
          The canonical homepage sequence in product/surface-descriptors:
          category + product (hero), problem, spec-driven development, context
          engineering, git-native, cross-agent, how it works. Before/After sits
          between the problem and the two category sections as its concrete
          proof — it is the Job 1 demonstration that product/jobs-to-be-done
          keeps first, and the categories are what the reader searched for.
          Backgrounds alternate page / band so the page does not read as one
          field of bordered cards.
        */}
        <HeroSection />
        <ProblemSection />
        <BeforeAfterSection />
        <SpecDrivenSection />
        <ContextEngineeringSection />
        <GitNativeSection />
        <CrossAgentSection />
        <HowItWorksSection />
        <Suspense fallback={null}>
          <HowToUseWizardSection embedded />
          <FAQSection />
          <StarCtaSection />
        </Suspense>
      </main>
      <SiteNav />
    </div>
  );
}
