---
icon: rectangle
---

# DWC Slider Wrapper

The outer container. It holds one Slider (or a main Slider plus a thumbnail Slider) and any extra pieces like a counter or progress component. Settings on the Wrapper act as **defaults** for everything inside it — a setting on a child Slider always overrides the same setting on the Wrapper.

***

## Settings

| Setting                | key                    | Type   | Default | Description                                                                 |
| ----------------------- | ---------------------- | ------ | ------- | ----------------------------------------------------------------------------- |
| **Wrapper Height**      | `wrapperHeight`         | string | `auto`  | Sets `--slider-wrapper-height`, used as the wrapper's `min-block-size`.       |
| **Space Between Sliders** | `spaceBetweenSliders` | string | –       | Sets `--sliders-gap`, the gap between a main Slider and a thumbnail Slider (or any other direct children) inside the wrapper. |
| **Custom Class**        | `customClass`           | class  | `[]`    | Additional CSS class applied to the wrapper element for custom targeting.     |

***

## Empty state

If the wrapper's default slot has no content, it shows a placeholder message in the Etch canvas ("Add **DWC Slider** components here") instead of an empty box — this is builder-only and has no effect on the live site.

***

## Slots

| Slot      | Description                                                                                   |
| --------- | ----------------------------------------------------------------------------------------------- |
| `default` (`Sliders_and_Controls`) | Everything inside the wrapper — one or more DWC Slider components, plus any navigation, pagination, progress, or play/pause components. |
