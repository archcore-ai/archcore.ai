import { msg } from "@lingui/core/macro";
import { ContactDialog, StickyCTABar } from "@/components/cta";
import { useCTAState } from "@/hooks/use-cta-state";
import { useTheme } from "@/hooks/use-theme";
import {
  StickyHeader,
  HeroSection,
  IntegrationsSection,
  ProblemSection,
  UseCasesSection,
  EnterpriseSection,
  DemoSection,
  FooterSection,
} from "@/components/sections";
import { FAQSection } from "@/components/faq-section";
import { useLingui } from "@lingui/react";

export default function App() {
  const { _ } = useLingui();
  useTheme(); // Initialize theme detection (system preference + localStorage)

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
        <EnterpriseSection />
        <DemoSection />
        <div className="border-t border-border" />
        <FAQSection onContactClick={openContactDialog} />
      </main>
      <FooterSection onContactClick={openContactDialog} />
      <StickyCTABar
        message={_(msg`Ready to make AI follow your architecture?`)}
        buttonLabel={_(msg`Book a Demo`)}
        onButtonClick={openContactDialog}
      />
      <ContactDialog
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
      />
    </div>
  );
}
