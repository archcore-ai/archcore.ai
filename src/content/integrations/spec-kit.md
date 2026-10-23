---
title: "Spec Kit + Archcore Integration | Setup"
heading: "Spec Kit + Archcore"
description: "Connect Spec Kit + Archcore to check feature plans against project decisions and keep specifications, tasks and decision records linked as code changes."
summary: "Plan features against existing decisions. Keep Spec Kit specs and tasks linked to Archcore records."
category: "Spec-driven development"
updatedDate: 2026-09-12
recipe: "spec-kit"
instructions: "spec-kit/cooperation.md"
digest: "e69205d09d50508c8a79e5d35bd376eb90de0e8535f6226f3a9d2615e78fac83"
source:
  repo: "https://github.com/archcore-ai/landing"
  label: "Landing repository"
  path: "src/recipes/spec-kit/cooperation.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps project decisions and rules [in Git](https://docs.archcore.ai/) so your agent can check feature plans against them."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "Spec Kit"
    url: "https://github.com/github/spec-kit"
    role: "Guides work from [project principles](https://github.com/github/spec-kit) through a feature specification, implementation plan, tasks and code."
hosts: []
evidence: []
workflow:
  heading: "From a feature specification to checked implementation"
  steps:
    - title: "Read the principles and decisions"
      description: "The agent checks the feature spec and the Spec Kit constitution (the project's agreed principles) against Archcore decisions. If the constitution is missing or blank, it tells you."
    - title: "Review the plan, then link decisions"
      description: "Spec Kit keeps the spec, plan and design files, and you review them before any code. After you approve, the agent saves new decisions as draft ADRs (architecture decision records) linked to those files."
    - title: "Build and pick up later"
      description: "The agent follows Spec Kit's task list and keeps the plan's status lines current. A later session reads the feature files and records before it asks you anything again."
  note: "Spec Kit keeps the spec, plan and tasks; Archcore records point to those files."
pilot:
  heading: "Keep feature plans connected to project decisions."
  summary: "You review a feature plan next to the decisions it must respect, and the reasons for new choices stay linked to the feature files."
  limitation: "An earlier revision ran one coupon scenario twice in Claude Code with a blank constitution; this text has not had a joint run."
  findings:
    - scenario: "A feature conflicts with an accepted decision"
      result: "In both runs, the agent reported the conflict before planning and kept the accepted decision after the owner settled it."
      caveat: "The benchmark asked for the conflict check, and a filled-in constitution was not tested."
    - scenario: "Specifications, tasks and decisions stay connected"
      result: "Both runs kept the files where Spec Kit expects them and created linked draft ADRs, and the code passed all ten checks."
      caveat: "The plan still held stale claims about which records existed, which the revised text now checks."
example:
  request: "Introduce coupon discounts in this quotation library. Use floating-point arithmetic for the monetary intermediate values. Check existing project decisions and report any conflict before implementing."
  steps:
    - tool: "Archcore"
      text: "The agent finds the accepted integer-cents decision, reports the conflict with the float request and stops before changing any file."
    - tool: "Spec Kit"
      text: "You keep integer cents, and the agent writes the spec and plan where Spec Kit expects them, marks open points as assumptions and waits for your review."
    - tool: "Archcore"
      text: "After you approve the design, its decisions become draft ADRs linked to the feature files."
    - tool: "Spec Kit"
      text: "The agent works through the task list, runs the tests and updates the status lines in the plan."
    - text: "A new session answers from the saved files: 13 cents off and 612 cents total for one tea with SAVE10, plus where the documents disagree with the code."
  note: "This is what the instructions ask for, not a recorded run. An earlier revision completed this scenario twice; this one has not run yet."
limits:
  - "Experimental until this exact text is tested. The pilot used Claude Code 2.1.268, claude-opus-5[1m], Archcore 0.8.3 and a pinned Spec Kit snapshot."
  - "A filled-in constitution, extensions and multi-feature work were not covered."
  - "Nothing enforces the instructions. Review the tests, the documents and the draft ADRs yourself."
