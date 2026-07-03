---
icon: images
---

# Documentation

**Slider Pro for Etch** is a component-based slider/carousel system built for the Etch page builder for WordPress, powered by [Splide](https://splidejs.com/). Every visible piece — the slide track, arrows, dots, counter, progress bar, thumbnails — is its own Etch component with its own settings panel. You build a slider by combining these components and adjusting their settings; you never need to write code.

There are two levels of components: a **Wrapper** that holds one or more sliders (plus any extra pieces like a counter or progress bar) and sets defaults for everything inside it, and one or more **Slider** components — the actual sliding track — placed inside it. A setting on the Slider itself always overrides the same setting on the Wrapper. Everything else (navigation buttons, pagination, counters, progress indicators, the autoplay toggle) is a small component you drop wherever you want it to appear inside the same Wrapper — it finds the Slider automatically, no manual linking required.

***

## What's included

**Slider Pro for Etch** ships seven builder components:

| Component                                                       | Purpose                                                                                     |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [DWC Slider Wrapper](components/dwc-slider-wrapper.md)           | The outer container — holds one or more Sliders and sets defaults for everything inside it   |
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
