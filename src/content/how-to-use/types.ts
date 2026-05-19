import type { ReactNode } from "react";
import type { MessageDescriptor } from "@lingui/core";

export type Surface = "plugin" | "cli";

export interface ExampleVariant {
  caption: ReactNode;
  command: string;
  outputLines?: ReactNode[];
  note: ReactNode;
}

export interface Choice {
  id: string;
  label: ReactNode;
  blurb?: ReactNode;
  example: ReactNode | ExampleVariant;
}

interface BaseStep {
  id: string;
  question: ReactNode;
  description?: ReactNode;
  next?: (answer: string) => string | undefined;
  // Marks the last step on a branching path. When true, the wizard treats the
  // step as a terminus instead of falling through to the next entry in the
  // `steps[]` array. Required for branches whose paths converge on a single
  // flat list (e.g. install: plugin-verify must not fall through to cli-os).
  terminal?: boolean;
}

interface ChoiceStep extends BaseStep {
  kind: "choice";
  choices: Choice[];
}

interface VariantStep extends BaseStep {
  kind: "variant";
  variants: Record<Surface, ExampleVariant>;
}

interface InfoStep extends BaseStep {
  kind: "info";
  example: ReactNode | ExampleVariant;
}

export type Step = ChoiceStep | VariantStep | InfoStep;

export interface Branch {
  id: string;
  label: MessageDescriptor;
  blurb: MessageDescriptor;
  supportsToggle: boolean;
  steps: Step[];
}
