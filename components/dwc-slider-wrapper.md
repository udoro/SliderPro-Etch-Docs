---
icon: rectangle
---

# DWC Slider Wrapper

The outer container. It holds one Slider (or a main Slider plus a thumbnail Slider) and any extra pieces like a counter or progress component.

***

## Settings

| Setting                | Type   | Default | Description                                                                 |
| ----------------------- | ------ | ------- | ----------------------------------------------------------------------------- |
| **Wrapper Height**      | string | `auto`  | Sets `--slider-wrapper-height`, used as the wrapper's `min-block-size`.       |
| **Space Between Sliders** | string | –       | Sets `--sliders-gap`, the gap between a main Slider and a thumbnail Slider (or any other direct children) inside the wrapper. |
| **Custom Class**        | class  | `[]`    | Additional CSS class applied to the wrapper element for custom targeting.     |
| **Lazy Load Sliders**   | boolean | `false` | Renders `data-lazy-init`. Defers **every** slider in this wrapper until it's about to scroll into view, as one unit. Good for wrappers below the fold. |
| **Lazy Preload Distance** | string | `200` | Renders `data-lazy-preload`. Shown once Lazy Load Sliders is on. Pixels before the wrapper reaches the viewport to activate (e.g. `200` or `300px`). |

> To lazy-load a **single** slider rather than the whole wrapper, use the **PERFORMANCE** panel on the [DWC Slider](dwc-slider.md#performance) instead. Full details, including the thumbnail-sync safety rule, are in [Lazy loading below-the-fold sliders](../styling-and-responsive.md#lazy-loading-below-the-fold-sliders).

***

## Empty state

If the wrapper's default slot has no content, it shows a placeholder message in the Etch canvas ("Add **DWC Slider** components here") instead of an empty box — this is builder-only and has no effect on the live site.

***

## Slots

| Slot      | Description                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------- |
| `default` (`Sliders_and_Controls`) | Everything inside the wrapper — one or more DWC Slider components, plus any navigation, pagination, progress, or play/pause components. |
