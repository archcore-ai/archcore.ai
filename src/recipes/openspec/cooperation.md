### Archcore + OpenSpec

Applies when both contributions are loaded. An instruction naming only Archcore tools applies in any session with those tools.

1. When the user names a skill or `/archcore:*` command, load and follow its own instructions.
2. When an `/archcore:*` command is invoked, let it finish before starting an OpenSpec workflow.
3. When an Archcore command leaves design or execution work open, pass its prepared inputs to the matching OpenSpec workflow.
4. When the user starts through OpenSpec, follow its installed proposal, application, synchronization and archive instructions.
5. Before designing an OpenSpec change, call `search_documents` for relevant decisions and rules.
6. When OpenSpec owns the change, keep its proposal, specs, design and tasks in their native locations instead of creating copies in Archcore.
7. If an existing Archcore plan tracks the same tasks, report the overlap and keep that plan as written.
8. Before implementing a change, obtain the user's approval of the saved design unless already given in the task.
9. After design approval, record newly settled architectural decisions as draft ADRs linked to the OpenSpec artifacts by path.
10. Before recording a decision, call `search_documents` for an existing record.
11. When a design includes an assumption, keep it identified as an assumption until the user resolves it.
12. Create and update `.archcore/` records through Archcore's document tools.
13. Create every new `.archcore/**/*.md` record with status `draft`.
14. Set status `accepted` only after the user's explicit acceptance of that record in the task.
15. If the change conflicts with an accepted decision or applicable rule, report the conflict and stop the affected work for the user's decision.
16. If a document carries `read_only: true`, name its owning project instead of writing to it.
17. If more than one writable `.archcore/` is present, confirm the target project before writing a record.
18. If the project has no `.archcore/`, do not call `init_project` without the user's request.
19. Before reporting completion, check code against the approved specs and report failed or unrun checks.
20. Before closing the change, reconcile task status and statements about decision records with the work actually completed.
21. When the user authorizes closing the change, synchronize and archive through OpenSpec, then check the resulting spec and archive paths.
22. If an artifact moves, update references in the records you maintain without changing unrelated decisions or their status.
23. In a new session, read the saved OpenSpec artifacts and Archcore decisions before repeating requirements questions.
24. For a read-only status request, report document disagreements and draft versus accepted decisions without changing records.
25. If a required input or contribution is missing, name it before proceeding with the work that needs it.
26. If another connected recipe conflicts with these instructions, report the conflict and preserve that recipe's applicable contribution.
