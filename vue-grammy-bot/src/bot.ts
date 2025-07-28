import { Bot } from "grammy";

// Замените TOKEN на реальный токен телеграм-бота
const bot = new Bot<string>("TOKEN");

bot.command("start", (ctx) => ctx.reply("Бот запущен и готов!"));

bot.start();
