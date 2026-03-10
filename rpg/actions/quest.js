const { loadPlayers, getPlayer, savePlayers } = require("../engine/player")
const resources = require("../data/resources.json")
const { randomChoice, randomInt } = require("../utils/random")

module.exports = async function quest(sock,m){

const players = loadPlayers()
const player = getPlayer(m.sender)

if(player.quest.item){

return sock.sendMessage(m.id,{
text:
`📜 QUEST AKTIF

Kumpulkan ${player.quest.amount} ${player.quest.item}

Reward
⭐ EXP +${player.quest.rewardExp}
💰 Gold +${player.quest.rewardGold}`
})

}

const resourceList = Object.keys(resources)

const item = randomChoice(resourceList)

const amount = randomInt(3,8)

const rewardGold = amount * 25
const rewardExp = amount * 15

player.quest = {
item,
amount,
rewardGold,
rewardExp
}

players[m.sender] = player
savePlayers(players)

sock.sendMessage(m.id,{
text:
`📜 QUEST BARU

Kumpulkan ${amount} ${item}

Reward
⭐ EXP +${rewardExp}
💰 Gold +${rewardGold}`
})

}