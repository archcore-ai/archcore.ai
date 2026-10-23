---
title: "Serena + Archcore Integration | Setup"
heading: "Serena + Archcore"
description: "Connect Serena + Archcore to check code changes against project decisions and edit code through symbol-aware navigation instead of plain text search."
summary: "Check code changes against project decisions. Navigate and edit code by symbol with Serena."
category: "Code navigation"
updatedDate: 2026-09-13
recipe: "serena"
instructions: "serena/cooperation.md"
digest: "9c46b76a873e1cefddf03eeb47a1e9e28ee8db202d22ba54fce7b1b26f3c6a35"
source:
  repo: "https://github.com/archcore-ai/landing"
  label: "Landing repository"
  path: "src/recipes/serena/cooperation.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps project decisions, rules and specifications [in Git](https://docs.archcore.ai/) so your agent can check a change against them."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "Serena"
    url: "https://github.com/oraios/serena"
    role: "[Finds symbols](https://github.com/oraios/serena) and their references in the code, and applies edits at the symbol level."
hosts: []
evidence: []
workflow:
  heading: "From a code request to a recorded decision"
  steps:
    - title: "Read the decisions first"
      description: "Before changing code, the agent searches Archcore for accepted decisions, rules and specs that cover the area. An accepted decision constrains the change."
    - title: "Find the symbols, then edit"
      description: "Serena lists the affected symbols and every place that uses them, and edits them as whole symbols. The agent runs the relevant tests after."
    - title: "Record what was settled"
      description: "New decisions go to Archcore as draft records for you to accept. Serena memory keeps code notes only, so the next session reads decisions from the repository."
  note: "Serena sees the code, Archcore keeps the decisions, and the agent checks one against the other."
pilot:
  heading: "Change code with its constraints in view."
  summary: "The agent knows the accepted decisions before it starts, and works from real symbol references instead of matched strings."
  limitation: "These instructions have not had a joint run, and nothing in the pair enforces the order of the steps."
example:
  request: "Introduce coupon discounts in this quotation library. Use floating-point arithmetic for the monetary intermediate values. Use Serena for the code changes, and report any conflict with project decisions first."
  steps:
    - tool: "Archcore"
      text: "The agent finds the accepted integer-cents decision, reports the conflict with the float request and stops before any file changes."
    - tool: "Serena"
      text: "You keep integer cents, and the agent reads shop.api.quote and all its callers in Serena."
    - tool: "Serena"
      text: "Code changes go through Serena's symbol edits, then the tests run."
    - tool: "Archcore"
      text: "Decisions settled on the way become draft records linked to the change."
    - text: "A new session reads those records before it asks you anything the repository already answers."
  note: "This is what the instructions ask for, not a recorded run. This instruction revision has not had a joint run."
limits:
  - "No verification record is linked to this instruction text, so the pairing is experimental."
  - "Serena must already be installed and connected. Where it does not support a language, the agent falls back to ordinary tools."
  - "Serena diagnostics do not replace running the tests."
ru:
  summary: "Проверяйте изменения кода по решениям проекта. Навигация и правки по символам через Serena."
  category: "Навигация по коду"
  toolRoles:
    Archcore: "Хранит решения, правила и спецификации проекта [в Git](https://docs.archcore.ai/), чтобы агент мог сверить с ними изменение."
    Serena: "[Находит символы](https://github.com/oraios/serena) и ссылки на них в коде и правит код на уровне символов."
  workflow:
    heading: "От запроса на изменение кода до записанного решения"
    steps:
      - title: "Сначала прочитать решения"
        description: "До правки кода агент ищет в Archcore принятые решения, правила и спецификации по этой области. Принятое решение ограничивает изменение."
      - title: "Найти символы и править"
        description: "Serena показывает затронутые символы и все места, где их используют, и правит символы целиком. Потом агент запускает нужные тесты."
      - title: "Записать то, что решили"
        description: "Новые решения уходят в Archcore черновыми записями, их принимаете вы. В памяти Serena только заметки по коду, поэтому следующая сессия берёт решения из репозитория."
    note: "Serena видит код, Archcore хранит решения, а агент сверяет одно с другим."
  pilot:
    heading: "Меняйте код, видя его ограничения."
    summary: "Агент знает принятые решения до начала работы и опирается на реальные ссылки на символы, а не на совпадения строк."
    limitation: "Совместных прогонов по этим инструкциям не было, и ничто в паре не заставляет соблюдать порядок шагов."
  example:
    request: "Добавьте скидки по купонам в библиотеку расчёта стоимости. Для промежуточных денежных значений используйте числа с плавающей точкой. Код правьте через Serena, а о противоречиях с решениями проекта сообщите заранее."
    steps:
      - "Агент находит принятое решение о целых центах, сообщает о противоречии с плавающей точкой и останавливается, пока ни один файл не изменён."
      - "Вы оставляете целые центы, и агент читает в Serena shop.api.quote и всё, что её вызывает."
      - "Правки идут через редактирование символов в Serena, затем запускаются тесты."
      - "Решения, принятые по ходу, становятся черновыми записями со ссылкой на изменение."
      - "Новая сессия читает эти записи, прежде чем спросить то, на что репозиторий уже отвечает."
    note: "Так описывают инструкции, это не запись прогона. У этой редакции инструкций совместных прогонов не было."
  limits:
    - "К этому тексту инструкций не привязана запись о проверке, поэтому пара экспериментальная."
    - "Serena должна быть уже установлена и подключена. Если она не поддерживает язык, агент работает обычными средствами."
    - "Диагностика Serena не заменяет запуск тестов."
maintainer: "Archcore maintainers"
---

## How Serena + Archcore work together

Serena + Archcore connects a code change to the decisions that constrain it.
Serena finds the symbols and references the change touches and edits them as
whole symbols. Archcore gives the agent the accepted decisions, rules and specs
before work starts, and keeps new decisions in Git after.

Say you ask to rename a payment interface. Serena's reference list reaches every
call site. If an accepted rule pins that interface for a published contract, the
agent reports the conflict and waits for you to keep or change the rule.

Serena memory holds code notes; decisions go to Archcore as drafts you accept.
Commands, language support and installation are on the
[Serena project](https://github.com/oraios/serena) page.
