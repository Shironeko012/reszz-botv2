const { loadPlayers } = require("../engine/player")

module.exports = async function topleader(sock,m){

const players = loadPlayers()

const ranking = Object.entries(players)
.map(([id,data])=>{

const power =
(data.attack || 0) +
(data.defense || 0) +
Math.floor((data.hp || 0)/2) +
((data.level || 1) * 5)

return { id, ...data, power }

})
.sort((a,b)=> b.power - a.power)
.slice(0,10)

let text = "🏆 *TOP LEADERBOARD*\n\n"

if(ranking.length === 0){
text += "Belum ada player"
return sock.sendMessage(m.id,{ text })
}

const medals = ["🥇","🥈","🥉"]

ranking.forEach((data,i)=>{

const rankIcon = medals[i] || `#${i+1}`

text +=
`${rankIcon} ${data.name}

🧙 Class : ${data.class}
⚔️ Power : ${data.power}

⭐ Level : ${data.level}
💠 EXP   : ${data.exp}

`

})

sock.sendMessage(m.id,{ text })

}