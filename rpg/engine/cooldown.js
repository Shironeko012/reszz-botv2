const cooldown = {}

function checkCooldown(id, command, time){

if(!cooldown[id]) cooldown[id] = {}

const now = Date.now()

if(cooldown[id][command] && now < cooldown[id][command]){

const sisa = Math.ceil((cooldown[id][command] - now)/1000)

return sisa

}

cooldown[id][command] = now + time

return 0

}

module.exports = { checkCooldown }