import { msg } from "@lingui/core/macro";
import { SectionContainer } from "@/components/section-container";
import { SectionHeader } from "@/components/section-header";
import { useLingui } from "@lingui/react";

export function IntegrationsSection() {
  const { _ } = useLingui();

  return (
    <SectionContainer id="integrations" className="border-b border-border">
      <SectionHeader
        title={_(msg`Connects to Your Architecture Sources`)}
        description={_(
          msg`Start with what you already have: code, ADRs, documentation, discussions. Connectors gather context into a unified Architecture Record.`
        )}
      />

      <div className="flex justify-center items-center mb-12">
        <img
          src="/images/how-to-work.png"
          alt="Archcore flow diagram: Docs and Code feed into Archcore, which connects to AI Agents via MCP protocol, and outputs to Apps and Integrations"
          className="max-w-full h-auto w-full lg:w-4/5 xl:w-3/4"
        />
      </div>

      {/* Three-step process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {/* Step 1: Ingest */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
              1
            </div>
            <h3 className="text-xl font-semibold">{_(msg`Source Code`)}</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {_(
              msg`Archcore clones your repository and builds an initial knowledge graph. You can create global documents shared across multiple projects.`
            )}
          </p>
        </div>

        {/* Step 2: Graph */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
              2
            </div>
            <h3 className="text-xl font-semibold">
              {_(msg`Documentation and Code`)}
            </h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {_(
              msg`Create knowledge base, rules, and documentation linked to code. Each link between source code and documentation dramatically improves AI understanding of the project.`
            )}
          </p>
        </div>

        {/* Step 3: Assemble */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-lg flex-shrink-0">
              3
            </div>
            <h3 className="text-xl font-semibold">{_(msg`Integration`)}</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {_(
              msg`MCP protocol allows connecting any tools and integrations: code editors, bots, etc. Update documentation and get instant feedback.`
            )}
          </p>
        </div>
      </div>

      {/* <Alert className="mb-10 border-primary/50 bg-primary/5">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm font-medium">
          {_(msg`MCP server = one way to get context from IDEs/chats/agents`)}
        </AlertDescription>
      </Alert> */}

      {/* <SectionCTACard
        variant="featured"
        title={_(msg`Connect your sources`)}
        description={_(msg`See how Archcore integrates with your existing tools and workflows`)}
        buttonLabel={_(msg`Book a Demo`)}
        onButtonClick={onContactClick}
        className="mt-10"
      /> */}
    </SectionContainer>
  );
}
