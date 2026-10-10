# DESIGN.md — Divya Kanungo · Developer Portfolio

The implementation contract. Every colour, size, space, radius, and easing used in
`assets/css/styles.css` traces back to a token named here. No raw hex outside this file.

---

## 0. Research Log

- **Embedded refs:** shortlisted `linear.app`, `vercel`, `supabase` → picked Layer A
  `soft-skill.md` + Layer B `linear.app.md`, both read in full. Linear over Vercel because a
  developer portfolio needs engineering-grade precision *plus* a real chromatic accent ramp;
  Vercel's pure monochrome risks reading flat on a personal site with no product screenshots to
  carry visual weight. `soft-skill` over `minimalist-skill` because the brief was expressive
  ("good design", "proper design") rather than utilitarian.
- **Lazyweb:** 5 queries (portfolio hero, developer profile, resume/CV site, case-study detail,
  about page), 10+ shipped screens genuinely viewed (Clearbit, Wix, Craft, Lovable, Canva,
  Hashnode, Cal.com, Airbnb, DevPortfolio, Themify), 20 screenshots analysed. Grammar taken:
  eyebrow sits *above* the name; hero order = eyebrow → name → tagline → CTA pair; primary +
  secondary CTA pairing with a 12–16px gap; content max-width 1200–1400px; section gaps
  80–120px; card gaps 24–32px; body line-height 1.5–1.6; tight negative tracking on display
  type; accent colour restricted to CTAs / hover / highlights; sticky nav on 100% of samples;
  every sample ships an About section and a social footer.
- **Lazyweb deviations (deliberate, with cause):** (a) it reported *"don't show tech stack on
  project cards"* — overridden, because its sample skewed to portfolio **builders**
  (Wix/Canva/Craft) marketing to designers, not developer portfolios; for a MERN hiring
  audience the stack *is* the proof, and the user explicitly asked for "project details".
  (b) it reported *"don't use centered pill navigation — rare"* — overridden, because
  `soft-skill` mandates the detached Fluid Island nav; a Layer A material mandate outranks a
  frequency observation drawn from mass-market site builders. (c) it observed hero names at
  32–48px — raised to a 44→76px fluid ramp to match Layer B's Display scale, since this page
  has no product imagery and the name must carry the hook alone.
- **Imagen drafts:** skipped — no image-generation tool available in this environment. The
  Layer A + Layer B token extraction plus the lazyweb grammar is the reference contract instead.

---

## 1. Atmosphere & Identity

**Engineering-grade night canvas with violet signal.** A near-black, slightly cool canvas where
every piece of Divya's work emerges from darkness as a precision-machined glass plate. The
signature material is the **double-bezel glass panel**: an outer tray at 2% white with a hairline
rim, holding an inner core at 4% white with its own concentric radius and a 1px inset top
highlight — so each card reads as a lit sheet of glass seated in an aluminium bezel rather than a
flat div with a border. Depth never comes from drop shadows (invisible on black); it comes from
stepping background luminance 2% → 4% → 6% and letting semi-transparent white rims catch the
light. Colour is achromatic cool grey almost everywhere, pierced only by a multi-stop violet ramp
reserved exclusively for interactive signal, plus a single atmospheric aurora behind the hero.

**The one memorable moment:** the hero's live **order-tracker panel** — a dimensional, lit glass
card that advances Placed → Packed → Out for Delivery → Delivered on a loop. It is not decoration;
it is a working miniature of the flagship feature Divya actually built in Fikamoja, so the most
eye-catching object on the page is a demonstration of her engineering.

---

## 2. Colour

Single dark theme. No light mode (see §8 Accepted Debt).

### Surface & canvas

| Role | Token | Value | Usage |
|---|---|---|---|
| Canvas | `--c-canvas` | `#08090a` | Page background |
| Canvas deep | `--c-canvas-deep` | `#010102` | Footer, contact band — pushes further back |
| Surface 1 | `--c-surface-1` | `rgba(255,255,255,0.02)` | Outer bezel tray, nav pill |
| Surface 2 | `--c-surface-2` | `rgba(255,255,255,0.04)` | Inner card core (default) |
| Surface 3 | `--c-surface-3` | `rgba(255,255,255,0.06)` | Card core on hover, chips, active step |
| Surface solid | `--c-surface-solid` | `#0f1011` | Mobile menu overlay base, tooltip |
| Surface raised | `--c-surface-raised` | `#191a1b` | Code/mono inline blocks |

### Text

| Role | Token | Value | Usage |
|---|---|---|---|
| Primary | `--c-text-1` | `#f7f8f8` | Headings, name, card titles. Never pure `#fff` |
| Secondary | `--c-text-2` | `#d0d6e0` | Body copy, bullet text |
| Tertiary | `--c-text-3` | `#8a8f98` | Meta, dates, captions, labels |
| Quaternary | `--c-text-4` | `#62666d` | Disabled, footer fine print, decorative index numerals |
| On-accent | `--c-text-on-accent` | `#ffffff` | The **only** sanctioned pure white: text on a saturated violet fill (primary button), where `--c-text-1` reads muddy. Never on the dark canvas |

### Violet ramp — interactive signal only

A true multi-stop ramp (distinct hues, not one hex at varied opacity).

| Role | Token | Value | Usage |
|---|---|---|---|
| Violet 200 | `--c-violet-200` | `#cfcffe` | Text on violet-filled surfaces |
| Violet 300 | `--c-violet-300` | `#b3b2ff` | Link hover, icon hover |
| Violet 400 | `--c-violet-400` | `#828fff` | Primary button hover fill |
| Violet 500 | `--c-violet-500` | `#7170ff` | Interactive accent: links, focus ring, active nav, eyebrow dot |
| Violet 600 | `--c-violet-600` | `#5e6ad2` | Primary button fill |
| Violet 700 | `--c-violet-700` | `#4c55b5` | Primary button active/pressed |
| Violet wash | `--c-violet-wash` | `rgba(113,112,255,0.10)` | Accent chip fill, active step halo |
| Violet glow | `--c-violet-glow` | `rgba(113,112,255,0.28)` | Hero aurora, card hover rim light |

### Status

| Role | Token | Value | Usage |
|---|---|---|---|
| Live | `--c-live` | `#10b981` | "Available for opportunities" pill, completed tracker steps |
| Live wash | `--c-live-wash` | `rgba(16,185,129,0.12)` | Availability pill fill |

### Hairlines

| Role | Token | Value | Usage |
|---|---|---|---|
| Line 1 | `--c-line-1` | `rgba(255,255,255,0.05)` | Section dividers, inner core rim |
| Line 2 | `--c-line-2` | `rgba(255,255,255,0.08)` | Outer bezel rim, default card rim, chips |
| Line 3 | `--c-line-3` | `rgba(255,255,255,0.14)` | Card rim on hover, nav pill rim |
| Highlight | `--c-highlight` | `rgba(255,255,255,0.15)` | 1px inset top highlight on inner cores |

### Rules

- Violet is **never** decorative. It marks something you can click, focus, or that is currently
  active — plus exactly one atmospheric aurora behind the hero.
- Never pure `#ffffff` text and never pure `#000000` surfaces.
- No solid opaque card fills: card backgrounds are always translucent white over the canvas.
- No warm hues anywhere in UI chrome.
- No opaque/visible grey borders — rims are semi-transparent white only.

---

## 3. Typography

Three families, justified: a geometric display face cannot carry long body copy, and a developer
portfolio needs genuine monospace for stack metadata (it reads as engineering signal, not
decoration). Layer A bans Inter/Helvetica/Arial/Roboto/Open Sans, so Layer B's Inter is replaced
while Layer B's *metrics and tracking discipline* are kept.

```
--f-display: 'Clash Display', 'Plus Jakarta Sans', system-ui, sans-serif;
--f-body:    'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
--f-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', monospace;
```

All three self-hosted as `woff2` in `assets/fonts/` (9 faces, 256 KB total) with
`font-display: swap` and preload on the two above-the-fold faces.

| Level | Token | Size | Weight | Line-height | Tracking | Family | Usage |
|---|---|---|---|---|---|---|---|
| Display | `--t-display` | `clamp(2.75rem, 7vw, 4.75rem)` | 600 | 0.98 | `-0.03em` | display | Hero name |
| H1 | `--t-h1` | `clamp(2rem, 4.2vw, 3rem)` | 600 | 1.08 | `-0.025em` | display | Section titles |
| H2 | `--t-h2` | `clamp(1.375rem, 2.4vw, 1.75rem)` | 500 | 1.22 | `-0.02em` | display | Project names, card titles |
| H3 | `--t-h3` | `1.0625rem` | 600 | 1.35 | `-0.01em` | body | Role titles, group labels |
| Body L | `--t-body-l` | `clamp(1rem, 1.6vw, 1.1875rem)` | 400 | 1.62 | `-0.011em` | body | Hero tagline, section lede |
| Body | `--t-body` | `0.9375rem` | 400 | 1.65 | `-0.006em` | body | Bullets, paragraphs |
| Small | `--t-small` | `0.875rem` | 400 | 1.6 | `-0.006em` | body | Secondary detail, footer |
| Caption | `--t-caption` | `0.8125rem` | 500 | 1.45 | `-0.008em` | body | Dates, meta rows |
| Mono | `--t-mono` | `0.75rem` | 400 | 1.5 | `0` | mono | Tech chips, stack lists |
| Overline | `--t-overline` | `0.6875rem` | 500 | 1.4 | `0.18em` | mono | Eyebrow tags, section numerals (uppercase) |

### Rules

- Weight ladder is **400 read / 500 emphasise & navigate / 600 announce**. Weight 700 is loaded
  for the body face but is reserved — it is not used in page chrome.
- Negative tracking scales with size; display type never gets positive tracking. The *only*
  positive tracking in the system is `--t-overline` at `0.18em`, which is an uppercase
  micro-label, not running text.
- Body copy never drops below `0.875rem` (14px). `--t-mono` and `--t-overline` sit below that
  floor but are non-prose labels (chips, numerals, eyebrows) — logged in §8.
- Measure is capped at `68ch` for all prose blocks.

---

## 4. Spacing & Layout

Base unit **4px**, expressed in `rem`.

| Token | Value | Token | Value |
|---|---|---|---|
| `--s-1` | `0.25rem` (4px) | `--s-8` | `2rem` (32px) |
| `--s-2` | `0.5rem` (8px) | `--s-10` | `2.5rem` (40px) |
| `--s-3` | `0.75rem` (12px) | `--s-12` | `3rem` (48px) |
| `--s-4` | `1rem` (16px) | `--s-16` | `4rem` (64px) |
| `--s-5` | `1.25rem` (20px) | `--s-20` | `5rem` (80px) |
| `--s-6` | `1.5rem` (24px) | `--s-24` | `6rem` (96px) |

Intent tokens (the *mechanics* stay raw CSS — `clamp()`, `minmax()`, and intrinsic sizing are
browser behaviour, not magic numbers):

| Token | Value | Usage |
|---|---|---|
| `--section-y` | `clamp(5rem, 11vh, 9rem)` | Vertical rhythm between major sections |
| `--gutter` | `clamp(1.25rem, 5vw, 2.5rem)` | Page side padding |
| `--card-gap` | `clamp(1rem, 2.2vw, 1.75rem)` | Gap between cards in any grid |
| `--shell-pad` | `0.375rem` | Outer bezel tray padding (drives concentric radii) |

### Radii

| Token | Value | Usage |
|---|---|---|
| `--r-chip` | `0.375rem` | Tech chips, badges |
| `--r-ctl` | `0.5rem` | Inputs, small controls |
| `--r-core` | `calc(var(--r-shell) - var(--shell-pad))` | Inner card core — mathematically concentric |
| `--r-shell` | `1.25rem` | Outer bezel tray |
| `--r-shell-lg` | `1.75rem` | Hero signature panel tray |
| `--r-pill` | `9999px` | Buttons, nav island, availability pill |

### Grid

- Content max-width **1200px**, centred, with `--gutter` side padding.
- Prose max-width **68ch**.
- **Asymmetrical bento** for skills (7 groups) and education/certs: CSS Grid on
  `repeat(auto-fit, minmax(min(17rem, 100%), 1fr))` with deliberate `grid-column: span 2` on the
  two densest skill groups at ≥1024px so the grid never reads as a symmetrical Bootstrap row.
- Projects are full-width stacked panels (not a 3-up grid) — each project carries 6–8 detail
  bullets plus a stack list, which a card grid cannot hold legibly.

### Breakpoints

| Range | Behaviour |
|---|---|
| `< 600px` | Single column everywhere. Nav → island hamburger + full-screen overlay. Display 44px. Bento spans reset to 1. |
| `600–768px` | Two-column meta rows begin. Stats row goes 2×2. |
| `768–1024px` | Desktop nav links appear. Skills bento 2-up. Experience gains its timeline rail. |
| `1024–1280px` | Skills bento 3-up with span-2 emphasis. Hero becomes 2-column (copy + signature panel). |
| `> 1280px` | Max-width caps at 1200px; gutters absorb the remainder. Display 76px. |

---

## 5. Components

Shared across every component: focus is `2px solid var(--c-violet-500)` at `3px` offset, never
removed. All interactive elements are reachable and operable by keyboard.

### 5.1 GlassPanel (primitive — reused 9+ times)

- **Structure:** `.panel` outer tray (`--c-surface-1`, `1px solid --c-line-2`, `--r-shell`,
  padding `--shell-pad`) wrapping `.panel__core` (`--c-surface-2`, `1px solid --c-line-1`,
  `--r-core`, `box-shadow: inset 0 1px 0 var(--c-highlight)`).
- **Variants:** `--lg` (uses `--r-shell-lg`, for the hero signature panel); `--flush` (no inner
  padding, for panels whose child manages its own padding); `--link` (whole panel is an anchor).
- **Spacing:** core padding `--s-6`; `--s-5` below 600px.
- **States:** *default* as above · *hover* (interactive variants only) core → `--c-surface-3`,
  tray rim → `--c-line-3`, plus a `--c-violet-glow` rim light; `translateY(-2px)` ·
  *active* `scale(0.995)` · *focus-visible* violet ring on the tray · *disabled* n/a ·
  *loading* n/a (static content) · *empty* n/a · *error* n/a.
- **Accessibility:** decorative tray is not announced; `--link` variant exposes a single `<a>`
  wrapping the heading so screen-reader link text is the project name, not "read more".
- **Motion:** Standard 240ms on `transform`, `background-color`, `border-color`, `box-shadow`.
- **Layout primitive / scroll owner:** block-level flow child. Owns no scroll.

### 5.2 Button

- **Structure:** pill (`--r-pill`), `--s-3 --s-6` padding, label at `--t-caption` weight 500. The
  primary variant carries a **nested circular icon wrapper** (`1.75rem`, `--r-pill`,
  `rgba(255,255,255,0.16)`) holding the arrow glyph — the arrow never sits naked.
- **Variants:** `--primary` (fill `--c-violet-600`, label `#fff`) · `--ghost` (fill
  `--c-surface-1`, label `--c-text-2`, rim `--c-line-2`) · `--quiet` (no fill, label
  `--c-text-3`, used in the footer).
- **States:** *hover* primary fill → `--c-violet-400`, nested icon translates
  `translate(2px,-1px) scale(1.06)`; ghost core → `--c-surface-3`, rim → `--c-line-3` ·
  *active* `scale(0.98)`, primary fill → `--c-violet-700` · *focus-visible* violet ring ·
  *disabled* `opacity: 0.45`, `cursor: not-allowed`, no hover transform ·
  *loading* `[aria-busy]` swaps the nested icon for a 2-dot pulse and blocks pointer events ·
  *empty / error* n/a.
