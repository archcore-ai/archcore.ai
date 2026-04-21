import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const LAST_UPDATED = "April 22, 2026";
const CONTACT_EMAIL = "archcore-ai@proton.me";

export function PrivacyPage() {
  useEffect(() => {
    const prevTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const prevDescription = metaDescription?.getAttribute("content") ?? null;

    document.title = "Privacy Policy — Archcore";
    metaDescription?.setAttribute(
      "content",
      "Privacy policy for the Archcore plugin, CLI, and archcore.ai website."
    );

    return () => {
      document.title = prevTitle;
      if (metaDescription && prevDescription !== null) {
        metaDescription.setAttribute("content", prevDescription);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {LAST_UPDATED}
          </p>
        </header>

        <div className="space-y-10 text-[15px] leading-relaxed">
          <section className="space-y-3">
            <p>
              This policy explains what data the Archcore project processes
              across three surfaces: the{" "}
              <strong className="font-medium">Archcore plugin</strong> (for
              Claude Code, Cursor, and other AI coding agents), the{" "}
              <strong className="font-medium">Archcore CLI</strong>, and the{" "}
              <strong className="font-medium">archcore.ai</strong> website.
              Archcore is designed to be local-first: your code and
              documentation never leave your machine unless you explicitly send
              it somewhere.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Plugin &amp; CLI
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <span className="text-foreground">Fully local.</span> The plugin
                and CLI run on your machine. All Archcore documents live in the{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  .archcore/
                </code>{" "}
                directory inside your Git repository.
              </li>
              <li>
                <span className="text-foreground">No telemetry.</span> We do not
                collect usage analytics, crash reports, identifiers, or any data
                from the plugin or CLI.
              </li>
              <li>
                <span className="text-foreground">
                  No accounts, no servers.
                </span>{" "}
                Archcore requires no sign-up, API key, or backend service to
                function. The MCP server runs locally as a child process.
              </li>
              <li>
                <span className="text-foreground">AI host providers.</span> When
                you use Archcore inside an AI coding agent (Claude Code, Cursor,
                etc.), that host may send excerpts of your Archcore documents to
                its model provider as part of your prompts. Those transfers are
                governed by the host&apos;s own privacy policy, not by Archcore.
              </li>
              <li>
                <span className="text-foreground">Installation.</span> The
                install scripts at{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  archcore.ai/install.sh
                </code>{" "}
                and{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  archcore.ai/install.ps1
                </code>{" "}
                download release binaries from GitHub Releases. Standard web
                request metadata (IP, user-agent) may be logged by GitHub and
                our CDN during download; we do not process or retain it
                ourselves.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              archcore.ai website
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>
                <span className="text-foreground">Analytics.</span> We use{" "}
                <a
                  href="https://posthog.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  PostHog
                </a>{" "}
                to understand aggregate traffic (pages viewed, referrer,
                country, approximate device type). Analytics respect{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  Do Not Track
                </code>{" "}
                and can be blocked with any standard content blocker. No
                analytics run in development builds.
              </li>
              <li>
                <span className="text-foreground">Email list.</span> If you
                submit your email via the subscribe form, we store it solely to
                send product updates. You can unsubscribe at any time.
              </li>
              <li>
                <span className="text-foreground">Cookies.</span> We use a small
                number of first-party cookies for analytics and to remember your
                language preference. No third-party advertising or tracking
                cookies.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              What we do not do
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>We do not read or upload your source code.</li>
              <li>
                We do not read or upload the contents of your{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  .archcore/
                </code>{" "}
                directory.
              </li>
              <li>We do not sell data to third parties.</li>
              <li>We do not use your data to train AI models.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Your rights
            </h2>
            <p className="text-muted-foreground">
              You can request access to, correction of, or deletion of any
              personal data we hold (currently only possible if you have
              subscribed to our email list) by emailing us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">
              Changes to this policy
            </h2>
            <p className="text-muted-foreground">
              We may update this policy as the product evolves. Material changes
              will be reflected in the &ldquo;Last updated&rdquo; date at the
              top of this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
            <p className="text-muted-foreground">
              Questions about this policy?{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="underline underline-offset-2 hover:text-foreground transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            Back to home
          </Link>
          <span>&copy; {new Date().getFullYear()} archcore.ai</span>
        </div>
      </div>
    </div>
  );
}
