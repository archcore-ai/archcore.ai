import { cn } from "@/lib/utils";

interface ThemedImageProps {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
}

/**
 * Renders theme-aware images using CSS-based switching.
 *
 * This approach is preferred over JavaScript-based switching because:
 * 1. No flash of wrong image on initial load (CSS applies immediately)
 * 2. No dependency on useTheme hook or React hydration
 * 3. Works even before JavaScript executes
 *
 * Both images are rendered but only one is visible based on the .dark class
 * on the document root (managed by use-theme.ts).
 */
export function ThemedImage({
  lightSrc,
  darkSrc,
  alt,
  className,
  width,
  height,
  loading,
  decoding,
}: ThemedImageProps) {
  return (
    <>
      <img
        src={lightSrc}
        alt={alt}
        className={cn(className, "dark:hidden")}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
      />
      <img
        src={darkSrc}
        alt=""
        aria-hidden="true"
        className={cn(className, "hidden dark:block")}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
      />
    </>
  );
}
