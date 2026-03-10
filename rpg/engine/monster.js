const monstersData = require("../data/monsters.json")
const { randomChoice } = require("../utils/random")

// gabungkan monster + beri tier
const monsters = [
...monstersData.common.map(m => ({ ...m, tier: "common" })),
...monstersData.rare.map(m => ({ ...m, tier: "rare" })),
...monstersData.elite.map(m => ({ ...m, tier: "elite" })),
...monstersData.boss.map(m => ({ ...m, tier: "boss" }))
]

function randomMonster(playerLevel){

// monster sesuai level
const available = monsters.filter(m => m.level <= playerLevel + 2)

if(available.length === 0){
return randomChoice(monsters)
}

const roll = Math.random()

// probability tier
if(roll < 0.60){
const pool = available.filter(m => m.tier === "common")
if(pool.length) return randomChoice(pool)
}

if(roll < 0.85){
const pool = available.filter(m => m.tier === "rare")
if(pool.length) return randomChoice(pool)
}

if(roll < 0.97){
const pool = available.filter(m => m.tier === "elite")
if(pool.length) return randomChoice(pool)
}

const pool = available.filter(m => m.tier === "boss")
if(pool.length) return randomChoice(pool)

return randomChoice(available)
}

module.exports = { randomMonster }