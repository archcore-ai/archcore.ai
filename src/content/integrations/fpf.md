---
title: "FPF + Archcore Integration | Setup"
heading: "FPF + Archcore"
description: "Connect FPF + Archcore so each document your agent writes, from ADRs to plans and specs, says how to verify it and when to revisit it."
summary: "Every Archcore document gets the checks an FPF pattern asks for: how to verify it and when to revisit it."
category: "Engineering methods"
updatedDate: 2026-10-22
recipe: "fpf"
instructions: "fpf/cooperation.md"
digest: "0d6f75d93f7845fe6199153c8b60aba3b08dc64a10ed7a514d5fadc7af143900"
source:
  repo: "https://github.com/archcore-ai/landing"
  label: "Landing repository"
  path: "src/recipes/fpf/cooperation.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps the project's decisions, plans and specs [in Git](https://docs.archcore.ai/), so the agent checks them first and saves every new document as a draft."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "FPF"
    url: "https://fpf.tools/connect"
    role: "Serves the [First Principles Framework](https://github.com/ailev/FPF) library by Anatoly Levenchuk over a [read-only MCP server](https://fpf.tools/connect): a pattern for each kind of document and for making a choice."
hosts: []
evidence:
  - digest: "0d6f75d93f7845fe6199153c8b60aba3b08dc64a10ed7a514d5fadc7af143900"
    date: 2026-10-22
    host: "Claude Code 2.1.306"
    model: "claude-sonnet-5"
    scenario: "17 requests across Archcore document types and one open choice, 2 runs per setup each"
    outcome: "passed"
    notes: "24 of 33 documents covered every graded item. Archcore alone: 6 of 34. The same instructions without the FPF server: 9 of 34."
  - digest: "0d6f75d93f7845fe6199153c8b60aba3b08dc64a10ed7a514d5fadc7af143900"
    date: 2026-10-22
    host: "Claude Code 2.1.306"
    model: "claude-sonnet-5"
    scenario: "A choice that depends on a legal answer due in six weeks"
    outcome: "passed"
    notes: "2 of 2 runs deferred the VAT rule and wrote a complete draft ADR. Archcore alone: 0 of 2 complete records. No setup hard-coded a VAT rate."
  - digest: "0d6f75d93f7845fe6199153c8b60aba3b08dc64a10ed7a514d5fadc7af143900"
    date: 2026-10-22
    host: "Claude Code 2.1.306"
    model: "claude-sonnet-5"
    scenario: "An implementation plan and a market analysis"
    outcome: "failed"
    notes: "No setup passed either request, with FPF or without it. Every plan missed what to do when a step fails, and every market analysis missed current alternatives."
workflow:
  heading: "From a request to a document you can check later"
  steps:
    - title: "Check what is already decided"
      description: "Before it chooses or writes, the agent reads the Archcore records on the same subject. An accepted record limits the options."
    - title: "Read the FPF pattern"
      description: "The agent reads the FPF pattern for the choice or the document type, such as C.32.ADR for an ADR. If an unknown input could reverse a choice, it defers or asks instead of guessing."
    - title: "Save a draft with the missing parts"
      description: "The agent adds what the template misses, such as How to verify or When to revisit, and saves a draft in .archcore/ with the pattern IDs. You accept it in review."
  note: "Both Archcore and the FPF MCP server must already be set up; the recipe also works inside /archcore:plan and /archcore:document."
pilot:
  heading: "Documents a later reader can check."
  summary: "With these instructions, 24 of 33 documents covered every graded item. With Archcore alone, 6 of 34 did."
  limitation: "Two runs per setup on 17 requests with claude-sonnet-5 on one small Python project: enough to see a pattern, not to judge a single document type."
  findings:
    - scenario: "The effect comes from the FPF library"
      result: "The same instructions without the FPF server passed 9 of 34 documents, close to Archcore alone."
      caveat: "Plans and market analyses failed in every setup."
    - scenario: "A choice made before an answer arrives"
      result: "Asked about VAT before Legal answered, no run hard-coded a rate, and with FPF both records named the open input and when to revisit it."
      caveat: "Every setup waited in code, so FPF changed the record more than the choice."
example:
  request: "German and French partners start ordering next quarter. Legal answers how VAT applies to partner quotes in six weeks. Decide what to do in the quotation library now, keep the tests passing, and record the decision."
  steps:
    - tool: "Archcore"
      text: "The agent searches Archcore and finds the integer-cents rule and no record about VAT."
    - tool: "FPF"
      text: "Pattern C.38 tells the agent that an unknown input which could reverse the choice is a reason to defer."
    - text: "The agent defers, keeps quote() as it is and runs the tests."
    - tool: "FPF"
      text: "Pattern C.32.ADR lists what a later reader must be able to recover from the record."
    - tool: "Archcore"
      text: "The agent writes a draft ADR with How to verify, When to revisit and Open questions, linked to the integer-cents rule."
    - text: "When Legal answers, a later session finds the draft ADR and picks the decision up from When to revisit."
  note: "This is what the instructions ask for, not a recorded run. This request passed 2 of 2 benchmark runs with claude-sonnet-5; the later-session step was not run."
