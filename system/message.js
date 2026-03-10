module.exports = function parseMessage(msg) {

const m = msg.messages[0]
if (!m) return null
if (m.key.fromMe) return null

let body = ""

if (m.message?.conversation) {
body = m.message.conversation
}

else if (m.message?.extendedTextMessage?.text) {
body = m.message.extendedTextMessage.text
}

else if (m.message?.imageMessage?.caption) {
body = m.message.imageMessage.caption
}

else if (m.message?.videoMessage?.caption) {
body = m.message.videoMessage.caption
}

return {
id: m.key.remoteJid,
sender: m.key.participant || m.key.remoteJid,
text: body,
isGroup: m.key.remoteJid.endsWith("@g.us")
}

}