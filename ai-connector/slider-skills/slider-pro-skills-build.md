---
icon: hammer
---

# AI Skills Reference: Building

Read this when you are building a slider, a card deck or a template **from scratch**. For changing
a prop, adjusting CSS or fixing an existing build, `slider-pro-skills.md` (same folder) is enough.

Everything in `slider-pro-skills.md` still applies here: the native-first gate, the one-extra-brace
rule, the class mechanisms, the CSS conventions and the gotchas. This file adds only what building
from nothing needs. Read it after that file, never instead of it.

***

## Block JSON

### Component instances are the unit of work

A Slider Pro build is a tree of `etch/component` blocks, each naming a component and carrying a
flat `attributes` map of prop values. **Two different shapes describe the same tree, and mixing
them up is the first thing that goes wrong in a session.**

**The live shape**, which `etch.blocks.getTree()` returns and `etch.blocks.create()` accepts:

```json
{
  "type": "etch/component",
  "version": 1,
  "context": {},
  "children": [],
  "componentId": 6455,
  "attributes": { "wrapperHeight": "350px", "spaceBetweenSliders": "50px" }
}
```

`version`, `context` and `children` are required. Block ids are strings (`"ot2wnef"`), not numbers.

**The export shape**, which you only ever see inside a premade template `.json` file, uses
`blockName`, nests under `attrs`, and calls the component id `ref`:

```json
{ "blockName": "etch/component", "attrs": { "ref": 6455, "attributes": {} }, "innerBlocks": [] }
```

Never pass the export shape to `create()`. It is rejected with
`Invalid block JSON: expected string, received undefined` at `path: ["type"]`. To put a template on
the page, hand its whole `gutenbergBlock` to `etch.blocks.pasteAsync()` instead.

### Children go in a slot, never directly on the component

A component's children must be wrapped in an `etch/slot-content` node naming the slot they fill.
Putting a Slider straight inside a Wrapper's `children` renders nothing.

```json
{ "type": "etch/slot-content", "version": 1, "context": {}, "children": [], "slotName": "Slides" }
```

| Component | Slots |
| --- | --- |
| DWC Slider Wrapper | `Sliders_and_Controls` |
| DWC Slider | `Top__Controls`, `Slides`, `Bottom__Controls` |
| DWC Slide | `Content` |
| DWC Slider Pagination | `PaginationButtons` |
| DWC Slider Nav Button | `Nav_Btn_Content` |
| DWC Slider Progress, DWC Slider Play-Pause | none |

Controls are siblings of the Slider inside `Sliders_and_Controls`, or children of the Slider's own
`Top__Controls` / `Bottom__Controls`. Both work, because controls find their own slider.

***

## Design recipes

Each of these is a shipped template reduced to the settings that produce it.

### Cover-flow carousel (Slider Flow): no script, no CSS

The whole effect is the `slides.*` group, which applies transforms to inactive slides and separate
`-Active` values to the current one.

```js
setGroup(sliderId, 'layout',  { slidesPerPage: '3 lg:1', gapBetweenSlides: '20px',
                                sliderEdgeOffset: 'lg:20% md:18%' });
setGroup(sliderId, 'motion',  { focus: 'center', loop: '{true}', speed: '800',
                                updateOnMove: '{true}' });
setGroup(sliderId, 'slides',  { perspective: '950px', opacity: '0.3', scale: '0.9',
                                borderRadius: '1rem',
                                transition: 'transform 0.5s ease, opacity 0.5s ease' });
setGroup(sliderId, 'dimensions', { sliderHeight: '350px md:300px sm:180px' });
```

`motion.focus: 'center'` is what puts the active slide in the middle. The neighbours are dimmed and
shrunk purely by `slides.opacity` and `slides.scale`, which apply to inactive slides only.

For an angled flip, add `slides.rotateY` and turn on `slides.flipNextRotateY` so the slide on the
other side mirrors the angle instead of repeating it. Same for `translateX` with
`flipNextTranslateX`.

### Logo marquee (Slider Marquee): no script

Two Sliders in one Wrapper, running in opposite directions.

