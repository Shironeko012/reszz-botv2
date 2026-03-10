const fs = require("fs")
const path = require("path")

const logDir = path.join(__dirname, "../logs")
const errorFile = path.join(logDir, "error.log")
const perfFile = path.join(logDir, "performance.log")

function ensureLogs(){

if(!fs.existsSync(logDir)){
fs.mkdirSync(logDir,{ recursive:true })
}

if(!fs.existsSync(errorFile)){
fs.writeFileSync(errorFile,"")
}

if(!fs.existsSync(perfFile)){
fs.writeFileSync(perfFile,"")
}

}

// ============================
// ERROR LOGGER
// ============================

function logError(error, command="unknown"){

ensureLogs()

const time = new Date().toISOString()

const log =
`[${time}]
COMMAND : ${command}
ERROR   : ${error.stack || error}

`

fs.appendFileSync(errorFile, log)

console.error("🚨 ERROR:", error.message || error)

}

// ============================
// PERFORMANCE LOGGER
// ============================

function logPerformance(command,time){

ensureLogs()

const log =
`[${new Date().toISOString()}] ${command} : ${time}ms\n`

fs.appendFileSync(perfFile, log)

// console output
console.log(`⚡ ${command} executed in ${time}ms`)

// slow command warning
if(time > 2000){
console.warn(`🐢 Slow command detected: ${command} (${time}ms)`)
}

}

// ============================
// INFO LOGGER
// ============================

function logInfo(message){

console.log("ℹ️",message)

}

// ============================
// SUCCESS LOGGER
// ============================

function logSuccess(message){

console.log("✅",message)

}

module.exports = {
logError,
logPerformance,
logInfo,
logSuccess
}