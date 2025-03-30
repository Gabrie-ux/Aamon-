import axios from 'axios';

// Validador para que solo se procese URLs de TikTok
const isTikTokUrl = (url) => /https?:\/\/(www\.)?(vm\.)?tiktok\.com/.test(url);

// Función para esperar X milisegundos
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const tiktokHandler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text || !text.trim() || !isTikTokUrl(text.trim())) {
    await conn.reply(
      m.chat,
      `Uso: ${usedPrefix + command} <URL de TikTok válida>\nEjemplo: ${usedPrefix + command} https://vt.tiktok.com/ZS29uaYEv/`,
      m
    );
    return;
  }
  const tiktokUrl = text.trim();

  // Obtener la hora actual en Perú y definir el saludo
  const currentTime = new Date().toLocaleString("en-US", { timeZone: "America/Lima" });
  const currentHour = new Date(currentTime).getHours();
  const greeting = currentHour < 12 ? "Buenos Días 🌅" : currentHour < 18 ? "Buenas Tardes 🌄" : "Buenas Noches 🌃";

  // Extraer el número del remitente para la mención
  const userNumber = m.sender.split('@')[0];

  // Enviar mensaje de carga con mención y reacción "buscando 📀"
  const reactionMessage = await conn.reply(
    m.chat,
    `${greeting} @${userNumber},\n📀 Buscando contenido en TikTok...`,
    m,
    { mentions: [m.sender] }
  );
  await conn.sendMessage(
    m.chat,
    { react: { text: '📀', key: reactionMessage.key } },
    { quoted: m }
  );

  try {
    const response = await axios.get(`https://api.vreden.my.id/api/tiktok?url=${encodeURIComponent(tiktokUrl)}`, { timeout: 10000 });
    if (response.data?.status !== 200 || !response.data?.result?.status) {
      throw new Error("Error en la API de TikTok");
    }
    const result = response.data.result;

    // Determinar si se trata de un video o un post de imágenes
    const isVideo = result.data.some(item => item.type.startsWith('nowatermark'));

    if (isVideo) {
      // Buscar la versión HD sin marca de agua, o la versión estándar si no existe HD
      const videoData = result.data.find(item => item.type === 'nowatermark_hd') || result.data.find(item => item.type === 'nowatermark');
      if (!videoData) throw new Error("No se encontró una versión adecuada del video.");

      // Obtener el tamaño del video (en bytes)
      let fileSize = 0;
      if (videoData.type === 'nowatermark_hd' && result.size_nowm_hd) {
        fileSize = result.size_nowm_hd;
      } else if (result.size_nowm) {
        fileSize = result.size_nowm;
      }

      // Enviar reacción de éxito para video
      await conn.sendMessage(
        m.chat,
        { react: { text: '🟢', key: reactionMessage.key } },
        { quoted: m }
      );

      // Si el archivo es mayor o igual a 80MB se envía como documento
      if (fileSize >= 80 * 1024 * 1024) {
        await conn.sendMessage(
          m.chat,
          {
            document: { url: videoData.url },
            mimetype: 'video/mp4'
          },
          { quoted: m }
        );
      } else {
        // Enviar el video directamente sin descripción
        await conn.sendMessage(
          m.chat,
          {
            video: { url: videoData.url },
            mimetype: 'video/mp4',
            contextInfo: {
              externalAdReply: {
                title: "",
                body: "",
                previewType: 'PHOTO',
                thumbnail: result.cover
                  ? await (await axios.get(result.cover, { responseType: 'arraybuffer' })).data
                  : null,
                mediaType: 2,
                renderLargerThumbnail: true,
                sourceUrl: tiktokUrl
              }
            }
          },
          { quoted: m }
        );
      }
    } else {
      // Es un post de imágenes
      const photos = result.data.filter(item => item.type === 'photo').map(item => item.url);
      if (!photos.length) throw new Error("No se encontraron imágenes en este post.");

      for (let photo of photos) {
        await wait(1000);
        await conn.sendMessage(
          m.chat,
          { image: { url: photo } },
          { quoted: m }
        );
      }
      // Enviar reacción de éxito para imágenes
      await conn.sendMessage(
        m.chat,
        { react: { text: '🖼️', key: reactionMessage.key } },
        { quoted: m }
      );
    }
  } catch (error) {
    console.error("❌ Error:", error);
    await conn.reply(
      m.chat,
      `🚨 *Error:* ${error.message || "Error desconocido"}`,
      m
    );
    await conn.sendMessage(
      m.chat,
      { react: { text: '❌', key: reactionMessage.key } },
      { quoted: m }
    );
  }
};

tiktokHandler.command = /^(tiktokhd)$/i;
export default tiktokHandler;