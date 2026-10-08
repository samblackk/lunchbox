---
version: 0.5.0
name: Neon Anomaly
theme: light
# One ink, one paper, five washes. Reference the semantic name in code, never a
# raw value, so a surface can be re-picked here without touching a component.
colors:
  page:           "#ffffff"
  surface-1:      "rgba(141, 210, 206, 0.15)"
  text-primary:   "#000000"
  text-secondary: "#000000"
  text-muted:     "#60656c"
  border:         "rgba(141, 210, 206, 0.25)"
  border-strong:  "rgba(0, 0, 0, 0.46)"
  grid:           "rgba(0, 0, 0, 0.08)"
  axis:           "rgba(0, 0, 0, 0.25)"
  accent:         "#000000"
  accent-ink:     "#ffffff"
  success:        "#006300"
# Contrast, measured. Ink on paper 21.00. Muted 5.87 on paper and 4.64 on the
# worst composite it can land on, a tinted panel over the peach wash. Success
# 7.54. border-strong 3.47, which clears the 3:1 floor for a control edge;
# border is 1.2 and decorative by design.
washes:
  ice:    "#eaf9ff"
  peach:  "#ffe6d7"
  blush:  "#fdf1f8"
  mint:   "#ebffee"
  lemon:  "#f7fbe8"
  sweep:  "linear-gradient(100deg, #8fd7f5 0%, #f9b8dd 52%, #ffc49a 100%)"
# Ink clears 17.5 on every wash, peach being the darkest, and 12.9 at every
# stop of the sweep. None of them is load-bearing for contrast.
on-ink:
  text-primary:   "#ffffff"
  text-secondary: "rgba(255, 255, 255, 0.92)"
  text-muted:     "rgba(255, 255, 255, 0.72)"
  border:         "rgba(255, 255, 255, 0.35)"
  surface-1:      "rgba(255, 255, 255, 0.12)"
  accent:         "#ffffff"
  accent-ink:     "#000000"
# Paper on ink is 21.00, the 92% tint 17.55 and the 72% tint 10.54, so unlike
# a colored fill this panel has room for a quieter gray. The border sits at 3.01.
charts:
  note: light steps, chosen for a light surface
  series-1: "#2a78d6"
  series-2: "#eb6834"
  series-3: "#1baf7a"
  series-4: "#eda100"
  series-5: "#e87ba4"
  series-6: "#008300"
  series-7: "#4a3aa7"
  diverge-pos: "#2a78d6"
  diverge-neg: "#e34948"
  diverge-mid: "#f0efec"
  seq-empty: "#f0efec"
  seq-100: "#cde2fb"
  seq-250: "#86b6ef"
  seq-350: "#5598e7"
  seq-450: "#2a78d6"
  seq-600: "#184f95"
# Fills, not text. On paper these run from 8.56 down to 2.17, so a series color
# never carries a word: label in ink, and let the fill mean the category.
typography:
  root-size: 17px
  size-fine: 11px
  family-body: "Inter, system-ui, -apple-system, Segoe UI, sans-serif"
  family-display: "Darker Grotesque, Inter, sans-serif"
  family-mono: "ui-monospace, SFMono-Regular, Menlo, monospace"
  body:    { fontWeight: 400, lineHeight: 1.55, letterSpacing: 0 }
  strong:  { fontWeight: 700 }
  display: { fontWeight: 900, lineHeight: 0.82 }
rounded:
  default: 16px
# Stroke widths. A border is the only separator this system has, so its weight
# is a decision rather than a default.
strokes:
  hairline:     1px
  focus:        2px
  focus-offset: 2px
# The column content holds to, and the width where a two-up grid earns its
# second column. Media queries cannot read a custom property, so the breakpoint
# is named here and written as a literal in the query.
layout:
  measure:    768px
  breakpoint: 640px
  edge:       50px
motion:
  duration: { default: 200ms }
  easing:   { default: "cubic-bezier(0.4, 0, 0.2, 1)" }
---

# Neon Anomaly DESIGN.md