ru:
  summary: "Планируйте функции с учётом принятых решений. Спецификации и задачи Spec Kit связаны с записями Archcore."
  category: "Разработка от спецификации"
  toolRoles:
    Archcore: "Хранит решения и правила проекта [в Git](https://docs.archcore.ai/), чтобы агент сверял с ними планы функций."
    Spec Kit: "Ведёт работу от [принципов проекта](https://github.com/github/spec-kit) через спецификацию функции, план реализации и задачи к коду."
  workflow:
    heading: "От спецификации функции до проверенной реализации"
    steps:
      - title: "Прочитать принципы и решения"
        description: "Агент сверяет спецификацию функции и конституцию Spec Kit (согласованные принципы проекта) с решениями Archcore. Если конституции нет или она пустая, он скажет вам об этом."
      - title: "Посмотреть план и связать решения"
        description: "Spec Kit хранит спецификацию, план и файлы проектирования, и вы смотрите их до написания кода. После вашего согласия агент сохраняет новые решения черновыми ADR (записями об архитектурных решениях) со ссылками на эти файлы."
      - title: "Сделать и вернуться позже"
        description: "Агент идёт по списку задач Spec Kit и обновляет строки о статусе в плане. Следующая сессия сначала читает файлы функции и записи, а уже потом задаёт вопросы."
    note: "Spec Kit хранит спецификацию, план и задачи, записи Archcore ссылаются на эти файлы."
  pilot:
    heading: "Держите планы функций связанными с решениями проекта."
    summary: "Вы смотрите план функции рядом с решениями, которые он обязан соблюдать, а причины новых решений остаются привязанными к файлам функции."
    limitation: "Прежняя редакция дважды прошла один сценарий с купонами в Claude Code с пустой конституцией; этот текст вместе ещё не запускали."
    findings:
      - scenario: "Функция противоречит принятому решению"
        result: "В обоих прогонах агент сообщил о противоречии до планирования и сохранил принятое решение, когда владелец сделал выбор."
        caveat: "Тест сам просил проверить противоречия, а заполненную конституцию не проверяли."
      - scenario: "Спецификации, задачи и решения остаются связанными"
        result: "Оба прогона держали файлы там, где их ждёт Spec Kit, создали связанные черновые ADR, а код прошёл все десять проверок."
        caveat: "В плане остались устаревшие утверждения о том, какие записи есть; исправленный текст теперь это проверяет."
  example:
    request: "Добавьте скидки по купонам в эту библиотеку расчёта стоимости. Для промежуточных денежных значений используйте числа с плавающей точкой. Проверьте принятые решения проекта и сообщите о противоречии до реализации."
    steps:
      - "Агент находит принятое решение о целых центах, сообщает о противоречии с плавающей точкой и останавливается, ничего не меняя."
      - "Вы оставляете целые центы, и агент пишет спецификацию и план там, где их ждёт Spec Kit, помечает открытые вопросы как допущения и ждёт вашего просмотра."
      - "Когда вы одобряете проектное решение, его решения становятся черновыми ADR со ссылками на файлы функции."
      - "Агент проходит список задач, запускает тесты и обновляет строки о статусе в плане."
      - "Новая сессия отвечает по сохранённым файлам: скидка 13 центов и итог 612 центов за один чай с SAVE10, а ещё где документы расходятся с кодом."
    note: "Так работают инструкции на бумаге, это не запись прогона. Прежняя редакция дважды прошла этот сценарий, эту ещё не запускали."
  limits:
    - "Экспериментально, пока именно этот текст не проверен. В пилоте были Claude Code 2.1.268, claude-opus-5[1m], Archcore 0.8.3 и закреплённый снимок Spec Kit."
    - "Заполненная конституция, расширения и работа над несколькими функциями в пилот не входили."
    - "Выполнение инструкций зависит только от агента. Тесты, документы и черновые ADR проверяйте сами."
maintainer: "Archcore maintainers"
---

## How Spec Kit + Archcore work together

Spec Kit + Archcore connects a feature's spec and plan to the decisions your
project already made. Spec Kit organizes the feature work. Archcore supplies the
relevant decisions and keeps new decision records linked to the feature files.

Say a feature plan brings in a calculation method that contradicts an accepted
decision. The agent shows you the conflict while the plan can still change, and
records new decisions as drafts once you approve the design.

The [pilot findings and instruction changes](/integration-evidence/2026-09-11-spec-workflows.md)
describe what was measured. Commands and installation are on the
[Spec Kit project](https://github.com/github/spec-kit) page.
