import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { useTheme } from "@/hooks/use-theme";

export function CLIShowcaseSection() {
  const { _ } = useLingui();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section aria-label={_(msg`CLI in action`)} className="relative px-6 pb-16">
      <div className="relative max-w-5xl mx-auto">
        <img
          key={isDark ? "dark" : "light"}
          src={
            isDark ? "/images/cli-init-dark.png" : "/images/cli-init-light.png"
          }
          alt={_(msg`archcore init creating .archcore/ in a project`)}
          width={1600}
          height={1005}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto integration-card-image"
        />
      </div>
    </section>
  );
}
