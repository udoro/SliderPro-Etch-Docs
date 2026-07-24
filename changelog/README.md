---
icon: arrows-retweet
---

# Changelog

## Version 1.1 - July 24, 2026

**Slider**

* New **Lightbox** option — click a slide to open it full-screen in an overlay viewer with its own arrows, swipe, and keyboard navigation. Two modes: `Images` (just the slide's image, enlarged) or `Slides` (the whole slide — captions, videos, any markup — styled by your CSS). Optional overlay arrows, a "current / total" counter, and a **Lightbox Transition** choice (`Rewind` / `Loop` / `Slide` / `Fade`). The overlay is themeable **per slider** via `--lightbox-*` vars in the Slider Class — including inside media queries. Works with looping, lazy-loaded, and Infinite Scroll sliders; while it's open, background sliders' keyboards and the source's autoplay/marquee are paused and restored on close. See [DWC Slider → Lightbox](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#lightbox).
* **Sync Custom Element** now accepts multiple selectors — a comma-separated list like `.headings, .thumb-strip` tracks each set **independently and at the same time**, each with its own `is-active`/`is-prev`/`is-next` cycling on its own element count. Commas inside `:is()`, `:not()`, or attribute selectors are preserved as one set, and an invalid selector in the list no longer disables the whole feature. See [DWC Slider → Sync Custom Element](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#sync-custom-element).
* New **Sync Custom Element Nav** option makes the sync **two-way** — the synced elements also become go-to buttons that jump the slider to their slide (element 1 → slide 1, and so on). They're keyboard-operable (the plugin adds `role="button"`/`tabindex` when absent) and get a `dwc-sync-nav` pointer cursor. Great for turning a heading list or thumbnail strip into slide navigation. Off by default. See [DWC Slider → Sync Custom Element](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#sync-custom-element).

**Nav Button**

* New **Button Wrapper Class** field adds your own class to a Nav Button's outer wrapper — handy for positioning styles like flex `order` when arranging several buttons. Works for every navigation type. See [DWC Slider Nav Button](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider-nav-button#settings).

## Version 1.0.4 - July 22, 2026

**Fixes**

* Slide **overlay** no longer shows when a slider switches to **static (grid)** layout mode — it's only drawn while the slider is a live carousel.
* **Etch editor:** added a workaround for an Etch bug where selecting a slider scrolled the settings panel back up to the Slider Class field (the first setting). The panel now keeps its position when you move between sliders. This will be removed once Etch fixes it upstream.

## Version 1.0.3 - July 20, 2026

**Slider**

* New **Slide Auto Width** option — each slide takes the width of its own content instead of a fixed number of slides per view. Great for rows of mixed-width items like logos or tags. Works with looping and Infinite Scroll sliders too.
* **Nested sliders** — place a Slider inside a slide of another Slider. It's detected automatically; each slider keeps its own controls, and the inner one is navigated by its arrows/pagination while the outer swipes freely. See [DWC Slider → Nested sliders](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#nested-sliders).
* New **Sync Custom Element** option — point the slider at other elements on the page (by CSS selector) and it keeps `is-active`/`is-prev`/`is-next` classes on them in step with the current slide, so your CSS can restyle them per slide. See [DWC Slider → Sync Custom Element](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#sync-custom-element).
* New **Custom Options** option — type extra Splide settings that don't have their own control, as `name: value` pairs, right on the Slider. See [DWC Slider → Custom Options](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#custom-options).

**Slide**

* DWC Slide now has a **Class** field, so you can add your own CSS class to an individual slide. See [DWC Slide](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slide#settings).

**For developers**

* New `SplideComponent.setOptions()` and `SplideComponent.ready()` helpers let you switch on Splide settings the plugin doesn't have a control for, or run your own code that reacts to a slider. See [JavaScript API](https://design-with-cracka.gitbook.io/etchsliderpro/javascript-api).

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
