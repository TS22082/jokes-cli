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
          axios.get("https://api.jokes.one/jod").then(randomResponse => {
            console.log(
              randomResponse.data.contents.jokes[0].joke.text.magenta
            );
            startScreen();
          });
          break;
        case "Search":
          search();
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

function search() {
  inquirer
    .prompt([
      {
        type: "prompt",
        message: "Enter something to search",
        name: "search"
      }
    ])
    .then(searchResponse => {
      axios
        .get(
          `https://icanhazdadjoke.com/search?term=${searchResponse.search}`,
          {
            headers: {
              accept: "application/json"
            },
            data: {}
          }
        )
        .then(searchResponse => {
          const { results } = searchResponse.data;

          results.forEach((item, index) => {
            if (index % 2 === 0) {
              console.log(item.joke.magenta);
            } else {
              console.log(item.joke.cyan);
            }
          });
          console.log("\n-----------------\n");
          startScreen();
        });
    });
}

startScreen();
