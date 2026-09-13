### Archcore + OpenSpec

Applies when both contributions are loaded. A tool, skill, or command that the session shows only by name counts as loaded. An instruction naming only Archcore tools applies in any session with those tools.

1. If the host shows Archcore tools by name only, load their schemas before the first repository read.
2. When the user names a skill or `/archcore:*` command, load and follow its own instructions.
3. When any skill or plan step says to read the project, call `search_documents` before reading repository files.
4. When an `/archcore:*` command is invoked, let it finish before starting an OpenSpec workflow.
5. When an Archcore command leaves design or execution work open, pass its prepared inputs to the matching OpenSpec workflow.
6. When the user starts through OpenSpec, follow its installed proposal, application, synchronization and archive instructions.
7. Before designing an OpenSpec change, call `search_documents` for relevant decisions and rules.
8. Before any code edit, call `search_documents` on the affected area, including for a one-line change.
9. When OpenSpec owns the change, keep its proposal, specs, design and tasks in native locations, not in Archcore.
10. If an existing Archcore plan tracks the same tasks, report the overlap in the task result.
11. If an existing Archcore plan tracks the same tasks, keep that Archcore plan as written.
12. Before implementing a change, obtain the user's approval of the saved design unless already given in the task.
13. After design approval, record newly settled architectural decisions as draft ADRs linked to the OpenSpec artifacts by path.
14. Before recording a decision, call `search_documents` for an existing record.
15. When a design includes an assumption, keep it identified as an assumption until the user resolves it.
16. Create and update `.archcore/` records through Archcore's document tools.
17. Create every new `.archcore/**/*.md` record with status `draft`.
18. Set status `accepted` only after the user's explicit acceptance of that record in the task.
19. If the change conflicts with an accepted decision or applicable rule, report the conflict to the user.
20. If the change conflicts with an accepted decision or applicable rule, stop the affected work until the user decides.
21. If a document carries `read_only: true`, name its owning project instead of writing to it.
22. If more than one writable `.archcore/` is present, confirm the target project before writing a record.
23. If the project has no `.archcore/`, do not call `init_project` without the user's request.
24. Before reporting completion, check code against the approved specs.
25. Report failed or unrun checks in the task result.
26. Before closing the change, reconcile task status and statements about decision records with the work actually completed.
27. When the user authorizes closing the change, synchronize and archive it through OpenSpec.
28. After archiving, check the resulting spec and archive paths.
29. If an artifact moves, update references in the records you maintain without changing unrelated decisions or their status.
30. In a new session, read the saved OpenSpec artifacts and Archcore decisions before repeating requirements questions.
31. For a read-only status request, report document disagreements and draft versus accepted decisions without changing records.
32. If a required input or contribution is missing, name it before proceeding with the work that needs it.
33. End a task that changed code or records with `Archcore: <records read or written>` or `Archcore: not used — <reason>`.
34. If another connected recipe conflicts with these instructions, report the conflict in the task result.
35. If another connected recipe conflicts with these instructions, keep that recipe's applicable contribution.
