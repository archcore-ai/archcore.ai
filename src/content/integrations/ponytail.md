---
title: "Ponytail + Archcore Integration | Setup"
heading: "Ponytail + Archcore"
description: "Connect Ponytail + Archcore so your agent cuts only the code no project decision needs and records the decisions you settle as draft ADRs."
summary: "Cut the code that no project decision needs. Decisions you settle stay in Git as draft ADRs."
category: "Minimal code"
updatedDate: 2026-10-22
recipe: "ponytail"
instructions: "ponytail/cooperation.md"
digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
source:
  repo: "https://github.com/archcore-ai/landing"
  label: "Landing repository"
  path: "src/recipes/ponytail/cooperation.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps project decisions [in Git](https://docs.archcore.ai/) so the agent checks them before it cuts code and records the ones you settle."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "Ponytail"
    url: "https://github.com/DietrichGebert/ponytail"
    role: "Pushes the agent toward the [shortest working change](https://github.com/DietrichGebert/ponytail) and flags code that can be deleted."
hosts: []
evidence:
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-10-22
    host: "Claude Code 2.1.306"
    model: "claude-sonnet-5-5"
    scenario: "Over-engineering review with a buried accepted ADR"
    outcome: "passed"
    notes: "Ponytail 5.3.2, Archcore 0.13.1. 10 of 10 runs kept the ADR-required interface and cut its unjustified twin. Both tools without the instructions: 4 of 10."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-10-22
    host: "Claude Code 2.1.306"
    model: "claude-sonnet-5-5"
    scenario: "A removal the owner settles in the request"
    outcome: "passed"
    notes: "Ponytail 5.3.2, Archcore 0.13.1. 5 of 5 runs removed the feature and recorded a draft ADR. Both tools without the instructions: 0 of 5."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-10-22
    host: "Claude Code 2.1.306"
    model: "claude-sonnet-5-5"
    scenario: "The same removal, reworded"
    outcome: "passed"
    notes: "Ponytail 5.3.2, Archcore 0.13.1. 5 of 5 runs recorded a draft ADR. Both tools without the instructions: 0 of 5."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-10-22
    host: "Claude Code 2.1.306"
    model: "claude-sonnet-5-5"
    scenario: "A free-delivery threshold, with the rejected alternative named"
    outcome: "passed"
    notes: "Ponytail 5.3.2, Archcore 0.13.1. 5 of 5 runs implemented the threshold and recorded a draft ADR. Both tools without the instructions: 0 of 5."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-10-22
    host: "Claude Code 2.1.306"
    model: "claude-sonnet-5-5"
    scenario: "A rename with no decision to record"
    outcome: "passed"
    notes: "Ponytail 5.3.2, Archcore 0.13.1. No run created a record. 3 of 5 renamed the helper; the other two ran a sed command that changed nothing."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-09-26
    host: "Claude Code 2.1.283"
    model: "claude-sonnet-5"
    scenario: "Over-engineering review with a buried accepted ADR"
    outcome: "passed"
    notes: "20 of 20 runs kept the ADR-required interface and cut its unjustified twin. Both tools without the instructions: 0 of 5."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-09-26
    host: "Claude Code 2.1.283"
    model: "claude-sonnet-5"
    scenario: "A removal the owner settles in the request"
    outcome: "passed"
    notes: "20 of 20 runs removed the feature and recorded a draft ADR. Both tools without the instructions: 0 of 5."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-09-26
    host: "Claude Code 2.1.283"
    model: "claude-sonnet-5"
    scenario: "The same removal, reworded"
    outcome: "passed"
    notes: "20 of 20 runs recorded a draft ADR for a request without the words owner, decided or drop. Both tools without the instructions: 0 of 5."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-09-26
    host: "Claude Code 2.1.283"
    model: "claude-sonnet-5"
    scenario: "A free-delivery threshold, with the rejected alternative named"
    outcome: "passed"
    notes: "20 of 20 runs implemented the threshold and recorded the choice in a draft ADR. Both tools without the instructions: 0 of 5."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-09-26
    host: "Claude Code 2.1.283"
    model: "claude-sonnet-5"
    scenario: "A rename with no decision to record"
    outcome: "passed"
    notes: "No run created a record. 18 of 20 renamed the helper; the other two ran a sed command that changed nothing."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-09-26
    host: "Claude Code 2.1.283"
    model: "claude-opus-5-5"
    scenario: "A removal the owner settles in the request"
    outcome: "passed"
    notes: "5 of 5 runs recorded a draft ADR. Both tools without the instructions: 0 of 5."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-09-26
    host: "Claude Code 2.1.283"
    model: "claude-opus-5-5"
    scenario: "A free-delivery threshold, with the rejected alternative named"
    outcome: "passed"
    notes: "5 of 5 runs recorded a draft ADR. Both tools without the instructions: 4 of 5."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-09-26
    host: "Claude Code 2.1.283"
    model: "claude-opus-5-5"
    scenario: "Over-engineering review with a buried accepted ADR"
    outcome: "passed"
    notes: "5 of 5 runs kept the ADR-required interface. Both tools without the instructions: 5 of 5."
  - digest: "e649d9aa73f4c2376ffbe827571f0dfd06747b514dab8268a3de28620a84ddcb"
    date: 2026-09-26
    host: "Claude Code 2.1.283"
    model: "claude-opus-5-5"
    scenario: "Five-turn coupon feature with a conflicting request"
    outcome: "passed"
    notes: "3 of 3 dialogues passed the behavior test with integer cents and draft ADRs only. Both tools without the instructions: 3 of 3."
