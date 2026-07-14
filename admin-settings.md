---
icon: gear
---

# Admin Settings

The plugin adds a **Settings → Slider Pro for Etch** screen in wp-admin with three sections.

## Splide Library Source

Choose where the Splide library and its auto-scroll extension are loaded from. This applies everywhere the slider runs: the frontend, and the Etch editor.

- **Local (bundled)** — the default. Works with no external requests.
- **CDN (jsDelivr)** — adds Subresource Integrity (SRI) hashes pinned to the same bundled version, so the CDN copy is verified.

## Auto-Scroll Extension

A toggle that controls whether the Splide **auto-scroll extension** is loaded. It is used only by sliders with **Infinite Scroll** turned on (the continuous logo-marquee mode).

- **On** — the default. Needed for Infinite Scroll / marquee sliders to animate.
- **Off** — skips loading the extension, saving one script request everywhere the slider runs. Any Slider with Infinite Scroll on simply won't move. Leave this on unless you never use auto-scroll.

## Breakpoints

Editable **SM**, **MD**, and **LG** breakpoint pixel-width fields (defaults `640`, `1024`, `1120`) used for the responsive shorthand described in [Styling & Responsive Behaviour](styling-and-responsive.md#responsive-breakpoints), e.g. `data-per-page="2 sm:3 md:4 lg:1"`. These apply everywhere the slider runs, and are the fallback for any individual Slider — each Slider can override them per-instance from its [BREAKPOINTS panel](components/dwc-slider.md#breakpoints) (`data-breakpoint-sm/md/lg`; leave a field blank to inherit these values).
