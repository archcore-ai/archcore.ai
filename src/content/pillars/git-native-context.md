---
title: "Git-Native Context Engineering — Archcore"
heading: "Why Project Context Belongs in Git"
description: "Keep AI coding agent context reviewable, portable, and versioned with code. Learn why specs, decisions, rules, and plans belong in Git."
updatedDate: 2026-08-10
related:
  - project-context
  - context-engineering
faq:
  - question: "What does git-native context mean?"
    answer: "Git-native context means the knowledge an AI coding agent works from lives as files in the repository it describes, versioned with the code, reviewed in pull requests, and owned by the team. It is the opposite of context held in a vendor's store, a local database, or a per-tool cache."
  - question: "Why not store agent context in a database?"
    answer: "A database gives you queries and loses everything else that matters here. Context in a database has no diff, so it cannot be reviewed. It has no branch, so it cannot change alongside the code it constrains. And it has no history tied to the commit that made it true, so you cannot tell which version of a rule applied when a bug was written."
  - question: "Does keeping context in Git bloat the repository?"
    answer: "No. Project context is plain Markdown measured in kilobytes. A repository with a hundred context documents carries less weight than a single dependency lockfile, and Git stores text diffs efficiently."
  - question: "What happens when context and code disagree?"
    answer: "In Git the disagreement is visible: the code changed on a branch and the document did not, which a review or a drift check surfaces. In an external store the disagreement is silent, because nothing connects the two, and the first person to notice is whoever trusted the stale document."
  - question: "Does git-native context work with private repositories?"
    answer: "Yes, and the access model comes free. Anyone who can clone the repository can read the context; anyone who cannot, cannot. There is no second permission system to configure and no way for context to leak somewhere the code does not go."
---

**Git-native context** means the knowledge an AI coding agent works from lives as files in the repository it describes: versioned with the code, reviewed in pull requests, and owned by the team rather than by whichever tool wrote it.

This page argues that this is not one storage option among several. For project context specifically, the properties Git already has are precisely the properties the problem requires.

## The problem storage choice actually solves

Project context has an awkward property: **it is only valuable while it is true**, and what makes it true changes constantly, because the code changes constantly.

A decision recorded in March describes a system that no longer exists by September unless something forces the two to move together. That is the real design problem. Retrieval speed is not the constraint; a hundred Markdown files are trivially fast to search either way. The constraint is drift.

Seen that way, the question becomes: what mechanism keeps a document and the code it describes in agreement? And the answer is a mechanism your team already runs on every change.

## The five properties, and where they come from

| Property | What it gives you | Where it comes from |
| --- | --- | --- |
| **Reviewable** | A change to a rule is approved like a change to code | Pull requests |
| **Versioned** | You can see which rule applied at any commit | Git history |
| **Branch-aware** | Context changes with the code that motivated it | Branches |
| **Portable** | Switching agents does not rebuild the context | Plain files |
| **Team-owned** | The repository owns it, not a laptop or a vendor | The repository |

Each one is worth stating concretely, because they sound abstract until they bite.

**Reviewable.** Someone changes "handlers return typed errors" to something weaker. In Git that arrives as a diff, in a pull request, with a reviewer. Anywhere else it is a silent edit by whoever had the tool open.

**Versioned.** A bug was written in June. Which version of the rule was in force then? With context in Git you check out the commit and read it. Without, you guess.

**Branch-aware.** A refactor changes an architectural boundary. The ADR that described the old boundary changes on the same branch, ships in the same merge, and reverts in the same revert. There is no window where main disagrees with itself.

**Portable.** A team moves from one agent to another, or runs three at once. The context does not move, because it was never in the agent.

**Team-owned.** The knowledge is in the repository every engineer already clones. Onboarding is `git clone`.

## What the alternatives give up

None of these are bad tools. Each one gives up something specific for project context.

**Vendor memory stores.** Fast to start, and structurally unable to be reviewed: there is no diff and no pull request. Context and code drift with nothing to detect it, and the knowledge leaves with the vendor.

**A local database.** Queryable and invisible to your teammates. It also puts context outside the artifact that ships, so a checkout of last quarter's tag has the code and none of the reasoning.

**A wiki or docs site.** Reviewable in its own system, on its own schedule, by its own reviewers. It answers to a different change process than the code, which is exactly how the two get out of step.

**One instruction file per tool.** Genuinely git-native, and it stops scaling at the point where you need types, scope, lifecycle, or a second agent. This is a starting point rather than a wrong answer, and it is the one most teams already have.

## The objection worth taking seriously

The real cost of git-native context is that **Git has no schema**. A database can refuse a malformed record; a directory of Markdown will accept anything.

That is a genuine gap, and it is why plain files alone are not the whole answer. What closes it is structure enforced above the filesystem:

- **Typed documents.** The type is in the filename and the frontmatter, so it is machine-readable rather than a convention.
- **Validated frontmatter.** Writes go through tools that reject a document with a missing or invalid field.
- **Explicit relations** stored alongside, so the graph is data rather than a habit of linking.
- **A lifecycle** (`draft → accepted → rejected`), so a superseded document is visibly superseded.

You keep Git's review, history, and portability, and add the structure Git does not provide. That combination is what "git-native context layer" names.

## What it looks like

```
your-repo/
  src/
  .archcore/
    architecture/
      read-write-split.adr.md
      session-api.spec.md
    api/
      typed-errors.rule.md
    auth/
      migration-q3.plan.md
```

A document is Markdown with typed frontmatter:

```markdown
---
title: "API handlers return typed errors"
status: accepted
---

## Rule

1. WHEN a handler under `src/api/` fails, the handler MUST return an
   `APIError` with a stable `code` field.
```

And the review experience is the ordinary one:

```diff
  ## Rule

- 1. WHEN a handler under `src/api/` fails, the handler MUST return an
-    `APIError` with a stable `code` field.
+ 1. WHEN a handler under `src/api/` or `src/jobs/` fails, the handler
+    MUST return an `APIError` with a stable `code` field.
```

A reviewer sees the scope widen, in the same pull request as the code that made it necessary. That is the whole argument in one diff.

## How Archcore implements it

[Archcore](/) keeps [project context](/project-context/) as typed Markdown in a `.archcore/` directory and adds the structure the filesystem lacks.

- **19 typed document types** across three categories, each with a template and validated frontmatter.
- **Named relations** (`implements`, `extends`, `depends_on`, `related`) recorded as data, so agents can walk the graph.
- **Status and history** in frontmatter, so a directory listing shows what is accepted, draft, or rejected.
- **No database and no service.** The [CLI](/cli/) is a single binary that reads the directory and serves it over [MCP](/mcp/); nothing runs remotely and nothing is stored outside the repository.

```bash
curl -fsSL https://archcore.ai/install.sh | bash
cd your-project && archcore init
```

The result is context your team reviews like code, that travels with the branch that needed it, and that any agent can read because it is just files.

## A note on what this rules out

Being honest about the trade: git-native context cannot follow you across repositories on its own, because it is scoped to the repository by design. Cross-repository standards need an explicit mechanism, which in Archcore is a read-only global source mounted from another `.archcore/` directory.

That is the correct shape of the constraint. Context that belongs to a project should be scoped to the project, and the exception should be declared rather than assumed.
