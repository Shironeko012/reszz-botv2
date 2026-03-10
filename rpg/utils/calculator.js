const { randomInt, chance } = require("./random")

function calculateDamage(attacker,defender){

let base = attacker.attack - defender.defense

if(base < 1) base = 1

let damage = base + randomInt(1,4)

// critical hit
if(chance(10)){
damage *= 2
return { damage, critical:true }
}

return { damage, critical:false }

}

function healHP(player,amount){

player.hp += amount

if(player.hp > player.maxHP){
player.hp = player.maxHP
}

}

function expToLevel(level){

return level * 100

}

module.exports={
calculateDamage,
healHP,
expToLevel
}