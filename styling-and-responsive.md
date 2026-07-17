---
icon: palette
---

# Styling & Responsive Behaviour

## Responsive breakpoints

**Slides Per Page**, **Gap between Slides**, **Slider Height**, **Aspect Ratio**, **Slider Edge Offset**, **Left Offset**, **Right Offset**, **Focus**, and **Sllde Direction** can each be given different values at different screen widths by adding a suffix to the value: `lg:`, `md:`, or `sm:`. The **Layout Mode** setting below uses the same shorthand too.

| Token  | Breakpoint (default) |
| -------- | ------------------------ |
| (none)   | Base value                |
| `lg:`    | ≤ 1120px (laptop)         |
| `md:`    | ≤ 1024px (tablet)         |
| `sm:`    | ≤ 640px (phone)           |

### This is desktop-first (max-width), not mobile-first — read this carefully

These breakpoints work the opposite way from how most page builders present "mobile / tablet / desktop" controls. Each suffixed value applies **at that width and narrower**, not "that width and up." The base (un-suffixed) value is what shows on the *widest* screens — anything larger than your largest breakpoint.

Concretely, with all three overrides set:

| Screen width         | Value used                                                          |
| ----------------------- | ------------------------------------------------------------------------ |
| Wider than 1120px        | Base value                                                                |
| 1025px to 1120px         | `lg:` value                                                               |
| 641px to 1024px          | `md:` value (falls back to `lg:`, then base, if not set)                 |
| 640px and narrower       | `sm:` value (falls back to `md:`, then `lg:`, then base, if not set)     |

Smaller-screen values take priority as the screen gets narrower, cascading down from whichever breakpoints you've actually set. You don't have to set all three — if you only set `sm:`, everything above 640px just uses the base value.

**Example — cards that go from 1 per row on phones to 3 per row on desktop:**

```
Slides Per Page: 3 md:2 sm:1
```

This gives 3 per row above 1120px, 2 per row from 641–1120px (no `lg:` set, so `md:` covers that whole range too), and 1 per row at 640px and below.

