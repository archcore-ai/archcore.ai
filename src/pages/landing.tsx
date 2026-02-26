import {
  StickyHeader,
  HeroSection,
  IntegrationsSection,
  ProblemSection,
  UseCasesSection,
  PricingSection,
  FooterSection,
} from "@/components/sections";
import { FAQSection } from "@/components/faq-section";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main>
        <HeroSection />
        <IntegrationsSection />
        <ProblemSection />
        <UseCasesSection />
        <PricingSection />
        <FAQSection />
      </main>
      <FooterSection />
    </div>
  );
}
