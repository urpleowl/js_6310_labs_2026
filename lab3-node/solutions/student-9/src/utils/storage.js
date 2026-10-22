import fs from 'fs';
import path from 'path';

const DB_FILE = process.env.TEST_DB_FILE
  || path.join(process.cwd(), 'habits.json');

const loadDB = () => {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    }
  } catch (e) {
    console.error('Ошибка чтения базы:', e);
  }
  return {};
};

const saveDB = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Ошибка записи базы:', e);
  }
};

export const getUserState = (userId) => {
  const db = loadDB();
  if (!db[userId]) db[userId] = {};
  if (!db[userId]._state) db[userId]._state = { step: 'IDLE', data: {} };
  return db[userId]._state;
};

export const setUserState = (userId, step, data) => {
  const db = loadDB();
  if (!db[userId]) db[userId] = {};
  db[userId]._state = { step, data };
  saveDB(db);
};

export const addHabit = (userId, habitName, frequency) => {
  if (!habitName || typeof habitName !== 'string' || habitName.startsWith('/')) {
    return false;
  }
  const db = loadDB();
  if (!db[userId]) db[userId] = {};
  db[userId][habitName] = {
    frequency,
    history: [],
    createdAt: new Date().toISOString()
  };
  saveDB(db);
  return true;
};

export const checkHabit = (userId, habitName) => {
  const db = loadDB();
  if (!db[userId] || !db[userId][habitName]) return false;

  const today = new Date().toISOString().split('T')[0];
  if (!db[userId][habitName].history.includes(today)) {
    db[userId][habitName].history.push(today);
    saveDB(db);
  }
  return true;
};

export const getProgress = (userId, habitName) => {
  const db = loadDB();
  if (!db[userId] || !db[userId][habitName]) return null;

  const history = db[userId][habitName].history.sort();
  const today = new Date().toISOString().split('T')[0];
  const isDoneToday = history.includes(today);

  let streak = 0;
  const checkDate = new Date();
  if (!isDoneToday) checkDate.setDate(checkDate.getDate() - 1);

  while (true) {
    const dateStr = checkDate.toISOString().split('T')[0];
    if (history.includes(dateStr)) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return { history, isDoneToday, streak, frequency: db[userId][habitName].frequency };
};

export const getUserHabits = (userId) => {
  const db = loadDB();
  return db[userId]
    ? Object.keys(db[userId]).filter(k => k !== '_state' && !k.startsWith('/'))
    : [];
};