Portable design context in the [DESIGN.md](https://atlassian.design/DESIGN.md)
format: machine-readable tokens above, intent below. Copy into a project as
`design.md` and evolve it there. Values come from
`neonanomalyio/marketing-site`, so the properties read as one.

## Overview

### About this file

The frontmatter is the contract; a hook blocks UI values it does not name. The
prose says why, which a token table cannot carry.

**Use existing components. Do not rebuild them from these specs.** Component
notes describe what exists so you recognize it. Import from the project's
library if it has one, and keep per-component detail in
`design/components/*.md`, read only when working on that component.

### Brand and style

Black ink on paper, a few very pale washes drifting across the page, and no
accent color anywhere. The reference is a printed document rather than a
product UI: warm, understated, willing to leave space empty.

Emphasis is weight, never color, which is why `text-primary` and
`text-secondary` are the same value. The only thing that steps back is the
small print.

## Colors

One ink, pure black. Where a design needs an accent, a filled button or the
rule under a link, the answer is ink, with `accent-ink` on top.

Surfaces are a pale teal at low alpha rather than a mixed hex, so a card sits
*on* the wash behind it: a panel over the peach reads warmer than the same
panel over the ice, which is what paper does. Use `surface-1`, not a new gray.

The five washes are sampled from the source document and are decoration only.
Mint is the exception: the one filled color, spent on a closing band, and
nothing else should reach for it. On an ink fill, use the `on-ink` set, which
has room for a quieter gray that a colored fill would not.

### Charts

The categorical order is the colorblind-safety mechanism, not a palette. Use
`series-*` slots **in order** and never cycle them. These are the light steps
of the reference palette, picked for a light surface rather than inverted from
the dark ones. Diverging runs warm against cool with a neutral midpoint.
Sequential is magnitude only; `seq-empty` is the "no activity" step, one shade
off the card surface, so a quiet day recedes instead of reading as a hole
punched in the grid.

## Typography

Root is 17px, one step above the browser default, so every rem-based size grows
with it rather than each component being nudged by hand.

Inter carries prose at regular weight, normal tracking, leading tight enough
that a paragraph reads as a block. Darker Grotesque Black sets the greeting and
every heading. It carries unusual space above and below its glyphs, so each
heading names its own leading; at the default it floats in its line box.

`typography.size-fine` is 11px, the floor. It is for the word on a control that
names what the control does, never for anything anyone has to read twice.

The display face is display only. Load the real italic rather than letting the
browser synthesize one.

## Shapes

`rounded.default` is 16px, the corner the source document rounds its cards to.

`strokes.hairline` is the one border weight. `strokes.focus` and
`strokes.focus-offset` size the focus ring, which is an outline rather than a
border so it never changes layout when it appears.

## Layout

`layout.measure` is 768px, the column every page holds its content to. Reading
width is the constraint, so a wider window gets more margin rather than longer
lines.

`layout.breakpoint` is 640px, the one width this system changes its mind at.
Below it, everything is a single column. Above it, a grid may take a second.
One breakpoint rather than a scale: a layout that needs four is usually a
layout that should have stayed in one column.

`layout.edge` is 50px of air held clear above the header and below the footer,
so a page never starts or ends flush against the window. Separation between
bands is space, not a rule, which is the same reason this system has no
shadows.

## Elevation and depth

Separation is a border and a change of surface, not a shadow.

## Theming

This brand is light only and declares `color-scheme: light`. A project that
needs dark adds a second value per token here first, and measures it. Do not
invert these: a paper palette inverted is a different brand, not the same one
at night. Never branch on theme inside a component, which is what the semantic
names are for.

## Components

Specs live in `design/components/`, one file each, read on demand. Each records
resting appearance **and every state**: hover, focus, active, disabled,
loading. Before writing one, check whether this project already has it.

## Do's and don'ts

**Do** emphasize with weight, use `surface-1` for raised areas, the `on-ink`
set on ink fills, chart slots in order, and existing components.

**Don't** invent a gray, reach for mint outside a closing band, set a series
color as text, use the display face below display sizes, carry emphasis in
color, or use a hex or px value absent from the frontmatter.

## Motion

One duration and one curve for every transition, so a hover on a chip and a
hover on a link settle at the same moment. Motion explains a change of state.
Honor `prefers-reduced-motion`.

## Accessibility

4.5:1 for body text, 3:1 for large text and meaningful boundaries. Never carry
meaning in color alone. Anything that responds to a click says so with
`cursor: pointer`, including elements built from spans and labels. Holds at
320px wide and at 200% zoom.

## Changelog

A system without a history becomes values nobody dares change.

- 0.5.0 Added `typography.size-fine`. Control labels had been drifting toward
  arbitrary fractions of a rem to land near 11px, which is the kind of value
  the frontmatter exists to settle once. Naming the floor also makes it obvious
  when something is reaching below it.
- 0.4.0 Added `strokes` and `layout`. The hairline and focus ring were being
  written as bare pixel values, which the frontmatter is supposed to forbid, and
  the docs site needed a measure, a breakpoint and an edge to hold content to.
  Project decisions, not brand ones, but they belong in the contract either way.
- 0.3.0 Rebrand. The studio's dark palette is gone: no `#191919` page, no rust
  accent, no Public Sans at 300. What replaces it is a printed document, black
  ink on paper with five pale washes. Chart ramps are now the light steps,
  which closes the open item below. Light only, so the `{ light, dark }` pairs
  are gone and dark is a project decision again.
- 0.2.0 Light theme added by inverting the dark one, chart ramps left dark-only.
- 0.1.0 Base created in DESIGN.md format from `neonanomalyio/marketing-site`.
