const config = require("../config/config")
const parseMessage = require("./message")
const { getCommand } = require("./commandLoader")
const { logError, logPerformance } = require("./logger")

const cooldown = new Map()

module.exports = async function handler(sock, msg){

try{

const m = parseMessage(msg)
if(!m) return

const prefix = config.prefix

if(!m.text || !m.text.startsWith(prefix)) return

const args = m.text.slice(prefix.length).trim().split(/ +/)
const commandName = args.shift().toLowerCase()

console.log("⚡ Command:", commandName)

const command = getCommand(commandName)
if(!command) return

// ======================
// COOLDOWN SYSTEM
// ======================

const user = m.sender
const cdKey = user + ":" + commandName

if(cooldown.has(cdKey)){

const expire = cooldown.get(cdKey)

if(Date.now() < expire){

return sock.sendMessage(m.chat,{
text:"⏳ Tunggu sebentar sebelum menggunakan command ini lagi."
})

}

}

cooldown.set(cdKey, Date.now() + 2000)

// ======================
// COMMAND EXECUTION
// ======================

const start = Date.now()

try{

await Promise.race([

command.execute(sock, m, args),

new Promise((_, reject)=>
setTimeout(()=> reject(new Error("Command Timeout")),15000)
)

])

const time = Date.now() - start

logPerformance(commandName,time)

console.log(`⚡ ${commandName} executed in ${time}ms`)

}catch(err){

logError(err, commandName)

await sock.sendMessage(m.chat,{
text:"❌ Terjadi error pada command."
})

}

}catch(err){

console.log("🚨 Fatal Handler Error")

logError(err,"handler")

}

}