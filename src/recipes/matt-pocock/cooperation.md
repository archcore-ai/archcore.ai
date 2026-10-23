### Archcore + Matt Pocock Skills

Applies when Archcore and Matt Pocock Skills are both available. A skill or tool that the session shows only by name counts as available.

1. Before you design, plan, or edit code, call `search_documents` on the task topic.
2. Treat each `accepted` record that `search_documents` returns as a constraint.
3. If the task conflicts with an `accepted` record, report the conflict to the user.
4. If the task conflicts with an `accepted` record, make no edit until the user decides.
5. When the request fully specifies a change and settles no new decision, skip `domain-modeling` and `codebase-design`.
6. When the request fully specifies a change, settles no new decision, and asks for no saved document, create no `.archcore/` record.
7. When the user asks for a saved design or specification, create it as an `.archcore/**/*.spec.md` record.
8. When the request names the behavior to test, treat that behavior as the agreed seam in `tdd`.
9. When the user asks to be grilled, invoke the `grilling` skill.
10. Before each `grilling` round, call `search_documents` on the decisions in that round.
11. During `grilling`, when an `accepted` record answers a question, name the record path instead of asking the question.
12. During `grilling`, write no code, tests, or `.archcore/` records.
13. After the user confirms shared understanding in `grilling`, record the settled decisions as this file directs.
14. When `domain-modeling` or `grill-with-docs` offers an ADR in a project with `.archcore/`, create it as `.archcore/**/*.adr.md`, not in `docs/adr/`.
15. If `docs/adr/` already holds ADRs, ask the user which location owns new ADRs before you write one.
16. Record an ADR only for a decision that is hard to reverse, surprising without context, and the result of a real trade-off.
17. When the change has an `.archcore/` spec or plan, record other settled design choices in that spec or plan.
18. Keep domain terms in `GLOSSARY.md`, as `domain-modeling` directs.
19. Before you record a decision, call `search_documents` for an existing record of it.
20. If an `accepted` record already states the decision, name that record instead of creating a new one.
21. Create every `.archcore/` record with status `draft`.
22. Set status `accepted` on a record only after the user explicitly accepts it.
23. When the user starts with `/to-spec`, `/to-tickets`, or `/wayfinder`, treat the issue tracker as the owner of the spec and tasks.
24. When the issue tracker owns the spec and tasks, create no `.archcore/` spec or plan for the same work.
25. When the user asks for a plan and the issue tracker does not own the work, run `/archcore:plan` after the design is settled.
26. When you run `code-review` and the change has an `.archcore/**/*.spec.md`, pass that path as the spec.
27. When you run `code-review`, add the `accepted` `.archcore/**/*.rule.md` records for the changed area to the standards sources.
28. When the spec is an `.archcore/` record, do not ask the user to run `/setup-matt-pocock-skills`.
29. Run the relevant tests and report the checks that passed or failed.
30. For a change that an Archcore record covers, name that record in the result and report any disagreement between the record and the code.
31. End a task that changed code or records with `Archcore: <records read or written>` or `Archcore: not used — <reason>`.
32. If the project has no `.archcore/`, do not call `init_project` unless the user asks to set up Archcore.
33. If more than one writable `.archcore/` is present, ask which project owns a new record before you write it.
34. If a Matt Pocock skill that this file names is unavailable, state the missing contribution and continue with the available tools.
