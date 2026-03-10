const { loadPlayers } = require("./engine/player")

const hunt = require("./actions/hunt")
const fishing = require("./actions/fishing")
const mining = require("./actions/mining")
const dungeon = require("./actions/dungeon")
const profile = require("./actions/profile")
const inventory = require("./actions/inventory")
const shop = require("./systems/shop")
const equip = require("./actions/equip")
const use = require("./actions/use")
const topleader = require("./actions/topleader")
const sell = require("./actions/sell")
const register = require("./actions/register")
const quest = require("./actions/quest")
const claimQuest = require("./actions/claimquest")

module.exports = async function rpg(sock, m, args) {

const action = args[0]

// load database setiap command
const players = loadPlayers()

// jika belum register
if(action !== "register" && (!players[m.sender] || !players[m.sender].name)){
return sock.sendMessage(m.id,{
text:`⚠️ Kamu belum membuat karakter.

Gunakan:
.rpg register <nama> <class>

Class tersedia:
warrior
mage
archer
tank`
})
}

// menu RPG
if (!action) {
return sock.sendMessage(m.id,{
text:
`🎮 RPG MENU

⚔️ Battle
.rpg hunt
.rpg dungeon

🎣 Resource
.rpg fishing
.rpg mining

👤 Player
.rpg profile
.rpg inventory
.rpg topleader

🛒 Item
.rpg shop
.rpg equip <item>
.rpg use potion
.rpg sell <item>

📜 quest
.rpg quest
.rpg claimquest

🆕 Register
.rpg register <nama> <class>`
})
}

switch(action){

case "register":
return register(sock,m,args)

case "hunt":
return hunt(sock,m)

case "fishing":
return fishing(sock,m)

case "mining":
return mining(sock,m)

case "dungeon":
return dungeon(sock,m)

case "profile":
return profile(sock,m)

case "inventory":
return inventory(sock,m)

case "shop":
return shop(sock,m,args)

case "equip":
return equip(sock,m,args)

case "use":
return use(sock,m,args)

case "topleader":
return topleader(sock,m)

case "sell":
return sell(sock,m,args)

case "quest":
return quest(sock,m)

case "claimquest":
return claimQuest(sock,m)

default:
return sock.sendMessage(m.id,{
text:"❌ Command RPG tidak ditemukan"
})

}

}