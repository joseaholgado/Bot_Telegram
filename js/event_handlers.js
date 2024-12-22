const { fetch_events, fetch_event_by_id, shutdown_computer } = require('./commands');

function handle_hi(bot, msg) {
    const chat_id = msg.chat.id;
    bot.sendMessage(chat_id, '¡Hola! ¿Cómo puedo ayudarte hoy?');
}

function handle_events(bot, msg) {
    const chat_id = msg.chat.id;
    fetch_events(bot, chat_id);
}

function handle_event(bot, msg, match) {
    const chat_id = msg.chat.id;
    const event_id = match[1];
    fetch_event_by_id(bot, chat_id, event_id);
}

function handle_shutdown(bot, msg, match) {
    const chat_id = msg.chat.id;
    const secs = match[1];
    if (chat_id !== 1163001266) { // Verifica que el ID del chat sea autorizado
        bot.sendMessage(chat_id, "Intento no autorizado de apagado.");
        return;
    }
    bot.sendMessage(chat_id, `Tu computadora se apagará en ${secs} segundos.`);
    setTimeout(() => {
        shutdown_computer();
    }, secs * 1000);
}

function handle_message(bot, msg) {
    if (!msg.text.startsWith('/')) {
        const chat_id = msg.chat.id;
        bot.sendMessage(chat_id, 'Hola y bienvenido');
    }
}

module.exports = {
    handle_hi,
    handle_events,
    handle_event,
    handle_shutdown,
    handle_message
};
