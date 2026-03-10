const { getPlayer, loadPlayers, savePlayers } = require("../engine/player")
const { randomMonster } = require("../engine/monster")
const { checkLevel } = require("../engine/level")
const { checkCooldown } = require("../engine/cooldown")
const { battle } = require("../engine/battle")
const { addItem } = require("../engine/inventory")
const { formatDrop } = require("../utils/formatter")

module.exports = async function hunt(sock, m){

const chat = m.id
const id = m.sender

if(!chat) return

const cd = checkCooldown(id,"hunt",60000)

if(cd > 0){
return sock.sendMessage(chat,{
text:`⏳ Tunggu ${cd} detik sebelum hunt lagi`
})
}

const players = loadPlayers()
const player = getPlayer(id)

/* ======================
⚡ STAMINA SYSTEM
====================== */

if(player.stamina === undefined){
player.stamina = 10
}

if(player.stamina <= 0){
return sock.sendMessage(chat,{
text:`⚡ Stamina habis!\nTunggu recharge.`
})
}

player.stamina -= 1

/* ======================
🐉 BOSS ENCOUNTER
====================== */

let monster = randomMonster(player.level)

if(Math.random() < 0.03){
monster.tier = "boss"
}

/* ======================
⚔️ BATTLE
====================== */

const result = battle(player, monster)

let playerHP = result.playerHP
const win = result.win

const tierEmoji = {
common:"🐾",
rare:"⭐",
elite:"🔥",
boss:"👑"
}

let text =
`⚔️ *BATTLE*

${tierEmoji[monster.tier] || "👾"} *${monster.name}*
❤️ HP Monster : ${monster.hp}
⚔️ ATK : ${monster.attack}

`

/* ======================
🎁 DROP SYSTEM
====================== */

const drops = result.drops || []

if(drops.length){

drops.forEach(item=>{
addItem(player,item,1)
})

text += formatDrop(drops)

}

/* ======================
⚔️ BATTLE LOG
====================== */

text += "\n⚔️ BATTLE LOG\n"

if(result.log){
result.log.forEach(l=>{
text += `• ${l}\n`
})
}

/* ======================
🧪 AUTO POTION
====================== */

if(playerHP < 30 && player.inventory?.potion > 0){

player.inventory.potion -= 1
playerHP += 30

text += `\n🧪 Potion digunakan otomatis (+30 HP)`
}

/* ======================
RESULT
====================== */

if(win){

let expGain = monster.exp
let goldGain = monster.gold

if(monster.tier === "elite") expGain *= 1.5
if(monster.tier === "boss") expGain *= 2

player.exp += Math.floor(expGain)
player.gold += goldGain

text +=
`\n🏆 *KAMU MENANG!*

⭐ Exp : +${Math.floor(expGain)}
💰 Gold : +${goldGain}
❤️ HP sisa : ${playerHP}`

}else{

playerHP = Math.max(20, Math.floor(player.hp * 0.3))

text +=
`\n💀 *KAMU KALAH!*

Monster terlalu kuat.
HP kamu dipulihkan sedikit.`

}

player.hp = playerHP

/* ======================
LEVEL SYSTEM
====================== */

const levelUp = checkLevel(player)

players[id] = player
savePlayers(players)

if(levelUp){

text += `

🎉 *LEVEL UP!*
Level kamu sekarang: ${player.level}`
}

/* ======================
SEND MESSAGE
====================== */

try{
await sock.sendMessage(chat,{ text })
}catch(err){
console.log("SendMessage Error:",err)
}

}