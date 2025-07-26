# HTML5 Slot Machine

Этот проект теперь использует **Vue 3 Composition API** и полностью написан на TypeScript. Кроме веб‑версии есть простой бот Telegram на базе [grammY](https://grammy.dev/).

## Запуск приложения

```bash
npm install
npm run dev
```

Производственную сборку можно получить командой `npm run build`.

## Телеграм‑бот

Для запуска бота требуется переменная окружения `BOT_TOKEN`:

```bash
BOT_TOKEN=<token> npm run bot
```

Бот имеет две команды: `/start` и `/spin`.
