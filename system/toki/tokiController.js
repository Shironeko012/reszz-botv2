const { askToki } = require("./tokiEngine")

module.exports = async function tokiController(sock,m){

try{

let text = m.text || ""

if(!text.toLowerCase().includes("toki")) return

text = text.replace(/toki/i,"").trim()

const reply = await askToki(m.sender,text)

await sock.sendMessage(m.id,{
text:reply
})

}catch(err){

console.log("TOKI CONTROLLER ERROR:",err)

}

}
