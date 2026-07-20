---
icon: circle-play
---

# DWC Slider Play-Pause

A standalone play/pause button for autoplay, with its own style controls. Drop it anywhere inside the Wrapper — the main slider, at wrapper level, or inside a **thumbnail** slider — and it always controls the main slider's autoplay. It only does anything when the tracked Slider's **Auto Play** setting is on. This is the richer alternative to the Slider's own built-in Play/Pause Button flag (see [DWC Slider](dwc-slider.md#autoplay)).

***

## Settings

These style the button. It connects to the main Slider on its own — you don't need to switch anything on for it to be found. It works whenever the Slider's **Auto Play** is on, and stays active even if you turn the Slider's own built-in **Play/Pause Button** off. (With Auto Play off there's nothing to play or pause, so the button does nothing.)

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
| **Class**                          | Add your own CSS class in this **Class** field to style the button. | `[]` |
