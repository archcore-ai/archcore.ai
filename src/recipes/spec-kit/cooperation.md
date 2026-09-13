### Archcore + Spec Kit

Applies when both contributions are loaded. A tool, skill, or command that the session shows only by name counts as loaded. An instruction naming only Archcore tools applies in any session with those tools.

1. If the host shows Archcore tools by name only, load their schemas before the first repository read.
2. When the user names a skill or `/archcore:*` command, load and follow its own instructions.
3. When any skill or plan step says to read the project, call `search_documents` before reading repository files.
4. When an `/archcore:*` command is invoked, let it finish before starting a Spec Kit workflow.
5. When an Archcore command leaves design or execution work open, pass its prepared inputs to the matching Spec Kit workflow.
6. When the user starts through Spec Kit, follow its installed constitution, specification, planning, task and implementation instructions.
7. Before planning a feature, call `search_documents` for relevant decisions and rules.
8. Compare the found records with the feature's specification and constitution.
9. Before any code edit, call `search_documents` on the affected area, including for a one-line change.
10. If the constitution is missing or still a template, report that state to the user.
11. If the constitution is missing or still a template, ask whether to establish it or use existing project rules.
12. When Spec Kit owns the feature, keep its specification, plan, design files and tasks in native locations, not in Archcore.
13. If an existing Archcore plan tracks the same tasks, report the overlap in the task result.
14. If an existing Archcore plan tracks the same tasks, keep that Archcore plan as written.
15. Before implementation, obtain the user's approval of the saved specification and design plan unless already given in the task.
16. After design approval, record newly settled architectural decisions as draft ADRs linked to the native feature artifacts by path.
17. Before recording a decision, call `search_documents` for an existing record.
18. When a design includes an assumption, keep it identified as an assumption until the user resolves it.
19. Create and update `.archcore/` records through Archcore's document tools.
20. Create every new `.archcore/**/*.md` record with status `draft`.
21. Set status `accepted` only after the user's explicit acceptance of that record in the task.
22. If the specification, constitution or proposed work conflicts with an accepted decision or rule, report the conflict to the user.
23. If the specification, constitution or proposed work conflicts with an accepted decision or rule, stop the affected work.
24. If a document carries `read_only: true`, name its owning project instead of writing to it.
25. If more than one writable `.archcore/` is present, confirm the target project before writing a record.
26. If the project has no `.archcore/`, do not call `init_project` without the user's request.
27. Before reporting completion, check code against the approved specification and contracts.
28. Report failed or unrun checks in the task result.
29. Mark native tasks complete only when their work and required checks are complete.
30. After implementation, reconcile status statements in the plan, research and checklists with the code and decision records.
31. In a new session, read the saved feature artifacts and Archcore decisions before repeating requirements questions.
32. For a read-only status request, report document disagreements and draft versus accepted decisions without changing records.
33. If a required input or contribution is missing, name it before proceeding with the work that needs it.
34. End a task that changed code or records with `Archcore: <records read or written>` or `Archcore: not used — <reason>`.
35. If another connected recipe conflicts with these instructions, report the conflict in the task result.
36. If another connected recipe conflicts with these instructions, keep that recipe's applicable contribution.
