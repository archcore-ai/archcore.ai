import { msg } from "@lingui/core/macro";
import { Trans } from "@lingui/react/macro";
import { useLingui } from "@lingui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/section-container";
import { cn } from "@/lib/utils";
import { INTERNAL_LINKS } from "@/lib/links";
import { BRANCHES } from "@/content/how-to-use";
import type {
  Branch,
  Choice,
  ExampleVariant,
  Step,
  Surface,
} from "@/content/how-to-use";

type WizardState =
  | { phase: "picker" }
  | {
      phase: "step";
      branchId: string;
      stepId: string;
      history: string[];
      answers: Record<string, string>;
      mode: Surface;
    }
  | {
      phase: "done";
      branchId: string;
      mode: Surface;
    };

const INITIAL: WizardState = { phase: "picker" };

interface HowToUseWizardSectionProps {
  /**
   * Inline mode for the landing page: tighter padding and a short section
   * intro above the wizard card. The standalone /how-to-use page leaves this
   * off so the wizard owns the full viewport.
   */
  embedded?: boolean;
}

export function HowToUseWizardSection({
  embedded = false,
}: HowToUseWizardSectionProps = {}) {
  const { _ } = useLingui();
  const [state, setState] = useState<WizardState>(INITIAL);

  const branch =
    state.phase === "picker"
      ? undefined
      : BRANCHES.find((b) => b.id === state.branchId);
  const step =
    state.phase === "step"
      ? branch?.steps.find((s) => s.id === state.stepId)
      : undefined;
  const stepIndex =
    state.phase === "step" && branch
      ? Math.max(
          0,
          branch.steps.findIndex((s) => s.id === state.stepId)
        )
      : 0;

  const enterBranch = (id: string) => {
    const target = BRANCHES.find((b) => b.id === id);
    if (!target || target.steps.length === 0) return;
    setState({
      phase: "step",
      branchId: id,
      stepId: target.steps[0].id,
      history: [],
      answers: {},
      mode: "plugin",
    });
  };

  const pickChoice = (choiceId: string) => {
    if (state.phase !== "step" || !step || step.kind !== "choice") return;
    setState({
      ...state,
      answers: { ...state.answers, [step.id]: choiceId },
    });
  };

  const setMode = (next: Surface) => {
    if (state.phase !== "step" || !branch?.supportsToggle) return;
    setState({ ...state, mode: next });
  };

  const goBack = () => {
    if (state.phase !== "step") return;
    if (state.history.length === 0) {
      setState(INITIAL);
      return;
    }
    const history = [...state.history];
    const previousStepId = history.pop() ?? state.stepId;
    setState({ ...state, stepId: previousStepId, history });
  };

  const goNext = () => {
    if (state.phase !== "step" || !branch || !step) return;
    const answer = state.answers[step.id];
    const nextStepId =
      step.next?.(answer ?? "") ?? defaultNextStepId(branch, step.id);

    if (!nextStepId) {
      setState({ phase: "done", branchId: branch.id, mode: state.mode });
      return;
    }
    setState({
      ...state,
      history: [...state.history, state.stepId],
      stepId: nextStepId,
    });
  };

  const restart = () => {
    setState(INITIAL);
  };

  const canAdvance =
    state.phase === "step" && step
      ? step.kind !== "choice" || Boolean(state.answers[step.id])
      : false;

  return (
    <SectionContainer
      narrow
      id="walkthrough"
      className={
        embedded
          ? "pt-8 md:pt-10 pb-8 md:pb-10"
          : "pt-24 md:pt-28 pb-24 md:pb-32"
      }
    >
      {embedded && (
        <div className="text-center space-y-3 mb-8 max-w-2xl mx-auto">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground font-medium">
            <span
              className="nav-live-dot text-[var(--color-action)]"
              aria-hidden="true"
            />
            <Trans>Try it right here</Trans>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
            <Trans>No install needed. See exactly what you'd run.</Trans>
          </h2>
        </div>
      )}
      <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-sm overflow-hidden">
        {state.phase === "picker" && <BranchPicker onPick={enterBranch} />}

        {state.phase === "done" && branch && (
          <DonePanel
            branchId={branch.id}
            mode={state.mode}
            onRestart={restart}
          />
        )}

        {state.phase === "step" && branch && step && (
          <StepView
            branch={branch}
            step={step}
            stepIndex={stepIndex}
            total={branch.steps.length}
            mode={state.mode}
            selectedId={state.answers[step.id]}
            onPick={pickChoice}
            onModeChange={setMode}
          />
        )}

        {state.phase === "step" && branch && step && (
          <footer
            className={cn(
              "flex flex-wrap items-center gap-3 justify-between",
              "border-t border-border px-6 md:px-8 py-4 bg-background/40"
            )}
          >
            <Button type="button" variant="ghost" size="sm" onClick={goBack}>
              <ArrowLeft className="h-4 w-4" />
              {state.history.length === 0 ? (
                <Trans>All paths</Trans>
              ) : (
                <Trans>Back</Trans>
              )}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={restart}
                aria-label={_(msg`Restart walkthrough`)}
              >
                <RotateCcw className="h-4 w-4" />
                <Trans>Restart</Trans>
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={goNext}
                disabled={!canAdvance}
              >
                {isLastStep(branch, step) ? (
                  <Trans>Finish</Trans>
                ) : (
                  <Trans>Next</Trans>
                )}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </footer>
        )}
      </div>
    </SectionContainer>
  );
}

