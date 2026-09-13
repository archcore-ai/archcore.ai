### Archcore + Superpowers

Applies when both plugins are loaded. A tool, skill, or command that the session shows only by name counts as loaded. An instruction naming only Archcore tools applies in any session with those tools.

1. If the host shows Archcore tools by name only, load their schemas before the first repository read.
2. When the user names a skill or `/archcore:*` command, load and follow that skill's own instructions, not a summary.
3. When any skill or plan step says to read the project, call `search_documents` before reading repository files.
4. After `/archcore:plan`, `/archcore:document`, `/archcore:review`, or `/archcore:init` is invoked, let that command finish before invoking `superpowers:brainstorming`.
5. When an `/archcore:*` command reports missing design or execution work, offer the matching Superpowers skill to the user.
6. If the user accepts that offer, pass the command's prepared inputs to the Superpowers skill.
7. When the user starts through a Superpowers skill, keep to that skill's steps instead of an `/archcore:*` command.
8. At the start of `superpowers:brainstorming`, call `search_documents` on the task topic before reading any repository file.
9. During `superpowers:brainstorming`, write no code, tests, or `.archcore/` records until the user approves a design file under `docs/superpowers/specs/`.
10. When `superpowers:brainstorming` writes a design file in a project with `.archcore/`, record the decisions it settles as `.archcore/**/*.adr.md`.
11. When `superpowers:writing-plans` covers work an `.archcore/**/*.spec.md` describes, set the plan's `Spec:` field to that path.
12. If a `docs/superpowers/plans/*.md` tracks the tasks of an `.archcore/**/*.plan.md`, report the overlap in the task result.
13. If a `docs/superpowers/plans/*.md` tracks the tasks of an `.archcore/**/*.plan.md`, keep the `.archcore/` plan as written.
14. Before any code edit, call `search_documents` on the affected area, including for a one-line change.
15. When prior work in the task answers a question the active skill asks, do not ask it again.
16. If supplied material leaves a required input unanswered, ask for that input before writing the artifact.
17. Before recording a decision in `.archcore/`, call `search_documents` for an existing record.
18. Create every `.archcore/**/*.md` record with status `draft`.
19. Set status `accepted` on an `.archcore/**/*.md` record only after the user's explicit acceptance in the task.
20. If a task conflicts with an `accepted` `.archcore/**/*.adr.md`, report the conflict to the user.
21. If a task conflicts with an `accepted` `.archcore/**/*.adr.md`, make no edit until the user decides.
22. If a document carries `read_only: true`, name its owning project instead of writing to it.
23. If more than one writable `.archcore/` is present, confirm the target project before writing a record.
24. If the project has no `.archcore/`, do not call `init_project` without the user's request.
25. If a Superpowers skill or Archcore tool the user names is unavailable, name the missing contribution in the task result.
26. End a task that changed code or records with `Archcore: <records read or written>` or `Archcore: not used — <reason>`.
27. If another connected recipe's instruction conflicts with an instruction here, report the conflict in the task result.
28. If another connected recipe's instruction conflicts with an instruction here, keep that recipe's applicable contribution.
