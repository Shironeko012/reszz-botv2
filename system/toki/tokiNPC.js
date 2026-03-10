const fs = require("fs")
const path = require("path")

const db = path.join(process.cwd(),"rpg/data/players.json")

function playerStatus(user){

try{

const data = JSON.parse(fs.readFileSync(db))

const p = data[user]

if(!p) return "Kamu belum membuat karakter."

return `Statusmu

HP: ${p.hp}
Attack: ${p.attack}
Defense: ${p.defense}
Gold: ${p.gold}`

}catch{

return "Toki tidak bisa membaca data player."

}

}

module.exports = { playerStatus }
