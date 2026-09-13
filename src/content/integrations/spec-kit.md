---
title: "Spec Kit + Archcore Integration | Setup"
heading: "Spec Kit + Archcore"
description: "Connect Spec Kit + Archcore to check feature plans against project decisions and keep specifications, tasks and decision records linked as code changes."
summary: "Plan features against existing decisions. Keep Spec Kit specs and tasks linked to Archcore records."
category: "Spec-driven development"
updatedDate: 2026-09-12
recipe: "spec-kit"
instructions: "spec-kit/cooperation.md"
digest: "3f4e27d4ecd122d2e16aad223ca85e248381598640a1da505775a737a59c9f89"
source:
  repo: "https://github.com/archcore-ai/landing"
  label: "Landing repository"
  path: "src/recipes/spec-kit/cooperation.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps project decisions and rules in Git so your agent can check feature plans against them."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "Spec Kit"
    url: "https://github.com/github/spec-kit"
    role: "Guides work from project principles through a feature specification, implementation plan, tasks and code."
hosts: []
evidence: []
workflow:
  heading: "From a feature specification to checked implementation"
  steps:
    - title: "Read the principles and decisions"
      description: "The agent checks the feature specification and Spec Kit constitution against relevant Archcore decisions. The constitution is the project's agreed set of principles. A missing or blank one is reported for your decision."
    - title: "Review the feature plan"
      description: "Spec Kit keeps the specification, plan and supporting design files. You review them before implementation, with conflicts and open assumptions made explicit."
    - title: "Link the new decisions"
      description: "After design approval, the agent checks for existing decisions before creating draft ADRs in Archcore. Each architecture decision record links to the native feature files and distinguishes approved choices from assumptions."
    - title: "Implement from the native tasks"
      description: "The agent follows Spec Kit's task list, checks code against the approved specification and contracts, and updates current status statements in the plan and research."
    - title: "Resume with the saved feature context"
      description: "A later session reads the feature files and decision records before repeating requirements questions. It reports unfinished work and separates draft decisions from accepted ones."
  note: "Spec Kit keeps the feature specification, plan and tasks. The integration asks Archcore to reference those files when recording decisions."
pilot:
  heading: "Keep feature plans connected to project decisions."
  summary: "You can review the proposed implementation alongside existing decisions, then keep the reasons for new choices linked to the feature files as work proceeds."
  limitation: "The earlier recipe completed one coupon-feature scenario twice in Claude Code. The constitution stayed an unfilled template in both runs, so compatibility with a populated constitution remains untested. This revised instruction text has not had a joint run."
  findings:
    - scenario: "A feature conflicts with an accepted decision"
      result: "In both pilot runs with the earlier recipe, the agent reported the conflict before planning or implementation and preserved the accepted decision after the owner's resolution."
      caveat: "The benchmark explicitly requested the conflict check. Both runs used project instructions and the accepted ADR because the constitution was blank."
    - scenario: "Specifications, tasks and decisions stay connected"
      result: "Both runs kept feature files in Spec Kit's native locations and created linked draft ADRs in Archcore. Code passed the benchmark's six primary and four additional contract checks."
      caveat: "Plan and research sections still contained stale claims about which records existed. Passing code tests did not make those documents consistent."
    - scenario: "A later session reviews the result"
      result: "The recorded recall answers recovered the coupon behavior, draft ADR status and document disagreements from the saved feature work."
      caveat: "Some assumptions had been described as settled decisions. The revised instructions explicitly separate assumptions from owner approval."
