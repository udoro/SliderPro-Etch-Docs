---
icon: books
---

# AI Skills Reference: Lookup Companion

This is the **lookup-only** companion to `slider-pro-skills.md` (same folder). You do NOT need to
read this file in full at session start. Grep into the one section a task needs, following the
"When to consult the reference file" guidance in the main file.

> **Full prose reference (local, preferred):** the tables here are lookup summaries. For the
> descriptions, slot documentation and per-component examples they omit, read this repo's
> `components/` folder (`../../components/dwc-slider.md`, `dwc-slider-wrapper.md`, `dwc-slide.md`,
> `dwc-slider-progress.md`, `dwc-slider-play-pause.md`, `dwc-slider-pagination.md`,
> `dwc-slider-nav-button.md`, relative to this file). **Not present if you only downloaded the
> `slider-skills` folder on its own**: it is the same folder the live GitBook "Components" pages
> publish from, kept single-source there rather than duplicated here.
>
> **Full reference (online):** <https://design-with-cracka.gitbook.io/etchsliderpro>

***

## 1. Prop reference

Every settable prop on all seven components, generated from the Etch component export
(`RELEASE/Etch-Slider-Pro-v1.2.0.json` in the plugin repo) by `tools/gen-prop-tables.mjs`. Do not
hand-edit this section: regenerate it with

```
node tools/gen-prop-tables.mjs --splice "<path>/ai-connector/slider-skills/slider-pro-skills-reference.md"
```

**Reading the tables**

* **Path** is what you set. `props.<group>.<key>`, always fully flattened.
* **Paths are unique within a component, not across them.** `props.class` exists on four of them
  (Slide, Progress, Play-Pause, Pagination) and means something different on each. Always resolve
  a path against the component you are setting it on. Similar-sounding settings usually differ by
  group rather than colliding: Loop is `props.motion.loop` on the Slider and
  `props.sliderlessSync.loop` on the Wrapper.
* **Attribute** is the `data-*` the prop writes onto the element. That attribute is what the
  engine actually reads, so it is the ground truth when a prop and the rendered DOM disagree.
  `style only` means the prop drives CSS or markup and writes no attribute.
* **Default** is the component's own default. **Never set a prop to its default value.**
* **Shown when** records the panel condition. It affects only whether Etch displays the field.
  The value path is unaffected: it is `props.lightbox.staticLightbox`, never
  `props.lightbox.ygku9jx.staticLightbox`.

<!-- GENERATED:PROPS start -->

### DWC Slider Wrapper

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Background Color | `props.backgroundColor` | `style` | `var(--white, white)` |  |
| Wrapper Height | `props.wrapperHeight` | `style` | `auto` |  |
| Space Between Sliders | `props.spaceBetweenSliders` | `style` |  |  |
| Custom Class | `props.customClass` | `class` | `` |  |
| Lazy Load Sliders | `props.lazyLoadSliders` | `data-lazy-init` | `false` | `true` / `false` |
| Lazy Preload Distance | `props.lazyPreloadDistance` | `data-lazy-preload` | `200` | Shown when `props.lazyLoadSliders` |
| Edge Fade | `props.edgeFade` | `data-edge-fade` | `false` | `true` / `false` |
| Fade Distance | `props.fadeDistance` | `style` | `15%` | Set overall fade distance from the edge. Shown when `props.edgeFade` |
| Fade Softness | `props.fadeSoftness` | `style` | `0.8` | Softness scale: 1 = softest fade, 0 = sharp edge. Shown when `props.edgeFade` |
| Fade Opacity | `props.fadeOpacity` | `style` | `0%` | Shown when `props.edgeFade` |
| Pause Sliders on Hover | `props.pauseSlidersOnHover` | `data-group-pause-on-hover` | `false` | `true` / `false` |
| Custom Element | `props.sliderlessSync.customElement` | `data-sync-custom-el` |  |  |
| Custom Element Nav | `props.sliderlessSync.customElementNav` | `data-sync-custom-el-nav` | `false` | `true` / `false`. Shown when `props.sliderlessSync.customElement.includes(".")  \|\| props.sliderlessSync.customElement.includes("[")` |
| Loop | `props.sliderlessSync.loop` | `data-loop` | `false` | `true` / `false`. Shown when `props.sliderlessSync.customElement.includes(".")  \|\| props.sliderlessSync.customElement.includes("[")` |
| Leading Zeros | `props.sliderlessSync.leadingZeros` | `data-leading-zeros` | `false` | `true` / `false`. Shown when `props.sliderlessSync.customElement.includes(".")  \|\| props.sliderlessSync.customElement.includes("[")` |
| Title Delay | `props.sliderlessSync.titleDelay` | `data-slide-title-delay` | `200ms` | Shown when `props.sliderlessSync.customElement.includes(".")  \|\| props.sliderlessSync.customElement.includes("[")` |
| Arrow Keys Navigation | `props.sliderlessSync.arrowKeysNavigation` | `data-arrow-keys` | `true` | `true` / `false`. Shown when `props.sliderlessSync.customElement.includes(".")  \|\| props.sliderlessSync.customElement.includes("[")` |
| Autoplay | `props.sliderlessSync.autoplay` | `data-autoplay` | `true` | `true` / `false`. Shown when `props.sliderlessSync.customElement.includes(".")  \|\| props.sliderlessSync.customElement.includes("[")` |
| Autoplay Interval | `props.sliderlessSync.autoplayInterval` | `data-interval` | `4000` | Shown when `props.sliderlessSync.autoplay` |
| Pause on Hover | `props.sliderlessSync.pauseOnHover` | `data-pause-on-hover` | `false` | `true` / `false`. Shown when `props.sliderlessSync.autoplay` |

