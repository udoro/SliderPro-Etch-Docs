---
icon: wrench
---

# Troubleshooting

## Good combinations to try

- **Hero banner:** Transition Type `Fade`, Auto Play on, Navigation Arrows + Pagination Dots on, an Autoplay Progress Bar (DWC Slider Progress in `bar` mode).
- **Product gallery with thumbnails:** two DWC Sliders in one Wrapper, Slider Role `main`/`thumbnails`, Aspect Ratio set on the main Slider.
- **Testimonials:** Slides Per Page `1`, Loop on, a Counter (DWC Slider Progress in `counter` mode) with Leading Zeros, Nav Buttons for prev/next.
- **Logo strip / marquee:** Infinite Scroll on, Scroll Speed `1`–`2`, no arrows or pagination needed.
- **Responsive card row:** Slides Per Page `3 md:2 sm:1`, Gap `1.5rem md:1rem sm:0.5rem` (Gap takes the same breakpoint shorthand).
- **Cards that stop being a slider on desktop:** Layout Mode `static md:slider` with Grid Columns `3 sm:1`, giving a static grid of cards on wide screens, a real swipeable carousel at `md` and below.
- **Faster page loads with many sliders:** enable **Lazy Load Sliders** on wrappers below the fold so they only initialize as the visitor scrolls near them. See [Lazy loading](styling-and-responsive.md#lazy-loading-below-the-fold-sliders).

***

## Common issues

| Symptom                                          | Likely cause                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Slider doesn't move / arrows do nothing               | If you're viewing this inside the Etch editor, make sure you're in **Preview** mode. Arrows, pagination, and autoplay are intentionally inactive in Edit mode since the real slider isn't mounted there. See [Installation & Getting Started](getting-started.md#using-the-slider-inside-etch-editor-vs.-preview-vs.-live-site). |
| Nothing works anywhere on the site (arrows, drag, autoplay all dead) | The Splide library failed to load. See [Admin Settings](admin-settings.md#splide-library-source) and try switching between Local (bundled) and CDN (jsDelivr) in case one is being blocked. |
| Infinite Scroll / marquee slider doesn't move (in Preview or on the live site) | The **Auto-Scroll Extension** may be turned off. Enable it in [Admin Settings](admin-settings.md#auto-scroll-extension). (In the Etch editor, sliders are intentionally inactive in Edit mode, so use **Preview**.) |
| Thumbnails don't sync to the main slider               | Confirm one Slider's Slider Role is `main` and the other is `thumbnails`; if they're in different Wrappers, give both the same Sync Group. |
| A lazy-loaded slider loads right away, plus a console note about a "sync-group … initializing immediately" | Expected safety behavior: a synced main/thumbnail pair can only be lazy-loaded if both defer together. If they're split (one lazy and one not, or in two different lazy wrappers) the whole group loads immediately so sync can't break. Put both sliders in **one** lazy Wrapper to lazy-load them. See [Lazy loading](styling-and-responsive.md#lazy-loading-below-the-fold-sliders). |
| Lazy-loaded slider never appears / stays blank          | It should activate ~`Lazy Preload Distance` px before entering view. If it never does, check the element actually scrolls into (or near) the viewport; a slider that's permanently off-screen won't initialize. Very old browsers without `IntersectionObserver` fall back to loading immediately. |
| Timer-mode progress bar/ring never fills               | Timer mode requires Auto Play to be turned on for the tracked Slider. Without it, the component quietly falls back to slides mode.  |
| Height not changing at a breakpoint                    | Double-check you used the `sm:`/`md:`/`lg:` shorthand correctly, and that you're testing at or below 640px/1024px/1120px (sm/md/lg). These are max-width breakpoints, not min-width. See [Styling & Responsive Behaviour](styling-and-responsive.md#responsive-breakpoints). |
| **Aspect Ratio** has no effect                         | A real **Slider Height** always beats Aspect Ratio, so set Slider Height back to `auto` (its default, meaning "no fixed height") and the ratio applies. If both are set the slider logs a console warning naming the winner. |
| Responsive settings (per page, gap, height, layout mode) don't change while editing in Etch | Switch to **Preview** mode and use Etch's responsive/device-width controls. Responsive values are only evaluated once the real slider is mounted, which happens in Preview, not Edit. |
| Custom Pagination shows plain numbered buttons instead of your design | Make sure Custom Pagination Mode is set to `Template` and there's a real first child element to use as the template.                |
| Navigation Button with a slide number does nothing     | Slide numbers are 1-based and must be within range (e.g. `1` through the total slide count).                                          |
| Slider shows every item at once / won't move when built from a loop | The Etch **Loop** is on the content *inside* a slide, so everything lands in one slide. Put the loop on the **DWC Slide** itself, where one loop pass = one slide. See [Tips & Recipes](tips.md#building-slides-from-an-etch-loop). |
| Images or thumbnails stretch or change size/aspect ratio | A layout issue, not the slider: images are showing at their natural size. Make each image fill its slide with `object-fit: cover`, then give the Slider a size: a **Slider Height** or **Aspect Ratio** for a main slider. For a **thumbnail** strip a **fixed Slider Height** (e.g. `80px`) is simplest; Aspect Ratio also works but sizes the strip as a proportion of the whole slider width (not each tile), so use a small ratio. See [Tips & Recipes](tips.md#making-images-fill-a-slide-consistently). |
| Console errors while editing in the Etch canvas        | Expected. Splide expects a strict parent/child DOM structure and Etch's editing wrapper elements interfere with that inside Edit mode. These don't affect the published page. See [Installation & Getting Started](getting-started.md#using-the-slider-inside-etch-editor-vs.-preview-vs.-live-site). |
| Changes you make while in **Preview** don't show up    | Expected. Preview runs against a rebuilt copy of the slider that Etch can no longer reach, so your edits never land on what you're looking at. Click **Refresh** (next to the Edit button, Preview only): it reloads the canvas and puts you back in Preview with the changes applied. |
| Vertical (`ttb`) slider collapses or shows nothing     | A vertical slider can't derive its height from its width the way a horizontal one does, so give it a **Slider Height** or an **Aspect Ratio**. Both take the shorthand, so `500px sm:auto` pairs with a `ttb sm:ltr` direction. |
| Preview mode looks stuck after toggling                | Click **Refresh** (shown in Preview), or manually reload the Etch editor, the same reload the "Edit" button normally triggers automatically.                          |
| Slider blocks can't be moved, duplicated, or deleted in the WordPress block editor | Intentional. The slider wrapper and everything inside it are locked so the structure Etch authored can't be displaced by accident. Edit the slider in Etch; the lock applies only in the editor and never changes your saved page. |
| Slider autoplays / arrows work while editing a normal page in the block editor | Expected. On a WordPress post/page the slider mounts **live** in the block editor, the same as the frontend. (This differs from the Etch canvas, where the real slider only runs in **Preview**.) |

***

## Checking your version

To see which version of the plugin a site is running, open the page on the live site, open your browser's developer console, and look for this line:

```
DWC Slider Pro for Etch: Initialized { version: "1.0" }
```

The `version` value is the plugin version you're running. This is an intentional, informational log (not an error). It appears once per page load, and only on the front end, not inside the Etch editor.
