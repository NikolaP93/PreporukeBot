// config.js
import dotenv from "dotenv";

dotenv.config();

export default {
  imdb_token: process.env.IMDB_TOKEN,
  telegram_token: process.env.BOT_TOKEN,
};