### DWC Slider

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Slider Class | `props.sliderClass` | `class` | `zyxobeo` |  |
| Slider Role | `props.sliderSetup.sliderRole` | `data-slider-role` | `main` | `Main Slider : main` / `Thumbnail : thumbnails` |
| Main/Thumbnail Sync Group | `props.sliderSetup.mainThumbnailSyncGroup` | `data-sync-group` |  |  |
| Transition Type | `props.sliderSetup.transitionType` | `data-type` | `Slide` | `Slide` / `Fade` / `Loop` |
| Sllde Direction | `props.sliderSetup.slldeDirection` | `data-direction` | `ltr` | Left to Right: ltr \| Right to Left: rtl \| Vertical: ttb \| Supports responsive shorthand e.g. ttb sm:ltr |
| Sync Custom Element | `props.sliderSetup.syncCustomElement` | `data-sync-custom-el` |  | Syncs slider with other elements on your page. Enter a CSS selector for your own elements, e.g. .hero-title. As the slider moves, the plugin adds is-active to the matching element, plus is-prev / is-next to its neighbours, so you can style them in CSS (e.g. .hero-title.is-active). To extend this feature, use the JS API ready() helper. See docs. |
| Sync Custom Element Nav | `props.sliderSetup.syncCustomElementNav` | `data-sync-custom-el-nav` | `false` | `true` / `false`. Shown when `props.sliderSetup.syncCustomElement.includes(".")  \|\| props.sliderSetup.syncCustomElement.includes("[")` |
| Custom Options | `props.sliderSetup.customOptions` | `data-custom-options` |  | Advanced: add extra Splide settings that don't have their own control here. Type them as name: value pairs separated by commas, e.g. wheel: true, waitForTransition: false, drag: 'free', speed: 800. These override the settings here. For structured settings (like per-breakpoint values), use the setOptions() JavaScript API instead. See docs. |
| Slide Title Delay | `props.sliderSetup.slideTitleDelay` | `data-slide-title-delay` | `200ms` | How long a Next/Prev nav button waits before swapping to the adjacent slide's title, so the button can resize first. Requires a [data-slide-title] element in the button. 0 = instant. See docs. |
| Slides Per Page | `props.layout.slidesPerPage` | `data-per-page` | `1` | Set for Base breakpoint and use breakpoint tokens for other breakpoints e.g. 3 md:2 sm:1 |
| Slides per Move | `props.layout.slidesPerMove` | `data-per-move` | `1` |  |
| Gap between Slides | `props.layout.gapBetweenSlides` | `data-gap` | `1rem` | Set for Base breakpoint and other breakpoints e.g. 1rem md:0.5rem sm:0.25rem. You can also use a single clamp value. |
| Slider Edge Offset | `props.layout.sliderEdgeOffset` | `data-padding` |  | Set splide padding for base and other breakpoints E.g. 8% lg:6% md:4% sm:2%. |
| -- Left Offset | `props.layout.leftOffset` | `data-padding-left` |  | Set splide padding for base and other breakpoints E.g. 8% lg:6% md:4% sm:2%. |
| -- Right Offset | `props.layout.rightOffset` | `data-padding-right` |  | Set splide padding for base and other breakpoints E.g. 8% lg:6% md:4% sm:2%. |
| Layout Mode | `props.layout.layoutMode` | `data-layout-mode` |  | Values: slider or static. Example: "slider md:static" = slider at desktop, static at/below md (e.g. for a mobile stacked-cards) |
| Grid Columns | `props.layout.gridColumns` | `data-grid-columns` |  | Grid columns when slider is in static mode.. Shown when `props.layout.layoutMode.includes("static")` |
| Padding Inline | `props.layout.paddingInline` | `style` | `0px` | Applies only on static layout. Shown when `props.layout.layoutMode.includes("static")` |
| Padding Block | `props.layout.paddingBlock` | `style` | `0px` |  |
| Slider Width | `props.dimensions.sliderWidth` | `data-width` |  |  |
| Slider Height | `props.dimensions.sliderHeight` | `data-height` | `auto` | Set the base height, and use breakpoint tokens for other breakpoints, E.g. 700px lg:600px md:450px sm:300px. Property: --slide-height-active |
| Aspect Ratio | `props.dimensions.aspectRatio` | `data-height-ratio` |  | Use `1.0` for a square (1:1), `0.75` for classic (4:3), `0.5625` for widescreen (16:9), `0.5` for panorama (2:1), or `0.4225` for ultrawide (21:9). Leave it empty to size the slider with Slider Height instead. It takes the responsive shorthand too, e.g. `0.5 md:0.5625 sm:0.75`.. Shown when `props.dimensions.sliderHeight === "auto"` |
| Slide Auto Width | `props.dimensions.slideAutoWidth` | `data-slide-auto-width` | `false` | `true` / `false` |
| Loop | `props.motion.loop` | `data-loop` | `true` | `true` / `false` |
| Rewind | `props.motion.rewind` | `data-rewind` | `false` | `true` / `false` |
| Enable Drag | `props.motion.enableDrag` | `data-drag` | `true` | `true` / `false` |
| Speed | `props.motion.speed` | `data-speed` | `400` |  |
| Focus | `props.motion.focus` | `data-focus` | `0` | Determines which slide should be active if the carousel has multiple slides in a page. E.g. 0, 1, center |
| Update on Move | `props.motion.updateOnMove` | `data-update-on-move` | `true` | `true` / `false` |
| Auto Play | `props.autoplay.autoPlay` | `data-autoplay` | `true` | `true` / `false` |
| Interval | `props.autoplay.interval` | `data-interval` | `4000` |  |
| Pause On Hover | `props.autoplay.pauseOnHover` | `data-pause-on-hover` | `false` | `true` / `false` |
| Play/Pause Button | `props.autoplay.playPauseButton` | `data-autoplay-toggle` | `true` | `true` / `false` |
| Bar Progress | `props.progress.barProgress` | `data-bar-progress` | `False` | `False` / `Slides` / `Timer` |
| Circular Progress | `props.progress.circularProgress` | `data-circular-progress` | `False` | `False` / `Slides` / `Timer` |
| Counter Progress | `props.progress.counterProgress` | `data-counter` | `false` | `true` / `false` |
| Counter Leading Zeros | `props.progress.counterLeadingZeros` | `data-leading-zeros` | `false` | `true` / `false`. Shown when `props.progress.circularProgress !== "False" \|\| props.progress.counterProgress` |
| Infinite Scroll | `props.autoscroll.infiniteScroll` | `data-auto-scroll` | `false` | `true` / `false` |
| Scroll Speed | `props.autoscroll.scrollSpeed` | `data-auto-scroll-speed` | `4` | Shown when `props.autoscroll.infiniteScroll` |
| Pause on Hover | `props.autoscroll.pauseOnHover` | `data-auto-scroll-pause-on-hover` | `true` | `true` / `false`. Shown when `props.autoscroll.infiniteScroll` |
| Pause on Focus | `props.autoscroll.pauseOnFocus` | `data-auto-scroll-pause-on-focus` | `true` | `true` / `false`. Shown when `props.autoscroll.infiniteScroll` |
| Navigation Arrows | `props.navigation.navigationArrows` | `data-arrows` | `true` | `true` / `false` |
| Pagination Dots | `props.navigation.paginationDots` | `data-pagination` | `true` | `true` / `false` |
| Enable | `props.overlay.enable` | `data-overlay` | `false` | `true` / `false` |
| Overlay Background | `props.overlay.overlayBackground` | `style` | `var(--slider-overlay-bg-inactive)` | Shown when `props.overlay.enable` |
| Overaly Background Inactive | `props.overlay.overalyBackgroundInactive` | `style` | `color-mix(in oklch, black 55%, transparent)` | Shown when `props.overlay.enable` |
| Edge Fade | `props.overlay.edgeFade` | `data-edge-fade` | `false` | `true` / `false` |
| Fade Distance | `props.overlay.fadeDistance` | `style` | `15%` | Set overall fade distance from the edge. Shown when `props.overlay.edgeFade` |
| Fade Softness | `props.overlay.fadeSoftness` | `style` | `0.8` | Softness scale: 1 = softest fade, 0 = sharp edge. Shown when `props.overlay.edgeFade` |
| Fade Opacity | `props.overlay.fadeOpacity` | `style` | `0%` | `0%` fades it fully out (default), up to `100%` for no fade at the edge.. Shown when `props.overlay.edgeFade` |
| Overflow | `props.slides.overflow` | `data-overflow` | `false` | `true` / `false` |
| Opacity | `props.slides.opacity` | `style` | `1` |  |
| Opacity-Active | `props.slides.opacityActive` | `style` | `1` |  |
| Scale | `props.slides.scale` | `style` | `1` |  |
| Scale-Active | `props.slides.scaleActive` | `style` | `1` |  |
| TranslateY | `props.slides.translateY` | `style` | `0` |  |
| TranslateY-Active | `props.slides.translateYActive` | `style` | `0` |  |
| TranslateX | `props.slides.translateX` | `style` | `0` |  |
| Flip Next TranslateX | `props.slides.flipNextTranslateX` | `data-flip-translate-x` | `false` | `true` / `false`. Shown when `props.slides.translateX !== "0"` |
| TranslateX-Active | `props.slides.translateXActive` | `style` | `0` |  |
| RotateY | `props.slides.rotateY` | `style` | `0deg` |  |
| Flip Next RotateY | `props.slides.flipNextRotateY` | `data-flip-rotate-y` | `false` | `true` / `false`. Shown when `props.slides.rotateY !== "0deg"` |
| RotateY-Active | `props.slides.rotateYActive` | `style` | `0deg` |  |
| RotateX | `props.slides.rotateX` | `style` | `0deg` |  |
| RotateX-Active | `props.slides.rotateXActive` | `style` | `0deg` |  |
| Transform Origin | `props.slides.transformOrigin` | `style` | `center center` |  |
| Perspective | `props.slides.perspective` | `style` | `initial` |  |
| Border | `props.slides.border` | `style` | `none` |  |
| Border-Active | `props.slides.borderActive` | `style` | `none` |  |
| Transition | `props.slides.transition` | `style` | `0.4s` |  |
| Transition-Active | `props.slides.transitionActive` | `style` | `0.4s` |  |
| Border Radius | `props.slides.borderRadius` | `style` |  |  |
| Height-Inactive | `props.slides.heightInactive` | `style` | `var(--slide-height-active)` |  |
| Lightbox | `props.lightbox.lightbox` | `data-lightbox` | `False` | `False` / `Images` / `Slides` |
| Lightbox Arrows | `props.lightbox.lightboxArrows` | `data-lightbox-arrows` | `true` | `true` / `false`. Shown when `props.lightbox.lightbox !== "False"` |
| Lightbox Counter | `props.lightbox.lightboxCounter` | `data-lightbox-counter` | `true` | `true` / `false`. Shown when `props.lightbox.lightbox !== "False"` |
| Lightbox Transition | `props.lightbox.lightboxTransition` | `data-lightbox-type` | `Rewind` | `Rewind` / `Loop` / `Slide` / `Fade`. Shown when `props.lightbox.lightbox !== "False"` |
| Static Lightbox | `props.lightbox.staticLightbox` | `data-static-lightbox` | `true` | `true` / `false`. Shown when `props.lightbox.lightbox !== "False"` |
| Lazy Load Slider | `props.performance.lazyLoadSlider` | `data-lazy-init` | `false` | `true` / `false` |
| Lazy Preload Distance | `props.performance.lazyPreloadDistance` | `data-lazy-preload` | `200` | Shown when `props.performance.lazyLoadSlider` |
| Thumbnail slide width | `props.builderPreview.thumbnailSlideWidth` | `style` | `350px` | Applies to thumbnails inside a Slider Wrapper |
| Outline | `props.builderPreview.outline` | `style` | `dashed 1px color-mix(in oklch, aqua 50%,transparent)` |  |
| Laptop (lg) | `props.breakpoints.laptopLg` | `data-breakpoint-lg` |  | Default: 1120px |
| Tablet (md) | `props.breakpoints.tabletMd` | `data-breakpoint-md` |  | Default: 1024px |
| Phone (sm) | `props.breakpoints.phoneSm` | `data-breakpoint-sm` |  | Default: 640px |
| Aria Label | `props.ariaLabel` | `aria-label` |  |  |
| data-slider-id | `props.dataSliderId` | `data-slider-id` |  |  |

