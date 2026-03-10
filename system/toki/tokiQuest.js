const quests = [

"Bunuh 3 monster hutan",
"Kumpulkan 5 kayu",
"Kalahkan slime raksasa",
"Cari artefak kuno",
"Buru serigala liar"

]

function generateQuest(){

const quest = quests[Math.floor(Math.random()*quests.length)]

const reward = Math.floor(Math.random()*200)+50

return {
quest,
reward
}

}

module.exports = { generateQuest }
