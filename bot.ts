import { Bot } from "grammy";

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN environment variable is required");
}

const bot = new Bot(token);

const symbols = ["🍒", "🍋", "🍊", "⭐", "7️⃣"];

function spin(): string[] {
  return Array.from(
    { length: 3 },
    () => symbols[Math.floor(Math.random() * symbols.length)],
  );
}

bot.command("start", (ctx) =>
  ctx.reply("Давай сыграем в слот! Используй /spin"),
);

bot.command("spin", (ctx) => {
  const result = spin();
  const line = result.join(" ");
  ctx.reply(`🎰 ${line}`);
});

bot.start();
