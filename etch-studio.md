---
icon: cloud
---

# Etch Studio

Slider Pro works in Etch Studio as well as in Etch for WordPress. You build sliders the same way, with the same seven components. Only the installation is different, because Etch Studio has no plugins.

In WordPress, a small plugin loads the slider code on your site. In Etch Studio, a component does that job: the **DWC Slider Engine**. You add it to your pages like any other component.

***

## What you need

Two files from your Gumroad download, version 1.2.4 or newer:

| File | What it is |
| --- | --- |
| The **components file**. Its name starts with `Etch-Slider-Pro-v`. | The seven slider components. This is the same file WordPress users import. |
| The **engine file**. Its name starts with `Etch-Studio-Slider-Pro-Engine-v`. | The **DWC Slider Engine** component. Only Etch Studio needs it. |

You don't need the plugin `.zip` file. That one is for WordPress.

***

## Installation

Do these steps in order.

1. Open any page in the Etch Studio builder.
2. Open the components file in a text editor. Select all of it and copy it.
3. Click the **Structure Panel** and paste. The seven DWC Slider components are now in your project. A sample slider appears on the page.
4. Open the engine file, copy all of it, and paste it into the **Structure Panel** the same way. A **DWC Slider Engine** component appears on the page.
5. Delete the sample slider if you don't want it on this page. The components stay in your project.
6. Publish your site.

The **DWC Slider Engine** shows the text "Add this component (DWC Slider Engine) once per page". That text only shows in the builder. Visitors never see it.

***

## Add the engine to every page with a slider

A slider needs the **DWC Slider Engine** on its page. Without it, the slider shows on your live site but doesn't move.

Add the **DWC Slider Engine** once to each page that has a slider. Put it anywhere on the page. The bottom of the page is a good place.

- On the live site the engine takes no space and shows nothing.
- It adds about 43 KB (compressed) to each page where you place it. Pages without a slider don't need it.
- Add it only once per page. If you add it twice, the second copy does nothing, but it still adds another 43 KB to the page.

**If your pages use a template,** add the engine to the template instead. Every page that uses that template then gets it, and you don't need to add it to each page.

If you add a slider and forget the engine, a reminder appears at the bottom of the builder canvas: "Reminder: add the DWC Slider Engine component once to this page. Without it, your slider will not work on the live site." It goes away as soon as you add the engine.

***

## Build a slider

Build it the same way as in WordPress. See [Quick start](getting-started.md#quick-start) and the [component pages](components/dwc-slider-wrapper.md).

In the builder, Edit and Preview work the same as in WordPress: slides show in a grid while you edit, and **Preview** runs the real slider. See [Using the slider inside Etch](getting-started.md#using-the-slider-inside-etch-editor-vs.-preview-vs.-live-site).

For slide images, upload them in Etch Studio's **Asset Manager**, then add an image to the slide and pick the file.

***

## What is different from WordPress

| | Etch for WordPress | Etch Studio |
| --- | --- | --- |
| How the slider code reaches your site | The plugin | The **DWC Slider Engine** component, on each page with a slider |
| Settings screen | **Settings → Slider Pro for Etch** | None. See below. |
| Splide library | Local copy or CDN, your choice | Always included in the engine |
| Auto-Scroll extension | On or off | Always on |
| When the code loads | Every page, or only when needed | Only on pages where you add the engine |
| Breakpoints | Set in the settings screen | 640, 1024 and 1120 pixels. Each slider can use its own values in its [BREAKPOINTS panel](components/dwc-slider.md#breakpoints). |
| WordPress block editor | Supported | Not applicable |
| Updating | New plugin file, then import the components again | Paste both files again. See below. |

Everything else runs on the same engine and works the same, including Sync Custom Element, Sync Without Slider (the card stacks) and Fade. Each slider also still gets its own **Slider Class**, and a duplicated slider gets a fresh one.

***

## Updating

1. Turn on **Overwrite on paste** in Etch Studio's settings. It's the same setting as in Etch for WordPress.
2. Paste the new components file into the **Structure Panel**.
3. Paste the new engine file into the **Structure Panel**.
4. Turn **Overwrite on paste** off again.
5. Publish your site.

Don't skip step 1. With **Overwrite on paste** off, Etch Studio keeps your old components and ignores the new ones, and you get no error. With it on, the new components replace the old ones and your sliders stay as they are.

Don't skip step 4 either. Leave **Overwrite on paste** on only while you update. If it stays on, any later paste of a component with the same name replaces yours, and you lose the changes you made to that component.

***

## Checking your version

Open a published page, open your browser's developer console, and look for this line:

```
DWC Slider Pro for Etch: Initialized { version: "1.2.4" }
```

That is the engine version on that page. The number you see is the version you installed.

***

## Troubleshooting

| Symptom | What to do |
| --- | --- |
| The slider shows on the live site but doesn't move | The page has no **DWC Slider Engine**. Add it once to the page and publish again. |
| The reminder at the bottom of the canvas doesn't go away | Add the **DWC Slider Engine** to this page. If it's already there, reload the builder tab. |
| I pasted the new files but nothing changed | Turn on **Overwrite on paste**, paste both files again, then turn it off. See [Updating](#updating). |

For anything about the slider itself, see [Troubleshooting](troubleshooting.md).
