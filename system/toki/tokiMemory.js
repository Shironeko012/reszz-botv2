const fs = require("fs")
const path = require("path")

const db = path.join(process.cwd(),"database/tokiMemory.json")

if(!fs.existsSync(db)){
fs.writeFileSync(db,JSON.stringify({}))
}

function getMemory(user){

const data = JSON.parse(fs.readFileSync(db))

return data[user] || []

}

function saveMemory(user,msg){

const data = JSON.parse(fs.readFileSync(db))

if(!data[user]) data[user] = []

data[user].push(msg)

if(data[user].length > 10){
data[user].shift()
}

fs.writeFileSync(db,JSON.stringify(data,null,2))

}

module.exports = {
getMemory,
saveMemory
}
