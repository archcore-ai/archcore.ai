---
title: "Matt Pocock Skills + Archcore Integration | Setup"
heading: "Matt Pocock Skills + Archcore"
description: "Use Matt Pocock Skills with Archcore: grill a plan against accepted decisions, keep ADRs in one place, implement with TDD and review the result."
summary: "Model the change with Matt Pocock Skills. Keep decisions and plans in Archcore."
category: "Engineering skills"
updatedDate: 2026-10-23
recipe: "matt-pocock"
instructions: "matt-pocock/cooperation.md"
digest: "984efdd46e950def49e6d72e5a225e653d3adaf88e303f29aa6b816ac6f9dd0d"
source:
  repo: "https://github.com/archcore-ai/landing"
  label: "Landing repository"
  path: "src/recipes/matt-pocock/cooperation.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps project decisions, specifications and plans in Git so the agent can use them throughout the change."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "Matt Pocock Skills"
    url: "https://github.com/mattpocock/skills"
    role: "Helps the agent question the plan, model the domain, design the code, work test-first and review the change."
hosts: []
evidence:
  - digest: "984efdd46e950def49e6d72e5a225e653d3adaf88e303f29aa6b816ac6f9dd0d"
    date: 2026-10-23
    host: "Claude Code 2.1.308"
    model: "claude-sonnet-5"
    scenario: "Five-turn coupon feature with a float request that conflicts with an accepted ADR"
    outcome: "passed"
    notes: "Matt Pocock Skills 5beb35b, Archcore 0.13.1. 3 of 3 runs passed the independent oracle, saved the design in .archcore/ and kept new ADRs draft. Both tools without the instructions: 3 of 3."
  - digest: "984efdd46e950def49e6d72e5a225e653d3adaf88e303f29aa6b816ac6f9dd0d"
    date: 2026-10-23
    host: "Claude Code 2.1.308"
    model: "claude-sonnet-5"
    scenario: "A decision that an accepted ADR already records"
    outcome: "passed"
    notes: "5 of 5 runs named the existing ADR and wrote no second one. Both tools without the instructions: 0 of 5."
  - digest: "984efdd46e950def49e6d72e5a225e653d3adaf88e303f29aa6b816ac6f9dd0d"
    date: 2026-10-23
    host: "Claude Code 2.1.308"
    model: "claude-sonnet-5"
    scenario: "A grilling round on a plan that an accepted ADR partly answers"
    outcome: "passed"
    notes: "5 of 5 rounds treated money as settled and asked about rounding and delivery. Both tools without the instructions: 2 of 5. Graded by claude-haiku-4-5-20251001."
  - digest: "984efdd46e950def49e6d72e5a225e653d3adaf88e303f29aa6b816ac6f9dd0d"
    date: 2026-10-23
    host: "Claude Code 2.1.308"
    model: "claude-sonnet-5"
    scenario: "A new decision in a project whose AGENTS.md names no ADR location"
    outcome: "failed"
    notes: "No run wrote to docs/adr/, but 3 of 5 runs created the ADR as accepted instead of draft. Both tools without the instructions: 0 of 5."
  - digest: "984efdd46e950def49e6d72e5a225e653d3adaf88e303f29aa6b816ac6f9dd0d"
    date: 2026-10-23
    host: "Claude Code 2.1.308"
    model: "claude-sonnet-5"
    scenario: "A fully specified one-line change"
    outcome: "passed"
    notes: "5 of 5 runs made the change with no record and no seam discussion. Both tools without the instructions: 5 of 5."
workflow:
  heading: "From a request to a reviewed change"
  steps:
    - title: "Read the project decisions"
      description: "Before design work starts, the agent searches Archcore for accepted decisions, rules, specifications and plans that apply to the request. A conflict stops the affected work until you decide."
    - title: "Model the change"
      description: "Matt Pocock Skills help the agent understand the domain and code boundary. When you ask to be grilled on a plan, the agent skips questions that an accepted record already answers and names that record instead."
    - title: "Save the design and plan"
      description: "Decisions that are hard to reverse become draft ADRs in Archcore, not a second ADR folder. When a plan is needed, Archcore keeps the specification, plan and links to the decisions behind it."
    - title: "Implement and review"
      description: "The agent uses test-driven development for the code change, runs the relevant tests, then reviews the result before it reports completion."
    - title: "Continue with the saved context"
      description: "A later session can read the design, plan and draft decisions before it repeats questions that the project already answers."
  note: "Matt Pocock Skills lead engineering work. Archcore keeps the decisions and plan that explain why the change is safe."
