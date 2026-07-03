---
icon: ellipsis
---

# DWC Slider Pagination

A standalone pagination component for full control over how each dot looks, as an alternative to the Slider's built-in **Pagination Dots** toggle (see [DWC Slider](dwc-slider.md#navigation)).

***

## Settings

| Setting                     | key                   | Renders to                                  | Default   | Options |
| -------------------------------- | ----------------------- | ---------------------------------------------- | --------- | --------- |
| **Custom Pagination Mode**        | `customPaginationMode`   | `data-custom-pagination` (lowercased)            | `Default` | `Default` / `Template` |

### WRAPPER (shown when mode is Default)

| Setting               | key             | CSS variable    | Default              |
| -------------------------- | ------------------ | ------------------ | --------------------------- |
| **Background Color**        | `backgroundColor`   | `--bg`               | `rgba(0 0 0 / 40%)`          |
| **Filter Blur**             | `filterBlur`        | `--blur`             | `5px`                        |
| **Padding**                 | `padding`           | `--padding`          | `0.5em 1em`                  |
| **Border Radius**           | `borderRadius`      | `--radius`           | –                             |

### DOT (shown when mode is Default)

| Setting               | key             | CSS variable          | Default                                        |
| -------------------------- | ------------------ | ------------------------- | -------------------------------------------------- |
| **Size**                    | `size`              | `--dot-size`               | `calc(var(--font-size) * 2)`                        |
| **Background**              | `background`        | `--dot-bg`                 | `color-mix(in oklch, white 20%, transparent)`       |
| **Active Background**       | `activeBackground`  | `--dot-bg-active`          | `#ff4d6a`                                           |
| **Border Radius**           | `borderRadius`      | `--dot-radius`             | `50%`                                               |
| **Font Size**               | `fontSize`          | `--font-size`              | `1rem`                                              |
| **Text Color**              | `textColor`         | `--dot-color`              | –                                                     |
| **Active Text Color**       | `activeTextColor`   | `--active-dot-color`       | –                                                     |

### LAYOUT (always shown)

| Setting        | key       | CSS variable      | Default   | Options |
| ------------------ | ----------- | -------------------- | --------- | --------- |
| **Position**         | `position`   | `--position` (lowercased) | `Relative` | `Relative` / `Absolute` / `Static` / `Fixed` |
| **Z-index**          | `zIndex`     | `--z-index`           | `initial`  | |
| **Direction**        | `direction`  | `--direction` (lowercased) | `Row`  | `Row` / `Column` |
| **Gap**              | `gap`        | `--gap`               | `1rem`     | |

| Setting  | key     | Description |
| ------------ | --------- | -------------- |
| **Class**     | `class`   | Additional CSS class, appended to `class="dwc-slider-pagination-wrapper {props.class}"`. |

***

## Template mode

Set **Custom Pagination Mode** to `Template` and design the *first* item as your template — it gets cloned once per slide automatically. Inside your template, put a single number, letter, or roman numeral placeholder as its own word: `1`, `a`, `A`, `i`, or `I`. It's automatically replaced with that slide's number in the matching format (numbers, lowercase/uppercase letters, or lowercase/uppercase roman numerals).
