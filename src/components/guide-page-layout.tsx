import type { ReactNode } from "react";
import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";

interface GuidePageLayoutProps {
  children: ReactNode;
  cta: ReactNode;
  outline: { id: string; label: ReactNode }[];
}

export function GuidePageLayout({
  children,
  cta,
  outline,
}: GuidePageLayoutProps) {
  const { _ } = useLingui();
  return (
    <main id="main-content" className="page page--reading page--with-toc">
      <article className="article how-to-guide" id="top">
        {children}
      </article>
      <nav className="article-toc" aria-label={_(msg`On this page`)}>
        <p className="pillar-toc__label">
          <Trans>On this page</Trans>
        </p>
        <ul>
          {outline.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
      {cta}
    </main>
  );
}
