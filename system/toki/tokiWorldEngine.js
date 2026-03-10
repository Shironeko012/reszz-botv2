const fs = require("fs")
const path = require("path")

const worldDB = path.join(process.cwd(),"rpg/data/world.json")

if(!fs.existsSync(worldDB)){
fs.writeFileSync(worldDB,JSON.stringify({
day:1,
events:[]
},null,2))
}

function advanceWorld(){

const data = JSON.parse(fs.readFileSync(worldDB))

data.day++

if(Math.random()>0.7){

data.events.push({
day:data.day,
event:"Monster invasion"
})

}

fs.writeFileSync(worldDB,JSON.stringify(data,null,2))

return data

}

module.exports = { advanceWorld }
