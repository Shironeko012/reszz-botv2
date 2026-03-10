const { chance } = require("../utils/random")
const { addItem } = require("../engine/inventory")
const { getPlayer, loadPlayers, savePlayers } = require("../engine/player")

module.exports = async function mining(sock,m){

const players = loadPlayers()
const player = getPlayer(m.sender)

let ore = null

if(chance(50)) ore = "ironore"
else if(chance(25)) ore = "silverore"
else if(chance(15)) ore = "goldore"
else if(chance(5)) ore = "diamond"

if(!ore){
return sock.sendMessage(m.id,{
text:"⛏ Tidak menemukan mineral..."
})
}

addItem(player,ore,1)

players[m.sender] = player
savePlayers(players)

sock.sendMessage(m.id,{
text:`⛏ Kamu mendapatkan ${ore}`
})

}