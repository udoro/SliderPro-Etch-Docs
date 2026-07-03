---
icon: arrow-right
---

# DWC Slider Nav Button

A clickable prev/next/first/last/jump-to-slide control. Drop it anywhere inside the Wrapper or Slider. Use as many as you like — a prev button, a next button, and a row of "jump to slide" buttons can all coexist.

***

## Settings

| Setting                | Renders to                                | Default | Options |
| --------------------------- | ---------------------------------------------- | ------- | --------- |
| **Navigation Type**          | `data-go-to`                                     | `next`  | `Next Slide` / `Previous Slide` / `First Slide` / `Last Slide` / `Go to Slide` |
| **Custom Slide**             | `data-go-to` (used instead, when type is `custom`) | `1`   | Any slide number. Slide numbers are **1-based** — the first slide is `1`, not `0`. |
| **Button Class**             | appended to `class="dwc-slider-nav-btn {props.buttonClass}"` | `[]` | Add a class to style your navigation button. |
| **Use Custom Arrow**         | –                                                 | `false` | Shown only when Navigation Type is Next or Previous. Allows you to use a custom SVG instead of the default arrow icon. |
| **Custom SVG**                | –                                                 | –       | Shown only when Use Custom Arrow is on. Paste SVG markup here. **Note:** to use custom SVG, enable "Allow \"unsafe\" HTML" in Etch Settings. |

If Use Custom Arrow is off, Next and Previous buttons render a default chevron icon (`.dwc-default-slider-nav-icon`); First and Last always use their own default markup. The button's `aria-label` is generated automatically as "go to {type} slide".

***

## Slots

| Slot                | Description                                                        |
| ---------------------- | ----------------------------------------------------------------------- |
| `content` (`Nav_Btn_Content`) | Optional — if left empty, the default icon (or custom SVG) is used. Fill it to replace the button's contents entirely. |
