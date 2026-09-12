# OpenSpec and Spec Kit integration pilot

Reviewed on September 12, 2026. This note supports the
[OpenSpec integration](/integrations/openspec/) and
[Spec Kit integration](/integrations/spec-kit/).

## What was measured

Each tool had five configurations, repeated twice: an agent alone, Archcore
alone, the partner alone, the pair, and the pair with a short cooperation recipe.
Each run used the same small Python quotation library and a scripted coupon
feature. The stages were conflict, design, plan, implementation and recall.

The initial request deliberately contradicted an accepted decision requiring
integer money arithmetic. Later prompts supplied the owner's resolution,
detailed feature requirements and explicit design and implementation approvals.
OpenSpec's implementation prompt also requested synchronization and archive.
The recall stage used a new session identifier in the same working tree.

Host: Claude Code 2.1.268. Requested model identifier: `claude-opus-5[1m]`.
Archcore CLI and plugin: 0.8.3. OpenSpec package: 1.13.0, with its runtime snapshot
pinned below. Spec Kit used the runtime snapshot pinned below.

## Observed results for the pair with the measured recipe

| Observation                               | Archcore + OpenSpec | Archcore + Spec Kit |
| ----------------------------------------- | ------------------- | ------------------- |
| Completed all five stages                 | 2 of 2              | 2 of 2              |
| Code unchanged through design and plan    | 2 of 2              | 2 of 2              |
| Accepted money ADR unchanged at the end   | 2 of 2              | 2 of 2              |
| Newly created ADRs still draft at the end | 2 of 2              | 2 of 2              |
| Six primary behavioral checks passed      | 2 of 2              | 2 of 2              |
| Four additional contract checks passed    | 2 of 2              | 2 of 2              |
| Native feature artifacts present          | 2 of 2              | 2 of 2              |
| Current spec and archived change present  | 2 of 2              | Not applicable      |

The recorded recall answers recovered the expected example (13 cents discount,
612 cents total) and separated the accepted money decision from draft coupon
decisions. They also reported disagreements in the documents. These are
observations from recorded answers, not an independent completeness score for
memory or documentation.

All five configurations for each partner completed the scenario and passed
the primary and additional contract checks. The measured outcomes therefore
do not demonstrate a code-quality advantage for either pair or its recipe.

## Gaps that informed the published instructions

The final files were inspected alongside stage answers. The passing code checks
did not cover all documentation or input behavior.

| Finding                                                                                                                                         | Change in the published instructions                                                                 | Evidence boundary                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| OpenSpec recall reported stale statements about ADR creation and a task-checklist disagreement.                                                 | Reconcile current status statements, then verify spec and archive paths and update moved references. | These added checks have not been tested in a joint run.                          |
| Spec Kit plans still said no ADRs existed after draft ADRs had been created. One research section still called the money ADR the only decision. | Reconcile plan, research and checklist status against the records that now exist.                    | These added checks have not been tested in a joint run.                          |
| Some draft ADRs treated behavior for non-string coupon inputs as settled, although feature documents described it as an assumption.             | Distinguish assumptions from owner-approved decisions and require evidence before claiming approval. | Design approval alone does not prove each assumption was individually decided.   |
| Both Spec Kit recipe runs left the constitution as a blank template.                                                                            | Report missing principles and get the owner's choice before treating the gap as resolved.            | Compatibility with a populated constitution remains untested.                    |
| Native feature files coexisted with linked draft ADRs in both pairs.                                                                            | Retain native ownership of specifications and tasks, with links from Archcore records.               | This was one feature in one repository, not concurrent or cross-repository work. |

The short measured recipes already asked for conflict checks, native artifact
ownership, draft ADRs after design approval, references by path and reading saved
context in a new session. The published instructions retain those behaviors and
make the checks above explicit. They use numbered rules, named owners and stage
conditions so a reviewer can inspect whether the agent followed each rule.

## What these results do not establish

- Two repetitions of one scenario are insufficient to establish reliability,
  optimal prompt wording, time savings or cost savings.
- The benchmark explicitly requested conflict detection and supplied owner
  decisions. It does not establish unprompted detection or autonomous approval.
- Passing a finite test suite does not establish complete input correctness.
  String-subclass handling was a separate edge-case concern in this benchmark.
- A fresh session identifier does not prove complete isolation from all host
  state or recovery across agents, machines or repositories.
- The current published instructions have different digests from the measured
  recipes. The integration pages therefore remain experimental and attach no
  passing evidence to the new instruction revisions.
- Other agents, populated Spec Kit constitutions, extensions, simultaneous
  features and combinations with a third tool were not established by this pilot.

## Traceability

The following identifiers refer to retained local artifacts in the maintainers'
`integration-bench` repository. Raw agent sessions are not published with this
note. The note is a maintainer report, not a publicly reproducible benchmark.

| Artifact                           | Identifier                                                         |
| ---------------------------------- | ------------------------------------------------------------------ |
| OpenSpec experiment                | `20260911T123128Z-5fa48ab13d`                                      |
| Spec Kit experiment                | `20260911T141531Z-e494a79923`                                      |
| Protocol                           | `coupon-v3`                                                        |
| Input revision                     | `a53eae5a2003944362dceea8dd6918646e429338`                         |
| OpenSpec measured recipe SHA-256   | `681a31614d95f2b884d6486f96f78b35ceed3999a61322f487d5b59622fe9d09` |
| Spec Kit measured recipe SHA-256   | `cd65430a007520c7d75169a30af8235b95db1692c6641ab02ac7325806f28a1a` |
| OpenSpec runtime snapshot hash     | `5e42afd0c85e5c72bd5482cf57da92c6952a2cc09564e0ba7ab5ba4c4f01c8c4` |
| Spec Kit runtime snapshot hash     | `7b8ed968e60ed2295d93d98669fd283e0414e6f6a123fb1e3bdfd3510f3b9283` |
| Archcore plugin snapshot hash      | `2aaf0679029c2de5d7a1b69c37c736849fa4418020f832cf0aa878c3393b8f4b` |
| Additional contract oracle SHA-256 | `146be1fd1ef2649aa1ea6f184077c547744d701b85658f2369a24a1250a79d8e` |

Local source paths:

- `docs/validation-2026-09-11/experiments/v3/results.json`
- `runs/<experiment>/manifest.json` and `recipe.md`
- `runs/<experiment>/executions/archcore+<partner>+recipe/<rep>/attempt-1/stages/`
- `runs/<experiment>/executions/archcore+<partner>+recipe/<rep>/attempt-1/fixture/`

`<partner>` is `openspec` or `spec-kit`; `<rep>` is `1` or `2`. Final fixture
files and stage records support this note. Agent statements about full
correctness were not treated as independent verification.