### DWC Slide

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Class  | `props.class` | `class` | `` |  |
| Slide Title | `props.slideTitle` | `data-slide-title` |  | Add a slide title that will show on the custom next/prev buttons. Falls back to [data-slide-title] text, then to first heading in the slide. Note: a text with attribute [data-slide-title] must be added to the custom next/prev buttons to activate this feature. |

### DWC Slider Progress

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Progress type | `props.progressType` | `data-progress-type` | `circular` | `Circular : circular` / `Bar : bar` / `Counter : counter` |
| -- Circular Size (px) | `props.circularSizePx` | `data-circular-size` | `52` | Must be more than twice the Circular Radius.. Shown when `props.progressType === "circular"` |
| -- Circular radius (px) | `props.circularRadiusPx` | `data-circular-radius` | `25` | Must be less than half the Circular Size. Shown when `props.progressType === "circular"` |
| -- Circular Stroke (px) | `props.circularStrokePx` | `data-circular-stroke` | `3` | Shown when `props.progressType === "circular"` |
| -- Circular Counter | `props.circularCounter` | `data-circular-counter` | `true` | `true` / `false`. Shown when `props.progressType === "circular"` |
| --- Counter Font Size (rem) | `props.counterFontSizeRem` | `data-circular-font` | `0.6` | Shown when `props.circularCounter === true` |
| Progress Mode | `props.progressMode` | `data-progress-mode` | `slides` | `Slides : slides` / `Timer : timer`. Shown when `props.progressType !== "counter"` |
| Visibility | `props.style.counterText.visibility` | style only | `Default` | `Default` / `Hide Total : hide-total` / `Hide Current : hide-current`. Shown when `props.progressType === "counter" \|\| (props.progressType === "circular" && props.circularCounter)` |
| Total Color | `props.style.counterText.totalColor` | `style` | `#8888a0` | Shown when `props.progressType === "counter" \|\| (props.progressType === "circular" && props.circularCounter)` |
| Current Color | `props.style.counterText.currentColor` | `style` | `var(--primary, #ff4d6a)` | Shown when `props.progressType === "counter" \|\| (props.progressType === "circular" && props.circularCounter)` |
| Total Font Size | `props.style.counterText.totalFontSize` | `style` | `0.8rem` | Shown when `props.progressType === "counter" \|\| (props.progressType === "circular" && props.circularCounter)` |
| Current Font Size | `props.style.counterText.currentFontSize` | `style` | `0.8rem` | Shown when `props.progressType === "counter" \|\| (props.progressType === "circular" && props.circularCounter)` |
| Separator Color | `props.style.counterText.separatorColor` | `style` | `var(--progress-clr-total)` | Shown when `props.progressType === "counter" \|\| (props.progressType === "circular" && props.circularCounter)` |
| Separator Size | `props.style.counterText.separatorSize` | `style` | `0.6rem` | Shown when `props.progressType === "counter" \|\| (props.progressType === "circular" && props.circularCounter)` |
| Separator Gap | `props.style.counterText.separatorGap` | `style` | `-0.08em` | Shown when `props.progressType === "counter" \|\| (props.progressType === "circular" && props.circularCounter)` |
| Padding | `props.style.padding` | `style` | ` 4px 12px` | Shown when `props.progressType === "counter" \|\| (props.progressType === "circular" && props.circularCounter)` |
| Background Blur | `props.style.backgroundBlur` | `style` | `8px` | Shown when `props.progressType === "counter" \|\| (props.progressType === "circular" && props.circularCounter)` |
| Progress Fill Color | `props.style.progressFillColor` | `style` | `#ff4d6a` | Shown when `props.progressType === "bar" \|\| props.progressType === "circular"` |
| Progress Fill Color 2 | `props.style.progressFillColor2` | `style` | `#ff8fa3` | Shown when `props.progressType === "bar"` |
| Progress Track Color | `props.style.progressTrackColor` | `style` | `rgba(255, 255, 255, 0.1)` | Shown when `props.progressType === "bar" \|\| props.progressType === "circular"` |
| Background Color | `props.style.backgroundColor` | `style` | `rgba(0, 0, 0, 0.4)` | Shown when `props.progressType === "counter"` |
| Border Radius | `props.style.borderRadius` | `style` | `20px` | Shown when `props.progressType === "counter"` |
| Border | `props.style.border` | `style` | `1px solid rgba(255, 255, 255, 0.08)` | Shown when `props.progressType === "counter"` |
| Class  | `props.class` | `class` | `` |  |

