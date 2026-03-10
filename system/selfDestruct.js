async function selfDestruct(sock, chat, key, delay = 20000){

setTimeout(async()=>{

try{

await sock.sendMessage(chat,{
delete:key
})

}catch(err){
console.log("SelfDestruct error:",err)
}

},delay)

}

module.exports = selfDestruct