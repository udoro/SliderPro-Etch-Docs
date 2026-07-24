---
icon: images
---

# DWC Slider

The actual sliding track, placed inside a **DWC Slider Wrapper**. Each Slider has its own settings (per page, speed, autoplay, loop, etc.). If a Wrapper contains two Sliders — for example a main gallery and a thumbnail strip — each one is configured independently.

Settings are grouped into panels matching the groups below. Each row shows the setting, the `data-*` attribute or CSS variable it renders to, and its default.

***

## BREAKPOINTS

Set where this slider's `sm:` / `md:` / `lg:` breakpoints kick in — enter a pixel width (a `max-width`, so it applies at that size and below). Leave blank to inherit the site-wide [Admin Settings](../admin-settings.md) values.

| Setting          | Renders to          | Default | Description |
| ------------------- | ---------------------- | ------- | -------------- |
| **Laptop (lg)**      | `data-breakpoint-lg`    | `1120px` (inherited) | Max-width where `lg:` applies. |
| **Tablet (md)**      | `data-breakpoint-md`    | `1024px` (inherited) | Max-width where `md:` applies. |
| **Phone (sm)**       | `data-breakpoint-sm`    | `640px` (inherited)  | Max-width where `sm:` applies. |

## SLIDER SETUP

| Setting            | Renders to        | Default | Options                                                          |
| -------------------- | -------------------- | ------- | ------------------------------------------------------------------- |
| **Slider Role**       | `data-slider-role`    | `main`  | `Main Slider` / `Thumbnail`                     |
| **Main/Thumbnail Sync Group** | `data-sync-group` | –       | Any name — only needed if the main and thumbnail sliders live in **different** Wrappers |
| **Transition Type**   | `data-type` (lowercased) | `Slide` | `Slide` / `Fade` / `Loop`                                            |
| **Sllde Direction**   | `data-direction`      | `ltr`   | Typed, not a dropdown: `ltr` (Left to Right), `rtl` (Right to Left), or `ttb` (Vertical). Accepts responsive shorthand, e.g. `ttb sm:ltr` — vertical, turning horizontal on phones. Vertical needs a **Slider Height** or **Aspect Ratio**, or the slider collapses. |
| **Sync Custom Element** | `data-sync-custom-el` | –     | A CSS selector for elements elsewhere on the page that should follow the slider. The plugin adds `is-active`, `is-prev`, and `is-next` classes to them as it moves, so your CSS can restyle them per slide. Empty = off. See [Sync Custom Element](#sync-custom-element). |
| **Sync Custom Element Nav** | `data-sync-custom-el-nav` | `false` | Also make those synced elements act as **go-to buttons** — clicking (or keyboard-activating) the element for a slide jumps to it. Requires **Sync Custom Element**. See [Sync Custom Element](#sync-custom-element). |
| **Custom Options**    | `data-custom-options` | –       | Type extra Splide settings the panels don't cover, as `name: value` pairs. Empty = off. See [Custom Options](#custom-options). |

> `Fade` type always rewinds internally (a true infinite loop isn't possible with a crossfade), and pairs with `Loop` for an instant, non-animated wrap.

## LAYOUT

| Setting                 | Renders to           | Default | Description |
| -------------------------- | ----------------------- | ------- | -------------- |
| **Slides Per Page**         | `data-per-page`          | `1`     | How many slides are visible at once. Set for the base breakpoint and others, e.g. `3 md:2 sm:1`. |
| **Slides per Move**         | `data-per-move`          | `1`     | How many slides advance per click/swipe. |
| **Gap between Slides**      | `data-gap`               | `1rem`  | Space between slides. Accepts the same responsive shorthand as Slides Per Page (e.g. `20px md:12px sm:8px`), or a single `clamp()` value. |
| **Slider Edge Offset**      | `data-padding`           | –       | Reveals a peek of neighboring slides on both sides. Accepts the same responsive shorthand as Slides Per Page, e.g. `8% lg:6% md:4% sm:2%`. |
| **-- Left Offset**          | `data-padding-left`      | –       | Overrides Slider Edge Offset on the left only. Same responsive shorthand. |
| **-- Right Offset**         | `data-padding-right`     | –       | Overrides Slider Edge Offset on the right only. Same responsive shorthand. |
| **Padding Block**           | `--slider-padding-block` | `0px`   | Top/bottom padding inside the track. |
| **Layout Mode**             | `data-layout-mode`       | – (always slider) | Turn the slider into a plain, CSS-controlled grid at chosen breakpoints. `slider` / `static`, responsive shorthand, e.g. `slider md:static`. See [Layout mode](../styling-and-responsive.md#layout-mode-slider-or-static-grid). |
| **Grid Columns**            | `data-grid-columns`      | `3`     | Columns for the static-mode grid. **Only applies while Layout Mode is `static`** (Etch shows this field only once Layout Mode includes `static`). Responsive, e.g. `3 md:2 sm:1`. |

## DIMENSIONS

> Breakpoint tokens: `lg` ≤ 1120px (laptop), `md` ≤ 1024px (tablet), `sm` ≤ 640px (phone).

| Setting          | Renders to          | Default | Description |
| ------------------- | ---------------------- | ------- | -------------- |
| **Slider Width**     | `data-width`            | –       | Caps the slider's max width. |
| **Slide Auto Width** | `data-slide-auto-width` | `false` | When on, each slide takes the width of its own content instead of a fixed number of slides per view. Turn it on for rows of items that are different widths (logos, tags, mixed-size cards). See the note below. |
| **Slider Height**    | `data-height`           | `auto`  | Fixed height. Set for base and other breakpoints, e.g. `700px lg:600px md:450px sm:300px`. `auto` means "no fixed height" — leave it there to use Aspect Ratio. |
| **Aspect Ratio**     | `data-height-ratio`     | –       | Sets the slide height as a proportion of the slider's width, so the shape holds as the slider resizes — the smaller the number, the shorter the slide. This only applies while Slider Height is `auto`, because a fixed height always wins. Use `1.0` for a square (1:1), `0.75` for classic (4:3), `0.5625` for widescreen (16:9), `0.5` for panorama (2:1), or `0.4225` for ultrawide (21:9). Leave it empty to size the slider with Slider Height instead. It takes the responsive shorthand too, e.g. `0.5 md:0.5625 sm:0.75`. |

Use **either** Slider Height or Aspect Ratio — don't set both on the same slider. If you do, Slider Height wins and the slider logs a console warning saying so. Aspect Ratio is the better choice for responsive image sliders since it scales with width automatically. To override where the `sm:`/`md:`/`lg:` tokens kick in for this slider, use the [BREAKPOINTS](#breakpoints) panel.

**Slide Auto Width:** with this on, **Slides Per Page** no longer applies — the width of each slide comes from what's inside it. So your slides need a width of their own, either from their content (an image at its natural size) or from your own CSS (for example a fixed card width). If the slides have no width to fall back on, they'll collapse to nothing or overflow. It works with looping and Infinite Scroll (marquee) sliders too. If you only need it on one slider and would rather not use the toggle, you can apply it from code instead — see [Using Splide settings the plugin doesn't cover](../javascript-api.md).

The two combine across breakpoints, since both take the shorthand: `Slider Height: auto sm:300px` with `Aspect Ratio: 0.5625` gives you a 16:9 slider that switches to a flat 300px on phones.

## MOTION

| Setting            | Renders to      | Default | Description |
| --------------------- | ------------------ | ------- | -------------- |
| **Loop**               | `data-loop`         | `true`  | Wraps around endlessly. |
| **Rewind**             | `data-rewind`       | `false` | When Transition Type is `Slide`, controls whether reaching the last slide snaps back to the first. |
| **Enable Drag**        | `data-drag`         | `true`  | Enables swipe/drag navigation. |
| **Speed**              | `data-speed`        | `400`   | Transition duration in milliseconds. |
| **Focus**              | `data-focus`        | `0`     | Which position in view is treated as "active". `center` or a 0-based index. Accepts responsive shorthand, e.g. `0 md:1 sm:center`. |
| **Update on Move**     | `data-update-on-move` | `true` | Updates the `is-active` status class just before moving the carousel. |

## AUTOPLAY

| Setting               | Renders to               | Default | Description |
| ------------------------ | --------------------------- | ------- | -------------- |
| **Auto Play**             | `data-autoplay`              | `true`  | Auto-advances slides. |
| **Interval**              | `data-interval`              | `4000`  | Time (ms) each slide is shown before advancing. |
| **Pause On Hover**        | `data-pause-on-hover`        | `false` | Pauses autoplay while the mouse is over the slider. |
| **Play/Pause Button**     | `data-autoplay-toggle`       | `true`  | For more control, use the standalone **DWC Slider Play-Pause** component instead. |

Autoplay also automatically pauses when a slide or control receives keyboard focus — this is built in and not a separate setting.

## PROGRESS

> For more control, use the standalone **DWC Slider Progress** component instead of these flags.

| Setting                  | Renders to                      | Default | Options |
| --------------------------- | ----------------------------------- | ------- | --------- |
| **Bar Progress**             | `data-bar-progress` (lowercased)     | `False` | `False` / `Slides` / `Timer` — to use Timer mode, enable Auto Play |
| **Circular Progress**        | `data-circular-progress` (lowercased) | `False` | `False` / `Slides` / `Timer` — to use Timer mode, enable Auto Play |
| **Counter Progress**         | `data-counter`                       | `false` | Shows a simple "current / total" readout. |
| **Counter Leading Zeros**    | `data-leading-zeros`                 | `false` | Shown only when Circular Progress or Counter Progress is on. Pads numbers e.g. `01/04` instead of `1/4`. |

## AUTOSCROLL

| Setting          | Renders to             | Default | Description |
| -------------------- | -------------------------- | ------- | -------------- |
| **Infinite Scroll**   | `data-auto-scroll`          | `false` | Continuous, non-stop scrolling (like a logo marquee) instead of discrete slide steps. |
| **Scroll Speed**      | `data-auto-scroll-speed`    | `4`     | Shown only when Infinite Scroll is on. Pixels moved per frame; negative numbers reverse direction. |

> **Note:** Infinite Scroll only animates when the **Auto-Scroll Extension** is enabled in [Admin Settings](../admin-settings.md#auto-scroll-extension) (it is on by default).

## NAVIGATION

> For more control, use the standalone **DWC Slider Pagination** and **DWC Slider Nav Button** components instead of these flags.

| Setting               | Renders to    | Default |
| ------------------------ | ---------------- | ------- |
| **Navigation Arrows**     | `data-arrows`      | `true`  |
| **Pagination Dots**       | `data-pagination`  | `true`  |

## OVERLAY

Draws a full-cover tint layer over the slider (a `::before` on the slider, behind the slide captions and controls) — handy for improving text contrast over busy images.

| Setting                | Renders to             | Default | Description |
| ------------------------- | -------------------------- | ------- | -------------- |
| **Enable**                 | `data-overlay`             | `false` | Turns the overlay layer on. |
| **Overlay Background**     | `--slider-overlay-bg`      | `color-mix(in oklch, black 55%, transparent)` | Any CSS color or gradient for the tint. |

## LIGHTBOX

Click a slide to open it full-screen in an overlay viewer with its own arrows, swipe/drag, and keyboard navigation. Close it with the ✕ button, the **Esc** key, or a click on the dark backdrop around the content.

| Setting              | Renders to                    | Default | Description |
| -------------------- | ----------------------------- | ------- | -------------- |
| **Lightbox**          | `data-lightbox` (lowercased)   | `False` | `False` / `Images` / `Slides`. `Images` enlarges just the slide's image. `Slides` shows the whole slide — image, captions, buttons, any markup — styled by your own CSS. |
| **Lightbox Arrows**   | `data-lightbox-arrows`         | `true`  | Prev/next arrows inside the overlay. |
| **Lightbox Counter**  | `data-lightbox-counter`        | `false` | A "current / total" readout at the bottom of the overlay. Honors **Counter Leading Zeros**. |
| **Lightbox Transition** | `data-lightbox-type` (lowercased) | `Rewind` | `Rewind` / `Loop` / `Slide` / `Fade` — how the overlay moves between slides. See the note below. |

How it behaves:

* **`Images` mode needs an `<img>` in the slide.** The overlay collects each slide's first image (full-resolution, even if the slider hasn't lazy-loaded it yet). Slides without an image are simply left out of the overlay, and clicking them does nothing. CSS background images don't count.
* **`Slides` mode carries videos and HTML along.** A YouTube/Vimeo embed or `<video>` in your slide plays inside the overlay too. Embeds start fresh in the overlay (the copy reloads), and the plugin stops overlay media when you move to another slide or close — no audio playing on behind the scenes.
* **Clicks that belong to something else are left alone.** Links, buttons, form fields, video/audio player controls, and Nav Buttons (`data-go-to`) inside a slide keep working — only a click on the slide itself opens the lightbox. A drag/swipe never opens it.
* **The page pauses while the overlay is up.** Arrow keys drive only the lightbox (every background slider's keyboard is suspended), and the source slider's autoplay, Infinite Scroll marquee, and playing videos are paused — then restored when you close.
* **Thumbnails ignore the setting** — their click is sync navigation.
* **A slide containing a nested slider** can't be cloned into the overlay; that slider falls back to `Images` mode with a console note.
* **Lightbox Transition:** `Rewind` (default) wraps from the last slide back to the first with an animated snap-back. `Loop` wraps seamlessly instead — it duplicates a couple of edge slides inside the overlay, so a slide with a video embed at the ends loads its player once more. `Slide` stops at the ends (arrows disable there). `Fade` crossfades between slides and wraps around.
* Arrows and the counter hide automatically when the overlay would hold a single item, and the transition degrades to plain `Slide`.

**Styling:** the overlay is themeable **per slider, from your Slider Class** — the same place you style arrows and dots. Set any `--lightbox-*` var there and the plugin copies it onto the overlay each time that slider opens it, so two sliders on one page can have differently themed lightboxes. The vars: `--lightbox-bg` (backdrop tint, default `rgba(0,0,0,.9)`), `--lightbox-img-height` (image max-height, default `90vh`), `--lightbox-slide-height` (slide-content max height in `Slides` mode, default `70vh`), `--lightbox-padding`, `--lightbox-close-size`, `--lightbox-arrow-bg`, `--lightbox-arrow-hover-bg`, and `--lightbox-clr` (close ✕, arrow icons, and counter color). Any *custom* `--lightbox-*` var you add to the class is carried over too, and media queries inside the class work as expected — the overlay tracks the value for the current viewport, even if the window is resized while it's open. Site-wide values on `:root` also work; a slider's own value wins.

## SLIDES

These control per-slide appearance in the active vs. inactive state, applied as inline CSS custom properties on the track.

| Setting               | CSS variable                | Default                        |
| ------------------------ | ------------------------------- | ---------------------------------- |
| **Overflow**              | `data-overflow`                  | `false`                            |
| **Opacity**               | `--slide-opacity`                | `1`                                 |
| **Opacity-Active**        | `--slide-opacity-active`         | `1`                                 |
| **Scale**                 | `--slide-scale`                  | `1`                                 |
| **Scale-Active**          | `--slide-scale-active`           | `1`                                 |
| **TranslateY**            | `--slide-translate-y`            | `0`                                 |
| **TranslateY-Active**     | `--slide-translate-y-active`     | `0`                                 |
| **TranslateX**            | `--slide-translate-x`            | `0`                                 |
| **TranslateX-Active**     | `--slide-translate-x-active`     | `0`                                 |
| **Transform Origin**      | `--slide-transform-origin`       | `center center`                     |
| **Border**                | `--slide-border`                 | `solid 1px transparent`             |
| **Border-Active**         | `--slide-border-active`          | `solid 1px transparent`             |
| **Transition**            | `--slide-transition`             | `0.4s`                              |
| **Transition-Active**     | `--slide-transition-active`      | `0.4s`                              |
| **Border Radius**         | `--slide-radius`                 | –                                   |
| **Height-Inactive**       | `--slide-height-inactive`        | `var(--slide-height-active)`        |

## PERFORMANCE

| Setting                  | Renders to          | Default | Description |
| --------------------------- | ---------------------- | ------- | -------------- |
| **Lazy Load Slider**         | `data-lazy-init`        | `false` | Defer this slider's setup until it's about to scroll into view — useful for sliders below the fold. |
| **Lazy Preload Distance**    | `data-lazy-preload`     | `200`   | Shown only when Lazy Load Slider is on. How many pixels before the slider reaches the viewport it activates (e.g. `300` or `300px`); `0` waits until its edge is exactly at the viewport. |

To defer a **whole wrapper** (every slider inside it) instead of one slider, use **Lazy Load Sliders** on the [DWC Slider Wrapper](dwc-slider-wrapper.md). See [Lazy loading below-the-fold sliders](../styling-and-responsive.md#lazy-loading-below-the-fold-sliders) for the thumbnail-sync rule and details.

## Other settings

| Setting            | Renders to        | Default | Description |
| ---------------------- | -------------------- | ------- | -------------- |
| **Aria Label**          | `aria-label`          | –       | Accessible label for the slider. |
| **data-slider-id**      | `data-slider-id`      | –       | Turns on one of the built-in named animation presets. See [Styling & Responsive Behaviour](../styling-and-responsive.md#animation-presets). |
| **Slider Class**        | `class`               | `.slider-navigation-vars` | The class that carries this slider's own arrow/dot/pagination colors, so you can style each slider independently. See [Styling & Responsive Behaviour](../styling-and-responsive.md#per-instance-styling-slider-class). |

***

## Responsive settings

**Slides Per Page**, **Gap between Slides**, **Slider Height**, **Aspect Ratio**, **Slider Edge Offset**, **Left Offset**, **Right Offset**, **Focus**, and **Sllde Direction** all accept the same responsive shorthand: a base value followed by `lg:`, `md:`, and/or `sm:` overrides, e.g. `3 md:2 sm:1`. **Layout Mode** and **Grid Columns** use it too. See [Styling & Responsive Behaviour](../styling-and-responsive.md#responsive-breakpoints) for exactly how the cascade works — it's desktop-first (max-width), not mobile-first.

The pixel widths those `sm:`/`md:`/`lg:` tokens map to default to the site-wide [Admin Settings](../admin-settings.md) values, but each slider can override them individually via the [BREAKPOINTS](#breakpoints) panel above.

The length fields — **Gap**, **Slider Width**, **Slider Height**, and the edge-offset settings — additionally accept CSS functions (`clamp()`, `calc()`, `var()`, `min()`, `max()`) for values that scale fluidly with the viewport instead of stepping at breakpoints. See [Fluid values](../styling-and-responsive.md#fluid-values-with-clamp-calc-and-var).

***

## Thumbnail / sync setup

To link two Sliders (typically a big main image and a row of thumbnails):

- **Same Wrapper:** set **Slider Role** to `main` on one and `thumbnails` on the other — they sync automatically, no Sync Group needed.
- **Different Wrappers:** give both Sliders the same **Main/Thumbnail Sync Group** name.

Clicking a thumbnail jumps the main Slider to that slide, and the active thumbnail is automatically highlighted as the main Slider moves.

***

## Marquee mode

Turning on **Infinite Scroll** (Auto Scroll) automatically switches the slider into looping mode, turns off arrows/pagination/autoplay, and sets drag to "free" so it feels like a marquee rather than a snap-to-slide carousel. This requires the **Auto-Scroll Extension** to be enabled in [Admin Settings](../admin-settings.md#auto-scroll-extension) (on by default) — if it's off, the slider won't move.

***

## Nested sliders

You can place a Slider **inside a slide** of another Slider — for example, a slide that is itself a little gallery. It's detected automatically: just drop a Slider into a Slide's content and both work. Each keeps its own settings, arrows, pagination, and progress.

A few things to set up for it to behave well:

- **The outer (parent) Slider must be `Slide` or `Fade` — not `Loop` or `Infinite Scroll`.** A looping slider makes hidden copies of its slides, which would duplicate and break the inner slider. If you want the parent to cycle back to the start, use **Fade**, or **Slide** with **Rewind** turned on — both wrap around without making copies. (If you do set a looping type on a slider that contains another, the slider logs a console warning telling you this.)
- **Give the parent a fixed Slider Height or an Aspect Ratio**, so it has a stable size to hold the inner slider.
- **Controls stay with their own slider.** The parent's arrows/pagination move only the parent; controls you place inside the inner slider move only the inner.

**Dragging:** by default the **inner slider doesn't swipe** — you navigate it with its own arrows or pagination — and the parent swipes freely everywhere. This avoids a dead-end where an inner slider that fills the whole slide would otherwise swallow the swipe and leave no way to move the parent. If you *do* want to swipe the inner as well (turn on **Enable Drag** for it), make the **parent vertical** (`Slide Direction` = `ttb`) and keep the inner horizontal — then an up/down swipe moves the parent and a left/right swipe moves the inner, with no conflict.

> Nesting is supported **one level deep** (a slider inside a slider). Deeper nesting isn't officially supported.

**Structure:**

```
DWC Slider Wrapper
└─ DWC Slider  (parent — Slide/Fade, fixed height)
   └─ DWC Slide
      └─ DWC Slider  (inner — its own per-page, gap, arrows/pagination)
         └─ DWC Slide × N
```

***

## Sync Custom Element

Point the slider at other elements on your page — like a stack of headings next to a hero — and it keeps them in step with the current slide.

In **Sync Custom Element**, enter the CSS selector that matches *your own* elements — whatever class you gave them. For example, if your headings all use the class `header-txt`, type `.header-txt` (with the leading dot). Any selector works; there's no special or required class name.

As the slider moves, the plugin keeps three classes up to date on the matched elements:

- `is-active` on the element for the current slide,
- `is-prev` on the one before it, and
- `is-next` on the one after it.

These three names (`is-active`, `is-prev`, `is-next`) are the only fixed part — the plugin adds them for you. The selector you type above is entirely your own.

Then style them however you like:

```css
.header-txt { opacity: 0.3; transition: opacity 0.4s; }
.header-txt.is-active { opacity: 1; }
```

The elements can live anywhere on the page — they don't have to be inside the slider. They also **don't have to match the number of slides**: if there are fewer elements than slides, several slides share an element; if there are more, the extras simply never light up. Leave the field empty to turn the feature off.

**Multiple sets at once.** You can list several selectors separated by commas — for example `.headings, .thumb-strip` — and each set is tracked **independently and at the same time**. Every set gets its own `is-active`/`is-prev`/`is-next` relative to the current slide, cycling within its own elements (so a 4-item set and a 2-item set each wrap on their own count). Commas *inside* a selector — `:is(.a, .b)`, `:not(.x, .y)`, `[data-role="a,b"]` — are left intact and count as one set. Keep the sets distinct: if one element happens to match two of your selectors, the last set listed wins for that element.

**Two-way: use them as go-to buttons.** Turn on **Sync Custom Element Nav** (`data-sync-custom-el-nav`) and the sync becomes two-directional — as well as receiving the classes, each synced element becomes a control that jumps the slider to *its* slide: the first element goes to slide 1, the second to slide 2, and so on. They're keyboard-operable too — the plugin gives each one `role="button"` and `tabindex="0"` (only if you haven't set your own), so Tab, then Enter or Space, works. It also adds a `dwc-sync-nav` class that shows a pointer cursor. This pairs naturally with matched sets — a strip of thumbnails or a list of headings with one element per slide. If a set has **fewer** elements than there are slides, only the slides it can reach become clickable; any elements **beyond** the slide count aren't made interactive. Leave it off (the default) to keep the one-way behavior above.

> Prefer to drive this from your own script instead? The same effect is available through the `ready()` helper — see [JavaScript API](../javascript-api.md).

***

## Custom Options

An escape hatch for the occasional Splide setting that doesn't have its own control in the panels. In **Custom Options**, type the settings you want as a comma-separated list of `name: value` pairs:

```
wheel: true, waitForTransition: false, drag: 'free', speed: 800
```

Values can be `true`/`false`, numbers, or text in quotes. These are applied when the slider starts, and **override the panel settings** if they set the same thing, so reach for this only when a normal control won't do. Leave the field empty to ignore it.

For anything more structured (like per-breakpoint settings or lists), use the `setOptions()` helper in the [JavaScript API](../javascript-api.md) instead — it's built for that.

***

## Slots

| Slot                | Description                                                          |
| ---------------------- | ------------------------------------------------------------------------ |
| `Top__Controls`         | Rendered above the track, inside a controls wrapper — for a Pagination, Nav Button, Progress, or Play-Pause component. |
| `Slides`                | The **DWC Slide** components that make up the track.                     |
| `Bottom__Controls`      | Rendered below the track, inside a controls wrapper.                     |
