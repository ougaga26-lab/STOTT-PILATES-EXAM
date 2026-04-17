# Neo-Tactile Soft UI — Design System

> A tactile, high-resolution interface language built on soft inner shadows, diffused highlights, and warm, earthy neutrals. Components feel pressable. Surfaces feel like they belong in a physical object.

**Version** 1.0 · **Aesthetic** Neumorphic · Warm-neutral · Botanical accents

---

## 1. Design Principles

1. **Tactile before visual.** Every interactive surface communicates its interactivity through depth (inner shadow, outer shadow, or both) before it uses colour.
2. **Warmth over sterility.** Avoid pure white and pure grey. Surfaces live on a sand/cream base, accents draw from sage green and terracotta.
3. **Three elevations, no more.** `Base` (flush), `Raised` (lifted 1–2px), `Elevated` (lifted 4–8px with diffused glow). Avoid inventing new ones.
4. **Hover lifts, pressed sinks.** Every button travels vertically on interaction — it is never "just a colour change".
5. **Quiet motion.** Transitions are slow enough to feel physical (180–260ms, ease-out). Never instant, never bouncy.

---

## 2. Color Tokens

### Neutrals (warm)
| Token | Value | Usage |
|---|---|---|
| `--surface-canvas` | `#E8E2D6` | Page background |
| `--surface-base` | `#EFEAE0` | Base card surface |
| `--surface-raised` | `#F5F1E8` | Raised surface |
| `--surface-sunken` | `#DDD6C7` | Inset / input background |
| `--ink-primary` | `#3D3A32` | Primary text |
| `--ink-secondary` | `#6B6558` | Secondary text |
| `--ink-tertiary` | `#9A9385` | Tertiary text, hints |
| `--stroke-soft` | `#D4CDBD` | Subtle dividers |

### Accent — Sage (primary action)
| Token | Value | Usage |
|---|---|---|
| `--sage-100` | `#E5EBD9` | Subtle tint |
| `--sage-300` | `#B8C89E` | Hover bg |
| `--sage-500` | `#9AAE7F` | Default button |
| `--sage-700` | `#6E8456` | Pressed / active |
| `--sage-ink` | `#2F3E1F` | Text on sage |

### Accent — Terracotta (elevated emphasis)
| Token | Value | Usage |
|---|---|---|
| `--clay-300` | `#D9A893` | Tint |
| `--clay-500` | `#B87860` | Elevated card |
| `--clay-700` | `#8A5440` | Pressed clay |

### Shadows (the soul of the system)
| Token | Value |
|---|---|
| `--shadow-inner-soft` | `inset 2px 2px 6px rgba(120,110,90,0.18), inset -2px -2px 6px rgba(255,252,244,0.9)` |
| `--shadow-inner-deep` | `inset 3px 3px 8px rgba(120,110,90,0.28), inset -2px -2px 6px rgba(255,252,244,0.7)` |
| `--shadow-raised` | `4px 4px 10px rgba(120,110,90,0.18), -3px -3px 8px rgba(255,252,244,0.8)` |
| `--shadow-elevated` | `8px 10px 24px rgba(120,110,90,0.22), -4px -4px 14px rgba(255,252,244,0.7)` |
| `--shadow-focus` | `0 0 0 3px rgba(154,174,127,0.35)` |

---

## 3. Typography

- **Display**: `Fraunces` (variable, optical-size) — headings, labels with character
- **Body**: `Inter Tight` — UI text, tight tracking

| Role | Size | Weight | Line | Tracking |
|---|---|---|---|---|
| Display L | 32px | 500 | 1.2 | -0.01em |
| Heading | 20px | 600 | 1.3 | -0.005em |
| Label | 13px | 600 | 1.4 | 0.02em, UPPERCASE |
| Body | 14px | 400 | 1.55 | 0 |
| Caption | 12px | 500 | 1.4 | 0.01em |

---

## 4. Radius, Spacing, Border

### Radius Steps
`4px` (chips, small pills) · `8px` (buttons, inputs) · `12px` (cards) · `20px` (modals, large cards)

### Border Thickness
`1px` (dividers) · `1.5px` (input focus rings) · `2px` (selected states)

