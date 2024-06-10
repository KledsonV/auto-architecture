import { execSync } from "child_process";
import readline from "readline";
import fs from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";
import path from "path";

export async function updateDependencies() {
  const updates = await checkForUpdates();
  await loadingBar(25, 25);

  if (updates.length === 0) {
    process.stdout.write(
      chalk.green.dim.bold(" All dependencies are updated!\n\n")
    );
    return true;
  }

  process.stdout.write(chalk.red.dim.bold(" Outdated dependencies found:\n"));
  updates.forEach(({ packageName, currentVersion, latestVersion }) => {
    process.stdout.write(
      chalk.red.dim.bold(
        ` - ${packageName}: ${currentVersion}  →  ${latestVersion}\n\n`
      )
    );
  });

  const answer = await promptUser(
    chalk.cyan.dim.bold(
      " Do you want to update the dependency to the latest version? (Y/n): "
    )
  );

  if (answer.toLowerCase() === "y") {
    const packageJson = await readPackageJson();

    updates.forEach(() => {
      packageJson.version = updates[0].latestVersion;
    });

    let findPackage = findPackageJson();
    fs.writeFileSync(findPackage, JSON.stringify(packageJson, null, 2));
    process.stdout.write(
      chalk.green.dim.bold(
        '\n Updated dependencies in package.json. Run "npm install" to install the new versions.\n\n'
      )
    );
  } else {
    process.stdout.write(
      chalk.red.dim.bold(" Dependency update canceled.\n\n")
    );
  }
}

const findPackageJson = () => {
  var currentDir = fileURLToPath(import.meta.url);
  while (currentDir !== path.parse(currentDir).root) {
    const packageJsonPath = path.join(currentDir, "package.json");
    if (fs.existsSync(packageJsonPath)) {
      return packageJsonPath;
    }
    currentDir = path.dirname(currentDir);
  }
};

const readPackageJson = async () => {
  try {
    const findPackage = findPackageJson();
    const packageJson = fs.readFileSync(findPackage, "utf-8");
    return JSON.parse(packageJson);
  } catch (error) {
    return error;
  }
};

const getLatestVersion = async (packageName) => {
  try {
    const version = execSync(`npm view ${packageName} version`, {
      encoding: "utf8",
    }).trim();
    return version;
  } catch (error) {
    console.error(`Error getting version of ${packageName}:`, error);
    return null;
  }
};

const checkForUpdates = async () => {
  const packageJson = await readPackageJson();
  const currentVersion = packageJson.version;
  const packageName = packageJson.name;
  const updates = [];

  const latestVersion = await getLatestVersion(packageJson.name);
  if (latestVersion && currentVersion !== latestVersion) {
    updates.push({ packageName, currentVersion, latestVersion });
  }

  return updates;
};

const promptUser = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    })
  );
};

const loadingBar = async (total, ms) => {
  let bar = "";
  for (let i = 0; i < total; i++) {
    bar += "#";
    console.clear();
    const percentage = Math.floor(((i + 1) / total) * 100);
    process.stdout.write(chalk.green.dim.bold(`\n Checking for updates...\n`));
    process.stdout.write(
      chalk.cyan.dim.bold(` [${bar.padEnd(total)}]` + " " + percentage + "%\n")
    );
    await sleep(ms);
  }
  process.stdout.write("\n");
};

const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
