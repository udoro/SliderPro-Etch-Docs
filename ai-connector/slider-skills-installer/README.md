# sliderpro-agentic-skills-etch

Installs the Slider Pro for Etch AI Connector skills files and component prop docs into any
project, so users do not have to clone or download the docs repo by hand.

```
npx sliderpro-agentic-skills-etch
```

Installs into the current directory:

```
slider-skills/slider-pro-skills.md
slider-skills/slider-pro-skills-reference.md
components/*.md
```

Options: `--force` / `-f` to overwrite an existing install, a path argument to install elsewhere
(e.g. `npx sliderpro-agentic-skills-etch ./my-site-project`), `--help` / `-h`.

## Maintaining this package

`skills-package/` is a **generated copy**, not a source of truth. The real files live at:

- `../slider-skills/slider-pro-skills.md`
- `../slider-skills/slider-pro-skills-reference.md`
- `../../components/*.md`

Whenever those change, regenerate the bundle before publishing:

```
npm run build
```

This also runs automatically via `prepublishOnly` before `npm publish`.

The build rewrites the links that only make sense inside the docs repo. `../../components/`
becomes `../components/`, because the installed layout is one folder shallower. Links to sibling
doc pages that do **not** ship in the package (`../../card-stack-templates.md` and friends) are
rewritten to the public GitBook URLs. The build fails if any `../../` link survives, so a broken
link cannot reach npm.

The prop tables inside the reference file are themselves generated, from the Etch component export
in the plugin repo:

```
node tools/gen-prop-tables.mjs --splice "<docs>/ai-connector/slider-skills/slider-pro-skills-reference.md"
```

Re-run that after any component change, then `npm run build` here.

## Publishing a new version

```
npm version patch   # or minor/major
npm run build
npm publish
```

(Requires `npm adduser` / `npm login` first.)
