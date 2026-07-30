import { lazy, Suspense } from "react";
import {
  StickyHeader,
  HeroSection,
  BeforeAfterSection,
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
        <HeroSection />
        <BeforeAfterSection />
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
