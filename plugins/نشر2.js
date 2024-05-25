import fs from 'fs'

let handler = async (m, { conn, text } ) => {
  if (!text) throw 'الرجاء إدخال نص لإرسال الإعلان إلى جميع المجموعات'
  let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
  let fproducto = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(false ? { remoteJid: "17608914335@s.whatsapp.net" } : {}) }, message: { "productMessage": { "product": { "productImage":{ "mimetype": "image/jpeg", "jpegThumbnail": catalogo }, "title": `🐢𝐀𝐍𝐔𝐍𝐂𝐈𝐎 𝐃𝐄 𝐆𝐑𝐔𝐏𝐎🐢`, "description": "NyanCatBot-MD", "currencyCode": "USD", "priceAmount1000": "200000000", "retailerId": "Ghost", "productImageCount": 1 }, "businessOwnerJid": `0@s.whatsapp.net` }}}
  let teks = `\t\t\t\t*إعلان | المجموعات*\n\n${text}`
  for (let id of groups) {
  await conn.sendMessage(id, { text: teks, mentions: (await conn.groupMetadata(`${id}`)).participants.map(v => v.id) }, { quoted: fproducto })
  }
  conn.reply(m.chat, `✅ *_تم إرسال الإعلان إلى -${groups.length}- مجموعة!_*`, m)
}

handler.help = ['bcgc']
handler.tags = ['owner']
handler.command = /^(ذيعها)$/i

handler.owner = true

export default handler
