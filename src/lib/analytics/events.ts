/**
 * The single source of truth for every PostHog event fired by archcore.ai.
 *
 * This file is deliberately dependency-free and alias-free (no `@/` imports)
 * because it is shared verbatim across build systems: the Vite SPA imports it
 * directly, and the Astro content-site imports it by relative path. The docs
 * site lives in a separate repository and keeps a trimmed copy — see
 * .archcore/landing/analytics-event-taxonomy.doc.md for the sync contract.
 *
 * Naming rules, so funnels stay queryable:
 *   - snake_case, `object_verb` in the past tense (`install_command_copied`)
 *   - never bake a value into the name (`install_platform_switched` + a `to`
 *     property, not `install_switched_to_windows`)
 *   - every event carries the super properties registered in core.ts, so
 *     per-event props describe only what the super properties cannot.
 */

/** Which of the three deployed surfaces fired the event. Super property. */
export type Site = "landing" | "content" | "docs";

/** Platform an install command targets. */
export type InstallPlatform = "unix" | "windows";

/** Section of the content hub an article belongs to. */
export type ContentSection = "blog" | "learn" | "alternatives";

/**
 * Where a navigation click happened. Everything but "body" is site chrome;
 * "body" is in-content prose, reported only when the click crosses between
 * landing, content hub and docs.
 */
export type NavLocation =
  | "header"
  | "footer"
  | "mobile-menu"
  | "sidebar"
  | "body";

/**
 * Props attached to every event automatically. Registered once at init so
 * they land on autocaptured events and pageviews too, not just manual calls.
 */
export interface SuperProperties {
  site: Site;
  /** UI language at init. `locale_switched` records later changes. */
  locale: string;
  /** "light" | "dark" — resolved, not the "system" preference itself. */
  color_scheme: string;
}

/**
 * Event name → its properties. `track()` is typed against this map, so a
 * typo in a name or a missing property is a build error rather than a
 * silently-dropped event that only surfaces as an empty funnel weeks later.
 */
export interface AnalyticsEventMap {
  // ---------------------------------------------------------------- install
  /** The primary conversion signal across the whole project. */
  install_command_copied: {
    command: string;
    platform: InstallPlatform;
    /** Component or page region that owns the copy button. */
    surface: string;
    /** Which artifact the command installs, when distinguishable. */
    install_target?: "cli" | "plugin" | "custom";
  };
  install_platform_switched: {
    from: InstallPlatform;
    to: InstallPlatform;
    surface: string;
  };
  /** A non-install snippet copied from a walkthrough or docs code block. */
  code_snippet_copied: {
    surface: string;
    language?: string;
    /** Page path the snippet was copied from. */
    page: string;
    /** Set when the copy came from a text selection rather than a button. */
    via?: "button" | "selection";
  };

  // ------------------------------------------------------------ navigation
  /** Click on a link leaving archcore.ai entirely. */
  outbound_link_clicked: {
    url: string;
    domain: string;
    label?: string;
    surface?: string;
  };
  /** Click that moves between the three surfaces, or within site chrome. */
  nav_link_clicked: {
    label?: string;
    destination: string;
    location: NavLocation;
    /** Set when the click crosses a surface boundary, e.g. landing → docs. */
    to_site?: Site;
  };
  /** A tracked call-to-action button, as opposed to plain chrome navigation. */
  cta_clicked: {
    /** Stable identifier for the CTA, e.g. "hero_primary". */
    cta: string;
    destination?: string;
    surface: string;
  };
  github_star_clicked: {
    repo: "org" | "cli" | "plugin";
    /** Star count shown at click time, for correlating with the counter. */
    stars?: number;
    surface: string;
  };

  // ------------------------------------------------------------ engagement
  /** Fired once per section per pageview when it first becomes visible. */
  section_viewed: {
    section: string;
    /** 0-based order of the section within the page. */
    position: number;
  };
  /** Fired once per threshold per pageview. */
  scroll_depth_reached: {
    depth: 25 | 50 | 75 | 100;
    page: string;
  };
  faq_item_opened: {
    /**
     * The visible question text, so the event reads without a lookup table.
     * It is localised, so break down by the `locale` super property rather
     * than expecting one string per question across languages.
     */
    question: string;
    /** 0-based order in the list — stable across translations. */
    position: number;
    surface: string;
  };
  locale_switched: {
    from: string;
    to: string;
  };
  theme_switched: {
    to: string;
  };

  // --------------------------------------------------------------- content
  /** Reader reached the end of an article body. */
  article_read_completed: {
    slug: string;
    section: ContentSection;
  };
  //
  // There is deliberately no event for the raw-markdown twins (/blog/x.md).
  // They are only advertised through <link rel="alternate"> and served as
  // plain text, so nothing clicks them and no script runs on them — the
  // traffic is only visible in server logs, which GitHub Pages does not give
  // us. Add one here only if a visible link to them ever ships.

