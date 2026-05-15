import { Trans } from "@lingui/react/macro";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/hooks/use-theme";

export function PluginShowcaseSection() {
  const { _ } = useLingui();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <section
      aria-label={_(msg`Plugin in action`)}
      className="relative px-6 py-20 md:py-24"
    >
      <div className="relative max-w-3xl mx-auto">
        <div className="relative rounded-2xl border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-[#ff5f57]/80" />
              <span className="size-3 rounded-full bg-[#febc2e]/80" />
              <span className="size-3 rounded-full bg-[#28c840]/80" />
            </div>
            <div className="ml-3 flex-1 text-center">
              <span className="font-mono text-xs text-muted-foreground">
                cursor · plugins · archcore
              </span>
            </div>
            <Badge
              variant="outline"
              className="text-[10px] hidden sm:inline-flex"
            >
              <Trans>Live</Trans>
            </Badge>
          </div>
          <div className="relative bg-background">
            <img
              key={isDark ? "dark" : "light"}
              src={
                isDark
                  ? "/images/cursor-plugin-dark.png"
                  : "/images/cursor-plugin-light.png"
              }
              alt={_(
                msg`Archcore plugin in the Cursor plugin marketplace, showing MCP and slash commands`
              )}
              width={1436}
              height={1142}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto integration-card-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
