---
icon: arrows-retweet
---

# Changelog

## Version 1.0.2 - July 17, 2026

**Controls**

* Add as many Custom Paginations to a slider as you like — one above and one below, for example. Before, only the first one worked.
* Controls now work in both places at once. If you have a Pagination, Play-Pause, or Progress inside the slider *and* another at wrapper level, both work now — previously the one at wrapper level did nothing. (Nav Buttons already worked this way.)
* Each Custom Pagination keeps its own **Custom Pagination Mode**, so a `Template` one and a `Default` one can sit on the same slider.
* With two Sliders in one Wrapper, a control you place inside one Slider now belongs to that Slider alone. Before, the other Slider could add its own buttons and bars inside it.

**Fixes**

* Controls at wrapper level now disappear when a Slider switches to `static` Layout Mode, the same as controls placed inside the Slider. Before, they stayed on screen with nothing left to control.
* Custom Pagination no longer adds a duplicate set of buttons each time a Slider switches between `slider` and `static` at a breakpoint.
* `Template` Custom Pagination now keeps your design when a Slider switches between `slider` and `static`. Before, it dropped back to plain numbered buttons after the first switch.
* Pagination buttons keep working normally after a slider has switched between `slider` and `static` several times.
* The grey placeholders you see while designing — the dashed pagination box, the plain progress bar, the play/pause circle — no longer appear on your live site when a control has nothing to show (a Play-Pause with **Auto Play** turned off, for example), and no longer flash briefly while the page loads. You'll still see them while designing in Etch and in the block editor.

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
