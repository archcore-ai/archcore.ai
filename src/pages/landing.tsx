import { ContactDialog } from "@/components/cta";
import { useCTAState } from "@/hooks/use-cta-state";
import {
  StickyHeader,
  HeroSection,
  IntegrationsSection,
  ProblemSection,
  UseCasesSection,
  EnterpriseSection,
  PricingSection,
  FooterSection,
} from "@/components/sections";
import { FAQSection } from "@/components/faq-section";

export function LandingPage() {
  const { contactDialogOpen, setContactDialogOpen, openContactDialog } =
    useCTAState();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <StickyHeader />
      <main>
        <HeroSection onContactClick={openContactDialog} />
        <ProblemSection />
        <IntegrationsSection />
        <UseCasesSection onContactClick={openContactDialog} />
        {/* <SolutionSection /> */}
        {/* <ArchitectureRecordSection /> */}
        <PricingSection />
        <div className="border-t border-border" />
        <EnterpriseSection />
        <FAQSection onContactClick={openContactDialog} />
      </main>
      <FooterSection onContactClick={openContactDialog} />
      <ContactDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
      />
    </div>
  );
}
