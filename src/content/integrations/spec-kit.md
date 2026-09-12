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
limits:
  - "The published instructions are a revision of the measured recipe. They remain experimental until this exact text is tested."
  - "The pilot used Claude Code 2.1.268, model identifier claude-opus-5[1m], Archcore 0.8.3 and a pinned Spec Kit runtime snapshot documented in the pilot note."
  - "Two repetitions of one scripted feature do not establish better code, lower cost or compatibility across repositories and agents."
  - "A populated constitution, extensions, multi-feature work and additional planning tools were not covered by this pilot."
  - "The instructions rely on the agent following them. Review remains necessary for tests, document consistency and decision approval."
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
