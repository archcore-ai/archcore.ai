import { msg } from "@lingui/core/macro";
import { SectionContainer } from "@/components/section-container";
import { useLingui } from "@lingui/react";
import { ThemedImage } from "@/components/themed-image";

export function ComingSoonSection() {
  const { _ } = useLingui();

  return (
    <SectionContainer
      id="coming-soon"
      className="bg-muted/30 border-y border-border"
    >
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 px-4 md:px-6 items-start">
        <div className="rounded-lg overflow-hidden order-1 md:order-2">
          <ThemedImage
            lightSrc="/images/cloud-light.png"
            darkSrc="/images/cloud-dark.png"
            alt="Shared context across repos"
            className="w-full rounded-lg integration-card-image"
            width={876}
            height={534}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col justify-start space-y-4 order-2 md:order-1">
          <h2 className="text-2xl font-semibold">
            {_(msg`Sync projects with global knowledge`)}{" "}
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary align-middle">
              {_(msg`Coming Soon`)}
            </span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            {_(
              msg`Connect multiple repos into a unified knowledge graph. GraphRAG finds relations between projects, improves search precision, and gives AI tools global context — not just what's in one repository.`
            )}
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
