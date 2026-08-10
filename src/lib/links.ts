export const LINKS = {
  pluginRepo: "https://github.com/archcore-ai/plugin",
  cliRepo: "https://github.com/archcore-ai/cli",
  org: "https://github.com/archcore-ai",
  docs: "https://docs.archcore.ai/",
  docsQuickstart: "https://docs.archcore.ai/getting-started/quick-start/",
  docsMigrate: "https://docs.archcore.ai/start/migrate-from-flat-files/",
  docsSupportedHosts: "https://docs.archcore.ai/plugin/supported-hosts/",
  docsAgentIntegrations: "https://docs.archcore.ai/cli/agent-integrations/",
  supportedAgents:
    "https://github.com/archcore-ai/cli/tree/main?tab=readme-ov-file#supported-agents",
  cursorDirectory: "https://cursor.directory/plugins/archcore",
  discord: "https://discord.gg/5YC8pdjD",
  x: "https://x.com/archcore_ai",
  telegram: "https://t.me/archcore_ai",
} as const;

export const INTERNAL_LINKS = {
  home: "/",
  plugin: "/plugin/",
  cli: "/cli/",
  howToUse: "/how-to-use/",
  teamsGettingStarted: "/teams/getting-started",
  privacy: "/privacy/",
  // Static Astro pages (content-site build), not SPA routes — link with a
  // full page load, never through React Router.
  blog: "/blog/",
  learn: "/learn/",
  repoMemory: "/learn/repo-memory/",
  harnessEngineering: "/learn/harness-engineering/",
  // Root-level pillar pages, one canonical owner per query cluster
  // (product/seo-information-architecture). Static Astro pages from the
  // content-site sub-build, so link them with a full page load.
  contextEngineering: "/context-engineering/",
  specDrivenDevelopment: "/spec-driven-development/",
  projectContext: "/project-context/",
  gitNativeContext: "/git-native-context/",
  mcp: "/mcp/",
  // Per-host integration pages, same collection and same rule.
  claudeCode: "/claude-code/",
  cursor: "/cursor/",
  codex: "/codex/",
  githubCopilot: "/github-copilot/",
  geminiCli: "/gemini-cli/",
  agentsMd: "/agents-md/",
  claudeMd: "/claude-md/",
} as const;

export const ANCHORS = {
  top: "#top",
  install: "#install",
  installCli: "#install-cli",
  compare: "#problem",
  whyArchcore: "#why-archcore",
  faq: "#faq",
} as const;
