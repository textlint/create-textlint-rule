#!/usr/bin/env node
import { parseArgs, styleText } from "node:util";
import { readFile } from "node:fs/promises";
import cliHandler from "../lib/cli-handler.js";

const HELP_TEXT = `
    Usage
      $ create-textlint-rule rule-name

    Options
      --help  Show help
      --version  Show version
      --yarn  Use yarn for installing
      --typescript  Create TypeScript project
      --yes   Pass --yes all for initializing process

    Examples
      # create textlint-rule-example directory and install
      $ create-textlint-rule example
      # install to current directory
      $ create-textlint-rule .
      # create textlint-rule-example directory is based on TypeScript
      $ create-textlint-rule example --typescript
`;

const getPackageInfo = async () => {
    const pkg = await readFile(new URL("../package.json", import.meta.url), "utf-8");
    return JSON.parse(pkg);
};

let cli;
try {
    cli = parseArgs({
        allowPositionals: true,
        options: {
            help: { type: "boolean", short: "h" },
            version: { type: "boolean", short: "v" },
            yarn: { type: "boolean" },
            typescript: { type: "boolean" },
            yes: { type: "boolean" }
        }
    });
} catch (error) {
    console.error(styleText("red", `✗ Error: ${error.message}`));
    console.log(HELP_TEXT);
    process.exit(1);
}

const { values: flags, positionals: input } = cli;
if (flags.version) {
    const pkg = await getPackageInfo();
    console.log(pkg.version);
} else if (input.length === 0 || flags.help) {
    console.log(HELP_TEXT);
} else {
    cliHandler(input[0], {
        yes: flags.yes,
        yarn: flags.yarn,
        typescript: flags.typescript,
        cwd: process.cwd()
    })
        .then(() => {
            process.exit(0);
        })
        .catch((error) => {
            console.log(styleText("red", `✗ Error: ${error.message}`));
            console.log();
            console.error(error);
            process.exit(1);
        });
}
