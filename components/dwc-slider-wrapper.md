---
icon: rectangle
---

# DWC Slider Wrapper

The outer container. It holds one Slider (or a main Slider plus a thumbnail Slider) and any extra pieces like a counter or progress component.

***

## Settings

| Setting                | Renders to   | Default | Description                                                                 |
| ----------------------- | ------ | ------- | ----------------------------------------------------------------------------- |
| **Wrapper Height**      | `--slider-wrapper-height` | `auto`  | Sets a minimum height for the wrapper.       |
| **Space Between Sliders** | `--sliders-gap` | –       | The space between a main Slider and its thumbnail Slider (or any other items placed directly in the wrapper). |
| **Custom Class**        | `class`  | `[]`    | Add your own CSS class in this **Custom Class** field to style the wrapper.     |
| **Lazy Load Sliders**   | `data-lazy-init` | `false` | Waits to build **every** slider in this wrapper until it's about to scroll into view, as one group. Good for wrappers below the fold. |
| **Lazy Preload Distance** | `data-lazy-preload` | `200` | Shown once Lazy Load Sliders is on. How many pixels before the wrapper reaches the screen it should start (e.g. `200` or `300px`). |

> To lazy-load a **single** slider rather than the whole wrapper, use the **PERFORMANCE** panel on the [DWC Slider](dwc-slider.md#performance) instead. Full details, including the thumbnail-sync safety rule, are in [Lazy loading below-the-fold sliders](../styling-and-responsive.md#lazy-loading-below-the-fold-sliders).

***

## Empty state

If the wrapper's default slot has no content, it shows a placeholder message in the Etch canvas ("Add **DWC Slider** components here") instead of an empty box — this is builder-only and has no effect on the live site.

***

## Slots

| Slot      | Description                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------- |
| `default` (`Sliders_and_Controls`) | Everything inside the wrapper — one or more DWC Slider components, plus any navigation, pagination, progress, or play/pause components. |
