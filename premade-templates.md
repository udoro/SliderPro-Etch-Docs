---
icon: grid-2
---

# Premade Templates

Slider Pro ships with a set of ready-made, pre-styled slider templates. Drop one straight into your page and customize it, instead of building from scratch. Each template is built from the same DWC Slider components you already have, so everything stays fully editable afterwards.

## Where to find them

The templates are **included with Slider Pro**, with no separate purchase. They sit in the same Gumroad content as the plugin and component JSON, just under their own menu entry that's easy to miss.

1. Go to your **Gumroad Library** and open **Slider Pro for Etch**.
2. On the product's content page, look at the **menu on the left**. It lists a few entries, including **Component - Slider Pro + Plugin**, **Premade Sliders**, and **Support**.
3. Click **Premade Sliders**. That's where every template `.json` is listed for download.

> Don't overlook the left-side menu. The plugin and the premade sliders are **separate entries** there, so if you only downloaded from **Component - Slider Pro + Plugin**, click **Premade Sliders** to grab the templates too.

## How to import a template

1. Open the template's `.json` from your Gumroad dashboard and **copy its entire contents**.
2. In Etch, paste it into the **Structure Panel** at the point where you want the slider to appear. This drops in the ready-made slider (and registers any DWC Slider components it needs, if they aren't already in your project).
3. Select the slider and customize it: swap the slide content, adjust settings, and restyle with CSS variables as usual.

> This is the same paste-into-the-Structure-Panel flow used for the [component JSON](getting-started.md); a template just also brings a fully built slider with it.

## Stay on the latest version

Always make sure you're on the **latest version of the plugin _and_ the components** before using or updating a template. Templates rely on the current component definitions and CSS, so an out-of-date install can render or behave incorrectly.

When you paste an **updated** component or template, first enable **"Overwrite on paste"** in Etch's settings. This makes the newer definitions replace the existing ones instead of creating duplicates.

## The templates

### Sliders

- **Slider Zeon**: a full-bleed hero. The active image fills the background behind a headline, description, and CTA, with a row of portrait thumbnail cards, a vertical step indicator, and arrows, counter, and play controls.
- **Slider Chronos**: a horizontal timeline slider. Year-marked nodes along a center line, with the active entry highlighted (image, year, title, description) while neighbours fade back.
- **Slider Flow**: a cover-flow carousel. The active slide sits front-and-center with angled, perspective-tilted slides flanking it, over a category tag and title, with arrows and dots.
- **Slider Team**: a staff showcase with a split layout. The selected member fills a large portrait on one side while the other shows their name and a synced strip of headshot cards (name + role).
- **Slider Stack**: a real slider with a **synced 3-D card deck** beside it. A stack of image cards on one side, a slider of text panels (title, description, button) on the other, moving as one via [Sync Custom Element](components/dwc-slider.md#sync-custom-element). The cards fan and shuffle like a deck, and clicking one jumps the slider to it. Stacks into a single column on narrow screens.
- **Slider Marquee**: a continuous logo/brand marquee. Auto-scrolling rows of auto-width slides that loop seamlessly, with the row edges softly faded (Edge Fade). The rows drift in opposite directions for a layered ticker effect. Great for logo walls, partner strips, and "as seen in" bars.

### Card stacks

Templates marked **(Sliderless)** hold no DWC Slider at all: cards sit stacked in 3-D and the wrapper cycles them with [Sync Without Slider](components/dwc-slider-wrapper.md#sync-without-slider) instead of a track. They have their own settings, so they get their own guide: **[Card Stack Templates](card-stack-templates.md)**.

- **Deck Featured (Sliderless)**: a 3-D deck of product cards fanned either side of the front one, shuffling forward as it cycles. Loops, plays by itself, and a card can be clicked to bring it forward.
- **Deck Testimonial (Sliderless)**: the same deck built for quotes. A square card with a quote mark, the quote, and an avatar with a name. Follows your theme's colours.
- **Fall (Sliderless)**: cards queue up behind one another, each showing its top edge, and the finished card drops away off the bottom when you move on. Stops at the last card by design, which is good for steps and walkthroughs.

**New templates are added regularly**, so check your Gumroad dashboard for the latest set.

## Customizing a template's animations

Templates include their own CSS classes that style and animate the slides beyond the standard settings panels. Some of these use a fixed `transition` marked `!important`, which means panel settings like **MOTION → Speed** won't change those template-specific animations. The **Speed** setting controls Splide's slide transition, not a template's custom CSS animation.

To retime a template animation, edit that template's CSS class directly. For example, the **Slider Zeon** background zoom/fade is defined on `.slider-zeon__bg-thumb … .splide__slide`:

```css
transition:
  opacity 2s ease 1s,
  scale 1.8s ease 1s !important;
```

Change those durations (and the delays) there to speed the effect up or slow it down.
