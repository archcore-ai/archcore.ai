import { LinguiConfig } from "@lingui/conf";

const config: LinguiConfig = {
  locales: ["en", "ru"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
      exclude: ["**/node_modules/**", "**/dist/**"],
    },
  ],
  format: "po",
  compileNamespace: "ts",
};

export default config;
