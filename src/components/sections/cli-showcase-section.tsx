import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";

export function CLIShowcaseSection() {
  const { _ } = useLingui();

  return (
    <section aria-label={_(msg`CLI in action`)} className="relative px-6 pb-16">
      <div className="relative max-w-5xl mx-auto">
        <img
          src="/images/cli-init-light.png"
          alt={_(msg`archcore init creating .archcore/ in a project`)}
          width={1600}
          height={1005}
          loading="lazy"
          decoding="async"
          className="w-full h-auto integration-card-image block dark:hidden"
        />
        <img
          src="/images/cli-init-dark.png"
          alt={_(msg`archcore init creating .archcore/ in a project`)}
          width={1600}
          height={1005}
          loading="lazy"
          decoding="async"
          className="w-full h-auto integration-card-image hidden dark:block"
        />
      </div>
    </section>
  );
}
