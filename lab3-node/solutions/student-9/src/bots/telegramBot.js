import { Telegraf } from 'telegraf';
import handleMessage from '../handlers/messageHandler.js';

const runTelegramBot = () => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    console.log('TELEGRAM_BOT_TOKEN не задан — Telegram-бот пропущен');
    return;
  }

  const bot = new Telegraf(token);

  // Глобальная обработка ошибок (бот не упадет)
  bot.catch((err, ctx) => {
    console.error(`Ошибка для пользователя ${ctx.from?.id}:`, err);
    ctx.reply('Произошла ошибка. Попробуйте позже.');
  });

  // Обработка всех текстовых сообщений через наш FSM-обработчик
  const seenUpdates = new Set();

  bot.on('text', async (ctx) => {
    try {
      const updateId = ctx.update?.update_id;
      if (updateId != null) {
        if (seenUpdates.has(updateId)) return;
        seenUpdates.add(updateId);
        if (seenUpdates.size > 500) seenUpdates.delete(seenUpdates.values().next().value);
      }
      if (ctx.chat?.type && ctx.chat.type !== 'private') return;
      if (!ctx.message?.text || !ctx.from?.id) return;
      await handleMessage(ctx.message.text, ctx.from.id, (text) => ctx.reply(text));
    } catch (error) {
      console.error('Ошибка в обработчике сообщений:', error);
      ctx.reply('Произошла внутренняя ошибка.');
    }
  });

  console.log('Telegram-бот (Telegraf) запущен...');
  bot.launch({ dropPendingUpdates: true });

  // Корректное завершение работы
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
  process.once('SIGUSR2', () => bot.stop('SIGUSR2'));
};

export default runTelegramBot;