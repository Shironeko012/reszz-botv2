const items = require("../data/items.json")
const { getPlayer, loadPlayers, savePlayers } = require("../engine/player")
const { getTierValue } = require("../engine/tier")

module.exports = async function equip(sock,m,args){

const itemName = args[1]

if(!itemName){
return sock.sendMessage(m.id,{
text:"Gunakan:\n.rpg equip <item>"
})
}

const players = loadPlayers()
const player = getPlayer(m.sender)

if(!player.inventory[itemName]){
return sock.sendMessage(m.id,{
text:"❌ Item tidak ada di inventory"
})
}

let itemData = null
let category = null

for(const cat in items){
if(items[cat][itemName]){
itemData = items[cat][itemName]
category = cat
break
}
}

if(!itemData){
return sock.sendMessage(m.id,{
text:"Item tidak bisa di equip"
})
}

if(!player.equipment.hasOwnProperty(category)){
return sock.sendMessage(m.id,{
text:"Item ini tidak bisa dipakai"
})
}

const equipped = player.equipment[category]

if(!equipped){

player.equipment[category] = itemName

if(itemData.attack) player.attack += itemData.attack
if(itemData.defense) player.defense += itemData.defense

players[m.sender] = player
savePlayers(players)

return sock.sendMessage(m.id,{
text:`⚔️ ${itemName} berhasil dipakai`
})

}

let oldItem = null

for(const cat in items){
if(items[cat][equipped]){
oldItem = items[cat][equipped]
break
}
}

if(getTierValue(itemData.tier) <= getTierValue(oldItem.tier)){
return sock.sendMessage(m.id,{
text:"❌ Tier equipment lebih rendah"
})
}

if(oldItem.attack) player.attack -= oldItem.attack
if(oldItem.defense) player.defense -= oldItem.defense

player.equipment[category] = itemName

if(itemData.attack) player.attack += itemData.attack
if(itemData.defense) player.defense += itemData.defense

players[m.sender] = player
savePlayers(players)

sock.sendMessage(m.id,{
text:`⚔️ ${itemName} menggantikan ${equipped}`
})

}