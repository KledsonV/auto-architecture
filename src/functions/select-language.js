import global from "#variables/.variables-global.js";
import chalk from "chalk";
import ora from "ora";
import readline from "node:readline";

export function SelectLanguage() {
  const options = ["JS ( JavaScript )", "TS ( TypeScript ) ( In Dev... )"];
  const spinner = ora(chalk.bold.cyan("Waiting..."));
  const numOptions = options.length;
  let selectedOption = 0;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const clearConsole = () => {
    console.clear();
  };

  const printOptions = () => {
    clearConsole();
    process.stdo;
    console.log(chalk.bold.cyan("Define the language of architecture: "));
    console.log("");

    options.forEach((option, index) => {
      if (index === 0) {
        console.log(
          chalk.bold.white("    > ") +
            chalk.bold.cyan(global.architectureName) +
            chalk.bold.cyan(" + " + option) +
            chalk.bold.white(" < ")
        );
      } else {
        console.log(chalk.dim.red("    " + global.architectureName + " " + option));
      }
    });
    console.log("");
    console.log("");
  };

  const handleKeypress = (key) => {
    switch (key) {
      // case "\u001B[A":
      //   selectedOption = (selectedOption - 1 + numOptions) % numOptions;
      //   printOptions();
      //   break;
      // case "\u001B[B":
      //   selectedOption = (selectedOption + 1) % numOptions;
      //   printOptions();
      //   break;
      case "\r":
        rl.close();
        break;
    }
  };

  process.on("SIGINT", () => {
    rl.close();
    global.isClosed = true;
    return 0;
  });
  process.on("SIGTERM", () => {
    global.isClosed = true;
    rl.close();
    return 0;
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
  spinner.start();
  spinner.spinner = "simpleDotsScrolling";

  printOptions();

  process.stdin.on("data", (key) => {
    handleKeypress(key.toString());
  });

  return new Promise((resolve) => {
    rl.on("close", () => {
      spinner.stop();
      clearConsole();
      process.stdin.setRawMode(false);
      resolve(options[selectedOption]);
    });
  });
}
