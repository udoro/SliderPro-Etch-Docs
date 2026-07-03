---
icon: palette
---

# Styling & Responsive Behaviour

## Responsive breakpoints

**Slides Per Page**, **Slider Height**, **Aspect Ratio**, **Slider Edge Offset**, **Left Offset**, and **Right Offset** can each be given different values at different screen widths by adding a suffix to the value: `lg:`, `md:`, or `sm:`.

| Token  | Breakpoint (default) |
| -------- | ------------------------ |
| (none)   | Base value                |
| `lg:`    | ≤ 1024px (small laptop)   |
| `md:`    | ≤ 768px (tablet)          |
| `sm:`    | ≤ 640px (phone)           |

### This is desktop-first (max-width), not mobile-first — read this carefully

These breakpoints work the opposite way from how most page builders present "mobile / tablet / desktop" controls. Each suffixed value applies **at that width and narrower**, not "that width and up." The base (un-suffixed) value is what shows on the *widest* screens — anything larger than your largest breakpoint.

Concretely, with all three overrides set:

| Screen width         | Value used                                                          |
| ----------------------- | ------------------------------------------------------------------------ |
| Wider than 1024px        | Base value                                                                |
| 769px to 1024px          | `lg:` value                                                               |
| 641px to 768px           | `md:` value (falls back to `lg:`, then base, if not set)                 |
| 640px and narrower       | `sm:` value (falls back to `md:`, then `lg:`, then base, if not set)     |

Smaller-screen values take priority as the screen gets narrower, cascading down from whichever breakpoints you've actually set. You don't have to set all three — if you only set `sm:`, everything above 640px just uses the base value.

**Example — cards that go from 1 per row on phones to 3 per row on desktop:**

```
Slides Per Page: 3 md:2 sm:1
```

This gives 3 per row above 1024px, 2 per row from 641–1024px (no `lg:` set, so `md:` covers that whole range too), and 1 per row at 640px and below.

> Any other setting (Gap, Speed, Autoplay, Arrows, etc.) does **not** have breakpoint versions — it applies the same at every screen size.

### Setting the breakpoint pixel values

The 640 / 768 / 1024 pixel values above are the defaults. They're configurable site-wide from the [Admin Settings](admin-settings.md) screen in wp-admin — they are not fixed in code and not something you set per-slider.

***

## Per-instance styling (Slider Class)

Arrow, dot, pagination, progress, and play/pause colors and sizing are controlled through CSS custom properties, not component settings — this keeps every slider on a site visually consistent by default while still letting you override a single instance.

Each **DWC Slider** has a **Slider Class** prop. The default prop class is `.slider-navigation-vars` — a template containing every arrow/dot/pagination/play-pause variable at its default value, with the instructions inline as a comment:

```
/* 1. Copy these CSS variables
   2. Create a custom class under props "Slider Class" for each slider
   3. Paste and update the variables for unique navigation styles */
```

To give one specific slider its own look:
1. Copy the variable block from `.slider-navigation-vars`.
2. Create a new class and set it as that Slider's **Slider Class** prop.
3. Paste the variables into that class's CSS and change whichever ones you want to differ from the site default.

Slider Pro also keeps each slider's styling independent for you automatically, so you don't have to manage class names by hand:

1. On page load, every slider gets its own unique class (e.g. `dwc-nav-vars-xlwro`), generated from the default `.slider-navigation-vars` template.
2. If you duplicate a slider, the duplicate gets its own new unique class too — so styling one slider never affects the other.
3. To make two or more sliders share the same styling, delete the generated class from the Slider Class prop. With it removed, the prop falls back to showing `.slider-navigation-vars` — don't style directly on that class, since it will be replaced with a fresh unique class again the next time the slider is duplicated or the page reloads. Instead, add your own class (e.g. `.my-custom-slider-class`) — classes you add yourself are never touched by the automatic renaming, so multiple sliders can safely share one. Note that the variables aren't copied into your custom class automatically, which is exactly what the inline comment instructions above are for.

### Full variable reference

Arrow (prev/next buttons):
```
--arrow-bg  --arrow-clr  --arrow-radius  --arrow-width  --arrow-height
--arrow-padding  --arrow-aspect-ratio  --arrow-icon-size  --arrow-bg-blur
--arrow-border  --arrow-opacity  --arrow-transition
--arrow-hover-bg  --arrow-hover-clr  --arrow-hover-opacity  --arrow-hover-border-clr
--prev-arrow-top  --prev-arrow-bottom  --prev-arrow-right  --prev-arrow-left  --prev-arrow-transform
--next-arrow-top  --next-arrow-bottom  --next-arrow-right  --next-arrow-left  --next-arrow-transform
```

Pagination (dots):
```
--pagination-position  --pagination-padding  --pagination-bg  --pagination-bg-blur
--pagination-radius  --pagination-gap
--pagination-top  --pagination-bottom  --pagination-left  --pagination-right  --pagination-transform
--dot-size  --dot-radius  --dot-clr  --dot-transition
--dot-hover-clr  --dot-clr-active  --dot-transform-active
```

Play/Pause button:
```
--play-pause-size  --play-pause-radius  --play-pause-border  --play-pause-clr
--play-pause-bg  --play-pause-bg-blur
--play-pause-hover-bg  --play-pause-hover-border-clr
--play-pause-top  --play-pause-bottom  --play-pause-left  --play-pause-right  --play-pause-z-index
```

> Progress-component variables (`--progress-*`, `--total-clr`, `--separator-*`) are set per-instance directly on the **DWC Slider Progress** / **DWC Slider Pagination** / **DWC Slider Play-Pause** components' own settings panels rather than through the shared `.slider-navigation-vars` class — see each component's page for its full list.

### Global theme defaults

`dwc-slider-pro-etch/assets/dwc-slider-pro.css` also defines a set of site-wide theme defaults (fonts, background/surface/text/accent/border colors, arrow/dot/progress base colors and sizes, transition timing). These are fallback values used by the plugin's own demo/reference markup — they're not exposed as component props and aren't something you'd change per slider.

***

## Animation presets

Set the Slider's **data-slider-id** prop to one of these built-in preset names for a ready-made effect, defined in `dwc-slider-pro.css`:

| Value              | Effect                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------ |
| `scale-fade-in`        | A single-slide crossfade + scale transition. Requires **Slides Per Page** to be `1`.       |
| `thumbnail-grid`       | Forces a thumbnail Slider's slide list into a 2-column grid instead of a scrolling row.    |
