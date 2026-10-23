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
    role: "Keeps project decisions, specifications and plans [in Git](https://docs.archcore.ai/) so the agent can use them throughout the change."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "Matt Pocock Skills"
    url: "https://github.com/mattpocock/skills"
    role: "Its [skills](https://github.com/mattpocock/skills) help the agent question the plan, model the domain, design the code, work test-first and review the change."
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
      description: "Before design work, the agent searches Archcore for accepted decisions, rules and plans. A conflict stops the work until you decide."
    - title: "Model and build the change"
      description: "Matt Pocock Skills drive grilling, domain modelling, test-first code and review. Questions an accepted record already answers are skipped, and the agent names the record."
    - title: "Keep decisions in one place"
      description: "New hard-to-reverse decisions become draft ADRs in .archcore/, not in a second ADR folder. A later session reads them before asking you again."
  note: "Matt Pocock Skills lead the engineering work; Archcore keeps the decisions and plan behind it."
pilot:
  heading: "One place for decisions, whichever skill writes them."
  summary: "With these instructions, the agent named the existing ADR instead of writing a duplicate in 5 of 5 runs. Without them, it did so in 0 of 5."
  limitation: "23 runs with claude-sonnet-5 in Claude Code on one small Python project; only the duplicate-decision difference is significant."
  findings:
    - scenario: "A decision that an accepted ADR already records"
      result: "The agent named the existing ADR in all five runs; without the instructions, every run wrote a second ADR and marked it accepted."
      caveat: "The ADR already stated the decision in one sentence, which made it easy to find."
    - scenario: "A grilling round on a plan"
      result: "Every round treated money as settled by the ADR and asked only about rounding and delivery."
      caveat: "At five runs, the difference from the no-instructions arm is not significant."
example:
  request: "Introduce coupon discounts as a new subsystem in this quotation library. Use floating-point arithmetic for monetary intermediate values. Check existing project decisions and report any conflict before implementing."
  steps:
    - tool: "Archcore"
      text: "The agent finds the accepted integer-cents decision, reports that floats conflict with it, and waits for your choice."
    - tool: "Matt Pocock Skills"
      text: "You keep integer cents, and the agent models the subtotal, delivery and coupon boundaries without asking again about settled choices."
    - tool: "Archcore"
      text: "The design is saved as .archcore/shop/coupon-discounts.spec.md, and after your approval its decisions become draft ADRs."
    - tool: "Matt Pocock Skills"
      text: "The agent builds the coupon test-first, runs the tests and reviews the change before it reports."
    - text: "A new session reads the spec and the ADRs and explains the coupon rules without asking you to repeat them."
  note: "This is what the instructions ask for, not a recorded run. These instructions completed the coupon feature in 3 of 3 runs with claude-sonnet-5."
limits:
  - "Tested with Claude Code 2.1.308, claude-sonnet-5, Archcore 0.13.1 and Matt Pocock Skills at commit 5beb35b. Other hosts and models were not tested."
  - "When the request says a decision is settled, the agent may create the ADR as accepted. Check the status of new records."
  - "The recipe does not install Matt Pocock Skills, and nothing enforces the instructions. Review tests, decisions and code before you accept a change."
