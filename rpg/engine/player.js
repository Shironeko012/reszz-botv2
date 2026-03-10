const fs = require("fs")

const path = "./rpg/data/players.json"

function loadPlayers(){

if(!fs.existsSync(path)){
fs.writeFileSync(path,"{}")
}

return JSON.parse(fs.readFileSync(path))

}

function savePlayers(data){

fs.writeFileSync(path, JSON.stringify(data,null,2))

}

function getPlayer(id){

const players = loadPlayers()

// jika player belum ada
if(!players[id]){

players[id] = {

gold: 100,
exp: 0,
level: 1,

hp: 100,
maxHP: 100,

attack: 10,
defense: 0,

equipment:{
weapon:null,
armor:null,
helmet:null,
boots:null,
ring:null,
artifact:null
},

inventory:{},

quest:{
item:null,
amount:0,
rewardGold:0,
rewardExp:0
}

}

savePlayers(players)

}

const player = players[id]

// AUTO REPAIR DATABASE

if(!player.inventory){
player.inventory = {}
}

if(!player.equipment){
player.equipment = {
weapon:null,
armor:null,
helmet:null,
boots:null,
ring:null,
artifact:null
}
}

if(!player.quest){
player.quest = {
item:null,
amount:0,
rewardGold:0,
rewardExp:0
}
}

if(!player.maxHP){
player.maxHP = player.hp || 100
}

return player

}

module.exports = {
getPlayer,
loadPlayers,
savePlayers
}