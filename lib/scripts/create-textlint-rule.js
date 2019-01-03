// MIT © 2016 azu
"use strict";
const spawn = require("cross-spawn-promise");
const path = require("path");
const rimraf = require("rimraf");
const chalk = require("chalk");

/**
 * @see https://github.com/textlint/textlint-rule-template
 * @param {string} projectName
 * @param {{
 *      yes: boolean
 *      yarn: boolean
 *      cwd: string
 * }} [options]
 * @returns {Promise}
 */
module.exports = function(projectName, options = {}) {
    const useYarn = options.yarn !== undefined;
    const useYes = options.yes !== undefined;
    const isInitInCurrentDir = projectName === ".";
    const ruleName = isInitInCurrentDir
                     ? path.dirname(projectName)
                     : `textlint-rule-${projectName.replace(/^textlint-rule-/, "")}`;
    if (isInitInCurrentDir && !/^textlint-rule-/.test(ruleName)) {
        throw new Error(`Current directory name should start with "textlint-rule-<rule-name>".`);
    }
    const ruleDir = isInitInCurrentDir ? options.cwd : path.join(options.cwd, ruleName);
    return spawn(`git`, [
        "clone", "--depth=1", "https://github.com/textlint/textlint-rule-template.git",
        isInitInCurrentDir ? "." : ruleName
    ], {
        stdio: "inherit"
    })
        .then(() => {
            if (!isInitInCurrentDir) {
                console.log(chalk.green(`cd ${ruleDir}`));
                process.chdir(ruleDir);
            }
        })
        .then(() => {
            const gitDir = path.join(ruleDir, ".git");
            rimraf.sync(gitDir);
        })
        .then(() => {
            const README = path.join(ruleDir, "README.md");
            rimraf.sync(README);
        })
        .then(() => {
            return spawn("git", ["init"], { stdio: "inherit" });
        })
        .then(() => {
            console.log(chalk.green(`Input information about your textlint rule`));
            return spawn("npm", ["init"].concat(useYes ? ["--yes"] : []), { stdio: "inherit" });
        })
        .then(() => {
            console.log(chalk.green(`Wait... Installing npm packages for development`));
            if (useYarn) {
                return spawn("yarn", ["install"], { stdio: "inherit" });
            } else {
                return spawn("npm", ["install"], { stdio: "inherit" });
            }
        })
        .then(() => {
            console.log(chalk.green(`Initialize your README!`));
            return spawn(`./node_modules/.bin/textlint-scripts`, ["init"], { stdio: "inherit" });
        });
};
