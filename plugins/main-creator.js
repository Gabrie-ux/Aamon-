let handler = async (m, { conn, usedPrefix, isOwner }) => {
let txt_owner = "> _*`𝙷𝙾𝙻𝙰, 𝙴𝚂𝚃𝙴 𝙴𝚂 𝙴𝙻 𝙽𝚄𝙼𝙴𝚁𝙾 𝙳𝙴 𝙼𝙸 𝙲𝚁𝙴𝙰𝙳𝙾𝚁, 𝙲𝚄𝙰𝙻𝚀𝚄𝙸𝙴𝚁 𝙵𝙰𝙻𝙻𝙰 𝙾 𝚂𝙸 𝚀𝚄𝙸𝙴𝚁𝙴𝚂 𝙰𝙶𝚁𝙴𝙶𝙰𝚁 𝙴𝙻 𝙱𝙾𝚃 𝙰 𝚃𝚄 𝙶𝚁𝚄𝙿𝙾, 𝙿𝚄𝙴𝙳𝙴𝚂 𝙷𝙰𝙱𝙻𝙰𝚁𝙻𝙴`*_\n\n *Barboza* : Wa.me/50557865603"
await conn.sendFile(m.chat, "https://files.catbox.moe/ge77oy.jpg", 'thumbnail.jpg', txt_owner, m, null, rcanal)
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler