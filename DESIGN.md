# DreamFactory App Design System

## 1. Atmosphere & Identity

DreamFactory feels like a calm education command center: warm paper, precise cards, and a dark navy system panel that frames the program catalog as organized growth infrastructure. The signature is the combination of Korean-first educational warmth with crisp operational controls for filtering, saving, and copying program kits.

## 2. Color

### Palette

| Role | Token | Light | Dark | Usage |
|------|-------|-------|------|-------|
| Surface/canvas | `--canvas` | `#f4f1ea` | n/a | Page background |
| Surface/primary | `--surface` | `#ffffff` | n/a | Cards, drawer, panels |
| Surface/soft | `--surface-soft` | `#faf8f4` | n/a | Subtle panel fills |
| Text/primary | `--ink` | `#0f172a` | n/a | Main text |
| Text/secondary | `--ink-muted` | `#64748b` | n/a | Body support text |
| Text/faint | `--ink-faint` | `#94a3b8` | n/a | Captions, secondary titles |
| Border/default | `--line` | `rgba(15, 23, 42, 0.1)` | n/a | Card and toolbar borders |
| Border/strong | `--line-strong` | `rgba(15, 23, 42, 0.16)` | n/a | Hover borders |
| Brand/navy | `--navy` | `#1e3a5f` | n/a | Primary buttons, hero panel |
| Brand/navy deep | `--navy-deep` | `#152a45` | n/a | Primary hover |
| Accent/teal | `--teal` | `#0f766e` | n/a | Focus, active secondary controls |
| Accent/gold | `--gold` | `#b8860b` | n/a | Emphasis and definition callout |
| Status/remove | `--coral` | `#c2410c` | n/a | Remove actions |

### Rules

- Use navy for primary action and system identity, teal for filters/focus, and gold only for emphasis.
- New UI must use existing CSS variables or extend this table first.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|-------|------|--------|-------------|----------|-------|
| Display | `clamp(1.85rem, 3.8vw, 2.7rem)` | 800 | 1.18 | `-0.03em` | Hero headline |
| H2 | `clamp(1.35rem, 2.4vw, 1.8rem)` | 800 | normal | `-0.025em` | Section headers |
| Card title | `1.05rem` | 700-800 | 1.3 | `-0.015em` | Cards and model steps |
| Body | `0.88rem`-`1.02rem` | 400-650 | 1.6 | 0 | Copy and descriptions |
| Caption | `0.72rem`-`0.78rem` | 650-800 | 1.3 | up to `0.12em` | Eyebrows, badges |

### Font Stack

- Primary: `"Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Mono: none currently.

### Rules

- Preserve `word-break: keep-all` for Korean headings and long educational phrases.
- Do not scale font size directly with viewport width outside existing `clamp()` display patterns.

## 4. Spacing & Layout

### Base Unit

All fixed spacing follows a 4px base.

| Token | Value | Usage |
|-------|-------|-------|
| `--r-sm` | 8px | Compact radius |
| `--r-md` | 14px | Mid cards and controls |
| `--r-lg` | 20px | Primary panels/cards |
| `--r-pill` | 999px | Pills and segmented controls |

### Grid

- Max width is fluid; sections use `clamp(16px, 4vw, 40px)` side padding.
- Program grids use `repeat(auto-fill, minmax(280px, 1fr))`.
- Responsive breakpoints collapse major grids below 900px and topbar navigation below mobile widths.

## 5. Components

### Topbar
- **Structure**: brand cluster, navigation links, language segmented control, action buttons.
- **States**: sticky glass default, hover/focus on links and controls, active segment for selected language.
- **Accessibility**: language toggle uses `aria-pressed`; top navigation has a localized `aria-label`.
- **Motion**: hover uses existing 150ms transform/background transitions.

### Program Card
- **Structure**: icon, badges, localized title/subtitle, overview, card footer with number and kit button.
- **States**: default, hover/focus lift, in-kit tonal tint, hidden by filters.
- **Accessibility**: cards are keyboard-openable buttons with localized `aria-label`.

### Drawer
- **Structure**: close button, program eyebrow/title, overview, tags, grouped lists, footer actions.
- **States**: hidden/visible modal with backdrop, scrollable body.
- **Accessibility**: modal role, localized close label, Escape closes.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|------|----------|--------|-------|
| Micro | `--dur` 150ms | `--ease` cubic bezier | Button, chip, card hover |

Rules: animate transform, color, background, border, and shadow only. Respect `prefers-reduced-motion`.

## 7. Depth & Surface

Strategy: mixed soft shadows and tonal glass.

| Level | Token | Usage |
|-------|-------|-------|
| Subtle | `--shadow-sm` | Cards at rest |
| Default | `--shadow-md` | Hovered cards |
| Prominent | `--shadow-lg` | Hero panel and drawer |

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA target for contrast.
- Visible focus is required for buttons, chips, cards, inputs, and language controls.
- Korean and English UI must remain keyboard reachable and must not clip on mobile.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|------|----------|--------------|--------------|
| Emoji program icons | `data/programs.js` | Pre-existing data content, outside the bilingual toggle scope | Replace with SVG icon tokens during a visual-system pass |
