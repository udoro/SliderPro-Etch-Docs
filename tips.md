---
icon: lightbulb
---

# Tips & Recipes

Some things that look like slider problems are really about how your slides and images are built in Etch. This page collects fixes for those — small CSS and Etch habits that make sliders behave the way you expect.

***

## Making images fill a slide consistently

If your slides come out different heights, or images stretch and change shape as you resize the screen, the images are being shown at their natural size — so each one sets its own slide's size. This shows up most on **thumbnail** strips, where you want every tile to match.

The fix is to make each image **fill its slide** and crop to fit. Add this CSS to the image inside your slide:

```css
position: absolute;
inset: 0;
width: 100%;
height: 100%;
object-fit: cover;
```

`object-fit: cover` fills the whole slide and trims any overflow, so every image ends up the same shape with no stretching. If you'd rather show the **whole** image without cropping, use `object-fit: contain` instead — just know it will letterbox (leave empty space) when the image and slide shapes don't match.

For this to work, the slide needs a size to fill — set it on the Slider. Which setting to use depends on the slider:

- **Main slider:** a **Slider Height**, or an **Aspect Ratio** (like `16:9`) when you want the slide area to keep its shape as the screen resizes.
- **Thumbnail slider:** a fixed **Slider Height** — for example `80px`, adjusted to whatever suits your tiles. **Don't use Aspect Ratio on a thumbnail strip:** Aspect Ratio applies to the whole slider container, not the individual thumbnails, so on a full-width strip it makes the whole thing far too tall.

See [DWC Slider → Dimensions](components/dwc-slider.md#dimensions), and set different values per screen size with the [responsive shorthand](styling-and-responsive.md#responsive-breakpoints) if you need to.

> On a main + thumbnail gallery, apply the image CSS above to the images in **both** sliders. It's most noticeable on the thumbnails, but the main slider looks better with consistent images too.

***

## Building slides from an Etch Loop

To build slides automatically from a collection (posts, products, a repeater, and so on), use an Etch **Loop** — but put the loop on the **DWC Slide** itself, so each pass through the loop makes **one slide**.

**Correct — loop the DWC Slide:**

```
DWC Slider
└─ DWC Slide   ← the Loop is on this
   └─ your content (image, heading, etc.)
```

Each item in your collection becomes its own slide, and the slider can page through them normally.

**Incorrect — loop the content inside one slide:**

```
DWC Slider
└─ DWC Slide
   └─ your content   ← the Loop is on this
```

Here every item is dropped **inside a single slide**, so you get one giant slide with all your images at once — and nothing for the slider to move between. If your slider "shows everything at once" or won't move, this is almost always why: move the loop up to the **DWC Slide**.
