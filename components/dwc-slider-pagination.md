---
icon: ellipsis
---

# DWC Slider Pagination

A standalone pagination component for full control over how each dot looks, as an alternative to the Slider's built-in **Pagination Dots** toggle (see [DWC Slider](dwc-slider.md#navigation)).

Drop it anywhere inside the Wrapper (the main slider, at wrapper level, or even inside a **thumbnail** slider) and it always drives the main slider. Use as many as you like: put one above the slider and one below, and they'll stay in step. Each one keeps its own **Custom Pagination Mode**, so a `Template` pagination and a `Default` one can sit on the same slider.

***

## Settings

| Setting                     | Renders to                                  | Default   | Options |
| -------------------------------- | ---------------------------------------------- | --------- | --------- |
| **Custom Pagination Mode**        | `data-custom-pagination` (lowercased)            | `Default` | `Default` / `Template` |

### WRAPPER (shown when mode is Default)

| Setting               | CSS variable    | Default              |
| -------------------------- | ------------------ | --------------------------- |
| **Background Color**        | `--bg`               | `rgba(0 0 0 / 40%)`          |
| **Filter Blur**             | `--blur`             | `5px`                        |
| **Padding**                 | `--padding`          | `0.5em 1em`                  |
| **Border Radius**           | `--radius`           | –                             |

### DOT (shown when mode is Default)

| Setting               | CSS variable          | Default                                        |
| -------------------------- | ------------------------- | -------------------------------------------------- |
| **Size**                    | `--dot-size`               | `calc(var(--font-size) * 2)`                        |
| **Background**              | `--dot-bg`                 | `color-mix(in oklch, white 20%, transparent)`       |
| **Active Background**       | `--dot-bg-active`          | `#ff4d6a`                                           |
| **Border Radius**           | `--dot-radius`             | `50%`                                               |
| **Font Size**               | `--font-size`              | `1rem`                                              |
| **Text Color**              | `--dot-color`              | –                                                     |
| **Active Text Color**       | `--active-dot-color`       | –                                                     |

### LAYOUT (always shown)

| Setting        | CSS variable      | Default   | Options |
| ------------------ | -------------------- | --------- | --------- |
| **Position**         | `--position` (lowercased) | `Relative` | `Relative` / `Absolute` / `Static` / `Fixed` |
| **Z-index**          | `--z-index`           | `initial`  | |
| **Direction**        | `--direction` (lowercased) | `Row`  | `Row` / `Column` |
| **Gap**              | `--gap`               | `1rem`     | |

| Setting  | Description |
| ------------ | -------------- |
| **Class**     | Add your own CSS class in this **Class** field to style this component. |

***

## Template mode

Set **Custom Pagination Mode** to `Template` and design the *first* item as your template: it gets cloned once per slide automatically. Inside your template, put a number, letter, or roman numeral placeholder as its own word: any digits (`1`, `007`, `2003`), or `a`, `A`, `i`, `I`. It's automatically replaced with that slide's number in the matching format.

- **Numbers** count up starting from whatever number you type, so `1` produces `1, 2, 3, ...` while `2003` produces `2003, 2004, 2005, ...`. Leading zeros are preserved as the number grows (`007` → `007, 008, ..., 010, 011, ...`).
- **Letters and roman numerals** (`a`, `A`, `i`, `I`) always start at the beginning of their sequence (a/b/c…, i/ii/iii…). Only numbers support a custom starting point.

## Styling the active item

Slider Pro adds the class `is-active` to whichever pagination item matches the slide on screen. Use
it to style the current one:

```css
.my-dot           { background: #e5e7eb; }
.my-dot.is-active { background: #45bf55; }
```

The class moves on its own as the slider changes, so you do not need any JavaScript. It works the
same in `Default` and `Template` mode.

***

## If your own layout does not apply

The pagination lays itself out as a flex row or column, using the **Direction** and **Gap**
settings above, and it is only as tall as its items.

If you write your own layout on it, for example a grid, and nothing seems to happen, this is why:
your rule and the plugin's rule are equally specific, so the plugin's wins. Put the plugin's class
in front of yours to make your rule stronger:

```css
/* has no effect on its own */
.my-pagination { display: grid; }

/* wins */
.dwc-slider-pagination-wrapper.my-pagination {
  display: grid;
  block-size: 100%;
  gap: 0;
}
```

Remember to reset `gap` if you set your own spacing, because the flex gap still applies.
