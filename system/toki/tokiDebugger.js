const fs = require("fs")

function readError(){

try{

const log = fs.readFileSync("logs/error.log","utf8")

return log.slice(-500)

}catch{

return "Tidak ada error."

}

}

module.exports = { readError }
