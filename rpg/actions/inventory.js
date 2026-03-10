const { loadPlayers, getPlayer } = require("../engine/player")
const { formatInventory } = require("../utils/formatter")

module.exports = async function inventory(sock,m){

const players = loadPlayers()
const player = getPlayer(m.sender)

const text = formatInventory(player.inventory)

sock.sendMessage(m.id,{ text })

}