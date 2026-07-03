---
icon: gauge-circle-bolt
---

# DWC Slider Progress

A standalone progress indicator — circular, bar, or counter — with its own full set of style controls. Drop it anywhere inside a Wrapper or Slider; it always tracks the **main** (or role-less) Slider, never a `thumbnails` Slider. This is the richer alternative to the Slider's own built-in Bar Progress / Circular Progress / Counter Progress flags (see [DWC Slider](dwc-slider.md#progress)).

***

## Settings

| Setting            | key             | Renders to           | Default    | Options |
| ---------------------- | ------------------ | ------------------------ | ---------- | --------- |
| **Progress type**       | `progressType`      | `data-progress-type`      | `circular` | `Circular : circular` / `Bar : bar` / `Counter : counter` |

### Circular options (shown when Progress type is Circular)

| Setting                 | key                | Renders to             | Default | Description |
| --------------------------- | -------------------- | -------------------------- | ------- | -------------- |
| **-- Circular Size (px)**    | `circularSizePx`      | `data-circular-size`         | `52`    | Must be more than twice the Circular Radius. |
| **-- Circular radius (px)**  | `circularRadiusPx`    | `data-circular-radius`       | `25`    | Must be less than half the Circular Size. |
| **-- Circular Stroke (px)**  | `circularStrokePx`    | `data-circular-stroke`       | `3`     | Ring thickness. |
| **-- Circular Counter**      | `circularCounter`     | `data-circular-counter`      | `true`  | Shows/hides the number inside the ring. |
| **--- Counter Font Size (rem)** | `counterFontSizeRem` | `data-circular-font`      | `0.6`   | Shown only when Circular Counter is on. |

### Mode (shown unless Progress type is Counter)

| Setting            | key             | Renders to        | Default  | Options |
| ---------------------- | ------------------ | -------------------- | -------- | --------- |
| **Progress Mode**       | `progressMode`      | `data-progress-mode`  | `slides` | `Slides : slides` / `Timer : timer` — Timer mode fills based on time remaining until the next autoplay advance (requires Auto Play to be on for the tracked Slider) |

| Setting  | key     | Description |
| ------------ | --------- | -------------- |
| **Class**     | `class`   | Additional CSS class on the wrapper element. |

***

## STYLE

Rendered as inline CSS custom properties on the component's wrapper element.

Shown when Progress type is Counter, or when it's Circular with Circular Counter on:

| Setting               | key                | CSS variable            | Default                       |
| -------------------------- | --------------------- | ---------------------------- | ---------------------------------- |
| **Visibility**              | `visibility`           | –                              | `Default` — options: `Default` / `Hide Total : hide-total` / `Hide Current : hide-current` |
| **Total Color**             | `totalColor`           | `--total-clr`                 | `#8888a0`                          |
| **Active Color**            | `activeColor`          | `--progress-clr-active`       | `#ff4d6a`                          |
| **Font Size**               | `fontSize`             | `--progress-font-size`        | `0.8rem`                           |
| **Active Font Size**        | `activeFontSize`       | `--progress-font-size-active` | `var(--progress-font-size)`        |
| **Padding**                 | `padding`              | `--progress-padding`          | `4px 12px`                         |
| **Background Blur**         | `backgroundBlur`       | `--progress-bg-blur`          | `8px`                              |
| **Separator Color**         | `separatorColor`       | `--separator-clr`             | `var(--total-clr)`                 |
| **Separator Gap**           | `separatorGap`         | `--separator-gap`             | `-0.08em`                          |

Shown when Progress type is Bar or Circular:

| Setting                | key                  | CSS variable            | Default                        |
| --------------------------- | ---------------------- | ---------------------------- | ------------------------------------ |
| **Progress Fill Color**      | `progressFillColor`     | `--progress-fill-clr`         | `#ff4d6a`                            |
| **Progress Track Color**     | `progressTrackColor`    | `--progress-track-clr`        | `rgba(255, 255, 255, 0.1)`           |

Always shown:

| Setting            | key             | CSS variable          | Default                              |
| ---------------------- | ------------------ | --------------------------- | ------------------------------------------ |
| **Background Color**    | `backgroundColor`   | `--progress-bg`              | `rgba(0, 0, 0, 0.4)`                       |
| **Border Radius**       | `borderRadius`      | `--progress-border-radius`   | `20px`                                     |
| **Border**              | `border`            | `--progress-border`          | `1px solid rgba(255, 255, 255, 0.08)`      |
