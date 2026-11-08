import { rmSync } from "node:fs";
import path from "node:path";
import chalk from "chalk";
import crossSpawn from "cross-spawn";

/**
 * Spawn a command and resolve when it exits successfully.
 * @param {string} command
 * @param {string[]} args
 * @param {import("node:child_process").SpawnOptions} [options]
 * @returns {Promise<void>}
 */
const spawn = (command, args, options) => {
    return new Promise((resolve, reject) => {
        const child = crossSpawn(command, args, options);
        child.on("error", reject);
        child.on("close", (code, signal) => {
            if (code === 0) {
                resolve();
            } else {
                const reason = signal ? `signal ${signal}` : `exit code ${code}`;
                reject(new Error(`${command} ${args.join(" ")} failed with ${reason}`));
            }
        });
    });
};
const removeSync = (target) => rmSync(target, { recursive: true, force: true });

/**
 * @see https://github.com/textlint/textlint-rule-template
 * @param {string} projectName
 * @param {{
 *      yes: boolean,
 *      yarn: boolean,
 *      typescript: boolean,
 *      cwd: string
 * }} [options]
 * @returns {Promise}
 */
export default function (projectName, options = {}) {
    const useYarn = options.yarn !== undefined;
    const useYes = options.yes !== undefined;
    const useTypeScript = options.typescript !== undefined;
    const isInitInCurrentDir = projectName === ".";
    const ruleName = isInitInCurrentDir
        ? path.basename(options.cwd)
        : `textlint-rule-${projectName.replace(/^textlint-rule-/, "")}`;
    if (isInitInCurrentDir && !/^textlint-rule-/.test(ruleName)) {
        throw new Error(`Current directory name should start with "textlint-rule-<rule-name>": ${ruleName}.`);
    }
    const ruleDir = isInitInCurrentDir ? options.cwd : path.join(options.cwd, ruleName);
    const gitRepositoryUrl = useTypeScript
        ? "https://github.com/textlint/textlint-rule-template-ts.git"
        : "https://github.com/textlint/textlint-rule-template.git";
    return spawn(`git`, ["clone", "--depth=1", gitRepositoryUrl, isInitInCurrentDir ? "." : ruleName], {
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
            removeSync(gitDir);
        })
        .then(() => {
            const githubDir = path.join(ruleDir, ".github");
            removeSync(githubDir);
        })
        .then(() => {
            const README = path.join(ruleDir, "README.md");
            removeSync(README);
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
}
