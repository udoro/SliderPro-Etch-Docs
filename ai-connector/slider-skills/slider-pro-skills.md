---
icon: robot
---

# AI Skills Reference

Everything an agent needs to configure **Slider Pro for Etch** through the Etch AI Connector. Read
this file in full at session start. It has two companions in the same folder, and neither is read
up front:

* **`slider-pro-skills-build.md`** is the building guide: block JSON, slots, the design recipes
  and the block builders. Read it when you are creating something from scratch, and not otherwise.
* **`slider-pro-skills-reference.md`** is lookup-only. Grep into it, never read it whole.

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

Anything longer than one expression goes in a file with `-f`, and use an **absolute path**: a bare
`./script.js` resolves against whatever directory happens to be current.

**Write that file with your file-writing tool, never a shell heredoc.** Script bodies are full of
quotes, backticks, `$` and regex, all of which the shell tries to interpret first. `cat > f <<'EOF'`
fails to parse and writes nothing, so you lose the call and learn nothing. Write the file directly
and the shell never sees the contents.

Keep every temp script in a working subdirectory you made for the task, and delete it when done.

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
etch.styles.create(selector, css)            // returns a STYLE ID; pass it to a class prop
etch.styles.update(id, { selector?, css? })  // NOTE the object. See the warning below
etch.styles.delete(id)
etch.blocks.addClass(blockId, name)          // plain elements only; throws on a component
etch.blocks.getJson(id).script               // { code }, the JavaScript code block
await etch.saveAsync()
```

### Classes: two different mechanisms

Adding a class to a plain element and adding one to a component are **not the same operation**, and
the component path is the one that matters here, because everything Slider Pro ships is a component.

**On a component**, `addClass` throws `Block "<id>" is not an HTML block.` Classes go through the
component's own class-typed prop, and the value is the **style id**, not the class name:

```js
const styleId = etch.styles.create('.flow-demo', 'border-radius: 1rem;');  // returns an id
etch.blocks.setAttribute(wrapperId, 'customClass', styleId);
```

Etch resolves the id to the selector name when it renders, so the page gets
`class="dwc-slider-wrapper flow-demo"`. The id never appears in the output. Store the id, not the
name, so the class survives being renamed in the Etch UI.

The class-typed props, one per component:

| Component | Prop |
| --- | --- |
| DWC Slider Wrapper | `customClass` |
| DWC Slider | `sliderClass` |
| DWC Slide, Progress, Play-Pause, Pagination | `class` |
| DWC Slider Nav Button | `buttonClass`, `buttonWrapperClass` |

**On a plain element**, use `addClass` with the bare class name, no dot and no id:

```js
etch.blocks.addClass(plainElementId, 'fall-card');   // no dot, no style id
```

Passing a style id here does not resolve. It is treated as a literal name and sanitised, so
`30xsolr` silently becomes the class `xsolr`. Creating the element with `attributes: { class: '...' }`
works too and is fine when you are building a subtree in one call.

Either way the CSS rule itself is `etch.styles.create('.fall-card', '...')`, which is what the
selector has to match.


### CSS conventions

Match the shipped templates. An install that already has premade sliders on it has these
conventions everywhere, and a build that ignores them reads as foreign.

**Naming.** The block is the slider, named after the design:

| Thing | Pattern | Example |
| --- | --- | --- |
| Wrapper class, slider designs | `.slider-<name>-wrapper` | `.slider-flow-wrapper` |
| Wrapper class, card stacks | `.slider-wrapper-<name>` | `.slider-wrapper-fall` |
| Slider class | `.slider-<name>` | `.slider-chronos` |
| Elements | `.slider-<name>__<element>` | `.slider-team__sync` |
| Modifiers | `.slider-<name>__<element>--<variant>` | `.slider-afterform__word--form` |

The wrapper class carries the word `wrapper` and the slider class carries the word `slider`. Do not
invent a short prefix of your own.

**One style entry per element class.** Never one nested parent entry holding the whole component.
`etch.styles.create()` per class, each with its own CSS:

```js
const S = {};
S.wrapper = etch.styles.create('.slider-afterform-wrapper', '/* ... */');
S.caption = etch.styles.create('.slider-afterform__caption', '/* ... */');
S.title   = etch.styles.create('.slider-afterform__caption-title', '/* ... */');
```

Inside an element's **own** entry, nesting is preferred for media queries, pseudo-elements
(`&::after`), states (`&:hover`, `&.is-active`), ancestor states
(`.splide__slide.is-active &`) and child tag selectors (`& img`, `& svg`). Do **not** nest another
class's rules (`&__title`) inside a different class's entry: that class gets its own entry.

**Wrap px values in `to-rem()`.** Etch preprocesses style-entry CSS and converts them, so write
`to-rem(80px)`, never a raw `80px` and never a hand-converted `5rem`. It works inside media queries
too. Leave unitless values alone (`z-index`, `opacity`, `line-height`, aspect ratios).

```css
--offset: to-rem(80px);
@media (width <= to-rem(767px)) { --offset: to-rem(40px); }
```

**Every rule for an element belongs in the entry its class prop already points at.** It is tempting
to answer a specificity problem with a second, more specific entry, for example
`.dwc-slider-pagination-wrapper.my-class`. Do not. That entry is attached to no block, so selecting
the element in Etch does not reveal it and the author cannot find the rule to edit. Nest the
stronger selector inside the element's own entry instead, which gives the same specificity:

```css
/* inside the .my-class entry */
&.dwc-slider-pagination-wrapper { display: grid; }
```

A style entry that no block references also survives deleting the element it was written for.


**`etch.styles.update` takes an object, and a string fails silently.** The signature is
`update(id, { selector, css })` and it reads `arg.css`. Hand it a bare CSS string and `arg.css` is
`undefined`, so it falls back to the entry's existing CSS, writes that back unchanged, and **throws
nothing**. The call looks like it worked. Read the entry back from `etch.styles.list()` and compare
the CSS before believing an update landed.

**Renaming is not one operation.** A style entry's selector and a block's `class` attribute are
independent. Renaming the selector rewrites the rendered class only where the class came from a
**component class prop**, because that prop stores the style id and resolves it at render. On a
plain element the `class` attribute is literal, so a selector rename leaves it pointing at a
selector that no longer exists. Rename both, or the element silently loses its CSS.


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

You cannot see the page from inside safe mode, and a read-back is not a substitute. A
`getAttribute` read proves a value **persisted**; only looking at output proves the page is
**right**. Say which of the two you reached.

**You can reach rendered verification on your own.** The Etch builder sits behind the user's
WordPress session, but the published page does not. Save first, or you will verify the old page.

**1. Fetch the published page.** Cheapest, and often enough. Proves classes, attributes and text
reached the markup.

```bash
curl -s "https://the-site.com/the-page/" -o page.html
grep -o 'data-focus="[^"]*"' page.html      # did the prop reach the engine?
```

Count matches with `grep -o ... | wc -l`, not `grep -c`, which counts lines: rendered pages are
minified onto very few lines and `grep -c` will report 1 for everything. Remember the page also
inlines your style entries, so a class name appears once more than it does in the markup.

**2. Screenshot it with your own headless browser.** Launch a fresh instance on a spare port with
its own throwaway profile, then kill it and delete the profile when done. The page is public, so it
needs no session.

```bash
chrome.exe --headless=new --remote-debugging-port=9555 \
  --user-data-dir="<temp dir>/cdp-profile" --no-first-run about:blank &
