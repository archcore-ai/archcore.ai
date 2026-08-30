import { lazy, Suspense } from "react";
import {
  StickyHeader,
  HeroSection,
  ProblemSection,
  BeforeAfterSection,
  HowToUseCycleSection,
  ContextEngineeringSection,
  SpecDrivenSection,
  GitNativeSection,
  CrossAgentSection,
  SiteNav,
} from "@/components/sections";

// Below-fold sections are code-split. Fallback is null: the sections render
// into empty space below the fold once their chunk arrives.
//
// The loop left this group when it moved to slot 4 (see the ADR below): it is
// the first thing a reader meets after the proof, and an empty gap there costs
// more than the bytes it saves.
//
// The two category sections were tried in its place and put back. A lazy
// section does not exist when the browser resolves a hash on a cold load, so
// `/#context-engineering` and `/#spec-driven-development` stopped scrolling,
// which the eager versions did correctly. Their chunks were 2.6KB each against
// a 333KB entry, so the split bought nothing worth an anchor. FAQ and the star
// CTA stay lazy exactly as before; they carry no anchor anyone links to.
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
        <Suspense fallback={null}>
          <FAQSection />
          <StarCtaSection />
        </Suspense>
      </main>
      <SiteNav />
    </div>
  );
}
