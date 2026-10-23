---
title: "OpenSpec + Archcore Integration | Setup"
heading: "OpenSpec + Archcore"
description: "Connect OpenSpec + Archcore to check changes against project decisions, keep specs in OpenSpec, and carry decision context into the next session."
summary: "Check proposed changes against project decisions. Keep specs and archives in OpenSpec."
category: "Spec-driven development"
updatedDate: 2026-09-12
recipe: "openspec"
instructions: "openspec/cooperation.md"
digest: "c0f36be31f87b066eb69fae786831a6193a3586a6ae5082da74259834fa3143c"
source:
  repo: "https://github.com/archcore-ai/landing"
  label: "Landing repository"
  path: "src/recipes/openspec/cooperation.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps project decisions and rules [in Git](https://docs.archcore.ai/) so your agent can check proposed changes against them."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "OpenSpec"
    url: "https://github.com/Fission-AI/OpenSpec"
    role: "Organizes each change through its [proposal, specifications, design, tasks and archive](https://github.com/Fission-AI/OpenSpec)."
hosts: []
evidence: []
workflow:
  heading: "From a proposed change to a saved decision"
  steps:
    - title: "Check decisions before design"
      description: "The agent reads the relevant Archcore decisions and OpenSpec files first. If your request conflicts with an accepted decision, you settle it before work goes on."
    - title: "Review the proposal"
      description: "OpenSpec keeps the proposal, specs, design and tasks. You review the saved design; after you approve it, the agent records new decisions as draft ADRs (architecture decision records) linked to those files."
    - title: "Build, archive and pick up later"
      description: "The agent follows the OpenSpec tasks, syncs the specs and archives the change. A later session reads the specs and records and says which decisions are still drafts."
  note: "Both tools must already be set up. OpenSpec keeps the feature work; Archcore records link to it."
pilot:
  heading: "Review changes with their project context."
  summary: "You review a proposal next to the decisions it must respect, and the reasons behind new decisions stay in Git for later work."
  limitation: "An earlier revision completed one coupon scenario twice in Claude Code; this text has not had a joint run."
  findings:
    - scenario: "A request conflicts with an existing decision"
      result: "In both runs, the agent raised the conflict before changing code and kept the accepted decision once the owner settled it."
      caveat: "The benchmark asked for the conflict check, so detection without that prompt was not tested."
    - scenario: "Picking up work in another session"
      result: "A later session recovered the coupon behavior and told accepted decisions from drafts."
      caveat: "This was a scripted step in the same working tree, not proof for every later session."
example:
  request: "Introduce coupon discounts in this quotation library. Use floating-point arithmetic for the monetary intermediate values. Check existing project decisions and report any conflict before implementing."
  steps:
    - tool: "Archcore"
      text: "The agent finds the accepted integer-cents decision, reports the conflict with the float request and stops before changing any file."
    - tool: "OpenSpec"
      text: "You keep integer cents, and the agent writes the proposal, design, specs and tasks in OpenSpec's folders, then waits for your review."
    - tool: "Archcore"
      text: "After you approve the design, its decisions become draft ADRs linked to the OpenSpec files."
    - tool: "OpenSpec"
      text: "The agent works through the tasks, runs the tests, syncs the specs and archives the change."
    - text: "A new session answers from the saved files: 13 cents off and 612 cents total for one tea with SAVE10, plus which decisions are still drafts."
  note: "This is what the instructions ask for, not a recorded run. An earlier revision completed this scenario twice; this one has not run yet."
limits:
  - "Experimental until this exact text is tested. The pilot used Claude Code 2.1.268, claude-opus-5[1m], Archcore 0.8.3 and an OpenSpec 1.13.0 snapshot."
  - "Two runs of one scenario do not prove better code or lower cost."
  - "Nothing enforces the instructions. Review the design, the code and the draft ADRs yourself."
