const items = require("../data/items.json")
const { getPlayer, loadPlayers, savePlayers } = require("../engine/player")
const { addItem } = require("../engine/inventory")

module.exports = async function shop(sock,m,args){

const itemName = args[1]

// =====================
// TAMPILKAN SHOP
// =====================

if(!itemName){

let text = "🛒 SHOP\n\n"

const shopCategories = ["weapon","armor","potion"]

for(const category of shopCategories){

if(!items[category]) continue

text += `📦 ${category.toUpperCase()}\n`

for(const item in items[category]){

const data = items[category][item]

text += `• ${item} - ${data.price} gold\n`

}

text += "\n"

}

text += "Gunakan:\n.rpg shop <item>"

return sock.sendMessage(m.id,{ text })

}

// =====================
// CARI ITEM DI SHOP
// =====================

let itemData = null

const shopCategories = ["weapon","armor","potion"]

for(const category of shopCategories){

if(items[category] && items[category][itemName]){
itemData = items[category][itemName]
break
}

}

if(!itemData){
return sock.sendMessage(m.id,{
text:"❌ Item tidak tersedia di shop"
})
}

// =====================
// DATA PLAYER
// =====================

const players = loadPlayers()
const player = getPlayer(m.sender)

// =====================
// CEK GOLD
// =====================

if(player.gold < itemData.price){
return sock.sendMessage(m.id,{
text:`💰 Gold tidak cukup\nHarga : ${itemData.price}`
})
}

// =====================
// BELI ITEM
// =====================

player.gold -= itemData.price

addItem(player,itemName,1)

players[m.sender] = player
savePlayers(players)

sock.sendMessage(m.id,{
text:
`🛒 Membeli ${itemName}

💰 Harga : ${itemData.price}
💰 Gold tersisa : ${player.gold}`
})

}