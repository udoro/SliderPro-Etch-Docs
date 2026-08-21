---
icon: robot
---

# AI Skills Reference

Everything an agent needs to build and configure **Slider Pro for Etch** through the Etch AI
Connector. Read this file in full at session start. Its companion,
`slider-pro-skills-reference.md`, is lookup-only: Grep into it, never read it whole.

### When to consult the reference file

| You need | Section to Grep |
| --- | --- |
| A prop's exact key, path, attribute or default | `## 1. Prop reference` |
| A CSS variable name for arrows, dots, progress or the lightbox | `## 2. CSS variables` |
| Sync Custom Element details, multiple selectors, the overlap caveat | `## 3. Sync Custom Element` |
| Custom Options or the JavaScript API | `## 4. Escape hatches` |
| Whether an existing build is a premade template | `## 5. Recognising an existing setup` |
| Site-wide plugin settings | `## 6. Admin settings` |

Everything else lives here.

***

## START HERE: mandatory workflow

Do these in order. Skipping a step is how sessions go wrong.

### 0. Skill file first

Read this file before touching the connector. If the user asks for something and you have not read
it this session, read it now.

### 1. Connect and preflight

```bash
npx @digital-gravy/etch-connector serve      # once; leave running
npx @digital-gravy/etch-connector tabs       # confirm exactly one tab for this site
```

The tab name printed as `+ tab "..."` is the `-t` value for every `eval`. Use **one connected tab
per site**. Never two tabs on the same site.

Then confirm the plugin is actually there before planning anything:

```js
const comps = etch.components.list();
return comps.filter(c => c.name.startsWith('DWC Slider') || c.name === 'DWC Slide')
            .map(c => c.name + ' = ' + c.id);
```

If that returns fewer than seven, stop and tell the user the components are not installed or are
out of date. Do not improvise replacements.

### 2. Scope clarification and user confirmation gate

Before building, state back in one short paragraph: what you will create, where it will go, and
what you will change on anything that already exists. Wait for confirmation. Never restructure an
existing page as a side effect of adding a slider.

### 3. Resolve component IDs by name, every session

**Component IDs are site-specific. Never hardcode them.** Resolve all seven by name at the start of
every session and keep the map for the rest of it.

```js
const byName = {};
for (const c of etch.components.list()) byName[c.name] = c.id;
// byName['DWC Slider Wrapper'], byName['DWC Slider'], byName['DWC Slide'], ...
```

### 4. The native-first gate

**Slider Pro is props and CSS. It is almost never JavaScript.**

Before you write a single line of script, you must be able to say which of these two cases you are
in. If neither applies, you are about to do something the plugin already does:

1. **A per-element index or distance beyond plus or minus 1.** The plugin gives you exactly three
   state classes: `is-active`, `is-prev`, `is-next`. That is distance 0 and plus or minus 1.
   A design needing "the third card back sits lower and darker", a z-index ladder, or hit-testing
   past the immediate neighbours cannot be expressed from those classes, because nothing in the
   DOM says how far a given element is from the active one.
2. **An interpolable custom property.** `CSS.registerProperty({ name: '--x', syntax: '<number>' })`
   so a number can animate. A plain custom property does not interpolate.

Everything else is a prop or a CSS rule. In particular, **do not write script for**: per-slide
transforms, tilts, scaling, fading or perspective (the `slides.*` group does all of it), responsive
behaviour (the shorthand does it), autoplay, looping, marquees, syncing elements to a slider, or
turning a carousel into a grid.

### 5. Declare before you script

State the method before writing the code: which blocks you will touch, which props you will set,
and, if you are writing script, which of the two cases above applies. One sentence each.

***

## Connector contract

### Running scripts

```bash
npx @digital-gravy/etch-connector eval "return etch.blocks.getTree().length" -t "<tab>"
npx @digital-gravy/etch-connector eval -f ./script.js -t "<tab>" --timeout 30000
```

Anything longer than one expression goes in a file with `-f`. Inline multi-line quoting breaks in
every shell eventually.

### Safe mode

Scripts see `etch` and standard JavaScript built-ins. **`window`, `document`, all browser globals,
network and storage are blocked.**

```
ReferenceError: "window" is not available in safe mode
```

This matters constantly here: you cannot query the DOM to check what a slider rendered. Use
`etch.blocks.*` to inspect the document, and the CDP commands below to see the result.

### The `etch` API surface

```js
Object.keys(etch)
// ["blocks", "loops", "styles", "stylesheets", "components",
//  "navigation", "fields", "ui", "history",
//  "saveAsync", "connectAs", "apiVersion", "version"]
```

The ones this work uses:

