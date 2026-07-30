---
title: "Cursor Removed Memories: What to Use Instead"
description: "Cursor removed Memories in v2.1 (Nov 2025) with no changelog entry. The export path, what Rules and AGENTS.md cover, and how to keep agent memory in git."
pubDate: 2026-07-29
faq:
  - question: "Why did Cursor remove Memories?"
    answer: "Cursor never gave a public reason. The removal shipped in v2.1 (November 21, 2025) without a changelog entry. Staff confirmed on the official forum that the feature was intentionally removed starting from version 2.1.x."
  - question: "How do I recover my old Cursor memories?"
    answer: "Open the command palette and run Export memories to save them as an .mdc file, then move the content into Project Rules (.cursor/rules/) or User Rules. If leftover memories still leak into your agent's context, Cursor staff advised downgrading to 2.0.77, deleting them there, and upgrading back."
  - question: "Does Cursor have a memory feature in 2026?"
    answer: "No. As of Cursor 3.11 (July 2026) there is no automatic memory. Cursor offers Project Rules, User Rules, Team Rules, AGENTS.md support, and Agent Skills, all of them manually authored."
  - question: "What is the best replacement for Cursor Memories?"
    answer: "It depends on what you actually used it for. Static preferences belong in Rules. Automatic cross-session recall needs an MCP memory server. If you want memory that is versioned with your code, reviewable in pull requests, and shared across agents, keep it as structured documents in your repository."
---

Cursor removed its Memories feature in version 2.1, released November 21, 2025, and has not brought it back: as of Cursor 3.11 (July 2026) there is no automatic memory in the product. The official replacement is a one-time export into Rules. Everything beyond that (automatic capture, cross-session recall, team-wide memory) you now have to provide yourself.