pilot:
  heading: "One place for decisions, whichever skill writes them."
  summary: "With these instructions, the agent named the accepted ADR instead of writing a second one in 5 of 5 runs, and without them in 0 of 5. Every grilling round treated recorded decisions as settled, and a five-turn coupon feature passed its oracle in 3 of 3 runs."
  limitation: "These instructions ran 23 times with claude-sonnet-5 in Claude Code: three five-turn coupon features and five runs of each of four single-turn tasks, on one small Python project. Only the duplicate-decision difference is significant."
  findings:
    - scenario: "A decision that an accepted ADR already records"
      result: "The agent named the existing ADR and created no second one in all five runs. Without the instructions, every run wrote a second ADR and marked it accepted."
      caveat: "The prompt asked the agent to record the decision, and the ADR already stated it in one sentence."
    - scenario: "A grilling round on a plan"
      result: "Every round treated money as settled by the ADR and asked only about rounding and delivery. Without the instructions, three of five rounds skipped an open question or asked about money again."
      caveat: "A model graded the answers, and the judge was not calibrated against a labelled set. The difference is not significant at five runs."
    - scenario: "A new decision with no ADR location in AGENTS.md"
      result: "No run in either arm wrote to docs/adr/. With the instructions, two of five runs kept the new ADR as a draft; without them, none did."
      caveat: "The agent read \"The owner has decided\" as acceptance. An earlier revision with the same status rules kept five of five drafts."
example:
  request: "Introduce coupon discounts as a new subsystem in this quotation library. Use floating-point arithmetic for monetary intermediate values. Start with design. Check existing project decisions and report any conflict before implementing. Use the installed Matt Pocock skills when available."
  steps:
    - tool: "Archcore"
      text: "The agent searches Archcore before it designs. It finds the accepted integer-cents decision, reports that floats conflict with it, and waits for your choice."
    - tool: "Matt Pocock Skills"
      text: "You keep integer cents and list the coupon rules. The agent models the subtotal, delivery and coupon boundaries without asking again about settled choices."
    - tool: "Archcore"
      text: "The design is saved as .archcore/shop/coupon-discounts.spec.md. After you approve it, the decisions it settles become draft ADRs."
    - tool: "Matt Pocock Skills"
      text: "The agent implements the coupon test-first, runs the existing tests and the new ones, then reviews the change before it reports completion."
    - text: "A new session reads the spec and the ADRs. It explains the coupon contract and the money decision without asking you to repeat them."
  note: "This is what the instructions ask for, not a recorded run. These exact instructions completed the coupon feature in 3 of 3 runs with claude-sonnet-5 on one small Python project."
limits:
  - "The runs used one small Python project, Claude Code 2.1.308 and claude-sonnet-5. Other hosts, models and repository sizes were not tested."
  - "The instructions were written against Matt Pocock Skills at commit 5beb35b (2026-10-19) and run with Archcore 0.13.1."
  - "When the request says a decision is settled, the agent may create the ADR as accepted. Check the status of new records."
  - "The issue-tracker flow (/to-spec, /to-tickets, /implement) and the code-review rules were not run."
  - "Matt Pocock Skills are not installed by this recipe. They must be available to the agent already."
  - "The instructions rely on the agent following them. You still review tests, decisions and code before accepting a change."