### DWC Slider Play-Pause

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Size | `props.size` | `style` | `40px` |  |
| Border Radius | `props.borderRadius` | `style` | `50vw` |  |
| Border | `props.border` | `style` | `1px solid rgba(255, 255, 255, 0.1)` |  |
| Color | `props.color` | `style` | `#fff` |  |
| Hover/Active Border Color | `props.hoverActiveBorderColor` | `style` | `var(--primary, #ff4d6a)` |  |
| Background | `props.background` | `style` | `rgba(0, 0, 0, 0.4)` |  |
| Hover/Active Background | `props.hoverActiveBackground` | `style` | `color-mix(in oklch, var(--primary, #ff4d6a) 20%, transparent)` |  |
| Background Blur | `props.backgroundBlur` | `style` | `8px` |  |
| Class | `props.class` | `class` | `` |  |

### DWC Slider Pagination

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Custom Pagination Mode | `props.customPaginationMode` | `data-custom-pagination` | `Default` | `Default` / `Template` |
| Background Color | `props.wrapper.backgroundColor` | `style` | `rgba(0 0 0 / 40%)` | Shown when `props.customPaginationMode === "Default"` |
| Filter Blur | `props.wrapper.filterBlur` | `style` | `5px` | Shown when `props.customPaginationMode === "Default"` |
| Padding | `props.wrapper.padding` | `style` | `0.5em 1em` | Shown when `props.customPaginationMode === "Default"` |
| Border Radius | `props.wrapper.borderRadius` | `style` |  | Shown when `props.customPaginationMode === "Default"` |
| Size | `props.dot.size` | `style` | `calc(var(--font-size) * 2)` | Shown when `props.customPaginationMode === "Default"` |
| Background | `props.dot.background` | `style` | ` color-mix(in oklch, white 20%, transparent)` | Shown when `props.customPaginationMode === "Default"` |
| Active Background | `props.dot.activeBackground` | `style` | `#ff4d6a` | Shown when `props.customPaginationMode === "Default"` |
| Border Radius | `props.dot.borderRadius` | `style` | `50%` | Shown when `props.customPaginationMode === "Default"` |
| Font Size | `props.dot.fontSize` | `style` | `1rem` | Shown when `props.customPaginationMode === "Default"` |
| Text Color | `props.dot.textColor` | `style` |  | Shown when `props.customPaginationMode === "Default"` |
| Active Text Color | `props.dot.activeTextColor` | `style` |  | Shown when `props.customPaginationMode === "Default"` |
| Position | `props.layout.position` | `style` | `Relative` | `Relative` / `Absolute` / `Static` / `Fixed` |
| Z-index | `props.layout.zIndex` | `style` | `initial` |  |
| Direction | `props.layout.direction` | `style` | `Row` | `Row` / `Column` |
| Gap | `props.layout.gap` | `style` | `1rem` |  |
| Class | `props.class` | `class` | `` |  |

