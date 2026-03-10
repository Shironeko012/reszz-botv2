module.exports = {

name: "menu",

async execute(sock, m) {

const text = `
╭───「 🤖 RESZZ BOT 」
│
├─ 📜 GENERAL
│ • .menu
│
├─ ⚔️ RPG
│ • .rpg
│
├─ 📥 DOWNLOADER
│ • .dl <link>
│
├─ 🎵 MUSIC
│ • .play <judul>
│
├─ 👑 OWNER
│ • .restart
│
╰──────────────
`

await sock.sendMessage(m.id,{ text })

}

}