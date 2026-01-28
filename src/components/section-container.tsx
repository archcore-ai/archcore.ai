import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionContainer({ children, className, id }: SectionContainerProps) {
  return (
    <section id={id} className={cn("px-6 py-20 md:py-24", className)}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
