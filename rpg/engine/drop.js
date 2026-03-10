const drops = require("../data/drop.json")
const { chance } = require("../utils/random")

function getMonsterDrop(monsterName){

const table = drops[monsterName]

if(!table) return []

const results = []

// maksimal 5 drop
for(let i = 0; i < 5; i++){

table.forEach(d => {

if(chance(d.chance)){
results.push(d.item)
}

})

}

return results

}

module.exports = { getMonsterDrop }