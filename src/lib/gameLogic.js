import chalk from "chalk";
import { select } from "@inquirer/prompts";

/* MAIN MENU */
export async function showMainMenu(gameState) {
  const action = await select({
    message: "Main Menu",
    choices: [
      { name: "Start Game", value: "start" },
      { name: "View Stats", value: "stats" },
      { name: "Reset Stats", value: "reset" },
      { name: "Quit", value: "quit" }
    ]
  });

  switch (action) {
    case "start":
      await startGame(gameState);
      break;

    case "stats":
      showStats(gameState);
      await pause();
      await showMainMenu(gameState);
      break;

    case "reset":
      resetGame(gameState);
      console.log(chalk.blue("Stats have been reset."));
      await showMainMenu(gameState);
      break;

    case "quit":
      console.log(chalk.green("Goodbye! 👋"));
      process.exit(0);
  }
}

/* GAMEPLAY */
async function startGame(gameState) {
  const choices = ["rock", "paper", "scissors"];

  const userChoice = await select({
    message: "Choose your weapon",
    choices: choices.map(choice => ({
      name: choice,
      value: choice
    }))
  });

  const computerChoice =
    choices[Math.floor(Math.random() * choices.length)];

  console.log(chalk.yellow(`Computer chose: ${computerChoice}`));

  const result = determineWinner(userChoice, computerChoice);
  updateStats(result, gameState);

  if (result === "win") console.log(chalk.green("You win! 🎉"));
  else if (result === "lose") console.log(chalk.red("You lose 😢"));
  else console.log(chalk.blue("It's a tie 🤝"));

  await pause();
  await showMainMenu(gameState);
}

/* GAME RULES */
function determineWinner(user, computer) {
  const rules = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
  };

  if (user === computer) return "tie";
  return rules[user] === computer ? "win" : "lose";
}

/* STATS */
function updateStats(result, gameState) {
  if (result === "win") gameState.stats.wins++;
  else if (result === "lose") gameState.stats.losses++;
  else gameState.stats.ties++;
}

function showStats(gameState) {
  console.log(chalk.blue("\n📊 Game Statistics"));
  console.log(chalk.green(`Wins: ${gameState.stats.wins}`));
  console.log(chalk.red(`Losses: ${gameState.stats.losses}`));
  console.log(chalk.yellow(`Ties: ${gameState.stats.ties}\n`));
}

function resetGame(gameState) {
  gameState.stats = { wins: 0, losses: 0, ties: 0 };
}

/* PAUSE HELPER */
async function pause() {
  await select({
    message: "Press Enter to continue",
    choices: [{ name: "Continue", value: true }]
  });
}