### DWC Slider Nav Button

| Prop | Path | Attribute | Default | Values / notes |
| --- | --- | --- | --- | --- |
| Navigation Type | `props.navigationType` | `data-go-to` | `next` | `Next Slide : next` / `Previous Slide : prev` / `First Slide : first` / `Last Slide : last` / `Go to Slide : custom` |
| Custom Slide | `props.customSlide` | `data-go-to` | `1` | Shown when `props.navigationType === "custom"` |
| Use Custom Arrow | `props.useCustomArrow` | style only | `false` | `true` / `false`. Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Custom SVG | `props.customSvg` | style only |  | Paste SVG here. NOTE: To use custom SVG, enable 'Allow "unsafe" HTML' in Etch Settings. Shown when `props.useCustomArrow` |
| Background | `props.styles.background` | `style` | `rgba(255, 255, 255, 0.06)` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Hover Background | `props.styles.hoverBackground` | `style` | `color-mix(in oklch, var(--primary, #ff4d6a) 20%, transparent)` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Background Blur | `props.styles.backgroundBlur` | `style` | `10px` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Color | `props.styles.color` | `style` | `color-mix(in oklch, white 50%, transparent)` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Hover Color | `props.styles.hoverColor` | `style` | `#fff` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Icon Size | `props.styles.iconSize` | `style` | `1.125rem` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Opacity | `props.styles.opacity` | `style` | `1` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Hover Opacity | `props.styles.hoverOpacity` | `style` | `1` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Border | `props.styles.border` | `style` | `1px solid rgba(255, 255, 255, 0.1)` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Hover Border Color | `props.styles.hoverBorderColor` | `style` | `var(--primary, #ff4d6a)` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Border Radius | `props.styles.borderRadius` | `style` | `50%` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Min Width | `props.styles.minWidth` | `style` | `2.75rem` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Min Height | `props.styles.minHeight` | style only | `var(--arrow-width)` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Padding | `props.styles.padding` | `style` | `0px` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Aspect Ratio | `props.styles.aspectRatio` | `style` | `1` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Transition | `props.styles.transition` | `style` | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Shown when `props.navigationType === "next" \|\| props.navigationType === "prev"` |
| Button Class | `props.buttonClass` | `class` | `` | Add a class to style your navigation button |
| Button Wrapper Class | `props.buttonWrapperClass` | `class` | `` | Outer button wrapper, useful when applying positioning styles e.g. order |

