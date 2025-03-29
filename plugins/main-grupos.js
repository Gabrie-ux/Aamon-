import fetch from 'node-fetch'
let handler  = async (m, { conn, usedPrefix, command }) => {

let grupos = `*Hola!, te invito a unirte a los grupos oficiales del Bot para convivir con la comunidad* ⭐

1-Aamon
*✰* https://chat.whatsapp.com/FeWfraCmhn0BFtRatwm7oM

*─ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ*

➠ Enlace anulado? entre aquí! 

⭐ Canal :
*✰* https://whatsapp.com/channel/0029Vb5mi8y3wtb4XeFy8i2i

> By Aamon`

await conn.sendFile(m.chat, imagen2, "ian.jpg", grupos, m, null, rcanal)

await m.react(emojis)

}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = ['grupos', 'iangrupos', 'gruposian']
export default handler