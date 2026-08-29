---
icon: arrows-retweet
---

# Changelog

## Version 1.2.1 - August 29, 2026

**Progress**

* New **Progress Height** setting for the bar progress, so you can set the bar's thickness on the component instead of writing CSS. Shown when Progress Type is **Bar**. It defaults to 3px, so existing bars are unchanged.

**Builder**

* Fixed the **Preview** and **Grid** buttons missing from the first slider you add to a page. They only appeared after reloading the builder. They now appear as soon as you add the slider.

**AI Skills**

* The skills documentation is now a short entry file that routes to a full building guide, so a small change to existing work no longer requires reading the whole document.
* Agents check their work against your published page in their own browser, so they catch what only shows up once a page renders instead of reporting a change as done because the setting saved.
* Agents no longer leave a second set of arrows, pagination dots or a play/pause button behind when they add your own controls.

## Version 1.2.0 - August 20, 2026

**Slider Wrapper**

* New **Sync Without Slider** option. Run the Sync Custom Element feature with **no slider** in the wrapper at all. In the wrapper's new **Sliderless Sync** group, set **Custom Element** to a selector for your own elements (a card stack, a step indicator, a set of tabs) and it cycles `is-active` / `is-prev` / `is-next` across them directly, driven by custom arrows, a counter, progress, custom pagination, and clickable synced elements. Turn on **Loop** to make the arrows wrap; leave it off and they dead-end at the ends. Optional **Arrow Keys** lets the Left and Right keys move between elements while the component has focus, and optional **Auto Play** (with an **Interval**) advances on a timer, pausing on hover, on background tabs, and for reduced-motion visitors. Built for designs that react purely to those three classes and never needed a scrolling track. See [DWC Slider Wrapper → Sync Without Slider](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider-wrapper#sync-without-slider).

**Nav Button**

