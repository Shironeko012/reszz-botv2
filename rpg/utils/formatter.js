function formatDrop(drops){

if(!drops || drops.length === 0) return ""

let text = "\n🎁 DROP\n"

drops.forEach(d=>{
text += `• ${d}\n`
})

return text

}

function formatInventory(inv){

let text = "🎒 INVENTORY\n\n"

const items = Object.keys(inv || {})

if(items.length === 0){
return text + "Kosong"
}

items.forEach(item => {
text += `• ${item} x${inv[item]}\n`
})

return text

}

function formatEquipment(eq){

let text = "🛡️ EQUIPMENT\n\n"

if(!eq) return text + "Tidak ada equipment"

Object.keys(eq).forEach(slot=>{
text += `• ${slot}: ${eq[slot]}\n`
})

return text

}

module.exports = {
formatDrop,
formatInventory,
formatEquipment
}