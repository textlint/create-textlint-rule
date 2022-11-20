import chalk from "chalk";
import createTextlintRule from "./scripts/create-textlint-rule.js";

/**
 * @param {string} projectName
 * @param {{
 *      yes: boolean,
 *      yarn: boolean,
 *      cwd: string
 *  }} options
 * @returns {Promise<any | never>}
 */
export default function (projectName, options = {}) {
    return createTextlintRule(projectName, options).then(() => {
        console.log(chalk.green(`✔ Complete: Let's write textlint rule`));
    });
}