* **Next** and **Previous** buttons can now show the **title of the slide they'll move to**, updating as the slider moves (think "Next: Apple Watch →"). Drop a `data-slide-title` element into the button and it fills in automatically; it wraps on looping sliders and clears at a non-looping end. A slide's title is read from a `data-slide-title` attribute, a matching element inside the slide, or its first heading. The button's wrapper also gets a `--title-width` custom property (the title's width) so you can animate it as the text changes (reveal the title on hover, for instance), and a **Slide Title Delay** setting on the slider holds the visible text swap for a moment (default 200ms) so the button can resize before the new title appears. See [DWC Slider Nav Button](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider-nav-button) and [DWC Slide](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slide#slide-title).

**Templates**

Four new **premade templates**. Three are card stacks built on Sync Without Slider, so they contain no slider at all:

* **Deck Featured**: product cards fanned in 3-D either side of the front one, shuffling forward as it cycles. Loops, plays itself, and any card can be clicked to bring it to the front.
* **Deck Testimonial**: the same deck rebuilt for quotes. Square card, quote mark, avatar, and it picks up your theme's colours.
* **Fall**: cards queued behind one another, each showing its top edge, with the finished card dropping away off the bottom. Stops at the last card by design, so it suits steps and walkthroughs.

The fourth, **Slider Stack**, keeps the slider and syncs a card deck to it: a 3-D stack of image cards beside a slider of text panels, moving as one, with the cards clickable to jump. Same idea as the decks above, driven by a real slider through [Sync Custom Element](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#sync-custom-element) instead of Sync Without Slider.

Import them all from **Premade Sliders** in your Gumroad dashboard. See [Premade Templates](https://design-with-cracka.gitbook.io/etchsliderpro/premade-templates) and [Card Stack Templates](https://design-with-cracka.gitbook.io/etchsliderpro/card-stack-templates).

**Admin Settings**

* New **When to Load Slider Assets** setting, covering the Splide library and the plugin's own engine and stylesheet. Sliders, marquees and the lightbox need Splide; Sync Without Slider card stacks don't, being driven by their own controller. A page with neither a slider nor a card stack needs none of it. Choose **Every page** (the default, unchanged behaviour), **Only when needed**, or **Never**. On **Only when needed** each page loads only what it uses as it renders: everything for a slider, engine and stylesheet for a card stack, nothing at all otherwise, saving about 105KB on a page that uses none of it. On **Never**, Splide is never sent to visitors, so any slider, marquee or lightbox stops working and says so in the browser console, while card stacks keep running, arrows, counter, pagination, autoplay, clickable cards and all. Nothing looks different between the settings: Splide's stylesheet is placed exactly where **Every page** would have put it, so your own CSS keeps overriding it. The Etch builder always loads everything whichever option you pick, so sliders still preview while you author. See [Admin Settings → When to load slider assets](https://design-with-cracka.gitbook.io/etchsliderpro/admin-settings#when-to-load-slider-assets).

**Maintenance**

* Deleting the plugin now removes every setting it stored. Previously only the library-source option was cleaned up, leaving the auto-scroll and breakpoint options behind in the database.

## Version 1.1.2 - July 31, 2026

**Slider**

* New **Static Lightbox** option: the fullscreen Lightbox now opens even when your slider is showing as a static grid, not only as a carousel. Clicking a slide opens the same lightbox you get in slider mode, with the same look and controls. On by default; switch it off per slider if you'd rather static grids not open the lightbox. See [DWC Slider → Lightbox](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#lightbox).
* New **Fade Opacity** control for Edge Fade. Choose how visible the very edges stay instead of always dissolving to nothing. Leave it at `0%` for the current full fade, or raise it to let the edges peek through (up to no fade at all). See [DWC Slider → Edge Fade](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#edge-fade).

**Templates**

* New **Slider Marquee** premade template: an auto-scrolling logo/brand marquee with softly faded edges and auto-width slides, with rows drifting in opposite directions. Import it from your Gumroad dashboard. See [Premade Templates](https://design-with-cracka.gitbook.io/etchsliderpro/premade-templates).

**Fixes**

* **Etch editor:** fixed the settings panel jumping back to the top when you switch between sliders. It now keeps its scroll position, so your place is held as you move from one slider to the next, and you can still scroll it freely right after selecting a slider.

## Version 1.1.1 - July 30, 2026

**Slider Wrapper**

* New **Pause Sliders on Hover** option. Set it on a slider **wrapper** and every animating slider inside it pauses together when you hover or keyboard-focus any one of them, resuming once the pointer and focus both leave. Built for stacked logo-marquee rows that should read as one unit; it overrides each member's own Pause On Hover so moving between rows doesn't restart the one you just left. Works with both Infinite Scroll marquees and autoplay carousels. See [DWC Slider Wrapper → Settings](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider-wrapper#settings).

**Slider & Wrapper**

* New **Edge Fade** option, which fades the left and right edges of a slider (or a whole wrapper) into transparency for a soft, dissolving finish, with **Fade Distance** and **Fade Softness** controls. Perfect for logo marquees and rows that peek partial slides. It's a pure CSS mask, so it doesn't touch layout or interaction. See [DWC Slider → Edge Fade](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#edge-fade).

## Version 1.1 - July 24, 2026

**Slider**

* New **Lightbox** option. Click a slide to open it full-screen in an overlay viewer with its own arrows, swipe, and keyboard navigation. Two modes: `Images` (just the slide's image, enlarged) or `Slides` (the whole slide, captions, videos and any markup, styled by your CSS). Optional overlay arrows, a "current / total" counter, and a **Lightbox Transition** choice (`Rewind` / `Loop` / `Slide` / `Fade`). The overlay is themeable **per slider** via `--lightbox-*` vars in the Slider Class, including inside media queries. Works with looping, lazy-loaded, and Infinite Scroll sliders; while it's open, background sliders' keyboards and the source's autoplay/marquee are paused and restored on close. See [DWC Slider → Lightbox](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#lightbox).
* **Sync Custom Element** now accepts multiple selectors: a comma-separated list like `.headings, .thumb-strip` tracks each set **independently and at the same time**, each with its own `is-active`/`is-prev`/`is-next` cycling on its own element count. Commas inside `:is()`, `:not()`, or attribute selectors are preserved as one set, and an invalid selector in the list no longer disables the whole feature. See [DWC Slider → Sync Custom Element](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#sync-custom-element).
* New **Sync Custom Element Nav** option makes the sync **two-way**, so the synced elements also become go-to buttons that jump the slider to their slide (element 1 → slide 1, and so on). They're keyboard-operable (the plugin adds `role="button"`/`tabindex` when absent) and get a `dwc-sync-nav` pointer cursor. Great for turning a heading list or thumbnail strip into slide navigation. Off by default. See [DWC Slider → Sync Custom Element](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#sync-custom-element).

**Nav Button**

* New **Button Wrapper Class** field adds your own class to a Nav Button's outer wrapper, handy for positioning styles like flex `order` when arranging several buttons. Works for every navigation type. See [DWC Slider Nav Button](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider-nav-button#settings).

## Version 1.0.4 - July 22, 2026

**Fixes**

* Slide **overlay** no longer shows when a slider switches to **static (grid)** layout mode. It's only drawn while the slider is a live carousel.
* **Etch editor:** added a workaround for an Etch bug where selecting a slider scrolled the settings panel back up to the Slider Class field (the first setting). The panel now keeps its position when you move between sliders. This will be removed once Etch fixes it upstream.

## Version 1.0.3 - July 20, 2026

**Slider**

* New **Slide Auto Width** option: each slide takes the width of its own content instead of a fixed number of slides per view. Great for rows of mixed-width items like logos or tags. Works with looping and Infinite Scroll sliders too.
* **Nested sliders**: place a Slider inside a slide of another Slider. It's detected automatically; each slider keeps its own controls, and the inner one is navigated by its arrows/pagination while the outer swipes freely. See [DWC Slider → Nested sliders](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#nested-sliders).
* New **Sync Custom Element** option. Point the slider at other elements on the page (by CSS selector) and it keeps `is-active`/`is-prev`/`is-next` classes on them in step with the current slide, so your CSS can restyle them per slide. See [DWC Slider → Sync Custom Element](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#sync-custom-element).
* New **Custom Options** option. Type extra Splide settings that don't have their own control, as `name: value` pairs, right on the Slider. See [DWC Slider → Custom Options](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slider#custom-options).

**Slide**

* DWC Slide now has a **Class** field, so you can add your own CSS class to an individual slide. See [DWC Slide](https://design-with-cracka.gitbook.io/etchsliderpro/components/dwc-slide#settings).

**For developers**

* New `SplideComponent.setOptions()` and `SplideComponent.ready()` helpers let you switch on Splide settings the plugin doesn't have a control for, or run your own code that reacts to a slider. See [JavaScript API](https://design-with-cracka.gitbook.io/etchsliderpro/javascript-api).

## Version 1.0.2 - July 17, 2026

**Controls**

* Add as many Custom Paginations to a slider as you like: one above and one below, for example. Before, only the first one worked.
* Controls now work in both places at once. If you have a Pagination, Play-Pause, or Progress inside the slider *and* another at wrapper level, both work now. Previously the one at wrapper level did nothing. (Nav Buttons already worked this way.)
* Each Custom Pagination keeps its own **Custom Pagination Mode**, so a `Template` one and a `Default` one can sit on the same slider.
* With two Sliders in one Wrapper, a control you place inside one Slider now belongs to that Slider alone. Before, the other Slider could add its own buttons and bars inside it.

**Fixes**

* Controls at wrapper level now disappear when a Slider switches to `static` Layout Mode, the same as controls placed inside the Slider. Before, they stayed on screen with nothing left to control.
* Custom Pagination no longer adds a duplicate set of buttons each time a Slider switches between `slider` and `static` at a breakpoint.
* `Template` Custom Pagination now keeps your design when a Slider switches between `slider` and `static`. Before, it dropped back to plain numbered buttons after the first switch.
* Pagination buttons keep working normally after a slider has switched between `slider` and `static` several times.
* The grey placeholders you see while designing (the dashed pagination box, the plain progress bar, the play/pause circle) no longer appear on your live site when a control has nothing to show (a Play-Pause with **Auto Play** turned off, for example), and no longer flash briefly while the page loads. You'll still see them while designing in Etch and in the block editor.

## Version 1.0.1 - July 17, 2026

* Sliders now render live and stay protected inside the Gutenberg block editor.

## Version 1.0 - July 17, 2026

First release of Slider Pro for Etch.

**Slider**

* Splide-powered slider with per-page, gap, height / aspect-ratio, edge offset, loop / slide / fade, autoplay, drag, arrows, pagination, thumbnail sync, and an infinite-scroll marquee mode.
* Standalone control components: Progress (bar / circular / counter), Play-Pause, Pagination, and Nav Button.

**Responsive**

* Desktop-first `sm:` / `md:` / `lg:` shorthand on Slides Per Page, Gap, Slider Height, Aspect Ratio, edge offsets, Focus, and Slide Direction, with breakpoint widths configurable site-wide and per-slider.
* Fluid `clamp()` / `calc()` / `var()` / `min()` / `max()` values for Gap, Slider Width, Slider Height, and the edge offsets.
* Layout Mode: switch a slider between a live carousel and a plain CSS grid at a breakpoint, with a responsive Grid Columns count for the static grid.

**Performance**

* Lazy loading for below-the-fold sliders, per wrapper or per slider, with an adjustable preload distance.

**Etch integration**

* Edit / Preview bridge that evaluates responsive settings and Layout Mode live at the canvas width, with a one-click Refresh to return to Preview after edits.

**Styling**

* Per-instance styling through a Slider Class of CSS custom properties, an Overlay tint layer, and named animation presets.
