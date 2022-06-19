// MIT © 2016 azu
"use strict";
const path = require("path");
const chalk = require("chalk");
const createTextlintRule = require("./scripts/create-textlint-rule");
/**
 * @param {string} projectName
 * @param {{
 *      yes: boolean
 *      yarn: boolean
 *      cwd: string
 *  }} options
 * @returns {Promise<any | never>}
 */
module.exports = function (projectName, options = {}) {
    return createTextlintRule(projectName, options).then(() => {
        console.log(chalk.green(`✔ Complete: Let's write textlint rule`));
    });
};