ru:
  summary: "Проверяйте предлагаемые изменения по решениям проекта. Спецификации и архив остаются в OpenSpec."
  category: "Разработка от спецификации"
  toolRoles:
    Archcore: "Хранит решения и правила проекта [в Git](https://docs.archcore.ai/), чтобы агент сверял с ними предлагаемые изменения."
    OpenSpec: "Ведёт каждое изменение через [предложение, спецификации, проектное решение, задачи и архив](https://github.com/Fission-AI/OpenSpec)."
  workflow:
    heading: "От предложенного изменения до сохранённого решения"
    steps:
      - title: "Сверить решения до проектирования"
        description: "Сначала агент читает нужные решения Archcore и файлы OpenSpec. Если запрос противоречит принятому решению, вы разбираетесь с этим до продолжения работы."
      - title: "Посмотреть предложение"
        description: "OpenSpec хранит предложение, спецификации, проектное решение и задачи. Вы смотрите сохранённое проектное решение, а после вашего согласия агент записывает новые решения черновыми ADR (записями об архитектурных решениях) со ссылками на эти файлы."
      - title: "Сделать, заархивировать, вернуться позже"
        description: "Агент идёт по задачам OpenSpec, обновляет спецификации и архивирует изменение. Следующая сессия читает спецификации и записи и говорит, какие решения пока черновики."
    note: "Оба инструмента должны быть уже настроены. OpenSpec ведёт работу над функцией, записи Archcore ссылаются на неё."
  pilot:
    heading: "Разбирайте изменения вместе с контекстом проекта."
    summary: "Вы смотрите предложение рядом с решениями, которые оно обязано соблюдать, а причины новых решений остаются в Git для дальнейшей работы."
    limitation: "Прежняя редакция дважды прошла один сценарий с купонами в Claude Code; этот текст вместе ещё не запускали."
    findings:
      - scenario: "Запрос противоречит принятому решению"
        result: "В обоих прогонах агент назвал противоречие до правки кода и сохранил принятое решение, когда владелец сделал выбор."
        caveat: "Тест сам просил проверить противоречия, так что без такой подсказки это не проверяли."
      - scenario: "Продолжение работы в другой сессии"
        result: "Следующая сессия восстановила поведение купона и отличила принятые решения от черновых."
        caveat: "Шаг был заранее задан и шёл в том же рабочем каталоге, на любую сессию это не распространяется."
  example:
    request: "Добавьте скидки по купонам в эту библиотеку расчёта стоимости. Для промежуточных денежных значений используйте числа с плавающей точкой. Проверьте принятые решения проекта и сообщите о противоречии до реализации."
    steps:
      - "Агент находит принятое решение о целых центах, сообщает о противоречии с плавающей точкой и останавливается, ничего не меняя."
      - "Вы оставляете целые центы, и агент пишет предложение, проектное решение, спецификации и задачи в папках OpenSpec, а потом ждёт вашего просмотра."
      - "Когда вы одобряете проектное решение, его решения становятся черновыми ADR со ссылками на файлы OpenSpec."
      - "Агент проходит задачи, запускает тесты, обновляет спецификации и архивирует изменение."
      - "Новая сессия отвечает по сохранённым файлам: скидка 13 центов и итог 612 центов за один чай с SAVE10, а ещё какие решения пока черновики."
    note: "Так работают инструкции на бумаге, это не запись прогона. Прежняя редакция дважды прошла этот сценарий, эту ещё не запускали."
  limits:
    - "Экспериментально, пока именно этот текст не проверен. В пилоте были Claude Code 2.1.268, claude-opus-5[1m], Archcore 0.8.3 и снимок OpenSpec 1.13.0."
    - "Два прогона одного сценария не доказывают, что код стал лучше или дешевле."
    - "Выполнение инструкций зависит только от агента. Проектное решение, код и черновые ADR проверяйте сами."
maintainer: "Archcore maintainers"
---

## How OpenSpec + Archcore work together

OpenSpec + Archcore connects a proposed change to the project decisions behind
it. OpenSpec keeps the proposal, design, specs and tasks together. Archcore gives
the agent the decisions to check before it touches code, and a place to record
new ones after you approve the design.

Say a request to simplify price math conflicts with an accepted rule about exact
money arithmetic. The agent shows you the conflict during design, while you can
still keep the rule or change it.

The [pilot findings and instruction changes](/integration-evidence/2026-09-11-spec-workflows.md)
describe what was measured. Commands and installation are on the
[OpenSpec project](https://github.com/Fission-AI/OpenSpec) page.
