---
title: "Superpowers + Archcore Integration | Setup"
heading: "Superpowers + Archcore"
description: "Connect Superpowers + Archcore to bring project decisions into your agent’s work. Copy the integration instructions and set up your agent."
summary: "Give Superpowers your project’s decisions. Keep new decisions in Git with Archcore."
category: "Workflow skills"
updatedDate: 2026-09-09
recipe: "superpowers"
instructions: "superpowers/cooperation.md"
digest: "1c1dd4f05e87a49e3136650e0f00fe4fa6a189bd8c3692adb3fd7c979d0de7df"
source:
  repo: "https://github.com/archcore-ai/archcore"
  path: "AGENTS.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps project decisions, rules, and specs [in Git](https://docs.archcore.ai/) for your agent to use."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "Superpowers"
    url: "https://github.com/obra/superpowers"
    role: "Guides design and implementation through its own [skills](https://github.com/obra/superpowers) and plans."
hosts:
  - id: "claude-code"
    label: "Claude Code"
    instructionFile: "CLAUDE.md"
    note: null
    verified: false
  - id: "codex-cli"
    label: "Codex CLI"
    instructionFile: "AGENTS.md"
    note: null
    verified: false
  - id: "codex-app"
    label: "Codex App"
    instructionFile: "AGENTS.md"
    note: null
    verified: false
  - id: "cursor"
    label: "Cursor"
    instructionFile: "AGENTS.md"
    note: null
    verified: false
  - id: "copilot"
    label: "GitHub Copilot"
    instructionFile: ".github/copilot-instructions.md"
    note: "Paste the full text into this file, rather than a link to it."
    verified: false
evidence: []
workflow:
  heading: "From a new idea to the next session"
  steps:
    - title: "Read existing decisions"
      description: "When brainstorming starts, the agent searches Archcore for decisions and rules that apply. A conflict with an accepted decision goes to you before any design."
    - title: "Keep the decisions you approve"
      description: "After you approve the design, the agent records its decisions as draft ADRs (architecture decision records). Accepting one needs your explicit approval."
    - title: "Continue with project context"
      description: "The next session finds the saved design and decisions. Superpowers keeps its own plans in the repository."
  note: "Starting with /archcore:plan? That command finishes first, and Superpowers picks up what it leaves open."
pilot:
  heading: "Catch conflicts before code."
  summary: "Existing project decisions reach the design work. You resolve conflicts before implementation and approve new decisions before they are accepted."
  limitation: "The design-to-ADR step has not been verified end to end."
  findings:
    - scenario: "Design with project context"
      result: "Brainstorming starts with a search for relevant decisions and rules."
      caveat: "You approve the design before code is written."
    - scenario: "Two implementation plans"
      result: "Superpowers keeps its detailed execution plan, and the Archcore plan stays as written."
      caveat: "You maintain any tasks that overlap between the two plans."
example:
  request: "Introduce coupon discounts in this quotation library. Use floating-point arithmetic for the monetary intermediate values. Use superpowers:brainstorming for the design and superpowers:writing-plans for the plan, and report any conflict with project decisions first."
  steps:
    - tool: "Archcore"
      text: "Brainstorming opens with a search of project records, finds the accepted integer-cents decision, reports the conflict and stops."
    - tool: "Superpowers"
      text: "You keep integer cents, and brainstorming writes a design file under docs/superpowers/specs/ for you to approve before any code."
    - tool: "Archcore"
      text: "Once you approve it, the decisions it settles become draft ADRs."
    - tool: "Superpowers"
      text: "Writing-plans puts the plan in docs/superpowers/plans/, the plan runs and the tests pass."
    - text: "A new session works from the saved design, plan and records, with drafts kept apart from accepted decisions."
  note: "This is what the instructions ask for, not a recorded run. No verification record is attached to this instruction revision yet."
limits:
  - "This instruction revision has no linked verification record. Setup steps are written for five agents and checked on none."
  - "Superpowers must already be installed and callable."
ru:
  summary: "Передайте Superpowers решения вашего проекта. Новые решения храните в Git через Archcore."
  category: "Навыки рабочего процесса"
  toolRoles:
    Archcore: "Хранит решения, правила и спецификации проекта [в Git](https://docs.archcore.ai/), чтобы агент ими пользовался."
    Superpowers: "Ведёт проектирование и реализацию через свои [навыки](https://github.com/obra/superpowers) и планы."
  workflow:
    heading: "От новой идеи до следующей сессии"
    steps:
      - title: "Прочитать принятые решения"
        description: "В начале обсуждения агент ищет в Archcore решения и правила по задаче. Противоречие с принятым решением сначала попадает к вам, а уже потом в проектирование."
      - title: "Сохранить решения, которые вы одобрили"
        description: "После одобрения проекта агент записывает его решения черновыми ADR (записями об архитектурных решениях). Принять ADR можно только с вашего явного согласия."
      - title: "Продолжить с контекстом проекта"
        description: "Следующая сессия находит сохранённый проект и решения. Свои планы Superpowers хранит в репозитории."
    note: "Начали с /archcore:plan? Сначала команда доходит до конца, а Superpowers подхватывает то, что она оставила открытым."
  pilot:
    heading: "Замечайте противоречия до написания кода."
    summary: "Принятые решения проекта доходят до проектирования. Противоречия вы разбираете до реализации, а новые решения одобряете до того, как их примут."
    limitation: "Путь от проектирования до ADR целиком не проверяли."
    findings:
      - scenario: "Проектирование с контекстом проекта"
        result: "Обсуждение начинается с поиска подходящих решений и правил."
        caveat: "Проект вы одобряете до того, как написан код."
      - scenario: "Два плана реализации"
        result: "Superpowers ведёт свой подробный план, а план Archcore остаётся как написан."
        caveat: "Задачи, которые пересекаются в двух планах, поддерживаете вы."
  example:
    request: "Добавьте скидки по купонам в библиотеку расчёта стоимости. Для промежуточных денежных значений используйте числа с плавающей точкой. Проектируйте через superpowers:brainstorming, планируйте через superpowers:writing-plans, а о противоречиях с решениями проекта сообщите заранее."
    steps:
      - "Обсуждение начинается с поиска по записям проекта: агент находит решение о целых центах, сообщает о противоречии и останавливается."
      - "Вы оставляете целые центы, и обсуждение даёт файл проекта в docs/superpowers/specs/, который вы одобряете до любого кода."
      - "После одобрения закреплённые в нём решения становятся черновыми ADR."
      - "writing-plans кладёт план в docs/superpowers/plans/, план выполняется, тесты проходят."
      - "Новая сессия работает по сохранённому проекту, плану и записям и не путает черновые решения с принятыми."
    note: "Так описывают инструкции, это не запись прогона. К этой редакции инструкций пока не привязана ни одна запись о проверке."
  limits:
    - "У этой редакции инструкций нет записи о проверке. Шаги настройки написаны для пяти агентов и ни на одном не проверены."
    - "Superpowers должен быть уже установлен и доступен для вызова."
maintainer: "Archcore maintainers"
---

## How Superpowers + Archcore work together

Start with either tool. These instructions tell your agent to read existing
project decisions before design work and save new decisions in Archcore.
Superpowers keeps its own plans; Archcore documents reference them.