```js
// both rows
setGroup(sliderId, 'dimensions', { slideAutoWidth: '{true}' });   // slides size to content
setGroup(sliderId, 'motion',     { loop: '{true}' });
setGroup(sliderId, 'autoscroll', { infiniteScroll: '{true}', scrollSpeed: '1',
                                   pauseOnHover: '{false}', pauseOnFocus: '{false}' });
setGroup(sliderId, 'layout',     { gapBetweenSlides: '2.4rem' });

// second row only
setGroup(secondId, 'sliderSetup', { slldeDirection: 'rtl' });     // note the spelling
```

Edge Fade goes on the **Wrapper** (`props.edgeFade`), not the sliders, so both rows fade as one
unit. `props.pauseSlidersOnHover` on the Wrapper pauses both rows together.

Infinite Scroll needs the Auto-Scroll extension enabled in admin settings, which is the default.

### Synced elements (Team, Stack)

Driving arbitrary elements on the page from the slider is one prop.

```js
setGroup(sliderId, 'sliderSetup', { syncCustomElement: '.timeline-node',
                                    syncCustomElementNav: '{true}' });
```

The plugin then moves `is-active`, `is-prev` and `is-next` across those elements as the slider
moves, and with nav on, clicking one jumps the slider to it. **You write the CSS for the three
states.** The elements do not need to be inside the slider and do not need to match the slide
count.

The selector takes a comma-separated list, so one slider can drive several groups at once. Team
uses `'.slider-team__sync, .slider-team__sync-heading'` to move a portrait and a heading together.

Grep `## 3. Sync Custom Element` in the reference for multiple selectors and the overlap caveat.

### Main and thumbnails in one wrapper (Zeon)

A full-bleed hero with a thumbnail strip needs no sync prop at all, just roles:

```js
setGroup(mainId,  'sliderSetup', { sliderRole: 'main',       transitionType: 'Fade' });
setGroup(thumbId, 'sliderSetup', { sliderRole: 'thumbnails', transitionType: 'Loop' });
```

Both inside the same Wrapper and they pair automatically. A Wrapper can hold more than one
thumbnail slider, which is how Zeon runs a background layer and a strip off the same main.

### Animating slide content: no script

Splide puts `is-active` on the current `.splide__slide`, which is all you need to animate anything
inside it. Give the element its resting state, then reveal it from the active slide:

```css
/* in .slider-<name>__figure's own entry */
opacity: 0;
transform: translateY(30px);
transition: opacity 820ms cubic-bezier(0.22, 0.68, 0.24, 1),
            transform 820ms cubic-bezier(0.22, 0.68, 0.24, 1);

.splide__slide.is-active & { opacity: 1; transform: translateY(0); }
```

Stagger a caption by putting the same pair on each line with a growing `transition-delay`
(thumbnail 140ms, status 200ms, title 260ms, body 320ms) so the block assembles rather than
appearing at once.

Two things that bite:

* **Keep layout transforms in the animated transform.** An element centred with
  `translateX(-50%)` must animate as `translateX(-50%) translateY(30px)`, or it jumps sideways on
  every transition. Where a breakpoint drops the centring, restate the transform there too.
* **A slow drift on the backdrop** (`scale(1.06)` to `scale(1)` over several seconds) makes a
  change read as movement rather than a cut. Put it on the image, not the slide, so it does not
  fight the transition.

This works with the Fade transition, which crossfades the slides underneath while the contents
move independently.


### Numbered steps beside a slider: no script

A vertical list of steps next to an image, where the number highlights as the image changes, uses
**two mechanisms on one slider**, split by whether the content repeats:

* **What repeats goes in the pagination.** The numbered markers are identical except for the digit,
  which is exactly what `customPaginationMode: 'Template'` does: put one item in the
  `PaginationButtons` slot with a literal `1` in it and the engine clones it per slide, substituting
  the number. Add a slide later and the marker appears by itself. The active marker gets
  `is-active`, and each is a real button, so clicking navigates.
* **What differs goes in a synced set.** Titles and descriptions are per step, and a clone cannot
  carry them, so those are your own elements driven by
  `sliderSetup.syncCustomElement` with `syncCustomElementNav` on.

```js
setGroup(sliderId, 'sliderSetup', { transitionType: 'Fade',
                                    syncCustomElement: '.step',
                                    syncCustomElementNav: '{true}' });
etch.blocks.setAttribute(pagId, 'customPaginationMode', 'Template');
```

Do not force one mechanism to do both. Template mode cannot give each clone its own text, and
faking it with a script to fill the clones is the kind of work the native features already cover.

