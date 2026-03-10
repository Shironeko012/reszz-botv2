const { chance } = require("../utils/random")
const { addItem } = require("../engine/inventory")
const { getPlayer, loadPlayers, savePlayers } = require("../engine/player")

module.exports = async function fishing(sock,m){

const players = loadPlayers()
const player = getPlayer(m.sender)

let item = null

if(chance(60)) item = "fish"
else if(chance(25)) item = "rarefish"
else if(chance(10)) item = "goldfish"

if(!item){
return sock.sendMessage(m.id,{
text:"🎣 Tidak mendapatkan ikan..."
})
}

addItem(player,item,1)

players[m.sender] = player
savePlayers(players)

sock.sendMessage(m.id,{
text:`🎣 Kamu mendapatkan ${item}`
})

}