---
icon: grid-2
---

# Premade Templates

Slider Pro ships with a set of ready-made, pre-styled slider templates — drop one straight into your page and customize it, instead of building from scratch. Each template is built from the same DWC Slider components you already have, so everything stays fully editable afterwards.

## Where to find them

The templates are **included with Slider Pro** — there's no separate purchase. You'll find them in your **Gumroad dashboard/library**, the same place you downloaded the WordPress plugin and the component JSON.

## How to import a template

1. Open the template's `.json` from your Gumroad dashboard and **copy its entire contents**.
2. In Etch, paste it into the **Structure Panel** at the point where you want the slider to appear. This drops in the ready-made slider (and registers any DWC Slider components it needs, if they aren't already in your project).
3. Select the slider and customize it — swap the slide content, adjust settings, and restyle with CSS variables as usual.

> This is the same paste-into-the-Structure-Panel flow used for the [component JSON](getting-started.md); a template just also brings a fully built slider with it.

## Stay on the latest version

Always make sure you're on the **latest version of the plugin _and_ the components** before using or updating a template. Templates rely on the current component definitions and CSS, so an out-of-date install can render or behave incorrectly.

When you paste an **updated** component or template, first enable **"Overwrite on paste"** in Etch's settings. This makes the newer definitions replace the existing ones instead of creating duplicates.

## The templates

- **Slider Zeon** — A full-bleed hero: the active image fills the background behind a headline, description, and CTA, with a row of portrait thumbnail cards, a vertical step indicator, and arrows, counter, and play controls.
- **Slider Chronos** — A horizontal timeline slider: year-marked nodes along a center line, with the active entry highlighted (image, year, title, description) while neighbours fade back.
- **Slider Flow** — A cover-flow carousel: the active slide sits front-and-center with angled, perspective-tilted slides flanking it, over a category tag and title, with arrows and dots.
- **Slider Team** — A staff showcase with a split layout: the selected member fills a large portrait on one side while the other shows their name and a synced strip of headshot cards (name + role).

**New templates are added regularly**, so check your Gumroad dashboard for the latest set.

## Customizing a template's animations

Templates include their own CSS classes that style and animate the slides beyond the standard settings panels. Some of these use a fixed `transition` marked `!important`, which means panel settings like **MOTION → Speed** won't change those template-specific animations — the **Speed** setting controls Splide's slide transition, not a template's custom CSS animation.

To retime a template animation, edit that template's CSS class directly. For example, the **Slider Zeon** background zoom/fade is defined on `.slider-zeon__bg-thumb … .splide__slide`:

```css
transition:
  opacity 2s ease 1s,
  scale 1.8s ease 1s !important;
```

Change those durations (and the delays) there to speed the effect up or slow it down.
