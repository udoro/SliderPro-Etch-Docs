---
icon: arrow-right
---

# DWC Slider Nav Button

A clickable prev/next/first/last/jump-to-slide control. Drop it anywhere inside the Wrapper — the main slider, at wrapper level, or even inside a **thumbnail** slider — and it always drives the main slider. Use as many as you like — a prev button, a next button, and a row of "jump to slide" buttons can all coexist.

***

## Settings

| Setting                | Renders to                                | Default | Options |
| --------------------------- | ---------------------------------------------- | ------- | --------- |
| **Navigation Type**          | `data-go-to`                                     | `next`  | `Next Slide` / `Previous Slide` / `First Slide` / `Last Slide` / `Go to Slide` |
| **Custom Slide**             | `data-go-to` (used instead, when type is `custom`) | `1`   | Any slide number. Slide numbers are **1-based** — the first slide is `1`, not `0`. |
| **Button Class**             | `class` (on the button) | `[]` | Add your own CSS class in this **Button Class** field to style the button. |
| **Button Wrapper Class**     | `class` (on the outer wrapper) | `[]` | Add a class to the button's outer wrapper — handy for positioning styles such as flex `order` when placing several nav buttons. |
| **Use Custom Arrow**         | –                                                 | `false` | Shown only when Navigation Type is Next or Previous. Allows you to use a custom SVG instead of the default arrow icon. |
| **Custom SVG**                | –                                                 | –       | Shown only when Use Custom Arrow is on. Paste SVG markup here. **Note:** to use custom SVG, enable "Allow \"unsafe\" HTML" in Etch Settings. |

If Use Custom Arrow is off, Next and Previous buttons show a default chevron icon; First and Last always use their own default icons. Each button also gets an accessible label automatically (like "go to next slide") for screen readers.

***

## Slots

| Slot                | Description                                                        |
| ---------------------- | ----------------------------------------------------------------------- |
| `content` (`Nav_Btn_Content`) | Optional — if left empty, the default icon (or custom SVG) is used. Fill it to replace the button's contents entirely. |
