function chance(percent){
return Math.random()*100 <= percent
}

function randomInt(min,max){
return Math.floor(Math.random()*(max-min+1))+min
}

function randomChoice(arr){
return arr[Math.floor(Math.random()*arr.length)]
}

module.exports={
chance,
randomInt,
randomChoice
}