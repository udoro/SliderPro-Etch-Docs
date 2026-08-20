---
icon: gear
---

# Admin Settings

The plugin adds a **Settings → Slider Pro for Etch** screen in wp-admin with four sections.

## Splide Library Source

Choose where the Splide library and its auto-scroll extension are loaded from. This applies everywhere the slider runs: the frontend, and the Etch editor.

- **Local (bundled)**: the default. Works with no external requests.
- **CDN (jsDelivr)**: adds Subresource Integrity (SRI) hashes pinned to the same bundled version, so the CDN copy is verified.

## When to Load Slider Assets

This controls three files: the **Splide library** (~30KB of JavaScript, 2KB of CSS) and the plugin's **own engine and stylesheet** (~52KB and ~22KB). Sliders, marquees and the lightbox need all of them. The [card stack templates](card-stack-templates.md) need only the engine and stylesheet, because [Sync Without Slider](components/dwc-slider-wrapper.md#sync-without-slider) drives your own elements directly and never touches Splide. A page with neither a slider nor a card stack needs none of it, and can save roughly **105KB**.

- **Every page**: the default, and what every existing site already does. All three are always there, whatever a page contains.
- **Only when needed**: nothing is loaded up front. As each page renders, the plugin watches for a slider or a card stack and loads what that page actually uses: everything for a slider, engine and stylesheet only for a card stack, nothing at all for a page with neither. Splide's stylesheet is placed exactly where **Every page** would have put it, so your own CSS keeps overriding it and a slider looks the same on either setting.
- **Never**: Splide is never sent to visitors. The engine and stylesheet still load on pages that have a card stack. Only for sites where no page uses a slider, a marquee or the lightbox.

> **"Never" is the one to be careful with.** Nothing is added back automatically: any slider, marquee or lightbox on the site simply won't start, and the browser console explains why. Card stacks keep working, including their arrows, counter, pagination, autoplay and clickable cards. If you're unsure, pick **Only when needed**. It saves the same bytes on pages that don't need it, with nothing to break.

> **If a slider ever fails to appear on "Only when needed" or "Never",** it means its markup reached the browser some way the plugin couldn't see in advance: a hand-written template, a widget, or markup added by your own JavaScript. Switch back to **Every page**, or tell the plugin this site always needs the assets:
>
> ```php
> add_filter( 'dwc_slider_pro_needs_assets', '__return_true' );
> ```
>
> Adding `?dwc_debug=1` to the page as an administrator prints a comment in the footer showing whether the assets were held back and what released them.

> The **Etch builder always loads Splide**, whichever option you choose, so sliders still preview correctly while you're authoring even on a site set to **Never**.

## Auto-Scroll Extension

A toggle that controls whether the Splide **auto-scroll extension** is loaded. It is used only by sliders with **Infinite Scroll** turned on (the continuous logo-marquee mode).

- **On**: the default. Needed for Infinite Scroll / marquee sliders to animate.
- **Off**: skips loading the extension, saving one script request everywhere the slider runs. Any Slider with Infinite Scroll on simply won't move. Leave this on unless you never use auto-scroll.

## Breakpoints

Editable **SM**, **MD**, and **LG** breakpoint pixel-width fields (defaults `640`, `1024`, `1120`) used for the responsive shorthand described in [Styling & Responsive Behaviour](styling-and-responsive.md#responsive-breakpoints), e.g. `data-per-page="2 sm:3 md:4 lg:1"`. These apply everywhere the slider runs, and are the fallback for any individual Slider: each Slider can override them per-instance from its [BREAKPOINTS panel](components/dwc-slider.md#breakpoints) (`data-breakpoint-sm/md/lg`; leave a field blank to inherit these values).
