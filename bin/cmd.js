#!/usr/bin/env node
"use strict";
const meow = require("meow");
const chalk = require("chalk");
const updateNotifier = require("update-notifier");
const pkg = require("../package.json");
const cliHandler = require("../lib/cli-handler");
const cli = meow(
    `
    Usage
      $ create-textlint-rule rule-name

    Options
      --help  Show help
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
`,
    {
        alias: {
            h: "help"
        }
    }
);
/*
 {
 input: ['unicorns'],
 flags: {rainbow: true},
 ...
 }
 */
updateNotifier({
    pkg: pkg,
    updateCheckInterval: 1000 * 60 * 60 * 24 * 7
}).notify();

if (cli.input.length === 0 || cli.flags.help) {
    cli.showHelp();
} else {
    cliHandler(cli.input[0], {
        yes: cli.flags.yes,
        yarn: cli.flags.yarn,
        typescript: cli.flags.typescript,
        cwd: process.cwd()
    })
        .then(() => {
            process.exit(0);
        })
        .catch((error) => {
            console.log(chalk.red(`✗ Error: ${error.message}`));
            console.log();
            console.error(error);
            process.exit(1);
        });
}
