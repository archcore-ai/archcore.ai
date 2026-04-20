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
  "Copilot and Codex CLI are on the plugin roadmap.":
    "Copilot и Codex CLI — в планах по поддержке плагина.",
  "View plugin on GitHub": "Посмотреть плагин на GitHub",
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
