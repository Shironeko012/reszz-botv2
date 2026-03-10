const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
const pino = require("pino")
const qrcode = require("qrcode-terminal")
const fs = require("fs")
const path = require("path")

const handler = require("./system/handler")
const { loadCommands } = require("./system/commandLoader")
const { repairJSON } = require("./system/databaseRepair")
const { logError, logInfo, logSuccess } = require("./system/logger")

// ==========================
// INIT SYSTEM
// ==========================

logInfo("Loading commands...")
loadCommands()

logInfo("Checking database...")
repairJSON("./rpg/data/players.json")

// ==========================
// SESSION CLEANER
// ==========================

function clearSession(){

const sessionPath = path.join(__dirname,"./session")

if(!fs.existsSync(sessionPath)) return

const files = fs.readdirSync(sessionPath)

for(const file of files){

const filePath = path.join(sessionPath,file)

try{
fs.rmSync(filePath,{recursive:true,force:true})
}catch(err){
console.log("⚠️ Gagal hapus:",file)
}

}

console.log("🧹 Session dibersihkan")

}

// ==========================
// BOT START
// ==========================

let reconnecting = false

async function startBot(){

try{

const { state, saveCreds } = await useMultiFileAuthState("./session")
const { version } = await fetchLatestBaileysVersion()

const sock = makeWASocket({

version,
logger: pino({ level: "silent" }),
auth: state,
browser: ["Reszz Bot","Chrome","1.0"]

})

sock.ev.on("creds.update", saveCreds)

// ==========================
// CONNECTION UPDATE
// ==========================

sock.ev.on("connection.update",(update)=>{

const { connection, lastDisconnect, qr } = update

if(qr){
console.log("📱 Scan QR berikut:")
qrcode.generate(qr,{small:true})
}

if(connection === "open"){

reconnecting = false

logSuccess("Bot Connected")

}

if(connection === "close"){

const reason = lastDisconnect?.error?.output?.statusCode

console.log("❌ Disconnected:",reason)

if(reason !== DisconnectReason.loggedOut){

if(!reconnecting){

reconnecting = true

console.log("🔄 Reconnecting...")

setTimeout(startBot,3000)

}

}else{

console.log("⚠️ Session logged out")

clearSession()

}

}

})

// ==========================
// MESSAGE LISTENER
// ==========================

sock.ev.on("messages.upsert", async ({ messages, type })=>{

try{

if(type !== "notify") return

const msg = messages?.[0]

if(!msg) return
if(!msg.message) return
if(msg.key.fromMe) return

console.log("📨 Pesan masuk")

handler(sock,{messages})

}catch(err){

logError(err,"messages.upsert")

}

})

}catch(err){

logError(err,"startBot")

setTimeout(startBot,5000)

}

}

startBot()

// ==========================
// PROCESS GUARD
// ==========================

process.on("SIGINT", ()=>{

console.log("\n🛑 Bot dimatikan")
clearSession()
process.exit()

})

process.on("SIGTERM", ()=>{

console.log("\n🛑 Bot dimatikan")
clearSession()
process.exit()

})

// runtime crash guard
process.on("uncaughtException",(err)=>{

console.log("🚨 Fatal Error")
logError(err,"uncaughtException")

})

// async crash guard
process.on("unhandledRejection",(err)=>{

console.log("🚨 Unhandled Promise")
logError(err,"unhandledRejection")

})