const fs = require("fs")
const path = require("path")

const db = path.join(process.cwd(),"rpg/data/players.json")

function generateQuest(user){

const data = JSON.parse(fs.readFileSync(db))

const player = data[user]

if(!player) return null

const lvl = player.level || 1

let difficulty = lvl * 2

return {
quest:`Bunuh ${difficulty} monster`,
reward:lvl*100
}

}

module.exports = { generateQuest }
