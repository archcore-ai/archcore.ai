import { useEffect, useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Trans } from "@lingui/react/macro";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { track } from "@/lib/analytics";

const BASH_COMMAND = "curl -fsSL https://archcore.ai/install.sh | bash";
const POWERSHELL_COMMAND = "irm https://archcore.ai/install.ps1 | iex";

type Platform = "unix" | "windows";

function detectPlatform(): Platform {
  if (typeof navigator === "undefined") return "unix";
  const uaData = (navigator as Navigator & {
    userAgentData?: { platform?: string };
  }).userAgentData;
  if (uaData?.platform === "Windows") return "windows";
  if (/windows/i.test(navigator.userAgent)) return "windows";
  return "unix";
}

interface InstallCommandProps {
  command?: string;
  className?: string;
  variant?: "hero" | "inline" | "compact";
  defaultPlatform?: Platform | "auto";
  /**
   * Page region this instance belongs to, e.g. "home_hero". Copies are the
   * primary conversion signal, so the surface has to be explicit rather than
   * inferred from the variant — several regions share a variant.
   */
  surface?: string;
  /** What the command installs. Defaults to the CLI installer script. */
  installTarget?: "cli" | "plugin" | "custom";
}

export function InstallCommand({
  command,
  className,
  variant = "inline",
  defaultPlatform = "auto",
  surface = "unknown",
  installTarget,
}: InstallCommandProps) {
  const isCustomCommand = command !== undefined;
  const target = installTarget ?? (isCustomCommand ? "custom" : "cli");

  // First paint is always "unix" for SSR/hydration determinism.
  const initialPlatform: Platform =
    defaultPlatform === "windows" ? "windows" : "unix";
  const [platform, setPlatform] = useState<Platform>(initialPlatform);

  useEffect(() => {
    if (defaultPlatform !== "auto") return;
    if (detectPlatform() === "windows") {
      // Post-hydration swap. First paint is deterministic ("unix");
      // we only nudge to "windows" once on the client if detection says so.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlatform("windows");
    }
  }, [defaultPlatform]);

  if (isCustomCommand) {
    return (
      <SingleCommand
        command={command}
        platform={platform}
        variant={variant}
        className={className}
        surface={surface}
        installTarget={target}
      />
    );
  }

  if (variant === "compact") {
    // No tabs in the navbar — they overflow. Detection happens post-mount.
    const compactCommand =
      platform === "windows" ? POWERSHELL_COMMAND : BASH_COMMAND;
    return (
      <SingleCommand
        command={compactCommand}
        platform={platform}
        variant="compact"
        className={className}
        surface={surface}
        installTarget={target}
      />
    );
  }

  return (
    <PlatformTabs
      platform={platform}
      onPlatformChange={setPlatform}
      variant={variant}
      className={className}
      surface={surface}
      installTarget={target}
    />
  );
}

interface PlatformTabsProps {
  platform: Platform;
  onPlatformChange: (next: Platform) => void;
  variant: "hero" | "inline";
  className?: string;
  surface: string;
  installTarget: "cli" | "plugin" | "custom";
}

function PlatformTabs({
  platform,
  onPlatformChange,
  variant,
  className,
  surface,
  installTarget,
}: PlatformTabsProps) {
  const handleValueChange = (value: string) => {
    const next: Platform = value === "windows" ? "windows" : "unix";
    if (next === platform) return;
    track("install_platform_switched", {
      from: platform,
      to: next,
      surface,
    });
    onPlatformChange(next);
  };

  return (
    <Tabs
      value={platform}
      onValueChange={handleValueChange}
      className={cn("w-full", variant === "hero" && "max-w-2xl mx-auto")}
    >
      <TabsList className="mb-2">
        <TabsTrigger value="unix">
          <Trans>macOS / Linux</Trans>
        </TabsTrigger>
        <TabsTrigger value="windows">
          <Trans>Windows</Trans>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="unix">
        <SingleCommand
          command={BASH_COMMAND}
          platform="unix"
          variant={variant}
          className={className}
          surface={surface}
          installTarget={installTarget}
        />
      </TabsContent>
      <TabsContent value="windows">
        <SingleCommand
          command={POWERSHELL_COMMAND}
          platform="windows"
          variant={variant}
          className={className}
          surface={surface}
          installTarget={installTarget}
        />
      </TabsContent>
    </Tabs>
  );
}

interface SingleCommandProps {
  command: string;
  platform: Platform;
  variant: "hero" | "inline" | "compact";
  className?: string;
  surface: string;
  installTarget: "cli" | "plugin" | "custom";
}

function SingleCommand({
  command,
  platform,
  variant,
  className,
  surface,
  installTarget,
}: SingleCommandProps) {
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = async () => {
    try {
      await copy(command);
      track("install_command_copied", {
        command,
        platform,
        surface,
        install_target: installTarget,
      });
    } catch {
      // Clipboard API may fail in non-HTTPS or unfocused contexts
    }
  };

  if (variant === "compact") {
    return (
      <div
        data-analytics-install
        className={cn(
          "hidden lg:flex items-center gap-1.5 rounded-md bg-[var(--color-code-bg)] border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground",
          className
        )}
      >
        <Terminal className="h-3 w-3 shrink-0" />
        <span className="truncate max-w-[260px]">{command}</span>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 shrink-0 ml-1"
          onClick={() => void handleCopy()}
        >
          {copied ? (
            <Check className="h-3 w-3 text-primary" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          <span className="sr-only">
            <Trans>Copy command</Trans>
          </span>
        </Button>
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div
        data-analytics-install
        className={cn(
          "relative rounded-lg bg-[var(--color-code-bg)] border border-border p-4 pr-12 font-mono text-sm sm:text-base break-all max-w-2xl mx-auto text-left",
          className
        )}
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Terminal className="h-4 w-4 shrink-0" />
          <Trans>Run in your terminal:</Trans>
        </div>
        {command}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8"
          onClick={() => void handleCopy()}
        >
          {copied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">
            <Trans>Copy command</Trans>
          </span>
        </Button>
      </div>
    );
  }

  // inline variant
  return (
    <div
      data-analytics-install
      className={cn(
        "relative rounded-lg bg-[var(--color-code-bg)] border border-border p-3 pr-11 font-mono text-sm break-all",
        className
      )}
    >
      {command}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1.5 top-1.5 h-7 w-7"
        onClick={() => void handleCopy()}
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
        <span className="sr-only">
          <Trans>Copy command</Trans>
        </span>
      </Button>
    </div>
  );
}
