function checkLevel(player){

let levelUp = false

let needExp = player.level * 100

while(player.exp >= needExp){

player.exp -= needExp
player.level += 1

// stat naik saat level
player.hp += 10
player.attack += 2
player.defense += 1

levelUp = true

needExp = player.level * 100

}

return levelUp

}

module.exports = {
checkLevel
}