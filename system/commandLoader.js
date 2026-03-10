const fs = require("fs")
const path = require("path")

const commands = new Map()

function loadCommands(dir = path.join(__dirname,"../commands")){

const files = fs.readdirSync(dir)

for(const file of files){

const fullPath = path.join(dir,file)
const stat = fs.statSync(fullPath)

if(stat.isDirectory()){
loadCommands(fullPath)
continue
}

if(!file.endsWith(".js")) continue

try{

const cmd = require(fullPath)

if(cmd.name){

commands.set(cmd.name, cmd)

}

}catch(err){

console.log("❌ Command load error:",file,err)

}

}

}

function getCommand(name){
return commands.get(name)
}

module.exports = {
loadCommands,
getCommand
}