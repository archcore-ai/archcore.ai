/**
 * Analytics entry point for the Vite SPA.
 *
 * There is no React context or provider: PostHog is a singleton, so `track`
 * is imported directly wherever an event is fired. That keeps the same call
 * shape in React components and in the Astro surfaces, which have no React.
 */

export {
  setupAnalytics,
  track,
  registerSuperProperties,
  trackArticleCompletion,
  getClient,
  type AnalyticsConfig,
} from "./core";

export { faqOpenHandler } from "./faq";

export type {
  AnalyticsEventMap,
  AnalyticsEventName,
  ContentSection,
  InstallPlatform,
  NavLocation,
  Site,
  SuperProperties,
} from "./events";
