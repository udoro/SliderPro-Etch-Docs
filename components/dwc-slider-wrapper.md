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
| **Pause Sliders on Hover** | `data-group-pause-on-hover` | `false` | When on, hovering or keyboard-focusing **any** slider in this wrapper pauses **all** of them together (both Infinite Scroll marquees and autoplay carousels); they resume once the pointer and focus have both left. See the note below. |
| **Edge Fade**           | `data-edge-fade` | `false` | Fades the left and right edges of the whole wrapper into transparency. |
| **Fade Distance**       | `--fade-width` | `15%` | Shown once Edge Fade is on. How far the fade reaches in from each edge (any CSS length/percentage). |
| **Fade Softness**       | `--fade-softness` | `0.8` | Shown once Edge Fade is on. How gradual the fade is on a `0`–`1` scale, where `1` is softest, `0` a sharp edge. |
| **Fade Opacity**        | `--fade-opacity` | `0%` | Shown once Edge Fade is on. How visible the very edge stays. `0%` fades it fully out (default), up to `100%` for no fade at the edge. |
| **Sliderless Sync → Custom Element** | `data-sync-custom-el` | – | A CSS selector for your own elements to cycle **without a slider**, in the **Sliderless Sync** group. In this mode the selector matches only elements **inside this wrapper**, so two decks that share a class stay independent. Filling it on a wrapper that has no slider inside turns on [Sync Without Slider](#sync-without-slider); the group's other fields (**Custom Element Nav**, **Loop**, **Leading Zeros**, **Title Delay**, **Arrow Keys**, **Auto Play**, **Interval**, **Pause on Hover**) appear once a selector is entered. Empty = off. |

> To lazy-load a **single** slider rather than the whole wrapper, use the **PERFORMANCE** panel on the [DWC Slider](dwc-slider.md#performance) instead. Full details, including the thumbnail-sync safety rule, are in [Lazy loading below-the-fold sliders](../styling-and-responsive.md#lazy-loading-below-the-fold-sliders).

> **Pause Sliders on Hover** makes the wrapper the single pause controller for its sliders, so it overrides each slider's own **Pause On Hover**, so moving the pointer from one row to the next won't restart the row you just left. Ideal for stacked logo-marquee rows that should behave as one unit. Nested sliders aren't affected.

> **Edge Fade** is also available per-slider on the [DWC Slider → EDGE FADE](dwc-slider.md#edge-fade) panel; enabling it on the wrapper fades a whole stack of sliders at once.

***

## Sync Without Slider

Normally [Sync Custom Element](dwc-slider.md#sync-custom-element) needs a real slider to follow: the slider moves, and the plugin mirrors its position onto your elements as `is-active` / `is-prev` / `is-next` classes. **Sync Without Slider** drops that requirement: the wrapper drives your elements directly, with no slider inside at all. It's built for designs that react purely to those three classes (a card stack, a step indicator, a set of tabs) where you never wanted a scrolling track in the first place.

**How it works**

1. On the **wrapper**, open the **Sliderless Sync** group and fill in **Custom Element** (`data-sync-custom-el`), a CSS selector pointing at the elements you want to cycle. In sliderless mode the selector matches only elements **inside this wrapper**, so each wrapper drives its own elements and two decks that share a class never affect each other. That's the only switch: a wrapper with this selector and **no slider inside** runs in Sync Without Slider mode automatically. The **first** selector in the list sets both the count and the order, so those elements act as the "slides". (Extra comma-separated selectors still cycle on their own count, exactly as with a real slider.)
2. Add your controls inside the wrapper: custom **Nav Buttons** (arrows), a **counter**, **progress**, and **custom pagination** all work, and if you turn on **Custom Element Nav** (in the Sliderless Sync group) the elements themselves become clickable go-to controls.

That's it, with no DWC Slider component required. The plugin puts `is-active` on the current element and `is-prev` / `is-next` on its neighbours, and your CSS does the rest.

**What works, and what doesn't**

- **Works:** custom arrows (including the next/previous [adjacent-slide title](dwc-slider-nav-button.md#show-the-next-previous-slides-title)), counter, bar and circular progress (in slides mode), custom pagination, and clickable synced elements via **Custom Element Nav**. Formatting fields in the **Sliderless Sync** group, **Leading Zeros** (counter) and **Title Delay** (nav-button title), are read from the wrapper.
- **Controls show up only when you place them:** each control appears simply because you put its component inside the wrapper. There are no separate on/off toggles for it in this mode, and nothing is ever added for you. Drop in a Nav Button, a Counter, a Progress, or a Pagination and it works; leave it out and it's not there.
- **Looping:** turn on **Loop** for the wrapper (`data-loop="true"`) to make the arrows wrap around; leave it off and the arrows dead-end and disable at the first and last element, just like a non-looping slider.
- **Arrow keys:** turn on **Arrow Keys** (`data-arrow-keys="true"`) and the Left and Right arrow keys move between elements **while the component has focus**: that is, when the wrapper itself or one of its controls (a Nav Button, or a clickable synced element) is focused. It's deliberately scoped to focus rather than the whole page, so several sliderless wrappers don't all respond to the same keypress and normal page scrolling is left alone. The wrapper is made focusable automatically. Off by default.
- **Overlapping elements (card stacks):** this mode is built for designs that react to the three classes, and those often stack their elements on top of each other, which makes **Custom Element Nav** clicks land on whichever element the browser decides received them, not the one that looks front-most. Before blaming the nav, read the overlap note under [DWC Slider → Sync Custom Element](dwc-slider.md#sync-custom-element): `opacity: 0` elements still take clicks, and depth applied to a *child* leaves the synced elements flat, so source order decides. It's fixed with `pointer-events` and `z-index` in your own CSS.
- **Autoplay:** turn on **Auto Play** (`data-autoplay="true"`) and set an **Interval** (`data-interval`, milliseconds, default `4000`) to advance on a timer. It pauses while you hover or keyboard-focus the wrapper (turn that off with **Pause on Hover** = `false`), pauses while the browser tab is in the background, and won't run at all for visitors who prefer reduced motion. On a non-looping wrapper it stops at the last element; turn on **Loop** to keep cycling. There's no play/pause button or timer progress bar in this mode, just the auto-advance.

> Leave the wrapper's **Sliderless Sync → Custom Element** empty (the default) and it behaves like a normal wrapper, looking for DWC Slider components inside it as usual. If the wrapper *does* contain a slider, this wrapper-level selector is ignored. Set **Sync Custom Element** on the [slider](dwc-slider.md#sync-custom-element) instead.

***

## Empty state

If the wrapper's default slot has no content, it shows a placeholder message in the Etch canvas ("Add **DWC Slider** components here") instead of an empty box. This is builder-only and has no effect on the live site.

***

## Slots

| Slot      | Description                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------- |
| `default` (`Sliders_and_Controls`) | Everything inside the wrapper: one or more DWC Slider components, plus any navigation, pagination, progress, or play/pause components. |
