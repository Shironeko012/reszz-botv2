const config = require("../config/config")

module.exports = {
name: "restart",

async execute(sock, m){

const sender = m.sender.split("@")[0]

if(!config.owner.includes(sender)){
return sock.sendMessage(m.chat,{
text:"❌ Command ini hanya untuk owner"
})
}

await sock.sendMessage(m.chat,{
text:"🔄 Restarting bot..."
})

setTimeout(()=>{
process.exit(0)
},1500)

}
}