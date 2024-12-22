const TelegramBot = require('node-telegram-bot-api');
const { handle_hi, handle_events, handle_event, handle_shutdown, handle_message } = require('./event_handlers');
const { token } = require('./config');

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/hi$/, (msg) => handle_hi(bot, msg));
bot.onText(/\/events$/, (msg) => handle_events(bot, msg));
bot.onText(/\/event\s+([a-zA-Z0-9]+)/, (msg, match) => handle_event(bot, msg, match));
bot.onText(/\/shutdown (\d+)/, (msg, match) => handle_shutdown(bot, msg, match));
bot.on('message', (msg) => handle_message(bot, msg));
