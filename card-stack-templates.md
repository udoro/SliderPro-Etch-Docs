---
icon: layer-group
---

# Card Stack Templates

Three premade templates build a **stack of cards with no slider in it**: **Deck Featured**, **Deck Testimonial** and **Fall**. Cards sit on top of one another in 3-D, and one card at a time comes to the front.

A fourth, **Slider Stack**, uses the same cards and the same 3-D, but keeps a real slider and syncs the deck to it. Everything on this page applies to it except where noted, and it has [its own section](#slider-stack-the-same-deck-driven-by-a-real-slider) at the end.

There's no track and nothing scrolls. The wrapper moves a set of classes (`is-active`, `is-prev`, `is-next`) from card to card, and CSS does the rest. That's the [Sync Without Slider](components/dwc-slider-wrapper.md#sync-without-slider) feature, so these templates contain **no DWC Slider and no DWC Slide** at all: just the wrapper, your cards, two Nav Buttons and a counter.

Everything below is a setting you change in Etch. Change one thing at a time and refresh. If something looks wrong, undo it and try a smaller change.

## Deck or Fall

Pick whichever movement suits your content, and import that template.

**Deck** fans the cards out either side of the front card and shuffles the next one forward. Turn Loop on and it cycles round for ever.

**Fall** queues the cards up behind one another, each peeking above the one in front. When you move on, the finished card drops away off the bottom of the screen. It stops at the last card on purpose: a card that's been thrown away shouldn't come back.

Deck comes in two flavours with identical behaviour and different card contents:

| | Deck Featured | Deck Testimonial | Fall |
| --- | --- | --- | --- |
| Cards included | 9 | 5 | 5 |
| Loops round | Yes | No | No |
| Click a card to bring it forward | Yes | Yes | No |
| Plays on its own | Yes | No | No |
| Shape of a card | Tall (3 / 4) | Square (1 / 1) | Tall (4 / 5) |
| Inside each card | Image, category, name, tags, price | Quote mark, quote, avatar, name | Badge, icon, title, body |

All three ship with everything already wired up: arrows, counter, keyboard, and the small script that drives the animation. There's nothing to install or paste in.

Because there's no slider involved, a card stack doesn't need the Splide library at all. If your site is built only from these, you can stop sending it. See [When to load slider assets](admin-settings.md#when-to-load-slider-assets).

## What you see in Etch

Open the Structure panel after pasting a template and you'll find this. Names differ slightly between Deck and Fall; Deck Featured is shown here.

```
- Deck Featured (Sliderless)      ← the wrapper. All the behaviour settings are here
  Container                       ← the heading and sub-heading above the stack
  Deck Stack - Control            ← the stack. All the look-and-feel settings are here
    Deck Card                     ← one card. Duplicate or delete these
      Lift
        Content                   ← everything the visitor reads sits in here
    Deck Card
    ...
  nav buttons                     ← the arrows and the counter
```

Two elements matter most:

- **The wrapper** (`- Deck Featured (Sliderless)`) holds the behaviour settings: loop, autoplay, arrow keys, clickable cards. They're in its **Sliderless Sync** group. It also carries the small script that drives the animation, on its **Script** tab, so don't delete it.
- **The stack** (`Deck Stack - Control`, or `Stack - Controls` on Fall) holds the look: every colour, size and animation setting is a variable in its style block.

You never have to write any of that script. On the two Deck templates it does start with three named numbers, two of which are yours to adjust, `MAX_TIERS` and `NAV_RINGS`, both explained further down. The third, `MIN_LOOP`, is a safety rule about how few cards a loop can hide its wrap-around behind; leave it as it is. Fall's script has nothing to adjust.

> The script and the wrapper's **Custom Element** field both refer to the cards by class name. If you rename `deck-card-featured` (or the stack, or the lift), update it in both places, or the stack stops animating.

Every card is three levels deep: **Deck Card → Lift → Content** (**Fall Card → Lift → Content** on Fall). That nesting is what produces the 3-D depth, so keep it. Put your content inside **Content**.

Fall is laid out the same way, minus the heading Container: its stack is called **Stack - Controls** and holds five **Fall Card** elements.

## Adding and removing cards

Duplicate a whole **Deck Card** (**Fall Card** on Fall) in the Structure panel to add one; delete a whole one to remove it. Then edit the text and images inside.

Nothing else needs updating. The spacing, the fanning, the stacking order and the counter all work themselves out from however many cards there are.

### How many cards a Deck needs to loop

Three cards are always on show: the front one and the two beside it. To loop, the deck also needs a hidden slot at each end for the wrapping card to jump through unseen. Three visible plus two hidden is **five: the minimum for Loop to work at all**.

Each extra row you want fanned out behind costs two more cards, for the same reason: two more hidden slots.

| Rows behind the front card | Cards needed to loop |
| --- | --- |
| 1 (just the two side cards) | 5 |
| 2 | 7 |
| 3 (the full fan) | 9 |

So five cards loops, but only ever shows the three-card fan. For the full three-row deck **while looping**, you need nine, which is why Deck Featured ships with exactly nine, and why Deck Testimonial, with five, ships with Loop switched off.

You don't configure any of this. Add or remove cards and the deck shows as many rows as it can hide the jump behind, up to the `MAX_TIERS` limit in the script. If you have fewer than five cards, turn Loop off in the wrapper and the deck simply stops at the first and last card.

Fall never loops, because it throws cards away, so it has no minimum at all. Two cards is fine.

## Changing what's on a card

Select the pieces inside **Content** and edit them like any other Etch element.

| Template | Inside each card |
| --- | --- |
| Deck Featured | An image, then a category label, a name, a line of tags, and a price |
| Deck Testimonial | A quote mark, the quote itself, and an avatar with a name beside it |
| Fall | A badge, an icon, a title, and a paragraph |

To swap a product photo on Deck Featured, select the **Image** inside the card and choose a new one as usual.

You can put your own elements in **Content** instead. They'll fade in with the card automatically. See [Text fade-in](#text-fade-in) below.

## Colours

Three variables at the top of the **stack**'s style block set the colours for every card at once:

```css
--card-bg:  #e8e4dc;   /* the card's background */
--card-ink: #14100c;   /* the text on the card */
--tint:     #c9553f;   /* Deck Featured's accent */
```

Fall calls its accent `--accent` instead of `--tint`, and starts from a white card:

```css
--card-bg:  #ffffff;
--card-ink: #14161b;
--accent:   #4b6fe8;
```

Change those and every card follows.

Two per-template notes:

> **Deck Featured's page background is set separately.** The wrapper behind the stack uses the same colour mixed with black, written out as its own hex: `background-color: color-mix(in oklch, #c9553f 25%, black)`. If you change `--tint`, change that hex to match, or the background and the cards will drift apart.

> **Deck Testimonial follows your site's colours.** Its background uses your theme's `--primary`, and the quote mark and avatar use `--accent`. If your theme doesn't define `--accent`, those two look unstyled, so add `--accent: <your colour>;` to the stack's style block alongside `--card-bg`.

## Speed, and the shuffle

At the top of the stack's style block:

```css
--dur:  760ms;
--ease: cubic-bezier(0.22, 0.68, 0.24, 1);
--lag:  105ms;
```

**`--dur`** is how long one card change takes. Bigger is slower.

**`--lag`** is the important one. It's the pause between a card lifting up and sliding across, and it's what makes the card look shuffled out of a pile rather than slid along a table. Set it to `0ms` and the effect vanishes completely. Above about `250ms` it stops reading as one movement and looks like two.

**`--ease`** is the acceleration curve. Leave it alone unless you have a specific curve in mind.

## The shape of a Deck stack

Six settings describe the whole deck. They sit together under `/* ---- shape ---- */` in the stack's style block, and they're the only place you edit the arrangement. You never position cards individually, and you never set the left and right sides separately: both sides come from these six numbers.

**Where the nearest side cards sit**, the two cards immediately either side of the front one:

| Setting | What it does | Ships as |
| --- | --- | --- |
| `--deck-fan` | how far out to the side | `44%` |
| `--deck-spin` | how much it tilts | `6deg` |
| `--deck-depth` | how far back it sits (keep it negative) | `-160px` |

**How the rows behind follow on**, meaning what happens to each row further back:

| Setting | What it does | Ships as |
| --- | --- | --- |
| `--deck-spread` | how much the sideways gap shrinks with each row back | `0.43` |
| `--deck-recede` | how quickly rows drop away into the distance | `0.78` |
| `--deck-fade` | how much fainter each row gets | `0.3` |

**`--deck-spread`** is the one worth understanding, because it decides whether the stack reads as having depth at all. At `1` the cards are spaced evenly, which looks flat. Lower numbers bunch the far rows closer together, which is what your eye reads as distance. `0.43` is a natural amount. Below about `0.2` the back rows nearly disappear behind the front ones.

**`--deck-fade`** at `0.3` leaves the second row about seven-tenths visible and the third about four-tenths. Set it to `0` and every row stays solid.

### Things to try

- **A wider fan:** `--deck-fan: 56%`. Everything else follows.
- **A tighter stack:** `--deck-fan: 38%`.
- **Flatter, more like a paper pile:** `--deck-spin: 4deg` and `--deck-depth: -90px`.
- **Deeper and more dramatic:** `--deck-depth: -240px` and `--deck-recede: 0.9`.

Deck Testimonial ships slightly wider and more tilted than Featured (`46%`, `8deg`, `-170px`, fade `0.25`): same settings, different starting point.

### Showing fewer rows behind

The Deck shows up to three rows of cards behind the front one. To show fewer, open the **wrapper's Script** tab and change the first number:

```js
var MAX_TIERS = 3;   // 2 shows two rows behind, 1 shows only the two side cards
```

That's the only change needed. The matching CSS switches itself off, and the cards further back simply stay hidden. Lowering it is always safe.

## The shape of a Fall queue

Fall has its own settings, because it works differently: cards queue up and rise rather than fanning sideways.

**The cards waiting behind.** The three `step` settings are multiplied by how far back a card is: the next card gets the value once, the one after twice, the one after that three times. Use `0` to switch one of them off.

| Setting | What it does | Ships as |
| --- | --- | --- |
| `--fall-step-x` | move sideways, per card further back | `0%` |
| `--fall-step-y` | how much of each card's top edge shows above the one in front | `-15px` |
| `--fall-step-spin` | rotate, per card further back | `10deg` |
| `--fall-depth` | distance from the front card to the next one | `-125px` |
| `--fall-recede` | `1` gives equal gaps; lower bunches the far cards together | `0.9` |
| `--fall-fade` | how much cards fade going back | `0.32` |

**How a finished card leaves.** When the visitor moves on, the front card is thrown away:

| Setting | What it does | Ships as |
| --- | --- | --- |
| `--fall-throw-y` | how far down it falls; below `130%` it stays on screen | `150%` |
| `--fall-throw-x` | sideways drift as it falls; a minus number goes left | `-6%` |
| `--fall-throw-spin` | how much it turns on the way down | `-5deg` |
| `--fall-throw-z` | how much it comes toward the reader, so it grows as it goes | `95px` |

## Card size and depth

Also on the stack:

```css
width: min(78vw, 450px);
aspect-ratio: 3 / 4;
perspective: 1250px;
```

**`width`** is the card size. The `min()` keeps it from overflowing narrow screens: `78vw` on a phone, capped at `450px` on a desktop. Change either number.

**`aspect-ratio`** is the card's shape: `3 / 4` on Deck Featured, `1` on Deck Testimonial, `4 / 5` on Fall.

**`perspective`** is how strong the 3-D is. Lower numbers are more dramatic.

> Don't go below about `600px` on `perspective`, because the cards at the back start to look stretched and wrong.

## Text fade-in

The words on a card fade in when it reaches the front, one line after another. Two settings on the card's style block control how visible text is at each position:

```css
--reveal: 0;      /* cards hidden in the pile          */
--reveal: 0.45;   /* the two cards either side (Deck)  */
--reveal: 1;      /* the front card                    */
```

Set the middle one to `0` if you'd rather only the front card showed any text at all.

The one-after-another timing is automatic: each direct child of **Content** is numbered as the page loads and waits its turn. Add your own elements inside Content and they join the sequence with no extra setup.

## Clicking a card

**Deck** ships with **Custom Element Nav** turned on, so clicking a card beside the front one brings it forward. It's a wrapper setting in the **Sliderless Sync** group, so you can turn it off if you'd rather visitors used only the arrows.

**Fall** ships with it off deliberately. Its cards queue in order and are discarded as they're finished, so jumping ahead by clicking wouldn't make sense.

Only the front card and the two beside it respond to a click. To let the rows further back be clicked too, open the **wrapper's Script** tab and raise:

```js
var NAV_RINGS = 1;   // 2 also accepts the second row, 3 the third
```

> If you build your own stack from scratch, read the note on overlapping elements under [Sync Custom Element](components/dwc-slider.md#sync-custom-element) first. Stacked cards need a little care so a click lands on the card you actually aimed at. The premades already handle it.

## Arrows, counter, autoplay and keyboard

These aren't special to the stack: they're the ordinary Slider Pro pieces, already placed:

- The **arrows** and the **counter** between them are a [Nav Button](components/dwc-slider-nav-button.md) either side of a [Progress](components/dwc-slider-progress.md) set to counter mode, inside the `nav buttons` group. Restyle or move them like any other component, or delete one you don't want.
- **Loop**, **Auto Play** and its interval, **Arrow Keys** and **Custom Element Nav** are all settings in the wrapper's **Sliderless Sync** group. See [Sync Without Slider](components/dwc-slider-wrapper.md#sync-without-slider) for what each one does.

Deck Featured arrives looping and playing by itself; the other two arrive manual. Change either in the wrapper's settings.

## Slider Stack: the same deck, driven by a real slider

**Slider Stack** is the fourth template on this page and the odd one out. It uses the same card mechanics as Deck, but it is **not** sliderless: it holds a real DWC Slider, and the cards are synced to it with [Sync Custom Element](components/dwc-slider.md#sync-custom-element) rather than Sync Without Slider.

The layout is a split. On screens 768px and wider the cards take 60% and the slider takes the rest; below that they stack into one column.

```
- Slider Stack wrapper
  Grid
    Overflow wrapper            ← keeps the 3-D safe, see the warning below
      Cards wrapper - Controls  ← all the look-and-feel variables live here
        Card
          Card lift
            Card Content        ← the image
        Card
        ...
    Slider wrapper
      DWC Slider                ← one slide per card: title, text, button
    nav buttons
```

The slider drives, the cards follow. Its **Sync Custom Element** is set to `.slider-stack__card` and **Custom Element Nav** is on, so a click on a side card moves the slider to it.

### What that changes

Three differences from the Deck templates on this page:

- **There is no script.** Deck carries a small script with `MAX_TIERS` and `NAV_RINGS`. Slider Stack has none: everything is CSS reacting to `is-active`, `is-prev` and `is-next`, which the slider applies for you. Nothing to adjust, nothing to break.
- **Only three cards are ever visible**, the active one and the two beside it. Every other card sits at `--depth-far` with `opacity: 0`. There are no rows fanned out behind, so the loop-minimum table above does not apply here.
- **Card count follows slide count.** Add a card and add a slide, or the two fall out of step. Loop is a normal slider setting, with no five-card minimum.

### The variables

All on the **Cards wrapper** style block:

```css
/* motion */
--dur:   700ms;   /* how long one change takes */
--ease:  cubic-bezier(0.22, 0.68, 0.24, 1);
--lag:   150ms;   /* how far the sideways move trails the lift */

/* stack geometry */
--spread:     46%;     /* sideways offset of the prev/next cards */
--tilt:       8deg;    /* their rotation */
--depth-near: -170px;  /* how far back prev/next sit */
--depth-far:  -420px;  /* where every other card waits, invisible */
```

`--lag` is the one that makes it read as a shuffle rather than a slide: the card lifts toward you first, then moves across. Set it to `0ms` and the movement flattens out.

The same block sets the stack's size and depth:

```css
inline-size:        50%;        /* width of the deck inside its column */
aspect-ratio:       4/3;        /* card shape */
perspective:        1300px;     /* lower = more dramatic 3-D */
perspective-origin: 50% 45%;    /* where you view it from */
```

Below 768px the template already softens the fan and widens the deck:

```css
--spread: 24%;
--tilt: 5deg;
inline-size: 70%;
```

### The text side

Each slide holds a **Content wrap** with a title, a paragraph and a button. The button is pushed to the bottom with `margin-block-start: auto`, so slides of different text lengths keep their buttons aligned. Spacing between the three comes from `--content-gap` (default `1rem`), and the column is capped at `450px` wide.

### Why the extra wrapper

The **Overflow wrapper** around the cards exists only to carry `overflow: clip` and the white background. It cannot be merged into the Cards wrapper: the warning below applies here exactly as it does to the Deck templates, and `overflow` on the cards wrapper or on a card would flatten the 3-D. If you want to clip, tint or blend the deck, do it on the Overflow wrapper.

## One thing not to change

> **Don't add `overflow`, `opacity`, `filter`, `clip-path`, `mask`, `mix-blend-mode`, `isolation` or `contain`** to the style blocks for the stack, the card, or the lift (`.deck-stack-featured`, `.deck-card-featured` and `.deck-card-featured__lift`, their Testimonial and Fall equivalents, or `.slider-stack__cards-wrapper`, `.slider-stack__card` and `.slider-stack__card-lift`). Any one of them switches the 3-D off, and the stack collapses flat into a single pile. There are comments in the style blocks marking exactly where this applies.

If a stack suddenly looks flat after an edit, this is almost always why. Undo the last thing you changed.
