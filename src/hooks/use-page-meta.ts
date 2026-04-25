import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  /** Absolute URL or path. Will be resolved to https://archcore.ai + path. */
  canonical?: string;
  /** Absolute URL or path-relative (e.g. /og-image.png). */
  ogImage?: string;
}

const SITE_URL = "https://archcore.ai";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

type MetaSelector = { selector: string; create: () => HTMLElement };

const META_SELECTORS: Record<string, MetaSelector> = {
  description: {
    selector: 'meta[name="description"]',
    create: () => {
      const el = document.createElement("meta");
      el.setAttribute("name", "description");
      return el;
    },
  },
  canonical: {
    selector: 'link[rel="canonical"]',
    create: () => {
      const el = document.createElement("link");
      el.setAttribute("rel", "canonical");
      return el;
    },
  },
  ogTitle: {
    selector: 'meta[property="og:title"]',
    create: () => {
      const el = document.createElement("meta");
      el.setAttribute("property", "og:title");
      return el;
    },
  },
  ogDescription: {
    selector: 'meta[property="og:description"]',
    create: () => {
      const el = document.createElement("meta");
      el.setAttribute("property", "og:description");
      return el;
    },
  },
  ogUrl: {
    selector: 'meta[property="og:url"]',
    create: () => {
      const el = document.createElement("meta");
      el.setAttribute("property", "og:url");
      return el;
    },
  },
  ogImage: {
    selector: 'meta[property="og:image"]',
    create: () => {
      const el = document.createElement("meta");
      el.setAttribute("property", "og:image");
      return el;
    },
  },
  twitterTitle: {
    selector: 'meta[name="twitter:title"]',
    create: () => {
      const el = document.createElement("meta");
      el.setAttribute("name", "twitter:title");
      return el;
    },
  },
  twitterDescription: {
    selector: 'meta[name="twitter:description"]',
    create: () => {
      const el = document.createElement("meta");
      el.setAttribute("name", "twitter:description");
      return el;
    },
  },
  twitterImage: {
    selector: 'meta[name="twitter:image"]',
    create: () => {
      const el = document.createElement("meta");
      el.setAttribute("name", "twitter:image");
      return el;
    },
  },
};

type MetaKey = keyof typeof META_SELECTORS;

function getOrCreate(key: MetaKey): {
  el: HTMLElement;
  attr: "content" | "href";
  created: boolean;
} {
  const def = META_SELECTORS[key];
  const existing = document.querySelector<HTMLElement>(def.selector);
  if (existing) {
    return {
      el: existing,
      attr: existing.tagName === "LINK" ? "href" : "content",
      created: false,
    };
  }
  const el = def.create();
  document.head.appendChild(el);
  return {
    el,
    attr: el.tagName === "LINK" ? "href" : "content",
    created: true,
  };
}

function resolveAbsolute(value: string): string {
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  return `${SITE_URL}${value.startsWith("/") ? "" : "/"}${value}`;
}

/**
 * Sets per-page document meta tags (title, description, canonical, OG, Twitter)
 * and restores the previous values on unmount.
 *
 * Pre-rendered HTML files at build time (see scripts/prerender-routes.mts)
 * provide static meta for social scrapers. This hook covers client-side
 * navigation and ensures Google's JS-rendered crawl sees the right tags.
 */
export function usePageMeta({
  title,
  description,
  canonical,
  ogImage,
}: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title;
    const canonicalUrl = canonical ? resolveAbsolute(canonical) : SITE_URL;
    const ogImageUrl = ogImage ? resolveAbsolute(ogImage) : DEFAULT_OG_IMAGE;

    const updates: Array<{ key: MetaKey; value: string }> = [
      { key: "description", value: description },
      { key: "canonical", value: canonicalUrl },
      { key: "ogTitle", value: title },
      { key: "ogDescription", value: description },
      { key: "ogUrl", value: canonicalUrl },
      { key: "ogImage", value: ogImageUrl },
      { key: "twitterTitle", value: title },
      { key: "twitterDescription", value: description },
      { key: "twitterImage", value: ogImageUrl },
    ];

    const restorers: Array<() => void> = [];

    document.title = title;
    restorers.push(() => {
      document.title = prevTitle;
    });

    for (const { key, value } of updates) {
      const { el, attr, created } = getOrCreate(key);
      const prev = el.getAttribute(attr);
      el.setAttribute(attr, value);
      restorers.push(() => {
        if (created) {
          el.remove();
          return;
        }
        if (prev !== null) el.setAttribute(attr, prev);
      });
    }

    return () => {
      for (const restore of restorers) restore();
    };
  }, [title, description, canonical, ogImage]);
}