**Give the template two levels.** The cloned root has to stretch to its row so it can carry the
connecting line, while the circle stays a fixed square at the top:

```
.mark          <- the cloned root; receives is-active, fills the row, draws the line
  .mark-dot    <- the circle and the number
```

State travels from the root to the dot through custom properties, so no descendant selector has to
fight the plugin for the same box:

```css
.mark            { --dot-bg: #e5e7eb; --dot-fg: #4b5563; }
.mark.is-active  { --dot-bg: #45bf55; --dot-fg: #fff; }
.mark-dot        { background: var(--dot-bg); color: var(--dot-fg); }
```

**Let the row count come from the slides, not the stylesheet.** Put both columns in one parent row
so they are the same height, then give each `grid-auto-rows`. Marker *n* then lines up with card
*n* whatever the copy length, and adding a slide needs no CSS change:

```css
.rail  { display: grid; grid-template-columns: auto 1fr; gap: 0 to-rem(24px); }
.marks,
.steps { display: grid; grid-auto-rows: minmax(0, 1fr); }
```

**Hang the connecting line off each marker, not the container.** A single line drawn on the
container has to be told where to stop, which means hardcoding the count. Per marker it is
self-terminating:

```css
.mark:not(:last-child)::after {
  content: ""; position: absolute;
  inset-inline-start: 50%; transform: translateX(-50%);
  inset-block-start: calc(var(--dot-top) + var(--dot-size));
  inset-block-end: 0;
  inline-size: to-rem(2px); background: #e5e7eb;
}
```

The last marker gets no line for free, at any slide count.

Three traps, all silent:

* **Use `minmax(0, 1fr)`, not `1fr`.** `1fr` means `minmax(auto, 1fr)`, so a longer description
  expands its own row and the two columns drift apart by a few pixels per row.
* **Match `gap` on both columns.** The pagination carries a flex `gap` of its own, which shortens
  every row on that side only. Set it explicitly, including `0`.
* **The pagination will not accept your layout without a co-class.** It sets `display: flex` and
  `block-size: fit-content` on `.dwc-slider-pagination-wrapper`, which ties with a single class of
  yours and wins on order. Write the override **inside the entry its class prop already points at**,
  so it stays findable from the element:

```css
/* the .marks entry itself */
position: relative;

&.dwc-slider-pagination-wrapper {
  display: grid; grid-auto-rows: minmax(0, 1fr); block-size: 100%; gap: 0;
}
```


### Carousel on mobile, grid on desktop

```js
setGroup(sliderId, 'layout', { layoutMode: 'static md:slider', gridColumns: '3 sm:1' });
```

Above `md` it is a plain CSS grid; at `md` and below it is a real carousel. The slider is built and
torn down live as the viewport crosses the breakpoint. **Controls are hidden in static mode**,
because there is no live slider to drive.

### Card decks with no slider (Deck, Fall): the one place script is allowed

Structure: a Wrapper with `sliderlessSync.customElement` pointing at your cards, no Slider inside,
cards nested three deep as `card > lift > content` so the 3-D survives.

```js
setGroup(wrapperId, 'sliderlessSync', {
  customElement: '.deck-card', customElementNav: '{true}',
  loop: '{true}', autoplay: '{true}', autoplayInterval: '4000'
});
```

CSS handles the front card and its two neighbours from `is-active` / `is-prev` / `is-next`. What
CSS cannot do is know that a given card is *three* back, so the rows behind, the z-index ladder and
the click targets need a script. That is case 1 of the native-first gate.

The contract between that script and the CSS is one attribute, **`data-pos`**, which the script
derives from `is-active` and writes on every card. It is a **signed** offset from the active card,
so the CSS can fan the left and right sides in opposite directions:

```css
.deck-stack-featured &:is([data-pos='2'], [data-pos='-2']) { /* ring 2, both sides */ }
```

The stack container carries **`data-tiers`**, how many rings are actually in play. It is computed,
not fixed: a looping deck needs spare cards to hide the wrap behind, so the script reduces the
tiers when there are too few cards.

Writing an unsigned rank, or naming the attribute anything else, produces a flat pile: the rules
above simply never match. The shipped script does this:

