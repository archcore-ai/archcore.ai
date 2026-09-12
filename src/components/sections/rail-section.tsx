import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RailSectionProps {
  id: string;
  /** The section H2. Stays an H2 wherever this component is used. */
  heading: ReactNode;
  /** Links that belong to the heading rather than to the prose. Optional. */
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * The home page's one layout: heading on a left rail, content on the right.
 *
 * The page ran centred headings over full-width content until 2026-09-12, then
 * a tile grid. Both left the right side of the container ragged: the prose
 * stopped at its own measure and the rest of the line was air. A rail puts the
 * heading in that space, so a block fills the container without anything being
 * stretched to do it, and the reader gets one column of prose at a readable
 * width instead of a wall.
 *
 * See .archcore/landing/home-plain-language-rail.adr.md.
 */
export function RailSection({
  id,
  heading,
  aside,
  children,
  className,
}: RailSectionProps) {
  return (
    <section id={id} className={cn("site-gutters py-10 md:py-12 lg:py-14", className)}>
      <div className="mx-auto grid max-w-[var(--container-max)] items-start gap-4 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-x-14">
        <div className="grid content-start gap-2.5">
          <h2 className="text-balance text-xl font-semibold tracking-tight md:text-2xl">
            {heading}
          </h2>
          {aside}
        </div>
        <div className="grid min-w-0 gap-4">{children}</div>
      </div>
    </section>
  );
}
