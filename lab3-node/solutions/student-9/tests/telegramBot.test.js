import { describe, it, expect, jest, beforeEach, afterEach } from '@jest/globals';

const mockTelegrafInstance = {
  catch: jest.fn(),
  on: jest.fn(),
  launch: jest.fn(),
  stop: jest.fn(),
};

jest.unstable_mockModule('telegraf', () => ({
  Telegraf: jest.fn().mockImplementation(() => mockTelegrafInstance),
}));

describe('Telegram Bot Module', () => {
  let originalEnv;
  let originalProcessOnce;

  beforeEach(() => {
    originalEnv = process.env.TELEGRAM_BOT_TOKEN;
    originalProcessOnce = process.once;
    process.once = jest.fn();
    jest.clearAllMocks();
  });

  afterEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = originalEnv;
    process.once = originalProcessOnce;
    jest.resetModules();
  });

  it('should skip bot creation when token is missing', async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    const { default: runTelegramBot } = await import('../src/bots/telegramBot.js');
    runTelegramBot();
    
    expect(logSpy).toHaveBeenCalledWith('TELEGRAM_BOT_TOKEN не задан — Telegram-бот пропущен');
    logSpy.mockRestore();
  });

  it('should initialize, launch bot, and cover all callbacks', async () => {
    process.env.TELEGRAM_BOT_TOKEN = 'fake-test-token';
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    const { default: runTelegramBot } = await import('../src/bots/telegramBot.js');
    const { Telegraf } = await import('telegraf');
    
    runTelegramBot();
    
    expect(Telegraf).toHaveBeenCalledWith('fake-test-token');
    expect(mockTelegrafInstance.catch).toHaveBeenCalled();
    expect(mockTelegrafInstance.on).toHaveBeenCalledWith('text', expect.any(Function));
    expect(mockTelegrafInstance.launch).toHaveBeenCalled();
    expect(process.once).toHaveBeenCalledWith('SIGINT', expect.any(Function));
    expect(process.once).toHaveBeenCalledWith('SIGTERM', expect.any(Function));
    expect(logSpy).toHaveBeenCalledWith('Telegram-бот (Telegraf) запущен...');

    const catchHandler = mockTelegrafInstance.catch.mock.calls[0][0];
    const mockReplyForCatch = jest.fn();
    catchHandler(new Error('Test error'), { from: { id: 1 }, reply: mockReplyForCatch });
    expect(mockReplyForCatch).toHaveBeenCalledWith('Произошла ошибка. Попробуйте позже.');

    const textHandler = mockTelegrafInstance.on.mock.calls[0][1];
    const mockReplyForText = jest.fn();
    await textHandler({ message: { text: '/start' }, from: { id: 123 }, reply: mockReplyForText });
    expect(mockReplyForText).toHaveBeenCalled();

    const sigintHandler = process.once.mock.calls.find(c => c[0] === 'SIGINT')[1];
    sigintHandler();
    expect(mockTelegrafInstance.stop).toHaveBeenCalledWith('SIGINT');

    const sigtermHandler = process.once.mock.calls.find(c => c[0] === 'SIGTERM')[1];
    sigtermHandler();
    expect(mockTelegrafInstance.stop).toHaveBeenCalledWith('SIGTERM');

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});