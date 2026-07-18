---
icon: images
---

# Documentation

**Slider Pro for Etch** is a component-based slider/carousel system built for the Etch page builder for WordPress, powered by [Splide](https://splidejs.com/). Every visible piece — the slide track, arrows, dots, counter, progress bar, thumbnails — is its own Etch component with its own settings panel. You build a slider by combining these components and adjusting their settings; you never need to write code.

There are two levels of components: a **Wrapper** that holds one or more sliders (plus any extra pieces like a counter or progress bar), and one or more **Slider** components — the actual sliding track — placed inside it. Everything else (navigation buttons, pagination, counters, progress indicators, the autoplay toggle) is a small component you drop wherever you want it to appear inside the same Wrapper — it finds the Slider automatically, no manual linking required.

***

## Why Splide?

Slider Pro is built on [Splide](https://splidejs.com/), and that choice is deliberate. In independent 2026 comparisons of the leading carousel libraries — Embla, Swiper, and Splide — Splide leads on the things that matter most on a real website:

- **Accessible by default.** Splide is the accessibility front-runner of the major carousel libraries — WCAG 2.1 AA out of the box. It sets correct ARIA roles and labels, announces slide changes to screen readers, manages focus, and ships full keyboard navigation, with no extra work from you. Your sliders stay usable by everyone and won't drag down an accessibility audit.
- **Light and fast.** The engine is roughly 27&nbsp;KB gzipped with zero dependencies, so a slider adds very little to your page. Slider Pro loads it locally (or from a CDN with Subresource Integrity) and can lazy-load below-the-fold sliders so they only initialize as visitors scroll to them.
- **The right amount of power.** Splide sits between Embla's bare-bones minimalism and Swiper's heavyweight, do-everything API — a clean, focused core that still covers fade, vertical, loop, autoplay, thumbnails, and breakpoints. Slider Pro wraps all of it in Etch components, so you get the capability without ever touching its configuration.
- **Stable and battle-tested.** Splide is a mature, dependency-free library with a settled API that isn't churning through breaking changes — and Slider Pro pins a specific, tested version, so your sliders behave the same on every site and won't shift under you.

The result: sliders that are accessible, quick to load, and genuinely capable — the reasons we chose Splide, without you ever having to learn it.

***

## What's included

**Slider Pro for Etch** ships seven builder components:

| Component                                                       | Purpose                                                                                     |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [DWC Slider Wrapper](components/dwc-slider-wrapper.md)           | The outer container — holds one or more Sliders and any extra pieces like a counter or progress bar   |
| [DWC Slider](components/dwc-slider.md)                           | The actual sliding track — layout, motion, autoplay, progress, and slide-state settings       |
| [DWC Slide](components/dwc-slide.md)                              | A single slide — a plain slot wrapper with no settings of its own                             |
| [DWC Slider Progress](components/dwc-slider-progress.md)         | A standalone circular, bar, or counter progress indicator with its own full style controls    |
| [DWC Slider Play-Pause](components/dwc-slider-play-pause.md)     | A standalone play/pause button for autoplay, with its own style controls                      |
| [DWC Slider Pagination](components/dwc-slider-pagination.md)     | Splide's default dots, or a fully custom pagination template                                  |
| [DWC Slider Nav Button](components/dwc-slider-nav-button.md)     | A clickable prev/next/first/last/jump-to-slide control, with optional custom SVG icon         |
| [AI Connector](https://design-with-cracka.gitbook.io/etch-slider-pro/ai-connector) | Planned AI agent integration for Slider Pro — documentation pending                           |

***

## How props and CSS variables work together

Each component has two layers of customisation:

1. **Component props** — Settings you configure directly in the Etch builder panel. These control behaviour (per page, speed, autoplay, loop, etc.) and generate the correct `data-*` attributes and inline styles automatically.
2. **CSS variables** — Arrows, dots, pagination, progress, and play/pause styling are controlled through CSS custom properties rather than component settings. Each slider instance can have its own independent set of these variables via the **Slider Class** prop — see [Styling & Responsive Behaviour](styling-and-responsive.md) for how to set that up.

See [Styling & Responsive Behaviour](styling-and-responsive.md) for the full CSS variable reference and the responsive breakpoint system.
