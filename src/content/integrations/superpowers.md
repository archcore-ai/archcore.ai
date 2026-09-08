---
title: "Archcore + Superpowers Integration | Setup"
heading: "Archcore + Superpowers"
description: "Connect Archcore + Superpowers to bring project decisions into your agent’s work. Copy the integration instructions and set up your agent."
summary: "Give Superpowers your project’s decisions. Keep new decisions in Git with Archcore."
category: "Workflow skills"
updatedDate: 2026-09-08
recipe: "superpowers"
instructions: "superpowers/cooperation.md"
digest: "a278a2bcc99923a65ecece65160e25dc07a2f08a0bbc1a644bca3b4143c6573f"
source:
  repo: "https://github.com/archcore-ai/plugin"
  path: "integrations/superpowers/cooperation.md"
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
limits:
  - "No joint run has been observed. Every behavioral statement here is intended cooperation, not a measured result."
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
