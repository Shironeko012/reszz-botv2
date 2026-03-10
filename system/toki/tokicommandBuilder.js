const fs = require("fs")
const path = require("path")

function buildCommand(name){

const template = `
module.exports = {

name:"${name}",

async execute(sock,m,args){

sock.sendMessage(m.id,{
text:"Command ${name} berhasil dibuat."
})

}

}
`

const file = path.join(process.cwd(),"commands",`${name}.js`)

fs.writeFileSync(file,template)

return `Command ${name} berhasil dibuat.`

}

module.exports = { buildCommand }
