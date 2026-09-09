---
title: "Archcore + Superpowers Integration | Setup"
heading: "Archcore + Superpowers"
description: "Connect Archcore + Superpowers to bring project decisions into your agent’s work. Copy the integration instructions and set up your agent."
summary: "Give Superpowers your project’s decisions. Keep new decisions in Git with Archcore."
category: "Workflow skills"
updatedDate: 2026-09-09
recipe: "superpowers"
instructions: "superpowers/cooperation.md"
digest: "6a803fd329569ae313d1d8cf5330c03fb1971918cf61565f045a5aabbf1d8466"
source:
  repo: "https://github.com/archcore-ai/plugin"
  path: "AGENTS.md"
  revision: null
tools:
  - name: "Archcore"
    url: "https://archcore.ai/"
    role: "Keeps project decisions, rules, and specs in Git for your agent to use."
    icon: "/logo.png"
    iconDark: "/logo-dark.png"
  - name: "Superpowers"
    url: "https://github.com/obra/superpowers"
    role: "Guides design and implementation through its own skills and plans."
hosts:
  - id: "claude-code"
    label: "Claude Code"
    instructionFile: "CLAUDE.md"
    note: null
    verified: false
  - id: "codex-cli"
    label: "Codex CLI"
    instructionFile: "AGENTS.md"
    note: null
    verified: false
  - id: "codex-app"
    label: "Codex App"
    instructionFile: "AGENTS.md"
    note: null
    verified: false
  - id: "cursor"
    label: "Cursor"
    instructionFile: "AGENTS.md"
    note: null
    verified: false
  - id: "copilot"
    label: "GitHub Copilot"
    instructionFile: ".github/copilot-instructions.md"
    note: "Paste the full text into this file, rather than a link to it."
    verified: false
evidence: []
workflow:
  heading: "From a new idea to the next session"
  steps:
    - title: "Read existing decisions"
      description: "At the start of brainstorming, the agent searches Archcore for decisions and rules that apply to your task."
    - title: "Review the design before code"
      description: "Superpowers guides the design. If the task conflicts with an accepted decision, the agent asks you how to proceed."
    - title: "Keep the decisions you approve"
      description: "After design approval, the agent records decisions as draft architecture decision records (ADRs) in Archcore. Accepting an ADR needs your explicit approval."
    - title: "Continue with project context"
      description: "The next session can find the saved design and decisions. Superpowers keeps its implementation plans in the repository."
  note: "Starting with /archcore:plan? That command finishes first. Superpowers can pick up design or execution work it leaves open."
pilot:
  heading: "Catch conflicts before code."
  summary: "The instructions bring existing project decisions into design work. You resolve conflicts before implementation and approve new decisions before they become accepted records."
  limitation: "These instructions rely on the agent following them. The design-to-ADR step has not been verified end to end."
  findings:
    - scenario: "Design with project context"
      result: "Brainstorming starts with a search for relevant decisions and rules."
      caveat: "You approve the design before code is written."
    - scenario: "Conflicting or shared decisions"
      result: "A conflict with an accepted decision needs your input. Read-only documents stay with their owning project."
      caveat: "If several projects are writable, the agent confirms where to save a record."
    - scenario: "A new session"
      result: "Saved designs and decisions give the next session context to continue."
      caveat: "Unanswered design questions still need your input."
    - scenario: "Two implementation plans"
      result: "Superpowers keeps its detailed execution plan. The Archcore plan stays as written."
      caveat: "You maintain any overlapping tasks across the two plans."
    - scenario: "Starting with /archcore:plan"
      result: "The command finishes before brainstorming begins."
      caveat: "Superpowers can take on design or execution work the command leaves open."
limits:
  - "Instructions are copied from the Archcore + Superpowers section of AGENTS.md. CLAUDE.md imports that file."
  - "This instruction revision has no linked verification record."
  - "The recipe source is unpublished, so the text is pinned by digest rather than by an upstream revision."
  - "Setup steps are written for five agents and checked on none of them."
  - "Superpowers is not installed by this recipe. It has to be present and callable already."
  - "This pair only. Two working pairs do not make a working triple."
maintainer: "Archcore maintainers"
---

## How Archcore + Superpowers work together

Start with either tool. These instructions tell your agent to read existing
project decisions before design work and save new decisions in Archcore.
Superpowers keeps its own plans; Archcore documents reference them.
