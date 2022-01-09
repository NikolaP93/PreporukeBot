// setup
import { Telegraf } from "telegraf";
import fetch from "node-fetch";
import config from "./config.js";

const bot = new Telegraf(config.telegram_token);

const url = `https://imdb-api.com/en/API/Search/${config.imdb_token}/`;

bot.start((ctx) => ctx.reply("Hello"));
bot.help((ctx) => ctx.reply("Help message"));

bot.on("text", (ctx) => {
  const userInput = ctx.message.text;

  if (userInput.toLowerCase().includes("#gledaj")) {
    const movie_name = userInput.toLowerCase().split("#gledaj")[1].trim();

    fetch(url + movie_name)
      .then((res) => res.json())
      .then((data) => {
        if (data.results[0]?.image) {
          ctx.reply(data.results[0].image);
        }
      });
  }
});

bot.launch();
