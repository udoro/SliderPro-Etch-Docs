---
icon: arrows-retweet
---

# Changelog

## Version 1.0 — Initial release

First release of Slider Pro for Etch. Highlights:

**Slider**

* Splide-powered slider with per-page, gap, height/aspect-ratio, edge offset, loop / slide / fade, autoplay, drag, arrows, pagination, thumbnail sync, and an infinite-scroll marquee mode.
* Standalone control components — Progress (bar / circular / counter), Play-Pause, Pagination, and Nav Button — plus quick flags on the slider itself.

**Responsive**

* Desktop-first `sm:` / `md:` / `lg:` shorthand on Slides Per Page, **Gap**, Slider Height, Aspect Ratio, the edge-offset settings, **Focus** (e.g. `0 md:1 sm:center`), and **Sllde Direction** (e.g. `ttb sm:ltr` — vertical, going horizontal on phones). Breakpoint pixel widths are configurable site-wide and per-slider. See [Changing direction at a breakpoint](../styling-and-responsive.md#changing-direction-at-a-breakpoint).
* **Fluid CSS values** — Gap, Slider Width, Slider Height, and the edge-offset settings also accept `clamp()` / `calc()` / `var()` / `min()` / `max()` for values that scale smoothly with the viewport. See [Fluid values](../styling-and-responsive.md#fluid-values-with-clamp-calc-and-var).
* **Layout Mode** — switch a slider between a live carousel and a plain, CSS-controlled grid at a breakpoint (e.g. `slider md:static`), with a responsive **Grid Columns** count for the static grid. See [Layout mode](../styling-and-responsive.md#layout-mode-slider-or-static-grid).

**Performance**

* **Lazy loading** — defer below-the-fold sliders until they're about to scroll into view, on a whole wrapper (**Lazy Load Sliders**) or a single slider (**Lazy Load Slider**, PERFORMANCE panel), with a **Lazy Preload Distance** to control how early they activate. Synced main/thumbnail pairs stay safe. See [Lazy loading](../styling-and-responsive.md#lazy-loading-below-the-fold-sliders).

**Etch integration**

* Edit / Preview bridge. Responsive settings and Layout Mode are now evaluated live inside **Preview** at the canvas width — switch Etch's responsive device to test them without leaving the editor.
* **Refresh** button in Preview — edits made while previewing don't appear on their own, so this reloads the canvas and returns you straight to Preview in one click, instead of toggling Edit and then Preview again.
* Reliable slider rebuild when crossing a breakpoint (no duplicated controls, clones, or leftover state), and authored slider custom properties are preserved across Preview toggles and layout-mode switches.

**Styling**

* Per-instance styling through a **Slider Class** of CSS custom properties, an **Overlay** tint layer (`data-overlay`), and named animation presets (`data-slider-id`).
