---
name: humangrl
version: "1.0"
description: >
  Scrapbook-aesthetic personal site. Cream base, cobalt ink, lime highlight.
  Y2K/Neocities bedroom-internet vibe — pixel fonts, window chrome, manila folder tabs.

colors:
  background: "#f6f0dc"
  background-elevated: "#fbf6e6"
  background-sunken: "#ebe0bf"
  surface: "#fffdf3"
  primary: "#2c5fb3"
  primary-light: "#6f9ddb"
  primary-dark: "#1c3f7c"
  accent: "#cfd64a"
  accent-dark: "#b3bb35"
  text: "#1f2a4a"
  text-secondary: "#4a5374"
  text-muted: "#8a8fa6"
  highlight: "#d97e8a"
  shadow: "rgba(28, 36, 60, 0.12)"

typography:
  families:
    display: ["Kuchibue", "rainyhearts", "Courier New", "monospace"]
    ui: ["rainyhearts", "Courier New", "ui-monospace", "monospace"]
    body: ["ui-rounded", "Hiragino Maru Gothic ProN", "Quicksand", "system-ui", "sans-serif"]
  scale:
    xs: "0.8rem"
    sm: "0.85rem"
    base-ui: "0.95rem"
    md: "1rem"
    lg: "1.2rem"
    xl: "1.6rem"
    2xl: "2.4rem"
    hero: "4.5rem"
  base-size: "16px"
  line-height:
    tight: "1.1"
    snug: "1.3"
    normal: "1.4"
    relaxed: "1.5"
    loose: "1.6"
  letter-spacing:
    normal: "0.02em"
    wide: "0.03em"
    wider: "0.04em"

spacing:
  gutter: "24px"
  rail-width: "72px"
  page-max-width: "1180px"
  xs: "4px"
  sm: "8px"
  md: "14px"
  lg: "24px"
  xl: "48px"

radii:
  xs: "2px"
  sm: "4px"
  md: "6px"
  full: "50%"

borders:
  standard: "1.5px solid #2c5fb3"
  subtle: "1.5px solid #6f9ddb"
  dashed: "1.5px dashed #6f9ddb"
  chrome-inner: "1.5px solid #1c3f7c"

shadows:
  sm: "2px 2px 0 rgba(28, 36, 60, 0.12)"
  base: "3px 3px 0 rgba(28, 36, 60, 0.12)"

breakpoints:
  xs: "350px"
  sm: "576px"
  md: "768px"
  lg: "992px"
  xl: "1200px"

motion:
  duration:
    fast: "0.12s"
    base: "0.15s"
    slow: "0.2s"
    expand: "0.25s"
    spin: "20s"
    spin-slow: "25s"
    pulse: "3s"
    shimmer: "3s"
    blink: "1s"
  easing:
    default: "ease"
    expand: "cubic-bezier(0.4, 0, 0.2, 1)"
    step: "steps(2)"
  keyframes:
    - blink
    - sparkle-pulse
    - waveform-shimmer
    - gentle-spin
    - gentle-float

elevation:
  rail: 10
  popup: 5
  content: 1

selection:
  background: "#cfd64a"
  color: "#1c3f7c"
---

## Look & Feel

Humangrl is a scrapbook left open on a bedroom floor sometime around 2003 — cream paper, cobalt ink, lime sticky-note tabs sticking out at odd angles. It smells like dial-up and late nights. The halftone dot grid pressed into the background (cobalt-light dots, 10px apart) gives the whole page a slight texture, like a photocopied zine. Pixel fonts render every label and heading as if typed on a machine that didn't quite know it was a computer yet. The cursor is a custom sprite. This is a personal web page in the oldest, most loving sense of the phrase.

The aesthetic is warm but precise. Nothing is fuzzy or washed out. The window chrome is sharp, the borders are exactly 1.5px, the shadows are flat and offset by 3px — no blur, no softness, just a hard retro drop. Elements are stacked, layered, and slightly crowded the way a real scrapbook is crowded: intentionally, affectionately.

---

## Color

Three colors do almost all the work.

**Background (`#f6f0dc`)** is warm cream — the page itself, the paper. It's not white; it's aged, slightly yellow, like stationery that's been sitting in a drawer. Slightly lighter (`#fbf6e6`) for icon rail backgrounds and folder tab faces. Slightly darker (`#ebe0bf`) for sunken or fallback states.