```

Then drive it over CDP: `Page.navigate`, wait for `Page.loadEventFired`, wait again for Splide to
mount and images to decode, then `Page.captureScreenshot`. `Runtime.evaluate` gives you
`getComputedStyle` and `getBoundingClientRect`, which is how you turn "the dots look small" into a
measurement. **Then actually look at the screenshot.** A slider that mounted is not a slider that
looks right.

Write attribute probes as `[data-x="false"]`, not `[data-x]`: the bare attribute selector matches
whatever the value is, so a switched-off control still counts and you will report it as still there.

> **Do not use the connector's `shot`, `html` or `computed`, and never ask the user to relaunch
> their browser with `--remote-debugging-port=9222`.** Those attach to the user's own Chrome, so
> they cost the logged-in session being tested and fail outright when that port is not already
> open. The route above needs neither.

**What this cannot show you**, and has to be handed to the user: unpublished pages, logged-in-only
content, and anything you have not saved yet.

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

**Build from scratch:** read `slider-pro-skills-build.md` now. Components and props first, then CSS.

Reach for a premade template only when the user names one ("use Deck Featured"). Then paste its
JSON and customise, and read `../../card-stack-templates.md` or `../../premade-templates.md` for
its knobs.

**If the user points at an existing slider**, first check whether it is a premade template. Grep
`## 5. Recognising an existing setup` in the reference for the signature classes, and if it matches,
configure it the way its documentation describes instead of inventing new CSS over the top.

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

