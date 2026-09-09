### Archcore + Superpowers

Applies when both plugins are loaded. An instruction naming only Archcore tools applies in any session with those tools.

1. When the user names a skill or `/archcore:*` command, load that skill's own instructions and follow them rather than a summary.
2. After `/archcore:plan`, `/archcore:document`, `/archcore:review`, or `/archcore:init` is invoked, let that command finish before invoking `superpowers:brainstorming`.
3. When an `/archcore:*` command reports missing design or execution work, you may invoke the matching Superpowers skill with the command's prepared inputs.
4. When the user starts through a Superpowers skill, keep to that skill's steps instead of an `/archcore:*` command.
5. At the start of `superpowers:brainstorming`, call `search_documents` on the task topic before reading any repository file.
6. During `superpowers:brainstorming`, write no code, tests, or `.archcore/` records until the user approves a design file under `docs/superpowers/specs/`.
7. When `superpowers:brainstorming` writes a design file in a project with `.archcore/`, record the decisions it settles as `.archcore/**/*.adr.md`.
8. When `superpowers:writing-plans` covers work an `.archcore/**/*.spec.md` describes, set the plan's `Spec:` field to that path.
9. If a `docs/superpowers/plans/*.md` tracks the tasks of an `.archcore/**/*.plan.md`, report the overlap in the task result.
10. If a `docs/superpowers/plans/*.md` tracks the tasks of an `.archcore/**/*.plan.md`, keep the `.archcore/` plan as written.
11. When prior work in the task answers a question the active skill asks, do not ask it again.
12. If supplied material leaves a required input unanswered, ask for that input before writing the artifact.
13. Before recording a decision in `.archcore/`, call `search_documents` for an existing record.
14. Create every `.archcore/**/*.md` record with status `draft`.
15. Set status `accepted` on an `.archcore/**/*.md` record only after the user's explicit acceptance in the task.
16. If a task conflicts with an `accepted` `.archcore/**/*.adr.md`, report the conflict and stop for the user's decision.
17. If a document carries `read_only: true`, name its owning project instead of writing to it.
18. If more than one writable `.archcore/` is present, confirm the target project before writing a record.
19. If the project has no `.archcore/`, do not call `init_project` without the user's request.
20. If a Superpowers skill or Archcore tool the user names is unavailable, name the missing contribution in the task result.
21. If another connected recipe's instruction conflicts with an instruction here, report the conflict and preserve that recipe's applicable contribution.
