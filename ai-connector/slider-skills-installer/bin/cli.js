#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");
const sourceRoot = join(packageRoot, "skills-package");

const DIRS = ["slider-skills", "components"];

function printHelp() {
  console.log(`
sliderpro-agentic-skills-etch - install the Slider Pro AI Connector skills files into a project

Usage:
  npx sliderpro-agentic-skills-etch [directory] [options]

Options:
  --force, -f    Overwrite existing slider-skills/ or components/
  --help, -h     Show this help message

Examples:
  npx sliderpro-agentic-skills-etch
  npx sliderpro-agentic-skills-etch ./my-site-project
  npx sliderpro-agentic-skills-etch --force
`);
}

function parseArgs(argv) {
  const options = { force: false, help: false, target: process.cwd() };

  for (const arg of argv) {
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--force" || arg === "-f") {
      options.force = true;
    } else if (!arg.startsWith("-")) {
      options.target = resolve(arg);
    } else {
      console.error(`Unknown option: ${arg}`);
      printHelp();
      process.exit(1);
    }
  }

  return options;
}

function listConflicts(target) {
  return DIRS.filter((dir) => existsSync(join(target, dir))).map((dir) => `${dir}/`);
}

function copyPackageFiles(target, force) {
  mkdirSync(target, { recursive: true });

  for (const dir of DIRS) {
    const source = join(sourceRoot, dir);
    const dest = join(target, dir);

    if (existsSync(dest) && !force) {
      continue;
    }

    cpSync(source, dest, { recursive: true });
  }
}

function countComponents() {
  try {
    return readdirSync(join(sourceRoot, "components")).filter((f) => f.endsWith(".md")).length;
  } catch {
    return 0;
  }
}

function main() {
  const { force, help, target } = parseArgs(process.argv.slice(2));

  if (help) {
    printHelp();
    return;
  }

  const conflicts = listConflicts(target);

  if (conflicts.length > 0 && !force) {
    console.error("Installation blocked, the following already exist:");
    for (const conflict of conflicts) {
      console.error(`  ${conflict}`);
    }
    console.error("\nRe-run with --force to overwrite.");
    process.exit(1);
  }

  copyPackageFiles(target, force);

  console.log(`Installed Slider Pro AI Connector skills to ${target}`);
  console.log(`  slider-skills/slider-pro-skills.md`);
  console.log(`  slider-skills/slider-pro-skills-reference.md`);
  console.log(`  components/ (${countComponents()} component prop docs)`);
  console.log("\nPoint your AI coding agent at slider-skills/slider-pro-skills.md to load it.");
  console.log('Then tell the agent: "npx @digital-gravy/etch-connector serve"');
}

main();
