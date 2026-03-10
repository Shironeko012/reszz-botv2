const { search, audio } = require("../../system/downloaderEngine")
const selfDestruct = require("../../system/selfDestruct")
const cleanTmp = require("../../system/tmpCleaner")

module.exports = {

name:"play",

async execute(sock,m,args){

if(!args.length){
return sock.sendMessage(m.id,{
text:"🎵 Masukkan judul lagu\n\n.play judul lagu"
})
}

try{

const query = args.join(" ")

await sock.sendMessage(m.id,{
text:"🔎 Mencari lagu..."
})

const result = await search(query)

await sock.sendMessage(m.id,{
text:`🎶 ${result.title}\n⏬ Mengunduh audio...`
})

const data = await audio(result.webpage_url)

const msg = await sock.sendMessage(m.id,{
audio:{ url:data.file },
mimetype:"audio/mp4",
ptt:false
})

selfDestruct(sock,m.id,msg.key)

cleanTmp(data.file)

}catch(err){

console.log(err)

sock.sendMessage(m.id,{
text:"❌ Lagu tidak ditemukan"
})

}

}

}