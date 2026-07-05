---
icon: images
---

# DWC Slider

The actual sliding track, placed inside a **DWC Slider Wrapper**. Each Slider has its own settings (per page, speed, autoplay, loop, etc.). If a Wrapper contains two Sliders — for example a main gallery and a thumbnail strip — each one is configured independently.

Settings are grouped into panels matching the groups below. Each row shows the setting, the `data-*` attribute or CSS variable it renders to, and its default.

***

## SLIDER SETUP

| Setting            | Renders to        | Default | Options                                                          |
| -------------------- | -------------------- | ------- | ------------------------------------------------------------------- |
| **Slider Role**       | `data-slider-role`    | `main`  | `Main Slider` / `Thumbnail`                     |
| **Main/Thumbnail Sync Group** | `data-sync-group` | –       | Any name — only needed if the main and thumbnail sliders live in **different** Wrappers |
| **Transition Type**   | `data-type` (lowercased) | `Slide` | `Slide` / `Fade` / `Loop`                                            |
| **Sllde Direction**   | `data-direction`      | `ltr`   | `Left to Right` / `Right to Left` / `Vertical`     |

> `Fade` type always rewinds internally (a true infinite loop isn't possible with a crossfade), and pairs with `Loop` for an instant, non-animated wrap.

## LAYOUT

| Setting                 | Renders to           | Default | Description |
| -------------------------- | ----------------------- | ------- | -------------- |
| **Slides Per Page**         | `data-per-page`          | `1`     | How many slides are visible at once. Set for the base breakpoint and others, e.g. `3 md:2 sm:1`. |
| **Slides per Move**         | `data-per-move`          | `1`     | How many slides advance per click/swipe. |
| **Gap between Slides**      | `data-gap`               | `1rem`  | Space between slides. |
| **Slider Edge Offset**      | `data-padding`           | –       | Reveals a peek of neighboring slides on both sides. Accepts the same responsive shorthand as Slides Per Page, e.g. `8% lg:6% md:4% sm:2%`. |
| **-- Left Offset**          | `data-padding-left`      | –       | Overrides Slider Edge Offset on the left only. Same responsive shorthand. |
| **-- Right Offset**         | `data-padding-right`     | –       | Overrides Slider Edge Offset on the right only. Same responsive shorthand. |
| **Padding Block**           | `--slider-padding-block` | `0px`   | Top/bottom padding inside the track. |

## DIMENSIONS

> Breakpoint tokens: `lg` ≤ 1120px (laptop), `md` ≤ 1024px (tablet), `sm` ≤ 640px (phone).

| Setting          | Renders to          | Default | Description |
| ------------------- | ---------------------- | ------- | -------------- |
| **Slider Width**     | `data-width`            | –       | Caps the slider's max width. |
| **Slider Height**    | `data-height`           | `auto`  | Fixed height. Set for base and other breakpoints, e.g. `700px lg:600px md:450px sm:300px`. |
| **Aspect Ratio**     | `data-height-ratio`     | –       | Aspect-ratio-based height (0–1). Presets: `1:1 (Square) = 1.0`, `4:3 (Classic) = 0.75`, `16:9 (Widescreen) = 0.5625`, `2:1 (Panorama) = 0.5`, `21:9 (Ultrawide) = 0.4225`. Responsive shorthand, e.g. `0.5 md:0.5625 sm:0.75`. |
| **SM Breakpoint**    | `data-breakpoint-sm`    | `auto`  | Overrides the site-wide `sm:` pixel width for this slider only. `auto` uses the global [Admin Settings](../admin-settings.md) value (default `640px`). |
| **MD Breakpoint**    | `data-breakpoint-md`    | `auto`  | Overrides the site-wide `md:` pixel width for this slider only. `auto` uses the global value (default `1024px`). |
| **LG Breakpoint**    | `data-breakpoint-lg`    | `auto`  | Overrides the site-wide `lg:` pixel width for this slider only. `auto` uses the global value (default `1120px`). |

Use **either** Slider Height or Aspect Ratio — don't set both on the same slider. Aspect Ratio is the better choice for responsive image sliders since it scales with width automatically.

## MOTION

| Setting            | Renders to      | Default | Description |
| --------------------- | ------------------ | ------- | -------------- |
| **Loop**               | `data-loop`         | `true`  | Wraps around endlessly. |
| **Rewind**             | `data-rewind`       | `false` | When Transition Type is `Slide`, controls whether reaching the last slide snaps back to the first. |
| **Enable Drag**        | `data-drag`         | `true`  | Enables swipe/drag navigation. |
| **Speed**              | `data-speed`        | `400`   | Transition duration in milliseconds. |
| **Focus**              | `data-focus`        | `0`     | Which position in view is treated as "active". E.g. `0`, `1`, `center`. |
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

## NAVIGATION

> For more control, use the standalone **DWC Slider Pagination** and **DWC Slider Nav Button** components instead of these flags.

| Setting               | Renders to    | Default |
| ------------------------ | ---------------- | ------- |
| **Navigation Arrows**     | `data-arrows`      | `true`  |
| **Pagination Dots**       | `data-pagination`  | `true`  |

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

## Other settings

| Setting            | Renders to        | Default | Description |
| ---------------------- | -------------------- | ------- | -------------- |
| **Aria Label**          | `aria-label`          | –       | Accessible label for the slider. |
| **data-slider-id**      | `data-slider-id`      | –       | Hook for the built-in named animation presets. See [Styling & Responsive Behaviour](../styling-and-responsive.md#animation-presets). |
| **Slider Class**        | appended to `class="splide {props.sliderClass}"` | `.slider-navigation-vars` | The per-instance styling class. See [Styling & Responsive Behaviour](../styling-and-responsive.md#per-instance-styling-slider-class) for how to give each slider independent arrow/dot/pagination colors. |

***

## Responsive settings

**Slides Per Page**, **Slider Height**, **Aspect Ratio**, **Slider Edge Offset**, **Left Offset**, and **Right Offset** all accept the same responsive shorthand: a base value followed by `lg:`, `md:`, and/or `sm:` overrides, e.g. `3 md:2 sm:1`. See [Styling & Responsive Behaviour](../styling-and-responsive.md#responsive-breakpoints) for exactly how the cascade works — it's desktop-first (max-width), not mobile-first.

The pixel widths those `sm:`/`md:`/`lg:` tokens map to default to the site-wide [Admin Settings](../admin-settings.md) values, but each slider can override them individually via the **SM/MD/LG Breakpoint** settings above (leave them at `auto` to inherit the global values).

***

## Thumbnail / sync setup

To link two Sliders (typically a big main image and a row of thumbnails):

- **Same Wrapper:** set **Slider Role** to `main` on one and `thumbnails` on the other — they sync automatically, no Sync Group needed.
- **Different Wrappers:** give both Sliders the same **Main/Thumbnail Sync Group** name.

Clicking a thumbnail jumps the main Slider to that slide, and the active thumbnail is automatically highlighted as the main Slider moves.

***

## Marquee mode

Turning on **Infinite Scroll** (Auto Scroll) automatically switches the slider into looping mode, turns off arrows/pagination/autoplay, and sets drag to "free" so it feels like a marquee rather than a snap-to-slide carousel.

***

## Slots

| Slot                | Description                                                          |
| ---------------------- | ------------------------------------------------------------------------ |
| `Top__Controls`         | Rendered above the track, inside a controls wrapper — for a Pagination, Nav Button, Progress, or Play-Pause component. |
| `Slides`                | The **DWC Slide** components that make up the track.                     |
| `Bottom__Controls`      | Rendered below the track, inside a controls wrapper.                     |
