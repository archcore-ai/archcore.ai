---
title: "Git-Native Context Engineering — Archcore"
heading: "Why Project Context Belongs in Git"
description: "Keep AI coding agent context reviewable, portable, and versioned with code. Learn why specs, decisions, rules, and plans belong in Git."
updatedDate: 2026-09-09
related:
  - project-context
  - context-engineering
faq:
  - question: "What does git-native context mean?"
    answer: "Git-native context means the knowledge an AI coding agent works from lives as files in the repository it describes, versioned with the code, reviewed in pull requests, and owned by the team. It is the opposite of context held in a vendor's store, a local database, or a per-tool cache."
  - question: "Why not store agent context in a database?"
    answer: "A database can provide review, version history, and access control if those features are implemented. Git already gives a code-reviewing team branches and diffs tied to code revisions. A database can be preferable for shared queries or cross-repository access, but needs an explicit link to the code version."
  - question: "Does keeping context in Git bloat the repository?"
    answer: "Markdown adds repository size like any other text. Measure the actual corpus and avoid storing large logs or generated dumps as project documents. Keep the files focused on decisions, rules, contracts, and active work."
  - question: "What happens when context and code disagree?"
    answer: "Review or drift checks need to catch the disagreement. Git makes it possible to inspect both in one diff, but does not guarantee they agree. An external store needs an equivalent revision link and review process."
  - question: "Does git-native context work with private repositories?"
    answer: "Yes. Repository access controls apply to the stored documents. When an agent reads them, its own permissions and data-handling settings still apply. Keeping a file in a private repository does not by itself prevent an agent from sending its contents elsewhere."
---

**Git-native context** means the knowledge an AI coding agent works from lives as files in the repository it describes: versioned with the code, reviewed in pull requests, and owned by the team rather than by whichever tool wrote it.

*Updated September 9, 2026: Clarified the comparison, linked supporting references, and reviewed current Archcore behavior.*

For teams that already review code in Git, storing project documents beside it reuses that review process. The trade-off is maintaining document structure and keeping the record current; Git does neither automatically.

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

**Reviewable.** Someone changes "handlers return typed errors" to something weaker. In Git that arrives as a diff, in a pull request, with a reviewer. An external store needs its own change-review mechanism.

**Versioned.** A bug was written in June. Which version of the rule was in force then? With context in Git you check out the commit and read it. An external store needs a recorded association between its document revision and that commit.

**Branch-aware.** A refactor changes an architectural boundary. The ADR that described the old boundary changes on the same branch, ships in the same merge, and reverts in the same revert. A reviewer can check both changes before merging.

**Portable.** A team moves from one agent to another, or runs three at once. The context does not move, because it was never in the agent.

**Team-owned.** The knowledge is in the repository every engineer already clones. Onboarding is `git clone`.

## What the alternatives give up

Compare the review and revision workflow, not just the storage format.

| Option | Useful property | What to arrange for project context |
| --- | --- | --- |
| Vendor memory service | Managed access and retrieval | Export, approval, and links to code revisions |
| Local database | Queries under your control | Sharing, backups, and a reviewed change history |
| Wiki or docs site | Browsable team documentation | Coordination with the code-review process |
| Instruction files in Git | Existing diffs and directory conventions | Explicit status and relationships if the record needs them |

A database-backed system can implement all of these. Git is attractive when branches and pull requests are already where your team makes engineering decisions. [Git's branching model](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell) explains the revision mechanism this approach reuses.

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
- **No database and no service.** The [CLI](/cli/) is a single binary that reads the directory and serves it over [MCP](/mcp/); document access is local. The [privacy policy](/privacy/) covers installation and update analytics.

```bash
curl -fsSL https://archcore.ai/install.sh | bash
cd your-project && archcore init
```

The result is context your team reviews like code, that travels with the branch that needed it, and that any agent can read because it is just files.

## A note on what this rules out

Being honest about the trade: git-native context cannot follow you across repositories on its own, because it is scoped to the repository by design. Cross-repository standards need an explicit mechanism, which in Archcore is a read-only global source mounted from another `.archcore/` directory.

That is the correct shape of the constraint. Context that belongs to a project should be scoped to the project, and the exception should be declared rather than assumed.
