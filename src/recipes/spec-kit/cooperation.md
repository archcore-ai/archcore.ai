### Archcore + Spec Kit

Applies when both contributions are loaded. An instruction naming only Archcore tools applies in any session with those tools.

1. When the user names a skill or `/archcore:*` command, load and follow its own instructions.
2. When an `/archcore:*` command is invoked, let it finish before starting a Spec Kit workflow.
3. When an Archcore command leaves design or execution work open, pass its prepared inputs to the matching Spec Kit workflow.
4. When the user starts through Spec Kit, follow its installed constitution, specification, planning, task and implementation instructions.
5. Before planning a feature, call `search_documents` for relevant decisions and rules and compare them with its specification and constitution.
6. If the constitution is missing or still a template, report that state and ask whether to establish it or proceed with existing project rules.
7. When Spec Kit owns the feature, keep its specification, plan, supporting design files and tasks in their native locations instead of creating copies in Archcore.
8. If an existing Archcore plan tracks the same tasks, report the overlap and keep that plan as written.
9. Before implementation, obtain the user's approval of the saved specification and design plan unless already given in the task.
10. After design approval, record newly settled architectural decisions as draft ADRs linked to the native feature artifacts by path.
11. Before recording a decision, call `search_documents` for an existing record.
12. When a design includes an assumption, keep it identified as an assumption until the user resolves it.
13. Create and update `.archcore/` records through Archcore's document tools.
14. Create every new `.archcore/**/*.md` record with status `draft`.
15. Set status `accepted` only after the user's explicit acceptance of that record in the task.
16. If the specification, constitution or proposed work conflicts with an accepted decision or applicable rule, report the conflict and stop the affected work for the user's decision.
17. If a document carries `read_only: true`, name its owning project instead of writing to it.
18. If more than one writable `.archcore/` is present, confirm the target project before writing a record.
19. If the project has no `.archcore/`, do not call `init_project` without the user's request.
20. Before reporting completion, check code against the approved specification and contracts and report failed or unrun checks.
21. Mark native tasks complete only when their work and required checks are complete.
22. After implementation, reconcile current status statements in the plan, research and checklists with the code and decision records that now exist.
23. In a new session, read the saved feature artifacts and Archcore decisions before repeating requirements questions.
24. For a read-only status request, report document disagreements and draft versus accepted decisions without changing records.
25. If a required input or contribution is missing, name it before proceeding with the work that needs it.
26. If another connected recipe conflicts with these instructions, report the conflict and preserve that recipe's applicable contribution.