```js
etch.blocks.getTree()                        // whole document
etch.blocks.getJson(blockId)                 // one block + subtree
etch.blocks.find({ type, class, attribute }) // ids of matching blocks
etch.blocks.getAttribute(blockId, key)
etch.blocks.setAttribute(blockId, key, value)
etch.blocks.create(json, parentId?, index?)  // returns new id
etch.components.list()                       // [{ id, name }, ...]
etch.components.getJson(id)                  // .properties and .blocks
etch.styles.list()                           // [{ id, selector, type, collection, css }]
await etch.saveAsync()
```

### Component instances are the unit of work

A Slider Pro build is a tree of `etch/component` blocks, each carrying `ref` (the component id) and
a flat `attributes` map of prop values:

```json
{
  "blockName": "etch/component",
  "attrs": {
    "metadata": { "name": "-  Flow" },
    "ref": 6455,
    "attributes": { "wrapperHeight": "350px", "spaceBetweenSliders": "50px" }
  }
}
```

### Group props and the one-extra-brace rule

Most Slider props live in groups (`layout`, `motion`, `slides`, `autoplay`, ...). A group is stored
as JSON wrapped in **one extra layer of braces**:

```js
function getGroup(blockId, key) {
  const raw = etch.blocks.getAttribute(blockId, key);
  return raw ? JSON.parse(raw.slice(1, -1)) : {};   // strip one { and one }
}

function setGroup(blockId, key, obj) {
  etch.blocks.setAttribute(blockId, key, '{' + JSON.stringify(obj) + '}');
}
```

Read, modify, write back. Never assemble a group from scratch unless you intend to drop every
value already in it.

**Booleans inside groups are strings**, not JS booleans:

```js
motion.loop = '{true}';    // correct
motion.loop = true;        // wrong, silently useless
```

**`setAttribute` validates the key** against the component's registered properties. You cannot set
an arbitrary `data-*` on a component instance. If a key is rejected, you have the wrong key: check
the prop reference.

### Visual verification

You cannot see the page from inside safe mode. After any visual change:

```bash
npx @digital-gravy/etch-connector shot -t "<tab>" -s ".my-slider" -o ./out.png
npx @digital-gravy/etch-connector html ".my-slider" -t "<tab>"
npx @digital-gravy/etch-connector computed ".my-slider .splide__slide" -t "<tab>" --props transform,opacity
```

Then actually look at the screenshot. A slider that mounted is not the same as a slider that looks
right.

### Saving

```js
await etch.saveAsync();
```

Save once at the end of a coherent change, not after every attribute. Use `--timeout 30000` or
more for scripts that save.

***

## The structural contract

Get this right and most things work by themselves.

```
DWC Slider Wrapper          [data-slider-wrapper]
  DWC Slider                [data-slider-role="main"] .splide
    DWC Slide               .splide__slide
    DWC Slide
  DWC Slider Nav Button     (arrows)
  DWC Slider Pagination     (dots)
  DWC Slider Progress       (bar / circular / counter)
  DWC Slider Play-Pause
```

Four rules follow from it:

1. **Controls find their own slider.** Every control searches the Slider first, then the Wrapper.
   Put arrows above the track and a counter below it and both connect. There are no IDs to wire.
2. **A Wrapper can hold more than one Slider.** Set `sliderSetup.sliderRole` to `main` on one and
   `thumbnails` on the other and they sync automatically. No Sync Group needed.
3. **Across separate Wrappers**, a main and thumbnail pair needs a matching
   `sliderSetup.mainThumbnailSyncGroup` on both.
4. **A Wrapper with `sliderlessSync.customElement` set and no Slider inside** switches into Sync
   Without Slider. That combination alone is the trigger.

***

## Decision tree

**Build from scratch:** components and props first, then CSS.

Reach for a premade template only when the user names one ("use Deck Featured"). Then paste its
JSON and customise, and read `../../card-stack-templates.md` or `../../premade-templates.md` for
its knobs.

**If the user points at an existing slider**, first check whether it is a premade template. Grep
`## 5. Recognising an existing setup` in the reference for the signature classes, and if it matches,
configure it the way its documentation describes instead of inventing new CSS over the top.

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

### Synced elements (Zeon, Chronos, Team)

The pattern behind the full-bleed hero, the timeline and the staff showcase is one prop.

```js
setGroup(sliderId, 'sliderSetup', { syncCustomElement: '.timeline-node',
                                    syncCustomElementNav: '{true}' });
```

The plugin then moves `is-active`, `is-prev` and `is-next` across those elements as the slider
moves, and with nav on, clicking one jumps the slider to it. **You write the CSS for the three
states.** The elements do not need to be inside the slider and do not need to match the slide
count.

Grep `## 3. Sync Custom Element` in the reference for multiple selectors and the overlap caveat.

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
the click targets need a script. That is case 1 of the native-first gate. The shipped script does
exactly three things:

