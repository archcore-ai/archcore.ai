import { ArrowLeft } from "lucide-react";

const LAST_UPDATED = "August 17, 2026";
const CONTACT_EMAIL = "archcore-ai@proton.me";

export function PrivacyPage() {
  return (
    <main id="main-content" className="bg-background text-foreground">
      <div className="page page--reading">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors page-back"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </a>

        <header className="mb-10">
          <h1 className="page-title mb-3">Privacy Policy</h1>
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
                <span className="text-foreground">
                  No telemetry about your work.
                </span>{" "}
                Neither the plugin nor the CLI reports what you do with
                Archcore: no document contents, no document titles, no file
                paths, no repository or branch names, no commands you ran, no
                usage tracking, and no crash reports. The plugin sends nothing
                at all. The CLI reports two things and nothing else — that it
                was installed, and that it updated itself — both described
                below, and both carrying only version and platform fields.
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
                our CDN during download; we do not retain it ourselves.
              </li>
              <li>
                <span className="text-foreground">Install analytics.</span> The
                install scripts send us one event when an install finishes or
                fails, so we can tell how many people are actually installing
                Archcore. It contains the version installed, your operating
                system and CPU architecture, whether this was a first install or
                a repeat one, whether the run looked like a CI environment, and,
                if it failed, which of the eight steps it stopped at. It never
                contains an error message, a file path, a directory name, a user
                name, a hostname, or anything about your repository.
              </li>
              <li>
                <span className="text-foreground">
                  The CLI keeps itself up to date.
                </span>{" "}
                From version 0.8.0 the installed binary can replace itself with
                a newer release without being asked. The check runs in the
                background of{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  archcore mcp
                </code>
                , the local server your coding agent starts, at most once every
                24 hours per machine. It installs only a release published by
                this project, verified against its SHA-256 checksum and run once
                to prove it starts before anything is replaced. Your running
                process is never restarted or interrupted; a new version takes
                effect the next time the binary starts.
              </li>
              <li>
                <span className="text-foreground">
                  There is no switch that turns updating off.
                </span>{" "}
                Unattended update has no opt-out variable and no setting in{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  .archcore/settings.json
                </code>
                , because replacing a binary is machine-wide and a per-project
                file cannot govern it. If a machine must not update itself,
                install the binary into a directory its user cannot write — a
                root-owned location is the supported answer, and every attempt
                then stops before it downloads anything. Builds you compile
                yourself, forks, and CI runners never self-update at all.
              </li>
              <li>
                <span className="text-foreground">Update analytics.</span> The
                binary sends us one event per update attempt, so we can tell
                whether a release actually reaches machines: one when it
                replaced itself, one when a step failed, and one when a
                background attempt stopped because nothing newer existed or
                because the install directory was not writable. Each contains
                the version it came from and the version it went to, your
                operating system and CPU architecture, whether the run looked
                like a CI environment, whether you typed the command or the
                background check ran it, and, if it failed, which of the five
                steps it stopped at. It never contains an error message, a file
                path, a directory name, a user name, a hostname, or anything
                about your repository.
              </li>
              <li>
                <span className="text-foreground">The install identifier.</span>{" "}
                Those events are keyed to a random value generated at install
                time and kept in{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  ~/.local/state/archcore/install-id
                </code>
                , so reinstalling on the same machine is counted once rather
                than as a new person. The installers and the CLI read and write
                that one file, so an install and every later update on a machine
                count as one person rather than several. It is random, not
                derived from your hardware, your account, or your network, and
                deleting that file gives you a new one. Events reach the same
                PostHog project as the website analytics, through{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  edge.archcore.ai
                </code>
                . CLI builds released before that change use{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  ph.archcore.ai
                </code>{" "}
                until they update.
              </li>
              <li>
                <span className="text-foreground">Opting out of it.</span> Set{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  DO_NOT_TRACK=1
                </code>{" "}
                or{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  ARCHCORE_TELEMETRY_OPTOUT=1
                </code>{" "}
                in the environment. Set before the installer runs, it covers the
                install event; set for your shell or for your coding agent, it
                covers the update events too. Nothing is sent and no identifier
                file is written, so opting out leaves no trace on your disk. The
                installer and a typed{" "}
                <code className="text-sm bg-muted px-1.5 py-0.5 rounded">
                  archcore update
                </code>{" "}
                each print a one-line notice when they do send an event, so you
                are never told about this only here. These two variables govern
                analytics only: they do not stop the CLI from updating itself.
              </li>
              <li>
                <span className="text-foreground">Download counts.</span> We
                also read the public download totals of our own release files
                from GitHub&apos;s API and chart them. Those are per-file totals
                only. GitHub does not tell us, and we cannot infer, who
                downloaded anything.
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
                across archcore.ai and docs.archcore.ai to understand aggregate
                traffic (pages viewed, referrer, country, approximate device
                type) and how people use the pages: links clicked, how far down
                a page you read, which commands you copy, which questions you
                open, and what you type into the docs search box. We do not
                record your screen or session, and we do not collect form
                contents or anything that identifies you personally. Analytics
                respect{" "}
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
          <a href="/" className="hover:text-foreground transition-colors">
            Back to home
          </a>
          <span>&copy; {new Date().getFullYear()} archcore.ai</span>
        </div>
      </div>
    </main>
  );
}
