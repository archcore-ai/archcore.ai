import { cn } from "@/lib/utils";

type LogoSize = "sm" | "md" | "lg";
type LoadingPriority = "eager" | "lazy";

interface LogoProps {
  /** Size variant for the logo */
  size?: LogoSize;
  /** Whether to show text alongside the icon */
  showText?: boolean;
  /** Loading priority - use 'eager' for above-fold, 'lazy' for below-fold */
  loading?: LoadingPriority;
  /** Additional CSS classes */
  className?: string;
}

const sizeConfig: Record<LogoSize, { icon: string; text: string }> = {
  sm: { icon: "h-5 w-5", text: "text-base" },
  md: { icon: "h-6 w-6", text: "text-lg" },
  lg: { icon: "h-8 w-8", text: "text-xl" },
};

export function Logo({
  size = "md",
  showText = true,
  loading = "lazy",
  className,
}: LogoProps) {
  const config = sizeConfig[size];
  const isEager = loading === "eager";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Light mode logo */}
      <img
        src="/logo.png"
        alt="archcore logo"
        width={24}
        height={24}
        className={cn(config.icon, "dark:hidden")}
        loading={isEager ? undefined : "lazy"}
        fetchPriority={isEager ? "high" : "auto"}
        decoding="async"
      />
      {/* Dark mode logo */}
      <img
        src="/logo-dark.png"
        alt="archcore logo"
        width={24}
        height={24}
        className={cn(config.icon, "hidden dark:block")}
        loading={isEager ? undefined : "lazy"}
        fetchPriority={isEager ? "high" : "auto"}
        decoding="async"
      />
      {showText && (
        <span className={cn("font-semibold tracking-tight", config.text)}>
          archcore
        </span>
      )}
    </div>
  );
}
