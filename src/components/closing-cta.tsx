import { useLingui } from "@lingui/react";

const copy = {
  title: /* i18n */ { id: "AEMVhB", message: "Start with Archcore." },
  description: /* i18n */ {
    id: "e23jKm",
    message: "Keep your project decisions ready for the next task.",
  },
  primary: /* i18n */ { id: "p8ft+P", message: "Install Archcore →" },
  secondary: /* i18n */ { id: "ELciF6", message: "See how it works" },
};

interface ClosingCtaProps {
  analyticsCta:
    | "recipe_install"
    | "article_install"
    | "listing_install"
    | "cli_install"
    | "plugin_install";
  newTab?: boolean;
  labels?: Record<keyof typeof copy, string>;
}

export function ClosingCta({
  analyticsCta,
  newTab = false,
  labels,
}: ClosingCtaProps) {
  const text = labels ?? {
    title: copy.title.message,
    description: copy.description.message,
    primary: copy.primary.message,
    secondary: copy.secondary.message,
  };
  const target = newTab ? "_blank" : undefined;
  const rel = newTab ? "noopener noreferrer" : undefined;
  return (
    <section className="recipe-cta" data-analytics-cta={analyticsCta}>
      <div>
        <h2>{text.title}</h2>
        <p>{text.description}</p>
      </div>
      <div className="recipe-cta__actions">
        <a
          className="btn btn--primary"
          href="/how-to-use/"
          target={target}
          rel={rel}
        >
          {text.primary}
        </a>
        <a href="/how-to-use/" target={target} rel={rel}>
          {text.secondary}
        </a>
      </div>
    </section>
  );
}

export function LocalizedClosingCta(props: Omit<ClosingCtaProps, "labels">) {
  const { _ } = useLingui();
  return (
    <ClosingCta
      {...props}
      labels={{
        title: _(copy.title),
        description: _(copy.description),
        primary: _(copy.primary),
        secondary: _(copy.secondary),
      }}
    />
  );
}
