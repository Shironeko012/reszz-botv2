const monsters = require("../data/monsters.json")
const { randomChoice } = require("../utils/random")

function randomMonster(playerLevel){

const available = monsters.filter(m => m.level <= playerLevel + 1)

if(available.length === 0){
return randomChoice(monsters)
}

return randomChoice(available)

}

module.exports = { randomMonster }