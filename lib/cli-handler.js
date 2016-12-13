// MIT © 2016 azu
"use strict";
const chalk = require('chalk');
const createTextlintRule = require("./scripts/create-textlint-rule");
module.exports = function(projectName, flags) {
    const ruleName = `textlint-rule-${projectName.replace(/^textlint-rule-/, '')}`;
    createTextlintRule(ruleName, flags).then(() => {
        console.log(chalk.green(`✔ Complete: Let's create textlint rule`));
    }).catch(error => {
        console.log(chalk.red(`✗ Error: ${error.message}`));
        console.log();
        console.error(error);
    });
};