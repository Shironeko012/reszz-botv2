const { loadPlayers, getPlayer } = require("../engine/player")
const { formatEquipment } = require("../utils/formatter")

module.exports = async function profile(sock,m){

const players = loadPlayers()
const player = getPlayer(m.sender)

let text =
`👤 PROFILE

⭐ Level : ${player.level}
💰 Gold : ${player.gold}

❤️ HP : ${player.hp}/${player.maxHP}

⚔ Attack : ${player.attack}
🛡 Defense : ${player.defense}

`

text += formatEquipment(player.equipment)

sock.sendMessage(m.id,{ text })

}