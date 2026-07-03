---
icon: desktop-arrow-down
---

# Installation & Getting Started

## Installation

Slider Pro for Etch ships as two pieces: a small WordPress plugin (loads the Splide library and the CSS automatically — no manual stylesheet paste needed) and an Etch component JSON export (the 7 reusable DWC Slider components).

### 1. WordPress plugin

1. Place the whole `dwc-slider-pro-etch` folder in `wp-content/plugins/`.
2. Activate **Slider Pro for Etch** from the Plugins screen.

This plugin loads the Splide library and `dwc-slider-pro.css` on the frontend, inside the Etch editor canvas (via a bridge script), and in the parent admin window — you don't need to create or paste a stylesheet into Etch yourself. It also adds a **Settings → Slider Pro for Etch** screen — see [Styling & Responsive Behaviour](styling-and-responsive.md) for what's configurable there.

### 2. Component JSON

1. Download the component JSON export.
2. Open it and copy the entire contents.
3. In Etch Builder, paste the content into the **Structure Panel** of a template (commonly the Index Template). This registers all 7 DWC Slider components in your project so they're available for reuse everywhere.

***

## Quick start

**A single image/content carousel:**
1. Add a **DWC Slider Wrapper** component.
2. Inside it, add a **DWC Slider** component and put your **DWC Slide** components inside.
3. On the Slider's settings, turn on **Navigation Arrows** and **Pagination Dots** if you want them.

**A gallery with thumbnails:**
1. Add a **DWC Slider Wrapper**.
2. Inside it, add two **DWC Slider** components.
3. Set the first Slider's **Slider Role** setting to `main`.
4. Set the second Slider's **Slider Role** setting to `thumbnails`.
5. That's it — they sync automatically because they're in the same Wrapper. No extra setting needed.

***

## Component hierarchy

```
DWC Slider Wrapper
├── DWC Slider (role: main)
│   └── DWC Slide × N
├── DWC Slider (role: thumbnails)     ← optional, for a thumbnail strip
│   └── DWC Slide × N
├── DWC Slider Progress               ← optional, placed anywhere in the Wrapper or Slider
├── DWC Slider Play-Pause             ← optional
├── DWC Slider Pagination             ← optional (or use the Slider's built-in Pagination Dots toggle)
└── DWC Slider Nav Button × N         ← optional, one per prev/next/jump control
```

The **DWC Slider Wrapper** is the outer container — it holds one Slider (or a main Slider plus a thumbnail Slider) and any extra pieces like a counter or progress component. Settings on the Wrapper act as defaults for everything inside it. The **DWC Slider** is the actual sliding track; if a Wrapper contains two Sliders, each is configured independently, and a setting on the Slider itself always overrides the same setting on the Wrapper.

Everything else — DWC Slider Nav Button, DWC Slider Pagination, DWC Slider Progress, DWC Slider Play-Pause — is a small component you drop wherever you want it to appear. It doesn't have to sit right next to the Slider; it just has to be somewhere inside the same Wrapper (or inside the Slider itself). These components look for the Slider **in this order: inside the Slider first, then inside the Wrapper** — so you can place them anywhere in the Wrapper and they connect automatically, no manual linking required.

***

## Using the slider inside Etch (editor vs. preview vs. live site)

The slider behaves differently in three contexts. This is handled automatically — you don't configure it — but it helps to know what you're looking at.

### Edit mode (default, inside the Etch canvas)
- The real Splide slider is **not** running here. Instead, all slides are laid out in a simple grid so you can see, select, and edit every slide at once.
- Arrows, pagination dots, and the autoplay bar are hidden in this mode since they'd have nothing to do.
- A small control bar appears in the top-right corner of each Wrapper (or of an un-wrapped Slider): a **1 / 2 / 3 / 4 column selector** (editing convenience only — doesn't affect Per Page or what visitors see; remembered per slider in your browser) and a **Preview** button. On a main/thumbnail pair joined by a sync group, only the main slider gets the Preview button.
- A small badge reading "Slider - click Preview to test" appears on sliders that have a Preview button.

### Preview mode (click "Preview")
- The slider is rebuilt and actually mounted with Splide, so it behaves exactly as it will on the live site — autoplay, arrows, drag, sync, everything.
- Links inside slides are disabled while in Preview mode so clicking around doesn't navigate you away from the editor.
- Click the button again (now labeled "Edit") to leave Preview mode. This destroys the live slider instance, restores the edit grid, and automatically refreshes the Etch canvas.

### Live/published site
- The frontend always loads and mounts the real slider directly — no edit grid, no control bar, no Preview toggle.

### Things to know
- **Don't be alarmed by console errors while in Edit mode.** Splide expects a strict parent/child DOM structure, and Etch's own editing wrapper elements interfere with that. These errors are expected inside the canvas and don't affect the published page.
- If you add or remove slides while in Edit mode, the control bar and grid update automatically.
- If something looks stuck after toggling Preview, a manual page reload of the Etch editor resolves it.
