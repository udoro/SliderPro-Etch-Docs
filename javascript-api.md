---
icon: code
---

# JavaScript API

The runtime exposes one global: `window.SplideComponent`. Each `.splide` element (a DWC Slider) gets a unique `data-script-id` attribute when it initialises.

***

## Global API

| Method                                   | Description                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| `window.SplideComponent.init()`              | Scans the page and initialises any un-initialised sliders. Called automatically on load; call again after injecting new slider markup dynamically. |
| `window.SplideComponent.destroy(scriptId)`   | Tears down the slider instance with the given `data-script-id`.                    |
| `window.SplideComponent.getInstance(scriptId)` | Returns the live Splide instance for the given `data-script-id`, for direct Splide API access. |
| `window.SplideComponent.getSyncGroups()`     | Returns the current main/thumbnail sync group registry.                            |

```js
// Re-scan after injecting a new slider into the DOM
document.querySelector('#my-container').appendChild(newSliderMarkup);
window.SplideComponent.init();
```

```js
// Get direct access to the underlying Splide instance
const el = document.querySelector('.splide');
const instance = window.SplideComponent.getInstance(el.dataset.scriptId);
instance.go('+1');
```

***

## Attribute architecture reference

This is how the settings documented on each component page are actually read at runtime — useful if you're setting `data-*` attributes directly (e.g. via Etch's Custom Attributes field) instead of through component props.

- **Feature flags** (`data-circular-progress`, `data-bar-progress`, `data-counter`, `data-leading-zeros`) can be set on either the Slider or the Wrapper — the Slider's value takes precedence.
- **Slider config** (`data-per-page`, `data-gap`, `data-speed`, `data-autoplay`, `data-loop`, `data-arrows`, `data-pagination`, `data-drag`, `data-autoplay-progress`, `data-autoplay-toggle`, `data-type`, `data-direction`, `data-rewind`, etc.) lives on the `.splide` element itself — each Slider holds its own config.
- **Multi-slider sync**: `data-slider-role="main|thumbnails"` plus `data-sync-group="name"`. Without a sync group, syncing is Wrapper-scoped only (strict boundaries). With a sync group, all matching sliders across the page sync, regardless of which Wrapper they're in.
- **Progress containers**: `[data-progress-type="circular|bar|counter"]`, with `data-progress-mode` and `data-circular-*` attributes read per-container.
- **Nav buttons**: `[data-go-to="N|next|prev|first|last"]` — `N` is a one-based slide number; keyword values are case-insensitive. Auto-detected inside the Slider or Wrapper, no flag needed.
- **Custom pagination**: `[data-custom-pagination]` — set to `"template"` to use the first child as a cloned design template. Auto-detected inside the Slider or Wrapper, no flag needed.
- **Autoplay controls**: `[data-autoplay-progress-container]` and `[data-autoplay-toggle-container]` are auto-detected on any element inside the Wrapper.
- Sliders with `data-slider-role` can live outside a Wrapper entirely and still sync via `data-sync-group`.
