import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Use a 760px content column for centered text sections (DESIGN.md). */
  narrow?: boolean;
}

export function SectionContainer({
  children,
  className,
  id,
  narrow = false,
}: SectionContainerProps) {
  return (
    <section id={id} className={cn("px-6 py-20 md:py-24", className)}>
      <div
        className={cn(
          "mx-auto",
          narrow ? "max-w-[var(--container-narrow)]" : "max-w-[var(--container-max)]"
        )}
      >
        {children}
      </div>
    </section>
  );
}
