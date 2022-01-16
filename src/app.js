// setup
import { Telegraf } from "telegraf";
import fetch from "node-fetch";
import config from "./config.js";

const bot = new Telegraf(config.telegram_token);

const movies_url = `https://imdb-api.com/en/API/Search/${config.imdb_token}/`;
const books_url = "https://www.googleapis.com/books/v1/volumes?q=";

bot.start((ctx) => ctx.reply("Hello"));
bot.help((ctx) => ctx.reply("Help message"));

bot.on("text", (ctx) => {
  const userInput = ctx.message.text.toLowerCase();

  if (userInput.toLowerCase().includes("#gledaj")) {
    const movie_name = userInput.split("#gledaj")[1].trim();

    fetch(movies_url + movie_name)
      .then((res) => res.json())
      .then((data) => {
        if (data.results[0]?.image) {
          ctx.reply(data.results[0].image);
        }
      })
      .catch((err) => {
        ctx.reply("No movie found");
      });
  }

  if (userInput.toLowerCase().includes("#citaj")) {
    const book_name = userInput.split("#citaj")[1].trim();

    fetch(books_url + book_name)
      .then((res) => res.json())
      .then((data) => {
        ctx.reply(data.items[0].volumeInfo.imageLinks.thumbnail);
        ctx.reply(data.items[0].volumeInfo.description);
      })
      .catch((err) => {
        ctx.reply("No book found");
      });
  }
});

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});

bot.launch();
