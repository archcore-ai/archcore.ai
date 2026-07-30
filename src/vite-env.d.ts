/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Optional at the type level because a build without the variable set is a
  // real (and previously shipped) state. vite.config.ts fails the production
  // build when it is missing; the runtime degrades to no-op analytics.
  readonly VITE_PUBLIC_POSTHOG_KEY: string | undefined;
  readonly VITE_PUBLIC_POSTHOG_HOST: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
