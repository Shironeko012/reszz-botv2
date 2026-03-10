const { loadPlayers, getPlayer, savePlayers } = require("../engine/player")
const { removeItem } = require("../engine/inventory")

module.exports = async function claimQuest(sock,m){

const players = loadPlayers()
const player = getPlayer(m.sender)

const q = player.quest

if(!q.item){
return sock.sendMessage(m.id,{
text:"Tidak ada quest aktif"
})
}

if(!player.inventory[q.item] || player.inventory[q.item] < q.amount){
return sock.sendMessage(m.id,{
text:`Kamu belum memiliki ${q.amount} ${q.item}`
})
}

removeItem(player,q.item,q.amount)

player.gold += q.rewardGold
player.exp += q.rewardExp

player.quest = {
item:null,
amount:0,
completed:false
}

players[m.sender] = player
savePlayers(players)

sock.sendMessage(m.id,{
text:
`🎉 QUEST SELESAI

⭐ EXP +${q.rewardExp}
💰 Gold +${q.rewardGold}`
})

}