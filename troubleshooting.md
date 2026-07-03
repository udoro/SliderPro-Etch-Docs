---
icon: wrench
---

# Troubleshooting

## Good combinations to try

- **Hero banner:** Transition Type `Fade`, Auto Play on, Navigation Arrows + Pagination Dots on, an Autoplay Progress Bar (DWC Slider Progress in `bar` mode).
- **Product gallery with thumbnails:** two DWC Sliders in one Wrapper, Slider Role `main`/`thumbnails`, Aspect Ratio set on the main Slider.
- **Testimonials:** Slides Per Page `1`, Loop on, a Counter (DWC Slider Progress in `counter` mode) with Leading Zeros, Nav Buttons for prev/next.
- **Logo strip / marquee:** Infinite Scroll on, Scroll Speed `1`–`2`, no arrows or pagination needed.
- **Responsive card row:** Slides Per Page `3 md:2 sm:1`, Gap set to a fixed size.

***

## Common issues

| Symptom                                          | Likely cause                                                                                                                    |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Slider doesn't move / arrows do nothing               | Check the Slider is actually inside a DWC Slider Wrapper component.                                                                    |
| Thumbnails don't sync to the main slider               | Confirm one Slider's Slider Role is `main` and the other is `thumbnails`; if they're in different Wrappers, give both the same Sync Group. |
| Timer-mode progress bar/ring never fills               | Timer mode requires Auto Play to be turned on for the tracked Slider — without it, the component quietly falls back to slides mode.  |
| Height not changing at a breakpoint                    | Double-check you used the `sm:`/`md:`/`lg:` shorthand correctly, and that you're testing at or below 640px/768px/1024px — these are max-width breakpoints, not min-width. See [Styling & Responsive Behaviour](styling-and-responsive.md#responsive-breakpoints). |
| Custom Pagination shows plain numbered buttons instead of your design | Make sure Custom Pagination Mode is set to `Template` and there's a real first child element to use as the template.                |
| Navigation Button with a slide number does nothing     | Slide numbers are 1-based and must be within range (e.g. `1` through the total slide count).                                          |
| Console errors while editing in the Etch canvas        | Expected — Splide expects a strict parent/child DOM structure and Etch's editing wrapper elements interfere with that inside Edit mode. These don't affect the published page. See [Installation & Getting Started](getting-started.md#using-the-slider-inside-etch-editor-vs.-preview-vs.-live-site). |
| Preview mode looks stuck after toggling                | Manually reload the Etch editor — this is the same thing the "Edit" button normally triggers automatically.                          |