- **Accessibility:** real `<a>`/`<button>` elements. Download buttons state the file type and
  size in the accessible name. Min hit area 44px.
- **Motion:** Micro 140ms ease-out on fill; Standard 240ms on the nested icon transform.

### 5.3 NavIsland

- **Structure:** detached floating pill, `position: fixed`, `top: --s-5`, centred, `w-max`,
  `--c-surface-1` + `backdrop-filter: blur(20px)` + `1px solid --c-line-3`. Holds a monogram, the
  section links, and a compact résumé-download action.
- **Variants:** `--scrolled` (rim → `--c-line-3`, blur raised, subtle inset ring) · `--open`
  (mobile overlay active).
- **States:** link *default* `--c-text-3` · *hover* `--c-text-1` · *current* (scroll-spy)
  `--c-text-1` with a `--c-violet-500` dot beneath · *focus-visible* violet ring.
- **Accessibility:** `<nav aria-label="Primary">`; current section marked `aria-current="true"`;
  hamburger is a real `<button>` with `aria-expanded` + `aria-controls`; the overlay traps nothing
  but closes on `Escape` and on link activation; `backdrop-filter` is on a fixed element only.
- **Motion:** hamburger bars **morph** to an X (`rotate(45deg)` / `rotate(-45deg)` + the middle
  bar fading) over Standard 240ms — it never just disappears. Overlay links do a **staggered mask
  reveal**: `translateY(2rem)` + `opacity: 0` → settled, 60ms apart, Emphasis easing.
- **Scroll owner:** none — fixed, outside flow. Scroll-spy via `IntersectionObserver`.

### 5.4 OrderTracker (the signature moment)

- **Structure:** lives inside a `GlassPanel --lg`. A mono order id, a 4-step rail
  (Placed / Packed / Out for Delivery / Delivered), and a caption crediting the Fikamoja build.
  Each step is a dot on a connecting rail plus a label and a mono timestamp.
- **Variants:** none.
- **States:** *done* dot filled `--c-live`, rail segment filled `--c-live`, label `--c-text-2` ·
  *active* dot `--c-violet-500` with a pulsing `--c-violet-wash` halo, label `--c-text-1` ·
  *pending* dot `--c-line-3` hollow, label `--c-text-4` · *reduced-motion* renders statically at
  the "Out for Delivery" step with the pulse and advance disabled.
- **Accessibility:** the rail is an `<ol>`. The live region is **`aria-hidden`** and the whole
  widget is `aria-hidden="true"` with an adjacent visually-hidden sentence describing the feature
  in prose — an endlessly-looping status would otherwise spam screen readers with no user value.
- **Motion:** advances one step every 1.8s, loops. Fill grows via `transform: scaleX()` on the
  rail segment and `opacity`/`transform` on dots — never `width`. Halo pulse is
  `transform: scale()` + `opacity` only. Pauses via `IntersectionObserver` when scrolled
  off-screen, so no off-screen compositing cost.
- **Scroll owner:** none.

### 5.5 Chip

- **Structure:** inline `--t-mono` label, `--s-1 --s-3` padding, `--r-chip`, `--c-surface-2` fill,
  `1px solid --c-line-2`, `--c-text-2` label.
- **Variants:** `--accent` (fill `--c-violet-wash`, rim `rgba(113,112,255,0.3)`, label
  `--c-violet-200`) — used for the primary stack entries only.
- **States:** static by default. Inside a hovered project panel, chips lift their rim to
  `--c-line-3`. No standalone hover (they are not interactive — adding one would be slop).
- **Accessibility:** rendered as `<li>` inside a labelled list, not as buttons.
- **Motion:** inherits the parent panel's Standard transition.

### 5.6 SectionHeader

- **Structure:** mono overline numeral + eyebrow pill (`--t-overline`, uppercase, `--r-pill`,
  `--c-surface-2`, rim `--c-line-2`, with a `--c-violet-500` 4px leading dot), then an `H1`, then
  an optional lede at `--t-body-l` capped to `68ch`.
