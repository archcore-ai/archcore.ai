/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_POSTHOG_KEY: string | undefined;
  readonly PUBLIC_POSTHOG_HOST: string | undefined;
}