```js
// 1. make a custom property interpolable, so a blur can animate (case 2)
CSS.registerProperty({ name: '--stack-focus', syntax: '<number>',
                       inherits: true, initialValue: '0' });

// 2. per card: distance from the active one, capped at the deepest tier the CSS defines
var rank = Math.abs(distanceFromActive);
card.setAttribute('data-tier', Math.min(rank, MAX_TIERS));

// 3. hit-testing: stack order by rank, and clicks off beyond the clickable rings
card.style.zIndex = String(total - rank);
lift.style.pointerEvents = rank <= NAV_RINGS ? 'auto' : 'none';
```

Step 3 is not optional. Stacked cards are coplanar, so the browser hit-tests them by DOM order and
a click near the front card can land on one three positions away.

Card counts for a looping deck: three are always visible (front plus two), and a loop needs a
hidden slot at each end, so **five is the minimum** and nine gives the full three-row fan. Fall
never loops, so it has no minimum.

***

## Script library

Include these at the top of any script.

```js
function comps() {
  const m = {};
  for (const c of etch.components.list()) m[c.name] = c.id;
  return m;
}

function getGroup(id, key) {
  const raw = etch.blocks.getAttribute(id, key);
  return raw ? JSON.parse(raw.slice(1, -1)) : {};
}

function setGroup(id, key, patch) {
  const next = Object.assign(getGroup(id, key), patch);
  etch.blocks.setAttribute(id, key, '{' + JSON.stringify(next) + '}');
}

function component(ref, attributes, children) {
  return {
    blockName: 'etch/component',
    attrs: { ref: ref, attributes: attributes || {} },
    innerBlocks: children || []
  };
}

function findByRef(nodes, ref, out) {
  out = out || [];
  for (const n of nodes || []) {
    if (n.componentId === ref || (n.attrs && n.attrs.ref === ref)) out.push(n);
    findByRef(n.children || n.innerBlocks || [], ref, out);
  }
  return out;
}
```

### Build a wrapper with N slides

```js
const C = comps();
const slides = [];
for (let i = 0; i < 5; i++) slides.push(component(C['DWC Slide'], {}));

const id = etch.blocks.create(
  component(C['DWC Slider Wrapper'], {}, [
    component(C['DWC Slider'], {}, slides),
    component(C['DWC Slider Nav Button'], {}),
    component(C['DWC Slider Pagination'], {})
  ])
);
return id;
```

Build **one** first, screenshot it, then scale to the full count. Do not generate twenty slides
before you have seen one render.

### Read the current state of a slider

```js
const C = comps();
const slider = findByRef(etch.blocks.getTree(), C['DWC Slider'])[0];
const out = {};
for (const k of ['sliderSetup', 'layout', 'dimensions', 'motion', 'autoplay',
                 'navigation', 'slides', 'autoscroll', 'lightbox', 'breakpoints']) {
  out[k] = getGroup(slider.id, k);
}
return JSON.stringify(out, null, 1);
```

Do this before changing anything on a slider you did not build.

***

## Rules and gotchas

Each of these is a real failure, not a style preference.

**The responsive shorthand is desktop-first.** `3 md:2 sm:1` means 3 on the widest screens, 2 at
`md` and below, 1 at `sm` and below. The bare value is the **largest** screen. Breakpoints are
max-widths (default SM 640, MD 1024, LG 1120). Writing it mobile-first is the single most common
mistake, and `ltr sm:ttb` does the opposite of what it looks like.

**Never set a prop to its default.** It adds noise to the markup and hides real intent.

**A nested inner slider must be Slide or Fade, never Loop or Infinite Scroll.** A looping slider
makes hidden copies of its slides, and copying a slider that contains a slider breaks both. To wrap
around, use Fade, or Slide with Rewind.

**Do not put `overflow`, `opacity`, `filter`, `clip-path`, `mask`, `mix-blend-mode`, `isolation` or
`contain` on a 3-D stack, its cards, or the lifts.** Any one of them flattens the 3-D into a single
pile. If you need to clip or tint, add a separate wrapper outside the stack and put it there.

**Static layout mode hides the controls**, because there is no live slider to drive. Do not add
arrows to a slider that is static at every breakpoint.

**Slide Auto Width disables Slides Per Page.** Each slide takes its content's width, so the slides
need their own sizing.

**A vertical slider needs a height.** `slldeDirection: 'ttb'` cannot derive height from width, so
set `dimensions.sliderHeight` or `aspectRatio`. Both take the shorthand.

**Splide is a hard dependency for anything with a track.** Card stacks keep working without it,
sliders and the lightbox do not. If the site has When to Load Slider Assets on "Never", say so
rather than debugging a slider that will never start.

**Do not touch the plugin's own stylesheet.** Style through the Slider Class and CSS variables.

### Do not

* Hardcode component IDs.
* Set an arbitrary `data-*` on a component instance. `setAttribute` will reject it.
* Write script for anything the `slides.*` group, the shorthand, or Sync Custom Element already
  does.
* Rebuild a premade template's CSS from scratch when the user is asking you to adjust one.
* Save after every attribute. Batch the change, then save once.
* Report success without a screenshot.
