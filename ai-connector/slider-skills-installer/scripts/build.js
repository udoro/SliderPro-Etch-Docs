#!/usr/bin/env node

// Syncs the canonical skills and component docs into skills-package/ before
// publish. The source files stay single-source in ../slider-skills and
// ../../components. This script is the only place that duplicates them, and it
// rewrites the relative path used to link them so the copies still resolve once
// installed one folder shallower in a user's project.

import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");

const SOURCE_SKILLS = join(packageRoot, "..", "slider-skills");
const SOURCE_COMPONENTS = join(packageRoot, "..", "..", "components");

const OUT_ROOT = join(packageRoot, "skills-package");
const OUT_SKILLS = join(OUT_ROOT, "slider-skills");
const OUT_COMPONENTS = join(OUT_ROOT, "components");

// The docs repo nests slider-skills/ two levels below the root
// (ai-connector/slider-skills/), so it links components/ as ../../components/.
// The installed package is one level shallower, with slider-skills/ directly
// under the target project root, so that becomes ../components/.
//
// The same applies to the sibling doc pages the skills link to
// (../../card-stack-templates.md and friends), which do not ship in the
// package at all: point those at the public site instead of leaving a link
// that resolves to nothing.
const DOCS_URL = "https://design-with-cracka.gitbook.io/etchsliderpro";
const PATH_REWRITE = [
  [/\.\.\/\.\.\/components\//g, "../components/"],
  [/\.\.\/\.\.\/card-stack-templates\.md/g, `${DOCS_URL}/card-stack-templates`],
  [/\.\.\/\.\.\/premade-templates\.md/g, `${DOCS_URL}/premade-templates`],
  [/\.\.\/\.\.\/javascript-api\.md/g, `${DOCS_URL}/javascript-api`],
  [/\.\.\/\.\.\/styling-and-responsive\.md/g, `${DOCS_URL}/styling-and-responsive`],
  [/\.\.\/\.\.\/admin-settings\.md/g, `${DOCS_URL}/admin-settings`],
  [/\.\.\/\.\.\/troubleshooting\.md/g, `${DOCS_URL}/troubleshooting`],
];

function copyMarkdownWithRewrite(srcDir, destDir) {
  rmSync(destDir, { recursive: true, force: true });
  mkdirSync(destDir, { recursive: true });

  for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) continue;

    let content = readFileSync(join(srcDir, entry.name), "utf8");
    for (const [pattern, replacement] of PATH_REWRITE) {
      content = content.replace(pattern, replacement);
    }
    writeFileSync(join(destDir, entry.name), content);
  }
}

function copyComponents(srcDir, destDir) {
  rmSync(destDir, { recursive: true, force: true });
  mkdirSync(destDir, { recursive: true });
  cpSync(srcDir, destDir, { recursive: true });
}

copyMarkdownWithRewrite(SOURCE_SKILLS, OUT_SKILLS);
copyComponents(SOURCE_COMPONENTS, OUT_COMPONENTS);

// A link left pointing at ../../ would silently 404 for every installed user,
// so fail the build rather than publish it.
let stale = 0;
for (const name of readdirSync(OUT_SKILLS)) {
  const body = readFileSync(join(OUT_SKILLS, name), "utf8");
  for (const m of body.matchAll(/\.\.\/\.\.\/[A-Za-z0-9._/-]+/g)) {
    console.error(`  unrewritten link in ${name}: ${m[0]}`);
    stale++;
  }
}
if (stale) {
  console.error(`\n${stale} link(s) still point outside the package. Add a rule to PATH_REWRITE.`);
  process.exit(1);
}

console.log("Synced skills-package/ from:");
console.log(`  ${SOURCE_SKILLS}`);
console.log(`  ${SOURCE_COMPONENTS}`);
