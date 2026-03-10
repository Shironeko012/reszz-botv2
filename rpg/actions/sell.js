const resources = require("../data/resources.json")
const { getPlayer, loadPlayers, savePlayers } = require("../engine/player")
const { removeItem } = require("../engine/inventory")

module.exports = async function sell(sock,m,args){

const item = args[1]

if(!item){
return sock.sendMessage(m.id,{
text:"Gunakan:\n.rpg sell <resource>"
})
}

if(!resources[item]){
return sock.sendMessage(m.id,{
text:"Item ini bukan resource"
})
}

const players = loadPlayers()
const player = getPlayer(m.sender)

if(!player.inventory[item]){
return sock.sendMessage(m.id,{
text:"Resource tidak ada di inventory"
})
}

const price = resources[item].price

removeItem(player,item,1)

player.gold += price

players[m.sender] = player
savePlayers(players)

sock.sendMessage(m.id,{
text:`💰 Menjual ${item}

Gold +${price}
Gold sekarang : ${player.gold}`
})

}