```js
// 1. make a custom property interpolable, so a blur can animate (case 2)
CSS.registerProperty({ name: '--stack-focus', syntax: '<number>',
                       inherits: true, initialValue: '0' });

// 2. how many rings this deck can afford, given looping and the card count
var mayLoop = wrap.dataset.loop === 'true' && total >= MIN_LOOP;
stack.dataset.tiers = mayLoop ? Math.min(MAX_TIERS, Math.floor((total - 3) / 2)) : MAX_TIERS;

// 3. per card: SIGNED offset from the active card. On a looping deck the offset
//    wraps, so the far end of the list reads as the near side, not as distance 8.
var d = n - active;
if (mayLoop) {
  if (d >  total / 2) d -= total;
  if (d < -total / 2) d += total;
}
card.dataset.pos = d;

// 4. hit-testing: stack order by distance, and clicks off beyond the clickable rings
var rank = Math.abs(d);
card.style.zIndex = String(total - rank);
lift.style.pointerEvents = rank <= NAV_RINGS ? 'auto' : 'none';
```

Do not clamp `data-pos` to the tier count. Cards past the deepest ring should match no rule and
stay stacked at the back; clamping piles them onto the last visible ring instead.

Both decks also set `--i` on each line of card content so the CSS can stagger it:

```js
card.querySelectorAll('.deck-card-featured__content > *')
    .forEach(function (line, j) { line.style.setProperty('--i', j); });
```

Step 4 is Deck only. **Fall's script is much smaller**: it sets `--i` and a signed `data-pos`, and
nothing else. Fall never loops, so there is no wrap to fold and no z-index ladder to maintain,
because the cards fall past each other rather than fanning around a front card.

Recompute on every change: watch the stack with a `MutationObserver` filtered to `class`, since
`is-active` moving is the only signal you get.

### Where a script goes

**Not in a `<script>` element.** Etch silently drops one from the render, so the page looks right
in the builder and ships with no behaviour at all.

Every block has an optional `script` field (`EtchBlockScript`), which is Etch's JavaScript code
block. Put the code on the **component instance that owns the markup**, which for a card stack is
the Wrapper:

```js
const wrapperId = etch.blocks.create({
  type: 'etch/component', version: 1, context: {}, children: [ /* ... */ ],
  componentId: C['DWC Slider Wrapper'], attributes: {},
  script: { code: "(function () { /* ... */ })();" }
});
```

`code` is **plain source** over the API. The base64 you see in a premade template `.json` is only
how the export serialises it; do not encode it yourself.

Etch renders it as `<script type="module" defer>`, so it runs after parsing and top-level `await`
is available. Read it back with `etch.blocks.getJson(id).script`.

Component scripts are also the reason a card deck keeps working: the bridge leaves Sync Without
Slider wrappers unreconstructed precisely so an author's script keeps observing the original nodes.

Card counts for a looping deck: three are always visible (front plus two), and a loop needs a
hidden slot at each end, so **five is the minimum** and nine gives the full three-row fan. Fall
never loops, so it has no minimum.

***

## Block builders

These extend the four helpers in `slider-pro-skills.md`. Include both sets.

```js
function node(extra, children) {
  return Object.assign({ version: 1, context: {}, children: children || [] }, extra);
}

function component(componentId, attributes, children) {
  return node({ type: 'etch/component', componentId: componentId,
                attributes: attributes || {} }, children);
}

function slot(slotName, children) {
  return node({ type: 'etch/slot-content', slotName: slotName }, children);
}

function el(tag, attributes, children) {
  return node({ type: 'etch/element', tag: tag, attributes: attributes || {} }, children);
}

function text(t) { return node({ type: 'etch/text', text: t }); }
```

### Build a wrapper with N slides

```js
const C = comps();
const slides = [];
for (let i = 0; i < 5; i++) {
  slides.push(component(C['DWC Slide'], {}, [
    slot('Content', [ el('div', {}, [ text('Slide ' + (i + 1)) ]) ])
  ]));
}

const id = etch.blocks.create(
  component(C['DWC Slider Wrapper'], {}, [
    slot('Sliders_and_Controls', [
      component(C['DWC Slider'], {}, [ slot('Slides', slides) ]),
      component(C['DWC Slider Nav Button'], {}),
      component(C['DWC Slider Pagination'], {})
    ])
  ])
);
return id;
```

An empty Slide has no content and so no height. Give slides something to size before wondering why
the slider is a flat line.

Build **one** first, screenshot it, then scale to the full count. Do not generate twenty slides
before you have seen one render.
