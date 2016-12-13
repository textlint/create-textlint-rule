#!/usr/bin/env node
'use strict';
const meow = require('meow');
const chalk = require('chalk');
const cliHandler = require('../lib/cli-handler');
const cli = meow(`
    Usage
      $ create-textlint-rule rule-name

    Options
      --help  Show help
      --yarn  Use yarn for installing

    Examples
      $ create-textlint-rule awesome-rule
`, {
    alias: {
        h: 'help'
    }
});
/*
 {
 input: ['unicorns'],
 flags: {rainbow: true},
 ...
 }
 */
if (cli.input.length === 0 || cli.flags.help) {
    cli.showHelp();
} else {
    cliHandler(cli.input[0], cli.flags).then(() => {
        process.exit(0);
    }).catch(error => {
        console.log(chalk.red(`✗ Error: ${error.message}`));
        console.log();
        console.error(error);
        process.exit(1);
    });
}
