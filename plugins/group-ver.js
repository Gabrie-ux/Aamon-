
let handler = async (m, { conn }) => {
    // Verifica si hay un mensaje citado y si es una imagen
    if (!m.quoted || !m.quoted.image) {
        return conn.reply(m.chat, '❌ Por favor, envía una imagen y luego usa el comando para verla.', m);
    }

    // Verifica si la imagen ya ha sido vista
    if (m.quoted.viewed) {
        return conn.reply(m.chat, '❌ Esta imagen ya ha sido vista y no se puede volver a ver.', m);
    }

    // Marca la imagen como vista
    m.quoted.viewed = true;

    // Descarga la imagen y envíala al chat
    const imgBuffer = await conn.downloadMediaMessage(m.quoted);
    
    await conn.sendMessage(m.chat, { image: imgBuffer, caption: 'Aquí está la imagen que solicitaste.' }, { quoted: m });
}

handler.command = ['ver']; // Puedes cambiar esto por cualquier otro comando que prefieras
handler.group = true; // Esto permite que el comando funcione en grupos

export default handler;