example:
  request: "Introduce coupon discounts in this quotation library. Use floating-point arithmetic for the monetary intermediate values. Use the installed Spec Kit specify, plan, tasks and implement workflow. Check existing project decisions and report any conflict before implementing."
  steps:
    - tool: "Archcore"
      text: "Before planning, the agent searches the project records and compares them with the request. It finds the accepted decision on integer cents, reports the conflict with the float request and stops. No file has changed."
    - tool: "Spec Kit"
      text: "You keep integer cents. The agent writes the specification and plan where Spec Kit expects them, marks open points as assumptions, and stops at the saved design for your review."
    - tool: "Archcore"
      text: "You approve the design. The decisions it settles become draft ADRs linked to the feature files by path. The money decision stays as it was."
    - tool: "Spec Kit"
      text: "You ask for the implementation. The agent works through the task list, runs the tests, and brings the status lines in the plan and research up to date with the records that now exist."
    - text: "A new session reads the feature files and the decision records and answers from them: the coupon contract, 13 cents off and 612 cents total for one tea with SAVE10, and where the documents disagree with the code."
  note: "This is what the instructions ask for, not a recorded run. An earlier revision completed this scenario twice in Claude Code with a blank constitution; see the pilot note. This revision has not had a joint run."
limits:
  - "The published instructions are a revision of the measured recipe. They remain experimental until this exact text is tested."
  - "The pilot used Claude Code 2.1.268, model identifier claude-opus-5[1m], Archcore 0.8.3 and a pinned Spec Kit runtime snapshot documented in the pilot note."
  - "Two repetitions of one scripted feature do not establish better code, lower cost or compatibility across repositories and agents."
  - "A populated constitution, extensions, multi-feature work and additional planning tools were not covered by this pilot."
  - "The instructions rely on the agent following them. Review remains necessary for tests, document consistency and decision approval."
