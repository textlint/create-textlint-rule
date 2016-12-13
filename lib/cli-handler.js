// MIT © 2016 azu
"use strict";
const chalk = require('chalk');
const createTextlintRule = require("./scripts/create-textlint-rule");
module.exports = function(projectName, flags) {
    const ruleName = `textlint-rule-${projectName.replace(/^textlint-rule-/, '')}`;
    return createTextlintRule(ruleName, flags).then(() => {
        console.log(chalk.green(`✔ Complete: Let's create textlint rule`));
    });
};