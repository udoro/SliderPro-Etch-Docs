---
icon: sparkles
---

# AI Connector

The AI Connector lets you build and configure **Slider Pro for Etch** through a conversational AI
agent. Describe the slider you want in plain English and the agent builds it directly inside your
Etch Builder.

***

## Requirements

* Etch Builder with Slider Pro for Etch installed
* [Node.js](https://nodejs.org) (v18 or later)
* An **AI coding agent with terminal access**. The agent needs to run terminal commands against
  your live Etch Builder tab, so a chat-only interface will not work.

| Agent | How to get it |
|---|---|
| [Claude Code](https://docs.anthropic.com/en/claude-code/getting-started) | VS Code / JetBrains extension, or CLI |
| [Cursor](https://www.cursor.com) | Standalone AI IDE with built-in agent mode |
| [OpenAI Codex](https://openai.com/codex) | CLI agent |

> The AI must be running in **agent mode** with terminal access enabled.

***

## How it works

1. Enable the AI Connector in Etch Builder (**Settings > AI**, off by default), then connect with
   the "Connect external AI agent" button.
2. Install the Slider Pro skills files into your project so the agent knows the system.
3. Describe what you want. The agent reads your page, sets the right props, writes the CSS, and
   shows you a screenshot of the result.

***

## Installing the skills

From your project folder:

```
npx sliderpro-agentic-skills-etch
```

That drops the following into the current directory:

```
slider-skills/slider-pro-skills.md
slider-skills/slider-pro-skills-reference.md
components/*.md
```

Options: `--force` / `-f` to overwrite an existing install, a path argument to install elsewhere
(e.g. `npx sliderpro-agentic-skills-etch ./my-site-project`), and `--help` / `-h`.

Then point your agent at `slider-skills/slider-pro-skills.md` and ask for what you want.

> **While the package is being published**, download the two files directly from
> [the docs repository](https://github.com/udoro/SliderPro-Etch-Docs/tree/master/ai-connector/slider-skills)
> and put them in a `slider-skills/` folder in your project.

***

## What the agent can build

Anything Slider Pro supports:

* Carousels, heroes, product galleries and testimonial rows
* Main and thumbnail pairs that sync automatically
* Cover-flow carousels with perspective-tilted neighbours
* Continuous logo marquees with softly faded edges
* Sliders that turn into a plain CSS grid at a breakpoint
* Any elements on your page synced to the slider, including 3-D card decks with no slider at all

The agent builds these from Slider Pro's own settings and CSS, and writes custom JavaScript only
where a design needs something the plugin cannot express.

***

## The two files

| File | Role |
|---|---|
| `slider-pro-skills.md` | The main file. The agent reads it in full at the start of a session. |
| `slider-pro-skills-reference.md` | Lookup only. Every prop on all seven components, the CSS variables, and the template signatures. The agent searches it when it needs a specific value. |

The prop tables are generated from the Etch component export, so they match the components you
have installed.