function findByRef(nodes, componentId, out) {
  out = out || [];
  for (const n of nodes || []) {
    if (n.componentId === componentId) out.push(n);
    findByRef(n.children, componentId, out);
  }
  return out;
}
```

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

**Adding a control component does not remove the built-in one. Switch the built-in off yourself.**
Three of them ship **on**, and each renders a second set of controls underneath your design:

| Built-in | Prop | Default |
| --- | --- | --- |
| Arrows | `props.navigation.navigationArrows` | `true` |
| Pagination dots | `props.navigation.paginationDots` | `true` |
| Play/pause toggle | `props.autoplay.playPauseButton` | `true` |

Dropping in a DWC Slider Pagination while `paginationDots` is still `true` gives you two sets of
dots, and `playPauseButton` puts a circular toggle at the slider's bottom-right of a design that
never asked for one. This is the one place the "never set a prop to its default" rule reads
backwards: you are not setting a default, you are turning an unwanted default off.

**Pagination dot size is derived from the dot font size. Change the font size, not the size.**
`props.dot.size` is declared as `calc(var(--font-size) * 2)`, so it tracks `props.dot.fontSize`
by design. Writing a fixed `size` severs that and the dots stop scaling with the type. Leave
`size` alone and set `fontSize` to half the dot you want: `0.32rem` gives a 10px dot.

Default mode also puts the slide **number** inside each dot. For plain dots set
`props.dot.textColor` and `props.dot.activeTextColor` to `transparent`.

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

**A component's declared default is never written onto an instance you create.** Defaults populate
the Etch settings panel. They are not present in the attributes map of a block you create through
the API, so `getAttribute` returns nothing for them. This is the one exception to "never set a prop
to its default", and it fails silently in two different ways.

**Symptom one, a condition that never matches.** When a condition inside the component reads a flag
prop and the key is absent, the expression does not resolve and the condition returns false
**whichever operator it uses**, so both branches vanish at once. A DWC Slider Nav Button created
with `navigationType` alone renders `<button>` with no icon: the default arrow sits behind
`useCustomArrow isFalsy` and the custom SVG behind `useCustomArrow isTruthy`, and neither appears.
Writing `useCustomArrow: '{false}'`, already the default, makes the arrow render. If a component
renders structurally but its inner content is missing, check this first.

**Symptom two, a class prop that silently replaces the default.** Class props are arrays of
**space-separated style ids**. Writing one id does not add to the default, it becomes the whole
value, and the default is gone with no error. Setting `sliderClass` to your own class alone drops
the slider's navigation variables, which carry the arrow, pagination, play/pause and progress
styling, and nothing looks wrong until one of those controls misbehaves. Always read, append,
write back, never overwrite.

## `sliderClass` carries a minted per-instance class

Every slider needs its **own copy** of the navigation variables so two sliders on one page can be
styled independently. The plugin mints that copy for you as a class named `.dwc-slider-vars-XXXXXX`
whose CSS is copied from `.slider-navigation-vars`. A correctly built slider holds the minted class
plus any design class of your own, which is what every premade template does:

```
.dwc-slider-vars-vsj76d  .slider-chronos
```

**Never put `.slider-navigation-vars` into the slot yourself.** Resolving it by selector and writing
that shared id looks right and renders right, so nothing warns you. It silently breaks duplication:
the plugin only manages classes matching `.dwc-slider-vars-*`, so a slider carrying the shared
default gets no fresh class when it is duplicated, and every copy then reads one set of variables.
Recolouring one slider's arrows changes them all. This is the single easiest way to ship a slider
that looks finished and is not.

**Create first, append second.** Leave `sliderClass` alone when you create the slider. The plugin
polls roughly every two seconds and mints a class for any instance that appeared after the builder
loaded while the prop is still unset. Once it has, read the value back and append your design class
to what it wrote:

```js
const ids = (etch.blocks.getAttribute(sliderId, 'sliderClass') || '').split(/\s+/).filter(Boolean);
// ids now starts with a minted .dwc-slider-vars-* id. Append to it, never replace it.
ids.push(myStyleId);
etch.blocks.setAttribute(sliderId, 'sliderClass', ids.join(' '));
```

If the prop is still empty after a few seconds, mint one yourself. Copy the CSS from
`.slider-navigation-vars` and keep the required name shape, because a class named anything else is
not managed:

```js
const src = etch.styles.list().find(s => s.selector === '.slider-navigation-vars');
const taken = new Set(etch.styles.list().map(s => s.selector));
let selector;
do {
  selector = '.dwc-slider-vars-' + Math.random().toString(36).slice(2, 8);
} while (taken.has(selector));
const varsId = etch.styles.create(selector, src.css);
```

**Resolve by selector, not by the documented id.** The prop reference records `sliderClass`'s
default as a style id, but that id differs per install, so look the style up by
`.slider-navigation-vars` when you need its CSS to copy.

**Verify the shape before you call the slider done.** Read `sliderClass` back and confirm it holds
exactly one `.dwc-slider-vars-*` id, plus your design class if you added one. A slider holding
`.slider-navigation-vars`, or holding no vars class at all, is a defect you introduced.

**Anything whose resting state waits on `is-active` breaks in edit mode.** The slider runs in
Preview but not while the user is editing, so in edit mode no slide carries `is-active` and none of
your active-state rules apply. Height that comes from the active slide collapses; an element
resting at `opacity: 0` stays invisible. Guard on the condition "nothing is active yet", which is
true only in edit mode and switches itself off the moment the slider runs:

```css
.figure { opacity: 0; }
.splide__slide.is-active .figure { opacity: 1; }
.splide:not(:has(.splide__slide.is-active)) .figure { opacity: 1; }
```

**Where the check goes depends on which element receives the class.** Above, the slide becomes
active and the figure is inside it, so the test sits on a shared ancestor. With Sync Custom Element
your own elements receive `is-active` themselves, so test their container instead:
`.steps:not(:has(.step.is-active)) .step`. A single canned selector does not fit every case; work
out which element actually gets the class first.

`.etch-builder-block` alone is not enough. It says "in the builder", not "not running", so a rule
gated only on it can also suppress the effect in Preview.

**The same gate is needed for anything positioned against the slide, not just for `is-active`
states.** A slide's height arrives with Splide. Until it mounts the slide has none, so absolutely
positioned children have nothing to sit in, and the whole design collapses into a pile in the
builder. That covers an overlay caption, a corner button and an `inset: 0` image alike. Give the slide a height under
the same "nothing is active yet" condition, so it applies in the builder and stops the moment the
slider runs:

```css
/* inside the slide class's own entry */
position: relative;

