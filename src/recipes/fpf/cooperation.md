### Archcore + FPF Library

Applies when you create an Archcore document, make an engineering choice, or draw a conclusion from data.

1. Before you decide or write, call `search_documents` with `content` naming the subject. Read each matching record with `get_document`. An accepted record limits the options.
2. When the request asks you to choose between options, read FPF pattern `C.38` with `read_pattern`, and sections `C.11:1` and `C.11:4.6` with `read_section` (publication `p_85ab6107537eb867`). Do not call `read_pattern` for `C.11`; it is too large. When an input that could reverse the choice is still unknown, "probe again" and "defer" are valid outcomes.
3. When a document draws a conclusion from data, tests or sources, read FPF pattern `B.3`. State what the evidence supports, what it does not support, and what would reopen the conclusion.
4. Before you create a document, read the FPF pattern for its type:
   - `adr` `C.32.ADR`; `rfc` `PSDA.14`; `rule` `A.11.OP`; `guide` `A.3.2.DE`; `spec` `A.6`
   - `prd` and `idea` `C.40.PC`; `plan` `A.15.2`; `research` `F.1`; `evidence` `A.10`; `rnd` `B.5`
   - `scenario` `SYSE.54`; `journey` `MKT.8`; `task-type` `SYSE.48`; `cpat` `A.10.1`; `mrd` `MKT.1`; `brd` `STR.1`
   - `doc`, `urd`, `brs`, `strs`, `syrs`, `srs`: no pattern. Use the Archcore template only.
5. For `A.6`, read sections `A.6:1` and `A.6:7` with `read_section` (publication `p_85ab6107537eb867`) instead of the whole pattern. For a pattern outside that publication, take `publication` from a `search` result.
6. Find the pattern's adoption test (usually in section `:1`) and its conformance checklist (usually in section `:7`). Start from the Archcore sections of the type. For each item that no section covers, add a short section.
7. Name every heading in plain developer words, for example "How to verify", "When to revisit", "Open questions", "Out of scope". Do not use FPF names such as "Publication Boundary", "Work Split", "Eval Exit" or "Forces and Architecture Characteristics".
8. Keep every new record a draft, also when the request states the decision or rule as settled.
9. Name each FPF pattern ID you used and the Library snapshot from `get_corpus_status`. Do not cite a pattern you could not read. Do not copy FPF text.
10. Link the new record to the records it depends on with `add_relation`. Do not change an accepted record.
