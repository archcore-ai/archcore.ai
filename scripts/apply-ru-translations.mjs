import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const poPath = join(__dirname, "..", "src", "locales", "ru", "messages.po");

const translations = {
  // InstallSection — new tabbed section
  "Install Archcore": "Установка Archcore",
  "Install the CLI once, run archcore init, then pick your path.":
    "Установите CLI один раз, запустите archcore init и выберите свой путь.",
  "Step 3 — choose your path": "Шаг 3 — выберите путь",
  "Initialize your repo": "Инициализируйте репозиторий",
  "Install the plugin in your agent host":
    "Установите плагин в хост вашего агента",
  "The plugin reads your repo context and gives the agent a higher-level interface.":
    "Плагин читает контекст репозитория и даёт агенту высокоуровневый интерфейс.",
  "GitHub Copilot is on the plugin roadmap.":
    "GitHub Copilot — в планах по поддержке плагина.",
  "View plugin on GitHub": "Посмотреть плагин на GitHub",

  // Codex CLI plugin host (rebrand)
  "Codex CLI 0.117+": "Codex CLI 0.117+",
  "Install in Codex:": "Установите в Codex:",
  "Codex CLI 0.117+ supported": "Codex CLI 0.117+ поддерживается",
  "Add the plugin via `codex plugin marketplace add archcore-ai/plugin`. Hooks gated by Codex feature flag (`codex features enable plugin_hooks`).":
    "Добавьте плагин командой `codex plugin marketplace add archcore-ai/plugin`. Хуки активируются Codex feature flag (`codex features enable plugin_hooks`).",
  "Give Claude Code, Cursor & Codex CLI<0/>a brain for your codebase.":
    "Дайте Claude Code, Cursor и Codex CLI<0/>понимание вашей кодовой базы.",
  "The Archcore plugin loads your architecture, rules, and decisions into Claude Code, Cursor, and Codex CLI — so the agent stops guessing and starts following your team's truth.":
    "Плагин Archcore загружает вашу архитектуру, правила и решения в Claude Code, Cursor и Codex CLI — чтобы агент перестал угадывать и начал следовать команде.",
  "Archcore Plugin — repo context for Claude Code, Cursor & Codex CLI":
    "Archcore Plugin — контекст репозитория для Claude Code, Cursor и Codex CLI",
  "Claude Code (production), Cursor 2.5+ (implemented), and Codex CLI 0.117+ (implemented). GitHub Copilot is on the roadmap. For other MCP-capable agents, use the CLI directly.":
    "Claude Code (production), Cursor 2.5+ (реализовано) и Codex CLI 0.117+ (реализовано). GitHub Copilot — в планах. Для других агентов с MCP используйте CLI напрямую.",
  "Claude Code, Cursor, and Codex CLI produce code that ignores your conventions, your ADRs, and your prior decisions.":
    "Claude Code, Cursor и Codex CLI выдают код, который игнорирует ваши соглашения, ADR и ранее принятые решения.",
  "Three install commands give Claude Code, Cursor, and Codex CLI a memory that lives next to the code — and slash commands to capture new decisions as they happen.":
    "Три команды установки дают Claude Code, Cursor и Codex CLI память, которая живёт рядом с кодом — и slash-команды, чтобы фиксировать новые решения по ходу работы.",
  "Three install commands. Architecture-aware <0>/archcore</0> slash commands inside your agent.":
    "Три команды установки. Slash-команды <0>/archcore</0>, понимающие архитектуру, прямо в вашем агенте.",
  "Plugin: Claude Code (production), Cursor 2.5+, and Codex CLI 0.117+ (all implemented). GitHub Copilot is on the roadmap. The CLI works with 8 agents today via MCP and hooks: Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, Cline.":
    "Плагин: Claude Code (production), Cursor 2.5+ и Codex CLI 0.117+ (все реализованы). GitHub Copilot — в планах. CLI уже работает с 8 агентами через MCP и хуки: Claude Code, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Codex CLI, Roo Code, Cline.",
  Production: "Production",
  Implemented: "Реализовано",
  "Or from inside Claude Code": "Или изнутри Claude Code",
  "Install via the Cursor Plugins marketplace.":
    "Установите через маркетплейс плагинов Cursor.",
  "Open plugin on GitHub": "Открыть плагин на GitHub",
  "Local dev install": "Локальная установка для разработки",
  "Wire up MCP or hooks": "Подключите MCP или хуки",
  "Connect the context layer to your agent. Hooks inject context at session start. MCP exposes tools to browse and edit docs.":
    "Подключите слой контекста к агенту. Хуки вставляют контекст при старте сессии. MCP даёт инструменты для просмотра и редактирования документов.",
  "What you get": "Что вы получите",
  "Standalone binary for macOS, Linux, and Windows. No external services.":
    "Самодостаточный бинарник для macOS, Linux и Windows. Внешние сервисы не нужны.",
};

function escapePoLiteral(value) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const content = readFileSync(poPath, "utf8");
const lines = content.split("\n");

let applied = 0;
let skipped = 0;
const unmatched = new Set(Object.keys(translations));

for (let i = 0; i < lines.length - 1; i++) {
  const line = lines[i];
  if (!line.startsWith("msgid ")) continue;

  const match = line.match(/^msgid "(.*)"$/);
  if (!match) continue;

  const rawMsgid = match[1]
    .replace(/\\n/g, "\n")
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, "\\");

  const translation = translations[rawMsgid];
  if (!translation) continue;
  unmatched.delete(rawMsgid);

  if (lines[i + 1] !== 'msgstr ""') {
    skipped++;
    continue;
  }

  lines[i + 1] = `msgstr "${escapePoLiteral(translation)}"`;
  applied++;
}

writeFileSync(poPath, lines.join("\n"), "utf8");

console.log(`Applied: ${applied}`);
console.log(`Skipped (already translated): ${skipped}`);
if (unmatched.size > 0) {
  console.log(`Unmatched msgids (not found in PO):`);
  for (const m of unmatched) console.log("  -", m);
}
