const { video } = require("../../system/downloaderEngine")
const selfDestruct = require("../../system/selfDestruct")
const cleanTmp = require("../../system/tmpCleaner")

module.exports = {

name:"dl",

async execute(sock,m,args){

if(!args[0]){
return sock.sendMessage(m.id,{
text:"📥 Kirim link video\n\n.dl https://youtube.com/watch?v=xxxx"
})
}

const url = args[0]

if(!url.includes("youtube.com") && !url.includes("youtu.be")){
return sock.sendMessage(m.id,{
text:"❌ Link harus dari YouTube"
})
}

try{

await sock.sendMessage(m.id,{
text:"⏬ Mengunduh video..."
})

const data = await video(url)

const msg = await sock.sendMessage(m.id,{
video:{ url:data.file },
caption:`🎬 ${data.title}`
})

selfDestruct(sock,m.id,msg.key)
cleanTmp(data.file)

}catch(err){

console.log("DL ERROR:",err)

sock.sendMessage(m.id,{
text:"❌ Gagal download video"
})

}

}

}