/* ---------------------------------------------------------------------- *
 * Branch picker
 * ---------------------------------------------------------------------- */

interface BranchPickerProps {
  onPick: (id: string) => void;
}

function BranchPicker({ onPick }: BranchPickerProps) {
  const { _ } = useLingui();

  return (
    <div className="px-6 md:px-8 py-8 md:py-10 space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
          <Trans>Pick a path</Trans>
        </p>
        <h2 className="type-h2 text-balance">
          <Trans>What would you like to do with Archcore?</Trans>
        </h2>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
          <Trans>
            Each path is a short walkthrough with copy-pasteable commands.
            Branches that have both a plugin and a CLI flavor carry a toggle
            you can flip at any step.
          </Trans>
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-3">
        {BRANCHES.map((branch) => (
          <li key={branch.id}>
            <button
              type="button"
              onClick={() => {
                onPick(branch.id);
              }}
              className={cn(
                "group w-full text-left rounded-xl border border-border bg-background/60 px-5 py-4",
                "transition-all hover:bg-background hover:border-foreground/20",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 min-w-0">
                  <div className="text-base md:text-lg font-semibold leading-snug">
                    {_(branch.label)}
                  </div>
                  <div className="text-sm text-muted-foreground leading-snug">
                    {_(branch.blurb)}
                  </div>
                </div>
                <ChevronRight
                  className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden="true"
                />
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Step view
 * ---------------------------------------------------------------------- */

interface StepViewProps {
  branch: Branch;
  step: Step;
  stepIndex: number;
  total: number;
  mode: Surface;
  selectedId: string | undefined;
  onPick: (choiceId: string) => void;
  onModeChange: (next: Surface) => void;
}

function StepView({
  branch,
  step,
  stepIndex,
  total,
  mode,
  selectedId,
  onPick,
  onModeChange,
}: StepViewProps) {
  return (
    <div className="px-6 md:px-8 py-7 md:py-9 space-y-7">
      <StepIndicator current={stepIndex + 1} total={total} />

      <div className="space-y-2">
        <h2 className="type-h2 text-balance">{step.question}</h2>
        {step.description && (
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
            {step.description}
          </p>
        )}
      </div>

      {branch.supportsToggle && step.kind === "variant" && (
        <ModeToggle mode={mode} onChange={onModeChange} />
      )}

      {step.kind === "choice" && (
        <ChoiceList
          stepId={step.id}
          choices={step.choices}
          selectedId={selectedId}
          question={step.question}
          onPick={onPick}
        />
      )}

      {step.kind === "variant" && (
        <ExampleSurface variant={step.variants[mode]} />
      )}

      {step.kind === "info" && (
        <ExampleSurface
          variant={
            isExampleVariant(step.example) ? step.example : null
          }
          fallback={!isExampleVariant(step.example) ? step.example : null}
        />
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Choice list + selected example
 * ---------------------------------------------------------------------- */

interface ChoiceListProps {
  stepId: string;
  choices: Choice[];
  selectedId: string | undefined;
  question: React.ReactNode;
  onPick: (choiceId: string) => void;
}

function ChoiceList({
  stepId,
  choices,
  selectedId,
  question,
  onPick,
}: ChoiceListProps) {
  const selected = choices.find((c) => c.id === selectedId);

  // Choices are styled toggle buttons, not radios — we don't implement the
  // arrow-key navigation an ARIA radiogroup requires. `aria-pressed` matches
  // actual behavior (Tab visits each, Space/Enter activates).
  return (
    <div className="space-y-5">
      <div
        role="group"
        aria-label={typeof question === "string" ? question : undefined}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {choices.map((choice) => {
          const isSelected = choice.id === selectedId;
          return (
            <button
              key={choice.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => {
                onPick(choice.id);
              }}
              className={cn(
                "group text-left rounded-xl border p-4 md:p-5 transition-all",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2",
                isSelected
                  ? "border-foreground/30 bg-background ring-1 ring-foreground/15 shadow-sm"
                  : "border-border bg-background/60 hover:bg-background hover:border-foreground/20"
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isSelected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background"
                  )}
                >
                  {isSelected && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                <span className="flex flex-col gap-1 min-w-0">
                  <span className="text-sm md:text-base font-semibold leading-snug">
                    {choice.label}
                  </span>
                  {choice.blurb && (
                    <span className="text-xs md:text-sm text-muted-foreground leading-snug">
                      {choice.blurb}
                    </span>
                  )}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div
        key={`${stepId}:${selected?.id ?? "empty"}`}
        className="animate-in fade-in-0 duration-200"
      >
        {selected ? (
          <ExampleSurface
            variant={isExampleVariant(selected.example) ? selected.example : null}
            fallback={!isExampleVariant(selected.example) ? selected.example : null}
          />
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-background/40 px-5 py-8 text-center text-sm text-muted-foreground">
            <Trans>Pick an option to continue.</Trans>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Plugin / CLI toggle
 * ---------------------------------------------------------------------- */

interface ModeToggleProps {
  mode: Surface;
  onChange: (next: Surface) => void;
}

function ModeToggle({ mode, onChange }: ModeToggleProps) {
  const { _ } = useLingui();
  const baseClass =
    "px-3.5 py-1.5 text-xs md:text-sm font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/60";

  // Visually a tab strip, but semantically a button group: Tab/Shift+Tab moves
  // between buttons (no arrow-key navigation, no roving tabindex, no panel
  // wiring). `aria-pressed` matches actual behavior — see WAI-ARIA Button
  // pattern. A true tablist would require tabpanel + aria-controls on each
  // tab and arrow-key focus management on the strip.
  return (
    <div
      role="group"
      aria-label={_(msg`Plugin or CLI surface`)}
      className="inline-flex items-center gap-1 rounded-lg border border-border bg-background/60 p-1"
    >
      <button
        type="button"
        aria-pressed={mode === "plugin"}
        onClick={() => {
          onChange("plugin");
        }}
        className={cn(
          baseClass,
          mode === "plugin"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Trans>Plugin</Trans>
      </button>
      <button
        type="button"
        aria-pressed={mode === "cli"}
        onClick={() => {
          onChange("cli");
        }}
        className={cn(
          baseClass,
          mode === "cli"
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Trans>CLI</Trans>
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Example panel
 * ---------------------------------------------------------------------- */

interface ExampleSurfaceProps {
  variant: ExampleVariant | null;
  fallback?: React.ReactNode;
}

function ExampleSurface({ variant, fallback = null }: ExampleSurfaceProps) {
  if (!variant) {
    return <>{fallback}</>;
  }
  return (
    <div className="rounded-xl border border-border bg-[var(--color-code-bg)] overflow-hidden">
      <div className="px-4 py-2 border-b border-border/70 text-xs uppercase tracking-wider text-muted-foreground font-medium">
        {variant.caption}
      </div>
      <pre className="px-4 py-3 text-sm font-mono leading-relaxed text-foreground overflow-x-auto whitespace-pre-wrap break-words">
        {variant.command}
      </pre>
      {variant.outputLines && variant.outputLines.length > 0 && (
        <ul className="px-4 py-2.5 border-t border-border/70 text-xs md:text-sm text-muted-foreground space-y-1">
          {variant.outputLines.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      )}
      <div className="px-4 py-2.5 border-t border-border/70 text-xs md:text-sm text-muted-foreground">
        {variant.note}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Step indicator + Done panel
 * ---------------------------------------------------------------------- */

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
        <Trans>
          Step {current} of {total}
        </Trans>
      </span>
      <div
        className="flex items-center gap-1.5 flex-1 max-w-[220px]"
        aria-hidden="true"
      >
        {Array.from({ length: total }).map((_dot, i) => (
          <span
            key={i}
            className={cn(
              "h-1 rounded-full flex-1 transition-colors",
              i < current ? "bg-foreground/80" : "bg-border"
            )}
          />
        ))}
      </div>
    </div>
  );
}

interface DonePanelProps {
  branchId: string;
  mode: Surface;
  onRestart: () => void;
}

function DonePanel({ branchId, mode, onRestart }: DonePanelProps) {
  // The install branch has no toggle — its CTA depends on which path the user
  // ended on (their last `answers["choose-path"]`). The wizard doesn't pass
  // that here, so we send install-finishers to /plugin (the recommended
  // runtime) and trust the in-branch content already explained both paths.
  //
  // Branches 2-5 carry a real toggle — the CTA tracks whichever surface the
  // user last had selected on the wrap-up step.
  const ctaTo =
    branchId === "install" || mode === "plugin"
      ? INTERNAL_LINKS.plugin
      : INTERNAL_LINKS.cli;
  const ctaIsPlugin = ctaTo === INTERNAL_LINKS.plugin;

  return (
    <div className="px-6 md:px-8 py-10 md:py-12 text-center space-y-5">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
        <Check className="h-5 w-5" strokeWidth={3} />
      </div>
      <h2 className="type-h2">
        <Trans>You're all set.</Trans>
      </h2>
      <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
        <Trans>
          That's the gist. Pick another path to keep exploring, or jump
          straight to the install commands.
        </Trans>
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button asChild>
          <Link to={ctaTo}>
            {ctaIsPlugin ? (
              <Trans>Install plugin</Trans>
            ) : (
              <Trans>Install CLI</Trans>
            )}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          <Trans>Back to all paths</Trans>
        </Button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------- *
 * Helpers
 * ---------------------------------------------------------------------- */

function isExampleVariant(
  example: React.ReactNode | ExampleVariant | undefined
): example is ExampleVariant {
  return (
    typeof example === "object" &&
    example !== null &&
    "command" in example &&
    typeof example.command === "string"
  );
}

function defaultNextStepId(branch: Branch, currentStepId: string): string | undefined {
  const idx = branch.steps.findIndex((s) => s.id === currentStepId);
  if (idx < 0 || idx >= branch.steps.length - 1) return undefined;
  if (branch.steps[idx].terminal) return undefined;
  return branch.steps[idx + 1].id;
}

function isLastStep(branch: Branch, step: Step): boolean {
  if (step.terminal) return true;
  const nextId = step.next?.("") ?? defaultNextStepId(branch, step.id);
  return !nextId;
}