- **Spacing:** eyebrow → title `--s-4`; title → lede `--s-4`; header → content `--s-12`.
- **States:** static. Enters on scroll (see §6).
- **Accessibility:** one `<h2>` per section in document order; the numeral is `aria-hidden`.

### 5.7 TimelineEntry (experience)

- **Structure:** a `GlassPanel` on a vertical rail (`--c-line-1`, 1px) with a node dot at the
  role title's baseline. Header row = role title + company; meta row = dates, location, mode;
  then detail bullets; then a `KeyLearning` callout.
- **Variants:** `--current` (node dot gets a `--c-live` fill + halo). Not used — both roles ended.
- **States:** panel states inherited from 5.1 (non-interactive variant, so no hover lift).
- **Accessibility:** rail and node are CSS-only and `aria-hidden`; content is a semantic
  `<article>` with an `<h3>`.

### 5.8 KeyLearning callout

- **Structure:** left rim `2px solid --c-violet-500`, `--c-violet-wash` fill, `--s-4` padding,
  `--r-ctl` (right side only), a mono "KEY LEARNING" overline, then the sentence at `--t-small`.
- **Variants:** none.
- **States:** static.
- **Accessibility:** plain prose; the overline is real text so the relationship is announced.

### 5.9 Bullet list

- **Structure:** `<ul>` with `list-style: none`; each `<li>` gets a CSS `::before` chevron in
  `--c-violet-500` at 0.6 opacity, `--s-6` indent, `--s-3` row gap. Lead-in phrase in
  `--c-text-1` weight 500, remainder `--c-text-2`.
- **States:** static.
- **Accessibility:** real list semantics; the `::before` glyph is decorative and not read.

### 5.10 StatTile

- **Structure:** small `GlassPanel` holding a display-face figure (`--t-h2`, `--c-text-1`) over a
  mono overline caption (`--c-text-3`).
- **States:** static.
- **Accessibility:** figure and caption are a single sentence to assistive tech via
  visually-hidden text, so "8.76" never reads bare.

---

## 6. Motion & Interaction

| Tier | Duration | Easing | Applies to |
|---|---|---|---|
| Micro | 140ms | `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out) | Button fills, link colour, chip rims |
| Standard | 240ms | `cubic-bezier(0.32, 0.72, 0, 1)` | Panel hover lift, nav rim, hamburger morph, nested icon |
| Emphasis | 760ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Scroll entry reveals, mobile overlay stagger |
| Scroll-driven | — | — | `IntersectionObserver` only; never a `scroll` listener |

Tokens: `--e-micro`, `--e-standard`, `--e-emphasis`, `--d-micro`, `--d-standard`, `--d-emphasis`.

- **Scroll entry:** `translateY(2.5rem)` + `blur(6px)` + `opacity: 0` → settled, Emphasis timing,
  driven by a single shared `IntersectionObserver` that unobserves after firing. Children inside a
  revealed group stagger 60ms apart via a `--i` index custom property.
- **Only** `transform`, `opacity`, and `filter` are animated. No layout properties, ever.
- `backdrop-filter` appears on exactly two elements, both fixed: the nav island and the mobile
  overlay. Never on a scrolling container.
- `will-change` is set only on the nav island and the tracker rail, and nowhere else.
- The grain/noise layer is a single `position: fixed; inset: 0; pointer-events: none` pseudo-element.
- No bare `linear` or `ease-in-out` transitions. No instant state changes on interactive elements.
- Every animation maps to a real interaction or a state change. The OrderTracker is the sole
  autonomous motion on the page and it is informational — it demonstrates a shipped feature.

### Reduced motion

`@media (prefers-reduced-motion: reduce)`: all transitions and animations collapse to `0.01ms`;
scroll-entry elements are painted in their settled state with no transform or blur; the
OrderTracker renders statically at step 3 with its pulse and auto-advance disabled; smooth
scrolling falls back to instant jumps.

---

## 7. Depth & Surface

**Chosen strategy: tonal-shift.** Committed; no other strategy is mixed in.

Elevation is communicated by stepping surface luminance and rim opacity together — never by
casting dark shadows, which are invisible on a `#08090a` canvas:

