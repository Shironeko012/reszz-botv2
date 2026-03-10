const items = require("../data/items.json")

function getItem(name){

for(const category in items){

if(items[category][name]){
return items[category][name]
}

}

return null

}

module.exports = { getItem }