### Attributes with no prop behind them

The engine reads these, but no component prop writes them. **`etch.blocks.setAttribute` validates
the key against the component's registered properties**, so none of these can be set on a component
instance that way. They are listed for recognition when reading a page, not as settings to reach for.

| Attribute | Notes |
| --- | --- |
| `data-auto-height` | Declared on the Slider element with a hardcoded empty value and documented nowhere. Inert: treat it as not available. |
| `data-autoplay-progress` | Read by the engine (`isOn(splideEl, "autoplay-progress")`) but not declared by the component. Use the Progress component or the Slider's own Bar/Circular Progress props instead. |
| `data-fixed-height` | Same as `data-auto-height`: hardcoded empty, undocumented, inert. |
| `data-sc-template` | Marks which child of a custom pagination is the template to clone. The engine sets it on the first child when absent, so you rarely set it yourself. |

<!-- GENERATED:PROPS end -->

***

## 2. CSS variables

Arrows, dots, pagination, progress, play/pause and the lightbox are styled with CSS custom
properties, not props. The template class is **`.slider-navigation-vars`**, holding 94 variables.

**Per-slider styling.** Each Slider's **Slider Class** prop (`props.sliderClass`) names the class
its variables are read from, so two sliders on one page style independently. The plugin renames
the auto-generated class on save, so never style directly on `.slider-navigation-vars`: add your
own class (e.g. `.my-slider`) and style that. Classes you add yourself are never renamed.

### Arrows

`--arrow-bg`, `--arrow-clr`, `--arrow-radius`, `--arrow-width`, `--arrow-height`,
`--arrow-padding`, `--arrow-aspect-ratio`, `--arrow-icon-size`, `--arrow-bg-blur`,
`--arrow-border`, `--arrow-opacity`, `--arrow-transition`