**Primary (`#2c5fb3`)** is cobalt — deep, saturated blue. It's the ink. Window chrome bars are cobalt. Border strokes are cobalt. Links and headings are cobalt. The lighter variant (`#6f9ddb`) handles secondary borders and subtle UI surfaces. The darker variant (`#1c3f7c`) anchors heading text and hover states.

**Accent (`#cfd64a`)** is lime — sharp, electric yellow-green. It highlights. The status bar runs on lime. Text selection uses lime as its background. Folder tab ears are lime. It's a utility color, not a decorative one — it marks things, it calls attention.

**Surface (`#fffdf3`)** is the near-white used inside windows and cards — purer than the background cream but still warm.

**Highlight (`#d97e8a`)** is a dusty rose used sparingly — hearts, small affectionate details. It doesn't lead; it appears unexpectedly and softly.

**Text (`#1f2a4a`)** is dark navy-ink, not black. Secondary text (`#4a5374`) is the same hue softened. Muted text (`#8a8fa6`) is slate-grey, used for footer copy and descriptions.

Text selection highlights in lime (`#cfd64a`) with cobalt-dark (`#1c3f7c`) text — so even the act of selecting text feels on-brand.

---

## Typography

Two pixel fonts carry the personality. A soft system font handles reading.

**Kuchibue** is the display font — used for the site wordmark, headings, and window titles. Wide, dreamy, slightly quirky pixel letterforms. Set at `letter-spacing: 0.02em` and rendered in cobalt-dark for headings.

**Rainyhearts** is the UI font — used for navigation labels, button text, folder tab labels, status bar text, and all chrome. It's a bitmap-style pixel font that reads like a hand-labelled cassette case. Uppercase in window chrome (`letter-spacing: 0.04em`). Lowercase in navigation labels, intentionally.

**Body text** falls back to the system's rounded sans-serif: `ui-rounded`, Hiragino Maru Gothic ProN, Quicksand. Soft, approachable, comfortable for reading paragraphs. Base size 16px, line-height 1.5.

The type scale runs from `0.8rem` (tiny go-link labels) up through `4.5rem` (wordmark on desktop). Window chrome sits at `0.95rem`; body UI at `0.95rem`; section headings at `1.6rem`; the page h1 at `2.4rem`.

---

## Layout

A fixed **icon rail** (72px wide) runs down the left edge of the viewport — a vertical navigation bar of circular dot icons with rainyhearts labels below each. On mobile it collapses to a horizontal strip across the top.

The **page container** is max-width 1180px, centered, with 24px horizontal gutter. Pages offset themselves 72px from the left edge to clear the rail.

The **home page grid** is three columns: `280px | 1fr | 280px`. Left column holds the archive cabinet; center holds the hero illustration and welcome popup; right holds the navigation chooser. At `lg` breakpoint the grid becomes single-column. Individual sections collapse earlier on their own terms.

Other page types use a **two-sidebar grid** (`220px | 1fr | 220px`), dropping the right column at `lg` and the left at `sm`.

---

## Window Chrome

The central UI pattern. Almost every content block is a **window** — a bordered panel with a cobalt titlebar strip, uppercase rainyhearts title, and a `⊠` close button (decorative, not functional). The body is surface-white (`#fffdf3`). Border is 1.5px cobalt. Shadow is `3px 3px 0` flat offset — no blur.

Window titles follow `.EXE` filename conventions: `ARCHIVE_CABINET.EXE`, `WELCOME.MSG`, `NOW_PLAYING.WAV`, `MOOD.TODAY`. All caps, all period-separated, all evocative of a filesystem that has feelings.

A **nested inner variant** uses cobalt-light chrome instead of cobalt, a smaller `0.85rem` title, and a cream-light body — used when one window contains another (e.g. the "choose a door" chooser inside HOME_BASE.EXE).

---

## Folder Tabs

The archive navigation uses **manila folder tab** styling. Each item in the list is a folder with:

