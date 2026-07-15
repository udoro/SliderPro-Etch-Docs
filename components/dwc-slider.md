---
icon: images
---

# DWC Slider

The actual sliding track, placed inside a **DWC Slider Wrapper**. Each Slider has its own settings (per page, speed, autoplay, loop, etc.). If a Wrapper contains two Sliders — for example a main gallery and a thumbnail strip — each one is configured independently.

Settings are grouped into panels matching the groups below. Each row shows the setting, the `data-*` attribute or CSS variable it renders to, and its default.

***

## BREAKPOINTS

Set where this slider's `sm:` / `md:` / `lg:` breakpoints kick in — enter a pixel width (a `max-width`, so it applies at that size and below). Leave blank to inherit the site-wide [Admin Settings](../admin-settings.md) values.

| Setting          | Renders to          | Default | Description |
| ------------------- | ---------------------- | ------- | -------------- |
| **Laptop (lg)**      | `data-breakpoint-lg`    | `1120px` (inherited) | Max-width where `lg:` applies. |
| **Tablet (md)**      | `data-breakpoint-md`    | `1024px` (inherited) | Max-width where `md:` applies. |
| **Phone (sm)**       | `data-breakpoint-sm`    | `640px` (inherited)  | Max-width where `sm:` applies. |

## SLIDER SETUP

| Setting            | Renders to        | Default | Options                                                          |
| -------------------- | -------------------- | ------- | ------------------------------------------------------------------- |
| **Slider Role**       | `data-slider-role`    | `main`  | `Main Slider` / `Thumbnail`                     |
| **Main/Thumbnail Sync Group** | `data-sync-group` | –       | Any name — only needed if the main and thumbnail sliders live in **different** Wrappers |
| **Transition Type**   | `data-type` (lowercased) | `Slide` | `Slide` / `Fade` / `Loop`                                            |
| **Sllde Direction**   | `data-direction`      | `ltr`   | Typed, not a dropdown: `ltr` (Left to Right), `rtl` (Right to Left), or `ttb` (Vertical). Accepts responsive shorthand, e.g. `ttb sm:ltr` — vertical, turning horizontal on phones. Vertical needs a **Slider Height** or **Aspect Ratio**, or the slider collapses. |

