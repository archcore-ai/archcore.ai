### Archcore + Serena

Applies when Archcore and Serena are both available.

1. Use Archcore for project knowledge, decisions, specifications, plans, and traceability. Use Serena for symbol-aware code navigation, reference lookup, diagnostics, and semantic edits.
2. Before changing code, search Archcore for accepted decisions, relevant specifications, and prior records. Treat accepted decisions as constraints.
3. Activate the project in Serena before querying symbols. Use Serena to inspect relevant symbols and references before a cross-file change, rename, move, or refactor.
4. Do not use Serena memory as the source of truth for architecture or product decisions. Record durable decisions in Archcore.
5. When an Archcore specification or accepted decision conflicts with the requested implementation, report the conflict and stop for the user's decision.
6. When the user names an `/archcore:*` command or Archcore skill, load and follow that skill's instructions before starting implementation work.
7. After an Archcore planning or documentation command completes, use Serena to validate the affected code structure, dependencies, and references when useful.
8. For a change covered by an Archcore specification or plan, preserve the link between the code change and its governing record in the task result.
9. Use Serena's symbol-aware edits for code symbols when available. Use ordinary file edits for prose, configuration, generated files, or changes Serena cannot model safely.
10. Run the relevant tests after semantic edits. Use Serena diagnostics as additional evidence, not as a replacement for tests.
11. If Serena is unavailable or cannot analyze a language or file, continue with normal repository tools and name that limitation in the result.
12. Do not call `init_project` merely because Archcore is present. If no `.archcore/` exists, work from repository files unless the user asks to initialize Archcore.
13. Create new Archcore records with `status: draft`. Set `status: accepted` only after the user explicitly accepts the record.
14. If more than one writable `.archcore/` directory exists, ask the user which project owns the new record before writing it.
