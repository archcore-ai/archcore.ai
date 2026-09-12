import {
  HeroSection,
  OutcomesSection,
  DocumentsSection,
  SkillsSection,
  AgentsSection,
} from "@/components/sections";

import { FAQSection } from "@/components/sections/faq-section";
import { StarCtaSection } from "@/components/sections/star-cta-section";

export function LandingPage() {
  return (
    <div className="min-h-screen text-foreground">
      <main id="main-content">
        {/*
          The page answers two questions before it explains anything: what this
          is, and what it gives you. The hero carries both in two sentences, the
          outcomes section backs the second one with the mechanism behind each
          claim, and only then does the page show the folder, the four skills,
          and the agents that read them.

          Two earlier revisions failed the same way. The eight-section version
          released one claim per screen and a reader reached the first concrete
          use six screens down; the tile grid packed the same claims so tightly
          that the owner could not tell what the product was. The fix was not
          another arrangement of the same jargon. It was writing the first two
          sentences in words that need no glossary, and keeping every later
          claim next to the file or the command that proves it.

          See .archcore/landing/home-plain-language-rail.adr.md.
        */}
        <HeroSection />
        <OutcomesSection />
        <DocumentsSection />
        <SkillsSection />
        <AgentsSection />
        <FAQSection />
        <StarCtaSection />
      </main>
    </div>
  );
}
