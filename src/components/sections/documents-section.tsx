import { Trans } from "@lingui/react/macro";
import { RailSection } from "@/components/sections/rail-section";
import { INTERNAL_LINKS } from "@/lib/links";

/**
 * The example directory. Names are literal and never translated.
 *
 * Eight document types across five areas, because the range is the point. A
 * tree of nothing but `adr` files reads as a decision log, and a tree of
 * nothing but `api/` reads as a place for API notes. `doc`, `rule`, `spec`,
 * `plan`, `adr`, `rfc`, `prd`, and `guide` are eight of the 19 types the
 * product ships, and the folders are parts of an ordinary application rather
 * than a taxonomy.
 *
 * The whole tree renders without truncation or a scrollbar, so the structure
 * reads at a glance. A name longer than the sidebar is a regression, not a
 * styling detail: widen the column or shorten the example.
 */
const TREE: { name: string; depth: 0 | 1; dir?: boolean; open?: boolean }[] = [
  { name: "architecture.doc.md", depth: 0 },
  { name: "conventions.rule.md", depth: 0 },
  { name: "api/", depth: 0, dir: true },
  { name: "rate-limiting.spec.md", depth: 1 },
  { name: "rate-limiting.plan.md", depth: 1 },
  { name: "token-bucket-in-redis.adr.md", depth: 1, open: true },
  { name: "error-shapes.rule.md", depth: 1 },
  { name: "auth/", depth: 0, dir: true },
  { name: "session-model.adr.md", depth: 1 },
  { name: "oauth-migration.rfc.md", depth: 1 },
  { name: "billing/", depth: 0, dir: true },
  { name: "usage-based-pricing.prd.md", depth: 1 },
  { name: "stripe-webhooks.spec.md", depth: 1 },
  { name: "web/", depth: 0, dir: true },
  { name: "design-tokens.rule.md", depth: 1 },
  { name: "onboarding-flow.plan.md", depth: 1 },
  { name: "testing.guide.md", depth: 0 },
];

/**
 * The only framed object on the page: the directory, with one record open.
 *
 * The owner asked across three rounds to show how documents appear in
 * `.archcore/`, and it is the fastest answer to "what is this": a reader who
 * sees a tree of Markdown files and a record with a status and a relation does
 * not need the phrase "git-native context layer" explained.
 *
 * The heading says project knowledge rather than decisions. It read "Decisions
 * become files" until 2026-09-12, which named one of the 19 document types and
 * left the reader thinking Archcore is a decision log.
 *
 * The prose sits under the window rather than above it, on the owner's
 * instruction the same day. The window is the argument; the sentence is the
 * caption.
 *
 * The layout is an example, labelled as one, per the repository-example rule
 * in .archcore/messaging-alignment.rule.md. The open record runs the same
 * rate-limiting example as the skills section below, so the reader sees the
 * file those four commands leave behind.
 */
export function DocumentsSection() {
  return (
    <RailSection
      id="git-native"
      heading={<Trans>Project knowledge becomes files</Trans>}
      aside={
        <p className="text-sm leading-relaxed text-muted-foreground">
          <a
            href={INTERNAL_LINKS.gitNativeContext}
            className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
          >
            <Trans>Why project context belongs in Git</Trans>
          </a>
        </p>
      }
    >
      <figure className="overflow-hidden rounded-xl border border-border bg-card">
        <figcaption className="flex justify-between gap-4 border-b border-border px-4 py-2 text-xs text-muted-foreground/80">
          <code className="font-mono">.archcore/</code>
          <span>
            <Trans>example</Trans>
          </span>
        </figcaption>

        <div className="grid sm:grid-cols-[250px_minmax(0,1fr)]">
          <ul className="border-b border-border py-2 font-mono text-[11px] leading-[1.95] sm:border-b-0 sm:border-r">
            {TREE.map((file) => (
              <li
                key={file.name}
                style={{ paddingLeft: `${12 + file.depth * 14}px` }}
                className={[
                  "pr-3",
                  file.open
                    ? "bg-muted font-semibold text-foreground"
                    : file.dir
                      ? "text-muted-foreground/70"
                      : "text-muted-foreground",
                ].join(" ")}
              >
                {file.name}
              </li>
            ))}
          </ul>

          <div className="grid min-w-0 content-start">
            {/* Which file is open. The tree makes that obvious side by side on
                a wide screen; stacked on a phone the highlighted row scrolls
                out of view before the document starts, so the pane names
                itself. */}
            <p className="flex items-center gap-2 border-b border-border px-4 py-2 font-mono text-[11px] text-foreground sm:hidden">
              <span className="text-muted-foreground/70">
                <Trans>open</Trans>
              </span>
              token-bucket-in-redis.adr.md
            </p>

            {/* Blocks rather than one <pre>. The pre carried hard line breaks
                sized for the desktop column, so on a phone it scrolled
                sideways and clipped. These wrap at any width. */}
            <div className="grid gap-3 px-4 py-3 font-mono text-[11px] leading-[1.95] text-foreground">
              <div className="grid">
                <span className="text-muted-foreground/70">---</span>
                <p>
                  <span className="text-muted-foreground">title: </span>
                  Rate limiting uses a token bucket in Redis
                </p>
                <p>
                  <span className="text-muted-foreground">status: </span>
                  accepted
                </p>
                <span className="text-muted-foreground/70">---</span>
              </div>

              <div className="grid">
                <p className="text-muted-foreground">## Context</p>
                <p>
                  The public API needs per-client limits. Redis is already the
                  shared store for sessions.
                </p>
              </div>

              <div className="grid">
                <p className="text-muted-foreground">## Decision</p>
                <p>
                  Token bucket per API key, stored in Redis, refilled on a fixed
                  interval.
                </p>
              </div>

              <div className="grid">
                <p className="text-muted-foreground">## Consequences</p>
                <p>
                  Every handler in src/api/ reads the bucket from Redis. No
                  in-memory counters.
                </p>
              </div>
            </div>

            <p className="border-t border-border px-4 py-2 font-mono text-[11px] text-muted-foreground/80">
              implements → api/rate-limiting.spec.md
            </p>
          </div>
        </div>
      </figure>

      <p className="max-w-[70ch] text-base leading-relaxed text-muted-foreground">
        <Trans>
          Architecture, specs, requirements, decisions, rules, plans, and guides
          live in <code className="font-mono text-[0.9em]">.archcore/</code> as
          plain Markdown, versioned with the code they describe. Archcore ships
          19 document types, and a change to any of them is a diff someone
          approves.
        </Trans>
      </p>
    </RailSection>
  );
}
