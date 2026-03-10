const axios = require("axios")

const { getMemory,saveMemory } = require("./tokiMemory")
const { playerStatus } = require("./tokiNPC")
const { generateQuest } = require("./tokiQuest")
const { randomEvent } = require("./tokiEvent")
const { listCommands } = require("./tokiKnowledge")
const { readError } = require("./tokiDebugger")
const { personality } = require("./tokiPersonality")

async function aiBrain(prompt,memory){

try{

const res = await axios.post(
"https://api.itsrose.rest/chatGPT/turbo",
{
prompt:prompt,
memory:memory
}
)

return res.data.result

}catch{

return "Toki tidak bisa berpikir sekarang."

}

}

async function askToki(user,text){

text = text.toLowerCase()

saveMemory(user,text)

const memory = getMemory(user)

if(text.includes("status")){
return playerStatus(user)
}

if(text.includes("quest")){

const q = generateQuest()

return `Quest baru untukmu.

${q.quest}

Reward: ${q.reward} gold`
}

if(text.includes("event")){
return randomEvent()
}

if(text.includes("command")){
return listCommands()
}

if(text.includes("error")){
return readError()
}

if(text.length < 2){
return personality(user,text)
}

const brain = await aiBrain(text,memory)

return brain

}

module.exports = { askToki }
