/**
 * Landing-only helper for the three FAQ accordions (home, /plugin, /cli).
 *
 * They share an identical shape — a `faqs` array rendered into Radix
 * AccordionItems keyed `item-<index>` — so the open handler is written once
 * here instead of three times. Unlike core.ts this file is not shared with the
 * Astro surfaces; it knows about Radix's value convention.
 */

import { track } from "./core";

/**
 * Builds an `onValueChange` handler that reports which question was opened.
 * Collapsing fires with an empty value and is deliberately not reported.
 */
export function faqOpenHandler(
  faqs: readonly { question: string }[],
  surface: string
): (value: string) => void {
  return (value) => {
    if (!value) return;
    const position = Number(value.replace("item-", ""));
    const faq = faqs[position];
    if (!faq) return;
    track("faq_item_opened", { question: faq.question, position, surface });
  };
}