### Spacing Scale
`4` · `8` · `12` · `16` · `24` · `32` · `48` · `64`

### Icon Sizes
`16px` (inline) · `20px` (buttons) · `24px` (standalone)

---

## 5. Elevation System

Three and only three elevations:

### Base (flush / inset)
- Background: `--surface-base`
- Shadow: `--shadow-inner-soft`
- Reads as: *carved into the page*
- Use for: inputs, read-only tiles, table rows

### Raised
- Background: `--surface-raised`
- Shadow: `--shadow-raised`
- Reads as: *sitting 2px above*
- Use for: default cards, default buttons

### Elevated
- Background: `--surface-raised` or accent
- Shadow: `--shadow-elevated` + optional glow
- Reads as: *floating, asking for attention*
- Use for: primary CTAs, modals, the one card that matters

---

## 6. Components

### 6.1 Buttons

| State | Behaviour |
|---|---|
| **Default** | Sage fill, `--shadow-raised`, 8px radius |
| **Hover** | Shadow grows +20%, translateY(-1px), slight glow |
| **Pressed** | Switches to `--shadow-inner-deep`, translateY(1px) |
| **Disabled** | Opacity 0.5, flat (no shadow), cursor not-allowed |
| **Loading** | Spinner + text, interaction disabled |

### 6.2 Inputs
- Inset shadow at rest (`--shadow-inner-soft`)
- Focus: 1.5px sage border + `--shadow-focus` glow
- Placeholder: `--ink-tertiary`
- Height: 40px, padding 12px

### 6.3 Select Dropdown
- Trigger matches input style
- Panel: `--shadow-elevated`, 12px radius
- Selected item: `--sage-100` background with sage left border
- Hover item: `--surface-sunken`

### 6.4 Toggle Switch
- Track: 44×24, inset shadow when off
- Thumb: raised shadow, sage when on
- Travel: 180ms cubic-bezier(0.4, 0.0, 0.2, 1)

### 6.5 Slider
- Track: inset, 6px height
- Fill: sage gradient
- Thumb: 20px raised disc with soft shadow

### 6.6 Step Indicator
- Completed: sage filled circle + checkmark
- Active: sage ring with inner dot
- Pending: soft neutral circle, inset

### 6.7 Modal
- Overlay: `rgba(61, 58, 50, 0.4)` with backdrop-filter blur(4px)
- Container: 20px radius, `--shadow-elevated`
- Max width 440px, centred

### 6.8 Table Row
- Default: base surface, 1px bottom divider
- Hover: slight lift to raised shadow
- Selected: sage-100 background, 2px sage left border

### 6.9 Toast
- Raised card with icon + message + close
- Enter: slide up 8px + fade, 200ms
- Auto-dismiss: 4s default

### 6.10 Empty State Tile
- Inset background
- Centred icon (24–32px) + title + subtitle
- No action by default — keeps negative space breathing

---

## 7. Motion

| Duration | Use |
|---|---|
| 120ms | Micro feedback (icon colour) |
| 200ms | Hover, press, toggle |
| 260ms | Modal enter, dropdown expand |
| 400ms | Page-level reveals |

**Easing**: `cubic-bezier(0.4, 0.0, 0.2, 1)` for most. Never use bouncy spring curves — they break the tactile metaphor.

---

## 8. Accessibility

- Minimum contrast: body text 7:1, large text 4.5:1 on every surface tone
- Focus ring is **always** visible — never `outline: none` without replacement
- Interactive targets ≥ 40×40px
- Motion respects `prefers-reduced-motion: reduce` — shadows stay, transitions drop to 0ms

---

## 9. Do / Don't

✅ **Do** use two shadows per raised surface (warm dark + cool light) for realistic depth
✅ **Do** keep backgrounds in the warm-neutral family — never pure white
✅ **Do** let one terracotta element per screen carry the emphasis
✅ **Do** round the corners of inset shadows the same as the container

❌ **Don't** stack more than three elevation levels in a single view
❌ **Don't** use pure black shadows — they read as dirty, not deep
❌ **Don't** combine sage and terracotta at equal weight (6:1 ratio max)
❌ **Don't** animate shadows on scroll — it's expensive and makes the UI feel nervous
