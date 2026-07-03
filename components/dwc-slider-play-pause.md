---
icon: circle-play
---

# DWC Slider Play-Pause

A standalone play/pause button for autoplay, with its own style controls. Drop it anywhere inside a Wrapper or Slider. It only does anything when the tracked Slider's **Auto Play** setting is on. This is the richer alternative to the Slider's own built-in Play/Pause Button flag (see [DWC Slider](dwc-slider.md#autoplay)).

***

## Settings

Rendered as inline CSS custom properties on the button's container element (marked `data-autoplay-toggle-container`, which the runtime auto-detects — no flag needed on the Slider itself when this component is used).

| Setting                      | key                       | CSS variable                   | Default                            |
| --------------------------------- | ---------------------------- | ------------------------------------ | ---------------------------------------- |
| **Size**                           | `size`                        | `--play-pause-size`                   | `40px`                                    |
| **Border Radius**                  | `borderRadius`                | `--play-pause-radius`                  | `50vw`                                    |
| **Border**                         | `border`                      | `--play-pause-border`                  | `1px solid rgba(255, 255, 255, 0.1)`      |
| **Color**                          | `color`                       | `--play-pause-clr`                     | `#fff`                                    |
| **Hover/Active Border Color**      | `hoverActiveBorderColor`      | `--play-pause-hover-border-clr`        | `#ff4d6a`                                 |
| **Background**                     | `background`                  | `--play-pause-bg`                      | `rgba(0, 0, 0, 0.4)`                      |
| **Hover/Active Background**        | `hoverActiveBackground`       | `--play-pause-hover-bg`                | `rgba(255, 77, 106, 0.1)`                 |
| **Background Blur**                | `backgroundBlur`              | `--play-pause-bg-blur`                 | `8px`                                     |
| **Class**                          | `class`                       | appended to `class="autoplay-toggle-container {props.class}"` | `[]` |