> Other settings (Speed, Autoplay, Arrows, etc.) do **not** have breakpoint versions — they apply the same at every screen size. (Gap **does** — it takes the same `sm:`/`md:`/`lg:` shorthand, or a single `clamp()` value if you'd rather it scale fluidly.)

### Fluid values with `clamp()`, `calc()`, and `var()`

The length settings — **Gap**, **Slider Width**, **Slider Height**, and the **Slider Edge Offset** / **Left Offset** / **Right Offset** — accept a CSS function (`clamp()`, `calc()`, `min()`, `max()`, or `var()`) in place of a plain value, for when you'd rather a value scale smoothly with the viewport than step at breakpoints:

```
Gap: clamp(1rem, 0.6rem + 1.6vw, 2rem)
Slider Height: min(70vh, 640px)
```

You can use a function as the base value or inside any `sm:`/`md:`/`lg:` slot (e.g. `md:clamp(1rem, 2rem)`), and mix functions and plain values across breakpoints. `var()` references resolve against your own CSS custom properties, so a shared token like `var(--content-gap)` works too.

### Changing direction at a breakpoint

**Sllde Direction** (`data-direction`) takes the shorthand like any other responsive setting — it's typed by hand, not picked from a dropdown. This is how you get a vertical slider on desktop that turns horizontal on phones:

```
Sllde Direction: ttb sm:ltr
```

The values are `ltr`, `rtl`, and `ttb`. The slider is fully rebuilt when the direction changes, so arrows, drag, and pagination all re-orient to the new axis on their own.

Two things to watch:

* **Vertical needs a height.** A `ttb` slider with **Slider Height** left at `auto` and no **Aspect Ratio** has nothing to size itself against, and collapses. Set one — it takes the shorthand too, so `500px sm:auto` pairs naturally with `ttb sm:ltr`.
* **The cascade is max-width.** `ttb sm:ltr` reads as "vertical, going horizontal on small screens". If you're used to a mobile-first framework, note that `ltr sm:ttb` does the opposite of what you'd expect — see the desktop-first warning above.

### Setting the breakpoint pixel values

The 640 / 1024 / 1120 pixel values above are the defaults. They're configurable site-wide from the [Admin Settings](admin-settings.md) screen in wp-admin, and each Slider can additionally override them for itself via its **Laptop/Tablet/Phone Breakpoint** settings (`data-breakpoint-lg/md/sm`) — see the [DWC Slider BREAKPOINTS panel](components/dwc-slider.md#breakpoints). Leave a slider's breakpoint blank to inherit the site-wide value.

> **Testing responsiveness inside Etch:** responsive settings — and Layout Mode below — are evaluated live in **Preview**. Switch Etch's responsive device/width and the slider re-lays-out to match. In **Edit** mode the real slider isn't mounted (you see a static grid of the slides), so responsiveness only kicks in once you enter Preview.

***

## Layout mode: slider or static grid

By default a slider is a live slider at every width. The **Layout Mode** setting (`data-layout-mode`) lets you turn it into a plain, CSS-controlled grid at chosen breakpoints — for example a real carousel on mobile but a static grid of cards on desktop, or the reverse.

It takes the same desktop-first `lg:`/`md:`/`sm:` shorthand as everything else, with the values `slider` or `static`:

| Value    | Meaning |
| -------- | ---------- |
| `slider` | A normal, live slider (the default when Layout Mode is empty). |
| `static` | The slider is destroyed and its slides become a plain grid you fully control with your own CSS. |

Examples:

- `slider md:static` — carousel above 1024px, static grid at 1024px and below.
- `static md:slider` — static grid above 1024px, carousel at 1024px and below.
- `static` — never a slider; a static grid at every width.

It cascades exactly like the other breakpoints (desktop-first / max-width): the base value applies to the widest screens, and each `sm:`/`md:`/`lg:` override applies at that width and narrower. When the viewport crosses the breakpoint the slider is rebuilt or torn down live — including inside the Etch Preview — so it always matches the current width. While a slider is `static`, its controls are hidden, since there's no live slider to drive them — both the Slider's own built-ins (arrows, dots, progress, play/pause) and any standalone control components that drive it, wherever you've placed them in the Wrapper.

### Grid Columns

When Layout Mode is `static`, the slides render as a CSS grid. The **Grid Columns** setting (`data-grid-columns`) sets how many columns that grid has — it only applies in static mode, and Etch only shows the field once Layout Mode includes `static`.

- Default: `3`.
- Responsive: `3 md:2 sm:1` gives 3 columns on desktop, 2 on tablet, 1 on phone. A bare `4` uses 4 columns at every width.
- The grid's gap follows the slider's **Gap between Slides** setting.

The default grid rule is deliberately low-priority, so you can replace it entirely with your own CSS on the slider's `.splide__list` (a masonry layout, `flex-wrap`, a single column, anything) and your rule wins **without** needing `!important` — the `data-grid-columns` value is just a convenient starting point.

***

## Lazy loading below-the-fold sliders

By default every slider on a page initializes on load. On long pages with sliders the visitor may never scroll to, you can defer a slider's setup until it's about to enter the viewport — cutting the work the browser does on first paint.

Turn it on in one of two places:

- **A whole wrapper** — on a **DWC Slider Wrapper**, enable **Lazy Load Sliders**. Every slider inside that wrapper is deferred together as one unit.
- **A single slider** — on a **DWC Slider**, open the **PERFORMANCE** panel and enable **Lazy Load Slider**. Only that slider is deferred; its siblings load normally.

Both render `data-lazy-init="true"` on the element and share one setting for how early to activate:

| Setting | Renders to | Default | Description |
| ---------- | ------------- | ------- | -------------- |
| **Lazy Load Sliders** (wrapper) / **Lazy Load Slider** (slider) | `data-lazy-init` | `false` | Defer initialization until the element nears the viewport. |
| **Lazy Preload Distance** | `data-lazy-preload` | `200` | Shown once lazy load is on. How many **pixels before** the element reaches the viewport it should activate. A larger number loads it earlier; `0` waits until its edge is exactly at the viewport. Accepts a plain number or a `px` value (e.g. `300` or `300px`). |

Because activation happens *before* the slider scrolls into view, there's normally nothing to see while it waits — by the time it's on screen it's already a live slider.

**Thumbnail sync + lazy loading.** A main and its thumbnails must initialize together to stay in sync. If you lazy-load them in a way that would split them apart — one lazy and the other not, or the two placed in **different** lazy wrappers — Slider Pro detects it and loads that whole sync group immediately instead (and logs a note in the browser console), so sync never silently breaks. To lazy-load a synced pair, keep both sliders inside **one** lazy wrapper.

> **Older browsers:** if the browser doesn't support `IntersectionObserver`, lazy sliders simply initialize immediately — nothing breaks.

> **Inside Etch:** like other runtime behavior, lazy loading is evaluated in **Preview**, not Edit (Edit shows the static grid of slides).

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
| `scale-fade-in`        | A single-slide crossfade + scale transition. Requires **Slides Per Page** to be `1`. With a responsive value it applies at whichever breakpoints resolve to `1` — e.g. `1 sm:2` gives the effect on desktop but not on phones. |
| `thumbnail-grid`       | Forces a thumbnail Slider's slide list into a 2-column grid instead of a scrolling row.    |
