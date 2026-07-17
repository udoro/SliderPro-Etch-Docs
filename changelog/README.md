---
icon: arrows-retweet
---

# Changelog

## Version 1.0.1 - July 17, 2026

* Sliders now render live and stay protected inside the Gutenberg block editor.

## Version 1.0 - July 17, 2026

First release of Slider Pro for Etch.

**Slider**

* Splide-powered slider with per-page, gap, height / aspect-ratio, edge offset, loop / slide / fade, autoplay, drag, arrows, pagination, thumbnail sync, and an infinite-scroll marquee mode.
* Standalone control components — Progress (bar / circular / counter), Play-Pause, Pagination, and Nav Button.

**Responsive**

* Desktop-first `sm:` / `md:` / `lg:` shorthand on Slides Per Page, Gap, Slider Height, Aspect Ratio, edge offsets, Focus, and Slide Direction, with breakpoint widths configurable site-wide and per-slider.
* Fluid `clamp()` / `calc()` / `var()` / `min()` / `max()` values for Gap, Slider Width, Slider Height, and the edge offsets.
* Layout Mode — switch a slider between a live carousel and a plain CSS grid at a breakpoint, with a responsive Grid Columns count for the static grid.

**Performance**

* Lazy loading for below-the-fold sliders — per wrapper or per slider — with an adjustable preload distance.

**Etch integration**

* Edit / Preview bridge that evaluates responsive settings and Layout Mode live at the canvas width, with a one-click Refresh to return to Preview after edits.

**Styling**

* Per-instance styling through a Slider Class of CSS custom properties, an Overlay tint layer, and named animation presets.
