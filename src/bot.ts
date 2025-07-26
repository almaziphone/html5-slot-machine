import { Bot } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) throw new Error("BOT_TOKEN missing");

const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("Добро пожаловать в слот-машину!"));

export default bot;
