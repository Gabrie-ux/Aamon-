let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, '🌠 ¿Qué comando quieres sugerir?', m);
    if (text.length < 5) return conn.reply(m.chat, '🌠 La sugerencia debe ser más de 5 caracteres.', m);
    if (text.length > 1000) return conn.reply(m.chat, '🌠 Máximo de la sugerencia es de 1000 caracteres.', m);

    const teks = `🌠 Sugerencia de nuevo comando del usuario *${m.sender}*\n\n🛡️ Han sugerido un comando:\n> ${text}`;

    const channelChatId = '120363419364337473@newsletter';
    const creatorsChatId = '51941658192@s.whatsapp.net'; // jid corregido

    await conn.reply(channelChatId, m.quoted ? teks + '\n' + m.quoted.text : teks, m, { mentions: conn.parseMention(teks) });
    await conn.reply(creatorsChatId, teks, m, { mentions: conn.parseMention(teks) });

    m.reply('🌠 La sugerencia se envió al Staff De aamon y a los creadores.');
}

handler.help = ['sugerencia2'];
handler.tags = ['owner'];
handler.command = ['sugerencia2', 'sugerir2', 'aamonsug2'];
handler.group = true;

export default handler;