Hover: `--arrow-hover-bg`, `--arrow-hover-clr`, `--arrow-hover-opacity`, `--arrow-hover-border-clr`

Position, per side: `--prev-arrow-top/-bottom/-left/-right/-transform` and
`--next-arrow-top/-bottom/-left/-right/-transform`

### Pagination dots

`--dot-size`, `--dot-radius`, `--dot-clr`, `--dot-transition`, `--dot-hover-clr`,
`--dot-clr-active`, `--dot-transform-active`

Wrapper: `--pagination-position`, `--pagination-padding`, `--pagination-bg`,
`--pagination-bg-blur`, `--pagination-radius`, `--pagination-gap`, and
`--pagination-top/-bottom/-left/-right/-transform`

### Play / pause

`--play-pause-size`, `--play-pause-radius`, `--play-pause-border`, `--play-pause-clr`,
`--play-pause-bg`, `--play-pause-bg-blur`, `--play-pause-hover-bg`,
`--play-pause-hover-border-clr`, `--play-pause-top/-bottom/-left/-right`, `--play-pause-z-index`

### Progress (bar, circular, counter)

`--progress-fill-clr`, `--progress-fill-clr-2`, `--progress-bg`, `--progress-bg-blur`,
`--progress-border-radius`, `--progress-border`, `--progress-padding`, `--progress-track-clr`,
`--progress-separator-clr`, `--progress-separator-gap`, `--progress-separator-size`,
`--progress-clr-current`, `--progress-font-size-current`, `--progress-clr-total`,
`--progress-font-size-total`, `--progress-top/-bottom/-left/-right`, `--progress-z-index`

### Lightbox overlay

Themeable **per slider, from the Slider Class**, the same place arrows and dots are styled. Media
queries inside that class work: the overlay reads the value for the current viewport.

`--lightbox-bg`, `--lightbox-z`, `--lightbox-close-size`, `--lightbox-padding`,
`--lightbox-img-height`, `--lightbox-slide-height`, `--lightbox-arrow-bg`,
`--lightbox-arrow-hover-bg`, `--lightbox-clr`

### Card deck variables (Sync Without Slider stacks)

Not part of `.slider-navigation-vars`. These live on the stack element of a card-deck build and
are the knobs for its 3-D geometry. See `../../card-stack-templates.md` for the full treatment.

| Variable | Meaning |
| --- | --- |
| `--dur` | how long one card change takes |
| `--ease` | easing curve |
| `--lag` | how far the sideways move trails the lift. This is what reads as a shuffle rather than a slide |
| `--spread` | sideways offset of the prev/next cards |
| `--tilt` | their rotation |
| `--depth-near` | how far back prev/next sit on the Z axis |
| `--depth-far` | where every other card waits, invisible |

**How many cards a deck needs to loop.** Three are always on show, the front card and the two
beside it. To loop, the deck also needs a hidden slot at each end for the wrapping card to pass
through unseen. Three visible plus two hidden means **five is the minimum for Loop to work at
all**, and each extra row fanned out behind costs two more cards:

| Rows behind the front card | Cards needed to loop |
| --- | --- |
| 1 (just the two side cards) | 5 |
| 2 | 7 |
| 3 (the full fan) | 9 |

So five cards loops but only ever shows the three-card fan. With fewer than five, turn Loop off
and the deck dead-ends at the first and last card. A queue that throws cards away (the Fall
pattern) never loops, so it has no minimum: two cards is fine.

The deck script exposes `MAX_TIERS` (the deepest ring the CSS defines) and `NAV_RINGS` (how many
rings stay clickable). `MIN_LOOP` is the safety rule behind the table above: leave it alone.

***

## 3. Sync Custom Element and Sync Without Slider

The feature behind every premade template. A slider (or a wrapper with no slider) moves three
classes across elements you nominate:

| Class | On |
| --- | --- |
| `is-active` | the element for the current slide |
| `is-prev` | the one before it |
| `is-next` | the one after it |

Those three are the entire contract. **You write all the CSS**; the plugin only moves the classes.

### With a slider

Set `props.sliderSetup.syncCustomElement` (`data-sync-custom-el`) on the **Slider** to a CSS
selector for your elements.

* **Multiple sets:** comma-separate them, e.g. `.headings, .thumb-strip`. Each set is tracked
  independently, so a 3-item set and a 2-item set each wrap on their own count.
* Commas **inside** a selector are safe: `:is(.a, .b)`, `:not(.x, .y)`, `[data-role="a,b"]` are
  left intact.
* Elements can live anywhere on the page and do not have to be inside the slider.
* They do not have to match the slide count.

### Without a slider

Set `props.sliderlessSync.customElement` (`data-sync-custom-el`) on the **Wrapper**, and put no
`.splide` inside it. That combination alone switches the wrapper into Sync Without Slider. Its
own group then supplies Loop, Arrow Keys, Auto Play, Interval and Pause on Hover.

### Element nav (clickable synced elements)

`data-sync-custom-el-nav` makes the sync two-way: each element also becomes a go-to control, and
the plugin gives it `role="button"` and `tabindex="0"`.

