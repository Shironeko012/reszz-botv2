const resources = require("../data/resources.json")
const { randomChoice, randomInt } = require("../utils/random")

function generateQuest(){

const resourceList = Object.keys(resources)

const item = randomChoice(resourceList)

const amount = randomInt(3,8)

const rewardGold = amount * 20
const rewardExp = amount * 15

return{
item,
amount,
rewardGold,
rewardExp
}

}

module.exports = { generateQuest }