ru:
  summary: "Планируйте функции с учётом принятых решений. Спецификации и задачи Spec Kit связаны с записями Archcore."
  category: "Разработка от спецификации"
  toolRoles:
    Archcore: "Хранит решения и правила проекта в Git, чтобы агент сверял с ними планы функций."
    Spec Kit: "Ведёт работу от принципов проекта через спецификацию функции, план реализации и задачи к коду."
  workflow:
    heading: "От спецификации функции до проверенной реализации"
    steps:
      - title: "Прочитать принципы и решения"
        description: "Агент сверяет спецификацию функции и конституцию Spec Kit с подходящими решениями Archcore. Конституция — это согласованный набор принципов проекта. Если её нет или она пустая, агент сообщает об этом вам."
      - title: "Разобрать план функции"
        description: "Spec Kit хранит спецификацию, план и вспомогательные файлы проектирования. Вы разбираете их до реализации, а противоречия и открытые допущения называются прямо."
      - title: "Связать новые решения"
        description: "После согласования агент проверяет, нет ли уже таких решений, и создаёт черновые ADR в Archcore. Каждая запись об архитектурном решении ссылается на файлы функции и отделяет одобренный выбор от допущений."
      - title: "Реализовать по задачам Spec Kit"
        description: "Агент идёт по списку задач Spec Kit, сверяет код с одобренной спецификацией и договорённостями и обновляет утверждения о текущем состоянии в плане и материалах исследования."
      - title: "Вернуться к сохранённому контексту функции"
        description: "Более поздняя сессия читает файлы функции и записи решений, прежде чем снова задавать вопросы о требованиях. Она сообщает о незавершённой работе и отделяет черновые решения от принятых."
    note: "Spec Kit хранит спецификацию функции, план и задачи. Интеграция просит Archcore ссылаться на эти файлы в записях решений."
  pilot:
    heading: "Держите планы функций связанными с решениями проекта."
    summary: "Предлагаемую реализацию можно разобрать вместе с принятыми решениями, а причины новых решений остаются связанными с файлами функции по ходу работы."
    limitation: "Предыдущий рецепт дважды прошёл один сценарий с функцией купона в Claude Code. В оба прогона конституция оставалась незаполненным шаблоном, поэтому совместимость с заполненной конституцией не проверена. По этой исправленной версии инструкций совместных прогонов не было."
    findings:
      - scenario: "Функция противоречит принятому решению"
        result: "В оба прогона пилота с предыдущим рецептом агент сообщил о противоречии до планирования и реализации и сохранил принятое решение после того, как владелец его разобрал."
        caveat: "Тест прямо просил проверить противоречие. Оба прогона опирались на инструкции проекта и принятый ADR, потому что конституция была пустой."
      - scenario: "Спецификации, задачи и решения остаются связанными"
        result: "Оба прогона держали файлы функции в обычных местах Spec Kit и создали связанные черновые ADR в Archcore. Код прошёл шесть основных и четыре дополнительные проверки договорённостей."
        caveat: "В разделах плана и материалов исследования остались устаревшие утверждения о том, какие записи есть. Пройденные тесты кода не сделали эти документы согласованными."
      - scenario: "Более поздняя сессия разбирает результат"
        result: "Записанные ответы восстановили поведение купона, состояние черновых ADR и расхождения в документах по сохранённой работе над функцией."
        caveat: "Часть допущений была описана как принятые решения. Исправленные инструкции прямо отделяют допущения от одобрения владельцем."
  example:
    request: "Добавь скидки по купонам в эту библиотеку расчёта стоимости. Для промежуточных денежных значений используй числа с плавающей точкой. Работай через установленный процесс Spec Kit: specify, plan, tasks, implement. Проверь принятые решения проекта и сообщи о противоречии до реализации."
    steps:
      - "До планирования агент ищет в записях проекта и сверяет их с запросом. Находит принятое решение о целых центах, сообщает о противоречии с плавающей точкой и останавливается. Ни один файл не изменён."
      - "Вы оставляете целые центы. Агент пишет спецификацию и план там, где их ждёт Spec Kit, помечает открытые вопросы как допущения и останавливается на сохранённом проектном решении, чтобы вы его посмотрели."
      - "Вы одобряете проектное решение. Закреплённые им решения становятся черновыми ADR со ссылкой на файлы функции по пути. Решение о деньгах не тронуто."
      - "Вы просите реализовать. Агент проходит список задач, запускает тесты и приводит строки о статусе в плане и исследовании в соответствие с записями, которые теперь есть."
      - "Новая сессия читает файлы функции и записи решений и отвечает по ним: контракт купонов, скидка 13 центов и итог 612 центов за один чай с SAVE10, где документы расходятся с кодом."
    note: "Так описывают инструкции, это не запись прогона. Прежняя редакция дважды прошла этот сценарий в Claude Code с пустой конституцией, см. заметку о пилоте. У этой редакции совместных прогонов не было."
  limits:
    - "Опубликованные инструкции — исправленная версия того рецепта, который измеряли. Они остаются экспериментальными, пока не проверен именно этот текст."
    - "В пилоте использовались Claude Code 2.1.268, модель claude-opus-5[1m], Archcore 0.8.3 и закреплённый снимок Spec Kit, описанный в заметке о пилоте."
    - "Два повтора одного заранее заданного сценария не доказывают, что код становится лучше, расходы ниже и что рецепт совместим с другими репозиториями и агентами."
    - "Заполненная конституция, расширения, работа над несколькими функциями и дополнительные инструменты планирования в пилот не входили."
    - "Инструкции полагаются на то, что агент им следует. Тесты, согласованность документов и одобрение решений всё равно нужно проверять."
maintainer: "Archcore maintainers"
---

## How Spec Kit + Archcore work together

Spec Kit + Archcore connects a feature's specification and implementation plan to
the decisions already made in your project. Spec Kit organizes the feature work.
Archcore supplies relevant decisions and keeps new decision records linked to
the feature files.

For example, a feature plan may introduce a calculation method that contradicts
an accepted project decision. The instructions ask the agent to surface the
conflict while you can still change the plan. Once you approve the design, new
architectural decisions are recorded as drafts for separate acceptance.

The instructions also address stale status statements found in the pilot's plans
and research. Read the [pilot findings and instruction changes](/integration-evidence/2026-09-11-spec-workflows.md)
for the measured scope. For native commands and installation, see the
[Spec Kit project](https://github.com/github/spec-kit).