workflow:
  heading: "From a simplification to a kept decision"
  steps:
    - title: "Check decisions before cutting"
      description: "Before Ponytail's rules or review remove code, the agent searches Archcore for records that name it."
    - title: "Keep what a decision requires"
      description: "If an accepted record needs the code, it stays, and the agent cites the record. Everything else gets the shortest working diff."
    - title: "Record what you settle"
      description: "If your request settles a decision, like dropping a feature, the agent saves it as a draft ADR (architecture decision record) in .archcore/. The next session finds the reason there, not in chat history."
  note: "Both tools must already be set up. Ponytail keeps its rules and review; Archcore keeps the decisions."
pilot:
  heading: "Cut code without losing project decisions."
  summary: "With the instructions, the agent kept code an accepted ADR requires and recorded settled decisions as draft ADRs. Without them, it recorded 0 of 15 such decisions."
  limitation: "Tested in Claude Code on one small Python project with three models. Larger repositories were not tested."
  findings:
    - scenario: "Ponytail's review meets an accepted decision"
      result: "The agent kept the interface the ADR requires and cut the unused factory next to it: 20 of 20 runs with claude-sonnet-5, 10 of 10 with claude-sonnet-5-5."
      caveat: "Without the instructions, claude-opus-5-5 kept the interface too, so the gain depends on the model."
    - scenario: "You settle a decision in the request"
      result: "The agent saved the decision as a draft ADR in every run with the instructions, and in none without them."
      caveat: "Decisions made in the middle of a longer conversation were not tested."
example:
  request: "The owner decided to drop gift wrapping: the supplier contract ended. Remove it from the quotation library, so quote() no longer takes gift_wrap or returns extras. Keep the tests passing."
  steps:
    - tool: "Archcore"
      text: "The agent searches Archcore for the touched symbols and finds the integer-cents ADR. The removal does not conflict with it."
    - tool: "Ponytail"
      text: "Ponytail's rules keep the diff short: the agent deletes the gift-wrap registry, the argument, the extras field and its test."
    - text: "The agent runs the tests before it reports."
    - tool: "Archcore"
      text: "Your request settles a decision, so the agent saves it as .archcore/shop/drop-gift-wrapping.adr.md with your reason."
    - text: "A later session that searches for gift wrapping finds the draft ADR. You accept or reject it in review."
  note: "This is what the instructions ask for, not a recorded run. The same request passed 30 of 30 benchmark runs across three models; the later-session step was not run."
limits:
  - "Tested with Claude Code 2.1.283 and 2.1.306, Ponytail 4.10.0 and 5.3.2, Archcore 0.10.6 and 0.13.1. Other hosts were not tested."
  - "Five single-turn tasks and one five-turn feature on one small Python project."
  - "Nothing enforces the instructions. Review the code and the draft ADRs before you accept them."
