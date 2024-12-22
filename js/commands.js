const axios = require('axios');
const { api_url } = require('./config');
const { shutdown_computer } = require('./utilities');

// Aquí van todas las funciones relacionadas con los comandos del bot, excepto la de apagar


async function fetch_events(bot, chat_id) {
    try {
        const response = await axios.get(api_url);
        if (response.data && response.data.length > 0) {
            let eventos_list = 'Lista de eventos:\n\n';
            response.data.forEach(event => {
                eventos_list += `Title: ${event.title}\nDate: ${new Date(event.date).toLocaleDateString()}\nLocation: ${event.location}\nDescription: ${event.description}\n\n`;
            });
            bot.sendMessage(chat_id, eventos_list);
        } else {
            bot.sendMessage(chat_id, 'Actualmente no hay eventos disponibles.');
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chat_id, 'Error al conectar con la API: ' + error.message);
    }
}

async function fetch_event_by_id(bot, chat_id, event_id) {
    try {
        const response = await axios.get(`${api_url}/${event_id}`);
        if (response.data) {
            const event = response.data;
            const event_details = `Title: ${event.title}\nDate: ${new Date(event.date).toLocaleDateString()}\nLocation: ${event.location}\nDescription: ${event.description}`;
            bot.sendMessage(chat_id, event_details);
        } else {
            bot.sendMessage(chat_id, 'No se encontró el evento.');
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chat_id, 'Error al recuperar el evento: ' + error.message);
    }
}

module.exports = {
    fetch_events,
    fetch_event_by_id,
    shutdown_computer
};
