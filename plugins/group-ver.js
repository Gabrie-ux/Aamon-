
let handler = async (m, { conn, text }) => {
    // Verifica si hay una imagen en el mensaje
    if (!m.quoted || !m.quoted.image) {
        return conn.reply(m.chat, '❌ Por favor, envía una imagen y luego usa el comando .ver.', m);
    }

    // Verifica si la imagen ya fue vista
    if (m.quoted.viewed) {
        return conn.reply(m.chat, '❌ Esta imagen ya ha sido vista una vez y no se puede volver a ver.', m);
    }

    // Marca la imagen como vista
    m.quoted.viewed = true;

    // Envía la imagen nuevamente al chat
    const imgBuffer = await conn.downloadMediaMessage(m.quoted);
    
    await conn.sendMessage(m.chat, { image: imgBuffer, caption: 'Aquí está la imagen que solicitaste.' }, { quoted: m });
}

handler.command = ['ver'];
handler.group = true;

export default handler;