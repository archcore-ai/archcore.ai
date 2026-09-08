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
  privacy: "/privacy/",
  blog: "/blog/",
  learn: "/learn/",
  integrations: "/integrations/",
  repoMemory: "/learn/repo-memory/",
  harnessEngineering: "/learn/harness-engineering/",
  // Root-level reference pages, one canonical owner per query cluster.
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
  // The hero install block is one path, so #install-cli / #install-plugin are
  // gone with the tabs they pre-selected (see hero-section.tsx).
  install: "#install",
  compare: "#problem",
  whyArchcore: "#why-archcore",
  faq: "#faq",
} as const;
