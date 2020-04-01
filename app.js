const inquirer = require("inquirer");
const axios = require("axios");
const colors = require("colors");

function startScreen() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: ["Random", "Search", "Choose Category", "Quit"],
        name: "option"
      }
    ])
    .then(inquirerResponse => {
      switch (inquirerResponse.option) {
        case "Random":
          axios.get("https://api.jokes.one/jod").then(res => {
            console.log(res.data.contents.jokes[0].joke.text.magenta);
            startScreen();
          });
          break;
        case "Search":
          break;
        case "Choose Category":
          break;
        case "Quit":
          break;
        default:
          process.exit();
      }
    });
}

startScreen();
