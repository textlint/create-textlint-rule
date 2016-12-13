// MIT © 2016 azu
"use strict";
const spawn = require('cross-spawn-promise');
const path = require("path");
const rimraf = require("rimraf");
const chalk = require('chalk');

/**
 * @see https://github.com/textlint/textlint-rule-template
 * @param {string} ruleName
 * @param {Object} [options]
 * @returns {Promise}
 */
module.exports = function(ruleName, options = {}) {
    const useYarn = options.yarn !== undefined;
    const cwd = process.cwd();
    const ruleDir = path.join(cwd, ruleName);
    return spawn(`git`, [
        "clone",
        "--depth=1",
        "https://github.com/textlint/textlint-rule-template.git",
        ruleName
    ], {stdio: 'inherit'}).then(() => {
        console.log(chalk.green(`cd ${ruleDir}`));
        process.chdir(ruleDir);
    }).then(() => {
        const gitDir = path.join(ruleDir, ".git");
        rimraf.sync(gitDir)
    }).then(() => {
        const README = path.join(ruleDir, "README.md");
        rimraf.sync(README);
    }).then(() => {
        return spawn("git", [
            "init"
        ], {stdio: 'inherit'});
    }).then(() => {
        console.log(chalk.green(`Input information about your textlint rule`));
        return spawn("npm",
            ["init"],
            {stdio: 'inherit'});
    }).then(() => {
        console.log(chalk.green(`Wait... Installing npm packages for development`));
        if (useYarn) {
            return spawn("yarn",
                [
                    "install"
                ],
                {stdio: 'inherit'});

        } else {
            return spawn("npm",
                [
                    "install"
                ],
                {stdio: 'inherit'});

        }
    }).then(() => {
        console.log(chalk.green(`Setup your README!`));
        return spawn(`./node_modules/.bin/textlint-scripts`, [
            "init"
        ], {stdio: 'inherit'});
    });
};