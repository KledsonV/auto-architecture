import global from "#variables/.variables-global.js";
import { SelectArchitecture } from "#modules/.select-architecture.js";
import { SelectLanguage } from "#modules/.select-language.js";
import { createMVCJS } from "#architectureMVCJS/.create-MVC_JS.js";
import readline from "node:readline";
import chalk from "chalk";

export const CreateGetNameProject = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const initialMessage =
    chalk.red(" ?") +
    chalk.cyan.dim.bold(" Project-Name: ") +
    chalk.gray.dim.bold("ProjectName ");

  rl.question(initialMessage, async (input) => {
    global.projectName = input || "ProjectName";
    readline.moveCursor(process.stdout, 0, -1);
    readline.clearLine(process.stdout, 1);
    process.stdout.write(
      chalk.cyan.dim.green(" V ") +
      chalk.cyan.dim.cyan("Project-Name: ") +
        global.projectName +
        "\n"
    );
    rl.close();

    await selectArchitecture();
  });

  return 1;
};

async function selectArchitecture() {
  const resultArchitecture = await SelectArchitecture();
  if (global.isClosed) return 0;

  global.architectureName = resultArchitecture;

  const resultLanguage = await SelectLanguage();
  if (global.isClosed) return 0;

  global.languageName = resultLanguage;

  if (
    global.architectureName === "MVC" &&
    global.languageName === "JS ( JavaScript )"
  ) {
    createMVCJS();
    console.log("");
    console.log("");
    console.log(chalk.green.bold("   Structure generated successfully!"));
    console.log("");
    console.log("");
    console.log(chalk.cyan.bold("   cd " + global.projectName));
    console.log(chalk.cyan.bold("   npm install"));
    console.log(chalk.cyan.bold("   npm run start"));
    console.log("");
    console.log("");
    console.log(
      chalk.cyan.bold(
        "   npm run start:dev   " + chalk.dim.gray("( To run in dev mode )")
      )
    );
    console.log("");
    console.log("");
    console.log("");
  }

  return 1;
}
