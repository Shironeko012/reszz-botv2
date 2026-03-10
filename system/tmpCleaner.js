const fs = require("fs")

function cleanTmp(file, delay = 25000){

setTimeout(()=>{

try{

if(fs.existsSync(file)){
fs.unlinkSync(file)
console.log("🧹 tmp cleaned:",file)
}

}catch{}

},delay)

}

module.exports = cleanTmp