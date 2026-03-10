function addItem(player,item,amount=1){

if(!player.inventory[item]){
player.inventory[item] = 0
}

player.inventory[item] += amount

}

function removeItem(player,item,amount=1){

if(!player.inventory[item]) return false

player.inventory[item] -= amount

if(player.inventory[item] <= 0){
delete player.inventory[item]
}

return true

}

module.exports = {
addItem,
removeItem
}