---
title: "OpenSpec + Archcore Integration | Setup"
heading: "OpenSpec + Archcore"
description: "Connect OpenSpec + Archcore to check changes against project decisions, keep specs in OpenSpec, and carry decision context into the next session."
summary: "Check proposed changes against project decisions. Keep specs and archives in OpenSpec."
category: "Spec-driven development"
updatedDate: 2026-09-12
recipe: "openspec"
instructions: "openspec/cooperation.md"
digest: "aaeec535cc719a655f00493b3dd92faa15eb434fc50302def967ec9e0ff3e95c"
source:
  repo: "https://github.com/archcore-ai/landing"
  label: "Landing repository"
  path: "src/recipes/openspec/cooperation.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps project decisions and rules in Git so your agent can check proposed changes against them."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "OpenSpec"
    url: "https://github.com/Fission-AI/OpenSpec"
    role: "Organizes each change through its proposal, specifications, design, tasks and archive."
hosts: []
evidence: []
workflow:
  heading: "From a proposed change to a saved decision"
  steps:
    - title: "Check the project before design"
      description: "The agent reads relevant Archcore decisions and OpenSpec artifacts. If your request conflicts with an accepted decision, you resolve that conflict before the affected work continues."
    - title: "Review one change proposal"
      description: "OpenSpec keeps the proposal, specs, design and task list. You review the saved design before implementation."
    - title: "Record the reasons behind the design"
      description: "After your approval, the agent checks for existing decisions and records new architectural decisions as draft ADRs in Archcore, linked to the OpenSpec files. An ADR is an architecture decision record; accepting it is a separate decision."
    - title: "Implement, check and archive"
      description: "The agent follows the OpenSpec tasks and checks the result against the requirements. When you authorize closing the change, it synchronizes specs, archives the change and updates references to moved files."
    - title: "Continue from saved context"
      description: "A later session reads the current specs, archived change and decision records. It reports what is complete, which decisions remain drafts and where the records disagree."
  note: "Use this recipe for a project already set up with both tools. OpenSpec keeps the feature work; Archcore records link to it."
pilot:
  heading: "Review changes with their project context."
  summary: "You get a proposal to review alongside the decisions it must respect. The instructions also preserve the reasons behind new decisions for later work."
  limitation: "The earlier recipe completed one coupon-change scenario twice in Claude Code. This revised instruction text has not had a joint run. The pilot does not establish better code, lower cost or reliable behavior across projects and agents."
  findings:
    - scenario: "A request conflicts with an existing decision"
      result: "In both pilot runs with the earlier recipe, the agent raised the conflict before changing code and preserved the accepted decision after the owner resolved it."
      caveat: "The benchmark explicitly asked for a conflict check and supplied the owner's resolution. It did not test detection without that prompt."
    - scenario: "One home for specifications and tasks"
      result: "Both runs produced native OpenSpec artifacts, synchronized the current specification and archived the change. New Archcore decision records remained drafts."
      caveat: "Saved records still had gaps, including stale references to whether ADRs existed. The revised instructions add a check for those statements."
    - scenario: "Picking up work in another session"
      result: "The recorded recall answers recovered the coupon behavior and distinguished accepted from draft decisions. They also identified disagreements in the saved documents."
      caveat: "This was a scripted recall step in the same working tree. It does not prove that every later session will recover all context."
example:
  request: "Introduce coupon discounts in this quotation library. Use floating-point arithmetic for the monetary intermediate values. Use the installed OpenSpec propose, apply, sync and archive workflow. Check existing project decisions and report any conflict before implementing."
  steps:
    - tool: "Archcore"
      text: "Before any design work, the agent searches the project records and finds the accepted decision: money is integer cents. It reports the conflict with the float request and stops. No file has changed."
    - tool: "OpenSpec"
      text: "You keep integer cents and withdraw the float request. The agent writes the proposal, design, specs and tasks in OpenSpec's own folders, then stops at the saved design for your review."
    - tool: "Archcore"
      text: "You approve the design. The decisions it settles become draft ADRs, each linked to the OpenSpec files by path. The money decision stays as it was."
    - tool: "OpenSpec"
      text: "You ask for the implementation. The agent works through the tasks, runs the tests (half-up rounding, delivery excluded, empty and unknown coupons), syncs the specs and archives the change. The new ADRs stay draft."
    - text: "A new session reads the archived change and the decision records and answers from them: the coupon contract, 13 cents off and 612 cents total for one tea with SAVE10, and which decisions are still draft."
  note: "This is what the instructions ask for, not a recorded run. An earlier revision completed this scenario twice in Claude Code; see the pilot note. This revision has not had a joint run."
