---
icon: arrow-right
---

# DWC Slider Nav Button

A clickable prev/next/first/last/jump-to-slide control. Drop it anywhere inside the Wrapper (the main slider, at wrapper level, or even inside a **thumbnail** slider) and it always drives the main slider. Use as many as you like: a prev button, a next button, and a row of "jump to slide" buttons can all coexist.

***

## Settings

| Setting                | Renders to                                | Default | Options |
| --------------------------- | ---------------------------------------------- | ------- | --------- |
| **Navigation Type**          | `data-go-to`                                     | `next`  | `Next Slide` / `Previous Slide` / `First Slide` / `Last Slide` / `Go to Slide` |
| **Custom Slide**             | `data-go-to` (used instead, when type is `custom`) | `1`   | Any slide number. Slide numbers are **1-based**, so the first slide is `1`, not `0`. |
| **Button Class**             | `class` (on the button) | `[]` | Add your own CSS class in this **Button Class** field to style the button. |
| **Button Wrapper Class**     | `class` (on the outer wrapper) | `[]` | Add a class to the button's outer wrapper, handy for positioning styles such as flex `order` when placing several nav buttons. |
| **Use Custom Arrow**         | –                                                 | `false` | Shown only when Navigation Type is Next or Previous. Allows you to use a custom SVG instead of the default arrow icon. |
| **Custom SVG**                | –                                                 | –       | Shown only when Use Custom Arrow is on. Paste SVG markup here. **Note:** to use custom SVG, enable "Allow \"unsafe\" HTML" in Etch Settings. |

If Use Custom Arrow is off, Next and Previous buttons show a default chevron icon; First and Last always use their own default icons. Each button also gets an accessible label automatically (like "go to next slide") for screen readers.

***

## Slots

| Slot                | Description                                                        |
| ---------------------- | ----------------------------------------------------------------------- |
| `content` (`Nav_Btn_Content`) | Optional. If left empty, the default icon (or custom SVG) is used. Fill it to replace the button's contents entirely. |

***

## Show the next / previous slide's title

A **Next** or **Previous** button can display the title of the slide it will move to (for example a "Next: Apple Watch →" button). Put an element with the `data-slide-title` attribute inside the button's `content` slot (an empty `<span data-slide-title></span>` is enough) and the plugin keeps its text in step with the slider:

- It shows the title of the slide that button navigates to, updating every time the slider moves.
- On a **looping** slider it wraps (Next on the last slide shows the first slide's title). On a non-looping slider it's blank at the end where the button is disabled.
- The title itself comes from each slide. See [DWC Slide → Slide title](dwc-slide.md#slide-title) for how it's sourced.

This applies to **Next** and **Previous** buttons only; other navigation types ignore it.

### Animating the button (`--title-width`)

Alongside the text, the plugin sets a **`--title-width`** custom property on the button's outer wrapper (`.dwc-slider-nav-button-wrapper`) equal to the title's width, updated every time the title changes (and `0px` at a non-looping end, where it collapses). Use it to animate the wrapper's width as the text changes, to reveal the title only on hover:

```css
.dwc-slider-nav-button-wrapper { overflow: hidden; transition: width .25s ease; }
.dwc-slider-nav-button-wrapper [data-slide-title] { white-space: nowrap; } /* measure the full single-line title */
.dwc-slider-nav-button-wrapper:hover { width: calc(var(--btn-base, 3rem) + var(--title-width)); }
```

Give the title element `white-space: nowrap` so `--title-width` reflects the full title, and keep it in the flow: clip it with the wrapper's `overflow: hidden` rather than `display: none`, or its width can't be measured.

**Sync the text swap with the animation.** `--title-width` updates the instant the slider moves, but the *visible* text is held back briefly so the wrapper can finish resizing before the new (often longer) title appears. That delay is set on the **slider** with **Slide Title Delay** (`data-slide-title-delay`, milliseconds, default `200`; `0` swaps instantly). See [DWC Slider → Settings](dwc-slider.md#settings). Set it to roughly match your `width` transition duration.
