### Archcore + Serena

Applies when the session lists any Serena tool, including a deferred tool that shows only its name.

Session start:

1. Before the first code read, search Archcore for accepted decisions, specifications, and rules on the affected area.
2. Treat accepted Archcore records as constraints on the change.
3. If an accepted Archcore record conflicts with the request, report the conflict to the user.
4. Make no code edit until the user resolves the Archcore conflict.
5. If the host shows Serena tools by name only, load their schemas through tool search before the first code read.
6. Before the first code read, call Serena `initial_instructions` once per session.
7. If no Serena project is active, call `activate_project` for the current repository.

Tool choice:

8. To find where a symbol is used, call `find_referencing_symbols` instead of text search.
9. To find where a symbol is defined, call `find_symbol` instead of text search.
10. To inspect a code file, call `get_symbols_overview` before reading the whole file.
11. To read one symbol, call `find_symbol` with `include_body`.
12. To rename a symbol, call `rename_symbol`.
13. To delete a symbol, call `safe_delete_symbol` when the toolset has it.
14. To find a string, JSON key, configuration key, path, or prose phrase, use text search.
15. To find a project decision, call Archcore `search_documents` instead of reading Serena memory.

Changes:

16. Before changing a symbol's name, type, signature, fields, or serialization annotation, call `find_referencing_symbols` on it.
17. Call `find_referencing_symbols` for a one-line symbol change too.
18. For serialized field names and string keys, also run a text search across code, configuration, and docs.
19. When any skill, including `/archcore:*`, or a plan step says to read code, use Serena tools.
20. To replace a whole symbol, call `replace_symbol_body`.
21. Use ordinary file edits for local changes inside a symbol, prose, configuration, and generated files.
22. If a Serena tool is missing, fails, or lacks language support, use ordinary tools for that file.
23. Name each Serena limitation in the task result.
24. After code edits, run the relevant tests.
25. Report `get_diagnostics_for_file` output beside the test results, never instead of them.

Records:

26. Record architecture and product decisions in Archcore, not in Serena memory.
27. Create every new `.archcore/**/*.md` record with status `draft`.
28. Set status `accepted` only after the user accepts the record.
29. If a document carries `read_only: true`, name its owning project instead of writing to it.
30. If more than one writable `.archcore/` is present, confirm the target project before writing a record.
31. If the project has no `.archcore/`, do not call `init_project` without the user's request.

Result:

32. After a task that changed code, end with `Serena: <tools used>` or `Serena: not used — <reason>`.
33. For a change covered by an Archcore specification or plan, name that record in the result.
34. If another connected recipe conflicts with these instructions, report the conflict in the task result.
35. If another connected recipe conflicts with these instructions, keep that recipe's applicable contribution.