- A **lime "ear"** tab above it (an absolutely-positioned `::before` pseudo-element, `4px 4px 0 0` radius, no bottom border). Ear positions shift per child — each folder's tab is slightly offset left or right from the previous one, mimicking a real filing cabinet where tabs alternate.
- A **folder face** (cream-light background, cobalt-light border, rainyhearts text) that's always visible.
- A **slide-down body** that expands on hover: `max-height` from 0 to 80px over `0.25s cubic-bezier(0.4, 0, 0.2, 1)`, with a `translateY(-4px) → 0` lift effect. The body shows a description line and an "open →" go-link.

On hover, the folder ear goes lime-dark, the face upgrades to a full cobalt border with a `2px 2px 0` shadow, and the icon scales up 15%.

---

## Door Buttons

The primary navigation list uses **door buttons** — full-width links with a colored cobalt `→` arrow badge on the left (22×18px, 2px radius). On hover the button background flashes to lime, shifts 3px right (`translateX(3px)`), and gains the sm shadow. The arrow badge shifts to cobalt-dark.

Button colors cycle: first button gets cobalt arrow, second gets cobalt-light, third gets lime-dark (with dark text), cycling back. This prevents the list from reading as a monotone block.

---

## Status Bar

A lime (`#cfd64a`) horizontal band directly below the wordmark, spanning the full gutter width. Cobalt-dark text, rainyhearts font, uppercase, `letter-spacing: 0.02em`. The text starts with a `>>` prefix, shows a status message, and ends with a blinking `*` cursor (1s, steps(2) — hard digital blink, no fade).

On the home page: `HOME PAGE: LANDING ZONE LOADED. WHO GOES THERE?` — terminal-style, present-tense, slightly combative in the best way. A bottom border in lime-dark gives it a thin underline of its own.

---

## Decorative Layer

A `.scrapbook` wrapper (position: relative) holds absolutely-positioned `.scrapbook__bit` children that float behind the main content. On the home page these include:

- An SVG spiral (lime stroke, top-left, slow 20s rotation, 0.55 opacity)
- A star badge image (bottom-right, 0.18 opacity)
- A cloud-stars image (bottom-center, 0.12 opacity)
- Unicode sparkle glyphs (`✦` and `+`) scattered at various positions, pulsing via `sparkle-pulse` (3–4s ease-in-out, scaling 1→1.2, opacity 0.3→0.8)

All scrapbook elements are `aria-hidden="true"` and have `pointer-events: none`. All animations are disabled under `prefers-reduced-motion: reduce`.

The **page background itself** is a decoration: a double-offset halftone dot pattern using two layered `radial-gradient` calls, 0.8px cobalt-light dots on a 10px grid, `background-attachment: fixed`. It tiles behind all content and is subtle — more texture than pattern.

The footer has a **spiral badge** (SVG text in a circle) that rotates at 25s. It sits bottom-right, 0.6 opacity at rest, fades to 1 on hover.

---

## Custom Cursors

The default cursor is a pixel-art arrow sprite (`cursor1.png`). Interactive elements — links, buttons, folder tab links, door buttons, icon rail links — switch to an animated GIF pointer (`cursor2.gif`). This is non-negotiable and deeply on-brand.

---

## Voice & Copy

Navigation labels are **lowercase**: `home`, `music`, `diary`, `links`, `about`. Window titles are **ALL CAPS with `.EXE` / `.WAV` / `.MSG` suffixes**. Status bar messages are shouted in uppercase. Welcome copy is quiet and lowercase. Archive folder labels use the format `01_journal`, `02_projects` — the underscore-number prefix is a filing system aesthetic, not a technical requirement.

Copy is short, present-tense, and a little dreamy. "step inside. explore. dream. you're exactly where you need to be." Nothing is clicked here; things are entered, opened, and discovered.

---

## Accessibility Notes

- **Skip links** (`#skip-to-content-link`, `#skip-to-content-link2`) are visually hidden until focused, then appear top-left in a cobalt-on-paper chip.
- All decorative images and SVGs carry `aria-hidden="true"` and empty `alt=""`.
- Interactive icon rail items use `aria-label` via component context.
- Text selection is styled with lime background / cobalt-dark text for contrast (not just aesthetic).
- All animations check `prefers-reduced-motion: reduce` and disable keyframe animations where present.
- Status bar uses `role="status"` for live region announcements.
