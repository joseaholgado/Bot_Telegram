// Función para procesar mensajes nuevos
const processMessage = (messageText) => {
    return "Modificado: " + messageText;
};

// Función para enviar mensaje a un canal de Telegram
const sendMessageToTelegramChannel = async (channelId, message) => {
    const botToken = '';
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: channelId,
                text: message
            })
        });

        const data = await response.json();
        if (!data.ok) {
            console.error("Error al enviar mensaje: ", data);
        } else {
            console.log("Mensaje enviado con éxito");
        }
    } catch (error) {
        console.error("Error en la solicitud de envío: ", error);
    }
};

// Callback para observar cambios en el DOM
const callback = function(mutationsList, observer) {
    console.log("Mutations observed: ", mutationsList);
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    console.log("Node added: ", node);
                    // Asegurarse de que el nodo es un mensaje
                    if (node.classList && node.classList.contains('message') || node.querySelector('.message')) {
                        const messageNode = node.classList.contains('message') ? node : node.querySelector('.message');
                        const messageText = messageNode.innerText;
                        console.log("Nuevo mensaje: ", messageText);
                        const modifiedMessage = processMessage(messageText);
                        sendMessageToTelegramChannel('1163001266', modifiedMessage);
                    }
                }
            });
        }
    }
};

// Selecciona el nodo para observar
const targetNode = document.body;
const config = { childList: true, subtree: true };

// Crea una instancia de MutationObserver y comienza a observar
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

console.log("Observer configurado y ejecutándose");
