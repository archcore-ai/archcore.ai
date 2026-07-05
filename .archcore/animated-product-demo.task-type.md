---
title: "Build an animated product demo (scripted animation exported to GIF/video)"
status: accepted
---

## What

Create a react.doctor-style product demo: a scripted agent-session animation defined as code (no screen recording) and exported to GIF/WebM/MP4. The scenario lives in **one file** — `scripts/demo-export/demo.html` — driven by a deterministic `seek(t)` function, captured frame-by-frame in headless Chrome, and assembled with ffmpeg. The landing hero embeds the exported GIF (`public/demo.gif`); the same GIF is reused in repository READMEs and socials.

Existing implementation:

- `scripts/demo-export/demo.html` — the scenario: timeline-driven DOM animation in DESIGN.md palette, plus a branded end card. Self-playing when opened in a browser (preview); `window.seek(t)` for capture.
- `scripts/demo-export/export.mjs` — captures frames (`deviceScaleFactor: 2`, 15fps) and assembles `out/demo.gif` (800px, 12fps, 128 colors, ~2.2 MB), `out/demo.webm` (VP9, ~0.35 MB), `out/demo.mp4` (H.264), `out/poster.png`.
- `src/components/sections/hero-section.tsx` — embeds `/demo.gif` as a plain `<img>` (`rounded-[16px]`, no border: the GIF's baked-in cream stage blends with the identical page background).

## When to use

- Adding or reworking the product demo on the landing page.
- Producing a demo GIF for a repository README or social posts.
- Any "show the agent behavior change" asset: the scenario pattern is *prompt → agent checks context (MCP tool call) → found typed documents → code following the rules → decision captured back*.

## Steps

1. **Edit the scenario as a timeline** in `demo.html`, not as a recording. Each element gets `data-t` (appear time, ms); typed text gets `data-type-start`/`data-type-end` and renders `text.slice(0, len * progress)` so timing is length-independent. Keep the canonical messaging: sell the *agent behavior upgrade*, not document counts (see `messaging-alignment` rule; scenario source of truth is the CLI README "See it work" section).
2. **Keep rendering a pure function of time.** A single `seek(t)` sets `display`/`opacity`/`transform` for every element from `t`. The only stateful part is monotonic scroll smoothing (`scrollPos += (target - scrollPos) * 0.22`, reset when `t < lastT`).
3. **Preview** by opening `demo.html` directly in a browser — it self-plays in a loop.
4. **Export**: `cd scripts/demo-export && npm install && node export.mjs`. Artifacts land in `out/` (gitignored).
5. **Publish**: copy `out/demo.gif` to `public/demo.gif` for the hero embed; copy to other repos' READMEs as needed. Prefer WebM/MP4 wherever `<video>` is allowed — it is ~6× smaller at 2× resolution.

## Expected outcome

- Landing hero shows the ~18.6s looping agent-session demo via `public/demo.gif` (~2.2 MB, infinite loop). A GIF animates for everyone — including users with OS-level "Reduce Motion" enabled, which freezes rAF-driven live components.
- `out/demo.gif` ready to drop into any README; `out/demo.webm` for web `<video>` embeds.
- Demo strings are deliberately **not** in Lingui (an agent session is a product screenshot — commands, code, and tool calls are not localized).

## Pitfalls

- **A live rAF component silently freezes under "Reduce Motion".** A respectful `prefers-reduced-motion` static-frame fallback reads as "the demo is broken" to users with that OS setting (common on macOS). That is why the hero embeds a GIF instead of the live DOM animation — GIFs play regardless.
- **macOS Preview does not play GIF animation** — it lists frames as pages. Verify GIFs in a browser, not Preview.
- **Hidden-but-laid-out items break scrolling.** `opacity: 0` elements still occupy height, so "scroll to bottom" targets future content and the frame looks empty. Use `display: none` until an item's `data-t`.
- **Mono-font ligatures mangle code.** JetBrains Mono renders `!=` as `≠` and `:=` as a ligature. Set `font-variant-ligatures: none; font-feature-settings: "liga" 0, "calt" 0` on all terminal/code text.
- **GIF is the compatibility format, not the quality format.** 800px GIF ≈ 2.2–3 MB vs 1600px WebM ≈ 0.35 MB. Palette settings that keep GIF sane: `fps=12`, `palettegen=max_colors=128:stats_mode=diff`, `paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle`, lanczos downscale from 2× frames. Verify the loop: `-loop 0` → NETSCAPE2.0 extension with count 0.
- **Capture must be sequential.** Scroll smoothing is stateful; frames must be captured in increasing `t` order (the export script does this).
- **The GIF is light-theme only.** Its baked-in cream stage blends with the light page background and stands out as a light block in dark mode. If that ever matters, export a dark variant (swap the CSS variables in `demo.html`) and switch by theme.
- **eslint/type-check surface.** `scripts/` is excluded in `eslint.config.js` globalIgnores; keep export code there, not under `src/`.
