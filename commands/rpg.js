const rpg = require("../rpg")

module.exports = {

name: "rpg",

async execute(sock, m, args){

rpg(sock, m, args)

}

}