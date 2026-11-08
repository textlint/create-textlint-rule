import { rmSync } from "node:fs";
import path from "node:path";
import { spawn as nodeSpawn } from "node:child_process";
import { styleText } from "node:util";

const isWindows = process.platform === "win32";
/**
 * Spawn a command and resolve when it exits successfully.
 * @param {string} command
 * @param {string[]} args
 * @param {{ useShellOnWindows?: boolean }} [options]
 * useShellOnWindows: npm/yarn and node_modules/.bin/* are `.cmd` files on Windows, and they can only be executed via a shell.
 * Pass it only for commands whose args are fixed strings, not user input.
 * @returns {Promise<void>}
 */
const spawn = (command, args, { useShellOnWindows = false } = {}) => {
    return new Promise((resolve, reject) => {
        const child = nodeSpawn(command, args, {
            stdio: "inherit",
            shell: isWindows && useShellOnWindows
        });
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
    return spawn(`git`, ["clone", "--depth=1", gitRepositoryUrl, isInitInCurrentDir ? "." : ruleName])
        .then(() => {
            if (!isInitInCurrentDir) {
                console.log(styleText("green", `cd ${ruleDir}`));
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
            return spawn("git", ["init"]);
        })
        .then(() => {
            console.log(styleText("green", `Input information about your textlint rule`));
            return spawn("npm", ["init"].concat(useYes ? ["--yes"] : []), { useShellOnWindows: true });
        })
        .then(() => {
            console.log(styleText("green", `Wait... Installing npm packages for development`));
            if (useYarn) {
                return spawn("yarn", ["install"], { useShellOnWindows: true });
            } else {
                return spawn("npm", ["install"], { useShellOnWindows: true });
            }
        })
        .then(() => {
            console.log(styleText("green", `Initialize your README!`));
            return spawn(path.join("node_modules", ".bin", "textlint-scripts"), ["init"], { useShellOnWindows: true });
        });
}
