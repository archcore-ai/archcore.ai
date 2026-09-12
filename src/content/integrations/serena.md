---
title: "Serena + Archcore Integration | Setup"
heading: "Serena + Archcore"
description: "Connect Serena + Archcore to check code changes against project decisions and edit code through symbol-aware navigation instead of plain text search."
summary: "Check code changes against project decisions. Navigate and edit code by symbol with Serena."
category: "Code navigation"
updatedDate: 2026-09-12
recipe: "serena"
instructions: "serena/cooperation.md"
digest: "e9c1d378e04d632fc3d8dadf411aab807bab71d5cb1c96cf5a08247384d846d9"
source:
  repo: "https://github.com/archcore-ai/landing"
  label: "Landing repository"
  path: "src/recipes/serena/cooperation.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps project decisions, rules and specifications in Git so your agent can check a change against them."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "Serena"
    url: "https://github.com/oraios/serena"
    role: "Finds symbols and their references in the code, and applies edits at the symbol level."
hosts: []
evidence: []
workflow:
  heading: "From a code request to a recorded decision"
  steps:
    - title: "Read the decisions first"
      description: "Before changing code, the agent searches Archcore for accepted decisions, rules and specifications that cover the area. An accepted decision is treated as a constraint on the change."
    - title: "Look up the symbols"
      description: "The agent activates your project in Serena, then inspects the affected symbols and their references. A rename, a move or a cross-file refactor starts from that reference list rather than from a text search."
    - title: "Edit and check"
      description: "Serena applies symbol-level edits where it can model the change safely. Prose, configuration and generated files stay on ordinary file edits. The agent then runs the relevant tests and reports diagnostics beside them."
    - title: "Record what was settled"
      description: "New architectural decisions are written to Archcore as draft records, linked to the change. Accepting a record is a separate step that needs your approval."
    - title: "Continue in the next session"
      description: "A later session reads the saved records before repeating questions. Serena memory stays available for code notes, but it does not hold the project's decisions."
  note: "Serena keeps the code-level view. Archcore keeps the decisions, and the instructions ask the agent to check one against the other."
pilot:
  heading: "Change code with its constraints in view."
  summary: "The agent brings accepted decisions into a code change before it starts, and works from real symbol references instead of matched strings. Decisions worth keeping end up in the repository."
  limitation: "These instructions have not had a joint run. They rely on the agent following them, and nothing in the pair enforces the order of the steps."
limits:
  - "This instruction text has no linked verification record, so the pairing is experimental."
  - "Serena is not installed by this recipe. It has to be present and its project activated already."
  - "Symbol-aware navigation depends on Serena's language support. Where a language or file is unsupported, the agent falls back to ordinary repository tools."
  - "Serena diagnostics are additional evidence. They do not replace running the tests."
  - "Setup steps are written for the common instruction files and checked on no host."
  - "This pair only. Two working pairs do not make a working triple."
ru:
  summary: "Проверяйте изменения кода по решениям проекта. Навигация и правки по символам через Serena."
  category: "Навигация по коду"
  toolRoles:
    Archcore: "Хранит решения, правила и спецификации проекта в Git, чтобы агент мог сверить с ними изменение."
    Serena: "Находит символы и ссылки на них в коде и правит код на уровне символов."
  workflow:
    heading: "От запроса на изменение кода до записанного решения"
    steps:
      - title: "Сначала прочитать решения"
        description: "Перед изменением кода агент ищет в Archcore принятые решения, правила и спецификации, которые касаются этой области. Принятое решение считается ограничением для изменения."
      - title: "Найти символы"
        description: "Агент активирует проект в Serena, затем смотрит затронутые символы и ссылки на них. Переименование, перенос или правка через несколько файлов начинаются с этого списка ссылок, а не с текстового поиска."
      - title: "Внести правки и проверить"
        description: "Serena правит код на уровне символов там, где может безопасно описать изменение. Текст, настройки и сгенерированные файлы правятся обычным способом. Затем агент запускает нужные тесты и приводит рядом сообщения диагностики."
      - title: "Записать то, что решили"
        description: "Новые архитектурные решения попадают в Archcore как черновые записи, связанные с изменением. Принятие записи — отдельный шаг, он требует вашего согласия."
      - title: "Продолжить в следующей сессии"
        description: "Следующая сессия читает сохранённые записи и не задаёт те же вопросы снова. Память Serena остаётся для заметок по коду, но решения проекта в ней не хранятся."
    note: "Serena отвечает за взгляд на уровне кода. Archcore хранит решения, а инструкции просят агента сверять одно с другим."
  pilot:
    heading: "Меняйте код, видя его ограничения."
    summary: "Агент берёт принятые решения в работу до начала изменения и опирается на реальные ссылки на символы, а не на совпадения строк. Решения, которые стоит сохранить, остаются в репозитории."
    limitation: "Совместных прогонов по этим инструкциям не было. Они полагаются на то, что агент им следует, и ничто в этой паре не заставляет соблюдать порядок шагов."
  limits:
    - "У этого текста инструкций нет связанной записи о проверке, поэтому пара считается экспериментальной."
    - "Serena этим рецептом не устанавливается. Она должна быть уже установлена, а проект в ней активирован."
    - "Навигация по символам зависит от того, какие языки поддерживает Serena. Там, где язык или файл не поддерживается, агент возвращается к обычным средствам работы с репозиторием."
    - "Диагностика Serena — дополнительное свидетельство. Она не заменяет запуск тестов."
    - "Шаги настройки написаны для распространённых файлов инструкций и ни на одной среде не проверены."
    - "Только эта пара. Две работающие пары не дают работающей тройки."
maintainer: "Archcore maintainers"
---

## How Serena + Archcore work together

Serena + Archcore connects a code change to the decisions that constrain it.
Serena finds the symbols and references the change touches, and edits them at the
symbol level. Archcore supplies the accepted decisions, rules and specifications
before the work starts, and keeps new decisions in Git afterwards.

For example, a request to rename a payment interface reaches every call site
through Serena's reference list. If an accepted rule pins that interface for a
published contract, the agent reports the conflict and stops the affected work
until you decide. You keep the rule or you change it, and the change follows.

The instructions also separate the two kinds of memory. Serena memory holds code
notes for its own use; architecture and product decisions go to Archcore as draft
records for your acceptance. For Serena's own commands, language support and
installation, see the [Serena project](https://github.com/oraios/serena).
