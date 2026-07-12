---
icon: circle-play
---

# DWC Slider Play-Pause

A standalone play/pause button for autoplay, with its own style controls. Drop it anywhere inside the Wrapper — the main slider, at wrapper level, or inside a **thumbnail** slider — and it always controls the main slider's autoplay. It only does anything when the tracked Slider's **Auto Play** setting is on. This is the richer alternative to the Slider's own built-in Play/Pause Button flag (see [DWC Slider](dwc-slider.md#autoplay)).

***

## Settings

Rendered as inline CSS custom properties on the button's container element (marked `data-autoplay-toggle-container`, which the runtime auto-detects — no flag needed on the Slider itself when this component is used). Turning the Slider's own **Play/Pause Button** setting off does **not** disable this standalone; only the Slider's **Auto Play** being off does (a play/pause button has nothing to control without autoplay).

| Setting                      | CSS variable                   | Default                            |
| --------------------------------- | ------------------------------------ | ---------------------------------------- |
| **Size**                           | `--play-pause-size`                   | `40px`                                    |
| **Border Radius**                  | `--play-pause-radius`                  | `50vw`                                    |
| **Border**                         | `--play-pause-border`                  | `1px solid rgba(255, 255, 255, 0.1)`      |
| **Color**                          | `--play-pause-clr`                     | `#fff`                                    |
| **Hover/Active Border Color**      | `--play-pause-hover-border-clr`        | `#ff4d6a`                                 |
| **Background**                     | `--play-pause-bg`                      | `rgba(0, 0, 0, 0.4)`                      |
| **Hover/Active Background**        | `--play-pause-hover-bg`                | `rgba(255, 77, 106, 0.1)`                 |
| **Background Blur**                | `--play-pause-bg-blur`                 | `8px`                                     |
| **Class**                          | appended to `class="autoplay-toggle-container {props.class}"` | `[]` |