> `Fade` type always rewinds internally (a true infinite loop isn't possible with a crossfade), and pairs with `Loop` for an instant, non-animated wrap.

## LAYOUT

| Setting                 | Renders to           | Default | Description |
| -------------------------- | ----------------------- | ------- | -------------- |
| **Slides Per Page**         | `data-per-page`          | `1`     | How many slides are visible at once. Set for the base breakpoint and others, e.g. `3 md:2 sm:1`. |
| **Slides per Move**         | `data-per-move`          | `1`     | How many slides advance per click/swipe. |
| **Gap between Slides**      | `data-gap`               | `1rem`  | Space between slides. Accepts the same responsive shorthand as Slides Per Page (e.g. `20px md:12px sm:8px`), or a single `clamp()` value. |
| **Slider Edge Offset**      | `data-padding`           | –       | Reveals a peek of neighboring slides on both sides. Accepts the same responsive shorthand as Slides Per Page, e.g. `8% lg:6% md:4% sm:2%`. |
| **-- Left Offset**          | `data-padding-left`      | –       | Overrides Slider Edge Offset on the left only. Same responsive shorthand. |
| **-- Right Offset**         | `data-padding-right`     | –       | Overrides Slider Edge Offset on the right only. Same responsive shorthand. |
| **Padding Block**           | `--slider-padding-block` | `0px`   | Top/bottom padding inside the track. |
| **Layout Mode**             | `data-layout-mode`       | – (always slider) | Turn the slider into a plain, CSS-controlled grid at chosen breakpoints. `slider` / `static`, responsive shorthand, e.g. `slider md:static`. See [Layout mode](../styling-and-responsive.md#layout-mode-slider-or-static-grid). |
| **Grid Columns**            | `data-grid-columns`      | `3`     | Columns for the static-mode grid. **Only applies while Layout Mode is `static`** (Etch shows this field only once Layout Mode includes `static`). Responsive, e.g. `3 md:2 sm:1`. |

## DIMENSIONS

> Breakpoint tokens: `lg` ≤ 1120px (laptop), `md` ≤ 1024px (tablet), `sm` ≤ 640px (phone).

| Setting          | Renders to          | Default | Description |
| ------------------- | ---------------------- | ------- | -------------- |
| **Slider Width**     | `data-width`            | –       | Caps the slider's max width. |
| **Slider Height**    | `data-height`           | `auto`  | Fixed height. Set for base and other breakpoints, e.g. `700px lg:600px md:450px sm:300px`. `auto` means "no fixed height" — leave it there to use Aspect Ratio. |
| **Aspect Ratio**     | `data-height-ratio`     | –       | Sets the slide height as a proportion of the slider's width, so the shape holds as the slider resizes — the smaller the number, the shorter the slide. This only applies while Slider Height is `auto`, because a fixed height always wins. Use `1.0` for a square (1:1), `0.75` for classic (4:3), `0.5625` for widescreen (16:9), `0.5` for panorama (2:1), or `0.4225` for ultrawide (21:9). Leave it empty to size the slider with Slider Height instead. It takes the responsive shorthand too, e.g. `0.5 md:0.5625 sm:0.75`. |

Use **either** Slider Height or Aspect Ratio — don't set both on the same slider. If you do, Slider Height wins and the slider logs a console warning saying so. Aspect Ratio is the better choice for responsive image sliders since it scales with width automatically. To override where the `sm:`/`md:`/`lg:` tokens kick in for this slider, use the [BREAKPOINTS](#breakpoints) panel.

The two combine across breakpoints, since both take the shorthand: `Slider Height: auto sm:300px` with `Aspect Ratio: 0.5625` gives you a 16:9 slider that switches to a flat 300px on phones.

## MOTION

| Setting            | Renders to      | Default | Description |
| --------------------- | ------------------ | ------- | -------------- |
| **Loop**               | `data-loop`         | `true`  | Wraps around endlessly. |
| **Rewind**             | `data-rewind`       | `false` | When Transition Type is `Slide`, controls whether reaching the last slide snaps back to the first. |
| **Enable Drag**        | `data-drag`         | `true`  | Enables swipe/drag navigation. |
| **Speed**              | `data-speed`        | `400`   | Transition duration in milliseconds. |
| **Focus**              | `data-focus`        | `0`     | Which position in view is treated as "active". `center` or a 0-based index. Accepts responsive shorthand, e.g. `0 md:1 sm:center`. |
| **Update on Move**     | `data-update-on-move` | `true` | Updates the `is-active` status class just before moving the carousel. |

## AUTOPLAY

| Setting               | Renders to               | Default | Description |
| ------------------------ | --------------------------- | ------- | -------------- |
| **Auto Play**             | `data-autoplay`              | `true`  | Auto-advances slides. |
| **Interval**              | `data-interval`              | `4000`  | Time (ms) each slide is shown before advancing. |
| **Pause On Hover**        | `data-pause-on-hover`        | `false` | Pauses autoplay while the mouse is over the slider. |
| **Play/Pause Button**     | `data-autoplay-toggle`       | `true`  | For more control, use the standalone **DWC Slider Play-Pause** component instead. |

Autoplay also automatically pauses when a slide or control receives keyboard focus — this is built in and not a separate setting.

## PROGRESS

> For more control, use the standalone **DWC Slider Progress** component instead of these flags.

| Setting                  | Renders to                      | Default | Options |
| --------------------------- | ----------------------------------- | ------- | --------- |
| **Bar Progress**             | `data-bar-progress` (lowercased)     | `False` | `False` / `Slides` / `Timer` — to use Timer mode, enable Auto Play |
| **Circular Progress**        | `data-circular-progress` (lowercased) | `False` | `False` / `Slides` / `Timer` — to use Timer mode, enable Auto Play |
| **Counter Progress**         | `data-counter`                       | `false` | Shows a simple "current / total" readout. |
| **Counter Leading Zeros**    | `data-leading-zeros`                 | `false` | Shown only when Circular Progress or Counter Progress is on. Pads numbers e.g. `01/04` instead of `1/4`. |

## AUTOSCROLL

| Setting          | Renders to             | Default | Description |
| -------------------- | -------------------------- | ------- | -------------- |
| **Infinite Scroll**   | `data-auto-scroll`          | `false` | Continuous, non-stop scrolling (like a logo marquee) instead of discrete slide steps. |
| **Scroll Speed**      | `data-auto-scroll-speed`    | `4`     | Shown only when Infinite Scroll is on. Pixels moved per frame; negative numbers reverse direction. |

> **Note:** Infinite Scroll only animates when the **Auto-Scroll Extension** is enabled in [Admin Settings](../admin-settings.md#auto-scroll-extension) (it is on by default).

## NAVIGATION

> For more control, use the standalone **DWC Slider Pagination** and **DWC Slider Nav Button** components instead of these flags.

| Setting               | Renders to    | Default |
| ------------------------ | ---------------- | ------- |
| **Navigation Arrows**     | `data-arrows`      | `true`  |
| **Pagination Dots**       | `data-pagination`  | `true`  |

## OVERLAY

Draws a full-cover tint layer over the slider (a `::before` on the slider, behind the slide captions and controls) — handy for improving text contrast over busy images.

| Setting                | Renders to             | Default | Description |
| ------------------------- | -------------------------- | ------- | -------------- |
| **Enable**                 | `data-overlay`             | `false` | Turns the overlay layer on. |
| **Overlay Background**     | `--slider-overlay-bg`      | `color-mix(in oklch, black 55%, transparent)` | Any CSS color or gradient for the tint. |

## SLIDES

These control per-slide appearance in the active vs. inactive state, applied as inline CSS custom properties on the track.

| Setting               | CSS variable                | Default                        |
| ------------------------ | ------------------------------- | ---------------------------------- |
| **Overflow**              | `data-overflow`                  | `false`                            |
| **Opacity**               | `--slide-opacity`                | `1`                                 |
| **Opacity-Active**        | `--slide-opacity-active`         | `1`                                 |
| **Scale**                 | `--slide-scale`                  | `1`                                 |
| **Scale-Active**          | `--slide-scale-active`           | `1`                                 |
| **TranslateY**            | `--slide-translate-y`            | `0`                                 |
| **TranslateY-Active**     | `--slide-translate-y-active`     | `0`                                 |
| **TranslateX**            | `--slide-translate-x`            | `0`                                 |
| **TranslateX-Active**     | `--slide-translate-x-active`     | `0`                                 |
| **Transform Origin**      | `--slide-transform-origin`       | `center center`                     |
| **Border**                | `--slide-border`                 | `solid 1px transparent`             |
| **Border-Active**         | `--slide-border-active`          | `solid 1px transparent`             |
| **Transition**            | `--slide-transition`             | `0.4s`                              |
| **Transition-Active**     | `--slide-transition-active`      | `0.4s`                              |
| **Border Radius**         | `--slide-radius`                 | –                                   |
| **Height-Inactive**       | `--slide-height-inactive`        | `var(--slide-height-active)`        |

## PERFORMANCE

| Setting                  | Renders to          | Default | Description |
| --------------------------- | ---------------------- | ------- | -------------- |
| **Lazy Load Slider**         | `data-lazy-init`        | `false` | Defer this slider's setup until it's about to scroll into view — useful for sliders below the fold. |
| **Lazy Preload Distance**    | `data-lazy-preload`     | `200`   | Shown only when Lazy Load Slider is on. How many pixels before the slider reaches the viewport it activates (e.g. `300` or `300px`); `0` waits until its edge is exactly at the viewport. |

To defer a **whole wrapper** (every slider inside it) instead of one slider, use **Lazy Load Sliders** on the [DWC Slider Wrapper](dwc-slider-wrapper.md). See [Lazy loading below-the-fold sliders](../styling-and-responsive.md#lazy-loading-below-the-fold-sliders) for the thumbnail-sync rule and details.

## Other settings

| Setting            | Renders to        | Default | Description |
| ---------------------- | -------------------- | ------- | -------------- |
| **Aria Label**          | `aria-label`          | –       | Accessible label for the slider. |
| **data-slider-id**      | `data-slider-id`      | –       | Hook for the built-in named animation presets. See [Styling & Responsive Behaviour](../styling-and-responsive.md#animation-presets). |
| **Slider Class**        | appended to `class="splide {props.sliderClass}"` | `.slider-navigation-vars` | The per-instance styling class. See [Styling & Responsive Behaviour](../styling-and-responsive.md#per-instance-styling-slider-class) for how to give each slider independent arrow/dot/pagination colors. |

***

## Responsive settings

**Slides Per Page**, **Gap between Slides**, **Slider Height**, **Aspect Ratio**, **Slider Edge Offset**, **Left Offset**, **Right Offset**, **Focus**, and **Sllde Direction** all accept the same responsive shorthand: a base value followed by `lg:`, `md:`, and/or `sm:` overrides, e.g. `3 md:2 sm:1`. **Layout Mode** and **Grid Columns** use it too. See [Styling & Responsive Behaviour](../styling-and-responsive.md#responsive-breakpoints) for exactly how the cascade works — it's desktop-first (max-width), not mobile-first.

The pixel widths those `sm:`/`md:`/`lg:` tokens map to default to the site-wide [Admin Settings](../admin-settings.md) values, but each slider can override them individually via the [BREAKPOINTS](#breakpoints) panel above.

The length fields — **Gap**, **Slider Width**, **Slider Height**, and the edge-offset settings — additionally accept CSS functions (`clamp()`, `calc()`, `var()`, `min()`, `max()`) for values that scale fluidly with the viewport instead of stepping at breakpoints. See [Fluid values](../styling-and-responsive.md#fluid-values-with-clamp-calc-and-var).

***

## Thumbnail / sync setup

To link two Sliders (typically a big main image and a row of thumbnails):

- **Same Wrapper:** set **Slider Role** to `main` on one and `thumbnails` on the other — they sync automatically, no Sync Group needed.
- **Different Wrappers:** give both Sliders the same **Main/Thumbnail Sync Group** name.

Clicking a thumbnail jumps the main Slider to that slide, and the active thumbnail is automatically highlighted as the main Slider moves.

***

## Marquee mode

Turning on **Infinite Scroll** (Auto Scroll) automatically switches the slider into looping mode, turns off arrows/pagination/autoplay, and sets drag to "free" so it feels like a marquee rather than a snap-to-slide carousel. This requires the **Auto-Scroll Extension** to be enabled in [Admin Settings](../admin-settings.md#auto-scroll-extension) (on by default) — if it's off, the slider won't move.

***

## Slots

| Slot                | Description                                                          |
| ---------------------- | ------------------------------------------------------------------------ |
| `Top__Controls`         | Rendered above the track, inside a controls wrapper — for a Pagination, Nav Button, Progress, or Play-Pause component. |
| `Slides`                | The **DWC Slide** components that make up the track.                     |
| `Bottom__Controls`      | Rendered below the track, inside a controls wrapper.                     |