One disclosure before we start: [Archcore](https://archcore.ai/) is our product, and it appears in the comparison below. Read the last section with that in mind.

## What happened to Cursor Memories?

The short life of the feature, from primary sources:

| Date | Version | Event |
|---|---|---|
| May 2025 | 0.51 | Memories ships as beta, [required Privacy Mode off](https://forum.cursor.com/t/0-51-memories-feature/98509) |
| Jun 4, 2025 | 1.0 | [Officially announced](https://cursor.com/changelog/1-0): "Cursor can remember facts from conversations" |
| Jul 3, 2025 | 1.2 | [GA with user approvals](https://cursor.com/changelog/1-2) for background-generated memories |
| Nov 21, 2025 | 2.1 | Feature removed. [The changelog](https://cursor.com/changelog/2-1) does not mention it |
| Jan 2026 | 2.2 | Leftover memories [still reach the agent's context](https://forum.cursor.com/t/cant-clear-memories/148254), with no UI to delete them |

Three details make this story instructive:

1. The removal never appeared in a changelog. Users found out when their memories vanished, and the confirmation came from a staff member on the forum: ["The Memories feature was intentionally removed starting from version 2.1.x."](https://forum.cursor.com/t/are-my-memories-gone/144057)
2. No reason was ever given publicly. Not in the changelog, not in the forum replies.
3. The data outlived the UI. Into January 2026, old memories kept leaking into agent context, and the staff-suggested fix was to downgrade to 2.0.77, delete them there, and upgrade back.

If your workflow depended on Memories, six months of accumulated context disappeared from your control with a minor version bump.

## What does Cursor offer instead?

Cursor's [current context toolbox](https://cursor.com/docs/context/rules) has four mechanisms, all manually authored:

| Mechanism | What it is | Limits |
|---|---|---|
| Project Rules | `.cursor/rules/*.mdc`, versioned in git, four activation modes (always, intelligent, glob-scoped, manual) | Static; the agent never updates them itself. Docs recommend staying under 500 lines per rule, and plain `.md` files in the folder are ignored |
| User Rules | Global personal preferences in settings | Not in git, not shared with the team |
| Team Rules | Centrally managed rules ([since 1.7](https://cursor.com/changelog/1-7)) | Live in the Cursor dashboard, not your repo. Team/Enterprise plans only |
| AGENTS.md | Plain-markdown instructions, nested files supported | No frontmatter scoping, and no global AGENTS.md ([open feature request](https://forum.cursor.com/t/support-global-agents-md/150406)) |

Cursor 2.4 (January 2026) also added [Agent Skills](https://cursor.com/changelog/2-4): `SKILL.md` files for procedural "how-to" instructions. In Cursor's own words, skills complement "always-on, declarative rules". They are portable procedures, not project memory.

## What did Memories do that Rules don't?

The point of Memories was automatic capture. A background process watched your sessions, proposed facts worth remembering, and you approved or rejected them. Rules invert that: nothing gets remembered unless someone sits down and writes it.

To be fair, Memories earned plenty of criticism while it existed. The beta required Privacy Mode off (staff [acknowledged the training-data concern](https://forum.cursor.com/t/0-51-memories-feature/98509) directly), memories were tied to your account rather than the project, they [vanished on window reloads](https://forum.cursor.com/t/memories-get-deleted-when-reloading-window/137462), didn't persist in [dev containers](https://forum.cursor.com/t/cursor-memories-are-not-persistent-dev-container/122460), and there was no import/export until the export command appeared for migration. The feature was opaque in exactly the way that made its removal painful.

So the gap left behind is specific: context that accumulates as you work, without depending on someone remembering to write it down.

## What are the replacement options?

| Option | What you get | What you give up |
|---|---|---|
| Export → Rules (official path) | Your old memories as `.mdc` files in git; done in five minutes | One-time snapshot; nothing accumulates afterwards |
| Memory-bank repos ([cursor-memory-bank](https://github.com/vanzan01/cursor-memory-bank), 3.1k stars) | Markdown context files in your repo, driven by slash commands | Fully manual discipline; works only if the model actually runs the commands |
| MCP memory servers ([OpenMemory](https://mem0.ai/openmemory), [Cipher](https://github.com/campfirein/cipher), [memories.sh](https://memories.sh/docs/integrations/cursor)) | Automatic cross-session recall over MCP; OpenMemory runs locally | Memory lives outside git, so it is not versioned per decision or reviewed in PRs. It's a separate service to run, and team sync usually means someone's cloud |
| Structured docs in your repo ([Archcore](https://archcore.ai/)) | Typed documents (decisions, rules, specs, plans) in `.archcore/`, versioned in git, loaded into the agent over MCP; capture happens during work via slash commands | You review what gets written; capture is a deliberate step rather than silent background writing |

Which one is right depends on what you actually used Memories for. Personal preferences ("I use pnpm, stop suggesting npm") belong in User Rules and take two minutes to move. Automatic recall of conversation facts is what MCP memory servers do. Project knowledge (why the auth module is structured this way, which decision blocks that refactor, what the API contract promises) is the piece we'd argue never belonged in a proprietary per-account store in the first place.

## The lesson: memory you don't own disappears

Cursor Memories is the clearest example so far: context stored in a vendor's opaque layer sits one minor release away from gone. No changelog entry, no stated reason, no UI to clean up what was left behind.

The alternative is boring and it works: keep project memory as files in the repository. That's the design principle behind Archcore. Decisions, rules, specs, and plans live as typed markdown in `.archcore/`, with named relations between them. It rides along with git, so every piece of context is versioned, shows up in pull requests, and survives any tool's product decisions. It loads into Cursor over MCP and session hooks, and the same documents work in Claude Code, Copilot, Gemini CLI, and any other MCP-aware agent, so the memory isn't married to one editor either.

If your Rules files are short and under control, keep using Rules; they're good at what they do. The moment you catch yourself re-explaining the same architecture to your agent, or your `.mdc` files turn into an unstructured dump, that's the signal the project needs real [repo memory](/learn/repo-memory/) rather than a bigger instruction file.

Migrating off exported memories takes one command: `archcore init` imports existing instruction files (`.cursor/rules/*`, `.cursorrules`, `CLAUDE.md`, `AGENTS.md`) as structured documents, so the context you already wrote carries over. The [install guide](https://archcore.ai/how-to-use/) walks through the rest.
