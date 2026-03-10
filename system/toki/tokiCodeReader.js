const fs = require("fs")
const path = require("path")

function readDir(dir){

let results = []

const list = fs.readdirSync(dir)

list.forEach(file=>{

const filePath = path.join(dir,file)

const stat = fs.statSync(filePath)

if(stat && stat.isDirectory()){

results = results.concat(readDir(filePath))

}else{

if(file.endsWith(".js")){
results.push(filePath)
}

}

})

return results

}

function readBotCode(){

const root = process.cwd()

const files = readDir(root)

let code = ""

files.forEach(f=>{

try{

code += fs.readFileSync(f,"utf8")+"\n"

}catch{}

})

return code.slice(0,50000)

}

module.exports = { readBotCode }
