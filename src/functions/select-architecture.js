import global from "#variables/.variables-global.js";
import readline from "readline";
import chalk from "chalk";
import ora from "ora";

export const SelectArchitecture = () => {
  const options = ["MVC", "Clean Architecture ( In Dev... )"];
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
    console.log(chalk.bold.cyan("Define the type of architecture: "));
    console.log("");

    options.forEach((option, index) => {
      if (index === 0 /*selectedOption */) {
        console.log(
          chalk.bold.white("    > ") + chalk.bold.cyan(option)
        );
      } else {
        console.log(chalk.dim.bold.red("    " + option));
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

  process.stdin.setRawMode(true);
  process.stdin.resume();
  spinner.start();
  spinner.spinner = "simpleDotsScrolling";

  printOptions();

  process.stdin.on("data", (key) => {
    if (key == "\u001B[A" || key == "\u001B[B" || key == "\r")
      handleKeypress(key.toString());
  });

  process.on("SIGINT", () => {
    console.log(
      chalk.dim.bold.red(" X ") + chalk.dim.bold.cyan("Operation Canceled")
    );
    rl.close();
    global.isClosed = true;
    return 0;
  });
  process.on("SIGTERM", () => {
    global.isClosed = true;
    rl.close();
    return 0;
  });

  return new Promise((resolve) => {
    rl.on("close", () => {
      spinner.stop();
      process.stdin.setRawMode(false);
      process.stdin.removeListener("data", handleKeypress);
      resolve(options[selectedOption]);
    });
  });
};