**The overlap caveat, and it bites on every card deck.** Stacked elements sit on top of each
other, and coplanar boxes are hit-tested by DOM order, so the **last** overlapping element in the
HTML wins a click however far back it appears. Decide explicitly which element a click reaches:
set a `z-index` ladder by distance from the active card, and switch `pointer-events` off beyond
the rings you want clickable. Both need the per-card distance, which is one of the two cases where
a script is allowed (see the main file).

To opt out of focusability, set `tabindex="-1"` on the elements yourself; the plugin will not
overwrite it.

***

## 4. Escape hatches, in order of preference

1. **A prop.** Check the tables above first. 177 of the 181 props write a `data-*` attribute, so
   almost everything the engine reads is reachable this way.
2. **Custom Options** (`props.sliderSetup.customOptions`) for a Splide setting with no control of
   its own. Written as `name: value` pairs, e.g. `wheel: true, waitForTransition: false`.
3. **`setOptions()` / `ready()`** from your own JavaScript, for structured settings such as
   per-breakpoint values that Custom Options cannot express. See `../../javascript-api.md`.

There is no "just set the attribute" step in that list, deliberately.
`etch.blocks.setAttribute` validates the key against the component's registered properties, so an
arbitrary `data-*` cannot be set on a component instance at all. The four attributes with no prop
behind them are listed in section 1 for recognition only.

```js
// Turn on a Splide setting the panel does not expose
window.SplideComponent.setOptions('.my-slider', { pageInterval: 1200 });

// Run code once a slider is mounted
window.SplideComponent.ready('.my-slider', function (splide) {
  splide.on('move', function (i) { /* ... */ });
});
```

`setOptions` handles the rebuild when a setting changes size or layout. Use `move` when the page
should react immediately and `moved` to wait for the slide to arrive. Do not bind a `mounted`
handler inside `ready()`: the slider mounted before your code ran, so it has already fired.

***

## 5. Recognising an existing setup

Before configuring an unfamiliar slider, check whether it is a premade template. If it is, use
that template's documented knobs rather than inventing new CSS.

| Template | Identify by | Script | Guide |
| --- | --- | --- | --- |
| Slider Zeon | `.slider-zeon`, `.main-slider-zeon` | no | `../../premade-templates.md` |
| Slider Chronos | `.slider-chronos` | no | `../../premade-templates.md` |
| Slider Flow | `.slider-flow` | no | `../../premade-templates.md` |
| Slider Team | `.slider-team` | no | `../../premade-templates.md` |
| Slider Stack | `.slider-stack`, `.slider-stack__card` | no | `../../card-stack-templates.md` |
| Slider Marquee | no class prefix. Identify by the combination: Infinite Scroll on, Edge Fade on, Slide Auto Width on, two wrappers whose rows scroll in opposite directions | no | `../../premade-templates.md` |
| Deck Featured | `.deck-stack-featured`, `.deck-card-featured` | yes | `../../card-stack-templates.md` |
| Deck Testimonial | `.deck-stack-testimonial`, `.deck-card-testimonial` | yes | `../../card-stack-templates.md` |
| Fall | `.fall-stack`, `.fall-card` | yes | `../../card-stack-templates.md` |

All nine use Sync Custom Element. Six use **no custom script at all**, which is the point: these
are props and CSS, not JavaScript.

The three that do carry a script expose named constants at the top of it. On the two Deck
templates, `MAX_TIERS` is the deepest ring the CSS defines and `NAV_RINGS` is how many rings stay
clickable. `MIN_LOOP` is a safety rule about how few cards a loop can hide a wrap behind: leave it
alone. Fall's script has nothing to adjust.

***

## 6. Admin settings

Site-wide, at **Settings > Slider Pro for Etch**. An agent rarely changes these but may need to
reason about them.

| Setting | Values | Effect |
| --- | --- | --- |
| Splide Library Source | Local (default) / CDN | where Splide loads from |
| When to Load Slider Assets | Every page (default) / Only when needed / Never | see below |
| Auto-Scroll Extension | on (default) / off | required by Infinite Scroll marquees |
| Breakpoints | SM 640, MD 1024, LG 1120 | the site-wide values behind the responsive shorthand |

**When to Load Slider Assets** governs Splide plus the plugin's own engine and stylesheet. On
"Only when needed" a page loads only what it uses, detected from the rendered markup. On "Never",
Splide is never sent, so sliders, marquees and the lightbox stop working while card stacks keep
running. The Etch builder always loads everything, so authoring is never affected.

If a slider fails to appear on anything other than "Every page", its markup reached the browser in
a way the detection could not see. Either switch back to "Every page" or add
`add_filter( 'dwc_slider_pro_needs_assets', '__return_true' );`. Adding `?dwc_debug=1` as an
administrator prints a footer comment showing what was detected.

Per-slider breakpoint overrides live on the Slider itself
(`props.breakpoints.laptopBreakpoint` and friends); leave a field blank to inherit the site value.
