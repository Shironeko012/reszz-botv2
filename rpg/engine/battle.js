function battle(player, monster){

let playerHP = player.hp
let monsterHP = monster.hp

const log = []
const drops = []

while(playerHP > 0 && monsterHP > 0){

// attack player
let playerDamage = player.attack + Math.floor(Math.random()*4)

if(Math.random() < 0.15){
playerDamage *= 2
log.push("💥 CRITICAL HIT!")
}

monsterHP -= playerDamage

log.push(`⚔️ Kamu menyerang ${monster.name} (-${playerDamage})`)

if(monsterHP <= 0) break

// attack monster
let monsterDamage = monster.attack + Math.floor(Math.random()*3)

playerHP -= monsterDamage

log.push(`👾 ${monster.name} menyerang kamu (-${monsterDamage})`)

}

// drop item sederhana
if(playerHP > 0){

if(Math.random() < 0.25){
drops.push("monster_bone")
}

if(Math.random() < 0.15){
drops.push("iron_fragment")
}

}

return {
win: playerHP > 0,
playerHP,
monsterHP,
log,
drops
}

}

module.exports = { battle }