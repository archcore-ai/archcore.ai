import {
  HeroSection,
  ProblemSection,
  BeforeAfterSection,
  HowToUseCycleSection,
  ContextEngineeringSection,
  SpecDrivenSection,
  GitNativeSection,
  CrossAgentSection,
} from "@/components/sections";

import { FAQSection } from "@/components/sections/faq-section";
import { StarCtaSection } from "@/components/sections/star-cta-section";

export function LandingPage() {
  return (
    <div className="min-h-screen text-foreground">
      <main id="main-content">
        {/*
          The page releases meaning in this order: what breaks, what changes,
          how you use it, why it works, why you can trust it. See
          .archcore/landing/home-loop-before-categories.adr.md.

          This deviates from the canonical sequence in
          product/surface-descriptors, deliberately and at the sequence level.
          The loop used to sit last, so the first concrete use of the product
          was six screens down, behind two sections that answered "what is
          this" for the third and fourth time. It is now the fourth section,
          and the two category sections argue mechanism behind it: context
          engineering explains what reaches the agent during the edit the loop
          just showed, spec-driven development explains where the spec lives
          after that feature ships.

          The category H2s stay word for word. They are the two category
          anchors on the highest-authority page, and the pillar pages own the
          head queries (product/seo-information-architecture).

          Backgrounds alternate page / band from section 4 on, so the page does
          not read as one field of bordered cards.
        */}
        <HeroSection />
        <ProblemSection />
        <BeforeAfterSection />
        <HowToUseCycleSection variant="home" />
        <ContextEngineeringSection />
        <SpecDrivenSection />
        <GitNativeSection />
        <CrossAgentSection />
        <FAQSection />
        <StarCtaSection />
      </main>
    </div>
  );
}