  // ------------------------------------------------------------------ docs
  docs_search_opened: Record<string, never>;
  /**
   * Docs search terms are the highest-signal content-backlog input available —
   * they are what readers expected to find and did not. Reported debounced,
   * once per settled query, not per keystroke.
   */
  docs_search_submitted: {
    query: string;
    query_length: number;
    /** Pagefind result count, when it can be read off the results list. */
    results?: number;
  };
  //
  // No event for the generated llms.txt / llms-full.txt / llms-small.txt sets:
  // nothing in the docs UI links to them, and they are served as plain text
  // where no script runs. Agents fetch them directly, which is only visible in
  // server logs that GitHub Pages does not expose.

  // ---------------------------------------------------------------- wizard
  //
  // Property names follow the walkthrough's own vocabulary — a "branch" is a
  // path through it, a "mode" is the plugin/CLI toggle — so the funnel in
  // PostHog reads the same way as src/content/how-to-use.
  /** Funnel entry: which path the visitor picked. */
  wizard_branch_started: {
    branch: string;
  };
  wizard_step_viewed: {
    branch: string;
    step: string;
    step_index: number;
    mode: string;
  };
  wizard_mode_switched: {
    branch: string;
    from: string;
    to: string;
  };
  wizard_completed: {
    branch: string;
    mode: string;
  };
  /** Restarting mid-walkthrough is the clearest signal a step confused someone. */
  wizard_restarted: {
    branch?: string;
    step?: string;
  };
}

export type AnalyticsEventName = keyof AnalyticsEventMap;

/**
 * Events that land in the same PostHog project but are *not* fired by any
 * browser — so they are deliberately kept out of AnalyticsEventMap, which
 * `track()` is typed against. Listing them here would make them callable from
 * the client, where they can never legitimately originate.
 *
 * They are declared anyway because this file is documented as the single source
 * of truth for every event in the project: an event nobody can find is an event
 * someone eventually re-invents under a second name, and the funnel silently
 * splits in two.
 *
 * None of these carry the super properties from core.ts — there is no browser
 * to read `site`, `locale` or `color_scheme` from. Filter on `source` instead.
 */
export interface ExternalAnalyticsEventMap {
  /**
   * A successful CLI install, sent by install.sh / install.ps1 once the binary
   * is in place. `distinct_id` is a random opaque id stored under
   * ~/.local/state/archcore/install-id, so repeat installs on one machine
   * collapse to one person rather than inflating the count.
   *
   * Emitted only when archcore.ai's deploy step injected a PostHog key into the
   * published installer, and never when DO_NOT_TRACK or
   * ARCHCORE_TELEMETRY_OPTOUT is set. See .github/workflows/deploy.yml.
   */
  cli_installed: {
    source: "installer";
    installer: "install.sh" | "install.ps1";
    os: "darwin" | "linux" | "windows" | "unknown";
    arch: "amd64" | "arm64" | "unknown";
    archcore_version?: string;
    /** An install id already existed, i.e. a reinstall or an upgrade. */
    is_reinstall: boolean;
    /** A CI environment variable was present. Segment these out of adoption. */
    ci: boolean;
    pinned_version: boolean;
    install_dir_default: boolean;
  };
  /**
   * A failed install. `stage` is a coarse category — never the error message,
   * which is deliberately never transmitted.
   */
  cli_install_failed: Omit<
    ExternalAnalyticsEventMap["cli_installed"],
    "archcore_version"
  > & {
    archcore_version?: string;
    stage:
      | "start"
      | "prereq"
      | "platform"
      | "version"
      | "download"
      | "checksum"
      | "extract"
      | "install"
      | "done";
  };
  /**
   * Daily cumulative gauge of GitHub release asset downloads, from
   * .github/workflows/install-stats.yml. Anonymous — there is no person.
   *
   * `installer_runs_total` counts checksums.txt fetches, which every installer
   * and self-update run performs, and is the denoised figure.
   * `archive_downloads_total` is the raw one and includes scanners and mirrors;
   * at the time of writing the two were 538 and ~3175. Do not chart them as if
   * they were the same measurement.
   */
  release_downloads_sampled: {
    source: "release-stats";
    scope: "all_releases";
    releases_count: number;
    latest_version: string;
    installer_runs_total: number;
    archive_downloads_total: number;
    /** Per-platform, archive-derived, so fully bot-skewed. Suffix is os_arch. */
    [platform: `archive_downloads_${string}`]: number | string;
  };
  /**
   * One event per historical release, timestamped at its publish date. A
   * per-release total *as of the day the backfill ran* — the GitHub API exposes
   * no historical series — so it answers "which releases got picked up", not
   * "installs per week". Emitted only by a manual backfill run.
   */
  release_downloads_recorded: {
    source: "release-stats";
    scope: "single_release";
    version: string;
    prerelease: boolean;
    installer_runs_to_date: number;
    archive_downloads_to_date: number;
  };
}

export type ExternalAnalyticsEventName = keyof ExternalAnalyticsEventMap;
