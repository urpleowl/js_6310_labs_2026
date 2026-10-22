import {
  addHabit, checkHabit, getProgress, getUserHabits,
  getUserState, setUserState
} from '../utils/storage.js';

const handleMessage = async (text, userId, reply) => {
  const trimmedText = text.trim();
  const state = getUserState(userId);

  if (trimmedText === '/start') {
    setUserState(userId, 'IDLE', {});
    return reply('Привет! Я HabitBot. Используйте /add_habit, /check или /progress.');
  }

  if (trimmedText === '/add_habit') {
    setUserState(userId, 'WAITING_FOR_NAME', {});
    return reply('Введите название привычки:');
  }

  if (trimmedText === '/check') {
    const habits = getUserHabits(userId);
    if (habits.length === 0) {
      setUserState(userId, 'IDLE', {});
      return reply('У вас пока нет привычек. Добавьте через /add_habit.');
    }
    setUserState(userId, 'WAITING_FOR_CHECK_NAME', {});
    return reply(`Какую привычку отмечаем? Доступны: ${habits.join(', ')}`);
  }

  if (trimmedText === '/progress') {
    const habits = getUserHabits(userId);
    if (habits.length === 0) return reply('Нет привычек для отображения прогресса.');
    setUserState(userId, 'WAITING_FOR_PROGRESS_NAME', {});
    return reply(`Прогресс какой привычки показать? (${habits.join(', ')})`);
  }

  if (state.step === 'WAITING_FOR_NAME') {
    if (!trimmedText || trimmedText.startsWith('/')) {
      return reply('Название не должно начинаться с /. Введите обычное название привычки:');
    }
    setUserState(userId, 'WAITING_FOR_FREQUENCY', { tempHabitName: trimmedText });
    return reply('Выберите периодичность, отправив число:\n1 - Ежедневно\n2 - Несколько раз в неделю');
  }

  if (state.step === 'WAITING_FOR_FREQUENCY') {
    if (trimmedText !== '1' && trimmedText !== '2') {
      return reply('Пожалуйста, отправьте 1 или 2.');
    }
    const freq = trimmedText === '1' ? 'daily' : 'weekly';
    const added = addHabit(userId, state.data.tempHabitName, freq);
    setUserState(userId, 'IDLE', {});
    if (!added) {
      return reply('Не удалось добавить привычку. Название не должно начинаться с /.');
    }
    return reply(`✅ Привычка "${state.data.tempHabitName}" добавлена!`);
  }

  if (state.step === 'WAITING_FOR_CHECK_NAME') {
    const success = checkHabit(userId, trimmedText);
    setUserState(userId, 'IDLE', {});
    if (success) return reply(`✅ Привычка "${trimmedText}" отмечена на сегодня!`);
    return reply('❌ Привычка не найдена. Проверьте название или добавьте новую.');
  }

  if (state.step === 'WAITING_FOR_PROGRESS_NAME') {
    const data = getProgress(userId, trimmedText);
    setUserState(userId, 'IDLE', {});
    if (!data) return reply('Привычка не найдена.');

    const totalDays = data.history.length;
    const bar = '█'.repeat(Math.min(totalDays, 10)) + '░'.repeat(Math.max(0, 10 - totalDays));
    return reply(
      `📊 Прогресс: "${trimmedText}"\n` +
      `Периодичность: ${data.frequency}\n` +
      `Выполнено дней: ${totalDays}\n` +
      `Прогресс: [${bar}] ${Math.min(totalDays * 10, 100)}%\n` +
      `🔥 Текущий стрик: ${data.streak} дн.\n` +
      `Выполнено сегодня: ${data.isDoneToday ? 'Да ✅' : 'Нет ❌'}`
    );
  }

  return;
};

export default handleMessage;