ru:
  summary: "Удаляйте код, который не нужен решениям проекта. Закреплённые вами решения остаются в Git черновыми ADR."
  category: "Минимальный код"
  toolRoles:
    Archcore: "Хранит решения проекта [в Git](https://docs.archcore.ai/), чтобы агент сверялся с ними до удаления кода и записывал решения, которые вы закрепили."
    Ponytail: "Подталкивает агента к [самому короткому рабочему изменению](https://github.com/DietrichGebert/ponytail) и отмечает код, который можно удалить."
  workflow:
    heading: "От упрощения к сохранённому решению"
    steps:
      - title: "Проверить решения до удаления"
        description: "Прежде чем правила или review Ponytail уберут код, агент ищет в Archcore записи, где этот код упомянут."
      - title: "Оставить то, что требует решение"
        description: "Если принятая запись требует этот код, он остаётся, а агент ссылается на запись. Всё остальное сокращается до самого короткого рабочего diff."
      - title: "Записать то, что вы решили"
        description: "Если в запросе есть ваше решение, например отказ от функции, агент сохраняет его черновым ADR (запись об архитектурном решении) в .archcore/. Следующая сессия найдёт причину там, а не в истории чата."
    note: "Оба инструмента должны быть уже настроены. Ponytail отвечает за правила и review, Archcore за решения."
  pilot:
    heading: "Удаляйте код, не теряя решений проекта."
    summary: "С инструкциями агент сохранил код, который требует принятый ADR, и записал закреплённые решения черновыми ADR. Без них он записал 0 таких решений из 15."
    limitation: "Проверяли в Claude Code на одном небольшом проекте на Python с тремя моделями. Большие репозитории не проверяли."
    findings:
      - scenario: "Review Ponytail встречает принятое решение"
        result: "Агент оставил интерфейс, который требует ADR, и удалил ненужную фабрику рядом: 20 из 20 прогонов с claude-sonnet-5, 10 из 10 с claude-sonnet-5-5."
        caveat: "Без инструкций claude-opus-5-5 тоже сохранил интерфейс, так что выигрыш зависит от модели."
      - scenario: "Вы закрепляете решение в запросе"
        result: "С инструкциями агент записывал решение черновым ADR в каждом прогоне, без них ни разу."
        caveat: "Решения, принятые посреди долгого разговора, не проверяли."
  example:
    request: "Владелец решил отказаться от подарочной упаковки: договор с поставщиком закончился. Уберите её из библиотеки расчёта, чтобы quote() не принимал gift_wrap и не возвращал extras. Тесты должны проходить."
    steps:
      - "Агент ищет в Archcore затронутые символы и находит ADR о целых центах. Удаление ему не противоречит."
      - "Правила Ponytail держат diff коротким: агент удаляет реестр упаковки, аргумент, поле extras и его тест."
      - "Агент запускает тесты и только потом отчитывается."
      - "В запросе есть ваше решение, поэтому агент сохраняет его в .archcore/shop/drop-gift-wrapping.adr.md вместе с вашей причиной."
      - "Следующая сессия по запросу о подарочной упаковке находит черновой ADR. Принять его или отклонить вы решаете на review."
    note: "Так работают инструкции на бумаге, это не запись сессии. Этот запрос прошёл 30 из 30 прогонов теста на трёх моделях; шаг со следующей сессией не запускали."
  limits:
    - "Проверяли на Claude Code 2.1.283 и 2.1.306, Ponytail 4.10.0 и 5.3.2, Archcore 0.10.6 и 0.13.1. Другие среды не проверяли."
    - "Пять задач из одного запроса и одна функция в пять шагов на одном небольшом проекте на Python."
    - "Выполнение инструкций зависит только от агента. Проверьте код и черновые ADR, прежде чем принять их."
maintainer: "Archcore maintainers"
---

## How Ponytail + Archcore work together

Ponytail + Archcore lets your agent cut code hard without cutting what a project
decision requires. Ponytail pushes each change toward the shortest working diff.
Archcore gives the agent the accepted decisions to check first, and a place to
save the ones you settle.

Say Ponytail's review flags a one-implementation interface as dead weight, but
an accepted ADR says partner packages implement it. The agent finds the ADR,
keeps the interface, and still cuts the unused factory next to it.

See the [benchmark note](/integration-evidence/2026-09-26-ponytail.md) and the
[recheck note](/integration-evidence/2026-10-22-ponytail.md) for what was
measured. Modes and installation are on the
[Ponytail project](https://github.com/DietrichGebert/ponytail) page.