ru:
  heading: "Matt Pocock Skills + Archcore"
  summary: "Моделируйте изменение через Matt Pocock Skills. Решения и план храните в Archcore."
  category: "Инженерные навыки"
  toolRoles:
    Archcore: "Хранит решения, спецификации и планы проекта [в Git](https://docs.archcore.ai/), чтобы агент использовал их во всём изменении."
    Matt Pocock Skills: "Его [навыки](https://github.com/mattpocock/skills) помогают агенту проверить план вопросами, моделировать домен, проектировать код, работать через TDD и проверять изменение."
  workflow:
    heading: "От запроса до проверенного изменения"
    steps:
      - title: "Прочитать решения проекта"
        description: "До проектирования агент ищет в Archcore принятые решения, правила и планы. При противоречии работа стоит, пока вы не решите."
      - title: "Смоделировать и собрать изменение"
        description: "Matt Pocock Skills ведут допрос плана, моделирование домена, код через тесты и review. Вопросы, на которые уже отвечает принятая запись, агент пропускает и называет эту запись."
      - title: "Держать решения в одном месте"
        description: "Новые решения, которые трудно отменить, становятся черновыми ADR в .archcore/, а не во второй папке с ADR. Следующая сессия читает их, прежде чем снова вас спрашивать."
    note: "Инженерную работу ведут Matt Pocock Skills; Archcore хранит решения и план, на которых она держится."
  pilot:
    heading: "Одно место для решений, какой бы навык их ни записывал."
    summary: "С этими инструкциями агент назвал существующий ADR вместо дубля в 5 из 5 прогонов. Без них в 0 из 5."
    limitation: "23 прогона с claude-sonnet-5 в Claude Code на одном небольшом проекте на Python; значима только разница на задаче с повторным решением."
    findings:
      - scenario: "Решение, которое уже записано в принятом ADR"
        result: "Во всех пяти прогонах агент назвал существующий ADR, а без инструкций каждый прогон писал второй и помечал его принятым."
        caveat: "ADR формулировал решение одним предложением, поэтому найти его было легко."
      - scenario: "Раунд допроса по плану"
        result: "Каждый раунд считал вопрос о деньгах закрытым по ADR и спрашивал только про округление и доставку."
        caveat: "На пяти прогонах разница с вариантом без инструкций не значима."
  example:
    request: "Добавьте скидки по купонам как новую подсистему библиотеки расчёта стоимости. Для промежуточных денежных значений используйте числа с плавающей точкой. Проверьте решения проекта и сообщите о противоречии до реализации."
    steps:
      - "Агент находит принятое решение о целых центах, сообщает, что числа с плавающей точкой ему противоречат, и ждёт вашего выбора."
      - "Вы оставляете целые центы, и агент выделяет границы subtotal, delivery и coupon, не переспрашивая о закреплённом."
      - "Проектное решение ложится в .archcore/shop/coupon-discounts.spec.md, а после вашего одобрения его решения становятся черновыми ADR."
      - "Агент пишет купон через тесты, прогоняет их и проверяет изменение, а потом отчитывается."
      - "Новая сессия читает спецификацию и ADR и объясняет правила купона, не прося вас повторять их."
    note: "Так работают инструкции на бумаге, это не запись прогона. Функцию с купоном они довели до конца в 3 из 3 прогонов с claude-sonnet-5."
  limits:
    - "Проверяли на Claude Code 2.1.308, claude-sonnet-5, Archcore 0.13.1 и Matt Pocock Skills на коммите 5beb35b. Другие среды и модели не проверяли."
    - "Если в запросе сказано, что решение принято, агент может создать ADR со статусом accepted. Проверяйте статус новых записей."
    - "Рецепт не устанавливает Matt Pocock Skills, а выполнение инструкций зависит только от агента. Проверьте тесты, решения и код, прежде чем принять изменение."
maintainer: "Archcore maintainers"
---

## How Matt Pocock Skills + Archcore work together

Matt Pocock Skills + Archcore keep every project decision in one place while the
agent plans, designs, tests and reviews. Matt Pocock Skills supply the
engineering discipline: grilling, domain modelling, TDD and code review.
Archcore keeps the accepted decisions that constrain that work, and stores the
design and new ADRs in Git.

Say you ask the agent to record that coupons never discount delivery.
`domain-modeling` would write to `docs/adr/` by default. With the instructions,
the agent searches Archcore first and names the existing ADR if there is one.
If the decision is new, it creates a draft ADR in .archcore/ for you to accept.

The [benchmark note](/integration-evidence/2026-10-23-matt-pocock.md) says what
was measured. For the skills and their installation, see the
[Matt Pocock Skills repository](https://github.com/mattpocock/skills).