limits:
  - "Measured with Claude Code 2.1.306, claude-sonnet-5, Archcore CLI v0.13.1 and one FPF library snapshot. The library cannot be pinned, so a later snapshot can change a pattern."
  - "FPF is a remote service that receives each call's arguments; in these runs, only pattern IDs."
  - "Nothing enforces the instructions. Review each draft before you accept it."
ru:
  summary: "Каждый документ Archcore получает проверки из паттерна FPF: как проверить его и когда пересмотреть."
  category: "Инженерные методы"
  toolRoles:
    Archcore: "Хранит решения, планы и спецификации проекта [в Git](https://docs.archcore.ai/), чтобы агент сначала сверялся с ними и сохранял каждый новый документ черновиком."
    FPF: "Отдаёт библиотеку [First Principles Framework](https://github.com/ailev/FPF) Анатолия Левенчука через [MCP-сервер только для чтения](https://fpf.tools/connect): паттерн для каждого вида документа и для выбора."
  workflow:
    heading: "От запроса к документу, который можно проверить позже"
    steps:
      - title: "Проверить, что уже решено"
        description: "Прежде чем выбирать или писать, агент читает записи Archcore на ту же тему. Принятая запись сужает выбор."
      - title: "Прочитать паттерн FPF"
        description: "Агент читает паттерн FPF для выбора или для типа документа, например C.32.ADR для ADR. Если неизвестные данные могут перевернуть выбор, он откладывает решение или спрашивает, а не угадывает."
      - title: "Сохранить черновик с недостающим"
        description: "Агент дописывает то, чего нет в шаблоне, например How to verify или When to revisit, и сохраняет черновик в .archcore/ с номерами паттернов. Принимаете его вы на review."
    note: "Archcore и MCP-сервер FPF должны быть уже настроены; рецепт работает и внутри /archcore:plan и /archcore:document."
  pilot:
    heading: "Документы, которые потом можно проверить."
    summary: "С этими инструкциями 24 документа из 33 закрыли все оцениваемые пункты. С одним Archcore таких было 6 из 34."
    limitation: "По два прогона на вариант для 17 запросов с claude-sonnet-5 на одном небольшом проекте на Python. Картину видно, но о каждом типе документа отдельно судить рано."
    findings:
      - scenario: "Эффект даёт библиотека FPF"
        result: "Те же инструкции без сервера FPF дали 9 документов из 34, почти как один Archcore."
        caveat: "Планы и анализ рынка не прошли ни в одном варианте."
      - scenario: "Выбор до того, как пришёл ответ"
        result: "Ни один прогон не зашил ставку НДС до ответа юристов, а с FPF обе записи назвали открытый вопрос и момент, когда к нему вернуться."
        caveat: "В коде подождали все варианты, так что FPF изменил скорее запись, чем выбор."
  example:
    request: "Партнёры из Германии и Франции начнут заказывать в следующем квартале. Юристы ответят через шесть недель, как НДС применяется к расчётам для партнёров. Решите, что сделать в библиотеке расчёта сейчас, сохраните прохождение тестов и запишите решение."
    steps:
      - "Агент ищет в Archcore и находит правило о целых центах, а записей об НДС нет."
      - "Паттерн C.38 подсказывает: если неизвестное может перевернуть выбор, решение лучше отложить."
      - "Агент откладывает решение, оставляет quote() как есть и запускает тесты."
      - "Паттерн C.32.ADR перечисляет, что будущий читатель должен найти в записи."
      - "Агент пишет черновой ADR с разделами How to verify, When to revisit и Open questions и связывает его с правилом о целых центах."
      - "Когда юристы ответят, следующая сессия найдёт черновой ADR и продолжит с раздела When to revisit."
    note: "Так работают инструкции на бумаге, это не запись прогона. Этот запрос прошёл 2 из 2 прогонов теста с claude-sonnet-5; шаг со следующей сессией не запускали."
  limits:
    - "Замер: Claude Code 2.1.306, claude-sonnet-5, Archcore CLI v0.13.1 и один снимок библиотеки FPF. Версию библиотеки закрепить нельзя, и в новом снимке паттерн может измениться."
    - "FPF работает как удалённый сервис и получает аргументы каждого вызова; в этих прогонах только номера паттернов."
    - "Выполнение инструкций зависит только от агента. Просмотрите каждый черновик, прежде чем принять его."
maintainer: "Archcore maintainers"
---

## How FPF + Archcore work together

FPF + Archcore lets your agent write project documents that a later reader can
check. Archcore keeps the project's decisions, plans and specs in Git and shows
the agent what is already settled. FPF, the First Principles Framework, gives
the agent a pattern for each kind of document, read from the public FPF library
over MCP.

Say you ask for an ADR. The template covers what was decided. The FPF pattern
adds how to verify it and when to revisit it, and the agent writes those
sections in plain words. The [benchmark note](/integration-evidence/2026-10-22-fpf.md)
says what was measured.

FPF is published by Anatoly Levenchuk under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). The agent cites
pattern IDs and does not copy FPF text into your documents. This recipe is not
endorsed by the FPF author. See [FPF Library](https://fpf.tools/connect) and the
[FPF repository](https://github.com/ailev/FPF).