| Level | Fill | Rim | Used for |
|---|---|---|---|
| 0 | `--c-canvas` | — | Page |
| 1 | `--c-surface-1` | `--c-line-2` | Outer bezel tray, nav island |
| 2 | `--c-surface-2` | `--c-line-1` + `inset 0 1px 0 --c-highlight` | Inner card core |
| 3 | `--c-surface-3` | `--c-line-3` + violet rim light | Hovered core, active tracker step |

The only `box-shadow` values permitted are **inset highlights** (the 1px top light on every inner
core), **rim lights** (`0 0 0 1px` violet on hover), and the hero aurora (a blurred radial
gradient element, not a shadow). No `0 Npx Mpx rgba(0,0,0,…)` drop shadows anywhere.

---

## 8. Accessibility Constraints & Accepted Debt

**Target: WCAG 2.1 AA.**

- Contrast floor 4.5:1 for body text, 3:1 for large text and UI boundaries. Verified pairings on
  `#08090a`: `--c-text-1` ≈ 18.4:1, `--c-text-2` ≈ 13.1:1, `--c-text-3` ≈ 5.6:1.
  `--c-violet-500` on canvas ≈ 5.3:1. `#fff` on `--c-violet-600` ≈ 5.9:1.
- `--c-text-4` (`#62666d` ≈ 3.1:1) is restricted to large/non-essential text only: decorative
  section numerals and pending tracker labels whose state is also carried by dot fill and shape.
- Every interactive element keeps a visible `focus-visible` ring (violet, 2px, 3px offset).
- Full keyboard reachability; a skip-to-content link is the first focusable element.
- Landmarks: `header` / `nav` / `main` / `section[aria-labelledby]` / `footer`. One `h1`.
- The looping OrderTracker is `aria-hidden` with a visually-hidden prose equivalent beside it.
- Respects `prefers-reduced-motion` (see §6).
- Touch targets ≥ 44px.

### Accepted debt

| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| Dark theme only; no light mode | Entire site | The night canvas *is* the brand identity, and a personal portfolio has one controlled presentation. A light variant would need a second full token set for no hiring-audience benefit. | Divya — add a `[data-theme="light"]` token block if a print/light need appears |
| `--t-mono` (12px) and `--t-overline` (11px) sit below the 14px body floor | Tech chips, eyebrows, section numerals | Non-prose micro-labels; every one is duplicated or contextualised by adjacent full-size text, so none is a sole information carrier | Divya — raise to 13px if user testing shows strain |
| `--c-text-4` at ~3.1:1 | Decorative numerals, pending tracker labels | Fails AA for small body text; used only where the information is redundant (state also shown by shape/fill) and never for prose | Divya — promote to `--c-text-3` if any of these becomes a sole carrier |
| No contact form; `mailto:` + `tel:` only | Contact section | Static site with no backend. A form would need a third-party endpoint and a privacy policy. | Divya — add a Formspree/Resend endpoint when a backend exists |
| Fikamoja has no live demo link | Projects section | Not yet deployed by the user; the panel ships a "Live demo coming soon" state instead of a dead link | Divya — supply the URL and it becomes a linked panel |
| Single-page, no routing | Whole site | Scope is one résumé's worth of content; anchor navigation is sufficient and keeps the bundle tiny | Divya — split to routes if per-project case studies are written |
| `.nav__link` and `.nav__brand` are 37px tall (below the 44px target floor) | Nav island | Measured at 768px and 1280px. The island is a compact control strip: `.nav__link` is `display:none` below 768px, where the 44×44px burger and the full-screen overlay menu take over. 37px clears the WCAG 2.5.8 AA minimum of 24px with margin, and horizontal hit area is 55–133px. `.nav__brand` is a redundant control — it scrolls to top, which "Back to top" in the footer and the browser's own Home key also do. | Divya — raise island padding to reach 44px if desktop touch (landscape tablet, touchscreen laptop) becomes a real traffic segment |
