
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '🌠 ¿Qué comando quieres sugerir?', m);
    if (text.length < 5) return conn.reply(m.chat, '🌠 La sugerencia debe ser más de 5 caracteres.', m);
    if (text.length > 1000) return conn.reply(m.chat, '🌠 Máximo de la sugerencia es de 1000 caracteres.', m);

    const teks = `🌠 Sugerencia de nuevo comando del usuario *${m.sender}*\n\n🛡️ Han sugerido un comando:\n> ${text}`;

    const channelChatId = '120363419364337473@newsletter';
    const creatorsChatId = "51941658192"; 

    try {
        const jidDecoded = (0, WABinary_1.jidDecode)(m.sender);
        if (!jidDecoded || !jidDecoded.user) {
            throw new Error('JID inválido o no se pudo decodificar.');
        }

        // Se asegura que m.quoted.text esté definido antes de usarlo
        const replyText = m.quoted ? teks + '\n' + (m.quoted.text || '') : teks;

        await conn.reply(channelChatId, replyText, m, { mentions: conn.parseMention(teks) });
        await conn.reply(creatorsChatId, teks, m, { mentions: conn.parseMention(teks) });

        m.reply('🌠 La sugerencia se envió al Staff De aamon y a los creadores.');
    } catch (error) {
        console.error('Error al enviar la sugerencia:', error);
        m.reply('❌ Ocurrió un error al enviar tu sugerencia. Por favor intenta nuevamente.');
    }
}

handler.help = ['sugerencia2'];
handler.tags = ['owner'];
handler.command = ['sugerencia2', 'sugerir2', 'aamonsug2'];
handler.group = true;

export default handler;