const items = require("../data/items.json")
const { getPlayer, loadPlayers, savePlayers } = require("../engine/player")
const { removeItem } = require("../engine/inventory")

module.exports = async function use(sock,m,args){

const item = args[1]

if(item !== "potion"){
return sock.sendMessage(m.id,{ text:"Item tidak bisa digunakan"})
}

const players = loadPlayers()
const player = getPlayer(m.sender)

if(!player.inventory[item]){
return sock.sendMessage(m.id,{ text:"Potion tidak ada"})
}

player.hp += items[item].heal

if(player.hp > 100) player.hp = 100

removeItem(player,item,1)

players[m.sender] = player
savePlayers(players)

sock.sendMessage(m.id,{
text:`🧪 HP pulih menjadi ${player.hp}`
})

}