ru:
  heading: "Matt Pocock Skills + Archcore"
  summary: "Моделируйте изменение через Matt Pocock Skills. Решения и план храните в Archcore."
  category: "Инженерные навыки"
  toolRoles:
    Archcore: "Хранит решения, спецификации и планы проекта в Git, чтобы агент использовал их во всём изменении."
    Matt Pocock Skills: "Помогает агенту проверить план вопросами, моделировать домен, проектировать код, работать через TDD и проверять изменение."
  workflow:
    heading: "От запроса до проверенного изменения"
    steps:
      - title: "Прочитать решения проекта"
        description: "До начала проектирования агент ищет в Archcore принятые решения, правила, спецификации и планы по запросу. Противоречие останавливает затронутую работу, пока вы не решите, как поступить."
      - title: "Смоделировать изменение"
        description: "Matt Pocock Skills помогают агенту разобраться в домене и границе изменения в коде. Если вы просите устроить плану допрос, агент не задаёт вопросы, на которые уже отвечает принятая запись, и называет эту запись."
      - title: "Сохранить проект решения и план"
        description: "Решения, которые трудно отменить, становятся черновыми ADR в Archcore, а не во второй папке с ADR. Когда нужен план, Archcore хранит спецификацию, план и связи с решениями, на которых они основаны."
      - title: "Реализовать и проверить"
        description: "Агент ведёт изменение через тестовую разработку, запускает подходящие тесты и проверяет результат перед тем, как сообщить о завершении."
      - title: "Продолжить с сохранённым контекстом"
        description: "Следующая сессия читает проект решения, план и черновые решения, прежде чем повторять вопросы, на которые уже отвечает проект."
    note: "Matt Pocock Skills ведёт инженерную работу. Archcore хранит решения и план, которые объясняют безопасность изменения."
  pilot:
    heading: "Одно место для решений, какой бы навык их ни записывал."
    summary: "С этими инструкциями агент назвал принятый ADR, а не написал второй, в 5 из 5 прогонов, без них в 0 из 5. Каждый раунд допроса считал записанные решения закреплёнными, а функция с купоном в пять шагов прошла проверку в 3 из 3 прогонов."
    limitation: "Эти инструкции прошли 23 прогона с claude-sonnet-5 в Claude Code: три работы над функцией с купоном в пять шагов и по пять прогонов на каждой из четырёх задач из одного запроса, на одном небольшом проекте на Python. Значима только разница на задаче с повторным решением."
    findings:
      - scenario: "Решение, которое уже записано в принятом ADR"
        result: "Во всех пяти прогонах агент назвал существующий ADR и не создал второй. Без инструкций каждый прогон написал второй ADR и пометил его принятым."
        caveat: "Запрос просил записать решение, а ADR уже содержал его одним предложением."
      - scenario: "Раунд допроса по плану"
        result: "Каждый раунд считал вопрос о деньгах закрытым по ADR и спрашивал только про округление и доставку. Без инструкций три раунда из пяти пропустили открытый вопрос или снова спросили про деньги."
        caveat: "Ответы оценивала модель, и её не сверяли с размеченной выборкой. На пяти прогонах разница не значима."
      - scenario: "Новое решение, когда AGENTS.md не задаёт место для ADR"
        result: "Ни один прогон в обоих вариантах не писал в docs/adr/. С инструкциями два прогона из пяти оставили новый ADR черновиком, без них ни один."
        caveat: "Агент понял «The owner has decided» как принятие. Прежняя версия с теми же правилами статуса оставила черновиками все пять."
  example:
    request: "Добавьте скидки по купонам как новую подсистему библиотеки расчёта стоимости. Для промежуточных денежных значений используйте числа с плавающей точкой. Начните с проектного решения. Проверьте решения проекта и сообщите о противоречии до реализации. Используйте установленные навыки Matt Pocock, если они доступны."
    steps:
      - "Агент ищет в Archcore до проектирования. Он находит принятое решение о целых центах, сообщает, что числа с плавающей точкой ему противоречат, и ждёт вашего выбора."
      - "Вы оставляете целые центы и перечисляете правила купона. Агент выделяет границы subtotal, delivery и coupon и не переспрашивает о закреплённом."
      - "Проектное решение сохраняется как .archcore/shop/coupon-discounts.spec.md. После вашего одобрения решения из него становятся черновыми ADR."
      - "Агент реализует купон через тесты, запускает старые и новые тесты и проверяет изменение перед тем, как сообщить о завершении."
      - "Новая сессия читает спецификацию и ADR. Она объясняет правила купона и решение о деньгах и не просит вас повторять их."
    note: "Пример показывает, чего требуют инструкции, а не записанный прогон. Эти инструкции довели функцию с купоном до конца в 3 из 3 прогонов с claude-sonnet-5 на одном небольшом проекте на Python."
  limits:
    - "Прогоны шли на одном небольшом проекте на Python, в Claude Code 2.1.308 с claude-sonnet-5. Другие среды, модели и размеры репозиториев не проверялись."
    - "Инструкции написаны под Matt Pocock Skills на коммите 5beb35b (2026-10-19) и проверены с Archcore 0.13.1."
    - "Если в запросе сказано, что решение принято, агент может создать ADR со статусом accepted. Проверяйте статус новых записей."
    - "Сценарий с issue tracker (/to-spec, /to-tickets, /implement) и правила для code-review не проверялись."
    - "Этот recipe не устанавливает Matt Pocock Skills. Они должны быть уже доступны агенту."
    - "Инструкции полагаются на то, что агент им следует. Перед принятием изменения всё равно проверьте тесты, решения и код."
maintainer: "Archcore maintainers"
---

## How Matt Pocock Skills + Archcore work together

Matt Pocock Skills + Archcore keep every project decision in one place while the
agent questions a plan, designs the code, works test-first and reviews the
result. Matt Pocock Skills supply the engineering discipline: grilling rounds,
domain modelling, TDD and code review. Archcore keeps the accepted decisions
that constrain that work, and stores the design and new ADRs in Git.

For example, `domain-modeling` writes ADRs to `docs/adr/` by default, and a
project with Archcore already keeps them in `.archcore/`. When you ask the agent
to record that coupons never discount delivery, it first searches Archcore. If
an accepted ADR already says so, the agent names that record instead of writing
a second one. If the decision is new, it creates a draft ADR in `.archcore/`
for you to accept.

The instructions cover grilling, ADR location and status, small changes and the
coupon workflow. The [benchmark note](/integration-evidence/2026-10-23-matt-pocock.md)
says what was measured and what was not. For the skills themselves and their
installation, see the [Matt Pocock Skills repository](https://github.com/mattpocock/skills).
