const fs = require("fs")

function repairJSON(file){

try{

if(!fs.existsSync(file)){
fs.writeFileSync(file,"{}")
}

JSON.parse(fs.readFileSync(file))

}catch(err){

console.log("⚠️ Database rusak, memperbaiki:",file)

fs.writeFileSync(file,"{}")

}

}

module.exports = {
repairJSON
}