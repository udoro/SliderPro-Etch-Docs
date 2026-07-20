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
| `window.SplideComponent.setOptions(selector, options)` | Applies Splide settings the plugin doesn't have a control for, to the slider(s) matching `selector`. See [Using Splide settings the plugin doesn't cover](#using-splide-settings-the-plugin-doesnt-cover). |
| `window.SplideComponent.ready(selector, callback)`     | Runs your own code with direct access to the slider once it's ready, so things on your page can react to it. |

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

## Using Splide settings the plugin doesn't cover

The slider is built on [Splide](https://splidejs.com/), which has many more settings than the plugin gives you a control for. These two helpers let you switch on the extra ones with a small snippet — no need to touch the plugin.

> **Prefer no code?** Two of these jobs have a built-in control right on the Slider: **Custom Options** turns on extra Splide settings without a snippet (the `setOptions` job below), and **Sync Custom Element** keeps `is-active`/`is-prev`/`is-next` classes on other elements as the slider moves (the `ready` job below). See [DWC Slider → Custom Options](components/dwc-slider.md#custom-options) and [Sync Custom Element](components/dwc-slider.md#sync-custom-element). Use the helpers here when you need more than those fields allow.

First, **give the slider a class** so your snippet knows which one to target. In Etch, add a class to the Slider (for example `my-slider`). Use that class in the snippets below. Don't use the slider's ID — the plugin replaces it automatically, so a class is the reliable handle.

### `setOptions` — turn on extra settings

Pass your slider's class and the Splide settings you want:

```js
SplideComponent.setOptions('.my-slider', {
  wheel: true,        // move through slides with the mouse wheel
  trimSpace: false,   // keep the empty space at the ends instead of removing it
});
```

- **Add as many settings as you like** — one per line, inside the `{ }`.
- **When it takes effect:** right away on a normal slider. On a slider set to load only when scrolled into view, the settings apply the moment it appears.
- Some settings change the slider's size or layout and need it to rebuild itself — `setOptions` handles that for you, so you don't have to think about it.

> For **auto-width** specifically, you don't need this — use the **Slide Auto Width** toggle on the Slider instead (see [DWC Slider → Dimensions](components/dwc-slider.md#dimensions)).

### `ready` — run your own code with the slider

Use this when you want something else on your page to **react** to the slider. Your code runs once the slider is ready, and gets the slider handed to it as `splide`. The examples below react to `moved`, which runs every time the slider settles on a new slide. Change `.gallery` (etc.) to your slider's class.

> **`move` vs `moved`:** `move` fires the moment a change **starts** (as the animation begins), while `moved` fires once it **finishes** (the slider has settled on the new slide). Both hand your callback the new slide's index. Use `move` when you want the page to react instantly — the built-in **Sync Custom Element** uses it so class changes feel immediate — and `moved` when you'd rather wait for the slide to arrive first (for example, playing a video only once it's in place).

> **Setting the *initial* state:** your code runs *after* the slider has already started (it's showing its first slide). So do the first update **right away**, then use `moved` to keep it in step. Don't bind a `mounted` handler in here expecting it to set the starting state — the slider mounted before your code ran, so that event has already passed and won't fire again.

**Show a "3 / 8" label that keeps up with the slider**

```js
SplideComponent.ready('.gallery', (splide) => {
  const label = document.querySelector('.gallery-status');   // your text element
  const update = () => { label.textContent = `${splide.index + 1} / ${splide.length}`; };
  update();                    // set it now, for the first slide
  splide.on('moved', update);  // then keep it in step on every change
});
```

Calling `update()` once makes the label right on page load; `moved` keeps it correct after every slide change.

**Play the video on the slide you're viewing, pause the rest**

```js
SplideComponent.ready('.video-slider', (splide) => {
  splide.on('moved', () => {
    splide.root.querySelectorAll('video').forEach(v => v.pause());        // pause them all
    splide.root.querySelector('.splide__slide.is-active video')?.play();  // play the visible one
  });
});
```

**Count slide views in your analytics**

```js
SplideComponent.ready('.promo-slider', (splide) => {
  splide.on('moved', (index) => {
    window.gtag?.('event', 'slide_view', { slide_number: index + 1 });    // your tracking call
  });
});
```

**Put the current slide in the page address, so it can be linked to**

```js
SplideComponent.ready('.docs-carousel', (splide) => {
  splide.on('moved', (index) => {
    history.replaceState(null, '', '#slide-' + (index + 1));
  });
});
```

The slider can react to many other moments too (dragging, becoming visible, autoplay starting, and more) — see [Splide's events list](https://splidejs.com/guides/events/).

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
