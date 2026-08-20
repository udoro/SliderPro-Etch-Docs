---
icon: square
---

# DWC Slide

A single slide, placed inside the **DWC Slider**'s `Slides` slot. It's a plain layout wrapper around whatever content you put inside it.

***

## Settings

| Setting   | Renders to                    | Default | Description                                             |
| --------- | ------------------------------- | ------- | --------------------------------------------------------- |
| **Class** | `class` (on the slide's inner wrap) | `[]`    | Add your own CSS class in this **Class** field to style the slide. |

***

## Slots

| Slot      | Description                          |
| --------- | --------------------------------------- |
| `Content` (`default`) | The slide's content: div, image, text, anything. |

***

## Slide title

A slide can have a **title** that other features can read, most notably [Nav Buttons](dwc-slider-nav-button.md) that show the next/previous slide's name. The title is resolved in this order:

1. A `data-slide-title="…"` attribute on the slide (an explicit title).
2. The text of any element inside the slide marked `data-slide-title` (point it at a heading you already have, so nothing is retyped).
3. Otherwise, the slide's first heading (`h1`–`h6`).

If none of these exist, the slide simply has no title. Titles inside a nested slider or a nav button on the slide are ignored, so they can't leak up.