.splide:not(:has(.splide__slide.is-active)) & {
  min-block-size: to-rem(480px);
}
```

Build the design so the builder shows something honest. An author who cannot see the slide cannot
edit its content.

**Read computed style, not source, to decide what the plugin already does.** `getComputedStyle(el)`
answers directly and in one call. Do not conclude from page source that a rule is absent: component
styles are inlined into the page but the engine's stylesheet is a separate file, so a rule can be
in force while being nowhere in the HTML. Presence in the DOM is not visibility either, since a
hidden element is still there.

**Do not anchor against a neighbour that stops shrinking.** A `vw` offset tuned at one width
silently collides at another, because `min()` and `clamp()` neighbours stop shrinking while the
`vw` keeps going. Derive the clearance from the neighbour's real footprint instead:

```css
/* wrong: fits at 1771, overlaps the column from 1024 to 1430 */
right: 17.6vw;
/* right: reserve exactly what the column occupies */
right: calc(4vw + min(15vw, 195px) + 2.5vw);
```

Check the mid range explicitly. Between the widest layout and the first breakpoint is where
side-by-side compositions fail, and it is the range nobody screenshots.

**Missing Preview and Grid buttons on a slider you just built mean the install is older than
1.2.1, not that the build is broken.** The builder watches the canvas and attaches those controls
to sliders as they appear, but before 1.2.1 that watcher only started if a slider was **already**
on the page when the builder loaded. Build onto an empty page there and nothing is watching, so the
controls never appear until the tab is reloaded, however the blocks were added, by script or by
hand.

You cannot fix it from a script on those versions: the refresh is an iframe reload, and safe mode
has no `window` or `document` to reach it with. Do not paper over it by sending the user to reload
every time. Confirm the blocks and the published page are right, tell them it is fixed in 1.2.1,
and mention that a reload brings the controls back meanwhile. Preview is how they watch the slider
actually run, so it is worth naming rather than leaving them to find it.

**A save can lag the front end.** `etch.saveAsync()` resolves before the change is necessarily
readable on the published page, so a fetch straight afterwards can return the previous value and
look like a failed write. Re-read through `etch.blocks.getAttribute` to confirm intent, and treat a
stale page as latency rather than loss. Reloading the builder tab flushes anything pending.


### Do not

* Hardcode component IDs.
* Set an arbitrary `data-*` on a component instance. `setAttribute` will reject it.
* Write script for anything the `slides.*` group, the shorthand, or Sync Custom Element already
  does.
* Rebuild a premade template's CSS from scratch when the user is asking you to adjust one.
* Save after every attribute. Batch the change, then save once.
* Report success without a screenshot.
