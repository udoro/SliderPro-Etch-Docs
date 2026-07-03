---
icon: gauge-circle-bolt
---

# DWC Slider Progress

A standalone progress indicator — circular, bar, or counter — with its own full set of style controls. Drop it anywhere inside a Wrapper or Slider; it always tracks the **main** (or role-less) Slider, never a `thumbnails` Slider. This is the richer alternative to the Slider's own built-in Bar Progress / Circular Progress / Counter Progress flags (see [DWC Slider](dwc-slider.md#progress)).

***

## Settings

| Setting            | Renders to           | Default    | Options |
| ---------------------- | ------------------------ | ---------- | --------- |
| **Progress type**       | `data-progress-type`      | `circular` | `Circular` / `Bar` / `Counter` |

### Circular options (shown when Progress type is Circular)

| Setting                 | Renders to             | Default | Description |
| --------------------------- | -------------------------- | ------- | -------------- |
| **-- Circular Size (px)**    | `data-circular-size`         | `52`    | Must be more than twice the Circular Radius. |
| **-- Circular radius (px)**  | `data-circular-radius`       | `25`    | Must be less than half the Circular Size. |
| **-- Circular Stroke (px)**  | `data-circular-stroke`       | `3`     | Ring thickness. |
| **-- Circular Counter**      | `data-circular-counter`      | `true`  | Shows/hides the number inside the ring. |
| **--- Counter Font Size (rem)** | `data-circular-font`      | `0.6`   | Shown only when Circular Counter is on. |

### Mode (shown unless Progress type is Counter)

| Setting            | Renders to        | Default  | Options |
| ---------------------- | -------------------- | -------- | --------- |
| **Progress Mode**       | `data-progress-mode`  | `slides` | `Slides` / `Timer` — Timer mode fills based on time remaining until the next autoplay advance (requires Auto Play to be on for the tracked Slider) |

| Setting  | Description |
| ------------ | -------------- |
| **Class**     | Additional CSS class on the wrapper element. |

***

## STYLE

Rendered as inline CSS custom properties on the component's wrapper element.

Shown when Progress type is Counter, or when it's Circular with Circular Counter on:

| Setting               | CSS variable            | Default                       |
| -------------------------- | ---------------------------- | ---------------------------------- |
| **Visibility**              | –                              | `Default` — options: `Default` / `Hide Total` / `Hide Current` |
| **Total Color**             | `--total-clr`                 | `#8888a0`                          |
| **Active Color**            | `--progress-clr-active`       | `#ff4d6a`                          |
| **Font Size**               | `--progress-font-size`        | `0.8rem`                           |
| **Active Font Size**        | `--progress-font-size-active` | `var(--progress-font-size)`        |
| **Padding**                 | `--progress-padding`          | `4px 12px`                         |
| **Background Blur**         | `--progress-bg-blur`          | `8px`                              |
| **Separator Color**         | `--separator-clr`             | `var(--total-clr)`                 |
| **Separator Gap**           | `--separator-gap`             | `-0.08em`                          |

Shown when Progress type is Bar or Circular:

| Setting                | CSS variable            | Default                        |
| --------------------------- | ---------------------------- | ------------------------------------ |
| **Progress Fill Color**      | `--progress-fill-clr`         | `#ff4d6a`                            |
| **Progress Track Color**     | `--progress-track-clr`        | `rgba(255, 255, 255, 0.1)`           |

Always shown:

| Setting            | CSS variable          | Default                              |
| ---------------------- | --------------------------- | ------------------------------------------ |
| **Background Color**    | `--progress-bg`              | `rgba(0, 0, 0, 0.4)`                       |
| **Border Radius**       | `--progress-border-radius`   | `20px`                                     |
| **Border**              | `--progress-border`          | `1px solid rgba(255, 255, 255, 0.08)`      |