limits:
  - "The published instructions are a revision of the measured recipe. They remain experimental until this exact text is tested."
  - "The pilot used Claude Code 2.1.268, model identifier claude-opus-5[1m], Archcore 0.8.3 and an OpenSpec 1.13.0 snapshot. Other hosts and tool revisions were not tested."
  - "Both recipe runs passed the benchmark's six primary checks and four additional contract checks. Passing those checks does not establish complete correctness."
  - "The pilot used explicit design and implementation approvals. The instructions cannot enforce approvals or document consistency outside the agent's behavior."
  - "This pair only. Adding another planning tool needs a separate compatibility check."
ru:
  summary: "Проверяйте предлагаемые изменения по решениям проекта. Спецификации и архив остаются в OpenSpec."
  category: "Разработка от спецификации"
  toolRoles:
    Archcore: "Хранит решения и правила проекта в Git, чтобы агент сверял с ними предлагаемые изменения."
    OpenSpec: "Ведёт каждое изменение через предложение, спецификации, проектное решение, задачи и архив."
  workflow:
    heading: "От предложенного изменения до сохранённого решения"
    steps:
      - title: "Проверить проект до проектирования"
        description: "Агент читает подходящие решения Archcore и файлы OpenSpec. Если ваш запрос противоречит принятому решению, вы разбираете это противоречие до того, как затронутая работа продолжится."
      - title: "Разобрать одно предложение об изменении"
        description: "OpenSpec хранит предложение, спецификации, проектное решение и список задач. Сохранённое проектное решение вы разбираете до реализации."
      - title: "Записать причины проектного решения"
        description: "После вашего согласия агент проверяет, нет ли уже таких решений, и записывает новые архитектурные решения в Archcore как черновые ADR, связанные с файлами OpenSpec. ADR — это запись об архитектурном решении; её принятие остаётся отдельным решением."
      - title: "Реализовать, проверить и заархивировать"
        description: "Агент идёт по задачам OpenSpec и сверяет результат с требованиями. Когда вы разрешаете закрыть изменение, он приводит спецификации в порядок, архивирует изменение и обновляет ссылки на перенесённые файлы."
      - title: "Продолжить с сохранённым контекстом"
        description: "Более поздняя сессия читает текущие спецификации, заархивированное изменение и записи решений. Она сообщает, что сделано, какие решения остались черновиками и где записи расходятся."
    note: "Этот рецепт — для проекта, где оба инструмента уже настроены. OpenSpec ведёт работу над функцией; записи Archcore на неё ссылаются."
  pilot:
    heading: "Разбирайте изменения вместе с контекстом проекта."
    summary: "Вы получаете предложение и рядом с ним решения, которые оно обязано соблюдать. Инструкции также сохраняют причины новых решений для дальнейшей работы."
    limitation: "Предыдущий рецепт дважды прошёл один сценарий с изменением купона в Claude Code. По этой исправленной версии инструкций совместных прогонов не было. Пилот не доказывает, что код становится лучше, расходы ниже, а поведение устойчиво в разных проектах и агентах."
    findings:
      - scenario: "Запрос противоречит принятому решению"
        result: "В оба прогона пилота с предыдущим рецептом агент назвал противоречие до изменения кода и сохранил принятое решение после того, как владелец его разобрал."
        caveat: "Тест прямо просил проверить противоречие и давал решение владельца. Обнаружение без такой подсказки не проверялось."
      - scenario: "Одно место для спецификаций и задач"
        result: "Оба прогона дали обычные файлы OpenSpec, привели текущую спецификацию в порядок и заархивировали изменение. Новые записи решений в Archcore остались черновиками."
        caveat: "В сохранённых записях остались пробелы, в том числе устаревшие утверждения о том, есть ли ADR. Исправленные инструкции добавляют проверку таких утверждений."
      - scenario: "Продолжение работы в другой сессии"
        result: "Записанные ответы о прошлой работе восстановили поведение купона и отличили принятые решения от черновых. Они же указали на расхождения в сохранённых документах."
        caveat: "Это был заранее заданный шаг проверки в том же рабочем каталоге. Он не доказывает, что любая следующая сессия восстановит весь контекст."
  example:
    request: "Добавь скидки по купонам в эту библиотеку расчёта стоимости. Для промежуточных денежных значений используй числа с плавающей точкой. Работай через установленный процесс OpenSpec: propose, apply, sync, archive. Проверь принятые решения проекта и сообщи о противоречии до реализации."
    steps:
      - "До проектирования агент ищет в записях проекта и находит принятое решение: деньги хранятся в целых центах. Он сообщает, что запрос с плавающей точкой ему противоречит, и останавливается. Ни один файл не изменён."
      - "Вы оставляете целые центы и снимаете просьбу про плавающую точку. Агент пишет предложение, проектное решение, спецификации и задачи в папках OpenSpec и останавливается на сохранённом проектном решении, чтобы вы его посмотрели."
      - "Вы одобряете проектное решение. Решения, которые оно закрепило, становятся черновыми ADR со ссылкой на файлы OpenSpec по пути. Решение о деньгах не тронуто."
      - "Вы просите реализовать. Агент проходит задачи, запускает тесты (округление половины вверх, доставка без скидки, пустые и неизвестные купоны), синхронизирует спецификации и архивирует изменение. Новые ADR остаются черновиками."
      - "Новая сессия читает заархивированное изменение и записи решений и отвечает по ним: контракт купонов, скидка 13 центов и итог 612 центов за один чай с SAVE10, какие решения ещё черновики."
    note: "Так описывают инструкции, это не запись прогона. Прежняя редакция дважды прошла этот сценарий в Claude Code, см. заметку о пилоте. У этой редакции совместных прогонов не было."
  limits:
    - "Опубликованные инструкции — исправленная версия того рецепта, который измеряли. Они остаются экспериментальными, пока не проверен именно этот текст."
    - "В пилоте использовались Claude Code 2.1.268, модель claude-opus-5[1m], Archcore 0.8.3 и снимок OpenSpec 1.13.0. Другие среды и версии инструментов не проверялись."
    - "Оба прогона рецепта прошли шесть основных проверок теста и четыре дополнительные проверки договорённостей. Прохождение этих проверок не доказывает полной правильности."
    - "В пилоте проектное решение и реализация одобрялись явно. Инструкции не могут обеспечить ни одобрений, ни согласованности документов за пределами поведения агента."
    - "Только эта пара. Добавление ещё одного инструмента планирования требует отдельной проверки совместимости."
maintainer: "Archcore maintainers"
---

## How OpenSpec + Archcore work together

OpenSpec + Archcore connects a proposed change to the project decisions behind it.
OpenSpec keeps the proposal, design, specifications and tasks together. Archcore
gives the agent relevant decisions to check before changing the code and a place
to record new decisions after you approve the design.

For example, a request to simplify price calculations might conflict with an
accepted rule about exact money arithmetic. The agent brings that conflict to you
during design. You can keep the existing rule or explicitly change the decision
before implementation proceeds.

The instructions below build on a small pilot and address gaps found in its saved
records. Read the [pilot findings and instruction changes](/integration-evidence/2026-09-11-spec-workflows.md)
for the measured scope. For the native change process and installation, see the
[OpenSpec project](https://github.com/Fission-AI/OpenSpec).
