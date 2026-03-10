const classes = require("../data/classes.json")
const { loadPlayers, savePlayers } = require("../engine/player")

module.exports = async function register(sock,m,args){

const chat = m.id

const name = args[1]
const className = args[2]?.toLowerCase()

if(!name || !className){
return sock.sendMessage(chat,{
text:`Gunakan:

.rpg register <nama> <class>

Class tersedia:
warrior
mage
archer
tank`
})
}

if(name.length > 15){
return sock.sendMessage(chat,{
text:"Nama maksimal 15 karakter"
})
}

if(!classes[className]){
return sock.sendMessage(chat,{
text:"Class tidak tersedia"
})
}

const players = loadPlayers()

if(players[m.sender] && players[m.sender].name){
return sock.sendMessage(chat,{
text:"Kamu sudah terdaftar di RPG"
})
}

const classData = classes[className]

/* ======================
Hitung POWER awal
====================== */

const power =
(classData.attack || 0) +
(classData.defense || 0) +
Math.floor((classData.hp || 0)/2)

/* ======================
Buat karakter
====================== */

players[m.sender] = {

name: name,
class: className,

gold:100,
exp:0,
level:1,

hp: classData.hp,
maxHp: classData.hp,

attack: classData.attack,
defense: classData.defense,

power: power,

stamina:10,

equipment:{
weapon:null,
armor:null
},

inventory:{}

}

savePlayers(players)

/* ======================
Message
====================== */

sock.sendMessage(chat,{
text:`🎮 *KARAKTER DIBUAT*

👤 Nama  : ${name}
🧙 Class : ${className}

❤️ HP     : ${classData.hp}
⚔️ Attack : ${classData.attack}
🛡️ Defense: ${classData.defense}

⚡ Power  : ${power}

💰 Gold awal : 100
⚡ Stamina : 10

Selamat datang di dunia RPG!`
})

}